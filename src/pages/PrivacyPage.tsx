import { useEffect } from 'react';
import { Shield, Eye, Database, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '隐私政策 | MC部落';
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
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900" style={{ textShadow: '4px 4px 0 #B8860B' }}>
                隐私政策
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
                  <Eye className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    信息收集
                  </h2>
                  <div className="text-gray-700 space-y-2 leading-relaxed">
                    <p>我们收集以下类型的信息：</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>游戏账户信息（用户名、UUID）</li>
                      <li>游戏行为数据（登录时间、游戏时长）</li>
                      <li>服务器日志（用于故障排查和安全监控）</li>
                      <li>Cookie和类似技术（用于改善用户体验）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#4A4A4A] p-6 md:p-8" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A4A4A', borderColor: '#3A3A3A' }}>
                  <Database className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    信息使用
                  </h2>
                  <div className="text-gray-700 space-y-2 leading-relaxed">
                    <p>我们使用收集的信息用于：</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>提供和维护游戏服务</li>
                      <li>改善游戏体验和功能</li>
                      <li>分析使用趋势和优化服务器性能</li>
                      <li>防止欺诈和滥用行为</li>
                      <li>遵守法律法规要求</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#4A4A4A] p-6 md:p-8" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A4A4A', borderColor: '#3A3A3A' }}>
                  <Lock className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    信息保护
                  </h2>
                  <div className="text-gray-700 space-y-2 leading-relaxed">
                    <p>我们采取以下措施保护您的个人信息：</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>使用加密技术保护数据传输</li>
                      <li>实施访问控制和身份验证机制</li>
                      <li>定期进行安全审计和漏洞扫描</li>
                      <li>限制员工对个人信息的访问权限</li>
                      <li>制定数据泄露应急响应计划</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#4A4A4A] p-6 md:p-8" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A4A4A', borderColor: '#3A3A3A' }}>
                  <Shield className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    您的权利
                  </h2>
                  <div className="text-gray-700 space-y-2 leading-relaxed">
                    <p>您对自己的个人信息享有以下权利：</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>访问和查看您的个人信息</li>
                      <li>要求更正不准确的信息</li>
                      <li>要求删除您的个人信息</li>
                      <li>反对或限制信息处理</li>
                      <li>数据可携带权</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#4A4A4A] p-6 md:p-8" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                联系我们
              </h2>
              <div className="text-gray-700 space-y-2 leading-relaxed">
                <p>如果您对本隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们：</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>QQ频道：[待填写]</li>
                  <li>官方B站：[待填写]</li>
                  <li>邮箱：[待填写]</li>
                </ul>
                <p className="mt-4">我们将在收到您的请求后尽快回复，通常不超过30天。</p>
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
