import React, { useState, useEffect } from 'react';
import { MapPin, Volume2, Send, Heart, ChevronRight, Languages, X, AlertTriangle, Sun, Calendar, Camera, Hotel, Wifi, Utensils, Navigation, Phone, Sparkles, CloudRain, Play, Bot, Flame, Users, ExternalLink, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page, Trip } from '../types';
import { getUgcCategories, subscribeUgcCategories, getConfig, subscribeConfig } from '../store';

type NotificationType = 'welcome' | 'morning' | 'tomorrow' | 'park_entry' | 'park_companion' | 'hotel_before' | 'hotel_during' | 'food' | 'warning';

interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  text: string;
  actionText?: string;
  actions?: string[];
}

const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', type: 'warning', title: '紧急预警', text: '【黄小西紧急预警】贵阳发布大风预警，建议暂缓游览，小西已查好避雨点。', actionText: '查询近三天天气 >' },
  { id: 'n2', type: 'welcome', title: '欢迎语', text: '', actionText: '查看行程详情预览 >' },
  { id: 'n3', type: 'morning', title: '早间唤醒', text: '早安！今天贵阳阳光明媚，出门带好充电宝，行程满满别累着。', actionText: '查询今天天气 >' },
  { id: 'n4', type: 'tomorrow', title: '明日预告', text: '明天去黄果树瀑布，路陡记得换防滑鞋！走侧门人少，快很多喔。', actionText: '查询明天天气 >' },
  { id: 'n5', type: 'park_entry', title: '入园必看', text: '离青岩古镇还有半小时。提前拿出身份证刷卡入园，别排长队咯。', actionText: '唤起微信地图导航至景区门口 >' },
  { id: 'n6', type: 'park_companion', title: '游中锦囊', text: '嘘！左边是拍瀑布的最佳角度，光线刚好！走旁边小路更快哦。', actionText: '查询景区游玩攻略 >' },
  { id: 'n7', type: 'hotel_before', title: '入住指南', text: '快到酒店啦，身份证拿手上。前台可寄存行李，办好入住洗个澡。', actionText: '唤起地图导航至酒店门口/停车场 >' },
  { id: 'n8', type: 'hotel_during', title: '住中服务', text: 'WiFi密码是88888888，有事直接拨前台电话。', actions: ['查询酒店基础设施', '拨打前台电话'] },
  { id: 'n9', type: 'food', title: '美食推荐', text: '中午这顿得吃好！附近有不错的酸汤鱼。想知道哪家不踩雷？', actionText: '推荐附近特色餐厅 >' },
];

const MOCK_TRIPS: Trip[] = [
  { id: '1', title: '贵阳三日游', status: '进行中', startTime: '2026-03-10', days: 3, imageUrl: `${import.meta.env.BASE_URL}图片/黄果树瀑布.jpg` },
  { id: '2', title: '梵净山徒步', status: '计划中', startTime: '2026-04-01', days: 2, imageUrl: `${import.meta.env.BASE_URL}图片/miao.png` },
];

const TABS = ['精选', '景区', '酒店', '餐厅', '数字分身', '特产'];

