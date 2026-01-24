import type { Kingdom } from '@/types';
import { generateId } from './dataUtils';

export const kingdomsData: Kingdom[] = [
  {
    id: generateId('kingdom', 1),
    name: '龙渊帝国',
    image: '/images/kingdom-main-castle.jpg',
    shortComment: '扬州大陆最强大的帝国，以龙为图腾',
    faction: 'pro-law',
    level: 'holy',
    region: 'yangzhou',
    detailedInfo: '龙渊帝国是扬州大陆最古老、最强大的国家，已有三年历史。帝国以龙为图腾，皇室自称龙的后裔。首都"龙城"是服务器最繁华的城市之一，拥有完善的基础设施和强大的防御系统。帝国实行君主立宪制，既有皇帝的绝对权威，又有议会的民主决策。帝国军队"龙卫军"是服务器最精锐的部队之一。'
  },
  {
    id: generateId('kingdom', 2),
    name: '星辰联邦',
    image: '/images/kingdom-port-city.jpg',
    shortComment: '江州大陆的贸易中心，商业繁荣',
    faction: 'neutral',
    level: 'kingdom',
    region: 'jiangzhou',
    detailedInfo: '星辰联邦位于江州大陆东海岸，是服务器最大的贸易中心。联邦由七个自由市组成，实行议会制。首都"星港"是服务器最大的港口城市，每天都有大量的贸易船只进出。联邦以其开放包容的政策吸引了大量商人和冒险者，经济十分繁荣。联邦海军"星海舰队"守护着海上贸易路线的安全。'
  },
  {
    id: generateId('kingdom', 3),
    name: '翠绿王国',
    image: '/images/kingdom-forest-village.jpg',
    shortComment: '青州大陆的森林之国，与自然和谐共处',
    faction: 'neutral',
    level: 'strong',
    region: 'qingzhou',
    detailedInfo: '翠绿王国位于青州大陆中部的广阔森林中，是一个与自然和谐共处的国家。王国由精灵族建立，建筑风格融合了自然元素，被誉为"森林中的艺术品"。王国拥有强大的德鲁伊和游侠部队，擅长丛林作战。首都"翠谷"建在巨大的世界树上，是服务器最独特的城市之一。'
  },
  {
    id: generateId('kingdom', 4),
    name: '冰雪帝国',
    image: '/images/kingdom-snow-fortress.jpg',
    shortComment: '北境的冰雪王国，严酷环境下的强大国家',
    faction: 'pro-law',
    level: 'kingdom',
    region: 'qingzhou',
    detailedInfo: '冰雪帝国统治着青州大陆北部的寒冷地区，是服务器最北方的国家。帝国人民在严酷的环境中磨练出了坚韧的性格和强大的战斗力。首都"冰冠城"建在冰川之上，是一座坚不可摧的要塞。帝国军队"霜卫军团"以严明的纪律和强大的战斗力闻名，是服务器最强的陆军之一。'
  },
  {
    id: generateId('kingdom', 5),
    name: '沙漠绿洲',
    image: '/images/kingdom-desert-city.jpg',
    shortComment: '益州大陆的沙漠明珠，丝绸之路的枢纽',
    faction: 'anti-law',
    level: 'large',
    region: 'yizhou',
    detailedInfo: '沙漠绿洲位于益州大陆中部的广袤沙漠中，是连接东西方的交通要道。这座城市建立在绿洲之上，是沙漠中唯一的水源地和补给站。城市由反法联盟控制，是联盟在西部的重要据点。城市拥有独特的沙漠建筑风格，精美的马赛克和拱门装饰着每一座建筑。沙漠骑兵"沙暴军团"是联盟最精锐的机动部队。'
  },
  {
    id: generateId('kingdom', 6),
    name: '天空之城',
    image: '/images/kingdom-floating-island.jpg',
    shortComment: '漂浮在云端的奇迹之城，魔法与科技的结晶',
    faction: 'other',
    level: 'holy',
    region: 'yangzhou',
    detailedInfo: '天空之城是服务器最神奇的城市，由法神小明用三年时间建造完成。这座城市漂浮在云端，通过传送门与地面连接。城市融合了魔法和科技，拥有自动化的农场和工厂。城市由"云端议会"管理，实行独特的民主制度。天空之城是服务器的中立区，任何阵营阵营都可以在这里和平交流和贸易。'
  }
];
