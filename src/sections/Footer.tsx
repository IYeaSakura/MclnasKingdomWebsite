import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Users, Building2, Newspaper, ExternalLink, Clock, Trophy, ShoppingBag } from 'lucide-react';
import { OptimizedImage } from '@/components/OptimizedImage';

const footerLinks = {
  navigation: [
    { label: '系统商店', href: '#shop', icon: Store },
    { label: '兔吱吱商会', href: '#guild', icon: ShoppingBag },
    { label: '名人堂', href: '#fame', icon: Users },
    { label: '王国传', href: '#kingdoms', icon: Building2 },
    { label: '日报', href: '#daily', icon: Newspaper },
    { label: '排行榜', href: '#rankings', icon: Trophy },
  ],
  social: [
    { label: '官方微博', href: '#' },
    { label: 'QQ群: XXXXXXXXX', href: '#' },
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
  const navigate = useNavigate();

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
    } else if (href === '#rankings') {
      navigate('/rankings');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1A1A1A] border-t-4 border-[#2A2A2A] relative overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#8C5A2C]/20 border-4 border-[#8C5A2C]/30" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#6B8E23]/20 border-4 border-[#6B8E23]/30" />
        <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-[#556B2F]/20 border-4 border-[#556B2F]/30" />
      </div>

      <div className="section-container py-20 relative z-10">
        <div className="bg-[#4A4A4A] border-4 border-[#6A6A6A] p-8 md:p-10 transition-all duration-500" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 border-4 flex items-center justify-center" style={{ backgroundColor: '#FFD700', borderColor: '#CC9900', boxShadow: '4px 4px 0 #1A1A1A' }}>
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-wider" style={{ textShadow: '3px 3px 0 #2A2A2A' }}>Mc部落</h3>
          </div>
          <p className="text-[#E8E8E8] text-base leading-relaxed mb-6 font-medium">
            团队十年积累，耗时两年为热爱 我的世界PVP 的玩家们倾力匠心打造的大型派系战争服务器。当前是国内机制完善，寿命最长久，玩法最优秀，趣味性最强，用户自我扩展性最佳的派系服！
          </p>
          <p className="text-[#E8E8E8] text-base leading-relaxed mb-8 font-medium">
            您可以是通过努力，带领国民发家致富的国王！也可以是带领千军万马征战沙场的传奇将军！您更可以自主创新，颁布各式的发展规则实现您各种奇妙的想法！在王国与王国之间不断的碰撞与交流中，体验万千种不一样的乐趣！
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div className="group flex items-center gap-3 bg-[#3A3A3A] border-4 border-[#4A4A4A] p-4 hover:border-[#6A6A6A] transition-all duration-300 hover:scale-105" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
              <div className="w-10 h-10 border-4 flex items-center justify-center group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#FFD700', borderColor: '#CC9900' }}>
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium tracking-wider text-sm">百人同屏战斗，攻城略地，共争天下之主！</span>
            </div> */}
            {/* <div className="group flex items-center gap-3 bg-[#3A3A3A] border-4 border-[#4A4A4A] p-4 hover:border-[#6A6A6A] transition-all duration-300 hover:scale-105" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
              <div className="w-10 h-10 border-4 flex items-center justify-center group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#9370DB', borderColor: '#5B3B8C' }}>
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium tracking-wider text-sm">职业相互克制与成就，没有最强的人，只有最好的团队配合！</span>
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
          <div className={`lg:col-span-1 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="border-4 border-[#4A4A4A] flex items-center justify-center overflow-hidden" style={{ boxShadow: '4px 4px 0 #2A2A2A', boxSizing: 'border-box' }}>
                <OptimizedImage src="/images/raw/mc-logo.png" alt="MC Logo" className="w-auto h-auto object-contain" priority="high" />
              </div>
              <span className="font-black text-2xl text-white tracking-wider" style={{ textShadow: '3px 3px 0 #2A2A2A' }}>王国之争 × SAKURAIN</span>
            </div>
            <p className="text-[#E8E8E8] text-base leading-relaxed mb-6 font-medium">
              百人同屏战斗，攻城略地，共争天下之主！加入数千名玩家，建立你的王国，在充满战争的世界中书写你的传奇。
            </p>
            <div
              className="flex items-center gap-3 relative group cursor-help"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <span className={`w-4 h-4 border-2 border-[#2A2A2A] ${
                isMaintenance
                  ? 'bg-[#FFD700]'
                  : 'bg-[#6B8E23] animate-pulse'
              }`} style={{ boxShadow: '2px 2px 0 #1A1A1A' }} />
              <span className="text-white text-base font-bold" style={{ textShadow: '2px 2px 0 #2A2A2A' }}>
                {isMaintenance ? '服务器维护中' : '服务器在线'}
              </span>
              <div className={`absolute bottom-full left-0 mb-3 px-4 py-3 bg-[#2A2A2A] border-4 border-[#4A4A4A] transition-all duration-300 ${
                showTooltip ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`} style={{ boxShadow: '4px 4px 0 #1A1A1A' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-white font-bold text-sm tracking-wider">维护时间</span>
                </div>
                <p className="text-[#E8E8E8] text-sm font-medium">每天 2:00 - 5:30</p>
                <div className="absolute bottom-0 left-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-[#2A2A2A] border-r-4 border-b-4 border-[#4A4A4A]" />
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h4 className="font-black text-white text-xl mb-6 tracking-wider" style={{ textShadow: '2px 2px 0 #2A2A2A' }}>导航</h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-[#E8E8E8] hover:text-[#FFD700] transition-colors flex flex-col items-start gap-1 group"
                  >
                    <div className="flex items-center gap-2">
                      <link.icon className="w-5 h-5 group-hover:scale-110 transition-all duration-300" />
                      <span className="font-bold text-base tracking-wider group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h4 className="font-black text-white text-xl mb-6 tracking-wider" style={{ textShadow: '2px 2px 0 #2A2A2A' }}>社区</h4>
            <ul className="space-y-4">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#E8E8E8] hover:text-[#FFD700] transition-colors flex flex-col items-start gap-1 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-all duration-300" />
                      <span className="font-bold text-base tracking-wider group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <h4 className="font-black text-white text-xl mb-6 tracking-wider" style={{ textShadow: '2px 2px 0 #2A2A2A' }}>法律</h4>
            <ul className="space-y-4">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#E8E8E8] hover:text-[#FFD700] transition-colors font-bold text-base tracking-wider group-hover:translate-x-1 block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t-4 border-[#2A2A2A] relative z-10">
        <div className={`section-container py-6 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <p className="text-[#E8E8E8] text-base text-center font-medium">
            © 2026 王国之争 × SAKURAIN。保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
}