const ALL_CARDS = [
  { id: 1, title: '旅行规划小助手', shortName: '规划助手', suggestedQuestion: '帮我规划一个贵州3日游行程', desc: '无论你想制定行程🗺️、挖掘小众景点🌴、订购门票，还是了解当地美食🍲，我都能帮你轻松搞定！', tag: '精选', likes: '9.9k', likeCount: 9900, img: `${import.meta.env.BASE_URL}图片/旅行规划 .jpg` },
  { id: 3, title: '旅居设计专家', shortName: '旅居专家', suggestedQuestion: '推荐一个贵州适合旅居的小镇', desc: '为您量身定制1个月及以上的沉浸式旅居行程，发现不一样的生活方式。', tag: '精选', likes: '8.5k', likeCount: 8500, img: `${import.meta.env.BASE_URL}图片/旅居规划.jpg` },
  { id: 16, title: '旅行记录小助手', shortName: '记录助手', suggestedQuestion: '帮我写一条贵州旅行的朋友圈文案', desc: '帮助您一键生成朋友圈、小红书、微博等社交媒体的精美文案。', tag: '精选', likes: '9.2k', likeCount: 9200, img: `${import.meta.env.BASE_URL}图片/旅行记录2.jpg` },
  { id: 2, title: '小七孔景区智能体', shortName: '小七孔', suggestedQuestion: '小七孔景区怎么玩最合理？', desc: '为您提供荔波小七孔景区的深度导览、路线规划与避坑指南。', tag: '精选', likes: '8.8k', likeCount: 8800, img: `${import.meta.env.BASE_URL}图片/小七孔.jpg` },

  { id: 4, title: '黄果树瀑布智能体', shortName: '黄果树', suggestedQuestion: '黄果树瀑布最佳观赏路线是什么？', desc: '感受亚洲第一大瀑布的磅礴气势，体验水帘洞的神秘。', tag: '景区', likes: '5.2k', likeCount: 5200, img: `${import.meta.env.BASE_URL}图片/黄果树瀑布.jpg` },
  { id: 5, title: '梵净山导览智能体', shortName: '梵净山', suggestedQuestion: '梵净山登山需要准备什么？', desc: '天空之城，佛教名山。为您提供最全的登山攻略。', tag: '景区', likes: '4.5k', likeCount: 4500, img: `${import.meta.env.BASE_URL}图片/梵净山.jpg` },
  { id: 6, title: '西江千户苗寨智能体', shortName: '苗寨', suggestedQuestion: '苗寨夜景什么时候最美？', desc: '观赏震撼的苗寨夜景，体验长桌宴，了解苗族文化。', tag: '景区', likes: '4.8k', likeCount: 4800, img: `${import.meta.env.BASE_URL}图片/miao.png` },

  { id: 7, title: '贵州饭店酒店智能体', shortName: '贵州饭店', suggestedQuestion: '贵州饭店有什么特色包房？', desc: '承载着贵州的历史与荣耀。为您提供私密尊贵的包房服务。', tag: '酒店', likes: '3.8k', likeCount: 3800, img: `${import.meta.env.BASE_URL}图片/贵州饭店.jpg` },
  { id: 8, title: '桔子水晶酒店智能体', shortName: '桔子酒店', suggestedQuestion: '桔子水晶酒店周边有什么好玩的？', desc: '贵阳中心店，尽享城市繁华与宁静。', tag: '酒店', likes: '1.2k', likeCount: 1200, img: `${import.meta.env.BASE_URL}图片/桔子酒店.jpg` },
  { id: 9, title: '柏联温泉酒店智能体', shortName: '柏联温泉', suggestedQuestion: '柏联温泉酒店有哪些温泉项目？', desc: '隐匿于山水间的奢华温泉度假体验。', tag: '酒店', likes: '4.1k', likeCount: 4100, img: `${import.meta.env.BASE_URL}图片/柏曼温泉酒店.jpg` },

  { id: 10, title: '老凯俚酸汤鱼餐厅智能体', shortName: '酸汤鱼', suggestedQuestion: '老凯俚酸汤鱼有什么推荐菜品？', desc: '三十年传承，地道凯里风味，非遗美食。', tag: '餐厅', likes: '6.1k', likeCount: 6100, img: `${import.meta.env.BASE_URL}图片/凯里酸汤鱼.jpg` },
  { id: 11, title: '丝恋红汤丝娃娃餐厅智能体', shortName: '丝娃娃', suggestedQuestion: '丝娃娃怎么吃最地道？', desc: '贵阳必吃榜，传统小吃新体验。', tag: '餐厅', likes: '5.5k', likeCount: 5500, img: `${import.meta.env.BASE_URL}图片/丝恋.jpg` },

  { id: 12, title: '苗族文化数字导游', shortName: '苗族导游', suggestedQuestion: '给我讲讲苗族银饰文化', desc: '您的专属非遗文化讲解员。', tag: '数字分身', likes: '9.9k', likeCount: 9900, img: `${import.meta.env.BASE_URL}图片/导游.jpg` },
  { id: 13, title: '非遗传承人王阿婆', shortName: '王阿婆', suggestedQuestion: '王阿婆的辣子鸡怎么做？', desc: '三十年秘制辣子鸡手艺，带你品尝最地道的贵州味道。', tag: '数字分身', likes: '8.2k', likeCount: 8200, img: `${import.meta.env.BASE_URL}图片/非遗传承人.png` },
  { id: 14, title: '地陪小刘', shortName: '小刘', suggestedQuestion: '贵阳有什么隐藏的宝藏街巷？', desc: '土生土长的贵州小伙，带你走街串巷，发现隐藏的宝藏风光。', tag: '数字分身', likes: '7.5k', likeCount: 7500, img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800&h=1000' },
  { id: 15, title: '旅拍张摄影', shortName: '张摄影', suggestedQuestion: '贵州哪里拍照最出片？', desc: '专业旅拍十年，为你记录在贵州的每一个绝美瞬间。', tag: '数字分身', likes: '6.8k', likeCount: 6800, img: `${import.meta.env.BASE_URL}图片/旅拍张摄影.png` },
];

const SUGGESTED_TASKS = [
  { title: '做规划', desc: '规划助手计算您的最优旅游路线', query: '帮我规划一个贵州旅行行程', icon: '🗺️', bg: 'bg-blue-50' },
  { title: '找服务', desc: '订购助手提供便捷的酒店景区预订服务', query: '帮我找附近的酒店和门票', icon: '📍', bg: 'bg-green-50' },
  { title: '写游记', desc: '旅行记录官生成专属游记与回忆', query: '帮我写一篇贵州旅行游记', icon: '✏️', bg: 'bg-yellow-50' },
  { title: '看地图', desc: '手绘地图探索全省旅游资源', query: '打开全省旅游地图', icon: '🗺️', bg: 'bg-teal-50' },
  { title: '来旅居', desc: '旅居管家寻找舒适的旅居地点', query: '推荐一个贵州适合旅居的地方', icon: '🏠', bg: 'bg-purple-50' },
  { title: '查活动', desc: '活动管家提供赛事、演出等多维度指南', query: '打开活动助手', icon: '🎟️', bg: 'bg-orange-50' },
];

export default function Home({ onNavigate }: { onNavigate: (page: Page, data?: any) => void }) {
  const [config, setLocalConfig] = useState(() => getConfig());
  
  useEffect(() => {
    const unsubscribe = subscribeConfig(() => {
      setLocalConfig(getConfig());
    });
    return unsubscribe;
  }, []);

  const [mainTab, setMainTab] = useState<'发现' | '智能体广场'>(() => {
    return (localStorage.getItem('hx_main_tab') as '发现' | '智能体广场') || '发现';
  });

  useEffect(() => {
    localStorage.setItem('hx_main_tab', mainTab);
  }, [mainTab]);

  const [activeTab, setActiveTab] = useState('精选');
  const [cards, setCards] = useState<typeof ALL_CARDS>([]);
  const [isTripExpanded, setIsTripExpanded] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(() => {
    return !sessionStorage.getItem('hasVisitedHome');
  });
  const activeTrip = MOCK_TRIPS.find(t => t.status === '进行中');
  const [isTaskSquareOpen, setIsTaskSquareOpen] = useState(false);
  const [taskInput, setTaskInput] = useState('');


  const [activeRecommendFilter, setActiveRecommendFilter] = useState('推荐');
  const RECOMMEND_FILTERS = ['推荐', '赏花踏青', '网红打卡', '温泉泡汤', '博物馆奇妙'];


  // 需求描述：替换原有的推荐区，引入高德合作的扫街榜样式。
  // 展示规则：标题修改为“好aoao好玩'ツ × 高德地图”，标题旁带有高德指南的角标。下方卡片使用高亮渐变背景，突出“榜单”属性。卡片包含“AI 帮我找”操作按钮。
  // 交互逻辑：横向滑动查看不同的榜单，点击按钮可触发 AI 搜索推荐。
  const [showTooltip2, setShowTooltip2] = useState(false);

  // 3. 【 Workflow A 】周末计划区 (Hiiiiii玩周末 👀)
  // 需求描述：提供针对周末的垂直推荐列表。
  // 展示规则：包含各类周末活动（如周边游、探店等），带有明显的 AI 标签或一句话总结。模块顶部或底部包含“AI 周末计划生成”按钮。
  // 交互逻辑：点击可进入对应的活动详情或通过 AI 生成完整的周末日程。
  const [showTooltip3, setShowTooltip3] = useState(false);

  // 4. 【 Workflow A 】社区瀑布流区 (来都来lie，看一哈 🙄)
  // 需求描述：展示 UGC 或精选的图文内容，增强社区感。
  // 展示规则：采用瀑布流（Masonry）布局。标题旁带有一排可横向滑动的筛选项（如：音乐节、马拉松、户外、体育）。“音乐节”和“马拉松”作为当季最火，采用醒目的红黄渐变背景色和火焰图标。卡片内部去掉原有的点赞数，替换为醒目的“咨询AI”按钮（蓝色背景或黄色高亮）。作者名字和按钮文本需保证不换行。
  // 交互逻辑：点击筛选项可切换瀑布流内容。点击“咨询AI”唤起 AI 针对该图文内容的提问弹窗或抽屉。
  const [showTooltip4, setShowTooltip4] = useState(false);

  // Masonry filter state
  const [masonryFilters, setMasonryFilters] = useState(getUgcCategories());
  const [activeMasonryFilter, setActiveMasonryFilter] = useState(getUgcCategories()[0]?.name || '音乐节');

  useEffect(() => {
    const unsubscribe = subscribeUgcCategories(() => {
      const newFilters = getUgcCategories();
      setMasonryFilters(newFilters);
      if (!newFilters.find(f => f.name === activeMasonryFilter) && newFilters.length > 0) {
        setActiveMasonryFilter(newFilters[0].name);
      }
    });
    return unsubscribe;
  }, [activeMasonryFilter]);

  // tooltip component
  const Tooltip = ({ show, onClose, title, userStory, acceptanceCriteria }: any) => {
    if (!show) return null;
    return (
      <motion.div 
           drag
           dragMomentum={false}
           className="absolute top-[16px] right-[16px] z-[9999] w-[450px] bg-[#1E1E1E] text-white p-4 rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-move text-left"
           onClick={(e) => e.stopPropagation()}
           onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-3 border-b border-gray-700 pb-2">
          <h3 className="font-bold text-base">{title}</h3>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-gray-400 hover:text-white">
            <X size={16} />
          </button>
        </div>
        <div className="text-[13px] leading-[1.6] opacity-90">
          <div className="mb-[12px]">
            <div className="font-bold text-gray-300 mb-1 border-b border-gray-700/50 pb-1">User Story (用户故事)</div>
            <div>{userStory}</div>
          </div>
          <div className="mb-[12px]">
            <div className="font-bold text-gray-300 mb-1 border-b border-gray-700/50 pb-1">Acceptance Criteria (验收标准)</div>
            <div>{acceptanceCriteria}</div>
          </div>
        </div>
      </motion.div>
    );
  };

  // badge component
  const Badge = ({ num, onHover, show }: any) => (
    <div className="absolute -top-[6px] -right-[6px] z-[9999]">
      <div className="inline-block align-top bg-[rgb(250,173,20)] text-white font-bold text-[10px] leading-[14px] px-[4px] rounded-[2px] cursor-pointer border-none"
           onMouseEnter={onHover}
           onClick={(e) => { e.stopPropagation(); onHover(); }}>
        {num}
      </div>
    </div>
  );

  // Notification state
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const config = getConfig();
    return MOCK_NOTIFICATIONS.map(n => 
      n.type === 'welcome' ? { ...n, text: config.plaza.welcomeText } : n
    );
  });
  const [currentNotifIndex, setCurrentNotifIndex] = useState(0);

  useEffect(() => {
    setNotifications(prev => 
      prev.map(n => 
        n.type === 'welcome' ? { ...n, text: config.plaza.welcomeText } : n
      )
    );
  }, [config.plaza.welcomeText]);

  useEffect(() => {
    if (notifications.length === 0) return;
    const timer = setInterval(() => {
      setCurrentNotifIndex((prev) => (prev + 1) % notifications.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, [notifications.length]);

  useEffect(() => {
    if (isInitialLoading) {
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
        sessionStorage.setItem('hasVisitedHome', 'true');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isInitialLoading]);

  useEffect(() => {
    if (activeTab === '精选') {
      const baseCards = ALL_CARDS.filter(c => c.tag === '精选');
      
      // Get top 1 from each category (景区, 酒店, 餐厅)
      const topAttraction = ALL_CARDS.filter(c => c.tag === '景区').sort((a, b) => b.likeCount - a.likeCount)[0];
      const topHotel = ALL_CARDS.filter(c => c.tag === '酒店').sort((a, b) => b.likeCount - a.likeCount)[0];
      const topRestaurant = ALL_CARDS.filter(c => c.tag === '餐厅').sort((a, b) => b.likeCount - a.likeCount)[0];
      
      const topCards = [topAttraction, topHotel, topRestaurant].filter(Boolean);
      
      setCards([...baseCards, ...topCards]);
    } else {
      setCards(ALL_CARDS.filter(c => c.tag === activeTab));
    }
  }, [activeTab]);

  const handleSwipe = () => {
    setCards(prev => {
      const newCards = [...prev];
      const first = newCards.shift();
      if (first) newCards.push(first);
      return newCards;
    });
  };

  return (
    <div className="h-full bg-gradient-to-b from-indigo-50 to-white flex flex-col relative overflow-hidden">
      {/* 渐变背景层 */}
      <img src={`${import.meta.env.BASE_URL}首页.jpg`} alt="首页背景" className="absolute top-0 left-0 w-full h-[151px] object-cover z-0 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]" />
      <div className="absolute top-0 left-0 w-full h-[151px] bg-gradient-to-b from-[rgba(119,134,252,0.5)] via-[rgba(119,134,252,0.2)] to-[rgba(119,134,252,0)] pointer-events-none z-10" />
      
      {/* Header & Unified Notification */}
      <div className="pt-12 px-5 min-h-[80px] flex items-center relative z-50">
        <AnimatePresence mode="wait">
          {!isTripExpanded ? (
            <motion.div 
              key="collapsed" 
              className="flex items-center justify-between w-full"
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div data-guide="header" className="flex items-end gap-4">
                <div className="flex gap-4 items-baseline">
                  <button 
                    className={`text-2xl font-bold transition-all ${mainTab === '发现' ? 'text-gray-900 scale-105 origin-bottom-left' : 'text-gray-400'}`}
                    onClick={() => setMainTab('发现')}
                  >
                    发现
                  </button>
                  <button 
                    className={`text-2xl font-bold transition-all ${mainTab === '智能体广场' ? 'text-gray-900 scale-105 origin-bottom-left' : 'text-gray-400'}`}
                    onClick={() => setMainTab('智能体广场')}
                  >
                    广场
                  </button>
                </div>
              </div>
              
              {mainTab === '智能体广场' && (
                <button
                  data-guide="notification"
                  onClick={() => setIsTripExpanded(true)}
                  className="bg-white p-2 rounded-full shadow-sm flex items-center gap-2 relative"
                >
                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white">
                    <MapPin size={16} />
                  </div>
                  {/* Red dot indicator for notifications */}
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="expanded" 
              className="flex items-start w-full gap-4"
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <img src={`${import.meta.env.BASE_URL}张手跑.png`} alt="站着的黄小西" className="w-16 h-24 object-contain flex-shrink-0" />
              <div className="flex-1 bg-white rounded-2xl p-4 shadow-lg border border-indigo-50 relative overflow-hidden min-h-[100px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={notifications[currentNotifIndex].id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col justify-center"
                  >
                    {(() => {
                      const notif = notifications[currentNotifIndex];
                      
                      let icon = <Sparkles size={16} />;
                      let colorClass = "text-indigo-500";
                      let bgClass = "bg-indigo-50";
                      
                      switch (notif.type) {
                        case 'warning':
                          icon = <AlertTriangle size={16} />;
                          colorClass = "text-red-500";
                          bgClass = "bg-red-50";
                          break;
                        case 'welcome':
                          icon = <Sparkles size={16} />;
                          colorClass = "text-indigo-500";
                          bgClass = "bg-indigo-50";
                          break;
                        case 'morning':
                          icon = <Sun size={16} />;
                          colorClass = "text-orange-500";
                          bgClass = "bg-orange-50";
                          break;
                        case 'tomorrow':
                          icon = <Calendar size={16} />;
                          colorClass = "text-blue-500";
                          bgClass = "bg-blue-50";
                          break;
                        case 'park_entry':
                          icon = <Navigation size={16} />;
                          colorClass = "text-emerald-500";
                          bgClass = "bg-emerald-50";
                          break;
                        case 'park_companion':
                          icon = <Camera size={16} />;
                          colorClass = "text-teal-500";
                          bgClass = "bg-teal-50";
                          break;
                        case 'hotel_before':
                        case 'hotel_during':
                          icon = <Hotel size={16} />;
                          colorClass = "text-purple-500";
                          bgClass = "bg-purple-50";
                          break;
                        case 'food':
                          icon = <Utensils size={16} />;
                          colorClass = "text-amber-500";
                          bgClass = "bg-amber-50";
                          break;
                      }

                      const handleNotifAction = (notif: AppNotification, action?: string) => {
                        switch (notif.type) {
                          case 'warning':
                            onNavigate('chat', { query: '查询近三天天气' });
                            break;
                          case 'welcome':
                            onNavigate('trip-detail-preview');
                            break;
                          case 'morning':
                            onNavigate('chat', { query: '查询今天天气' });
                            break;
                          case 'tomorrow':
                            onNavigate('chat', { query: '查询明天天气' });
                            break;
                          case 'park_entry':
                            // 按照表格要求：点击卡片唤起微信地图，导航到景区门口
                            alert('正在为您唤起微信地图导航至景区门口...');
                            break;
                          case 'park_companion':
                            onNavigate('chat', { query: '查询景区游玩攻略' });
                            break;
                          case 'hotel_before':
                            // 按照表格要求：点击卡片唤起地图导航，导航到酒店门口/停车场
                            alert('正在为您唤起地图导航至酒店门口/停车场...');
                            break;
                          case 'hotel_during':
                            if (action === '拨打前台电话') alert('正在拨打前台电话...');
                            else onNavigate('chat', { query: '查询酒店基础设施' });
                            break;
                          case 'food':
                            onNavigate('chat', { query: '推荐附近特色餐厅' });
                            break;
                        }
                      };

                      return (
                        <>
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`${colorClass}`}>
                              {icon}
                            </div>
                            <span className={`font-bold ${colorClass} text-sm`}>{notif.title}</span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-3">{notif.text}</h3>
                          
                          {notif.actions ? (
                            <div className="flex gap-2 mt-1">
                              {notif.actions.map((act, i) => (
                                <button key={i} onClick={(e) => { e.stopPropagation(); handleNotifAction(notif, act); }} className={`text-xs border px-2 py-1 rounded-full ${colorClass} ${bgClass} border-current opacity-80 hover:opacity-100`}>
                                  {act}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div onClick={(e) => { e.stopPropagation(); handleNotifAction(notif); }} className={`mt-1 text-xs font-medium cursor-pointer ${colorClass} hover:underline`}>
                              {notif.actionText}
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsTripExpanded(false); }} 
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 z-10 bg-white/80 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area based on mainTab */}
      {mainTab === '智能体广场' ? (
        <div data-guide="agent-zone" className="flex flex-col flex-1">
          {/* Original Announcement & Translation - Moved inside 智能体广场 */}
          <div data-guide="announcement" className="px-6 mt-4 flex gap-2 relative z-10">
            <div 
              onClick={() => onNavigate('announcement')}
              className="flex-1 bg-green-50 border border-green-100 rounded-full px-3 py-1.5 flex items-center justify-between overflow-hidden cursor-pointer"
            >
              <div className="flex items-center gap-2 text-green-700 text-xs w-full overflow-hidden">
                <Volume2 size={14} className="flex-shrink-0" />
                <div className="relative w-full overflow-hidden h-4">
                  <motion.div 
                    className="absolute whitespace-nowrap"
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                  >
                    {config.plaza.announcementText}
                  </motion.div>
                </div>
              </div>
              <ChevronRight size={14} className="text-green-600 flex-shrink-0" />
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('translation');
              }}
              className="bg-green-50 border border-green-100 text-green-600 px-3 py-1.5 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <img src={`${import.meta.env.BASE_URL}icno/首页icon/中英.svg`} alt="翻译" className="w-6 h-6" />
            </button>
          </div>

          <div data-guide="tabs" className="flex px-6 mt-6 gap-6 overflow-x-auto scrollbar-hide pb-2 relative z-20 w-full">
            {TABS.map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap flex-shrink-0 text-lg font-medium transition-colors ${
                  activeTab === tab 
                    ? 'text-gray-900 font-bold' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="h-1 w-1/2 bg-yellow-400 mx-auto mt-1 rounded-full" 
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-hidden mt-4 relative z-10 w-full flex flex-col items-center">
            {cards.length > 0 && (
              <div className="relative w-full h-[380px] perspective-1000">
                
                <AnimatePresence>
                  {cards.slice(0, 3).map((card, index) => {
                    const isTop = index === 0;
                    return (
                      <motion.div
                        key={card.id}
                        initial={false}
                        animate={{
                          scale: isTop ? 1 : 1 - index * 0.05,
                          y: index * 15,
                          zIndex: cards.length - index,
                          opacity: 1 - index * 0.2
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute w-[85%] left-[7.5%] bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100"
                        style={{ transformOrigin: "top center" }}
                        drag={isTop ? "y" : false}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        onDragEnd={(e, { offset, velocity }) => {
                          const swipe = offset.y;
                          if (swipe < -50 || swipe > 50) {
                            handleSwipe();
                          }
                        }}
                      >
                        <div className="h-48 relative">
                          <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-3 left-3 bg-white/20 backdrop-blur px-2 py-1 rounded text-xs text-white">
                            {card.tag}
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <h3 className="font-bold text-lg leading-tight">{card.title}</h3>
                          </div>
                        </div>
                        <div className="p-4 bg-white">
                          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{card.desc}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-gray-400">
                              <Heart size={16} />
                              <span className="text-sm">{card.likes}</span>
                            </div>
                            <button 
                              onClick={() => onNavigate('chat', { 
                                query: card.suggestedQuestion,
                                agentTitle: card.shortName
                              })}
                              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-transform whitespace-nowrap flex-shrink-0"
                            >
                              <Sparkles size={14} className="flex-shrink-0" />
                              咨询 TA
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
            <div className="mt-4 text-gray-400 text-sm animate-pulse">上下滑动切换智能体</div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 pb-24 z-10 space-y-6">
          {/* New Sections Area */}
          <div className="space-y-6">
            {/* Section 1: 好aoao好玩 */}
            <div className="relative">
              {/* Workflow A: [2] 榜单推荐区 (好aoao好玩'ツ) */}
              <Badge num="2" onHover={() => { setShowTooltip2(true); setShowTooltip3(false); setShowTooltip4(false); }} />
              <Tooltip show={showTooltip2} onClose={() => setShowTooltip2(false)} title="[2] 榜单推荐区 (好aoao好玩'ツ)" 
                userStory={
                  <div className="bg-gray-800 p-2 rounded text-gray-300 font-mono text-xs">
                    <span className="text-blue-400">As a</span> 寻找游玩灵感的用户,<br/>
                    <span className="text-blue-400">I want to</span> 查看高德合作的扫街榜单,<br/>
                    <span className="text-blue-400">So that</span> 获取最热门的本地游玩推荐并使用 AI 规划。
                  </div>
                }
                acceptanceCriteria={
                  <ul className="list-disc pl-4 space-y-2 text-gray-300">
                    <li><span className="text-green-400 font-bold">Given</span> 用户滚动到榜单区，<span className="text-yellow-400 font-bold">when</span> 看到标题“好aoao好玩'ツ × 高德地图”，<span className="text-purple-400 font-bold">then</span> 必须带有高德指南角标。</li>
                    <li><span className="text-green-400 font-bold">Given</span> 榜单卡片展示，<span className="text-yellow-400 font-bold">when</span> 用户横向滑动，<span className="text-purple-400 font-bold">then</span> 可以查看更多榜单分类。</li>
                    <li><span className="text-green-400 font-bold">Given</span> 用户点击卡片上的“AI 帮我找”，<span className="text-yellow-400 font-bold">when</span> 触发点击，<span className="text-purple-400 font-bold">then</span> 唤起 AI 搜索推荐功能。</li>
                  </ul>
                }
              />
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-[18px] font-bold text-gray-900 whitespace-nowrap flex-shrink-0">{config.discover.modules[0]?.title || '好aoao好玩\'ツ'}</h2>
                <div className="text-[12px] font-normal text-gray-500 flex items-center gap-1 whitespace-nowrap flex-shrink-0">
                  ×
                  <div className="bg-[#3370FF] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <Navigation size={10} className="flex-shrink-0" />
                    高德地图
                  </div>
                </div>
                <div className="ml-auto bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm border border-blue-100 whitespace-nowrap flex-shrink-0">
                  <Sparkles size={12} className="text-blue-500 flex-shrink-0" />
                  AI帮我找
                </div>
              </div>
              
              <div className="flex gap-2 overflow-x-auto scrollbar-hide w-full pr-4 mb-3">
                {RECOMMEND_FILTERS.map(filter => {
                  const isActive = activeRecommendFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveRecommendFilter(filter)}
                      className={`relative whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-medium transition-colors z-10 ${
                        isActive
                          ? 'text-gray-900 font-bold bg-[#FFE500]'
                          : 'text-gray-500 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <span className="relative z-20">{filter}</span>
                    </button>
                  );
                })}
                </div>
              </div>

              {/* 高德合作扫街榜 */}
              <div className="w-full bg-gradient-to-r from-[#F0F5FF] to-[#E6EFFF] rounded-2xl p-3 shadow-sm border border-[#D6E4FF]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-black text-gray-900 italic tracking-wide">贵阳扫街榜</span>
                  </div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-0.5 bg-white/60 px-1.5 py-0.5 rounded-full">
                    <span>发现附近好街</span>
                    <ChevronRight size={10} />
                  </div>
                </div>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {/* Item 1 */}
                  <div 
                    onClick={() => onNavigate('ranking-detail')}
                    className="w-[110px] flex-shrink-0 bg-white rounded-xl p-1.5 shadow-sm relative cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="absolute -top-1.5 -left-1.5 bg-gradient-to-br from-[#FFD700] to-[#F7931A] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-sm z-10 border-2 border-white">1</div>
                    <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&q=80" className="w-full h-[56px] rounded-lg object-cover mb-1.5" />
                    <div className="text-[12px] font-bold text-gray-900 truncate px-0.5">太平路</div>
                    <div className="text-[9px] text-gray-500 truncate px-0.5 mt-0.5">潮人聚集地 · 2.1km</div>
                  </div>
                  {/* Item 2 */}
                  <div 
                    onClick={() => onNavigate('ranking-detail')}
                    className="w-[110px] flex-shrink-0 bg-white rounded-xl p-1.5 shadow-sm relative cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="absolute -top-1.5 -left-1.5 bg-gradient-to-br from-[#C0C0C0] to-[#999999] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-sm z-10 border-2 border-white">2</div>
                    <img src="https://images.unsplash.com/photo-1574169208507-84376144848b?w=200&q=80" className="w-full h-[56px] rounded-lg object-cover mb-1.5" />
                    <div className="text-[12px] font-bold text-gray-900 truncate px-0.5">青云市集</div>
                    <div className="text-[9px] text-gray-500 truncate px-0.5 mt-0.5">夜市小吃 · 3.5km</div>
                  </div>
                  {/* Item 3 */}
                  <div 
                    onClick={() => onNavigate('ranking-detail')}
                    className="w-[110px] flex-shrink-0 bg-white rounded-xl p-1.5 shadow-sm relative cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="absolute -top-1.5 -left-1.5 bg-gradient-to-br from-[#CD7F32] to-[#A0522D] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-sm z-10 border-2 border-white">3</div>
                    <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=200&q=80" className="w-full h-[56px] rounded-lg object-cover mb-1.5" />
                    <div className="text-[12px] font-bold text-gray-900 truncate px-0.5">曹状元街</div>
                    <div className="text-[9px] text-gray-500 truncate px-0.5 mt-0.5">老贵阳风味 · 4.2km</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Hiiiiii玩周末 */}
            <div className="relative">
              {/* Workflow A: [3] 周末计划区 (Hiiiiii玩周末 👀) */}
              <Badge num="3" onHover={() => { setShowTooltip2(false); setShowTooltip3(true); setShowTooltip4(false); }} />
              <Tooltip show={showTooltip3} onClose={() => setShowTooltip3(false)} title="[3] 周末计划区 (Hiiiiii玩周末 👀)" 
                userStory={
                  <div className="bg-gray-800 p-2 rounded text-gray-300 font-mono text-xs">
                    <span className="text-blue-400">As a</span> 周末出游用户,<br/>
                    <span className="text-blue-400">I want to</span> 浏览周末活动推荐列表,<br/>
                    <span className="text-blue-400">So that</span> 我能一键生成我的周末日程。
                  </div>
                }
                acceptanceCriteria={
                  <ul className="list-disc pl-4 space-y-2 text-gray-300">
                    <li><span className="text-green-400 font-bold">Given</span> 用户浏览周末计划区，<span className="text-yellow-400 font-bold">when</span> 查看活动，<span className="text-purple-400 font-bold">then</span> 看到每条活动都带有 AI 标签或一句话总结。</li>
                    <li><span className="text-green-400 font-bold">Given</span> 用户点击活动列表，<span className="text-yellow-400 font-bold">when</span> 点击“AI 周末计划生成”按钮，<span className="text-purple-400 font-bold">then</span> 生成完整的周末行程。</li>
                  </ul>
                }
              />
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[18px] font-bold text-gray-900 flex-shrink-0 whitespace-nowrap">周末去哪儿 👀</h2>
                <div className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full flex items-center gap-1 border border-indigo-100 font-bold flex-shrink-0 whitespace-nowrap">
                  <Users size={12} className="flex-shrink-0" />
                  圈子拼队大厅
                </div>
              </div>

              {/* 第三方 H5 入口 Banner */}
              <div 
                onClick={() => {
                  onNavigate('weekend-h5');
                }}
                className="relative w-full h-[140px] rounded-[20px] overflow-hidden shadow-sm cursor-pointer group active:scale-[0.98] transition-transform"
              >
                {/* 背景图 & 遮罩 */}
                <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=600&q=80" alt="周末营地" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/50 to-transparent" />
                
                {/* 内容区 */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="bg-yellow-400 text-gray-900 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">HOT</span>
                      <span className="text-white text-sm font-black tracking-wide">周末玩乐大本营</span>
                    </div>
                    <p className="text-white/80 text-[11px] font-medium leading-relaxed max-w-[70%]">
                      找搭子 / 进圈子 / 玩户外<br/>本周已有 <span className="text-yellow-400 font-bold">2,358</span> 人成功拼队
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    {/* 叠放头像 */}
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <img src="https://i.pravatar.cc/100?img=1" className="w-6 h-6 rounded-full border-2 border-gray-800 relative z-30" alt="avatar" />
                        <img src="https://i.pravatar.cc/100?img=2" className="w-6 h-6 rounded-full border-2 border-gray-800 relative z-20" alt="avatar" />
                        <img src="https://i.pravatar.cc/100?img=3" className="w-6 h-6 rounded-full border-2 border-gray-800 relative z-10" alt="avatar" />
                        <div className="w-6 h-6 rounded-full border-2 border-gray-800 bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-[9px] font-bold relative z-0">
                          +99
                        </div>
                      </div>
                    </div>

                    {/* 按钮 */}
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                      进入大厅 <ExternalLink size={12} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: 来都来lie，看一哈 */}
            <div className="relative">
              {/* Workflow A: [4] 社区瀑布流区 (来都来lie，看一哈 🙄) */}
              <Badge num="4" onHover={() => { setShowTooltip2(false); setShowTooltip3(false); setShowTooltip4(true); }} />
              <Tooltip show={showTooltip4} onClose={() => setShowTooltip4(false)} title="[4] 社区瀑布流区 (来都来lie，看一哈 🙄)" 
                userStory={
                  <div className="bg-gray-800 p-2 rounded text-gray-300 font-mono text-xs">
                    <span className="text-blue-400">As a</span> 社区活跃用户,<br/>
                    <span className="text-blue-400">I want to</span> 在瀑布流中查看精选图文内容,<br/>
                    <span className="text-blue-400">So that</span> 我能就感兴趣的内容直接咨询 AI。
                  </div>
                }
                acceptanceCriteria={
                  <ul className="list-disc pl-4 space-y-2 text-gray-300">
                    <li><span className="text-green-400 font-bold">Given</span> 社区内容区，<span className="text-yellow-400 font-bold">when</span> 渲染完成，<span className="text-purple-400 font-bold">then</span> 呈现 Masonry 瀑布流布局。</li>
                    <li><span className="text-green-400 font-bold">Given</span> 社区内容区，<span className="text-yellow-400 font-bold">when</span> 用户查看瀑布流区域，<span className="text-purple-400 font-bold">then</span> 筛选项应放置在标题下方，并且“音乐节”和“马拉松”呈现醒目渐变及火焰图标，支持横向滑动。</li>
                    <li><span className="text-green-400 font-bold">Given</span> 瀑布流卡片，<span className="text-yellow-400 font-bold">when</span> 用户点击卡片内部的“咨询AI”按钮，<span className="text-purple-400 font-bold">then</span> 唤起针对该内容的 AI 提问抽屉。</li>
                  </ul>
                }
              />
              {/* 瀑布流筛选项放在标题下方 */}
              <div className="mb-4">
                <h2 className="text-[18px] font-bold text-gray-900 mb-3">来都来lie，看一哈 🙄</h2>
                <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide w-full pr-4 pb-1">
                  {masonryFilters.map(filter => {
                    const isActive = activeMasonryFilter === filter.name;
                    return (
                      <button
                        key={filter.name}
                        onClick={() => setActiveMasonryFilter(filter.name)}
                        className={`relative whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-medium transition-colors z-10 flex items-center gap-1 flex-shrink-0 ${
                          filter.isHot
                            ? isActive
                              ? 'text-white bg-gradient-to-r from-red-500 to-orange-500 font-bold border-none shadow-sm'
                              : 'text-red-600 bg-red-50 hover:bg-red-100 border border-red-100'
                            : isActive
                              ? 'text-gray-900 font-bold bg-[#FFE500]'
                              : 'text-gray-500 bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        {filter.isHot && <Flame size={12} className={isActive ? 'text-yellow-200' : 'text-red-500'} />}
                        <span className="relative z-20">{filter.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                {/* Col 1 */}
                <div className="flex-1 flex flex-col gap-3">
                {/* Card 1: 肇兴侗寨 */}
                <div 
                  className="bg-white rounded-[20px] overflow-hidden shadow-sm pb-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate('ugc-detail')}
                >
                  <div className="w-full h-56 relative">
                    <img src={`${import.meta.env.BASE_URL}图片/miao.png`} alt="肇兴侗寨" className="w-full h-full object-cover" />
                  </div>
                  <div className="px-2.5 pt-2">
                    <h3 className="font-bold text-[13px] text-gray-900 leading-snug line-clamp-2">肇兴侗寨避坑指南，这几家酸汤牛肉绝了！</h3>
                    <div className="mt-2.5 flex justify-between items-center">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="author" className="w-[18px] h-[18px] rounded-full object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                        <span className="text-[11px] text-gray-500 font-medium truncate">旅行达人小A</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 shadow-sm cursor-pointer hover:bg-blue-100 transition-colors flex-shrink-0 whitespace-nowrap">
                        <Sparkles size={10} className="text-blue-500 flex-shrink-0" />
                        <span className="text-[10px] font-bold">咨询AI</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2: 夜市美食 */}
                <div 
                  className="bg-white rounded-[20px] overflow-hidden shadow-sm pb-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate('ugc-detail')}
                >
                  <div className="w-full h-44 relative">
                    <img src="https://images.unsplash.com/photo-1574169208507-84376144848b?w=500&q=80" alt="美食" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="px-2.5 pt-2">
                    <h3 className="font-bold text-[13px] text-gray-900 leading-snug line-clamp-2">贵阳本地人私藏的夜市美食，第一家就封神！</h3>
                    <div className="mt-2.5 flex justify-between items-center">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" alt="author" className="w-[18px] h-[18px] rounded-full object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                        <span className="text-[11px] text-gray-500 font-medium truncate">干饭王</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 shadow-sm cursor-pointer hover:bg-blue-100 transition-colors flex-shrink-0 whitespace-nowrap">
                        <Sparkles size={10} className="text-blue-500 flex-shrink-0" />
                        <span className="text-[10px] font-bold">咨询AI</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Card 3: 音乐节 */}
                <div 
                  className="bg-white rounded-[20px] overflow-hidden shadow-sm pb-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate('ugc-detail')}
                >
                  <div className="w-full h-48 relative">
                    <img src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=500&q=80" alt="音乐节" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="px-2.5 pt-2">
                    <h3 className="font-bold text-[13px] text-gray-900 leading-snug line-clamp-2">贵阳草莓音乐节早鸟票抢票攻略</h3>
                    <div className="mt-2.5 flex justify-between items-center">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="author" className="w-[18px] h-[18px] rounded-full object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                        <span className="text-[11px] text-gray-500 font-medium truncate">音乐节小能手</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 shadow-sm cursor-pointer hover:bg-blue-100 transition-colors flex-shrink-0 whitespace-nowrap">
                        <Sparkles size={10} className="text-blue-500 flex-shrink-0" />
                        <span className="text-[10px] font-bold">咨询AI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Col 2 */}
              <div className="flex-1 flex flex-col gap-3">
                {/* Card 4: 徒步视频 */}
                <div 
                  className="bg-white rounded-[20px] overflow-hidden shadow-sm pb-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onNavigate('ugc-detail')}
                >
                  <div className="w-full h-40 relative">
                    <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80" alt="徒步" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                        <Play size={16} className="ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-medium z-10">03:12</div>
                  </div>
                  <div className="px-2.5 pt-2">
                    <h3 className="font-bold text-[13px] text-gray-900 leading-snug line-clamp-2">航拍梵净山云海日出，附最佳徒步路线和装备清单</h3>
                    <div className="mt-2.5 flex justify-between items-center">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" alt="author" className="w-[18px] h-[18px] rounded-full object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                        <span className="text-[11px] text-gray-500 font-medium truncate">户外老李</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 shadow-sm cursor-pointer hover:bg-blue-100 transition-colors flex-shrink-0 whitespace-nowrap">
                        <Sparkles size={10} className="text-blue-500 flex-shrink-0" />
                        <span className="text-[10px] font-bold">咨询AI</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 5: Special Yellow Block (玩点不一样) */}
                <div className="bg-[#FFE500] rounded-[20px] p-3 shadow-sm border border-[#F4D900]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-[18px] font-black italic transform -skew-x-6 text-gray-900 drop-shadow-sm tracking-wide">玩点不一样</div>
                    <span className="text-[18px] font-black text-gray-900 leading-none">”</span>
                  </div>
                  
                  <div className="flex flex-col gap-2.5">
                    {/* Item 1 */}
                    <div className="bg-white rounded-xl p-1.5 flex gap-2 relative shadow-sm border-2 border-white">
                      <div className="absolute -top-2 -left-2 bg-gray-900 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm z-10 border border-white">01</div>
                      <img src={`${import.meta.env.BASE_URL}图片/miao.png`} className="w-[46px] h-[46px] rounded-lg object-cover flex-shrink-0" alt="肇兴侗寨" />
                      <div className="flex flex-col justify-center gap-0.5 py-0.5 overflow-hidden">
                        <div className="text-[11px] font-bold text-gray-900 truncate">肇兴侗寨两日游</div>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-[10px] font-bold text-gray-900">¥</span>
                          <span className="text-[13px] font-black text-gray-900 leading-none">298</span>
                          <span className="text-[9px] text-gray-500 font-medium ml-0.5">起</span>
                        </div>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-white rounded-xl p-1.5 flex gap-2 relative shadow-sm border-2 border-white">
                      <div className="absolute -top-2 -left-2 bg-gray-900 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm z-10 border border-white">02</div>
                      <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=200&q=80" className="w-[46px] h-[46px] rounded-lg object-cover flex-shrink-0" alt="春日露营" />
                      <div className="flex flex-col justify-center gap-0.5 py-0.5 overflow-hidden">
                        <div className="text-[11px] font-bold text-gray-900 truncate">春日露营好去处</div>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-[10px] font-bold text-gray-900">¥</span>
                          <span className="text-[13px] font-black text-gray-900 leading-none">398</span>
                          <span className="text-[9px] text-gray-500 font-medium ml-0.5">起</span>
                        </div>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="bg-white rounded-xl p-1.5 flex gap-2 relative shadow-sm border-2 border-white">
                      <div className="absolute -top-2 -left-2 bg-gray-900 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm z-10 border border-white">03</div>
                      <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&q=80" className="w-[46px] h-[46px] rounded-lg object-cover flex-shrink-0" alt="户外烧烤" />
                      <div className="flex flex-col justify-center gap-0.5 py-0.5 overflow-hidden">
                        <div className="text-[11px] font-bold text-gray-900 truncate">户外烧烤套餐</div>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-[10px] font-bold text-gray-900">¥</span>
                          <span className="text-[13px] font-black text-gray-900 leading-none">168</span>
                          <span className="text-[9px] text-gray-500 font-medium ml-0.5">起</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suggested Question */}
      {mainTab === '智能体广场' && cards.length > 0 && !isInitialLoading && (
        <div className="px-6 mb-2 relative z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={cards[0].id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <button
                onClick={() => onNavigate('chat', { query: cards[0].suggestedQuestion, agentTitle: cards[0].title })}
                className="w-full text-left bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3 text-sm text-gray-700 hover:bg-indigo-100 transition-colors"
              >
                <span className="text-indigo-600 font-bold">{cards[0].shortName}</span>：{cards[0].suggestedQuestion}
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Bottom Input */}
      {mainTab === '智能体广场' && (
        <div className="px-6 pb-8 mt-auto relative z-20">
          <div
            data-guide="input"
            onClick={() => setIsTaskSquareOpen(true)}
            className="bg-white shadow-lg rounded-full p-2 pl-6 flex items-center justify-between border border-gray-100 cursor-text"
          >
            <span className="text-gray-400 text-sm">给黄小西布置一个任务</span>
            <button className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Task Square Bottom Sheet */}
      <AnimatePresence>
        {isTaskSquareOpen && (
          <motion.div
            className="absolute inset-0 z-[60] flex flex-col justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setIsTaskSquareOpen(false)} />
            <motion.div
              className="relative bg-white rounded-t-[2rem] px-6 pt-5 pb-8 max-h-[70%] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-5">任务广场</h3>
              <div className="space-y-3 mb-5">
                {SUGGESTED_TASKS.map((task, i) => (
                  <motion.div
                    key={i}
                    onClick={() => {
                      setIsTaskSquareOpen(false);
                      if (task.title === '查活动') {
                        onNavigate('sports-assistant');
                      } else if (task.title === '看地图') {
                        onNavigate('map-explore');
                      } else {
                        onNavigate('chat', { query: task.query });
                      }
                    }}
                    className="bg-white border border-gray-100 rounded-2xl px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-4"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-12 h-12 rounded-2xl ${task.bg} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {task.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-bold text-gray-900">{task.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{task.desc}</p>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 flex-shrink-0" />
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full p-1 pl-4">
                <input
                  type="text"
                  value={taskInput}
                  onChange={e => setTaskInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && taskInput.trim()) {
                      setIsTaskSquareOpen(false);
                      onNavigate('chat', { query: taskInput.trim() });
                      setTaskInput('');
                    }
                  }}
                  placeholder="给黄小西布置一个任务"
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                <button
                  onClick={() => {
                    if (taskInput.trim()) {
                      setIsTaskSquareOpen(false);
                      onNavigate('chat', { query: taskInput.trim() });
                      setTaskInput('');
                    }
                  }}
                  className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center text-white flex-shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}
