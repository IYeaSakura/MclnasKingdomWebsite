import { useEffect } from 'react';
import { MessageSquare, Mail, Users, Video, Globe, ArrowLeft, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ContactPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '联系我们 | MC部落';
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

      {<div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 border-4 flex items-center justify-center" style={{ backgroundColor: '#FFD700', borderColor: '#CC9900', boxShadow: '4px 4px 0 #2A2A2A' }}>
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900" style={{ textShadow: '4px 4px 0 #B8860B' }}>
                联系我们
              </h1>
            </div>
            <div className="w-48 h-2 bg-[#FFD700] mx-auto" style={{ boxShadow: '4px 4px 0 #B8860B' }} />
            <p className="text-gray-600 mt-6 text-lg">
              欢迎通过以下方式与我们取得联系
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-4 border-[#4A4A4A] p-6 hover:border-[#FFD700] transition-all duration-300 hover:scale-105" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A4A4A', borderColor: '#3A3A3A' }}>
                  <Users className="w-7 h-7 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    QQ频道
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    加入我们的QQ频道，获取最新资讯和与其他玩家交流
                  </p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#CC9900] font-medium transition-colors"
                  >
                    <span>立即加入</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#4A4A4A] p-6 hover:border-[#FFD700] transition-all duration-300 hover:scale-105" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A4A4A', borderColor: '#3A3A3A' }}>
                  <Video className="w-7 h-7 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    官方B站
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    关注我们的官方B站频道，观看精彩视频和更新
                  </p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#CC9900] font-medium transition-colors"
                  >
                    <span>立即关注</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#4A4A4A] p-6 hover:border-[#FFD700] transition-all duration-300 hover:scale-105" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A4A4A', borderColor: '#3A3A3A' }}>
                  <Mail className="w-7 h-7 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    电子邮箱
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    通过邮件联系我们，我们会在24小时内回复
                  </p>
                  <a
                    href="mailto:contact@mclans.sakurain.net"
                    className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#CC9900] font-medium transition-colors"
                  >
                    <span>发送邮件</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#4A4A4A] p-6 hover:border-[#FFD700] transition-all duration-300 hover:scale-105" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#4A4A4A', borderColor: '#3A3A3A' }}>
                  <Globe className="w-7 h-7 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ textShadow: '2px 2px 0 #B8860B' }}>
                    官方网站
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    访问我们的官方网站，获取更多信息和资源
                  </p>
                  <a
                    href="https://mclans.sakurain.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#CC9900] font-medium transition-colors"
                  >
                    <span>访问网站</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-4 border-[#4A4A4A] p-6 md:p-8 mb-8" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ textShadow: '2px 2px 0 #B8860B' }}>
              常见问题
            </h2>
            <div className="space-y-4">
              <div className="border-b-2 border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">如何加入游戏？</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  您需要安装Minecraft Java版，然后添加我们的服务器地址。详细的加入指南请参考官方网站的帮助文档。
                </p>
              </div>
              <div className="border-b-2 border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">服务器维护时间是？</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  服务器每天凌晨2:00至5:30进行维护，期间可能无法正常登录。维护时间可能根据需要调整。
                </p>
              </div>
              <div className="border-b-2 border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">如何举报违规行为？</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  如果您发现违规行为，请通过QQ频道或邮件联系我们，提供相关证据和详细信息，我们会尽快处理。
                </p>
              </div>
              <div className="pb-4">
                <h3 className="font-bold text-gray-900 mb-2">如何申请成为管理员？</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  管理员职位通常通过内部推荐和考核产生。我们会在需要时在官方渠道发布招募信息，请密切关注。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border-4 border-[#4A4A4A] p-6 md:p-8" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ textShadow: '2px 2px 0 #B8860B' }}>
              开源项目
            </h2>
            <div className="text-gray-700 space-y-2 leading-relaxed">
              <p>本网站的开源代码托管在Gitee平台，欢迎访问和贡献：</p>
              <a
                href="https://gitee.com/IYeaSakura/mclans-kingdom-wars-website"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#CC9900] font-medium transition-colors mt-4"
              >
                <span>https://gitee.com/IYeaSakura/mclans-kingdom-wars-website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
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
      </div>}
    </div>
  );
}
