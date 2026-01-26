interface SkeletonCardProps {
  count?: number;
}

export function SkeletonCard({ count = 6 }: SkeletonCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-[#4A4A4A] border-4 border-[#6A6A6A] overflow-hidden" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
          <div className="aspect-video bg-[#3A3A3A] animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-[#3A3A3A] rounded animate-pulse w-3/4" />
            <div className="h-3 bg-[#3A3A3A] rounded animate-pulse w-1/2" />
            <div className="h-3 bg-[#3A3A3A] rounded animate-pulse w-1/3" />
            <div className="flex items-center justify-between pt-2">
              <div className="h-4 bg-[#3A3A3A] rounded animate-pulse w-1/4" />
              <div className="h-8 bg-[#3A3A3A] rounded animate-pulse w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
