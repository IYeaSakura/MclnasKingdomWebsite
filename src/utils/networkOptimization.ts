interface NetworkInfo {
  effectiveType: string | null;
  downlink: number | null;
  rtt: number | null;
  saveData: boolean | null;
}

let networkInfo: NetworkInfo = {
  effectiveType: null,
  downlink: null,
  rtt: null,
  saveData: null,
};

let isSlowNetwork = false;
let isVerySlowNetwork = false;

export function detectNetworkSpeed(): void {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    
    networkInfo = {
      effectiveType: connection.effectiveType || null,
      downlink: connection.downlink || null,
      rtt: connection.rtt || null,
      saveData: connection.saveData || null,
    };

    isSlowNetwork = (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g' || connection.downlink < 1.5);
    isVerySlowNetwork = (connection.effectiveType === 'slow-2g' || connection.downlink < 0.5);

    connection.addEventListener('change', detectNetworkSpeed);
  }
}

export function getNetworkInfo(): NetworkInfo {
  return networkInfo;
}

export function isSlowConnection(): boolean {
  return isSlowNetwork;
}

export function isVerySlowConnection(): boolean {
  return isVerySlowNetwork;
}

export function getOptimalImageQuality(): 'low' | 'medium' | 'high' {
  if (isVerySlowNetwork) {
    return 'low';
  }
  if (isSlowNetwork) {
    return 'medium';
  }
  return 'high';
}

export function getOptimalImageSize(): number {
  const quality = getOptimalImageQuality();
  
  switch (quality) {
    case 'low':
      return 480;
    case 'medium':
      return 800;
    case 'high':
      return 1920;
    default:
      return 1920;
  }
}

export function shouldUseLowQualityPlaceholder(): boolean {
  return isVerySlowNetwork;
}

detectNetworkSpeed();
