import { useEffect } from 'react';
import { FileText, AlertTriangle, Users, Ban, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TermsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '服务条款 | MC部落';
  }, []);

  return (
    <div className="min-h-screen py-20 relative overflow-hidden" style={{
      imageRendering: 'pixelated',
      backgroundImage: 'linear-gradient(to bottom, #f8f9fa 0%, #e8e8e8 100%)'
    }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#FFD700]/10 border-4 border-[#FFD700]/20" />
        <div className="absolute top-40 right-20 w-20 h-20 bg-[#FFA500]/10 border-4 border-[#FFA500]/20" />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-[#FF6B6B]/10 border-4 border-[#FF6B6B]/20" />
        <div className="absolute bottom-20 right-1/4 w-18 h-18 bg-[#4ECDC4]/10 border-4 border-[#4ECDC4]/20" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 border-4 flex items-center justify-center" style={{ backgroundColor: '#FFD700', borderColor: '#CC9900', boxShadow: '4px 4px 0 #2A2A2A' }}>
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900" style={{ textShadow: '4px 4px 0 #B8860B' }}>
                服务条款
              </h1>
            </div>
            <div className="w-48 h-2 bg-[#FFD700] mx-auto" style={{ boxShadow: '4px 4px 0 #B8860B' }} />
            <p className="text-gray-600 mt-6 text-lg">
              最后更新日期：2026年1月
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white border-4 border-[#4A4A4A] p-6 md:p-8" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A4A4A', borderColor: '#3A3A3A' }}>
                  <Users className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    服务内容
                  </h2>
                  <div className="text-gray-700 space-y-2 leading-relaxed">
                    <p>MC部落（王国之争）是一个基于Minecraft的派系战争服务器，为玩家提供以下服务：</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>多人在线游戏体验</li>
                      <li>派系系统和管理工具</li>
                      <li>王国建设和领土争夺</li>
                      <li>商店系统和经济系统</li>
                      <li>排行榜和荣誉系统</li>
                      <li>社区交流和互动平台</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#4A4A4A] p-6 md:p-8" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A4A4A', borderColor: '#3A3A3A' }}>
                  <AlertTriangle className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    用户行为规范
                  </h2>
                  <div className="text-gray-700 space-y-2 leading-relaxed">
                    <p>使用本服务时，您同意遵守以下行为规范：</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>遵守所有适用的法律法规</li>
                      <li>尊重其他玩家，不进行骚扰或恶意攻击</li>
                      <li>不使用外挂、作弊程序或利用游戏漏洞</li>
                      <li>不传播病毒、恶意软件或有害内容</li>
                      <li>不侵犯他人的知识产权或隐私权</li>
                      <li>配合管理员的合理管理要求</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#4A4A4A] p-6 md:p-8" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A4A4A', borderColor: '#3A3A3A' }}>
                  <Ban className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    禁止行为
                  </h2>
                  <div className="text-gray-700 space-y-2 leading-relaxed">
                    <p>以下行为被严格禁止，违反者将受到处罚：</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>使用任何形式的作弊程序或外挂</li>
                      <li>利用游戏漏洞获取不正当优势</li>
                      <li>恶意破坏他人建筑或领地</li>
                      <li>发布广告、垃圾信息或无关内容</li>
                      <li>进行诈骗或欺诈行为</li>
                      <li>威胁、骚扰或辱骂其他玩家</li>
                      <li>未经授权访问他人账户</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#4A4A4A] p-6 md:p-8" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A4A4A', borderColor: '#3A3A3A' }}>
                  <AlertTriangle className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    处罚措施
                  </h2>
                  <div className="text-gray-700 space-y-2 leading-relaxed">
                    <p>对于违反服务条款的行为，我们保留采取以下措施的权利：</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>警告或提醒</li>
                      <li>暂时禁言或禁言</li>
                      <li>暂时封禁游戏权限</li>
                      <li>永久封禁游戏权限</li>
                      <li>删除违规内容</li>
                      <li>法律追究（适用于严重违法行为）</li>
                    </ul>
                    <p className="mt-4">处罚措施将根据违规行为的严重程度和次数决定。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#4A4A4A] p-6 md:p-8" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A4A4A', borderColor: '#3A3A3A' }}>
                  <FileText className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    免责声明
                  </h2>
                  <div className="text-gray-700 space-y-2 leading-relaxed">
                    <p>本服务按"现状"提供，不提供任何形式的明示或暗示保证，包括但不限于：</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>服务的持续可用性</li>
                      <li>服务无错误或无中断</li>
                      <li>错误将被及时纠正</li>
                      <li>服务器或其内容无病毒或其他有害组件</li>
                    </ul>
                    <p className="mt-4">对于因使用或无法使用本服务而导致的任何损失，我们不承担责任。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#4A4A4A] p-6 md:p-8" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A4A4A', borderColor: '#3A3A3A' }}>
                  <FileText className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    条款变更
                  </h2>
                  <div className="text-gray-700 space-y-2 leading-relaxed">
                    <p>我们保留随时修改本服务条款的权利。修改后的条款将在本页面发布，并自发布之日起生效。</p>
                    <p className="mt-4">继续使用本服务即表示您接受修改后的条款。如果您不同意修改后的条款，请停止使用本服务。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#4A4A4A] p-6 md:p-8" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                联系我们
              </h2>
              <div className="text-gray-700 space-y-2 leading-relaxed">
                <p>如果您对本服务条款有任何疑问，请通过以下方式联系我们：</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>QQ频道：[待填写]</li>
                  <li>官方B站：[待填写]</li>
                  <li>邮箱：[待填写]</li>
                </ul>
                <p className="mt-4">我们将在收到您的请求后尽快回复。</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate(-1)}
              className="group px-8 py-4 text-base font-bold rounded-lg border-4 border-[#2A2A2A] text-white bg-[#4A4A4A] hover:bg-[#5A5A5A] hover:border-[#3A3A3A] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
              style={{ boxShadow: '6px 6px 0 #2A2A2A' }}
            >
              <ArrowLeft className="w-5 h-5" />
              返回上一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
