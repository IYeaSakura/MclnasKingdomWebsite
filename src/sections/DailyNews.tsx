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
import { Search, Newspaper, Calendar, Clock, ChevronRight, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { DailyNews, DateFilter } from '@/types';
import { dailyNewsData } from '@/data';
import { preloadImages } from '@/utils/imageCache';
import { usePagination } from '@/hooks/usePagination';
import { Pagination } from '@/components/Pagination';
import { FirstLetterIcon } from '@/components/FirstLetterIcon';

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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    preloadImages(dailyNewsData.map(news => news.image));
  }, []);



  const filteredNews = useMemo(() => {
    let items = [...dailyNewsData];

    if (searchTerm) {
      items = items.filter((news) =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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

    items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return items;
  }, [searchTerm, dateFilter]);

  const {
    currentPage,
    totalPages,
    paginatedData: displayNews,
    goToPage,
  } = usePagination(filteredNews, { pageSize: 6 });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section 
      id="daily" 
      className="py-20 relative overflow-hidden"
      style={{ 
        imageRendering: 'pixelated',
        backgroundImage: 'linear-gradient(to bottom, #f8f9fa 0%, #e8e8e8 100%)'
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#8B4513]/10 border-4 border-[#8B4513]/20" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-[#D2691E]/10 border-4 border-[#D2691E]/20" />
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-[#A0522D]/10 border-4 border-[#A0522D]/20" />
        <div className="absolute bottom-20 right-1/4 w-18 h-18 bg-[#CD853F]/10 border-4 border-[#CD853F]/20" />
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
            <span className="text-sm font-bold text-white tracking-wider">日报</span>
          </div>
          <h2
            className={`text-4xl md:text-5xl font-black text-gray-800 mb-4 transition-all duration-700 delay-100 tracking-wider ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ textShadow: '4px 4px 0 #2A2A2A' }}
          >
            王国日报
          </h2>
          <p
            className={`text-base md:text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 font-medium ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            来自王国之争世界的最新新闻和更新，了解服务器内发生的重大事件
          </p>
        </div>

        <div className={`flex flex-col md:flex-row gap-4 mb-8 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="搜索日报标题或内容..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#0071e3] transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
            />
          </div>
          <Select value={dateFilter} onValueChange={(v) => setDateFilter(v as DateFilter)}>
            <SelectTrigger 
              className="w-[180px] h-12 bg-white border-4 border-[#4A4A4A] hover:border-[#6A6A6A] focus:border-[#0071e3] transition-all duration-300"
              style={{ boxShadow: '4px 4px 0 #2A2A2A' }}
            >
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

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {displayNews.map((news, index) => (
            <Card
              key={news.id}
              className={`mc-card group cursor-pointer overflow-hidden transition-all duration-500 bg-white border-4 border-[#4A4A4A] hover:border-[#0071e3] hover:-translate-y-2 ${
                index === 0 ? 'lg:row-span-2' : ''
              }`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                boxShadow: '6px 6px 0 #2A2A2A'
              }}
              onClick={() => setSelectedNews(news)}
            >
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? 'aspect-[16/10]' : 'aspect-video'
                }`}
              >
                <FirstLetterIcon
                  text={news.title}
                  imageUrl={news.image}
                  alt={news.title}
                  size="xl"
                  className="w-full h-full transition-transform duration-500 group-hover:scale-110"
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
                    className={`font-black text-white group-hover:text-[#0071e3] transition-colors ${
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
                  className="w-full mt-3 text-[#0071e3] hover:bg-[#0071e3]/10 font-bold"
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

        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-500 mb-2">未找到匹配的日报</h3>
            <p className="text-gray-400">请尝试调整搜索条件或时间筛选</p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent 
          className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-4 border-[#4A4A4A]"
          style={{ boxShadow: '8px 8px 0 #2A2A2A' }}
        >
          <DialogHeader>
            <DialogTitle>
              <div className="relative w-full h-64 rounded-sm overflow-hidden mb-4 border-4 border-[#4A4A4A]" style={{ boxShadow: '4px 4px 0 #2A2A2A' }}>
                <img
                  src={selectedNews?.image}
                  alt={selectedNews?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-white font-black text-2xl mb-2">{selectedNews?.title}</h2>
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
    </section>
  );
}
