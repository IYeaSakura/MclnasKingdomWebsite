import { Sword, Store, Users, Building2, Newspaper, ExternalLink } from 'lucide-react';

const footerLinks = {
  navigation: [
    { label: '系统商店', href: '#shop', icon: Store },
    { label: '花葬商会', href: '#guild', icon: Store },
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
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0071e3] to-[#ff6f2c] flex items-center justify-center overflow-hidden">
                <img src="/images/mc-logo.png" alt="MC Logo" className="w-full h-full object-contain p-1" />
              </div>
              <span className="font-bold text-lg">王国之争 × 花葬</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              史诗级Minecraft王国服务器体验。加入数千名玩家，建立你的王国，在充满魔法与战争的史诗世界中书写你的传奇。
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-lg mb-4">导航</h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <link.icon className="w-4 h-4 group-hover:text-[#0071e3] transition-colors" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-lg mb-4">社区</h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:text-[#0071e3] transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">法律</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="section-container py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 王国之争 × 花葬。保留所有权利。
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">服务器状态:</span>
            <span className="flex items-center gap-2 text-green-400 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              在线
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
