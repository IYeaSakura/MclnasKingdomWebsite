import { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface FullPageScrollProps {
  children: React.ReactNode[];
  onSectionChange?: (index: number) => void;
}

export function FullPageScroll({ children, onSectionChange }: FullPageScrollProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const totalSections = children.length;

  const goToSection = useCallback((index: number) => {
    if (index < 0 || index >= totalSections || isScrolling) return;
    
    setIsScrolling(true);
    setCurrentSection(index);
    onSectionChange?.(index);
    
    // 防止快速滚动
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }, [totalSections, isScrolling, onSectionChange]);

  const nextSection = useCallback(() => {
    goToSection(currentSection + 1);
  }, [currentSection, goToSection]);

  const prevSection = useCallback(() => {
    goToSection(currentSection - 1);
  }, [currentSection, goToSection]);

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;
      
      if (e.deltaY > 10) {
        nextSection();
      } else if (e.deltaY < -10) {
        prevSection();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          nextSection();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prevSection();
          break;
        case 'Home':
          e.preventDefault();
          goToSection(0);
          break;
        case 'End':
          e.preventDefault();
          goToSection(totalSections - 1);
          break;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) return;
      
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSection();
        } else {
          prevSection();
        }
      }
    };

    // 禁用默认滚动行为
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [currentSection, isScrolling, nextSection, prevSection, goToSection, totalSections]);

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden">
      {/* Sections Wrapper */}
      <div 
        className="relative w-full h-full transition-transform duration-1000 ease-in-out"
        style={{ 
          transform: `translateY(-${currentSection * 100}vh)`,
          height: `${totalSections * 100}vh`
        }}
      >
        {children.map((child, index) => (
          <div 
            key={index} 
            className="w-full h-screen relative overflow-hidden"
            style={{ transform: 'translateZ(0)' }} // 启用硬件加速
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            className={`w-4 h-4 transition-all duration-300 ${
              currentSection === index
                ? 'bg-[#FFD700] border-2 border-[#FFFFFF] scale-125'
                : 'bg-[#4A4A4A]/80 border-2 border-[#6A6A6A] hover:bg-[#6A6A6A] hover:border-[#8A8A8A] hover:shadow-[2px_2px_0_#2A2A2A] hover:-translate-y-0.5'
            }`}
            style={{
              imageRendering: 'pixelated',
              boxShadow: currentSection === index ? '3px 3px 0 #2A2A2A' : 'none'
            }}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Down Arrow */}
      {currentSection < totalSections - 1 && (
        <button
          onClick={nextSection}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 hover:scale-110 animate-bounce"
          aria-label="Next section"
        >
          <ChevronDown className="w-3 h-3 text-white" />
        </button>
      )}

      {/* Up Arrow */}
      {currentSection > 0 && (
        <button
          onClick={prevSection}
          className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 hover:scale-110"
          aria-label="Previous section"
        >
          <ChevronDown className="w-3 h-3 text-white rotate-180" />
        </button>
      )}
    </div>
  );
}