import { Trip, TripDay, TripNode } from './types';

export interface DiscoverModule {
  id: string;
  title: string;
  visible: boolean;
}

export interface AppConfig {
  appName: string;
  agentName: string;
  
  // 广场配置
  plaza: {
    logoUrl: string;
    welcomeText: string;
    announcementText: string;
  };
  
  // 发现页配置
  discover: {
    modules: DiscoverModule[];
  };
}

const DEFAULT_CONFIG: AppConfig = {
  appName: '黄小西',
  agentName: '黄小西',
  
  plaza: {
    logoUrl: '',
    welcomeText: '我是黄小西！带你玩转贵州。行程大纲：Day1:贵阳；Day2:安顺(黄果树)；Day3:返程。准备出发吗？',
    announcementText: '黄果树瀑布迎来最佳观赏期，水量充沛',
  },
  
  discover: {
    modules: [
      { id: 'ranking', title: '好aoao好玩\'ツ', visible: true },
      { id: 'weekend', title: 'Hiiiiii玩周末', visible: true },
      { id: 'community', title: '来都来lie，看一哈', visible: true },
    ],
  },
};

let currentConfig: AppConfig = { ...DEFAULT_CONFIG };

const configListeners = new Set<() => void>();

export const getConfig = (): AppConfig => {
  const saved = localStorage.getItem('hx_app_config');
  if (saved) {
    try {
      currentConfig = { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    } catch {
      currentConfig = { ...DEFAULT_CONFIG };
    }
  }
  return currentConfig;
};

export const setConfig = (newConfig: Partial<AppConfig>) => {
  currentConfig = { ...currentConfig, ...newConfig };
  localStorage.setItem('hx_app_config', JSON.stringify(currentConfig));
  configListeners.forEach(l => l());
};

export const resetConfig = () => {
  currentConfig = { ...DEFAULT_CONFIG };
  localStorage.removeItem('hx_app_config');
  configListeners.forEach(l => l());
};

export const subscribeConfig = (listener: () => void) => {
  configListeners.add(listener);
  return () => configListeners.delete(listener);
};

export const INITIAL_DAYS: TripDay[] = [
  {
    id: 'day1',
    title: 'Day 1',
    date: '5月1日',
    nodes: [
      {
        id: 'n1',
        type: '交通',
        time: '09:00',
        title: '抵达贵阳龙洞堡机场',
        status: '已完成',
        hasAgent: true,
        aiTips: '欢迎来到多彩贵州！建议出站后直接乘坐地铁或网约车前往市区。',
        details: { start: '出发地', end: '贵阳龙洞堡T2', duration: '2h' }
      },
      {
        id: 'n2',
        type: '景点',
        time: '10:30',
        title: '青岩古镇',
        status: '进行中',
        hasAgent: true,
        aiTips: '推荐品尝古镇特色卤猪脚和玫瑰糖，别忘了登上城墙俯瞰全景！',
        imageUrl: `${import.meta.env.BASE_URL}图片/小七孔.jpg`,
        details: { rating: '4.7', price: '￥10门票', level: 'AAAAA', location: '贵阳市花溪区青岩镇' }
      },
      {
        id: 'n3',
        type: '美食',
        time: '12:30',
        title: '青岩特色小吃',
        status: '未开始',
        hasAgent: false,
        imageUrl: `${import.meta.env.BASE_URL}图片/柏曼温泉酒店.jpg`,
        details: { rating: '4.8', price: '￥45/人', tags: ['卤猪脚', '糕粑稀饭', '豆腐圆子'], location: '青岩古镇内' }
      }
    ]
  },
  {
    id: 'day2',
    title: 'Day 2',
    date: '5月2日',
    nodes: [
      {
        id: 'n8',
        type: '美食',
        time: '08:30',
        title: '肠旺面',
        status: '未开始',
        hasAgent: false,
        details: { rating: '4.9', price: '￥15/人', tags: ['贵阳早餐王牌', '肥肠血旺'] }
      }
    ]
  }
];

export let TRIPS: Trip[] = [
  { id: '1', title: '黔东南苗寨深度体验3日游', status: '进行中', startTime: '2026-03-10', days: 3, imageUrl: `${import.meta.env.BASE_URL}图片/旅行记录2.jpg`, tripDays: INITIAL_DAYS },
  { id: '2', title: '黄果树瀑布全景游', status: '计划中', startTime: '2026-04-15', days: 2, imageUrl: `${import.meta.env.BASE_URL}图片/黄果树瀑布.jpg` },
  { id: '3', title: '梵净山徒步', status: '已完成', startTime: '2026-02-01', days: 1, imageUrl: `${import.meta.env.BASE_URL}图片/miao.png` },
];

export const getTrips = () => TRIPS;
export const setTripsStore = (newTrips: Trip[]) => { TRIPS = newTrips; };
export const addTrip = (trip: Trip) => { TRIPS = [trip, ...TRIPS]; };

// --- UGC Categories Global State ---
export let UGC_CATEGORIES = [
  { id: 1, name: '音乐节', supplier: '内部运营', isHot: true, accessMethod: 'api' },
  { id: 2, name: '马拉松', supplier: '马蜂窝', isHot: true, accessMethod: 'manual' },
  { id: 3, name: '户外', supplier: '高德地图', isHot: false, accessMethod: 'manual' },
  { id: 4, name: '体育', supplier: '携程旅行', isHot: false, accessMethod: 'api' },
];

const ugcListeners = new Set<() => void>();

export const getUgcCategories = () => UGC_CATEGORIES;
export const setUgcCategoriesStore = (cats: any[]) => { 
  UGC_CATEGORIES = cats; 
  ugcListeners.forEach(l => l());
};
export const subscribeUgcCategories = (listener: () => void) => {
  ugcListeners.add(listener);
  return () => ugcListeners.delete(listener);
};
