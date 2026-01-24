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
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-0 overflow-hidden">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </button>
          
          {/* Video iframe */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={videoUrl}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={title}
            />
          </div>
          
          {/* Title and description */}
          {(title || description) && (
            <div className="p-6 bg-gradient-to-b from-black/80 to-black text-white">
              {title && (
                <DialogTitle className="text-xl font-bold mb-2 text-white">
                  {title}
                </DialogTitle>
              )}
              {description && (
                <DialogDescription className="text-gray-300">
                  {description}
                </DialogDescription>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}