import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SeasonProvider } from './contexts/SeasonContext';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { GameGallery } from './sections/GameGallery';
import { GameFeatures } from './sections/GameFeatures';
import { CTA } from './sections/CTA';
import { SeasonBackground } from './components/SeasonBackground';
import { useSeason } from './contexts/SeasonContext';
import SystemShopPage from './pages/SystemShopPage';
import GuildShopPage from './pages/GuildShopPage';
import HallOfFamePage from './pages/HallOfFamePage';
import KingdomsPage from './pages/KingdomsPage';
import DailyNewsPage from './pages/DailyNewsPage';
import './App.css';

function HomePage() {
  const [currentSection, setCurrentSection] = useState(0);
  const { getSeasonByIndex, currentSeason } = useSeason();
  
  const SEASONS = ['spring', 'summer', 'autumn', 'winter'] as const;
  const heroSeasonIndex = SEASONS.indexOf(currentSeason);
  
  // 计算每个区域对应的季节
  const gallerySeason = getSeasonByIndex((heroSeasonIndex + 1) % 4);
  const featuresSeason = getSeasonByIndex((heroSeasonIndex + 2) % 4);
  const ctaSeason = getSeasonByIndex((heroSeasonIndex + 3) % 4);

  const [isScrolling, setIsScrolling] = useState(false);

  const goToSection = (index: number) => {
    if (index < 0 || index > 3 || isScrolling) return;
    
    setIsScrolling(true);
    setCurrentSection(index);
    
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  const nextSection = () => goToSection(currentSection + 1);
  const prevSection = () => goToSection(currentSection - 1);

  useEffect(() => {
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
          goToSection(3);
          break;
      }
    };

    // 禁用默认滚动
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, isScrolling]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* Sections Container - 严格的100vh每个 */}
      <div 
        className="relative w-full h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
      >
        {/* Hero Section - 首屏 */}
        <div className="w-screen h-screen relative overflow-hidden">
          <Hero onNavigate={() => {}} />
        </div>
        
        {/* Game Gallery Section */}
        <div className="w-screen h-screen relative overflow-hidden">
          <SeasonBackground season={gallerySeason} className="w-full h-full">
            <GameGallery />
          </SeasonBackground>
        </div>
        
        {/* Game Features Section */}
        <div className="w-screen h-screen relative overflow-hidden">
          <SeasonBackground season={featuresSeason} className="w-full h-full">
            <GameFeatures />
          </SeasonBackground>
        </div>
        
        {/* CTA Section */}
        <div className="w-screen h-screen relative overflow-hidden">
          <SeasonBackground season={ctaSeason} className="w-full h-full">
            <CTA />
          </SeasonBackground>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>


    </div>
  );
}

function App() {
  return (
    <SeasonProvider>
      <div className="min-h-screen bg-[#f8f9fa]">
        <Navbar onSectionChange={() => {}} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/system-shop" element={<SystemShopPage />} />
            <Route path="/guild-shop" element={<GuildShopPage />} />
            <Route path="/hall-of-fame" element={<HallOfFamePage />} />
            <Route path="/kingdoms" element={<KingdomsPage />} />
            <Route path="/daily-news" element={<DailyNewsPage />} />
          </Routes>
        </main>
      </div>
    </SeasonProvider>
  );
}

export default App;