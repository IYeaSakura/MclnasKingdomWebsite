import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Store, Users, Building2, Newspaper, ShoppingBag, Trophy } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

interface NavbarProps {
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'shop', label: '系统商店', icon: Store, path: '/system-shop' },
  { id: 'guild', label: '兔吱吱商会', icon: ShoppingBag, path: '/guild-shop' },
  { id: 'fame', label: '名人堂', icon: Users, path: '/hall-of-fame' },
  { id: 'kingdoms', label: '王国传', icon: Building2, path: '/kingdoms' },
  { id: 'daily', label: '日报', icon: Newspaper, path: '/daily-news' },
  { id: 'rankings', label: '排行榜', icon: Trophy, path: '/rankings' },
];

export function Navbar({ onSectionChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    onSectionChange('home');
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shouldShowSolidBackground = !isHomePage || isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldShowSolidBackground
          ? 'bg-white/95 backdrop-blur-xl shadow-lg h-16'
          : 'bg-transparent h-20'
      }`}
    >
      <div className="section-container h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={scrollToTop}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-20 h-10 aspect-[2/1] rounded-lg flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 overflow-hidden">
            <OptimizedImage src="/images/mc-logo.png" alt="MC Logo" className="w-full h-full object-contain" />
          </div>
          <span className={`font-bold text-lg transition-colors duration-300 ${
            shouldShowSolidBackground ? 'text-gray-800' : 'text-white'
          }`}>
            王国之争
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                location.pathname === item.path
                  ? 'text-[#0071e3] bg-[#0071e3]/10'
                  : shouldShowSolidBackground
                  ? 'text-gray-600 hover:text-[#0071e3] hover:bg-gray-100'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2">
                <item.icon className="w-4 h-4" />
                {item.label}
              </span>
              {location.pathname === item.path && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0071e3]" />
              )}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button
            onClick={() => scrollToTop()}
            className="mc-button-primary rounded-lg px-6"
          >
            首页
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            shouldShowSolidBackground ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'
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
              onClick={() => {
                handleNavClick(item.path);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                location.pathname === item.path
                  ? 'text-[#0071e3] bg-[#0071e3]/10'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => {
              scrollToTop();
              setIsMobileMenuOpen(false);
            }}
            className="w-full mc-button-primary mt-4"
          >
            首页
          </Button>
        </div>
      </div>
    </nav>
  );
}
