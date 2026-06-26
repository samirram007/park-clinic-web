import type { ImgHTMLAttributes } from 'react'

interface OptimizedImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src'
> {
  src: string
  /** Aspect ratio as width/height string (e.g. "16/9", "4/3", "1/1") */
  aspectRatio?: string
}

/**
 * Converts an image path to its WebP equivalent by replacing the extension.
 * Falls back to the original path if it's already WebP or SVG.
 */
function toWebpPath(src: string): string | null {
  // Don't convert SVGs or WebPs
  if (src.endsWith('.svg') || src.endsWith('.webp')) return null

  const webpSrc = src.replace(/\.(png|jpe?g|jpeg)$/i, '.webp')
  // Only return if the extension actually changed
  return webpSrc !== src ? webpSrc : null
}

/**
 * Extracts the file extension from a path
 */
function getExtension(src: string): string {
  const ext = src.split('.').pop()?.toLowerCase() || ''
  const mimeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    gif: 'image/gif',
    avif: 'image/avif',
  }
  return mimeMap[ext] || `image/${ext}`
}

export default function OptimizedImage({
  src,
  alt = '',
  className,
  aspectRatio,
  loading = 'lazy',
  style,
  ...rest
}: OptimizedImageProps) {
  const webpSrc = toWebpPath(src)
  const mimeType = getExtension(src)

  const combinedStyle = aspectRatio ? { aspectRatio, ...style } : style

  return (
    <picture>
      {/* WebP source (if convertible) */}
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      {/* Fallback to original format */}
      <source srcSet={src} type={mimeType} />
      {/* Actual img element */}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        style={combinedStyle}
        {...rest}
      />
    </picture>
  )
}
