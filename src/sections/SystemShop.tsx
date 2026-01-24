import { useState, useMemo } from 'react';
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
import { Search, TrendingUp, ShoppingCart, Coins, ArrowUpDown } from 'lucide-react';
import type { SystemShopItem, ShopItemType, PriceSort } from '@/types';
import { systemShopItems } from '@/data/mockData';

export function SystemShop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<ShopItemType>('all');
  const [sortBy, setSortBy] = useState<PriceSort>('none');
  const [selectedItem, setSelectedItem] = useState<SystemShopItem | null>(null);

  const filteredItems = useMemo(() => {
    let items = [...systemShopItems];

    // Search filter
    if (searchTerm) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
      items.sort((a, b) => a.buyPrice - b.buyPrice);
    } else if (sortBy === 'desc') {
      items.sort((a, b) => b.buyPrice - a.buyPrice);
    }

    return items;
  }, [searchTerm, typeFilter, sortBy]);

  return (
    <section id="shop" className="py-20 bg-[#f8f9fa]">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <ShoppingCart className="w-4 h-4" />
            系统商店
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            官方物品交易中心
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            在这里你可以购买和出售各种游戏物品，所有价格由系统统一管理，公平透明
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="搜索物品名称或描述..."
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
          {filteredItems.map((item, index) => (
            <Card
              key={item.id}
              className="mc-card group cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2">
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
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-[#0071e3] transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#0071e3] font-semibold">
                    <Coins className="w-4 h-4" />
                    <span>{item.buyPrice}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#0071e3] hover:bg-[#0071e3]/10"
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

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
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
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-600 mb-1">系统收购价</div>
                <div className="text-2xl font-bold text-blue-700">
                  {selectedItem?.sellPrice || 0} 金币
                </div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-sm text-orange-600 mb-1">系统出售价</div>
                <div className="text-2xl font-bold text-orange-700">
                  {selectedItem?.buyPrice || 0} 金币
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
                    stroke="#ff6f2c"
                    strokeWidth={2}
                    name="出售价格"
                    dot={{ fill: '#ff6f2c', r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sellPrice"
                    stroke="#0071e3"
                    strokeWidth={2}
                    name="收购价格"
                    dot={{ fill: '#0071e3', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-4">{selectedItem?.description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
