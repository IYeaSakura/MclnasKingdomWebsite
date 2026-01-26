import { useState, useMemo, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Trophy, Shield, Sword, Scale, HelpCircle, TrendingUp, Crown, Coins, ShieldCheck } from 'lucide-react';
import type { 
  RankType, 
  PlayerRankSort, 
  RankRegionFilter, 
  RankFactionFilter, 
  RankKingdomLevelFilter,
  KingdomRank,
  PlayerRank
} from '@/types';
import { loadKingdomRankingsData, loadPlayerRankingsData } from '@/data';

const regionConfig: Record<RankRegionFilter, { label: string; color: string }> = {
  all: { label: '全部', color: 'gray' },
  yangzhou: { label: '扬州大陆', color: 'blue' },
  jiangzhou: { label: '江州大陆', color: 'green' },
  qingzhou: { label: '青州大陆', color: 'red' },
  yizhou: { label: '益州大陆', color: 'purple' },
};

const factionConfig: Record<RankFactionFilter, { label: string; color: string; icon: typeof Shield }> = {
  all: { label: '全部', color: 'gray', icon: HelpCircle },
  'pro-law': { label: '护法', color: 'blue', icon: Shield },
  'anti-law': { label: '反法', color: 'red', icon: Sword },
  neutral: { label: '中立', color: 'green', icon: Scale },
  unknown: { label: '未知', color: 'purple', icon: HelpCircle },
};

const kingdomLevelConfig: Record<RankKingdomLevelFilter, { label: string; color: string }> = {
  all: { label: '全部', color: 'gray' },
  private: { label: '私人领地', color: 'purple' },
  'free-city': { label: '自由市', color: 'blue' },
  weak: { label: '弱国', color: 'gray' },
  small: { label: '小国', color: 'green' },
  large: { label: '大国', color: 'yellow' },
  strong: { label: '强国', color: 'orange' },
  kingdom: { label: '王国', color: 'red' },
  holy: { label: '神圣王国', color: 'gold' },
};

const playerRankSortConfig: Record<PlayerRankSort, { label: string; icon: typeof TrendingUp }> = {
  gold: { label: '金币排行', icon: Coins },
  equipment: { label: '装备等级', icon: ShieldCheck },
};

