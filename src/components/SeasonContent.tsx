import { useSeason } from '@/contexts/SeasonContext';
import { SeasonBackground } from '@/components/SeasonBackground';
import { GameGallery } from '@/sections/GameGallery';
import { GameFeatures } from '@/sections/GameFeatures';
import { CTA } from '@/sections/CTA';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter'];

export function SeasonContent() {
  const { getSeasonByIndex, currentSeason } = useSeason();
  
  // 计算每个区域对应的季节
  const heroSeasonIndex = SEASONS.indexOf(currentSeason);
  const gallerySeason = getSeasonByIndex((heroSeasonIndex + 1) % 4);
  const featuresSeason = getSeasonByIndex((heroSeasonIndex + 2) % 4);
  const ctaSeason = getSeasonByIndex((heroSeasonIndex + 3) % 4);

  return (
    <>
      {/* 游戏世界 - 下一个季节 */}
      <SeasonBackground season={gallerySeason} className="h-screen">
        <GameGallery />
      </SeasonBackground>
      
      {/* 游戏特色 - 下下个季节 */}
      <SeasonBackground season={featuresSeason} className="h-screen">
        <GameFeatures />
      </SeasonBackground>
      
      {/* 开始冒险 - 下下下个季节 */}
      <SeasonBackground season={ctaSeason} className="h-screen">
        <CTA />
      </SeasonBackground>
    </>
  );
}