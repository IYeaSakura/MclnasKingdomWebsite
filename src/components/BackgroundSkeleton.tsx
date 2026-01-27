interface BackgroundSkeletonProps {
  className?: string;
}

export function BackgroundSkeleton({ className = '' }: BackgroundSkeletonProps) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 ${className}`}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, #1a1a1a 25%, transparent 25%),
            linear-gradient(-45deg, #1a1a1a 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #1a1a1a 75%),
            linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
        }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white/30 text-sm font-medium animate-pulse">
          加载中...
        </div>
      </div>
    </div>
  );
}
