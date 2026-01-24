import { useState, useMemo, useEffect } from 'react';
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
import { Search, Building2, Shield, Sword, Scale, HelpCircle, MapPin, Crown } from 'lucide-react';
import type { Kingdom, FactionType, KingdomLevel, RegionType } from '@/types';
import { kingdomsData } from '@/data';
import { preloadImages } from '@/utils/imageCache';
import { usePagination } from '@/hooks/usePagination';
import { Pagination } from '@/components/Pagination';
import { FirstLetterIcon } from '@/components/FirstLetterIcon';

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

  useEffect(() => {
    preloadImages(kingdomsData.map(kingdom => kingdom.image));
  }, []);

  const filteredKingdoms = useMemo(() => {
    let items = [...kingdomsData];

    // Search filter
    if (searchTerm) {
      items = items.filter((kingdom) =>
        kingdom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kingdom.shortComment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kingdom.detailedInfo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Faction filter
    if (factionFilter !== 'all') {
      items = items.filter((kingdom) => kingdom.faction === factionFilter);
    }

    // Level filter
    if (levelFilter !== 'all') {
      items = items.filter((kingdom) => kingdom.level === levelFilter);
    }

    // Region filter
    if (regionFilter !== 'all') {
      items = items.filter((kingdom) => kingdom.region === regionFilter);
    }

    return items;
    }, [searchTerm, factionFilter, levelFilter, regionFilter]);

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
      'pro-law': 'bg-blue-100 text-blue-700 border-blue-200',
      'anti-law': 'bg-red-100 text-red-700 border-red-200',
      neutral: 'bg-green-100 text-green-700 border-green-200',
      other: 'bg-purple-100 text-purple-700 border-purple-200',
    };
    return colors[faction] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      private: 'bg-gray-100',
      'free-city': 'bg-blue-100',
      weak: 'bg-red-100',
      small: 'bg-yellow-100',
      large: 'bg-green-100',
      strong: 'bg-purple-100',
      kingdom: 'bg-orange-100',
      holy: 'bg-gradient-to-r from-yellow-100 to-orange-100',
    };
    return colors[level] || 'bg-gray-100';
  };

  return (
    <section id="kingdoms" className="py-20 bg-[#f8f9fa]">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            王国传
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            史诗王国列传
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            探索我们社区最令人印象深刻的王国和建筑，每一个都承载着独特的历史和文化
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="搜索王国名称或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Select value={factionFilter} onValueChange={(v) => setFactionFilter(v as FactionType)}>
            <SelectTrigger className="w-[140px] h-12">
              <SelectValue placeholder="阵营" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(factionConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  <span className="flex items-center gap-2">
                    <config.icon className={`w-4 h-4 text-${config.color}-500`} />
                    {config.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={(v) => setLevelFilter(v as KingdomLevel)}>
            <SelectTrigger className="w-[140px] h-12">
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
            <SelectTrigger className="w-[140px] h-12">
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

        {/* Kingdoms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayKingdoms.map((kingdom, index) => (
            <Card
              key={kingdom.id}
              className="mc-card group cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
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
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getFactionColor(
                      kingdom.faction
                    )}`}
                  >
                    {getFactionLabel(kingdom.faction)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                      kingdom.level
                    )} text-gray-700`}
                  >
                    {getLevelLabel(kingdom.level)}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-xl mb-1 group-hover:text-[#0071e3] transition-colors">
                    {kingdom.name}
                  </h3>
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{getRegionLabel(kingdom.region)}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{kingdom.shortComment}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-[#0071e3] hover:bg-[#0071e3]/10"
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

        {/* Empty State */}
        {filteredKingdoms.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">未找到匹配的王国</h3>
            <p className="text-gray-400">请尝试调整搜索条件或筛选选项</p>
          </div>
        )}
      </div>

      {/* Kingdom Detail Dialog */}
      <Dialog open={!!selectedKingdom} onOpenChange={() => setSelectedKingdom(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedKingdom?.image}
                  alt={selectedKingdom?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-2xl mb-2">{selectedKingdom?.name}</h3>
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getFactionColor(
                        selectedKingdom?.faction || 'other'
                      )}`}
                    >
                      {getFactionLabel(selectedKingdom?.faction || 'other')}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
                        selectedKingdom?.level || 'private'
                      )} text-gray-700`}
                    >
                      {getLevelLabel(selectedKingdom?.level || 'private')}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {getRegionLabel(selectedKingdom?.region || 'yangzhou')}
                    </span>
                  </div>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold text-indigo-800">王国简介</span>
              </div>
              <p className="text-indigo-700">{selectedKingdom?.shortComment}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-600" />
                详细介绍
              </h4>
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                {selectedKingdom?.detailedInfo.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </section>
  );
}
