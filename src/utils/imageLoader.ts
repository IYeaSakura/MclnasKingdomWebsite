interface ImageLoadTask {
  src: string;
  quality?: 'low' | 'medium' | 'high';
  priority: 'high' | 'medium' | 'low';
  resolve: (img: HTMLImageElement) => void;
  reject: (error: Error) => void;
}

class ImageLoader {
  private queue: ImageLoadTask[] = [];
  private activeLoads = 0;
  private maxConcurrentLoads = 3;
  private loadedImages = new Set<string>();
  private loadingImages = new Set<string>();

  constructor(maxConcurrentLoads: number = 3) {
    this.maxConcurrentLoads = maxConcurrentLoads;
  }

  setMaxConcurrentLoads(max: number): void {
    this.maxConcurrentLoads = max;
  }

  preloadImage(src: string, quality?: 'low' | 'medium' | 'high', priority: 'high' | 'medium' | 'low' = 'medium'): { promise: Promise<HTMLImageElement>; cancel: () => void } {
    const cacheKey = `${src}-${quality || 'high'}`;
    
    if (this.loadedImages.has(cacheKey)) {
      const img = new Image();
      img.src = src;
      return {
        promise: Promise.resolve(img),
        cancel: () => {}
      };
    }

    if (this.loadingImages.has(cacheKey)) {
      return {
        promise: new Promise((resolve, reject) => {
          const existingTask = this.queue.find(t => t.src === src && t.quality === quality);
          if (existingTask) {
            existingTask.resolve = resolve;
            existingTask.reject = reject;
          } else {
            resolve(new Image());
          }
        }),
        cancel: () => {}
      };
    }

    let resolveFn: (img: HTMLImageElement) => void;
    let rejectFn: (error: Error) => void;

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      resolveFn = resolve;
      rejectFn = reject;
    });

    const task: ImageLoadTask = {
      src,
      quality,
      priority,
      resolve: resolveFn!,
      reject: rejectFn!
    };

    this.queue.push(task);
    this.loadingImages.add(cacheKey);
    this.processQueue();

    return {
      promise,
      cancel: () => {
        const index = this.queue.indexOf(task);
        if (index > -1) {
          this.queue.splice(index, 1);
          this.loadingImages.delete(cacheKey);
        }
      }
    };
  }

  private processQueue(): void {
    if (this.activeLoads >= this.maxConcurrentLoads || this.queue.length === 0) {
      return;
    }

    this.queue.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    const task = this.queue.shift();
    if (!task) return;

    this.activeLoads++;
    this.loadImage(task);
  }

  private loadImage(task: ImageLoadTask): void {
    const img = new Image();
    
    img.onload = () => {
      this.loadedImages.add(`${task.src}-${task.quality || 'high'}`);
      this.loadingImages.delete(`${task.src}-${task.quality || 'high'}`);
      this.activeLoads--;
      task.resolve(img);
      this.processQueue();
    };

    img.onerror = () => {
      this.loadingImages.delete(`${task.src}-${task.quality || 'high'}`);
      this.activeLoads--;
      
      if (task.quality && task.quality !== 'high') {
        console.warn(`Failed to load image ${task.src} with quality ${task.quality}, falling back to high quality`);
        const fallbackTask = { ...task, quality: undefined as 'low' | 'medium' | 'high' | undefined };
        this.queue.unshift(fallbackTask);
        this.processQueue();
      } else {
        task.reject(new Error(`Failed to load image: ${task.src}`));
      }
    };

    img.src = task.src;
  }

  preloadImages(srcs: string[], quality?: 'low' | 'medium' | 'high', priority: 'high' | 'medium' | 'low' = 'medium'): Promise<HTMLImageElement[]> {
    return Promise.all(srcs.map(src => this.preloadImage(src, quality, priority).promise));
  }

  isLoaded(src: string, quality?: 'low' | 'medium' | 'high'): boolean {
    return this.loadedImages.has(`${src}-${quality || 'high'}`);
  }

  clearCache(): void {
    this.loadedImages.clear();
    this.loadingImages.clear();
    this.queue = [];
  }

  getStats(): { loaded: number; loading: number; queued: number } {
    return {
      loaded: this.loadedImages.size,
      loading: this.loadingImages.size,
      queued: this.queue.length
    };
  }
}

export const imageLoader = new ImageLoader(3);
