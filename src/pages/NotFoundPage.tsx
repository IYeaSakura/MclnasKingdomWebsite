import { useEffect } from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '404 - 页面未找到 | MC部落';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{
      imageRendering: 'pixelated',
      backgroundImage: 'linear-gradient(to bottom, #f8f9fa 0%, #e8e8e8 100%)'
    }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#FFD700]/10 border-4 border-[#FFD700]/20" />
        <div className="absolute top-40 right-20 w-20 h-20 bg-[#FFA500]/10 border-4 border-[#FFA500]/20" />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-[#FF6B6B]/10 border-4 border-[#FF6B6B]/20" />
        <div className="absolute bottom-20 right-1/4 w-18 h-18 bg-[#4ECDC4]/10 border-4 border-[#4ECDC4]/20" />
      </div>

      <div className="text-center px-4 relative z-10 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-black text-gray-900 mb-4" style={{ textShadow: '8px 8px 0 #B8860B' }}>
            404
          </h1>
          <div className="w-32 h-2 bg-[#FFD700] mx-auto mb-8" style={{ boxShadow: '4px 4px 0 #B8860B' }} />
        </div>

        <div className="bg-white border-4 border-[#4A4A4A] p-8 md:p-12 mb-8" style={{ boxShadow: '8px 8px 0 #2A2A2A' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            页面未找到
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            抱歉，您访问的页面不存在或已被移动。
            <br />
            请检查URL是否正确，或返回首页继续浏览。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="group px-8 py-4 text-base font-bold rounded-lg border-4 border-[#2A2A2A] text-white bg-[#4A4A4A] hover:bg-[#5A5A5A] hover:border-[#3A3A3A] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
              style={{ boxShadow: '6px 6px 0 #2A2A2A' }}
            >
              <Home className="w-5 h-5" />
              返回首页
            </button>
            <button
              onClick={() => navigate(-1)}
              className="group px-8 py-4 text-base font-bold rounded-lg border-4 border-[#2A2A2A] text-white bg-[#6A6A6A] hover:bg-[#7A7A7A] hover:border-[#4A4A4A] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
              style={{ boxShadow: '6px 6px 0 #2A2A2A' }}
            >
              <ArrowLeft className="w-5 h-5" />
              返回上一页
            </button>
          </div>
        </div>

        <div className="text-gray-500 text-sm">
          <p>MC部落 - 王国之争</p>
        </div>
      </div>
    </div>
  );
}
