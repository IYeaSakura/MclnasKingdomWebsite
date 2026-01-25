import type { GuildShopItem } from '@/types';
import { generatePriceTrend, generateId } from './dataUtils';

export const guildShopData: GuildShopItem[] = [
  {
    id: generateId('guild', 1),
    name: '神秘之花',
    image: '/images/item-mystery-flower.jpg',
    description: '1.12.2商会特有的神秘花朵，蕴含着古老的魔法力量',
    buyDisplayPrice: 800,
    buyAfterTaxPrice: 760,
    sellPrice: 600,
    type: 'both',
    priceTrend: generatePriceTrend(800, 600),
    notes: '每月第一周日价格下降5%'
  },
  {
    id: generateId('guild', 2),
    name: '灵魂沙',
    image: '/images/item-soul-sand.jpg',
    description: '蕴含灵魂能量的特殊沙土，用于召唤和仪式',
    buyDisplayPrice: 200,
    buyAfterTaxPrice: 190,
    sellPrice: 150,
    type: 'both',
    priceTrend: generatePriceTrend(200, 150),
    notes: '下界更新后价格波动较大'
  },
  {
    id: generateId('guild', 3),
    name: '凋零玫瑰',
    image: '/images/item-wither-rose.jpg',
    description: '被凋零力量感染的玫瑰，稀有且危险',
    buyDisplayPrice: 1500,
    buyAfterTaxPrice: 1425,
    sellPrice: 0,
    type: 'buy_only',
    priceTrend: generatePriceTrend(1500, 1200),
    notes: '仅限VIP会员购买'
  },
  {
    id: generateId('guild', 4),
    name: '生命水晶',
    image: '/images/item-life-crystal.jpg',
    description: '蕴含生命能量的水晶，能大幅恢复生命值',
    buyDisplayPrice: 600,
    buyAfterTaxPrice: 570,
    sellPrice: 450,
    type: 'both',
    priceTrend: generatePriceTrend(600, 450),
    notes: '活动期间买二送一'
  },
  {
    id: generateId('guild', 5),
    name: '暗影之泪',
    image: '/images/item-shadow-tear.jpg',
    description: '暗影生物掉落的稀有材料，制作暗器的必需品',
    buyDisplayPrice: 400,
    buyAfterTaxPrice: 380,
    sellPrice: 300,
    type: 'both',
    priceTrend: generatePriceTrend(400, 300),
    notes: '新月之夜采集效果最佳'
  },
  {
    id: generateId('guild', 6),
    name: '月光花',
    image: '/images/item-moonlight-flower.jpg',
    description: '只在月光下绽放的神秘花朵，具有治愈能力',
    buyDisplayPrice: 350,
    buyAfterTaxPrice: 332,
    sellPrice: 250,
    type: 'both',
    priceTrend: generatePriceTrend(350, 250),
    notes: '夜晚价格更优惠'
  },
  {
    id: generateId('guild', 7),
    name: '海洋之心',
    image: '/images/item-heart-of-sea.jpg',
    description: '深海中的稀有宝石，蕴含着海洋的力量',
    buyDisplayPrice: 1200,
    buyAfterTaxPrice: 1140,
    sellPrice: 900,
    type: 'both',
    priceTrend: generatePriceTrend(1200, 900),
    notes: '夏季需求量大，价格可能上涨'
  }
];
