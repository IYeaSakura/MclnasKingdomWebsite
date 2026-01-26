interface OptimizedImageProps {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: 'high' | 'low';
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export function OptimizedImage({
  src = '',
  alt = 'image',
  className = '',
  width,
  height,
  priority = 'low',
  sizes = '(max-width: 768px) 100vw, 50vw',
  loading = 'lazy'
}: OptimizedImageProps) {
  const isHighPriority = priority === 'high';
  const sizesList = isHighPriority ? [1920, 1280, 750, 375] : [1920, 1280];

  const generateSrcset = (format: string) => {
    if (isHighPriority) {
      return sizesList.map(size => 
        `${src.replace(/\.(jpg|jpeg|png)$/i, '')}-${size}.${format} ${size}w`
      ).join(', ');
    }
    return src.replace(/\.(jpg|jpeg|png)$/i, `.${format}`);
  };

  return (
    <picture>
      {isHighPriority && (
        <source
          srcSet={generateSrcset('avif')}
          type="image/avif"
          sizes={sizes}
        />
      )}
      {isHighPriority && (
        <source
          srcSet={generateSrcset('webp')}
          type="image/webp"
          sizes={sizes}
        />
      )}
      {!isHighPriority && (
        <source
          srcSet={generateSrcset('avif')}
          type="image/avif"
        />
      )}
      {!isHighPriority && (
        <source
          srcSet={generateSrcset('webp')}
          type="image/webp"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        style={{ imageRendering: 'pixelated' }}
      />
    </picture>
  );
}
