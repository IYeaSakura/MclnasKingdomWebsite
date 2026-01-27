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
import { Search, Building2, Shield, Sword, Scale, HelpCircle, MapPin, Crown, Sparkles } from 'lucide-react';
import type { Kingdom, FactionType, KingdomLevel, RegionType } from '@/types';
import { loadKingdomsData } from '@/data';
import { createCachedDataLoader } from '@/utils/dataCache';
import { getOptimalImageQuality } from '@/utils/networkOptimization';
import { imageLoader } from '@/utils/imageLoader';
import { usePagination } from '@/hooks/usePagination';
import { Pagination } from '@/components/Pagination';
import { FirstLetterIcon } from '@/components/FirstLetterIcon';
import { OptimizedImage } from '@/components/OptimizedImage';
import { SkeletonCard } from '@/components/SkeletonCard';

const cachedLoadKingdomsData = createCachedDataLoader('kingdoms', loadKingdomsData);

const factionConfig: Record<FactionType, { label: string; color: string; icon: typeof Shield }> = {
  all: { label: '全部', color: 'gray', icon: HelpCircle },
  'pro-law': { label: '护法', color: 'blue', icon: Shield },
  'anti-law': { label: '反法', color: 'red', icon: Sword },
  neutral: { label: '中立', color: 'green', icon: Scale },
  other: { label: '其他', color: 'purple', icon: HelpCircle },
};

const levelConfig: Record<KingdomLevel, string> = {
  all: '全部等级',
  private: '私人领地',
  'free-city': '自由市',
  weak: '弱国',
  small: '小国',
  large: '大国',
  strong: '强国',
  kingdom: '王国',
  holy: '神圣王国',
};

const regionConfig: Record<RegionType, string> = {
  all: '全部地区',
  yangzhou: '扬州大陆',
  jiangzhou: '江州大陆',
  qingzhou: '青州大陆',
  yizhou: '益州大陆',
};

