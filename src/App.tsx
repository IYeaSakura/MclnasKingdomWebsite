import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SeasonProvider } from './contexts/SeasonContext';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { GameGallery } from './sections/GameGallery';
import { GameFeatures } from './sections/GameFeatures';
import { CTA } from './sections/CTA';
import { Footer } from './sections/Footer';
import { SeasonBackground } from './components/SeasonBackground';
import { useSeason } from './contexts/SeasonContext';
import { useMobileDetection } from './hooks/useMobileDetection';
import { MobileWarning } from './components/MobileWarning';
import SystemShopPage from './pages/SystemShopPage';
import GuildShopPage from './pages/GuildShopPage';
import HallOfFamePage from './pages/HallOfFamePage';
import KingdomsPage from './pages/KingdomsPage';
import DailyNewsPage from './pages/DailyNewsPage';
import RankingsPage from './pages/RankingsPage';
import LogsReaderIntroPage from './pages/LogsReaderIntroPage';
import './App.css';

function HomePage() {
  const [currentSection, setCurrentSection] = useState(0);
  const { getSeasonByIndex, currentSeason } = useSeason();

  const SEASONS = ['spring', 'summer', 'autumn', 'winter'] as const;
  const heroSeasonIndex = SEASONS.indexOf(currentSeason);

  const gallerySeason = getSeasonByIndex((heroSeasonIndex + 1) % 4);
  const featuresSeason = getSeasonByIndex((heroSeasonIndex + 2) % 4);
  const ctaSeason = getSeasonByIndex((heroSeasonIndex + 3) % 4);
  const footerSeason = getSeasonByIndex((heroSeasonIndex + 0) % 4);

  const [isScrolling, setIsScrolling] = useState(false);

  const goToSection = (index: number) => {
    if (index < 0 || index > 4 || isScrolling) return;

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
          goToSection(4);
          break;
      }
    };

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
      <div
        className="relative w-full h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
      >
        <div className="w-screen h-screen relative overflow-hidden">
          <Hero onNavigate={() => goToSection(3)} isCurrentSection={currentSection === 0} />
        </div>

        <div className="w-screen h-screen relative overflow-hidden">
          <SeasonBackground season={gallerySeason} className="w-full h-full">
            <GameGallery isCurrentSection={currentSection === 1} />
          </SeasonBackground>
        </div>

        <div className="w-screen h-screen relative overflow-hidden">
          <SeasonBackground season={featuresSeason} className="w-full h-full">
            <GameFeatures isCurrentSection={currentSection === 2} />
          </SeasonBackground>
        </div>

        <div className="w-screen h-screen relative overflow-hidden">
          <SeasonBackground season={ctaSeason} className="w-full h-full">
            <CTA isCurrentSection={currentSection === 3} />
          </SeasonBackground>
        </div>

        <div className="w-screen h-screen relative overflow-hidden">
          <SeasonBackground season={footerSeason} className="w-full h-full">
            <Footer />
          </SeasonBackground>
        </div>
      </div>

      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            className={`w-4 h-4 transition-all duration-300 ${
              currentSection === index
                ? 'bg-[#FFD700] border-2 border-white shadow-[2px_2px_0_#2A2A2A] scale-125'
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
    </div>
  );
}

function App() {
  const { isMobile, isDetected } = useMobileDetection();

  return (
    <SeasonProvider>
      <div className="min-h-screen bg-[#f8f9fa]">
        <MobileWarning isOpen={isDetected && isMobile} />
        <Navbar onSectionChange={() => {}} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/system-shop" element={<SystemShopPage />} />
            <Route path="/guild-shop" element={<GuildShopPage />} />
            <Route path="/hall-of-fame" element={<HallOfFamePage />} />
            <Route path="/kingdoms" element={<KingdomsPage />} />
            <Route path="/daily-news" element={<DailyNewsPage />} />
            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/logs-reader" element={<LogsReaderIntroPage />} />
          </Routes>
        </main>
      </div>
    </SeasonProvider>
  );
}

export default App;
