export const appUrl =
  (import.meta.env?.VITE_PUBLIC_URL as string | undefined) ||
  (typeof process !== 'undefined' ? process.env.VITE_PUBLIC_URL : undefined) ||
  (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_URL : undefined) ||
  'https://dylansteck.com'

export const bannerImg =
  'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704144251/media/dsmetacard.png'

export const iconImg = 'https://i.imgur.com/DDrGKML.png'

export function createMiniAppEmbed(
  title = 'Launch Site',
  imageUrl: string = bannerImg,
  url: string = appUrl
) {
  return {
    version: 'next',
    imageUrl,
    button: {
      title,
      action: {
        type: 'launch_frame',
        name: 'Dylan Steck',
        url,
        splashImageUrl: iconImg,
        splashBackgroundColor: '#000000',
      },
    },
  }
}
