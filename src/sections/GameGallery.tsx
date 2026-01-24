import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section className="py-32 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-20">
          <h2
            className={`text-5xl md:text-6xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            游戏世界
          </h2>
          <p
            className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            探索无限可能，发现隐藏的宝藏，建立属于你的传奇王国
          </p>
        </div>

        <div
          ref={containerRef}
          className={`relative max-w-7xl mx-auto transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl group bg-gradient-to-br from-gray-100 to-gray-200">
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
              }}
            >
              <img
                src={gameImages[currentIndex].src}
                alt={gameImages[currentIndex].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-10 md:p-14">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 transform transition-transform duration-300 group-hover:translate-x-2">
                {gameImages[currentIndex].title}
              </h3>
              <p className="text-white/90 text-lg md:text-xl transform transition-transform duration-300 group-hover:translate-x-2">
                {gameImages[currentIndex].description}
              </p>
            </div>

            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl group-hover:-translate-x-2"
            >
              <ChevronLeft className="w-7 h-7 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl group-hover:translate-x-2"
            >
              <ChevronRight className="w-7 h-7 text-gray-800" />
            </button>
          </div>

          <div className="flex justify-center gap-4 mt-10">
            {gameImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-150 ${
          index === currentIndex
                    ? 'w-12 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
}
