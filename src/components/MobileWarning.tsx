interface MobileWarningProps {
  isOpen: boolean;
}

export function MobileWarning({ isOpen }: MobileWarningProps) {
  if (!isOpen) return null;

  const handleJoinChannel = () => {
    window.open('https://pd.qq.com/g/ahvw3ph6fv', '_blank');
  };

  const handleJoinQQGroup = () => {
    window.open('https://qm.qq.com/cgi-bin/qm/qr?k=xxx', '_blank');
  };

  const handleLearnMore = () => {
    window.open('https://www.bilibili.com/video', '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1A1A1A] p-4"
      style={{
        imageRendering: 'pixelated',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
      }}
    >
      <div
        className="bg-[#4A4A4A] border-8 border-[#2A2A2A] p-8 max-w-md w-full mx-4 relative"
        style={{
          boxShadow: '12px 12px 0 #1A1A1A',
          imageRendering: 'pixelated'
        }}
      >
        <div className="text-center">
          <div
            className="w-24 h-24 bg-gradient-to-br from-[#FFD700] to-[#D4AF37] border-4 border-[#8B6914] rounded-lg mx-auto mb-8 flex items-center justify-center relative"
            style={{
              boxShadow: '4px 4px 0 #8B6914',
              imageRendering: 'pixelated'
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="w-14 h-14 text-[#1A1A1A]"
              style={{ imageRendering: 'pixelated' }}
            >
              <rect x="2" y="3" width="20" height="14" rx="1" ry="1" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>

          <h2
            className="text-3xl font-black text-white mb-6 tracking-wider"
            style={{
              textShadow: '4px 4px 0 #1A1A1A',
              imageRendering: 'pixelated'
            }}
          >
            请使用电脑端访问
          </h2>

          <div
            className="bg-[#2A2A2A] border-4 border-[#1A1A1A] p-4 mb-8 rounded-lg"
            style={{
              boxShadow: '4px 4px 0 #0A0A0A',
              imageRendering: 'pixelated'
            }}
          >
            <p className="text-[#FFD700] font-bold text-base leading-relaxed mb-2">
              王国之争
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Minecraft 中国版服务器
            </p>
            <p className="text-gray-400 text-xs mt-2 leading-relaxed">
              为了获得最佳体验，请使用电脑端访问
            </p>
          </div>

          <div className="space-y-4 w-full">
            <button
              onClick={handleJoinChannel}
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-[#1A1A1A] font-black py-5 px-6 rounded-lg border-4 border-[#8B6914] hover:from-[#E5C100] hover:to-[#C4A030] transition-all duration-200 text-lg relative"
              style={{
                boxShadow: '6px 6px 0 #8B6914',
                imageRendering: 'pixelated'
              }}
            >
              <span className="relative z-10">加入频道</span>
            </button>

            <button
              onClick={handleJoinQQGroup}
              className="w-full bg-gradient-to-r from-[#0071e3] to-[#0051a2] text-white font-black py-5 px-6 rounded-lg border-4 border-[#003d7a] hover:from-[#0051a2] hover:to-[#003d7a] transition-all duration-200 text-lg relative"
              style={{
                boxShadow: '6px 6px 0 #003d7a',
                imageRendering: 'pixelated'
              }}
            >
              <span className="relative z-10">加入QQ群</span>
            </button>

            <button
              onClick={handleLearnMore}
              className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white font-black py-5 px-6 rounded-lg border-4 border-[#CC5555] hover:from-[#FF5555] hover:to-[#FF7A40] transition-all duration-200 text-lg relative"
              style={{
                boxShadow: '6px 6px 0 #CC5555',
                imageRendering: 'pixelated'
              }}
            >
              <span className="relative z-10">了解更多</span>
            </button>
          </div>

          <div
            className="mt-8 pt-6 border-t-4 border-[#2A2A2A]"
            style={{ imageRendering: 'pixelated' }}
          >
            <p className="text-gray-400 text-sm font-bold tracking-wider">
              感谢您的理解与支持
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
