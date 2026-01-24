import { useState, useEffect } from 'react';
import { Store, Users, Building2, Newspaper, ExternalLink } from 'lucide-react';

const footerLinks = {
  navigation: [
    { label: '系统商店', href: '#shop', icon: Store },
    { label: '吱吱商会', href: '#guild', icon: Store },
    { label: '名人堂', href: '#fame', icon: Users },
    { label: '王国传', href: '#kingdoms', icon: Building2 },
    { label: '日报', href: '#daily', icon: Newspaper },
  ],
  social: [
    { label: '官方微博', href: '#' },
    { label: 'QQ群: 123456789', href: '#' },
    { label: 'B站频道', href: '#' },
  ],
  legal: [
    { label: '隐私政策', href: '#' },
    { label: '服务条款', href: '#' },
    { label: '联系我们', href: '#' },
  ],
};

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="section-container py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className={`lg:col-span-1 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center overflow-hidden shadow-lg shadow-blue-500/30">
                <img src="/images/mc-logo.png" alt="MC Logo" className="w-full h-full object-contain p-2" />
              </div>
              <span className="font-bold text-2xl text-gray-900">王国之争 × 吱吱</span>
            </div>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              百人同屏战斗，攻城略地，共争天下之主！加入数千名玩家，建立你的王国，在充满战争的世界中书写你的传奇。
            </p>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
              <span className="text-gray-800 text-base font-medium">服务器在线</span>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h4 className="font-semibold text-gray-900 text-xl mb-6">导航</h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex flex-col items-start gap-1 group"
                  >
                    <div className="flex items-center gap-2">
                      <link.icon className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                      <span className="font-medium text-base group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h4 className="font-semibold text-gray-900 text-xl mb-6">社区</h4>
            <ul className="space-y-4">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex flex-col items-start gap-1 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                      <span className="font-medium text-base group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h4 className="font-semibold text-gray-900 text-xl mb-6">法律</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-base group-hover:translate-x-1 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 relative z-10">
        <div className={`section-container py-8 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <p className="text-gray-500 text-base text-center">
            © 2024 王国之争 × 吱吱。保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
}
