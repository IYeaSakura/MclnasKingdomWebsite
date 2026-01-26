const imageCache = new Map<string, Promise<HTMLImageElement>>();
const loadedImages = new Set<string>();

export function getOptimizedImageUrl(src: string): string {
  if (/\.(jpg|jpeg|png)$/i.test(src)) {
    return src.replace(/\.(jpg|jpeg|png)$/i, '.avif');
  }
  return `${src}.avif`;
}

export function preloadImage(src: string): Promise<HTMLImageElement> {
  const optimizedSrc = getOptimizedImageUrl(src);
  
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
    img.onerror = reject;
    img.src = optimizedSrc;
  });

  imageCache.set(optimizedSrc, promise);
  return promise;
}

export function preloadImages(srcs: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(srcs.map(src => preloadImage(src)));
}

export function isImageLoaded(src: string): boolean {
  const optimizedSrc = getOptimizedImageUrl(src);
  return loadedImages.has(optimizedSrc);
}

export function clearImageCache(): void {
  imageCache.clear();
  loadedImages.clear();
}

export function getCacheStats(): { cached: number; loaded: number } {
  return {
    cached: imageCache.size,
    loaded: loadedImages.size
  };
}
