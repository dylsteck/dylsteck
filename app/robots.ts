import { appUrl } from 'app/sitemap'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/api/og/*'],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  }
}
