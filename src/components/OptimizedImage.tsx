import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { getOptimalImageQuality } from '@/utils/networkOptimization';
import { imageLoader } from '@/utils/imageLoader';

export interface OptimizedImageHandle {
  reload: () => void;
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
}

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'loading' | 'decoding'> {
  src?: string;
  priority?: 'high' | 'low';
  sizes?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onLoadingComplete?: (img: HTMLImageElement) => void;
  placeholder?: 'blur' | 'empty' | 'color';
  placeholderColor?: string;
  blurDataURL?: string;
  disableOptimization?: boolean;
}

const OptimizedImage = forwardRef<OptimizedImageHandle, OptimizedImageProps>(({
  src = '',
  alt = '',
  className = '',
  width,
  height,
  priority = 'low',
  sizes = '(max-width: 768px) 100vw, 50vw',
  loading = 'lazy',
  decoding = 'async',
  onLoad,
  onError,
  onLoadingComplete,
  placeholder = 'empty',
  placeholderColor = 'transparent',
  blurDataURL,
  disableOptimization = false,
  style,
  ...restProps
}, ref) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const loadTaskRef = useRef<{ cancel: () => void } | null>(null);

  const isHighPriority = priority === 'high';
  const actualLoading = isHighPriority ? 'eager' : loading;
  const imageQuality = getOptimalImageQuality();
  const sizesList = isHighPriority ? [1920, 1280, 750, 375] : [1920, 1280];

  useImperativeHandle(ref, () => ({
    reload: () => {
      setIsLoaded(false);
      setIsError(false);
      setIsLoading(true);
      loadImage();
    },
    isLoading,
    isLoaded,
    isError,
  }));

  const normalizeSrcPath = (path: string): string => {
    return path.replace(/\/images\/raw\//, '/images/');
  };

  const getBaseName = (path: string): string => {
    return path.replace(/\.(jpg|jpeg|png|avif|webp|gif|svg|bmp)$/i, '');
  };

  const generateSrcset = (format: string) => {
    const normalizedSrc = normalizeSrcPath(src);
    const baseName = getBaseName(normalizedSrc);

    if (isHighPriority) {
      return sizesList.map(size =>
        `${baseName}-${size}.${format} ${size}w`
      ).join(', ');
    }
    return `${baseName}.${format}`;
  };

  const getOptimizedSrc = () => {
    if (!src) return src;

    if (disableOptimization) return src;

    const normalizedSrc = normalizeSrcPath(src);
    const baseName = getBaseName(normalizedSrc);

    if (imageQuality === 'low') {
      return `${baseName}-375.avif`;
    } else if (imageQuality === 'medium') {
      return `${baseName}-750.avif`;
    }

    return `${baseName}.avif`;
  };

  const optimizedSrc = getOptimizedSrc();

  const loadImage = () => {
    if (!src) return;

    const loadPriority = isHighPriority ? 'high' : 'low';
    setIsLoading(true);

    const task = imageLoader.preloadImage(optimizedSrc, imageQuality, loadPriority);
    loadTaskRef.current = task;

    task.promise
      .then((img) => {
        setIsLoaded(true);
        setIsLoading(false);
        setIsError(false);
        onLoadingComplete?.(img);
      })
      .catch((err) => {
        console.error('Failed to load image:', err);
        setIsError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadImage();

    return () => {
      loadTaskRef.current?.cancel();
    };
  }, [optimizedSrc, imageQuality, isHighPriority]);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    setIsLoading(false);
    setIsError(false);
    onLoad?.(event);
    onLoadingComplete?.(event.currentTarget);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsError(true);
    setIsLoading(false);
    onError?.(event);
  };

  const getPlaceholderStyle = () => {
    if (placeholder === 'blur' && blurDataURL) {
      return {
        backgroundImage: `url(${blurDataURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(10px)',
      };
    }
    if (placeholder === 'color') {
      return {
        backgroundColor: placeholderColor,
      };
    }
    return {};
  };

  const getOpacity = () => {
    if (placeholder === 'empty') {
      return isLoaded ? 1 : 0;
    }
    return 1;
  };

  const imgStyle = {
    ...getPlaceholderStyle(),
    opacity: getOpacity(),
    transition: placeholder === 'blur' ? 'filter 0.3s ease-in-out' : 'opacity 0.3s ease-in-out',
    ...style,
  };

  if (!src) {
    return null;
  }

  const commonImgProps = {
    ref: imgRef,
    src: optimizedSrc,
    alt,
    className,
    width,
    height,
    loading: actualLoading,
    decoding,
    onLoad: handleLoad,
    onError: handleError,
    style: imgStyle,
    ...restProps,
  };

  if (disableOptimization) {
    return <img {...commonImgProps} />;
  }

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
      <img {...commonImgProps} />
    </picture>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export { OptimizedImage };
