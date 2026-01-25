import { Sparkles } from 'lucide-react';

interface GlobalParticlesProps {
  className?: string;
}

export function GlobalParticles({ className = '' }: GlobalParticlesProps) {
  return (
    <div className={`fixed inset-0 z-50 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(15)].map((_, i) => (
        <Sparkles
          key={i}
          className="absolute text-white/30 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${8 + Math.random() * 12}px`,
            height: `${8 + Math.random() * 12}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}