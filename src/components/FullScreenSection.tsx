import type { ReactNode } from 'react';

interface FullScreenSectionProps {
  children: ReactNode;
  className?: string;
}

export function FullScreenSection({ children, className = '' }: FullScreenSectionProps) {
  return (
    <div className={`w-screen h-screen overflow-hidden ${className}`}>
      {children}
    </div>
  );
}