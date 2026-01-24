import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { preloadImages } from '@/utils/imageCache';

const gameImages = [
  {
    src: '/images/kingdom-main-castle.jpg',
    title: '宏伟城堡',
    description: '建立你的王国，从一座宏伟的城堡开始',
  },
  {
    src: '/images/kingdom-forest-village.jpg',
    title: '森林村庄',
    description: '在茂密的森林中建立你的领地',
  },
  {
    src: '/images/kingdom-desert-city.jpg',
    title: '沙漠城市',
    description: '征服荒漠，建立繁荣的贸易城市',
  },
  {
    src: '/images/kingdom-floating-island.jpg',
    title: '浮空岛屿',
    description: '探索神秘的浮空岛屿，发现隐藏的宝藏',
  },
  {
    src: '/images/kingdom-snow-fortress.jpg',
    title: '雪地要塞',
    description: '在极寒之地建立坚不可摧的要塞',
  },
  {
    src: '/images/kingdom-port-city.jpg',
    title: '港口城市',
    description: '控制海上贸易，成为海上霸主',
  },
];

export function GameGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    preloadImages(gameImages.map(img => img.src));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % gameImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + gameImages.length) % gameImages.length);
  };

  return (
    <section className="py-32 bg-gradient-to-b from-[#5D8C5E] to-[#4A7C4B] relative overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#8C5A2C]/20 border-4 border-[#8C5A2C]/30" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#6B8E23]/20 border-4 border-[#6B8E23]/30" />
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-[#556B2F]/20 border-4 border-[#556B2F]/30" />
        <div className="absolute bottom-40 right-1/4 w-20 h-20 bg-[#9ACD32]/20 border-4 border-[#9ACD32]/30" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-20">
          <div
            className={`inline-flex items-center gap-2 px-6 py-3 bg-[#4A4A4A] border-4 border-[#2A2A2A] mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ boxShadow: '4px 4px 0 #1A1A1A' }}
          >
            <Sparkles className="w-5 h-5 text-[#FFD700]" />
            <span className="text-sm font-bold text-white tracking-wider">探索无限可能</span>
          </div>
          <h2
            className={`text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 transition-all duration-700 delay-100 tracking-wider ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '4px 4px 0 #2A2A2A' }}
          >
            游戏世界
          </h2>
          <p
            className={`text-lg md:text-xl text-[#E8E8E8] max-w-2xl mx-auto transition-all duration-700 delay-200 font-medium ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            探索无限可能，发现隐藏的宝藏，建立属于你的传奇王国
          </p>
        </div>

        <div
          ref={containerRef}
          className={`relative max-w-7xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative aspect-[16/9] bg-[#3A3A3A] border-8 border-[#2A2A2A] overflow-hidden group" style={{ boxShadow: '8px 8px 0 #1A1A1A' }}>
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
              }}
            >
              <img
                src={gameImages[currentIndex].src}
                alt={gameImages[currentIndex].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ imageRendering: 'pixelated' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="bg-[#4A4A4A]/9595 border-4 border-[#6A6A6A] p-6" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 transform transition-transform duration-300 group-hover:translate-x-2 tracking-wider">
                  {gameImages[currentIndex].title}
                </h3>
                <p className="text-[#E8E8E8] text-base md:text-lg transform transition-transform duration-300 group-hover:translate-x-2 font-medium">
                  {gameImages[currentIndex].description}
                </p>
              </div>
            </div>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-[#6B8E23] border-4 border-[#4A6B1F] flex items-center justify-center hover:bg-[#7D9E35] hover:scale-105 transition-all duration-300 group-hover:-translate-x-2"
              style={{ boxShadow: '4px 4px 0 #3A5B0F' }}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-[#6B8E23] border-4 border-[#4A6B1F] flex items-center justify-center hover:bg-[#7D9E35] hover:scale-105 transition-all duration-300 group-hover:translate-xX-2"
              style={{ boxShadow: '4px 4px 0 #3A5B0F' }}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {gameImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-6 h-6 border-4 border-[#2A2A2A] transition-all duration-300 hover:scale-125 ${
                  index === currentIndex
                    ? 'bg-[#FFD700] shadow-lg'
                    : 'bg-[#4A4A4A] hover:bg-[#5A5A5A]'
                }`}
                style={{ boxShadow: index === currentIndex ? '4px 4px 0 #CC9900' : '2px 2px 0 #1A1A1A' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
