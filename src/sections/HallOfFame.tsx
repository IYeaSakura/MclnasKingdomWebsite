import { useState, useMemo, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, Trophy, Shield, Sword, Scale, HelpCircle, Star, Sparkles } from 'lucide-react';
import type { Player, FactionType } from '@/types';
import { loadHallOfFameData } from '@/data';
import { preloadImages } from '@/utils/imageCache';
import { createCachedDataLoader } from '@/utils/dataCache';
import { usePagination } from '@/hooks/usePagination';
import { Pagination } from '@/components/Pagination';
import { FirstLetterIcon } from '@/components/FirstLetterIcon';
import { OptimizedImage } from '@/components/OptimizedImage';
import { SkeletonCard } from '@/components/SkeletonCard';

const cachedLoadHallOfFameData = createCachedDataLoader('hall-of-fame', loadHallOfFameData);

const factionConfig: Record<FactionType, { label: string; color: string; icon: typeof Shield }> = {
  all: { label: '全部', color: 'gray', icon: HelpCircle },
  'pro-law': { label: '护法', color: 'blue', icon: Shield },
  'anti-law': { label: '反法', color: 'red', icon: Sword },
  neutral: { label: '中立', color: 'green', icon: Scale },
  other: { label: '其他', color: 'purple', icon: HelpCircle },
};

