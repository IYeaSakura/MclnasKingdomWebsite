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
    <section id="cta" className="py-32 bg-gradient-to-br from-blue-50 via-purple-50/50 to-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#0071e3]" />
            <span className="text-sm font-medium text-gray-700">开启你的传奇之旅</span>
          </div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 min-h-[80px] transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {displayText}
            <span className="animate-pulse text-blue-600">|</span>
          </h2>
        </div>

        <div className={`max-w-5xl mx-auto mb-24 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-white rounded-3xl p-10 md:p-14 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Mc部落</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              团队十年积累，耗时两年为热爱 我的世界PVP 的玩家们倾力匠心打造的大型派系战争服务器。当前是国内机制完善，寿命最长久，玩法最优秀，趣味性最强，用户自我扩展性最佳的派系服！
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-10">
              您可以是通过努力，带领国民发家致富的国王！也可以是带领千军万马征战沙场的传奇将军！您更可以自主创新，颁布各式的发展规则实现您各种奇妙的想法！在王国与王国之间不断的碰撞与交流中，体验万千种不一样的乐趣！
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group flex items-center gap-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-800 font-medium group-hover:text-blue-700 transition-colors">百人同屏战斗，攻城略地，共争天下之主！</span>
              </div>
              <div className="group flex items-center gap-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-gray-800 font-medium group-hover:text-purple-700 transition-colors">职业相互克制与成就，没有最强的人，只有最好的团队配合！</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`max-w-6xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            加入服务器
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group relative bg-white rounded-3xl p-10 border border-gray-100 hover:shadow-2xl hover:border-blue-300 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors duration-300">游戏QQ群</h4>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                加入官方游戏群，与玩家交流互动，获取最新服务器资讯和活动
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl px-8 py-5 border border-blue-200 group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                <p className="text-gray-900 font-mono text-lg font-semibold tracking-wide">群号：123456789</p>
              </div>
            </div>
            <div className="group relative bg-white rounded-3xl p-10 border border-gray-100 hover:shadow-2xl hover:border-purple-300 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-purple-600 transition-colors duration-300">Mc部落官网</h4>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                访问官方网站，了解更多服务器详情、玩法介绍和最新更新
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl px-8 py-5 border border-purple-200 group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
                <p className="text-gray-900 font-mono text-lg font-semibold tracking-wide">Mclans.cn</p>
              </div>
            </div>
            <div className="group relative bg-white rounded-3xl p-10 border border-gray-100 hover:shadow-2xl hover:border-pink-300 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-pink-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Radio className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-pink-600 transition-colors duration-300">QQ频道</h4>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                加入QQ频道，实时获取服务器动态，参与社区讨论和活动
              </p>
              <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl px-8 py-5 border border-pink-200 group-hover:from-pink-100 group-hover:to-pink-200 transition-all duration-300">
                <p className="text-gray-900 font-mono text-lg font-semibold tracking-wide">频道ID：Mc部落</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
