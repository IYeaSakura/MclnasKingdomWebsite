import { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const gameImages = [
  {
    src: '/images/kingdom-main-castle.jpg',
    title: '史诗级王国战争',
    description: '数百名玩家同时参与的大规模战斗，体验真实的战争策略和团队协作。建立你的王国，招募盟友，征服敌人的领土。'
  },
  {
    src: '/images/player-netherite-knight.jpg',
    title: '职业系统',
    description: '丰富的职业选择，每个职业都有独特的技能和玩法。战士、法师、弓箭手等多种职业，相互配合才能取得胜利。'
  },
  {
    src: '/images/kingdom-desert-city.jpg',
    title: '资源争夺',
    description: '控制关键资源点，为你的王国提供发展所需。木材、矿石、食物等资源的管理将决定你的王国能否繁荣发展。'
  },
  {
    src: '/images/kingdom-port-city.jpg',
    title: '城堡建设',
    description: '建造和升级你的城堡，设置防御设施，抵御敌人的进攻。合理的建筑布局和防御策略是生存的关键。'
  },
  {
    src: '/images/kingdom-floating-island.jpg',
    title: '外交系统',
    description: '与其他王国建立外交关系，结成联盟或宣战。复杂的外交关系网络让游戏世界更加真实和有趣。'
  }
];

export function GameGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isMouseInside, setIsMouseInside] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const imageContainer = imageContainerRef.current;
    if (!imageContainer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = imageContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => {
      setIsMouseInside(true);
    };

    const handleMouseLeave = () => {
      setIsMouseInside(false);
      setMousePosition({ x: 0, y: 0 });
    };

    imageContainer.addEventListener('mouseenter', handleMouseEnter);
    imageContainer.addEventListener('mouseleave', handleMouseLeave);
    imageContainer.addEventListener('mousemove', handleMouseMove);

    return () => {
      imageContainer.removeEventListener('mouseenter', handleMouseEnter);
      imageContainer.removeEventListener('mouseleave', handleMouseLeave);
      imageContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % gameImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + gameImages.length) % gameImages.length);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const handleImageLoad = (index: number) => {
    console.log(`Image loaded successfully: ${gameImages[index].src}`);
  };

  const getImageSrc = (index: number) => {
    if (imageErrors[index]) {
      return '/images/kingdom-main-castle.jpg';
    }
    return gameImages[index].src;
  };

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#8C5A2C]/20 border-4 border-[#8C5A2C]/30" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#6B8E23]/20 border-4 border-[#6B8E23]/30" />
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-[#556B2F]/20 border-4 border-[#556B2F]/30" />
        <div className="absolute bottom-40 right-1/4 w-20 h-20 bg-[#9ACD32]/20 border-4 border-[#9ACD32]/30" />
      </div>

      <div className="section-container relative z-10 pt-20">
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-[#4A4A4A] border-4 border-[#2A2A2A] mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ boxShadow: '4px 4px 0 #1A1A1A' }}
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-sm font-bold text-white tracking-wider">探索无限可能</span>
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 transition-all duration-700 delay-100 tracking-wider ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '4px 4px 0 #2A2A2A' }}
          >
            游戏世界
          </h2>
          <p
            className={`text-sm md:text-base text-[#E8E8E8] max-w-xl mx-auto transition-all duration-700 delay-200 font-medium ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            探索无限可能，发现隐藏的宝藏，建立属于你的传奇王国
          </p>
        </div>

        <div className={`relative max-w-5xl mx-auto transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div 
            ref={imageContainerRef}
            className={`relative aspect-[16/9] max-w-3xl mx-auto bg-[#3A3A3A] border-4 border-[#2A2A2A] overflow-hidden transition-all duration-300 ${
              isMouseInside ? 'border-[#8A8A8A] shadow-lg' : ''
            }`} style={{ boxShadow: '4px 4px 0 #1A1A1A' }}>
            <div
              className="absolute inset-0 transition-transform duration-500 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`
              }}
            >
              <img
                src={getImageSrc(currentIndex)}
                alt={gameImages[currentIndex].title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ imageRendering: 'pixelated' }}
                onLoad={() => handleImageLoad(currentIndex)}
                onError={() => handleImageError(currentIndex)}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-transparent transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="bg-[#4A4A4A]/95 border-3 border-[#6A6A6A] p-3" style={{ boxShadow: '3px 3px 0 #2A2A2A' }}>
                <h3 className="text-lg md:text-xl font-black text-white mb-1 transform transition-transform duration-300 group-hover:translate-x-2 tracking-wider">
                  {gameImages[currentIndex].title}
                </h3>
                <p className="text-[#E8E8E8] text-xs md:text-sm transform transition-transform duration-300 group-hover:translate-x-2 font-medium">
                  {gameImages[currentIndex].description}
                </p>
              </div>
            </div>

            <button
              onClick={prevImage}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[#6B8E23] border-2 border-[#4A6B1F] flex items-center justify-center hover:bg-[#7D9E35] hover:scale-105 transition-all duration-300"
              style={{ boxShadow: '2px 2px 0 #3A5B0F' }}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-[#6B8E23] border-2 border-[#4A6B1F] flex items-center justify-center hover:bg-[#7D9E35] hover:scale-105 transition-all duration-300"
              style={{ boxShadow: '2px 2px 0 #3A5B0F' }}
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </button>
          </div>

          <div className="flex justify-center gap-1 mt-4">
            {gameImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 border-2 border-[#2A2A2A] transition-all duration-300 hover:scale-125 ${
                  index === currentIndex
                    ? 'bg-[#FFD700] shadow-lg'
                    : 'bg-[#4A4A4A] hover:bg-[#5A5A5A]'
                }`}
                style={{ boxShadow: index === currentIndex ? '2px 2px 0 #CC9900' : '1px 1px 0 #1A1A1A' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}