export function HallOfFame() {
  const [searchTerm, setSearchTerm] = useState('');
  const [factionFilter, setFactionFilter] = useState<FactionType>('all');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hallOfFameData, setHallOfFameData] = useState<Player[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await cachedLoadHallOfFameData();
        setHallOfFameData(data);
        preloadImages(data.map(item => item.image));
      } catch (error) {
        console.error('Failed to load hall of fame data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const filteredPlayers = useMemo(() => {
    let players = [...hallOfFameData];

    if (searchTerm) {
      players = players.filter((player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.shortComment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.detailedExperience.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (factionFilter !== 'all') {
      players = players.filter((player) => player.faction === factionFilter);
    }

    return players;
  }, [searchTerm, factionFilter, hallOfFameData]);

  const {
    currentPage,
    totalPages,
    paginatedData: displayPlayers,
    goToPage,
  } = usePagination(filteredPlayers, { pageSize: 9 });

  const getFactionLabel = (faction: string) => {
    return factionConfig[faction as FactionType]?.label || faction;
  };

  const getFactionColor = (faction: string) => {
    const colors: Record<string, string> = {
      'pro-law': 'bg-[#2196F3] text-white border-[#1976D2]',
      'anti-law': 'bg-[#F44336] text-white border-[#D32F2F]',
      neutral: 'bg-[#4CAF50] text-white border-[#388E3C]',
      other: 'bg-[#9C27B0] text-white border-[#7B1FA2]',
    };
    return colors[faction] || 'bg-[#607D8B] text-white border-[#455A64]';
  };

  const getFactionBorderColor = (faction: string) => {
    const colors: Record<string, string> = {
      'pro-law': '#1976D2',
      'anti-law': '#D32F2F',
      neutral: '#388E3C',
      other: '#7B1FA2',
    };
    return colors[faction] || '#455A64';
  };

  return (
    <section 
      ref={sectionRef}
      id="fame" 
      className="py-20 min-h-screen relative overflow-hidden"
      style={{ 
        imageRendering: 'pixelated',
        backgroundImage: 'linear-gradient(to bottom, #f8f9fa 0%, #e8e8e8 100%)'
      }}
    >
      <div className="absolute inset-0 overflow-hidden-reverse pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#FFD700]/10 border-4 border-[#FFD700]/20" />
        <div className="absolute top-40 right-20 w-20 h-20 bg-[#FFA500]/10 border-4 border-[#FFA500]/20" />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-[#FF6B6B]/10 border-4 border-[#FF6B6B]/20" />
        <div className="absolute bottom-20 right-1/4 w-18 h-18 bg-[#4ECDC4]/10 border-4 border-[#4ECDC4]/20" />
      </div>

      <div className="section-container relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 bg-[#4A4A4A] border-4 border-[#2A2A2A] mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ boxShadow: '4px 4px 0 #1A1A1A' }}
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span className="text-sm font-bold text-white tracking-wider">名人堂</span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-black text-gray-900 mb-4 transition-all duration-700 delay-100 tracking-wider ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '4px 4px 0 #B8860B' }}
          >
            传奇玩家殿堂
          </h2>
          <p
            className={`text-base md:text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 font-medium ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            认识塑造我们世界历史的传奇玩家，他们用勇气和智慧书写了服务器的辉煌篇章
          </p>
        </div>

        <div className={`flex flex-col md:flex-row gap-4 mb-8 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="搜索玩家名称或事迹..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#FFD700] transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
            />
          </div>
          <Select value={factionFilter} onValueChange={(v) => setFactionFilter(v as FactionType)}>
            <SelectTrigger 
              className="w-[180px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#FFD700] transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
            >
              <SelectValue placeholder="筛选阵营" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(factionConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  <span className="flex items-center gap-2">
                    <config.icon className="w-4 h-4" />
                    {config.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <SkeletonCard count={9} />
        ) : (
          <>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {displayPlayers.map((player, index) => (
                <Card
                  key={player.id}
                  className="mc-card group cursor-pointer overflow-hidden transition-all duration-500 bg-white border-4 border-[#4A4A4A] hover:border-[#FFD700] hover:translate-y-2"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    boxShadow: '6px 6px 0 #2A2A2A'
                  }}
                  onClick={() => setSelectedPlayer(player)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <FirstLetterIcon
                      text={player.name}
                      imageUrl={player.image}
                      alt={player.name}
                      size="xl"
                      className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#FFD700] fill-[#FFD700]" />
                        <span className="text-white font-black text-lg">{player.name}</span>
                      </div>
                      <span
                        className={`inline-block px-2 py-1 rounded-sm text-xs font-bold mt-2 border-2 ${getFactionColor(
                          player.faction
                        )}`}
                        style={{ borderColor: getFactionBorderColor(player.faction) }}
                      >
                        {getFactionLabel(player.faction)}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 line-clamp-2 font-medium">{player.shortComment}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-3 text-[[FFD700] hover:bg-[#FFD700]/10 font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlayer(player);
                      }}
                    >
                      <Trophy className="w-4 h-4 mr-1" />
                      查看详细经历
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPlayers.length === 0 && (
              <div className="text-center py-16">
                <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-500 mb-2">未找到匹配的玩家</h3>
                <p className="text-gray-400">请尝试调整搜索条件或筛选选项</p>
              </div>
            )}
          </>
        )}
      </div>

      <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
        <DialogContent 
          className="max-w-2xl bg-white border-4 border-[#4A4A4A]"
          style={{ boxShadow: '8px 8px 0 #2A2A2A' }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-sm object-cover border-4 border-[#4A4A4A]" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
                <OptimizedImage
                  src={selectedPlayer?.image}
                  alt={selectedPlayer?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-6 h-6 text-[#FFD700] fill-[#FFD700]" />
                  <span className="text-2xl font-black">{selectedPlayer?.name}</span>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-sm text-sm font-bold border-2 ${getFactionColor(
                    selectedPlayer?.faction || 'other'
                  )}`}
                  style={{ borderColor: getFactionBorderColor(selectedPlayer?.faction || 'other') }}
                >
                  {getFactionLabel(selectedPlayer?.faction || 'other')}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div 
              className="p-4 rounded-sm border-4"
              style={{ 
                backgroundColor: '#FFF9C4',
                borderColor: '#FBC02D',
                boxShadow: '4px 4px 0 #F9A825'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-[#F9A825]" />
                <span className="font-black text-[#F9A825]">人物短评</span>
              </div>
              <p className="text-[#F57F17] font-medium">{selectedPlayer?.shortComment}</p>
            </div>
            <div>
              <h4 className="font-black text-gray-800 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-600" />
                详细经历
              </h4>
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                {selectedPlayer?.detailedExperience.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2 font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </section>
  );
}
