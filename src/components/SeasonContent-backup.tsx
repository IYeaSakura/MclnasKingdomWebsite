import { useSeason } from '@/contexts/SeasonContext';
import { SeasonBackground } from '@/components/SeasonBackground';
import { GameGallery } from '@/sections/GameGallery';
import { GameFeatures } from '@/sections/GameFeatures';
import { CTA } from '@/sections/CTA';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface SeasonSectionProps {
  sectionIndex: number;
  children: React.ReactNode;
  className?: string;
}

function SeasonSection({ sectionIndex, children, className = '' }: SeasonSectionProps) {
  const { getSeasonByIndex, currentSeason } = useSeason();
  
  // 计算当前区域对应的季节
  // sectionIndex: 0 = 游戏世界, 1 = 游戏特色, 2 = 开始冒险
  const heroSeasonIndex = SEASONS.indexOf(currentSeason);
  const sectionSeasonIndex = (heroSeasonIndex + sectionIndex + 1) % 4;
  const sectionSeason = getSeasonByIndex(sectionSeasonIndex);

  return (
    <SeasonBackground season={sectionSeason} className={className}>
      {children}
    </SeasonBackground>
  );
}

const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

export function SeasonContent() {
  return (
    <>
      {/* 游戏世界 - 下一个季节 */}
      <SeasonSection sectionIndex={0}>
        <GameGallery />
      </SeasonSection>
      
      {/* 游戏特色 - 下下个季节 */}
      <SeasonSection sectionIndex={1}>
        <GameFeatures />
      </SeasonSection>
      
      {/* 开始冒险 - 下下下个季节 */}
      <SeasonSection sectionIndex={2}>
        <CTA />
      </SeasonSection>
    </>
  );
}