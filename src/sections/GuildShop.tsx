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
import { Search, TrendingUp, Flower2, Coins, Info, ArrowUpDown } from 'lucide-react';
import type { GuildShopItem, ShopItemType, PriceSort } from '@/types';
import { guildShopData } from '@/data';
import { preloadImages } from '@/utils/imageCache';
import { usePagination } from '@/hooks/usePagination';
import { Pagination } from '@/components/Pagination';
import { FirstLetterIcon } from '@/components/FirstLetterIcon';

export function GuildShop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<ShopItemType>('all');
  const [sortBy, setSortBy] = useState<PriceSort>('none');
  const [selectedItem, setSelectedItem] = useState<GuildShopItem | null>(null);

  useEffect(() => {
    preloadImages(guildShopData.map(item => item.image));
  }, []);

  const filteredItems = useMemo(() => {
    let items = [...guildShopData];

    // Search filter
    if (searchTerm) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter === 'buy') {
      items = items.filter((item) => item.type === 'both' || item.type === 'buy_only');
    } else if (typeFilter === 'sell') {
      items = items.filter((item) => item.type === 'both' || item.type === 'sell_only');
    }

    // Sort
    if (sortBy === 'asc') {
      items.sort((a, b) => a.buyDisplayPrice - b.buyDisplayPrice);
    } else if (sortBy === 'desc') {
      items.sort((a, b) => b.buyDisplayPrice - a.buyDisplayPrice);
    }

    return items;
  }, [searchTerm, typeFilter, sortBy]);

  const {
    currentPage,
    totalPages,
    paginatedData: displayItems,
    goToPage,
  } = usePagination(filteredItems, { pageSize: 12 });

  return (
    <section id="guild" className="py-20 bg-gradient-to-b from-[#f8f9fa] to-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Flower2 className="w-4 h-4" />
            1.12.2商会
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            稀有物品交易中心
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            来自遥远土地的稀有物品，由1.12.2商会独家供应。每一件物品都蕴含独特的故事和力量
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="搜索物品名称、描述或备注..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as ShopItemType)}>
            <SelectTrigger className="w-[180px] h-12">
              <SelectValue placeholder="筛选类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部物品</SelectItem>
              <SelectItem value="buy">可购买</SelectItem>
              <SelectItem value="sell">可出售</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as PriceSort)}>
            <SelectTrigger className="w-[180px] h-12">
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

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayItems.map((item, index) => (
            <Card
              key={item.id}
              className="mc-card group cursor-pointer overflow-hidden border-purple-200 hover:border-purple-400"
              style={{ animationDelay: `${index * 50}ms` }}
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
                    <span className="px-2 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                      仅收购
                    </span>
                  ) : item.type === 'sell_only' ? (
                    <span className="px-2 py-1 rounded-full bg-blue-500 text-white text-xs font-medium">
                      仅出售
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-gray-500 text-white text-xs font-medium">
                      双向
                    </span>
                  )}
                  {item.notes && (
                    <span className="px-2 py-1 rounded-full bg-purple-500 text-white text-xs font-medium">
                      <Info className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">收购标价:</span>
                    <span className="text-green-600 font-semibold flex items-center gap-1">
                      <Coins className="w-3 h-3" />
                      {item.buyDisplayPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">收购税后:</span>
                    <span className="text-green-700 font-bold flex items-center gap-1">
                      <Coins className="w-3 h-3" />
                      {item.buyAfterTaxPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">出售价:</span>
                    <span className="text-orange-600 font-semibold flex items-center gap-1">
                      <Coins className="w-3 h-3" />
                      {item.sellPrice}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-3 text-purple-600 hover:bg-purple-100"
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

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <Flower2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">未找到匹配的物品</h3>
            <p className="text-gray-400">请尝试调整搜索条件或筛选选项</p>
          </div>
        )}
      </div>

      {/* Price Trend Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <img
                src={selectedItem?.image}
                alt={selectedItem?.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <span>{selectedItem?.name} - 价格趋势</span>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-green-600 mb-1">收购标价</div>
                <div className="text-xl font-bold text-green-700">
                  {selectedItem?.buyDisplayPrice || 0} 金币
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">收购税后</div>
                <div className="text-xl font-bold text-blue-700">
                  {selectedItem?.buyAfterTaxPrice || 0} 金币
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-sm text-orange-600 mb-1">出售价</div>
                <div className="text-xl font-bold text-orange-700">
                  {selectedItem?.sellPrice || 0} 金币
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedItem?.priceTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="buyPrice"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="收购价格"
                    dot={{ fill: '#8b5cf6', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sellPrice"
                    stroke="#ff6f2c"
                    strokeWidth={2}
                    name="出售价格"
                    dot={{ fill: '#ff6f2c', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">{selectedItem?.description}</p>
              {selectedItem?.notes && (
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 text-purple-700 mb-1">
                    <Info className="w-4 h-4" />
                    <span className="font-medium text-sm">备注</span>
                  </div>
                  <p className="text-sm text-purple-600">{selectedItem.notes}</p>
                </div>
              )}
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
