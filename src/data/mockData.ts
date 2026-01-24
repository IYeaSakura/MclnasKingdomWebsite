import type { 
  SystemShopItem, 
  GuildShopItem, 
  Player, 
  Kingdom, 
  DailyNews,
  PricePoint 
} from '@/types';

// 生成价格趋势数据
const generatePriceTrend = (baseBuy: number, baseSell: number): PricePoint[] => {
  const points: PricePoint[] = [];
  const dates = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];
  
  dates.forEach((date, index) => {
    const variance = Math.sin(index * 0.5) * 0.2 + Math.random() * 0.1 - 0.05;
    points.push({
      date,
      buyPrice: Math.round(baseBuy * (1 + variance)),
      sellPrice: Math.round(baseSell * (1 + variance * 0.8))
    });
  });
  
  return points;
};

// 系统商店物品数据
export const systemShopItems: SystemShopItem[] = [
  {
    id: 'sys-001',
    name: '钻石剑',
    image: '/images/item-diamond-sword.jpg',
    description: '由珍贵钻石打造的强力武器，是战士们的首选装备',
    buyPrice: 500,
    sellPrice: 350,
    type: 'both',
    priceTrend: generatePriceTrend(500, 350)
  },
  {
    id: 'sys-002',
    name: '金苹果',
    image: '/images/item-golden-apple.jpg',
    description: '蕴含魔法的金色苹果，食用后能获得强大的恢复效果',
    buyPrice: 800,
    sellPrice: 600,
    type: 'both',
    priceTrend: generatePriceTrend(800, 600)
  },
  {
    id: 'sys-003',
    name: '附魔弓',
    image: '/images/item-enchanted-bow.jpg',
    description: '经过魔法附魔的弓箭，射程和威力大幅提升',
    buyPrice: 1200,
    sellPrice: 900,
    type: 'both',
    priceTrend: generatePriceTrend(1200, 900)
  },
  {
    id: 'sys-004',
    name: '治疗药水',
    image: '/images/item-healing-potion.jpg',
    description: '瞬间恢复生命值的魔法药水，冒险必备',
    buyPrice: 150,
    sellPrice: 100,
    type: 'both',
    priceTrend: generatePriceTrend(150, 100)
  },
  {
    id: 'sys-005',
    name: '末影珍珠',
    image: '/images/item-ender-pearl.jpg',
    description: '蕴含传送魔法的神秘珍珠，使用后可以瞬移',
    buyPrice: 300,
    sellPrice: 200,
    type: 'both',
    priceTrend: generatePriceTrend(300, 200)
  },
  {
    id: 'sys-006',
    name: '铁锭',
    image: '/images/item-iron-ingot.jpg',
    description: '基础金属材料，制作各种工具和装备的基础材料',
    buyPrice: 50,
    sellPrice: 35,
    type: 'both',
    priceTrend: generatePriceTrend(50, 35)
  },
  {
    id: 'sys-007',
    name: '附魔金苹果',
    image: '/images/item-enchanted-golden-apple.jpg',
    description: '传说中的魔法苹果，食用后获得多种强力效果',
    buyPrice: 2000,
    sellPrice: 1500,
    type: 'both',
    priceTrend: generatePriceTrend(2000, 1500)
  },
  {
    id: 'sys-008',
    name: '龙蛋',
    image: '/images/item-dragon-egg.jpg',
    description: '传说生物的蛋，极其稀有，是收藏家们的梦想',
    buyPrice: 10000,
    sellPrice: 0,
    type: 'buy_only',
    priceTrend: generatePriceTrend(10000, 8000)
  },
  {
    id: 'sys-009',
    name: '下界合金锭',
    image: '/images/item-netherite-ingot.jpg',
    description: '来自下界的顶级材料，用于制作最强装备',
    buyPrice: 2000,
    sellPrice: 1500,
    type: 'both',
    priceTrend: generatePriceTrend(2000, 1500)
  },
  {
    id: 'sys-010',
    name: '烈焰棒',
    image: '/images/item-blaze-rod.jpg',
    description: '下界烈焰人掉落的魔法材料，炼药必备',
    buyPrice: 120,
    sellPrice: 80,
    type: 'both',
    priceTrend: generatePriceTrend(120, 80)
  },
  {
    id: 'sys-011',
    name: '绿宝石',
    image: '/images/item-emerald.jpg',
    description: '村民交易的通用货币，也可用于制作装备',
    buyPrice: 100,
    sellPrice: 70,
    type: 'both',
    priceTrend: generatePriceTrend(100, 70)
  },
  {
    id: 'sys-012',
    name: '经验瓶',
    image: '/images/item-exp-bottle.jpg',
    description: '储存经验值的魔法瓶子，使用后获得经验',
    buyPrice: 80,
    sellPrice: 50,
    type: 'both',
    priceTrend: generatePriceTrend(80, 50)
  }
];

