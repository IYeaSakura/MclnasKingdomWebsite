import type { SystemShopItem } from '@/types';
import { generatePriceTrend, generateId } from './dataUtils';

export const systemShopData: SystemShopItem[] = [
  {
    id: generateId('sys', 1),
    name: '钻石剑',
    image: '/images/item-diamond-sword.jpg',
    description: '由珍贵钻石打造的强力武器，是战士们的首选装备',
    buyPrice: 500,
    sellPrice: 350,
    type: 'both',
    priceTrend: generatePriceTrend(500, 350)
  },
  {
    id: generateId('sys', 2),
    name: '金苹果',
    image: '/images/item-golden-apple.jpg',
    description: '蕴含魔法的金色苹果，食用后能获得强大的恢复效果',
    buyPrice: 800,
    sellPrice: 600,
    type: 'both',
    priceTrend: generatePriceTrend(800, 600)
  },
  {
    id: generateId('sys', 3),
    name: '附魔弓',
    image: '/images/item-enchanted-bow.jpg',
    description: '经过魔法附魔的弓箭，射程和威力大幅提升',
    buyPrice: 1200,
    sellPrice: 900,
    type: 'both',
    priceTrend: generatePriceTrend(1200, 900)
  },
  {
    id: generateId('sys', 4),
    name: '治疗药水',
    image: '/images/item-healing-potion.jpg',
    description: '瞬间恢复生命值的魔法药水，冒险必备',
    buyPrice: 150,
    sellPrice: 100,
    type: 'both',
    priceTrend: generatePriceTrend(150, 100)
  },
  {
    id: generateId('sys', 5),
    name: '末影珍珠',
    image: '/images/item-ender-pearl.jpg',
    description: '蕴含传送魔法的神秘珍珠，使用后可以瞬移',
    buyPrice: 300,
    sellPrice: 200,
    type: 'both',
    priceTrend: generatePriceTrend(300, 200)
  },
  {
    id: generateId('sys', 6),
    name: '铁锭',
    image: '/images/item-iron-ingot.jpg',
    description: '基础金属材料，制作各种工具和装备的基础材料',
    buyPrice: 50,
    sellPrice: 35,
    type: 'both',
    priceTrend: generatePriceTrend(50, 35)
  },
  {
    id: generateId('sys', 7),
    name: '附魔金苹果',
    image: '/images/item-enchanted-golden-apple.jpg',
    description: '传说中的魔法苹果，食用后获得多种强力效果',
    buyPrice: 2000,
    sellPrice: 1500,
    type: 'both',
    priceTrend: generatePriceTrend(2000, 1500)
  },
  {
    id: generateId('sys', 8),
    name: '龙蛋',
    image: '/images/item-dragon-egg.jpg',
    description: '传说生物的蛋，极其稀有，是收藏家们的梦想',
    buyPrice: 10000,
    sellPrice: 0,
    type: 'buy_only',
    priceTrend: generatePriceTrend(10000, 8000)
  },
  {
    id: generateId('sys', 9),
    name: '下界合金锭',
    image: '/images/item-netherite-ingot.jpg',
    description: '来自下界的顶级材料，用于制作最强装备',
    buyPrice: 2000,
    sellPrice: 1500,
    type: 'both',
    priceTrend: generatePriceTrend(2000, 1500)
  },
  {
    id: generateId('sys', 10),
    name: '烈焰棒',
    image: '/images/item-blaze-rod.jpg',
    description: '下界烈焰人掉落的魔法材料，炼药必备',
    buyPrice: 120,
    sellPrice: 80,
    type: 'both',
    priceTrend: generatePriceTrend(120, 80)
  },
  {
    id: generateId('sys', 11),
    name: '绿宝石',
    image: '/images/item-emerald.jpg',
    description: '村民交易的通用货币，也可用于制作装备',
    buyPrice: 100,
    sellPrice: 70,
    type: 'both',
    priceTrend: generatePriceTrend(100, 70)
  },
  {
    id: generateId('sys', 12),
    name: '经验瓶',
    image: '/images/item-exp-bottle.jpg',
    description: '储存经验值的魔法瓶子，使用后获得经验',
    buyPrice: 80,
    sellPrice: 50,
    type: 'both',
    priceTrend: generatePriceTrend(80, 50)
  }
];
