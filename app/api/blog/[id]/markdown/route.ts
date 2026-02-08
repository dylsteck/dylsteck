import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getBlogPosts, processMarkdownComponents } from 'app/blog/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = getBlogPosts().find((post) => post.slug === id);

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // Process markdown components (Tweet, Cast, Gallery) for better agent readability
  const processedContent = processMarkdownComponents(post.content);

  return new NextResponse(processedContent, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
