import { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % gameImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + gameImages.length) % gameImages.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#f8f9fa] to-gray-100 relative overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-800 mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Sparkles className="inline-block w-10 h-10 mr-3 text-[#ff6f2c]" />
            游戏世界
          </h2>
          <p
            className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            探索无限可能，发现隐藏的宝藏，建立属于你的传奇王国
          </p>
        </div>

        <div
          className={`relative max-w-5xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src={gameImages[currentIndex].src}
              alt={gameImages[currentIndex].title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-3xl font-bold text-white mb-2">
                {gameImages[currentIndex].title}
              </h3>
              <p className="text-white/80 text-lg">
                {gameImages[currentIndex].description}
              </p>
            </div>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group-hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group-hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {gameImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-[#ff6f2c]'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
