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
import { Search, TrendingUp, ShoppingCart, Coins, ArrowUpDown, Sparkles } from 'lucide-react';
import type { SystemShopItem, ShopItemType, PriceSort } from '@/types';
import { loadSystemShopData } from '@/data';
import { OptimizedImage } from '@/components/OptimizedImage';
import { createCachedDataLoader } from '@/utils/dataCache';
import { getOptimalImageQuality } from '@/utils/networkOptimization';
import { imageLoader } from '@/utils/imageLoader';
import { usePagination } from '@/hooks/usePagination';
import { Pagination } from '@/components/Pagination';
import { FirstLetterIcon } from '@/components/FirstLetterIcon';
import { SkeletonCard } from '@/components/SkeletonCard';

const cachedLoadSystemShopData = createCachedDataLoader('system-shop', loadSystemShopData);

export function SystemShop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<ShopItemType>('all');
  const [sortBy, setSortBy] = useState<PriceSort>('none');
  const [selectedItem, setSelectedItem] = useState<SystemShopItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [systemShopData, setSystemShopData] = useState<SystemShopItem[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageQuality = getOptimalImageQuality();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await cachedLoadSystemShopData();
        setSystemShopData(data);
        imageLoader.preloadImages(data.map(item => item.image), imageQuality, 'low');
      } catch (error) {
        console.error('Failed to load system shop data:', error);
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
    let items = [...systemShopData];

    if (searchTerm) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter === 'buy') {
      items = items.filter((item) => item.type === 'both' || item.type === 'buy_only');
    } else if (typeFilter === 'sell') {
      items = items.filter((item) => item.type === 'both' || item.type === 'sell_only');
    }

    if (sortBy === 'asc') {
      items.sort((a, b) => a.buyPrice - b.buyPrice);
    } else if (sortBy === 'desc') {
      items.sort((a, b) => b.buyPrice - a.buyPrice);
    }

    return items;
  }, [searchTerm, typeFilter, sortBy, systemShopData]);

  const {
    currentPage,
    totalPages,
    paginatedData: displayItems,
    goToPage,
  } = usePagination(filteredItems, { pageSize: 12 });

  return (
    <section 
      ref={sectionRef}
      id="shop" 
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
            <span className="text-sm font-bold text-white tracking-wider">系统商店</span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-black text-gray-900 mb-4 transition-all duration-700 delay-100 tracking-wider ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '4px 4px 0 #0056b3' }}
          >
            官方物品交易中心
          </h2>
          <p
            className={`text-base md:text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 font-medium ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            在这里你可以购买和出售各种游戏物品，所有价格由系统统一管理，公平透明
          </p>
        </div>

        <div className={`flex flex-col md:flex-row gap-4 mb-8 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="搜索物品名称或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#0071e3] transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
            />
          </div>
          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as ShopItemType)}>
            <SelectTrigger 
              className="w-[180px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#0071e3] transition-all duration-300"
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
              className="w-[180px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#0071e3] transition-all duration-300"
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

        {isLoading ? (
          <SkeletonCard count={12} />
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {displayItems.map((item, index) => (
              <Card
                key={item.id}
                className="mc-card group cursor-pointer overflow-hidden transition-all duration-500 bg-white border-4 border-[#4A4A4A] hover:border-[#0071e3] hover:-translate-y-2"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  boxShadow: '6px 6px 0 #2A2A2A'
                }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <FirstLetterIcon
                    text={item.name}
                    imageUrl={item.image}
                    alt={item.name}
                    size="xl"
                    className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
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
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-black text-lg text-gray-800 mb-2 group-hover:text-[#0071e3] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#0071e3] font-black">
                      <Coins className="w-4 h-4" />
                      <span>{item.buyPrice}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#0071e3] hover:bg-[#0071e3]/10 font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                    >
                      <TrendingUp className="w-4 h-4 mr-1" />
                      查看趋势
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-500 mb-2">未找到匹配的物品</h3>
            <p className="text-gray-400">请尝试调整搜索条件或筛选选项</p>
          </div>
        )}
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
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#E3F2FD] rounded-sm border-4 border-[#2196F3]" style={{ boxShadow: '4px 4px 0 #1976D2' }}>
                <div className="text-sm font-bold text-[#1976D2] mb-1">系统收购价</div>
                <div className="text-2xl font-black text-[#0D47A1]">
                  {selectedItem?.sellPrice || 0} 金币
                </div>
              </div>
              <div className="p-4 bg-[#FFF3E0] rounded-sm border-4 border-[#FF9800]" style={{ boxShadow: '4px 4px 0 #F57C00' }}>
                <div className="text-sm font-bold text-[#F57C00] mb-1">系统出售价</div>
                <div className="text-2xl font-black text-[#E65100]">
                  {selectedItem?.buyPrice || 0} 金币
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
                    stroke="#ff6f2c"
                    strokeWidth={3}
                    name="出售价格"
                    dot={{ fill: '#ff6f2c', r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sellPrice"
                    stroke="#0071e3"
                    strokeWidth={3}
                    name="收购价格"
                    dot={{ fill: '#0071e3', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-4 font-medium">{selectedItem?.description}</p>
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
