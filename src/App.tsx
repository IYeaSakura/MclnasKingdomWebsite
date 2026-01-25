import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SeasonProvider } from './contexts/SeasonContext';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { Footer } from './sections/Footer';
import { SeasonContent } from './components/SeasonContent';
import SystemShopPage from './pages/SystemShopPage';
import GuildShopPage from './pages/GuildShopPage';
import HallOfFamePage from './pages/HallOfFamePage';
import KingdomsPage from './pages/KingdomsPage';
import DailyNewsPage from './pages/DailyNewsPage';
import './App.css';

function App() {
  const [, setActiveSection] = useState('home');

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    
    const scrollWithOffset = scrollPosition + 200;
    if (scrollWithOffset < 500) {
      setActiveSection('home');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <SeasonProvider>
      <div className="min-h-screen bg-[#f8f9fa]">
        <Navbar onSectionChange={setActiveSection} />
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen">
              {/* Hero Section */}
              <Hero onNavigate={setActiveSection} />
              
              {/* Content Sections */}
              <SeasonContent />
              <Footer />
            </div>
          } />
          <Route path="/system-shop" element={<SystemShopPage />} />
          <Route path="/guild-shop" element={<GuildShopPage />} />
          <Route path="/hall-of-fame" element={<HallOfFamePage />} />
          <Route path="/kingdoms" element={<KingdomsPage />} />
          <Route path="/daily-news" element={<DailyNewsPage />} />
        </Routes>
      </div>
    </SeasonProvider>
  );
}

export default App;
