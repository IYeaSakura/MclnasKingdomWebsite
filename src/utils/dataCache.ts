const dataCache = new Map<string, Promise<any>>();

export function createCachedDataLoader<T>(
  cacheKey: string,
  loader: () => Promise<T>
): () => Promise<T> {
  return async () => {
    if (dataCache.has(cacheKey)) {
      return dataCache.get(cacheKey)!;
    }

    const promise = loader();
    dataCache.set(cacheKey, promise);
    return promise;
  };
}

export function clearDataCache(): void {
  dataCache.clear();
}

export function getCacheStats(): { cached: number } {
  return {
    cached: dataCache.size
  };
}
