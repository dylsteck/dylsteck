import type { CSSProperties, ImgHTMLAttributes } from 'react'

type BaseProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'width' | 'height' | 'loading'
>

export interface ImageProps extends BaseProps {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  fill?: boolean
  priority?: boolean
  sizes?: string
  quality?: number
  unoptimized?: boolean
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export default function Image({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  sizes,
  quality: _quality,
  unoptimized: _unoptimized,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  loading,
  style,
  className,
  ...rest
}: ImageProps) {
  const computedStyle: CSSProperties = fill
    ? {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        ...style,
      }
    : style ?? {}

  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      style={computedStyle}
      className={className}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      decoding={priority ? 'sync' : 'async'}
    />
  )
}
