import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Check if this is a blog post request with Accept: text/markdown header
  const pathname = request.nextUrl.pathname;
  const acceptHeader = request.headers.get('accept') || '';
  
  // Match blog post URLs like /blog/2025-recap
  const blogPostMatch = pathname.match(/^\/blog\/([^\/]+)$/);
  
  if (
    blogPostMatch &&
    (acceptHeader.includes('text/markdown') ||
     acceptHeader.includes('text/x-markdown') ||
     acceptHeader.includes('application/markdown'))
  ) {
    const postId = blogPostMatch[1];
    // Rewrite to the markdown API route
    const url = request.nextUrl.clone();
    url.pathname = `/api/blog/${postId}/markdown`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/blog/:path*',
};
