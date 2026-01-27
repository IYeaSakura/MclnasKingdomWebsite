import { useEffect, useState } from 'react';
import type { Season } from '@/contexts/SeasonContext';
import { getOptimizedImageUrl } from '@/utils/imageCache';
import { BackgroundSkeleton } from '@/components/BackgroundSkeleton';
import { getOptimalImageQuality } from '@/utils/networkOptimization';
import { imageLoader } from '@/utils/imageLoader';

const SEASON_IMAGES: Record<Season, string> = {
  spring: '/images/hero-landscape-1',
  summer: '/images/hero-landscape-2',
  autumn: '/images/hero-landscape-3',
  winter: '/images/hero-landscape-4',
};

interface SeasonBackgroundProps {
  season: Season;
  className?: string;
  children: React.ReactNode;
  showParticles?: boolean;
}

export function SeasonBackground({ season, className = '', children }: SeasonBackgroundProps) {
  const [currentImage, setCurrentImage] = useState<string>(SEASON_IMAGES[season]);
  const [isLoading, setIsLoading] = useState(true);
  const imageQuality = getOptimalImageQuality();

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      try {
        const optimizedSrc = getOptimizedImageUrl(SEASON_IMAGES[season], imageQuality);
        await imageLoader.preloadImage(optimizedSrc, imageQuality, 'high').promise;
        setCurrentImage(SEASON_IMAGES[season]);
      } catch (error) {
        console.error('Failed to load background image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [season, imageQuality]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {isLoading && <BackgroundSkeleton />}
      
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${getOptimizedImageUrl(currentImage, imageQuality)})`,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      
      <div className="relative z-10 w-full h-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
}
