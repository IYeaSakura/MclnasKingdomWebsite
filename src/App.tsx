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
  const location = useLocation();

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

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
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
