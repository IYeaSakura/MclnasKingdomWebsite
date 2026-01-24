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
import { Search, Trophy, Shield, Sword, Scale, HelpCircle, Star } from 'lucide-react';
import type { Player, FactionType } from '@/types';
import { hallOfFamePlayers } from '@/data/mockData';
import { preloadImages } from '@/utils/imageCache';

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

  useEffect(() => {
    preloadImages(hallOfFamePlayers.map(player => player.image));
  }, []);

  const filteredPlayers = useMemo(() => {
    let players = [...hallOfFamePlayers];

    // Search filter
    if (searchTerm) {
      players = players.filter((player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.shortComment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.detailedExperience.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Faction filter
    if (factionFilter !== 'all') {
      players = players.filter((player) => player.faction === factionFilter);
    }

    return players;
  }, [searchTerm, factionFilter]);

  const getFactionLabel = (faction: string) => {
    return factionConfig[faction as FactionType]?.label || faction;
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

  return (
    <section id="fame" className="py-20 bg-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            名人堂
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            传奇玩家殿堂
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            认识塑造我们世界历史的传奇玩家，他们用勇气和智慧书写了服务器的辉煌篇章
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="搜索玩家名称或事迹..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Select value={factionFilter} onValueChange={(v) => setFactionFilter(v as FactionType)}>
            <SelectTrigger className="w-[180px] h-12">
              <SelectValue placeholder="筛选阵营" />
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
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player, index) => (
            <Card
              key={player.id}
              className="mc-card group cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedPlayer(player)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold text-lg">{player.name}</span>
                  </div>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 border ${getFactionColor(
                      player.faction
                    )}`}
                  >
                    {getFactionLabel(player.faction)}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 line-clamp-2">{player.shortComment}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-3 text-[#0071e3] hover:bg-[#0071e3]/10"
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

        {/* Empty State */}
        {filteredPlayers.length === 0 && (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">未找到匹配的玩家</h3>
            <p className="text-gray-400">请尝试调整搜索条件或筛选选项</p>
          </div>
        )}
      </div>

      {/* Player Detail Dialog */}
      <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-4">
              <img
                src={selectedPlayer?.image}
                alt={selectedPlayer?.name}
                className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  <span className="text-2xl font-bold">{selectedPlayer?.name}</span>
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getFactionColor(
                    selectedPlayer?.faction || 'other'
                  )}`}
                >
                  {getFactionLabel(selectedPlayer?.faction || 'other')}
                </span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">人物短评</span>
              </div>
              <p className="text-yellow-700">{selectedPlayer?.shortComment}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-600" />
                详细经历
              </h4>
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                {selectedPlayer?.detailedExperience.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
