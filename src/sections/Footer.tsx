import { useState, useEffect } from 'react';
import { Store, Users, Building2, Newspaper, ExternalLink, Clock } from 'lucide-react';

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

function isMaintenanceTime(): boolean {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;
  const maintenanceStart = 2 * 60;
  const maintenanceEnd = 5 * 60 + 30;
  return currentTime >= maintenanceStart && currentTime < maintenanceEnd;
}

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setIsMaintenance(isMaintenanceTime());
    const interval = setInterval(() => {
      setIsMaintenance(isMaintenanceTime());
    }, 60000);
    return () => clearInterval(interval);
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
    <footer className="bg-gray-900 border-t border-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
              <span className="font-bold text-2xl text-white">王国之争 × 吱吱</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              百人同屏战斗，攻城略地，共争天下之主！加入数千名玩家，建立你的王国，在充满战争的世界中书写你的传奇。
            </p>
            <div 
              className="flex items-center gap-3 relative group cursor-help"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <span className={`w-3 h-3 rounded-full shadow-lg ${
                isMaintenance 
                  ? 'bg-yellow-500 shadow-yellow-500/50' 
                  : 'bg-green-500 shadow-green-500/50 animate-pulse'
              }`} />
              <span className="text-white text-base font-medium">
                {isMaintenance ? '服务器维护中' : '服务器在线'}
              </span>
              <div className={`absolute bottom-full left-0 mb-3 px-4 py-3 bg-gray-800 rounded-xl shadow-xl border border-gray-700 transition-all duration-300 ${
                showTooltip ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium text-sm">维护时间</span>
                </div>
                <p className="text-gray-300 text-sm">每天 2:00 - 5:30</p>
                <div className="absolute bottom-0 left-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800 border-r border-b border-gray-700" />
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h4 className="font-semibold text-white text-xl mb-6">导航</h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-blue-400 transition-colors flex flex-col items-start gap-1 group"
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
            <h4 className="font-semibold text-white text-xl mb-6">社区</h4>
            <ul className="space-y-4">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors flex flex-col items-start gap-1 group"
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
            <h4 className="font-semibold text-white text-xl mb-6">法律</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors font-medium text-base group-hover:translate-x-1 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 relative z-10">
        <div className={`section-container py-8 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <p className="text-gray-400 text-base text-center">
            © 2024 王国之争 × 吱吱。保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
}
