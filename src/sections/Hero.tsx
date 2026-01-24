import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Shield, Crown, Sparkles, RefreshCw } from 'lucide-react';
import { preloadImage, preloadImages } from '@/utils/imageCache';

interface HeroProps {
  onNavigate: (section: string) => void;
}

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

const SEASON_IMAGES: Record<Season, string> = {
  spring: '/images/hero-landscape-1.jpg',
  summer: '/images/hero-landscape-2.jpg',
  autumn: '/images/hero-landscape-3.jpg',
  winter: '/images/hero-landscape-4.jpg',
};

const SEASON_NAMES: Record<Season, string> = {
  spring: '春季',
  summer: '夏季',
  autumn: '秋季',
  winter: '冬季',
};

const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

function getCurrentSeason(): Season {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
}

function getNextSeason(currentSeason: Season): Season {
  const currentIndex = SEASONS.indexOf(currentSeason);
  return SEASONS[(currentIndex + 1) % SEASONS.length];
}

export function Hero({ onNavigate }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSeason, setCurrentSeason] = useState<Season>(getCurrentSeason());
  const [currentImage, setCurrentImage] = useState<string>(SEASON_IMAGES[getCurrentSeason()]);
  const [nextImage, setNextImage] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    preloadImages(Object.values(SEASON_IMAGES));
  }, []);

  const switchSeason = async () => {
    if (isTransitioning) return;
    
    const nextSeason = getNextSeason(currentSeason);
    const nextSeasonImage = SEASON_IMAGES[nextSeason];
    
    if (nextSeasonImage === currentImage) return;
    
    setIsTransitioning(true);
    setNextImage(nextSeasonImage);
    
    await preloadImage(nextSeasonImage);
    
    setTimeout(() => {
      setCurrentImage(nextSeasonImage);
      setCurrentSeason(nextSeason);
      setNextImage('');
      setIsTransitioning(false);
    }, 100);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    onNavigate(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.1)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(${currentImage})`,
            opacity: isTransitioning ? 0 : 1
          }}
        />
        {nextImage && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{ 
              backgroundImage: `url(${nextImage})`,
              opacity: isTransitioning ? 1 : 0
            }}
          />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Floating Particles */}
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

      {/* Content */}
      <div className="relative z-20 section-container text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Shield className="w-4 h-4 text-[#0071e3]" />
          <span className="text-sm font-medium text-gray-700">Minecraft中国版最大派系战争服务器</span>
        </div>

        {/* Main Title */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="block mb-2">王国之争</span>
          <span className="block text-4xl md:text-5xl lg:text-6xl">
            <span className="text-[#0071e3] drop-shadow-lg">×</span>
            <span 
              className="gradient-text drop-shadow-2xl"
              style={{
                textShadow: '0 4px 8px rgba(0, 113, 227, 0.3), 0 8px 16px rgba(255, 111, 44, 0.2)',
                filter: 'drop-shadow(0 2px 4px rgba(0, 113, 227, 0.4))'
              }}
            >
              吱吱
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-4 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          百人同屏战斗，攻城略地，共争天下之主！
        </p>

        {/* Description */}
        <p
          className={`text-sm md:text-base text-white/60 max-w-xl mx-auto mb-10 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          加入数千名玩家，建立你的王国，结成联盟，在充满战争的世界中书写你的传奇
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Button
            onClick={() => scrollToSection('cta')}
            className="mc-button-secondary group px-8 py-6 text-lg rounded-xl"
          >
            <Crown className="w-5 h-5 mr-2" />
            开始冒险
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => scrollToSection('kingdoms')}
              className="group px-8 py-6 text-lg rounded-xl border-2 border-white/60 text-white bg-black/40 hover:bg-black/60 hover:border-white/80 hover:text-white"
            >
              <Play className="w-5 h-5 mr-2" />
              了解更多
            </Button>
            <Button
              variant="outline"
              onClick={switchSeason}
              disabled={isTransitioning}
              className="group px-4 py-6 rounded-xl border-2 border-white/60 text-white bg-black/40 hover:bg-black/60 hover:border-white/80 hover:text-white disabled:opacity-50"
              title={`切换到${SEASON_NAMES[getNextSeason(currentSeason)]}`}
            >
              <RefreshCw className={`w-5 h-5 ${isTransitioning ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '300+', label: '活跃玩家' },
            { value: '1000+', label: '王国数量' },
            { value: '10年+', label: '运营时间' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center group cursor-default"
            >
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-[#0071e3] transition-colors">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8f9fa] to-transparent z-30" />
    </section>
  );
}
