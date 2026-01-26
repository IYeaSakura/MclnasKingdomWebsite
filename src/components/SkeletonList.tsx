interface SkeletonListProps {
  count?: number;
}

export function SkeletonList({ count = 10 }: SkeletonListProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className="bg-white border-4 border-[#4A4A4A] overflow-hidden transition-all duration-500"
          style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
        >
          <div className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg border-4 bg-[#3A3A3A] animate-pulse" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-5 bg-[#3A3A3A] rounded animate-pulse w-1/2" />
                <div className="flex items-center gap-2">
                  <div className="h-3 bg-[#3A3A3A] rounded animate-pulse w-20" />
                  <div className="h-3 bg-[#3A3A3A] rounded animate-pulse w-16" />
                  <div className="h-3 bg-[#3A3A3A] rounded animate-pulse w-16" />
                </div>
              </div>
              <div className="flex-shrink-0 text-right space-y-1">
                <div className="h-5 bg-[#3A3A3A] rounded animate-pulse w-20" />
                <div className="h-3 bg-[#3A3A3A] rounded animate-pulse w-12" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
