import { useState, useEffect } from 'react';

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDetected, setIsDetected] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const width = window.innerWidth;

      const isMobileDevice = /Android userAgent/i.test(userAgent) ||
        /iPhone|iPad|iPod/i.test(userAgent) ||
        /Mobile/i.test(userAgent) ||
        width < 768;

      setIsMobile(isMobileDevice);
      setIsDetected(true);
    };

    checkMobile();

    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, isDetected };
}
