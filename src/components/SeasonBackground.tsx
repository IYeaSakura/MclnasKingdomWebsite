import { useEffect, useState } from 'react';
import type { Season } from '@/contexts/SeasonContext';
import { preloadImage, preloadImages, getOptimizedImageUrl } from '@/utils/imageCache';

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

  useEffect(() => {
    const loadImage = async () => {
      console.log('Loading season background:', season, SEASON_IMAGES[season]);
      setIsLoading(true);
      try {
        await preloadImage(SEASON_IMAGES[season]);
        setCurrentImage(SEASON_IMAGES[season]);
        console.log('Background loaded successfully:', SEASON_IMAGES[season]);
      } catch (error) {
        console.error('Failed to load background image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [season]);

  useEffect(() => {
    preloadImages(Object.values(SEASON_IMAGES));
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Background Image - 确保正确显示 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${getOptimizedImageUrl(currentImage)})`,
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 1s ease-in-out'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* Content - 确保可以交互 */}
      <div className="relative z-10 w-full h-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
}