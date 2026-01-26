import { useState, useEffect, useRef } from 'react';
import { Sparkles, Shield, Sword, Users, Crown, Castle, Gem } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: '派系战争系统',
    description: '加入或创建派系，与其他派系展开激烈的领土争夺战。策略、外交和军事力量将决定你的派系能否在这个' +
'竞争的世界中生存下来。',
    color: '#FF6B6B',
    borderColor: '#E55555'
  },
  {
    icon: Sword,
    title: '职业与技能',
    description: '丰富的职业系统，每个职业都有独特的技能和战斗风格。从勇猛的战士到神秘的法师，选择适合你的职业，在战场上展现你的实力。',
    color: '#4ECDC4',
    borderColor: '#3DBDB0'
  },
  {
    icon: Users,
    title: '王国建设',
    description: '建立和管理你的王国，招募居民，建造建筑，发展经济。一个强大的王国需要英明的领导和合理的规划，成为人民爱戴的君主。',
    color: '#45B7D1',
    borderColor: '#3A9BC1'
  },
  {
    icon: Crown,
    title: '资源争夺',
    description: '控制关键资源点，为你的王国提供发展所需。木材、矿石、食物等资源的管理将决定你的王国能否繁荣发展，成为其他王国羡慕的对象。',
    color: '#F7DC6F',
    borderColor: '#E8CD5F'
  },
  {
    icon: Castle,
    title: '城堡攻防',
    description: '建造和升级你的城堡，设置防御设施，抵御敌人的' +
'进攻。同时组织军队，策划对其他城堡的进攻，体验真实的攻城略地。',
    color: '#BB8FCE',
    borderColor: '#A97FBE'
  },
  {
    icon: Gem,
    title: '装备锻造',
    description: '收集稀有材料，锻造强大的装备和武器。每一件装备都有其独特的属性和效果，合理搭配装备将让你在战斗中占据优势。',
    color: '#85C1E2',
    borderColor: '#75B1D2'
  }
];

interface GameFeaturesProps {
  isCurrentSection: boolean;
}

export function GameFeatures({ isCurrentSection }: GameFeaturesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCurrentSection) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isCurrentSection]);

  return (
    <section 
      ref={sectionRef}
      className="h-screen flex items-center justify-center relative overflow-hidden" 
      style={{ imageRendering: 'pixelated' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#8C5A2C]/20 border-4 border-[#8C5A2C]/30" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#6B8E23]/20 border-4 border-[#6B8E23]/30" />
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-[#556B2F]/20 border-4 border-[#556B2F]/30" />
        <div className="absolute bottom-40 right-1/4 w-20 h-20 bg-[#9ACD32]/20 border-4 border-[#9ACD32]/30" />
      </div>

      <div className="section-container relative z-10 pt-16">
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-[#4A4A4A] border-4 border-[#2A2A2A] mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ boxShadow: '4px 4px 0 #1A1A1A' }}
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-sm font-bold text-white tracking-wider">独特玩法设计</span>
          </div>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 transition-all duration-700 delay-100 tracking-wider ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '4px 4px 0 #2A2A2A' }}
          >
            游戏特色
          </h2>
          <p
            className={`text-base md:text-lg text-[#E8E8E8] max-w-xl mx-auto transition-all duration-700 delay-200 font-medium ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            丰富的游戏系统，独特的玩法设计，为你带来前所未有的游戏体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-[#4A4A4A] border-4 border-[#6A6A6A] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#8A8A8A] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${index * 100 + 300}ms`,
                boxShadow: '4px 4px 0 #2A2A2A'
              }}
            >
              <div 
                className="w-12 h-12 border-3 flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
                style={{ 
                  backgroundColor: feature.color,
                  borderColor: feature.borderColor,
                  boxShadow: '3px 3px 0 #1A1A1A'
                }}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-white mb-3 tracking-wider" style={{ textShadow: '2px 2px 0 #2A2A2A' }}>
                {feature.title}
              </h3>
              <p className="text-[#E8E8E8] leading-relaxed text-sm font-medium">
                {feature.description}
              </p>
              
              <div 
                className="absolute -bottom-2 -right-2 w-6 h-6 border-2 transition-all duration-500 group-hover:scale-150"
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