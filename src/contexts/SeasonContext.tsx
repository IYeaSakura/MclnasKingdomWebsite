import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface SeasonContextType {
  currentSeason: Season;
  setCurrentSeason: (season: Season) => void;
  getNextSeason: (season: Season) => Season;
  getSeasonByIndex: (index: number) => Season;
}

const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export function useSeason() {
  const context = useContext(SeasonContext);
  if (context === undefined) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return context;
}

interface SeasonProviderProps {
  children: ReactNode;
}

export function SeasonProvider({ children }: SeasonProviderProps) {
  const [currentSeason, setCurrentSeason] = useState<Season>(() => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  });

  const getNextSeason = (season: Season): Season => {
    const currentIndex = SEASONS.indexOf(season);
    return SEASONS[(currentIndex + 1) % SEASONS.length];
  };

  const getSeasonByIndex = (index: number): Season => {
    return SEASONS[index % SEASONS.length];
  };

  const value = {
    currentSeason,
    setCurrentSeason,
    getNextSeason,
    getSeasonByIndex,
  };

  return (
    <SeasonContext.Provider value={value}>
      {children}
    </SeasonContext.Provider>
  );
}