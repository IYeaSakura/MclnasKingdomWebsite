import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sword, Store, Users, Building2, Newspaper } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'shop', label: '系统商店', icon: Store },
  { id: 'guild', label: '花葬商会', icon: Sword },
  { id: 'fame', label: '名人堂', icon: Users },
  { id: 'kingdoms', label: '王国传', icon: Building2 },
  { id: 'daily', label: '日报', icon: Newspaper },
];

export function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    onSectionChange(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    onSectionChange('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg h-16'
          : 'bg-transparent h-20'
      }`}
    >
      <div className="section-container h-full flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0071e3] to-[#ff6f2c] flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 overflow-hidden">
            <img src="/images/mc-logo.png" alt="MC Logo" className="w-full h-full object-contain p-1" />
          </div>
          <span className={`font-bold text-lg transition-colors duration-300 ${
            isScrolled ? 'text-gray-800' : 'text-white'
          }`}>
            王国之争
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeSection === item.id
                  ? 'text-[#0071e3] bg-[#0071e3]/10'
                  : isScrolled
                  ? 'text-gray-600 hover:text-[#0071e3] hover:bg-gray-100'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2">
                <item.icon className="w-4 h-4" />
                {item.label}
              </span>
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0071e3]" />
              )}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            onClick={() => scrollToSection('guild')}
            className="mc-button-primary rounded-lg px-6"
          >
            加入我们
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeSection === item.id
                  ? 'text-[#0071e3] bg-[#0071e3]/10'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection('guild')}
            className="w-full mc-button-primary mt-4"
          >
            加入我们
          </Button>
        </div>
      </div>
    </nav>
  );
}
