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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-800 mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Sparkles className="inline-block w-10 h-10 mr-3 text-[#ff6f2c]" />
            游戏特色
          </h2>
          <p
            className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
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
              className={`group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#0071e3] transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ff6f2c]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