// 花葬商会物品数据
export const guildShopItems: GuildShopItem[] = [
  {
    id: 'guild-001',
    name: '神秘之花',
    image: '/images/item-mystery-flower.jpg',
    description: '花葬商会特有的神秘花朵，蕴含着古老的魔法力量',
    buyDisplayPrice: 800,
    buyAfterTaxPrice: 760,
    sellPrice: 600,
    type: 'both',
    priceTrend: generatePriceTrend(800, 600),
    notes: '每月第一周日价格下降5%'
  },
  {
    id: 'guild-002',
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
    id: 'guild-003',
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
    id: 'guild-004',
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
    id: 'guild-005',
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
    id: 'guild-006',
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
    id: 'guild-007',
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

// 名人堂玩家数据
export const hallOfFamePlayers: Player[] = [
  {
    id: 'player-001',
    name: '龙傲天',
    image: '/images/player-diamond-warrior.jpg',
    shortComment: '传奇战士，曾单枪匹马击败凋零风暴',
    faction: 'pro-law',
    detailedExperience: '龙傲天是王国之争中最负盛名的战士之一。他在第三次末地战争中表现出色，单枪匹马击败了来袭的凋零风暴，拯救了整个扬州大陆。他创立的"龙魂军团"至今仍是服务器最强大的战斗力量。他的装备"龙鳞甲"和"天启剑"都是服务器顶级的传奇装备。'
  },
  {
    id: 'player-002',
    name: '法神小明',
    image: '/images/player-gold-mage.jpg',
    shortComment: '最伟大的建筑师，建造了天空之城',
    faction: 'neutral',
    detailedExperience: '法神小明以其惊人的建筑才华闻名于世。他用三年时间建造了著名的"天空之城"，这座浮空城市至今仍是服务器最壮观的建筑之一。除了建筑，他还是一位强大的法师，精通各种魔法，尤其擅长传送门技术。他的建筑作品遍布四大洲，影响了整个服务器的建筑风格。'
  },
  {
    id: 'player-003',
    name: '箭神无双',
    image: '/images/player-iron-archer.jpg',
    shortComment: '百步穿杨的神射手，箭无虚发',
    faction: 'anti-law',
    detailedExperience: '箭神无双是服务器最著名的弓箭手，传说他可以在百米外射中一只末影螨。在多次领地争夺战中，他的精准射击为反法联盟立下了汗马功劳。他创立的"鹰眼猎手团"是服务器最精英的远程部队，专门执行高难度狙击任务。他的专属弓"落月"是服务器最强的远程武器。'
  },
  {
    id: 'player-004',
    name: '暗影行者',
    image: '/images/player-leather-ranger.jpg',
    shortComment: '来无影去无踪的刺客大师',
    faction: 'other',
    detailedExperience: '暗影行者是服务器最神秘的玩家之一，没人知道他的真实身份。他擅长潜行和暗杀，多次在关键时刻改变战局。他建立的"影刃组织"是服务器最神秘的势力，成员遍布各大王国。据说他曾经潜入敌国皇宫，在重重守卫中取敌将首级全身而退。'
  },
  {
    id: 'player-005',
    name: '北境之王',
    image: '/images/player-netherite-knight.jpg',
    shortComment: '统治北方冰原的霸主，冰雪的主宰',
    faction: 'pro-law',
    detailedExperience: '北境之王是青州大陆北部的统治者，他建立了强大的"冰雪王国"。在他的统治下，原本荒芜的北境变成了繁荣的贸易中心。他身穿下界合金打造的"极寒战甲"，手持"霜之哀伤"，是服务器最强大的统治者之一。他的王国以严明的法度和强大的军事实力著称。'
  },
  {
    id: 'player-006',
    name: '财神到',
    image: '/images/player-chain-merchant.jpg',
    shortComment: '商业帝国的缔造者，掌控着服务器的经济命脉',
    faction: 'neutral',
    detailedExperience: '财神到是服务器最富有的玩家，他建立的商业帝国"万通商行"在四大洲都有分部。他精通经济学，通过贸易积累了巨额财富。他资助了许多新手玩家的发展，也投资了多个大型建筑项目。他的商业头脑和慷慨的性格使他成为服务器最受尊敬的人物之一。'
  }
];

// 王国数据
export const kingdoms: Kingdom[] = [
  {
    id: 'kingdom-001',
    name: '龙渊帝国',
    image: '/images/kingdom-main-castle.jpg',
    shortComment: '扬州大陆最强大的帝国，以龙为图腾',
    faction: 'pro-law',
    level: 'holy',
    region: 'yangzhou',
    detailedInfo: '龙渊帝国是扬州大陆最古老、最强大的国家，已有三年历史。帝国以龙为图腾，皇室自称龙的后裔。首都"龙城"是服务器最繁华的城市之一，拥有完善的基础设施和强大的防御系统。帝国实行君主立宪制，既有皇帝的绝对权威，又有议会的民主决策。帝国军队"龙卫军"是服务器最精锐的部队之一。'
  },
  {
    id: 'kingdom-002',
    name: '星辰联邦',
    image: '/images/kingdom-port-city.jpg',
    shortComment: '江州大陆的贸易中心，商业繁荣',
    faction: 'neutral',
    level: 'kingdom',
    region: 'jiangzhou',
    detailedInfo: '星辰联邦位于江州大陆东海岸，是服务器最大的贸易中心。联邦由七个自由市组成，实行议会制。首都"星港"是服务器最大的港口城市，每天都有大量的贸易船只进出。联邦以其开放包容的政策吸引了大量商人和冒险者，经济十分繁荣。联邦海军"星海舰队"守护着海上贸易路线的安全。'
  },
  {
    id: 'kingdom-003',
    name: '翠绿王国',
    image: '/images/kingdom-forest-village.jpg',
    shortComment: '青州大陆的森林之国，与自然和谐共处',
    faction: 'neutral',
    level: 'strong',
    region: 'qingzhou',
    detailedInfo: '翠绿王国位于青州大陆中部的广阔森林中，是一个与自然和谐共处的国家。王国由精灵族建立，建筑风格融合了自然元素，被誉为"森林中的艺术品"。王国拥有强大的德鲁伊和游侠部队，擅长丛林作战。首都"翠谷"建在巨大的世界树上，是服务器最独特的城市之一。'
  },
  {
    id: 'kingdom-004',
    name: '冰雪帝国',
    image: '/images/kingdom-snow-fortress.jpg',
    shortComment: '北境的冰雪王国，严酷环境下的强大国家',
    faction: 'pro-law',
    level: 'kingdom',
    region: 'qingzhou',
    detailedInfo: '冰雪帝国统治着青州大陆北部的寒冷地区，是服务器最北方的国家。帝国人民在严酷的环境中磨练出了坚韧的性格和强大的战斗力。首都"冰冠城"建在冰川之上，是一座坚不可摧的要塞。帝国军队"霜卫军团"以严明的纪律和强大的战斗力闻名，是服务器最强的陆军之一。'
  },
  {
    id: 'kingdom-005',
    name: '沙漠绿洲',
    image: '/images/kingdom-desert-city.jpg',
    shortComment: '益州大陆的沙漠明珠，丝绸之路的枢纽',
    faction: 'anti-law',
    level: 'large',
    region: 'yizhou',
    detailedInfo: '沙漠绿洲位于益州大陆中部的广袤沙漠中，是连接东西方的交通要道。这座城市建立在绿洲之上，是沙漠中唯一的水源地和补给站。城市由反法联盟控制，是联盟在西部的重要据点。城市拥有独特的沙漠建筑风格，精美的马赛克和拱门装饰着每一座建筑。沙漠骑兵"沙暴军团"是联盟最精锐的机动部队。'
  },
  {
    id: 'kingdom-006',
    name: '天空之城',
    image: '/images/kingdom-floating-island.jpg',
    shortComment: '漂浮在云端的奇迹之城，魔法与科技的结晶',
    faction: 'other',
    level: 'holy',
    region: 'yangzhou',
    detailedInfo: '天空之城是服务器最神奇的城市，由法神小明用三年时间建造完成。这座城市漂浮在云端，通过传送门与地面连接。城市融合了魔法和科技，拥有自动化的农场和工厂。城市由"云端议会"管理，实行独特的民主制度。天空之城是服务器的中立区，任何阵营都可以在这里和平交流和贸易。'
  }
];

// 日报数据
export const dailyNews: DailyNews[] = [
  {
    id: 'news-001',
    name: '龙渊帝国三周年庆典',
    date: '2024-12-20',
    title: '龙渊帝国成功举办三周年庆典',
    image: '/images/daily-celebration.jpg',
    content: `# 龙渊帝国三周年庆典盛大举行

**扬州大陆讯** —— 昨日，龙渊帝国在首都龙城举办了盛大的三周年庆典活动。来自全服各地的玩家齐聚龙城，共同庆祝这一重要时刻。

庆典活动包括盛大的烟火表演、玩家作品展览、PvP竞技大赛等多个环节。其中，烟火表演持续了一个小时，各种精美的烟火在夜空中绽放，引来玩家们的阵阵惊叹。

龙渊帝国皇帝"龙傲天"在庆典上发表了重要讲话，他回顾了帝国三年来的发展历程，感谢了所有支持帝国建设的玩家，并表示将继续努力，把龙渊帝国建设得更加繁荣强大。

**庆典活动将持续三天，欢迎所有玩家参与！**

---

*记者：星辰日报编辑部*
*发布时间：2024年12月20日*`
  },
  {
    id: 'news-002',
    name: '反法联盟突袭',
    date: '2024-12-18',
    title: '反法联盟突袭成功，夺取重要据点',
    image: '/images/daily-battle.jpg',
    content: `# 反法联盟发动突袭，成功夺取边境要塞

**边境战区讯** —— 今日凌晨，反法联盟对护法阵营的边境要塞发动了突然袭击。经过三个小时的激烈战斗，反法联盟成功攻克要塞，取得了近期最大规模的军事胜利。

据前线记者报道，此次行动由反法联盟精锐部队"影刃"和"沙暴军团"联合执行。他们利用夜色掩护，从三个方向同时进攻，打了守军一个措手不及。

护法阵营发言人表示，虽然失去了这个据点，但主力部队已经安全撤离，将在适当时候发动反击。他呼吁所有护法阵营玩家团结起来，共同抵御反法联盟的进攻。

**战争分析专家预测，此次胜利将改变双方的战略态势，未来几周的战况值得关注。**

---

*记者：战争前线记者站*
*发布时间：2024年12月18日*`
  },
  {
    id: 'news-003',
    name: '远古遗迹发现',
    date: '2024-12-15',
    title: '探险队发现神秘远古遗迹',
    image: '/images/daily-exploration.jpg',
    content: `# 重大发现！探险队发现远古遗迹

**未知区域讯** —— 一支由六名玩家组成的探险队昨日在服务器西部边境发现了一座神秘的远古遗迹。据初步探索，这座遗迹可能属于服务器早期的某个未知文明。

探险队队长"探险家小李"介绍，他们在追踪一只稀有生物时偶然发现了这座被藤蔓覆盖的石制建筑群。遗迹中心有一座巨大的金字塔形建筑，入口处刻有神秘的符文。

考古专家"历史学者"表示，这可能是服务器历史上最重要的发现之一。从建筑风格来看，这座遗迹至少有两年以上的历史，可能属于某个早期消失的文明。

**目前该区域已被划为保护区，禁止随意进入。专业考古团队将尽快前往进行深入调查。**

---

*记者：探索频道记者*
*发布时间：2024年12月15日*`
  },
  {
    id: 'news-004',
    name: '花葬商会特惠',
    date: '2024-12-10',
    title: '花葬商会推出新年特惠活动',
    image: '/images/daily-market.jpg',
    content: `# 花葬商会新年特惠活动开始啦！

**商业中心讯** —— 为庆祝新年即将到来，花葬商会今日宣布推出为期一周的新年特惠活动。活动期间，多种热门商品将享受折扣优惠。

据商会负责人介绍，此次活动涵盖了神秘之花、生命水晶、月光花等多种热门商品，折扣力度从10%到30%不等。此外，还有限量版的"新年礼盒"出售，内含多种稀有物品。

商会还特别推出了"新年抽奖"活动，消费满一定金额的玩家可以参与抽奖，奖品包括稀有装备、大量游戏币等。

**活动时间：2024年12月10日 - 2024年12月17日**
**活动地点：各大主城花葬商会分店**

---

*记者：商业快报记者*
*发布时间：2024年12月10日*`
  },
  {
    id: 'news-005',
    name: '天空之城新区域',
    date: '2024-12-05',
    title: '天空之城开放新区域',
    image: '/images/kingdom-floating-island.jpg',
    content: `# 天空之城开放全新区域

**天空之城讯** —— 著名建筑师"法神小明"今日宣布，天空之城已完成扩建工程，新区域"云端花园"正式对公众开放。

新区域位于天空之城的东部，是一座巨大的空中花园。花园中种植了各种稀有植物，包括从各地收集来的神秘之花、月光花等魔法植物。花园中央还有一座壮观的音乐喷泉，每小时会举行一次音乐喷泉表演。

法神小明表示，这个花园是他历时半年精心设计和建造的，希望能为服务器玩家提供一个美丽的休闲场所。花园中还设有咖啡馆、观景台等设施。

**云端花园每日开放时间为早上8点至晚上10点，门票免费，欢迎所有玩家参观！**

---

*记者：建筑艺术周刊*
*发布时间：2024年12月5日*`
  },
  {
    id: 'news-006',
    name: '价格调整通知',
    date: '2024-11-28',
    title: '系统商店价格调整通知',
    image: '/images/item-diamond-sword.jpg',
    content: `# 系统商店价格调整公告

**系统公告** —— 根据市场情况和玩家反馈，系统商店将于明日凌晨3点对部分商品价格进行调整。

此次调整涉及以下商品：

**价格上调：**
- 钻石剑：500 → 550
- 附魔弓：1200 → 1350
- 下界合金锭：2000 → 2200

**价格下调：**
- 治疗药水：150 → 120
- 经验瓶：80 → 60
- 铁锭：50 → 40

**其他商品维持现价**

系统商店负责人表示，此次调整是为了平衡游戏经济，确保各类物品的合理定价。玩家可以在调整前进行采购，享受当前价格。

**具体调整时间和详情，请查看游戏内公告。**

---

*记者：系统公告栏*
*发布时间：2024年11月28日*`
  }
];
