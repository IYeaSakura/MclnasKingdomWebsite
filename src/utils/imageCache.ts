const imageCache = new Map<string, Promise<HTMLImageElement>>();
const loadedImages = new Set<string>();
const failedImages = new Set<string>();

export function getOptimizedImageUrl(src: string, quality?: 'low' | 'medium' | 'high'): string {
  if (!quality || quality === 'high') {
    if (/\.(jpg|jpeg|png)$/i.test(src)) {
      return src.replace(/\.(jpg|jpeg|png)$/i, '.avif');
    } else if (!/\.(avif|webp)$/i.test(src)) {
      return `${src}.avif`;
    }
    return src;
  }

  if (quality === 'low') {
    if (/\.(jpg|jpeg|png)$/i.test(src)) {
      return src.replace(/\.(jpg|jpeg|png)$/i, '-375.avif');
    } else if (/\.(avif|webp)$/i.test(src)) {
      return src.replace(/\.(avif|webp)$/i, '-375.avif');
    }
    return `${src}-375.avif`;
  }

  if (quality === 'medium') {
    if (/\.(jpg|jpeg|png)$/i.test(src)) {
      return src.replace(/\.(jpg|jpeg|png)$/i, '-750.avif');
    } else if (/\.(avif|webp)$/i.test(src)) {
      return src.replace(/\.(avif|webp)$/i, '-750.avif');
    }
    return `${src}-750.avif`;
  }

  return src;
}

export function preloadImage(src: string, quality?: 'low' | 'medium' | 'high'): Promise<HTMLImageElement> {
  const optimizedSrc = getOptimizedImageUrl(src, quality);
  
  if (loadedImages.has(optimizedSrc)) {
    return Promise.resolve(new Image());
  }

  if (imageCache.has(optimizedSrc)) {
    return imageCache.get(optimizedSrc)!;
  }

  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      loadedImages.add(optimizedSrc);
      resolve(img);
    };
    img.onerror = () => {
      failedImages.add(src);
      
      if (quality && quality !== 'high') {
        console.warn(`Failed to load optimized image ${optimizedSrc}, falling back to high quality`);
        preloadImage(src, 'high').then(resolve).catch(reject);
      } else {
        reject(new Error(`Failed to load image: ${src}`));
      }
    };
    img.src = optimizedSrc;
  });

  imageCache.set(optimizedSrc, promise);
  return promise;
}

export function preloadImages(srcs: string[], quality?: 'low' | 'medium' | 'high'): Promise<HTMLImageElement[]> {
  return Promise.all(srcs.map(src => preloadImage(src, quality)));
}

export function isImageLoaded(src: string): boolean {
  const optimizedSrc = getOptimizedImageUrl(src);
  return loadedImages.has(optimizedSrc);
}

export function clearImageCache(): void {
  imageCache.clear();
  loadedImages.clear();
  failedImages.clear();
}

export function getCacheStats(): { cached: number; loaded: number; failed: number } {
  return {
    cached: imageCache.size,
    loaded: loadedImages.size,
    failed: failedImages.size
  };
}