export function Kingdoms() {
  const [searchTerm, setSearchTerm] = useState('');
  const [factionFilter, setFactionFilter] = useState<FactionType>('all');
  const [levelFilter, setLevelFilter] = useState<KingdomLevel>('all');
  const [regionFilter, setRegionFilter] = useState<RegionType>('all');
  const [selectedKingdom, setSelectedKingdom] = useState<Kingdom | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [kingdomsData, setKingdomsData] = useState<Kingdom[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageQuality = getOptimalImageQuality();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await cachedLoadKingdomsData();
        setKingdomsData(data);
        imageLoader.preloadImages(data.map(kingdom => kingdom.image), imageQuality, 'low');
      } catch (error) {
        console.error('Failed to load kingdoms data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [imageQuality]);

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

  const filteredKingdoms = useMemo(() => {
    let items = [...kingdomsData];

    if (searchTerm) {
      items = items.filter((kingdom) =>
        kingdom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kingdom.shortComment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kingdom.detailedInfo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (factionFilter !== 'all') {
      items = items.filter((kingdom) => kingdom.faction === factionFilter);
    }

    if (levelFilter !== 'all') {
      items = items.filter((kingdom) => kingdom.level === levelFilter);
    }

    if (regionFilter !== 'all') {
      items = items.filter((kingdom) => kingdom.region === regionFilter);
    }

    return items;
  }, [searchTerm, factionFilter, levelFilter, regionFilter, kingdomsData]);

  const {
    currentPage,
    totalPages,
    paginatedData: displayKingdoms,
    goToPage,
  } = usePagination(filteredKingdoms, { pageSize: 9 });

  const getFactionLabel = (faction: string) => {
    return factionConfig[faction as FactionType]?.label || faction;
  };

  const getLevelLabel = (level: string) => {
    return levelConfig[level as KingdomLevel] || level;
  };

  const getRegionLabel = (region: string) => {
    return regionConfig[region as RegionType] || region;
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

  const getLevelColor = (level: string) => {
    const colors: Record<string, { bg: string; border: string }> = {
      private: { bg: 'bg-[#9E9E9E]', border: '#757575' },
      'free-city': { bg: 'bg-[#2196F3]', border: '#1976D2' },
      weak: { bg: 'bg-[#F44336]', border: '#D32F2F' },
      small: { bg: 'bg-[#FF9800]', border: '#F57C00' },
      large: { bg: 'bg-[#4CAF50]', border: '#388E3C' },
      strong: { bg: 'bg-[#9C27B0]', border: '#7B1FA2' },
      kingdom: { bg: 'bg-[#FF5722]', border: '#E64A19' },
      holy: { bg: 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]', border: '#F57C00' },
    };
    return colors[level] || { bg: 'bg-[#9E9E9E]', border: '#757575' };
  };

  return (
    <section 
      ref={sectionRef}
      id="kingdoms" 
      className="py-20 min-h-screen relative overflow-hidden"
      style={{ 
        imageRendering: 'pixelated',
        backgroundImage: 'linear-gradient(to bottom, #f8f9fa 0%, #e8e8e8 100%)'
      }}
    >
      <div className="absolute inset-0 overflow-hidden-reverse pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#8C5A2C]/10 border-4 border-[#8C5A2C]/20" />
        <div className="absolute top-40 right-20 w-20 h-20 bg-[#6B8E23]/10 border-4 border-[#6B8E23]/20" />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-[#556B2F]/10 border-4 border-[#556B2F]/20" />
        <div className="absolute bottom-20 right-1/4 w-18 h-18 bg-[#9ACD32]/10 border-4 border-[#9ACD32]/20" />
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
            <span className="text-sm font-bold text-white tracking-wider">王国传</span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-black text-gray-900 mb-4 transition-all duration-700 delay-100 tracking-wider ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '4px 4px 0 #2E7D32' }}
          >
            史诗王国列传
          </h2>
          <p
            className={`text-base md:text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 font-medium ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            探索我们社区最令人印象深刻的王国和建筑，每一个都承载着独特的历史和文化
          </p>
        </div>

        <div className={`flex flex-col md:flex-row gap-4 mb-8 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="搜索王国名称或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#0071e3] transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
            />
          </div>
          <Select value={factionFilter} onValueChange={(v) => setFactionFilter(v as FactionType)}>
            <SelectTrigger 
              className="w-[140px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#0071e3] transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
            >
              <SelectValue placeholder="阵营" />
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
          <Select value={levelFilter} onValueChange={(v) => setLevelFilter(v as KingdomLevel)}>
            <SelectTrigger 
              className="w-[140px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#0071e3] transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
            >
              <SelectValue placeholder="等级" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(levelConfig).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={regionFilter} onValueChange={(v) => setRegionFilter(v as RegionType)}>
            <SelectTrigger 
              className="w-[140px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#0071e3] transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
            >
              <SelectValue placeholder="地区" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(regionConfig).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={`transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {isLoading ? (
            <SkeletonCard count={9} />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-100">
              {displayKingdoms.map((kingdom, index) => (
                <Card
                  key={kingdom.id}
                  className="mc-card group cursor-pointer overflow-hidden transition-all duration-500 bg-white border-4 border-[#4A4A4A] hover:border-[#0071e3] hover:-translate-y-2"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    boxShadow: '6px 6px 0 #2A2A2A'
                  }}
                  onClick={() => setSelectedKingdom(kingdom)}
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <FirstLetterIcon
                      text={kingdom.name}
                      imageUrl={kingdom.image}
                      alt={kingdom.name}
                      size="xl"
                      className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex gap-2">
                      <span
                        className={`px-2 py-1 rounded-sm text-xs font-bold border-2 ${getFactionColor(
                          kingdom.faction
                        )}`}
                        style={{ borderColor: getFactionBorderColor(kingdom.faction) }}
                      >
                        {getFactionLabel(kingdom.faction)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-sm text-xs font-bold text-white border-2 ${getLevelColor(
                          kingdom.level
                        ).bg}`}
                        style={{ borderColor: getLevelColor(kingdom.level).border }}
                      >
                        {getLevelLabel(kingdom.level)}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-black text-xl mb-1 group-hover:text-[#0071e3] transition-colors">
                        {kingdom.name}
                      </h3>
                      <div className="flex items-center gap-1 text-white/80 text-sm font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>{getRegionLabel(kingdom.region)}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3 font-medium">{kingdom.shortComment}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-fulltext-[#0071e3] hover:bg-[#0071e3]/10 font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedKingdom(kingdom);
                      }}
                    >
                      <Crown className="w-4 h-4 mr-1" />
                      查看详细介绍
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredKingdoms.length === 0 && (
              <div className="text-center py-16">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-500 mb-2">未找到匹配的王国</h3>
                <p className="text-gray-400">请尝试调整搜索条件或筛选选项</p>
              </div>
            )}
          </>
          )}
        </div>
      </div>

      <Dialog open={!!selectedKingdom} onOpenChange={() => setSelectedKingdom(null)}>
        <DialogContent 
          className="max-w-3xl bg-white border-4 border-[#4A4A4A]"
          style={{ boxShadow: '8px 8px 0 #2A2A2A' }}
        >
          <DialogHeader>
            <DialogTitle>
              <div className="relative w-full h-48 rounded-sm overflow-hidden mb-4 border-4 border-[#4A4A4A]" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
                <OptimizedImage
                  src={selectedKingdom?.image}
                  alt={selectedKingdom?.name}
                  className="w-full h-full object-cover"
                  priority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-black text-2xl mb-2">{selectedKingdom?.name}</h3>
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-sm text-xs font-bold border-2 ${getFactionColor(
                        selectedKingdom?.faction || 'other'
                      )}`}
                      style={{ borderColor: getFactionBorderColor(selectedKingdom?.faction || 'other') }}
                    >
                      {getFactionLabel(selectedKingdom?.faction || 'other')}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-sm text-xs font-bold text-white border-2 ${getLevelColor(
                        selectedKingdom?.level || 'private'
                      ).bg}`}
                      style={{ borderColor: getLevelColor(selectedKingdom?.level || 'private').border }}
                    >
                      {getLevelLabel(selectedKingdom?.level || 'private')}
                    </span>
                    <span 
                      className="px-3 py-1 rounded-sm text-xs font-bold text-white border-2 bg-[#607D8B]"
                      style={{ borderColor: '#455A64' }}
                    >
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {getRegionLabel(selectedKingdom?.region || 'yangzhou')}
                    </span>
                  </div>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div 
              className="p-4 rounded-sm border-4"
              style={{ 
                backgroundColor: '#E3F2FD',
                borderColor: '#2196F3',
                boxShadow: '4px 4px 0 #1976D2'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-[#1976D2]" />
                <span className="font-black text-[#1976D2]">王国简介</span>
              </div>
              <p className="text-[#0D47A1] font-medium">{selectedKingdom?.shortComment}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-black text-gray-800 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-600" />
                详细介绍
              </h4>
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                {selectedKingdom?.detailedInfo.split('\n').map((paragraph, index) => (
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
