import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { preloadImage, preloadImages } from '@/utils/imageCache';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

const SEASON_IMAGES: Record<Season, string> = {
  spring: '/images/hero-landscape-1.jpg',
  summer: '/images/hero-landscape-2.jpg',
  autumn: '/images/hero-landscape-3.jpg',
  winter: '/images/hero-landscape-4.jpg',
};

interface SeasonBackgroundProps {
  season: Season;
  className?: string;
  children?: React.ReactNode;
  showParticles?: boolean;
}

export function SeasonBackground({ season, className = '', children, showParticles = true }: SeasonBackgroundProps) {
  const [currentImage, setCurrentImage] = useState<string>(SEASON_IMAGES[season]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      await preloadImage(SEASON_IMAGES[season]);
      setCurrentImage(SEASON_IMAGES[season]);
      setIsLoading(false);
    };

    loadImage();
  }, [season]);

  useEffect(() => {
    preloadImages(Object.values(SEASON_IMAGES));
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url(${currentImage})`,
          opacity: isLoading ? 0 : 1
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* Floating Particles - Always visible */}
      {showParticles && (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Sparkles
              key={i}
              className="absolute text-white/30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${12 + Math.random() * 16}px`,
                height: `${12 + Math.random() * 16}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Content - 确保可以交互 */}
      <div className="relative z-20 w-full h-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
}