import { useState, useEffect } from 'react';
import { Sparkles, Crown, Shield, Zap, Map, Users, Trophy, Sword, MessageCircle, Globe, Radio } from 'lucide-react';

export function CTA() {
  const [displayText, setDisplayText] = useState('');
  const fullText = '准备好开始你的冒险了吗？';

  useEffect(() => {
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

  const features = [
    {
      icon: Map,
      title: '王国系统',
      description: '风靡全球的玩法，经原作者授权后，本土化的王国系统！！包含：土地、成员管理、入侵与反入侵、防御塔、趣味机关等诸多玩法！满足您王国管理的一切需求，是您实现您各种奇妙想法的主要舞台！',
    },
    {
      icon: Shield,
      title: '战斗职业',
      description: '当前包含7大职业，相互克制，相互成就！包含职业：狂暴战士(近战输出)、重装步兵(战场肉盾)、弓箭手(远程输出)、战骑(战场游走)、药剂师(状态控制)、巫师(位移控制)、牧师(战场治疗)！合理搭配您军队的职业，可以在战场上爆发出惊人的战斗力！',
    },
    {
      icon: Zap,
      title: '扩展附魔',
      description: '拥有近百种扩展新附魔，发挥您的智慧，合理搭配您装备的附魔，成为您团队中的绝对战神！',
    },
    {
      icon: Crown,
      title: '王皇之位',
      description: '带领您的王国夺得地区诸侯王，进而争夺天下之主(九州皇)！体验百人同屏战斗的宏大场景！',
    },
    {
      icon: Users,
      title: '地区边境',
      description: '为保护您的新手发育期，地区与地区之间相互隔离，只能通过边境前往。在边境时刻都在爆发战斗，带领您的军队，发挥您的指挥智慧，利用地理优势，击溃您的敌人！',
    },
  ];

  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-[#0071e3] to-[#0056b3] relative overflow-hidden">
      {/* Background Pattern - Minecraft Style */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='20' height='20' fill='%23ffffff' fill-opacity='0.1'/%3E%3Crect x='20' y='20' width='20' height='20' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff6f2c]/15 via-[#0071e3]/10 to-[#9b59b6]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      {/* Floating Minecraft Blocks */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-lg animate-float shadow-2xl backdrop-blur-sm border border-white/10" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-32 w-20 h-20 bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-lg animate-float shadow-2xl backdrop-blur-sm border border-white/10" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-32 left-40 w-24 h-24 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-lg animate-float shadow-2xl backdrop-blur-sm border border-white/10" style={{ animationDelay: '2.5s' }} />
      <div className="absolute bottom-60 right-20 w-12 h-12 bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-lg animate-float shadow-2xl backdrop-blur-sm border border-white/10" style={{ animationDelay: '3.5s' }} />
      <div className="absolute top-1/2 left-10 w-14 h-14 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg animate-float shadow-2xl backdrop-blur-sm border border-white/10" style={{ animationDelay: '4s' }} />

      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/40 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-white/25 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-white/35 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-white/30 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '2.5s' }} />

      {/* Glowing Orbs */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-[#ff6f2c]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-[#0071e3]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-white/20" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="section-container relative z-10">
        {/* Title */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 min-h-[60px]">
            {displayText}
            <span className="animate-pulse">|</span>
          </h2>
        </div>

        {/* Server Introduction */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-8 h-8 text-[#ff6f2c]" />
              <h3 className="text-2xl md:text-3xl font-bold text-white">Mc部落</h3>
            </div>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              团队十年积累，耗时两年为热爱 我的世界PVP 的玩家们倾力匠心打造的大型派系战争服务器。当前是国内机制完善，寿命最长久，玩法最优秀，趣味性最强，用户自我扩展性最佳的派系服！
            </p>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              您可以是通过努力，带领国民发家致富的国王！也可以是带领千军万马征战沙场的传奇将军！您更可以自主创新，颁布各式的发展规则实现您各种奇妙的想法！在王国与王国之间不断的碰撞与交流中，体验万千种不一样的乐趣！
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                <Sword className="w-6 h-6 text-[#ff6f2c]" />
                <span className="text-white font-medium">百人同屏战斗，攻城略地，共争天下之主！</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                <Users className="w-6 h-6 text-[#ff6f2c]" />
                <span className="text-white font-medium">职业相互克制与成就，没有最强的人，只有最好的团队配合！</span>
              </div>
            </div>
          </div>
        </div>

        {/* Join Server Info */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
            <Sparkles className="inline-block w-8 h-8 mr-2 text-[#ff6f2c]" />
            加入服务器
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="group relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ff6f2c]/30 to-transparent rounded-full blur-2xl group-hover:from-[#ff6f2c]/50 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#ff8c42]/20 to-transparent rounded-full blur-xl group-hover:from-[#ff8c42]/40 transition-all duration-500" />
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff6f2c] to-[#ff8c42] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-500 group-hover:scale-110">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-[#ff6f2c] transition-colors duration-300">游戏QQ群</h4>
                <p className="text-white/80 text-base leading-relaxed mb-6">
                  加入官方游戏群，与玩家交流互动，获取最新服务器资讯和活动
                </p>
                <div className="bg-gradient-to-r from-white/20 to-white/10 rounded-xl px-6 py-4 border border-white/20 group-hover:border-orange-400/30 transition-all duration-300">
                  <p className="text-white font-mono text-base font-semibold tracking-wide">群号：123456789</p>
                </div>
              </div>
            </div>
            <div
              className="group relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0071e3]/30 to-transparent rounded-full blur-2xl group-hover:from-[#0071e3]/50 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#0056b3]/20 to-transparent rounded-full blur-xl group-hover:from-[#0056b3]/40 transition-all duration-500" />
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0071e3] to-[#0056b3] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-[#0071e3] transition-colors duration-300">Mc部落官网</h4>
                <p className="text-white/80 text-base leading-relaxed mb-6">
                  访问官方网站，了解更多服务器详情、玩法介绍和最新更新
                </p>
                <div className="bg-gradient-to-r from-white/20 to-white/10 rounded-xl px-6 py-4 border border-white/20 group-hover:border-blue-400/30 transition-all duration-300">
                  <p className="text-white font-mono text-base font-semibold tracking-wide">Mclans.cn</p>
                </div>
              </div>
            </div>
            <div
              className="group relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/30 hover:border-white/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#9b59b6]/30 to-transparent rounded-full blur-2xl group-hover:from-[#9b59b6]/50 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#8e44ad]/20 to-transparent rounded-full blur-xl group-hover:from-[#8e44ad]/40 transition-all duration-500" />
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#9b59b6] to-[#8e44ad] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-500 group-hover:scale-110">
                  <Radio className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-[#9b59b6] transition-colors duration-300">QQ频道</h4>
                <p className="text-white/80 text-base leading-relaxed mb-6">
                  加入QQ频道，实时获取服务器动态，参与社区讨论和活动
                </p>
                <div className="bg-gradient-to-r from-white/20 to-white/10 rounded-xl px-6 py-4 border border-white/20 group-hover:border-purple-400/30 transition-all duration-300">
                  <p className="text-white font-mono text-base font-semibold tracking-wide">频道ID：Mc部落</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
