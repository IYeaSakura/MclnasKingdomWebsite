import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { XIcon } from 'lucide-react';

interface VideoModalProps {
  trigger: React.ReactNode;
  videoUrl: string;
  title?: string;
  description?: string;
}

export function VideoModal({ trigger, videoUrl, title = '视频播放', description }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent
        className="w-[95vw] max-w-[1400px] p-0 bg-[#1A1A1A] border-4 border-[#4A4A4A] overflow-hidden"
        style={{
          boxShadow: '8px 8px 0 #2A2A2A',
          imageRendering: 'pixelated'
        }}
      >
        <div className="relative">
          {/* Minecraft-style decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-16 h-16 bg-[#6B8E23]/10 border-4 border-[#6B8E23]/20" />
            <div className="absolute top-0 right-0 w-12 h-12 bg-[#8C5A2C]/10 border-4 border-[#8C5A2C]/20" />
            <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-[#FFD700]/5 border-4 border-[#FFD700]/10" />
          </div>

          {/* Close button with Minecraft style */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 bg-[#4A4A4A] border-4 border-[#6A6A6A] p-2 text-white hover:bg-[#6A6A6A] hover:border-[#8A8A8A] transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              boxShadow: '4px 4px 0 #2A2A2A',
              imageRendering: 'pixelated'
            }}
          >
            <XIcon className="w-6 h-6" strokeWidth={3} />
          </button>

          {/* Video iframe with Minecraft-style container */}
          <div className="relative w-full bg-[#2A2A2A] border-4 border-[#4A4A4A]" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={videoUrl}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={title}
            />
          </div>

          {/* Title and description with Minecraft style */}
          {(title || description) && (
            <div
              className="p-6 bg-[#2A2A2A]/98 border-t-4 border-[#4A4A4A] text-white relative"
              style={{ imageRendering: 'pixelated' }}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-4 h-4 bg-[#FFD700]" />
              <div className="absolute top-0 right-0 w-4 h-4 bg-[#FFD700]" />

              <div className="relative z-10">
                {title && (
                  <DialogTitle
                    className="text-xl md:text-2xl font-black mb-3 text-[#FFD700] tracking-wider"
                    style={{ textShadow: '3px 3px 0 #1A1A1A' }}
                  >
                    {title}
                  </DialogTitle>
                )}
                {description && (
                  <DialogDescription
                    className="text-[#E8E8E8] leading-relaxed font-medium"
                  >
                    {description}
                  </DialogDescription>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}