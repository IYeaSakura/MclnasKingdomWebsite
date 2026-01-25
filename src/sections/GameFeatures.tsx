import { useState, useEffect } from 'react';
import { Shield, Zap, Crown, Users, Map, Trophy, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: '王国系统',
    description: '建立你的王国，管理土地，招募成员，建造防御塔，体验完整的王国管理乐趣',
    color: '#6B8E23',
    borderColor: '#4A6B1F',
  },
  {
    icon: Zap,
    title: '战斗职业',
    description: '7大职业相互克制，狂暴战士、重装步兵、弓箭手等，合理搭配成就最强战队',
    color: '#CD5C5C',
    borderColor: '#8B3A3A',
  },
  {
    icon: Crown,
    title: '王皇之位',
    description: '争夺地区诸侯王，进而争夺天下之主，体验百人同屏战斗的宏大场景',
    color: '#FFD700',
    borderColor: '#CC9900',
  },
  {
    icon: Users,
    title: '地区边境',
    description: '保护新手发育期，通过边境前往其他地区，在边境时刻爆发激烈战斗',
    color: '#228B22',
    borderColor: '#145214',
  },
  {
    icon: Map,
    title: '扩展附魔',
    description: '近百种扩展新附魔，发挥智慧合理搭配，成为团队中的绝对战神',
    color: '#9370DB',
    borderColor: '#5B3B8C',
  },
  {
    icon: Trophy,
    title: '成就系统',
    description: '完成各种挑战，解锁成就，获得专属奖励，展示你的荣耀',
    color: '#FF69B4',
    borderColor: '#C71585',
  },
];

export function GameFeatures() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center py-32 relative overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#8C5A2C]/20 border-4 border-[#8C5A2C]/30" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#6B8E23]/20 border-4 border-[#6B8E23]/30" />
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-[#556B2F]/20 border-4 border-[#556B2F]/30" />
        <div className="absolute bottom-40 right-1/4 w-20 h-20 bg-[#9ACD32]/20 border-4 border-[#9ACD32]/30" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-24">
          <div
            className={`inline-flex items-center gap-2 px-6 py-3 bg-[#4A4A4A] border-4 border-[#2A2A2A] mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ boxShadow: '4px 4px 0 #1A1A1A' }}
          >
            <Sparkles className="w-5 h-5 text-[#FFD700]" />
            <span className="text-sm font-bold text-white tracking-wider">独特玩法设计</span>
          </div>
          <h2
            className={`text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 transition-all duration-700 delay-100 tracking-wider ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '4px 4px 0 #2A2A2A' }}
          >
            游戏特色
          </h2>
          <p
            className={`text-lg md:text-xl text-[#E8E8E8] max-w-2xl mx-auto transition-all duration-700 delay-200 font-medium ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            丰富的游戏系统，独特的玩法设计，为你带来前所未有的游戏体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-[#4A4A4A] border-4 border-[#6A6A6A] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#8A8A8A] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${index * 100 + 300}ms`,
                boxShadow: '6px 6px 0 #2A2A2A'
              }}
            >
              <div 
                className="w-16 h-16 border-4 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                style={{ 
                  backgroundColor: feature.color,
                  borderColor: feature.borderColor,
                  boxShadow: '4px 4px 0 #1A1A1A'
                }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-wider" style={{ textShadow: '2px 2px 0 #2A2A2A' }}>
                {feature.title}
              </h3>
              <p className="text-[#E8E8E8] leading-relaxed text-base font-medium">
                {feature.description}
              </p>
              
              <div 
                className="absolute -bottom-2 -right-2 w-8 h-8 border-2 transition-all duration-500 group-hover:scale-150"
                style={{ 
                  backgroundColor: feature.color,
                  borderColor: feature.borderColor
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
