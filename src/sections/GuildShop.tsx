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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Search, TrendingUp, Flower2, Coins, Info, ArrowUpDown, Sparkles } from 'lucide-react';
import type { GuildShopItem, ShopItemType, PriceSort } from '@/types';
import { loadGuildShopData } from '@/data';
import { OptimizedImage } from '@/components/OptimizedImage';
import { createCachedDataLoader } from '@/utils/dataCache';
import { getOptimalImageQuality } from '@/utils/networkOptimization';
import { imageLoader } from '@/utils/imageLoader';
import { usePagination } from '@/hooks/usePagination';
import { Pagination } from '@/components/Pagination';
import { FirstLetterIcon } from '@/components/FirstLetterIcon';
import { SkeletonCard } from '@/components/SkeletonCard';

const cachedLoadGuildShopData = createCachedDataLoader('guild-shop', loadGuildShopData);

export function GuildShop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<ShopItemType>('all');
  const [sortBy, setSortBy] = useState<PriceSort>('none');
  const [selectedItem, setSelectedItem] = useState<GuildShopItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [guildShopData, setGuildShopData] = useState<GuildShopItem[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageQuality = getOptimalImageQuality();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await cachedLoadGuildShopData();
        setGuildShopData(data);
        imageLoader.preloadImages(data.map(item => item.image), imageQuality, 'low');
      } catch (error) {
        console.error('Failed to load guild shop data:', error);
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

  const filteredItems = useMemo(() => {
    let items = [...guildShopData];

    if (searchTerm) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter === 'buy') {
      items = items.filter((item) => item.type === 'both' || item.type === 'buy_only');
    } else if (typeFilter === 'sell') {
      items = items.filter((item) => item.type === 'both' || item.type === 'sell_only');
    }

    if (sortBy === 'asc') {
      items.sort((a, b) => a.buyDisplayPrice - b.buyDisplayPrice);
    } else if (sortBy === 'desc') {
      items.sort((a, b) => b.buyDisplayPrice - a.buyDisplayPrice);
    }

    return items;
  }, [searchTerm, typeFilter, sortBy, guildShopData]);

  const {
    currentPage,
    totalPages,
    paginatedData: displayItems,
    goToPage,
  } = usePagination(filteredItems, { pageSize: 12 });

  return (
    <section 
      ref={sectionRef}
      id="guild" 
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
            <span className="text-sm font-bold text-white tracking-wider">兔吱吱商会</span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-black text-gray-900 mb-4 transition-all duration-700 delay-100 tracking-wider ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '4px 4px 0 #8E44AD' }}
          >
            稀有物品交易中心
          </h2>
          <p
            className={`text-base md:text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 font-medium ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            来自遥远土地的稀有物品，由兔吱吱商会独家供应。每一件物品都蕴含独特的故事和力量
          </p>
        </div>

        <div className={`flex flex-col md:flex-row gap-4 mb-8 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="搜索物品名称、描述或备注..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#9B59B6] transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
            />
          </div>
          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as ShopItemType)}>
            <SelectTrigger 
              className="w-[180px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#9B59B6] transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
            >
              <SelectValue placeholder="筛选类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部物品</SelectItem>
              <SelectItem value="buy">可购买</SelectItem>
              <SelectItem value="sell">可出售</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as PriceSort)}>
            <SelectTrigger 
              className="w-[180px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#9B59B6] transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue placeholder="价格排序" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">默认排序</SelectItem>
              <SelectItem value="asc">价格从低到高</SelectItem>
              <SelectItem value="desc">价格从高到低</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className={`transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {isLoading ? (
            <SkeletonCard count={12} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-700 delay-100">
              {displayItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="mc-card group cursor-pointer overflow-hidden transition-all duration-500 bg-white border-4 border-[#4A4A4A] hover:border-[#9B59B6] hover:-translate-y-2"
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    boxShadow: '6px 6px 0 #2A2A2A'
                  }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
                    <FirstLetterIcon
                      text={item.name}
                      imageUrl={item.image}
                      alt={item.name}
                      size="xl"
                      className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {item.type === 'buy_only' ? (
                        <span className="px-2 py-1 rounded-sm bg-[#4CAF50] text-white text-xs font-bold border-2 border-[#388E3C]">
                          仅收购
                        </span>
                      ) : item.type === 'sell_only' ? (
                        <span className="px-2 py-1 rounded-sm bg-[#2196F3] text-white text-xs font-bold border-2 border-[#1976D2]">
                          仅出售
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-sm bg-[#607D8B] text-white text-xs font-bold border-2 border-[#455A64]">
                          双向
                        </span>
                      )}
                      {item.notes && (
                        <span className="px-2 py-1 rounded-sm bg-[#9B59B6] text-white text-xs font-bold border-2 border-[#8E44AD]">
                          <Info className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-black text-lg text-gray-800 mb-2 group-hover:text-[#9B59B6] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-bold">收购标价:</span>
                        <span className="text-[#4CAF50] font-black flex items-center gap-1">
                          <Coins className="w-3 h-3" />
                          {item.buyDisplayPrice}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-bold">收购税后:</span>
                        <span className="text-[#2E7D32] font-black flex items-center gap-1">
                          <Coins className="w-3 h-3" />
                          {item.buyAfterTaxPrice}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-bold">出售价:</span>
                        <span className="text-[#FF9800] font-black flex items-center gap-1">
                          <Coins className="w-3 h-3" />
                          {item.sellPrice}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-3 text-[#9B59B6] hover:bg-[#9B59B6]/10 font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      查看价格趋势
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <Flower2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-500 mb-2">未找到匹配的物品</h3>
                <p className="text-gray-400">请尝试调整搜索条件或筛选选项</p>
              </div>
            )}
          </>
          )}
        </div>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent 
          className="max-w-3xl bg-white border-4 border-[#4A4A4A]"
          style={{ boxShadow: '8px 8px 0 #2A2A2A' }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <OptimizedImage
                src={selectedItem?.image}
                alt={selectedItem?.name}
                className="w-12 h-12 rounded-sm object-cover border-4 border-[#4A4A4A]"
              />
              <span className="font-black">{selectedItem?.name} - 价格趋势</span>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-[#C8E6C9] rounded-sm border-4 border-[#4CAF50]" style={{ boxShadow: '4px 4px 0 #388E3C' }}>
                <div className="text-sm font-bold text-[#388E3C] mb-1">收购标价</div>
                <div className="text-xl font-black text-[#2E7D32]">
                  {selectedItem?.buyDisplayPrice || 0} 金币
                </div>
              </div>
              <div className="p-4 bg-[#BBDEFB] rounded-sm border-4 border-[#2196F3]" style={{ boxShadow: '4px 4px 0 #1976D2' }}>
                <div className="text-sm font-bold text-[#1976D2] mb-1">收购税后</div>
                <div className="text-xl font-black text-[#0D47A1]">
                  {selectedItem?.buyAfterTaxPrice || 0} 金币
                </div>
              </div>
              <div className="p-4 bg-[#FFE0B2] rounded-sm border-4 border-[#FF9800]" style={{ boxShadow: '4px 4px 0 #F57C00' }}>
                <div className="text-sm font-bold text-[#F57C00] mb-1">出售价</div>
                <div className="text-xl font-black text-[#E65100]">
                  {selectedItem?.sellPrice || 0} 金币
                </div>
              </div>
            </div>
            <div className="h-64 bg-white rounded-sm border-4 border-[#4A4A4A] p-4" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedItem?.priceTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '4px solid #4A4A4A',
                      borderRadius: '0',
                      boxShadow: '4px 4px 0 #2A2A2A'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="buyPrice"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    name="收购价格"
                    dot={{ fill: '#8b5cf6', r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sellPrice"
                    stroke="#ff6f2c"
                    strokeWidth={3}
                    name="出售价格"
                    dot={{ fill: '#ff6f2c', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600 font-medium">{selectedItem?.description}</p>
              {selectedItem?.notes && (
                <div className="p-3 bg-[#F3E5F5] rounded-sm border-4 border-[#9B59B6]" style={{ boxShadow: '4px 4px 0 #8E44AD' }}>
                  <div className="flex items-center gap-2 text-[#8E44AD] mb-1">
                    <Info className="w-4 h-4" />
                    <span className="font-bold text-sm">备注</span>
                  </div>
                  <p className="text-sm text-[#7B1FA2]">{selectedItem.notes}</p>
                </div>
              )}
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
