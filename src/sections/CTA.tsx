import { useState, useEffect } from 'react';
import { Sparkles, Trophy, Crown, Users, MessageCircle, Globe, Radio } from 'lucide-react';

export function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');

  const texts = [
    '准备好开始你的冒险了吗？',
    '加入数千名玩家的史诗战斗',
    '建立属于你的传奇王国',
    '成为Mc部落的英雄',
    '与盟友一起征服世界'
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayText(texts[textIndex]);
  }, [textIndex]);

  return (
    <section id="cta" className="h-screen flex items-center justify-center relative overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#8C5A2C]/20 border-4 border-[#8C5A2C]/30" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#6B8E23]/20 border-4 border-[#6B8E23]/30" />
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-[#556B2F]/20 border-4 border-[#556B2F]/30" />
        <div className="absolute bottom-40 right-1/4 w-20 h-20 bg-[#9ACD32]/20 border-4 border-[#9ACD32]/30" />
      </div>

      <div className="section-container relative z-10 pt-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-[#4A4A4A] border-4 border-[#2A2A2A] mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ boxShadow: '4px 4px 0 #1A1A1A' }}
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-sm font-bold text-white tracking-wider">开启你的传奇之旅</span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 min-h-[60px] transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ textShadow: '4px 4px 0 #2A2A2A' }}>
            {displayText}
            <span className="animate-pulse text-[#FFD700]">|</span>
          </h2>
        </div>

        <div className={`max-w-5xl mx-auto mb-16 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
        </div>

        <div className={`max-w-6xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative bg-[#4A4A4A] border-4 border-[#6A6A6A] p-6 hover:border-[#8A8A8A] transition-all duration-500 hover:-translate-y-2 overflow-hidden" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
              <div className="w-16 h-16 border-4 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500" style={{ backgroundColor: '#6B8E23', borderColor: '#4A6B1F', boxShadow: '4px 4px 0 #1A1A1A' }}>
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-black text-white mb-4 tracking-wider" style={{ textShadow: '2px 2px 0 #2A2A2A' }}>游戏QQ群</h4>
              <p className="text-[#E8E8E8] text-sm leading-relaxed mb-6 font-medium">
                加入官方游戏群，与玩家交流互动，获取最新服务器资讯和活动
              </p>
              <div className="bg-[#3A3A3A] border-4 border-[#4A4A4A] px-6 py-4 transition-all duration-300" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
                <p className="text-white font-mono text-base font-bold tracking-wide">群号：123456789</p>
              </div>
            </div>
            <div className="group relative bg-[#4A4A4A] border-4 border-[#6A6A6A] p-6 hover:border-[#8A8A8A] transition-all duration-500 hover:-translate-y-2 overflow-hidden" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
              <div className="w-16 h-16 border-4 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500" style={{ backgroundColor: '#9370DB', borderColor: '#5B3B8C', boxShadow: '4px 4px 0 #1A1A1A' }}>
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-black text-white mb-4 tracking-wider" style={{ textShadow: '2px 2px 0 #2A2A2A' }}>Mc部落官网</h4>
              <p className="text-[#E8E8E8] text-sm leading-relaxed mb-6 font-medium">
                访问官方网站，了解更多服务器详情、玩法介绍和最新更新
              </p>
              <div className="bg-[#3A3A3A] border-4 border-[#4A4A4A] px-6 py-4 transition-all duration-300" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
                <p className="text-white font-mono text-base font-bold tracking-wide">Mclans.cn</p>
              </div>
            </div>
            <div className="group relative bg-[#4A4A4A] border-4 border-[#6A6A6A] p-6 hover:border-[#8A8A8A] transition-all duration-500 hover:-translate-y-2 overflow-hidden" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
              <div className="w-16 h-16 border-4 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500" style={{ backgroundColor: '#FF69B4', borderColor: '#C71585', boxShadow: '4px 4px 0 #1A1A1A' }}>
                <Radio className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-black text-white mb-4 tracking-wider" style={{ textShadow: '2px 2px 0 #2A2A2A' }}>QQ频道</h4>
              <p className="text-[#E8E8E8] text-sm leading-relaxed mb-6 font-medium">
                加入QQ频道，实时获取服务器动态，参与社区讨论和活动
              </p>
              <div className="bg-[#3A3A3A] border-4 border-[#4A4A4A] px-6 py-4 transition-all duration-300" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
                <p className="text-white font-mono text-base font-bold tracking-wide">频道ID：Mc部落</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}