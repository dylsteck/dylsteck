import { ImageResponse } from 'next/og';
import { posts } from 'app/blog/posts/posts';
import { DS_ICON_GREY_SVG } from 'app/components/icons/ds-icon-grey';

export const runtime = 'edge';

async function loadGoogleFont(font: string, text: string, weight: number = 400) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('failed to load font data');
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return new Response('Post not found', { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const isMiniApp = searchParams.get('miniapp') === 'true';
  
  // Mini App spec requires 3:2 aspect ratio, standard OG is 1200x630
  const width = 1200;
  const height = isMiniApp ? 800 : 630;

  // Format date to match the format in posts.ts (e.g., "October 21, 2025")
  const date = new Date(post.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Load Inter font (similar to Geist) - need to include all text that will be rendered
  const textToRender = `${post.title} Dylan Steck ${formattedDate}`;
  let font400: ArrayBuffer | null = null;
  let font700: ArrayBuffer | null = null;
  
  try {
    font400 = await loadGoogleFont('Inter', textToRender, 400);
    font700 = await loadGoogleFont('Inter', textToRender, 700);
  } catch (error) {
    // If font loading fails, we need at least one font, so try a simpler approach
    console.error('Failed to load Google Font:', error);
    // Try loading without text subsetting as fallback
    try {
      const fallbackUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700';
      const css = await (await fetch(fallbackUrl)).text();
      const resources = css.matchAll(/src: url\((.+)\) format\('(opentype|truetype)'\)/g);
      const urls = Array.from(resources).map(m => m[1]);
      if (urls.length > 0) {
        const response = await fetch(urls[0]);
        if (response.ok) {
          font400 = await response.arrayBuffer();
          font700 = font400; // Use same font for both weights as fallback
        }
      }
    } catch (fallbackError) {
      console.error('Fallback font loading also failed:', fallbackError);
    }
  }
  
  // Ensure we have at least one font - required by @vercel/og
  if (!font400 && !font700) {
    return new Response('Failed to load required fonts', { status: 500 });
  }

  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: isMiniApp ? '100px 100px' : '80px 100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Watermark - render first so text renders on top */}
        <div
          style={{
            position: 'absolute',
            left: isMiniApp ? '520px' : '640px',
            top: '0',
            opacity: 0.45,
            width: isMiniApp ? '640px' : '500px',
            height: `${height}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(DS_ICON_GREY_SVG)}`}
            alt=""
            width={isMiniApp ? 640 : 500}
            height={height}
          />
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMiniApp ? '30px' : '20px',
            maxWidth: '60%',
            position: 'relative',
          }}
        >
          <h1
            style={{
              fontSize: isMiniApp ? 72 : 64,
              fontWeight: 700,
              color: '#000000',
              lineHeight: 1.1,
              margin: 0,
              fontFamily: font400 ? 'Inter' : 'system-ui',
            }}
          >
            {post.title}
          </h1>
        </div>

        {/* Author and Date */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMiniApp ? '12px' : '8px',
            maxWidth: '50%',
            position: 'relative',
          }}
        >
          <p
            style={{
              fontSize: isMiniApp ? 36 : 32,
              color: '#000000',
              margin: 0,
              fontFamily: font400 ? 'Inter' : 'system-ui',
            }}
          >
            Dylan Steck
          </p>
          <p
            style={{
              fontSize: isMiniApp ? 36 : 32,
              color: '#000000',
              margin: 0,
              fontFamily: font400 ? 'Inter' : 'system-ui',
            }}
          >
            {formattedDate}
          </p>
        </div>
      </div>
    ),
    {
      width,
      height,
      fonts: [
        ...(font400 ? [{
          name: 'Inter',
          data: font400,
          style: 'normal' as const,
          weight: 400 as const,
        }] : []),
        ...(font700 ? [{
          name: 'Inter',
          data: font700,
          style: 'normal' as const,
          weight: 700 as const,
        }] : font400 ? [{
          name: 'Inter',
          data: font400,
          style: 'normal' as const,
          weight: 700 as const,
        }] : []),
      ],
    }
  );

  // Add long-term caching headers
  return new Response(imageResponse.body, {
    headers: {
      ...imageResponse.headers,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Type': 'image/png',
    },
  });
}

