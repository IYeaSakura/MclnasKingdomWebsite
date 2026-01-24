import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { GameGallery } from './sections/GameGallery';
import { GameFeatures } from './sections/GameFeatures';
import { CTA } from './sections/CTA';
import { Footer } from './sections/Footer';
import SystemShopPage from './pages/SystemShopPage';
import GuildShopPage from './pages/GuildShopPage';
import HallOfFamePage from './pages/HallOfFamePage';
import KingdomsPage from './pages/KingdomsPage';
import DailyNewsPage from './pages/DailyNewsPage';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const scrollPosition = scrollY + 200;

    if (scrollPosition < 500) {
      setActiveSection('home');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#0071e3] to-[#0056b3] flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-br from-[#ff6f2c] to-[#ff8c42] flex items-center justify-center animate-bounce">
            <img src="/images/mc-logo.png" alt="MC Logo" className="w-14 h-14 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 animate-pulse">
            王国之争 × 花葬
          </h1>
          <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-white rounded-full animate-loading" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] animate-fade-in">
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
      <Routes>
        <Route path="/" element={
          <>
            <Hero onNavigate={setActiveSection} />
            <GameGallery />
            <GameFeatures />
            <CTA />
            <Footer />
          </>
        } />
        <Route path="/system-shop" element={<SystemShopPage />} />
        <Route path="/guild-shop" element={<GuildShopPage />} />
        <Route path="/hall-of-fame" element={<HallOfFamePage />} />
        <Route path="/kingdoms" element={<KingdomsPage />} />
        <Route path="/daily-news" element={<DailyNewsPage />} />
      </Routes>
    </div>
  );
}

export default App;