export function Rankings() {
  const [activeTab, setActiveTab] = useState<RankType>('kingdom');
  
  const [kingdomSearchTerm, setKingdomSearchTerm] = useState('');
  const [kingdomRegionFilter, setKingdomRegionFilter] = useState<RankRegionFilter>('all');
  const [kingdomFactionFilter, setKingdomFactionFilter] = useState<RankFactionFilter>('all');
  const [kingdomLevelFilter, setKingdomLevelFilter] = useState<RankKingdomLevelFilter>('all');
  
  const [playerSearchTerm, setPlayerSearchTerm] = useState('');
  const [playerRegionFilter, setPlayerRegionFilter] = useState<RankRegionFilter>('all');
  const [playerFactionFilter, setPlayerFactionFilter] = useState<RankFactionFilter>('all');
  const [playerRankSort, setPlayerRankSort] = useState<PlayerRankSort>('gold');
  
  const [kingdomRankingsData, setKingdomRankingsData] = useState<KingdomRank[]>([]);
  const [playerRankingsData, setPlayerRankingsData] = useState<PlayerRank[]>([]);
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [kingdomData, playerData] = await Promise.all([
          loadKingdomRankingsData(),
          loadPlayerRankingsData()
        ]);
        setKingdomRankingsData(kingdomData);
        setPlayerRankingsData(playerData);
      } catch (error) {
        console.error('Failed to load rankings data:', error);
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
      { threshold: 0.1 }
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
    let kingdoms = [...kingdomRankingsData];

    if (kingdomSearchTerm) {
      kingdoms = kingdoms.filter((kingdom) =>
        kingdom.name.toLowerCase().includes(kingdomSearchTerm.toLowerCase()) ||
        kingdom.notes?.toLowerCase().includes(kingdomSearchTerm.toLowerCase())
      );
    }

    if (kingdomRegionFilter !== 'all') {
      kingdoms = kingdoms.filter((kingdom) => kingdom.region === kingdomRegionFilter);
    }

    if (kingdomFactionFilter !== 'all') {
      kingdoms = kingdoms.filter((kingdom) => kingdom.faction === kingdomFactionFilter);
    }

    if (kingdomLevelFilter !== 'all') {
      kingdoms = kingdoms.filter((kingdom) => kingdom.level === kingdomLevelFilter);
    }

    return kingdoms;
  }, [kingdomSearchTerm, kingdomRegionFilter, kingdomFactionFilter, kingdomLevelFilter, kingdomRankingsData]);

  const filteredPlayers = useMemo(() => {
    let players = [...playerRankingsData];

    if (playerSearchTerm) {
      players = players.filter((player) =>
        player.name.toLowerCase().includes(playerSearchTerm.toLowerCase()) ||
        player.kingdom.toLowerCase().includes(playerSearchTerm.toLowerCase()) ||
        player.notes?.toLowerCase().includes(playerSearchTerm.toLowerCase())
      );
    }

    if (playerRegionFilter !== 'all') {
      players = players.filter((player) => player.region === playerRegionFilter);
    }

    if (playerFactionFilter !== 'all') {
      players = players.filter((player) => player.faction === playerFactionFilter);
    }

    if (playerRankSort === 'gold') {
      players.sort((a, b) => b.gold - a.gold);
    } else if (playerRankSort === 'equipment') {
      players.sort((a, b) => b.equipmentLevel.localeCompare(a.equipmentLevel));
    }

    return players;
  }, [playerSearchTerm, playerRegionFilter, playerFactionFilter, playerRankSort, playerRankingsData]);

  const getRegionLabel = (region: string) => {
    return regionConfig[region as RankRegionFilter]?.label || region;
  };

  const getFactionLabel = (faction: string) => {
    return factionConfig[faction as RankFactionFilter]?.label || faction;
  };

  const getKingdomLevelLabel = (level: string) => {
    return kingdomLevelConfig[level as RankKingdomLevelFilter]?.label || level;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-[#FFD700]';
    if (rank === 2) return 'text-[#C0C0C0]';
    if (rank === 3) return 'text-[#CD7F32]';
    return 'text-gray-600';
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-[#FFD700]/20 border-[#FFD700]';
    if (rank === 2) return 'bg-[#C0C0C0]/20 border-[#C0C0C0]';
    if (rank === 3) return 'bg-[#CD7F32]/20 border-[#CD7F32]';
    return 'bg-gray-100 border-gray-300';
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN');
  };

  return (
    <section 
      ref={sectionRef}
      id="rankings" 
      className="py-20 min-h-screen relative overflow-hidden"
      style={{ 
        imageRendering: 'pixelated',
        backgroundImage: 'linear-gradient(to bottom, #f8f9fa 0%, #e8e8e8 100%)'
      }}
    >
      <div className="absolute inset-0 overflow-hidden-reverse pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#FFD700]/10 border-4 border-[#FFD700]/20" />
        <div className="absolute top-40 right-20 w-20 h-20 bg-[#C0C0C0]/10 border-4 border-[#C0C0C0]/20" />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-[#CD7F32]/10 border-4 border-[#CD7F32]/20" />
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
            <Trophy className="w-4 h-4 text-[#FFD700]" />
            <span className="text-sm font-bold text-white tracking-wider">排行榜</span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-black text-gray-900 mb-4 transition-all duration-700 delay-100 tracking-wider ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '4px 4px 0 #FF6B00' }}
          >
            荣耀殿堂
          </h2>
          <p
            className={`text-base md:text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 font-medium ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            查看服务器内最强大的王国和最富有的玩家，见证真正的强者风采
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={(v) => setActiveTab(v as RankType)}
          className={`w-full transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white border-4 border-[#4A4A4A] p-2" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
            <TabsTrigger value="kingdom" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-white font-bold">
              <Crown className="w-4 h-4 mr-2" />
              王国排行榜
            </TabsTrigger>
            <TabsTrigger value="player" className="data-[state=active]:bg-[#FFD700] data-[state=active]:text-white font-bold">
              <Trophy className="w-4 h-4 mr-2" />
              玩家排行榜
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kingdom" className="space-y-6">
            <div className="bg-white rounded-lg border-4 border-[#4A4A4A] p-6" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="搜索王国名称或备注..."
                    value={kingdomSearchTerm}
                    onChange={(e) => setKingdomSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#FFD700] transition-all duration-300"
                    style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
                  />
                </div>
                <Select value={kingdomRegionFilter} onValueChange={(v) => setKingdomRegionFilter(v as RankRegionFilter)}>
                  <SelectTrigger 
                    className="w-[140px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#FFD700] transition-all duration-300"
                    style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
                  >
                    <SelectValue placeholder="地区" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(regionConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={kingdomFactionFilter} onValueChange={(v) => setKingdomFactionFilter(v as RankFactionFilter)}>
                  <SelectTrigger 
                    className="w-[140px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#FFD700] transition-all duration-300"
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
                <Select value={kingdomLevelFilter} onValueChange={(v) => setKingdomLevelFilter(v as RankKingdomLevelFilter)}>
                  <SelectTrigger 
                    className="w-[140px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#FFD700] transition-all duration-300"
                    style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
                  >
                    <SelectValue placeholder="等级" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(kingdomLevelConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {filteredKingdoms.length === 0 ? (
                  <div className="text-center py-16">
                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-500 mb-2">未找到匹配的王国</h3>
                    <p className="text-gray-400">请尝试调整搜索条件或筛选选项</p>
                  </div>
                ) : (
                  filteredKingdoms.slice(0, 20).map((kingdom, index) => (
                    <Card
                      key={kingdom.id}
                      className="mc-card group cursor-pointer overflow-hidden transition-all duration-500 bg-white border-4 border-[#4A4A4A] hover:border-[#FFD700] hover:-translate-y-1"
                      style={{ 
                        boxShadow: '4px 4px 0 #2A2A2A'
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-lg border-4 flex items-center justify-center font-black text-xl ${getRankBadge(index + 1)}`}>
                            <Trophy className={`w-6 h-6 ${getRankColor(index + 1)}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-black text-gray-900 truncate">{kingdom.name}</h3>
                              <span className="px-2 py-1 rounded-sm text-xs font-bold bg-[#FFD700]/20 border-2 border-[#FFD700] text-[#FFD700]">
                                #{index + 1}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{getRegionLabel(kingdom.region)}</span>
                              <span>·</span>
                              <span>{getKingdomLevelLabel(kingdom.level)}</span>
                              <span>·</span>
                              <span>{getFactionLabel(kingdom.faction)}</span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <div className="flex items-center gap-1 text-[#FFD700] font-black">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-lg">{formatNumber(kingdom.reputation)}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">声望</div>
                          </div>
                        </div>
                        {kingdom.notes && (
                          <div className="mt-3 pt-3 border-t-2 border-gray-200">
                            <p className="text-sm text-gray-600 font-medium">{kingdom.notes}</p>
                          </div>
                        )}
                        <div className="mt-3 pt-3 border-t-2 border-gray-200 text-xs text-gray-500">
                          更新时间：{kingdom.lastUpdateTime}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="player" className="space-y-6">
            <div className="bg-white rounded-lg border-4 border-[#4A4A4A] p-6" style={{ boxShadow: '6px 6px 0 #2A2A2A' }}>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="搜索玩家名称、王国或备注..."
                    value={playerSearchTerm}
                    onChange={(e) => setPlayerSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#FFD700] transition-all duration-300"
                    style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
                  />
                </div>
                <Select value={playerRegionFilter} onValueChange={(v) => setPlayerRegionFilter(v as RankRegionFilter)}>
                  <SelectTrigger 
                    className="w-[140px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#FFD700] transition-all duration-300"
                    style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
                  >
                    <SelectValue placeholder="地区" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(regionConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={playerFactionFilter} onValueChange={(v) => setPlayerFactionFilter(v as RankFactionFilter)}>
                  <SelectTrigger 
                    className="w-[140px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#FFD700] transition-all duration-300"
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
                <Select value={playerRankSort} onValueChange={(v) => setPlayerRankSort(v as PlayerRankSort)}>
                  <SelectTrigger 
                    className="w-[160px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#FFD700] transition-all duration-300"
                    style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="排序方式" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(playerRankSortConfig).map(([key, config]) => (
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

              <div className="space-y-3">
                {filteredPlayers.length === 0 ? (
                  <div className="text-center py-16">
                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-500 mb-2">未找到匹配的玩家</h3>
                    <p className="text-gray-400">请尝试调整搜索条件或筛选选项</p>
                  </div>
                ) : (
                  filteredPlayers.slice(0, 20).map((player, index) => (
                    <Card
                      key={player.id}
                      className="mc-card group cursor-pointer overflow-hidden transition-all duration-500 bg-white border-4 border-[#4A4A4A] hover:border-[#FFD700] hover:-translate-y-1"
                      style={{ 
                        boxShadow: '4px 4px 0 #2A2A2A'
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-lg border-4 flex items-center justify-center font-black text-xl ${getRankBadge(index + 1)}`}>
                            <Trophy className={`w-6 h-6 ${getRankColor(index + 1)}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-black text-gray-900 truncate">{player.name}</h3>
                              <span className="px-2 py-1 rounded-sm text-xs font-bold bg-[#FFD700]/20 border-2 border-[#FFD700] text-[#FFD700]">
                                #{index + 1}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{player.kingdom}</span>
                              <span>·</span>
                              <span>{getRegionLabel(player.region)}</span>
                              <span>·</span>
                              <span>{getFactionLabel(player.faction)}</span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            {playerRankSort === 'gold' ? (
                              <>
                                <div className="flex items-center gap-1 text-[#FFD700] font-black">
                                  <Coins className="w-4 h-4" />
                                  <span className="text-lg">{formatNumber(player.gold)}</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">金币</div>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center gap-1 text-[#FFD700] font-black">
                                  <ShieldCheck className="w-4 h-4" />
                                  <span className="text-lg truncate max-w-[150px]">{player.equipmentLevel}</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">装备等级</div>
                              </>
                            )}
                          </div>
                        </div>
                        {player.notes && (
                          <div className="mt-3 pt-3 border-t-2 border-gray-200">
                            <p className="text-sm text-gray-600 font-medium">{player.notes}</p>
                          </div>
                        )}
                        <div className="mt-3 pt-3 border-t-2 border-gray-200 text-xs text-gray-500">
                          更新时间：{player.lastUpdateTime}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
