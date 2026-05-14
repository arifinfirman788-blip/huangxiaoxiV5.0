/**
 * 赛事/活动详情页 后台动态配置数据结构
 * 
 * 适用于 CMS 后台管理系统。通过这套结构，后台不仅能管理活动的基础信息，
 * 还能动态配置详情页下方的 Tab 列表及其内部的展示模块，实现“千会千面”。
 */

export interface EventConfig {
  id: string | number;
  title: string;
  type: 'marathon' | 'music' | 'series' | 'custom'; // 活动大类
  basicInfo: EventBasicInfo;
  tabs: TabConfig[]; // 动态挂载的 Tab 列表
}

// 1. 基础信息配置
export interface EventBasicInfo {
  date: string;
  location: string;
  coverImg: string;
  tags: string[];
  status: '报名中' | '即将开始' | '进行中' | '已结束';
  organizer: string;
  level?: string;
  route?: string; // 赛道或场地信息
}

// 2. Tab 配置
export interface TabConfig {
  id: string;      // 例如 'ticket', 'pre', 'gallery'
  name: string;    // Tab名称，例如 "在线购票", "行前准备"
  color: string;   // 对应的 UI 主题色，例如 "blue-500", "orange-500"
  sortOrder: number; // Tab 排序序号
  modules: ModuleConfig[]; // Tab 下挂载的动态内容模块
}

// 3. 模块化配置 (支持多种富媒体及交互模块)
export type ModuleConfig = TextModule | TicketModule | GalleryModule | CardModule;

// 3.1 图文段落模块
export interface TextModule {
  type: 'text';
  title: string;      // 模块标题，例如 "🎤 演出阵容与时刻表"
  icon?: string;      // 标题前缀 Icon
  content: string;    // 支持普通文本、富文本或 Markdown 格式
  highlight?: boolean;// 是否带高亮背景 (如 bg-gray-50)
}

// 3.2 票务/报名卡片模块
export interface TicketModule {
  type: 'ticket';
  title: string;      // 例如 "🎫 门票信息"
  tickets: TicketItem[];
}

export interface TicketItem {
  name: string;       // e.g., "单日预售票", "内场VIP观赛席"
  desc: string;       // e.g., "限量发售"
  price: string;      // e.g., "¥299", "免费"
  status: 'on_sale' | 'sold_out' | 'booking';
  actionIntent: string; // 触发管家交互的意图，例如 "购买门票", "预约观赛"
}

// 3.3 瀑布流图集模块 (精彩瞬间)
export interface GalleryModule {
  type: 'gallery';
  images: {
    url: string;
    desc: string;
  }[];
}

// 3.4 推荐卡片模块 (酒店、交通、周边游玩)
export interface CardModule {
  type: 'card';
  title: string;      // 例如 "住宿推荐"
  cards: {
    title: string;    // 酒店名/景点名
    desc: string;     // 距离/描述
    img: string;      // 卡片配图
    price?: string;   // 参考价格
    tag?: string;     // 右下角小标签
  }[];
}
