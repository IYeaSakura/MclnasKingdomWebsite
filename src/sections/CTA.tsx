import { useState, useEffect } from 'react';
import { Crown, Users, Trophy, MessageCircle, Globe, Radio, Sparkles } from 'lucide-react';

export function CTA() {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const fullText = '准备好开始你的冒险了吗？';

  useEffect(() => {
    setIsVisible(true);
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="cta" className="min-h-screen flex items-center justify-center py-32 relative overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#8C5A2C]/20 border-4 border-[#8C5A2C]/30" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#6B8E23]/20 border-4 border-[#6B8E23]/30" />
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-[#556B2F]/20 border-4 border-[#556B2F]/30" />
        <div className="absolute bottom-40 right-1/4 w-20 h-20 bg-[#9ACD32]/20 border-4 border-[#9ACD32]/30" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div
            className={`inline-flex items-center gap-2 px-6 py-3 bg-[#4A4A4A] border-4 border-[#2A2A2A] mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ boxShadow: '4px 4px 0 #1A1A1A' }}
          >
            <Sparkles className="w-5 h-5 text-[#FFD700]" />
            <span className="text-sm font-bold text-white tracking-wider">开启你的传奇之旅</span>
          </div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 min-h-[80px] transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ textShadow: '4px 4px 0 #2A2A2A' }}>
            {displayText}
            <span className="animate-pulse text-[#FFD700]">|</span>
          </h2>
        </div>

        <div className={`max-w-5xl mx-auto mb-24 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-[#4A4A4A] border-4 border-[#6A6A6A] p-10 md:p-14 transition-all duration-500" style={{ boxShadow: '8px 8px 0 #2A2A2A' }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 border-4 flex items-center justify-center" style={{ backgroundColor: '#FFD700', borderColor: '#CC9900', boxShadow: '4px 4px 0 #1A1A1A' }}>
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-wider" style={{ textShadow: '3px 3px 0 #2A2A2A' }}>Mc部落</h3>
            </div>
            <p className="text-[#E8E8E8] text-lg leading-relaxed mb-8 font-medium">
              团队十年积累，耗时两年为热爱 我的世界PVP 的玩家们倾力匠心打造的大型派系战争服务器。当前是国内机制完善，寿命最长久，玩法最优秀，趣味性最强，用户自我扩展性最佳的派系服！
            </p>
            <p className="text-[#E8E8E8] text-lg leading-relaxed mb-10 font-medium">
              您可以是通过努力，带领国民发家致富的国王！也可以是带领千军万马征战沙场的传奇将军！您更可以自主创新，颁布各式的发展规则实现您各种奇妙的想法！在王国与王国之间不断的碰撞与交流中，体验万千种不一样的乐趣！
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group flex items-center gap-4 bg-[#3A3A3A] border-4 border-[#4A4A4A] p-6 hover:border-[#6A6A6A] transition-all duration-300 hover:scale-105" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
                <div className="w-12 h-12 border-4 flex items-center justify-center group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#FFD700', borderColor: '#CC9900' }}>
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-medium tracking-wider">百人同屏战斗，攻城略地，共争天下之主！</span>
              </div>
              <div className="group flex items-center gap-4 bg-[#3A3A3A] border-4 border-[#4A4A4A] p-6 hover:border-[#6A6A6A] transition-all duration-300 hover:scale-105" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
                <div className="w-12 h-12 border-4 flex items-center justify-center group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#9370DB', borderColor: '#5B3B8C' }}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-white font-medium tracking-wider">职业相互克制与成就，没有最强的人，只有最好的团队配合！</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`max-w-6xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <h3 className="text-3xl md:text-4xl font-black text-white text-center mb-16 tracking-wider" style={{ textShadow: '4px 4px 0 #2A2A2A' }}>
            加入服务器
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group relative bg-[#4A4A4A] border-4 border-[#6A6A6A] p-10 hover:border-[#8A8A8A] transition-all duration-500 hover:-translate-y-2 overflow-hidden" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="w-20 h-20 border-4 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-500" style={{ backgroundColor: '#6B8E23', borderColor: '#4A6B1F', boxShadow: '4px 4px 0 #1A1A1A' }}>
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-black text-white mb-6 tracking-wider" style={{ textShadow: '2px 2px 0 #2A2A2A' }}>游戏QQ群</h4>
              <p className="text-[#E8E8E8] text-base leading-relaxed mb-8 font-medium">
                加入官方游戏群，与玩家交流互动，获取最新服务器资讯和活动
              </p>
              <div className="bg-[#3A3A3A] border-4 border-[#4A4A4A] px-8 py-5 transition-all duration-300" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
                <p className="text-white font-mono text-lg font-bold tracking-wide">群号：123456789</p>
              </div>
            </div>
            <div className="group relative bg-[#4A4A4A] border-4 border-[#6A6A6A] p-10 hover:border-[#8A8A8A] transition-all duration-500 hover:-translate-y-2 overflow-hidden" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="w-20 h-20 border-4 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-500" style={{ backgroundColor: '#9370DB', borderColor: '#5B3B8C', boxShadow: '4px 4px 0 #1A1A1A' }}>
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-black text-white mb-6 tracking-wider" style={{ textShadow: '2px 2px 0 #2A2A2A' }}>Mc部落官网</h4>
              <p className="text-[#E8E8E8] text-base leading-relaxed mb-8 font-medium">
                访问官方网站，了解更多服务器详情、玩法介绍和最新更新
              </p>
              <div className="bg-[#3A3A3A] border-4 border-[#4A4A4A] px-8 py-5 transition-all duration-300" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
                <p className="text-white font-mono text-lg font-bold tracking-wide">Mclans.cn</p>
              </div>
            </div>
            <div className="group relative bg-[#4A4A4A] border-4 border-[#6A6A6A] p-10 hover:border-[#8A8A8A] transition-all duration-500 hover:-translate-y-2 overflow-hidden" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="w-20 h-20 border-4 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-500" style={{ backgroundColor: '#FF69B4', borderColor: '#C71585', boxShadow: '4px 4px 0 #1A1A1A' }}>
                <Radio className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-black text-white mb-6 tracking-wider" style={{ textShadow: '2px 2px 0 #2A2A2A' }}>QQ频道</h4>
              <p className="text-[#E8E8E8] text-base leading-relaxed mb-8 font-medium">
                加入QQ频道，实时获取服务器动态，参与社区讨论和活动
              </p>
              <div className="bg-[#3A3A3A] border-4 border-[#4A4A4A] px-8 py-5 transition-all duration-300" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
                <p className="text-white font-mono text-lg font-bold tracking-wide">频道ID：Mc部落</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
