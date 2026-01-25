import { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageCircle, Radio, Video } from 'lucide-react';

interface CTAProps {
  isCurrentSection: boolean;
}

export function CTA({ isCurrentSection }: CTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);

  const fullText = '准备好开始你的冒险了吗？';

  useEffect(() => {
    if (isCurrentSection) {
      setIsVisible(true);
      setIsTyping(true);
    } else {
      setIsVisible(false);
      setIsTyping(false);
      setTypedText('');
    }
  }, [isCurrentSection]);

  useEffect(() => {
    if (!isTyping) {
      setTypedText('');
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [isTyping]);

  const joinMethods = [
    {
      id: 'qq-group',
      icon: MessageCircle,
      title: 'QQ群',
      description: '加入官方游戏群，与玩家交流互动，获取最新服务器资讯和活动',
      info: '群号：XXXXXXXXX',
      color: '#6B8E23',
      borderColor: '#4A6B1F',
      link: 'https://qm.qq.com/cgi-bin/qm/qr?k=xxx'
    },
    {
      id: 'qq-channel',
      icon: Radio,
      title: 'QQ频道',
      description: '加入QQ频道，实时获取服务器动态，参与社区讨论和活动',
      info: '频道ID：ahvw3ph6fv',
      color: '#9370DB',
      borderColor: '#5B3B8C',
      link: 'https://pd.qq.com/g/ahvw3ph6fv'
    },
    {
      id: 'bilibili',
      icon: Video,
      title: '官方B站',
      description: '关注官方B站账号，观看游戏视频、直播和精彩内容',
      info: 'B站：-IYuChen-',
      color: '#FF69B4',
      borderColor: '#C71585',
      link: 'https://space.bilibili.com/646868679'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="cta" 
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden" 
      style={{ imageRendering: 'pixelated' }}
    >
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
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 min-h-[60px] transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} 
            style={{ textShadow: '4px 4px 0 #2A2A2A' }}
          >
            {typedText}
            {isTyping && typedText.length < fullText.length && (
              <span className="animate-pulse text-[#FFD700]">|</span>
            )}
          </h2>
        </div>

        <div className={`max-w-6xl mx-auto transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {joinMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.id}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative bg-[#4A4A4A] border-4 border-[#6A6A6A] p-6 hover:border-[#8A8A8A] transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer`}
                  style={{ 
                    boxShadow: '4px 4px 0 #2A2A2A',
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <div 
                    className="w-16 h-16 border-4 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500" 
                    style={{ 
                      backgroundColor: method.color, 
                      borderColor: method.borderColor, 
                      boxShadow: '4px 4px 0 #1A1A1A' 
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 
                    className="text-xl font-black text-white mb-4 tracking-wider" 
                    style={{ textShadow: '2px 2px 0 #2A2A2A' }}
                  >
                    {method.title}
                  </h4>
                  <p className="text-[#E8E8E8] text-sm leading-relaxed mb-6 font-medium">
                    {method.description}
                  </p>
                  <div 
                    className="bg-[#3A3A3A] border-4 border-[#4A4A4A] px-6 py-4 transition-all duration-300 group-hover:bg-[#4A4A4A] group-hover:border-[#6A6A6A]" 
                    style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
                  >
                    <p className="text-white font-mono text-base font-bold tracking-wide">{method.info}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
