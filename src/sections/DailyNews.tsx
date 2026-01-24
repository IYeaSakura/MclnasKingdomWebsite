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
import { Search, Newspaper, Calendar, Clock, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { DailyNews, DateFilter } from '@/types';
import { dailyNews } from '@/data/mockData';

const dateFilterConfig: Record<DateFilter, string> = {
  all: '全部时间',
  week: '最近一周',
  month: '最近一个月',
  quarter: '最近三个月',
  'half-year': '最近半年',
  year: '最近一年',
};

export function DailyNews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [selectedNews, setSelectedNews] = useState<DailyNews | null>(null);

  const filteredNews = useMemo(() => {
    let items = [...dailyNews];

    // Search filter
    if (searchTerm) {
      items = items.filter((news) =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (dateFilter) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          cutoffDate.setMonth(now.getMonth() - 3);
          break;
        case 'half-year':
          cutoffDate.setMonth(now.getMonth() - 6);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      items = items.filter((news) => new Date(news.date) >= cutoffDate);
    }

    // Sort by date descending
    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return items;
  }, [searchTerm, dateFilter]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="daily" className="py-20 bg-gradient-to-b from-white to-[#f8f9fa]">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
            <Newspaper className="w-4 h-4" />
            日报
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            王国日报
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            来自王国之争世界的最新新闻和更新，了解服务器内发生的重大事件
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="搜索日报标题或内容..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Select value={dateFilter} onValueChange={(v) => setDateFilter(v as DateFilter)}>
            <SelectTrigger className="w-[180px] h-12">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="时间筛选" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(dateFilterConfig).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredNews.map((news, index) => (
            <Card
              key={news.id}
              className={`mc-card group cursor-pointer overflow-hidden ${
                index === 0 ? 'lg:row-span-2' : ''
              }`}
              onClick={() => setSelectedNews(news)}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? 'aspect-[16/10]' : 'aspect-video'
                }`}
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(news.date)}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>发布于 {news.date}</span>
                  </div>
                  <h3
                    className={`font-bold text-white group-hover:text-[#0071e3] transition-colors ${
                      index === 0 ? 'text-2xl' : 'text-lg'
                    }`}
                  >
                    {news.title}
                  </h3>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="prose prose-sm max-w-none text-gray-600 line-clamp-3">
                  <ReactMarkdown>{news.content.substring(0, 150) + '...'}</ReactMarkdown>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-3 text-[#0071e3] hover:bg-[#0071e3]/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNews(news);
                  }}
                >
                  阅读全文
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-500 mb-2">未找到匹配的日报</h3>
            <p className="text-gray-400">请尝试调整搜索条件或时间筛选</p>
          </div>
        )}
      </div>

      {/* News Detail Dialog */}
      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedNews?.image}
                  alt={selectedNews?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-white font-bold text-2xl mb-2">{selectedNews?.title}</h2>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedNews?.date && formatDate(selectedNews.date)}</span>
                  </div>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <ReactMarkdown>{selectedNews?.content || ''}</ReactMarkdown>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
