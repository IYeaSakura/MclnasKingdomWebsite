// 物品类型
export interface Item {
  id: string;
  name: string;
  image: string;
  description?: string;
}

// 系统商店物品
export interface SystemShopItem extends Item {
  buyPrice: number;
  sellPrice: number;
  type: 'buy_only' | 'sell_only' | 'both';
  priceTrend: PricePoint[];
}

// 兔吱吱商会物品
export interface GuildShopItem extends Item {
  buyDisplayPrice: number;
  buyAfterTaxPrice: number;
  sellPrice: number;
  type: 'buy_only' | 'sell_only' | 'both';
  priceTrend: PricePoint[];
  notes?: string;
}

// 价格趋势数据点
export interface PricePoint {
  date: string;
  buyPrice?: number;
  sellPrice?: number;
}

// 名人堂玩家
export interface Player extends Item {
  faction: 'anti-law' | 'pro-law' | 'neutral' | 'other';
  shortComment: string;
  detailedExperience: string;
}

// 王国
export interface Kingdom extends Item {
  faction: 'anti-law' | 'pro-law' | 'neutral' | 'other';
  level: 'private' | 'free-city' | 'weak' | 'small' | 'large' | 'strong' | 'kingdom' | 'holy';
  region: 'yangzhou' | 'jiangzhou' | 'qingzhou' | 'yizhou';
  shortComment: string;
  detailedInfo: string;
  image: string;
}

// 日报
export interface DailyNews {
  id: string;
  name: string; // 用于兼容Item接口
  date: string;
  title: string;
  content: string; // Markdown格式
  image: string;
}

// 阵营类型
export type FactionType = 'all' | 'anti-law' | 'pro-law' | 'neutral' | 'other';

// 王国等级
export type KingdomLevel = 'all' | 'private' | 'free-city' | 'weak' | 'small' | 'large' | 'strong' | 'kingdom' | 'holy';

// 地区
export type RegionType = 'all' | 'yangzhou' | 'jiangzhou' | 'qingzhou' | 'yizhou';

// 商店物品类型筛选
export type ShopItemType = 'all' | 'buy' | 'sell';

// 价格排序
export type PriceSort = 'none' | 'asc' | 'desc';

// 日期筛选
export type DateFilter = 'all' | 'week' | 'month' | 'quarter' | 'half-year' | 'year';
