const imageCache = new Map<string, Promise<HTMLImageElement>>();
const loadedImages = new Set<string>();

export function preloadImage(src: string): Promise<HTMLImageElement> {
  if (loadedImages.has(src)) {
    return Promise.resolve(new Image());
  }

  if (imageCache.has(src)) {
    return imageCache.get(src)!;
  }

  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      loadedImages.add(src);
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
  });

  imageCache.set(src, promise);
  return promise;
}

export function preloadImages(srcs: string[]): Promise<HTMLImageElement[]> {
  return Promise.all(srcs.map(src => preloadImage(src)));
}

export function isImageLoaded(src: string): boolean {
  return loadedImages.has(src);
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
