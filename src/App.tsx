import { useState, useEffect } from 'react';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { SystemShop } from './sections/SystemShop';
import { GuildShop } from './sections/GuildShop';
import { HallOfFame } from './sections/HallOfFame';
import { Kingdoms } from './sections/Kingdoms';
import { DailyNews } from './sections/DailyNews';
import { CTA } from './sections/CTA';
import { Footer } from './sections/Footer';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['shop', 'guild', 'fame', 'kingdoms', 'daily'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }

      // If no section is active, check if we're at home
      if (window.scrollY < 500) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
      <Hero onNavigate={setActiveSection} />
      <SystemShop />
      <GuildShop />
      <HallOfFame />
      <Kingdoms />
      <DailyNews />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
