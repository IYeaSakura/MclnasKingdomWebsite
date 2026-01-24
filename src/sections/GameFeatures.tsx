import { useState, useEffect } from 'react';
import { Shield, Zap, Crown, Users, Map, Trophy, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: '王国系统',
    description: '建立你的王国，管理土地，招募成员，建造防御塔，体验完整的王国管理乐趣',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Zap,
    title: '战斗职业',
    description: '7大职业相互克制，狂暴战士、重装步兵、弓箭手等，合理搭配成就最强战队',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: Crown,
    title: '王皇之位',
    description: '争夺地区诸侯王，进而争夺天下之主，体验百人同屏战斗的宏大场景',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Users,
    title: '地区边境',
    description: '保护新手发育期，通过边境前往其他地区，在边境时刻爆发激烈战斗',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Map,
    title: '扩展附魔',
    description: '近百种扩展新附魔，发挥智慧合理搭配，成为团队中的绝对战神',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Trophy,
    title: '成就系统',
    description: '完成各种挑战，解锁成就，获得专属奖励，展示你的荣耀',
    color: 'from-pink-500 to-pink-600',
  },
];

export function GameFeatures() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-32 bg-gradient-to-b from-white via-blue-50/50 to-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-24">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#0071e3]" />
            <span className="text-sm font-medium text-gray-700">独特玩法设计</span>
          </div>
          <h2
            className={`text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            游戏特色
          </h2>
          <p
            className={`text-lg md:text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
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
              className={`group relative bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {feature.description}
              </p>
              
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
