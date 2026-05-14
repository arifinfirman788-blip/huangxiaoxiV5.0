import React, { useState } from 'react';
import { ChevronLeft, Share2, MapPin, Search, ChevronDown, ChevronRight, MoreHorizontal, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page } from '../types';

export default function RankingDetail({ onNavigate }: { onNavigate: (page: Page, data?: any) => void }) {
  const [activeNav, setActiveNav] = useState('扫街广场');

  const sideNav = [
    { id: '扫街广场', title: '扫街广场', subtitle: '心选好店', type: 'item' },
    { title: '状元榜', subtitle: '年度精选', type: 'header' },
    { id: '必吃美食', title: '必吃美食', type: 'item' },
    { id: '必去景点', title: '必去景点', type: 'item' },
    { id: '必住酒店', title: '必住酒店', type: 'item' },
    { title: '扫街榜', subtitle: '烟火万象', type: 'header' },
    { id: '烟火小店', title: '烟火小店', type: 'item' },
    { id: '专程前往', title: '专程前往', subtitle: '轮胎磨损榜', type: 'item' },
    { id: '本地人爱去', title: '本地人爱去', type: 'item' },
    { id: '饮品甜点', title: '饮品甜点', subtitle: '下午茶', type: 'item' },
    { title: '热门打卡', subtitle: '人气地标', type: 'header' },
    { id: '多次前往', title: '多次前往', subtitle: '回头客', type: 'item' },
    { id: '主题餐厅', title: '主题餐厅', type: 'item' },
    { id: '热门', title: '热门', type: 'item' },
    { id: '飙升', title: '飙升', type: 'item' }
  ];

  const topTagsSquare = ['发现好店', '美食', '景点', '商场', '公园', '酒店'];
  const topTagsList = ['排序'];

  const nearbyStores = [
    { id: 1, name: '祖母的厨房西餐厅...', score: '4.2分', rankTag: '观山湖区西餐榜第5名', dist: '2.7km', type: '西餐', price: '¥115/人', img: 'https://picsum.photos/seed/store1/400/400' },
    { id: 2, name: '中山脆鲩鱼火锅', score: '4.3分', rankTag: '入选观山湖区鱼火锅榜', dist: '2.0km', type: '鱼火锅', price: '¥54/人', img: 'https://picsum.photos/seed/store2/400/400' },
    { id: 3, name: '西部码头大排档', score: '4.4分', rankTag: '观山湖区回头客第1名', dist: '2.4km', type: '湛江菜', price: '¥88/人', img: 'https://picsum.photos/seed/store3/400/400' }
  ];

  const dailyRecommends = [
    {
      id: 'flower',
      title: '贵阳市赏花榜',
      subtitle: '精选12个热门地点',
      img: 'https://picsum.photos/seed/flower/600/300',
      items: [
        { rank: '01', name: '观山湖公园', dist: '2.6km', hot: '86.3万人去过', img: 'https://picsum.photos/seed/park1/100/100' },
        { rank: '02', name: '花溪十里河滩国家城市湿地公园', dist: '18.6km', hot: '33.8万人去过', img: 'https://picsum.photos/seed/park2/100/100' }
      ]
    },
    {
      id: 'fresh',
      title: '新鲜采摘榜',
      subtitle: '精选23个热门果园',
      img: 'https://picsum.photos/seed/fresh/600/300',
      items: [
        { rank: '01', name: '红枫湖草莓园', dist: '7.2km', hot: '12.5万人去过', img: 'https://picsum.photos/seed/farm1/100/100' },
        { rank: '02', name: '春日农场', dist: '24.1km', hot: '8.2万人去过', img: 'https://picsum.photos/seed/farm2/100/100' }
      ]
    }
  ];

  // ====== 贵阳真实数据源 ======
  
  // 烟火小店
  const storeListSnacks = [
    { 
      id: 1, 
      name: '玉珍酸笋火锅(喷水池店)', 
      heat: '97.6', 
      score: '4.8', 
      dist: '7.6公里', 
      type: '火锅', 
      price: '¥56/人', 
      tags: ['酸笋发酵汤底', '独门炸茄片', '贡菜丸子脆嫩'],
      comment: '小巷里的红棚大排档，坐的都是本地人，热气腾腾，烟火气十足，上榜榜首的地道贵阳火锅小店',
      commentCount: '1249',
      img: 'https://picsum.photos/seed/yuzhen/800/600',
      isHot: true
    },
    { 
      id: 2, 
      name: '丁姨妈烙锅(云岩店)', 
      heat: '95.3', 
      score: '4.7', 
      dist: '3.2公里', 
      type: '贵州小吃', 
      price: '¥45/人', 
      tags: ['活油蘸水', '臭豆腐', '五花肉'],
      comment: '贵阳烙锅界的扛把子，每天晚上排队到深夜，菜品新鲜，折耳根蘸水是一绝。',
      commentCount: '2103',
      img: 'https://picsum.photos/seed/laoguo/800/600',
      isHot: true
    }
  ];

  // 必吃美食
  const storeListFood = [
    { 
      id: 3, 
      name: '老凯俚酸汤鱼(省府路店)', 
      heat: '98.2', 
      score: '4.9', 
      dist: '4.1公里', 
      type: '贵州菜', 
      price: '¥92/人', 
      tags: ['非遗红酸汤', '现杀江团', '苗族风情'],
      comment: '来贵阳必吃的老字号，酸汤味道极其正宗，喝一口汤开胃生津，鱼肉细嫩入味。',
      commentCount: '5621',
      img: 'https://picsum.photos/seed/suantang/800/600',
      isHot: true
    },
    { 
      id: 4, 
      name: '树厨·贵州菜(观山湖店)', 
      heat: '96.5', 
      score: '4.8', 
      dist: '1.2公里', 
      type: '创意黔菜', 
      price: '¥115/人', 
      tags: ['环境优雅', '折耳根炒腊肉', '宫保鸡丁'],
      comment: '环境很好适合宴请，把传统的贵州菜做得非常精致，口味改良过，外地人也能接受。',
      commentCount: '1842',
      img: 'https://picsum.photos/seed/shuchu/800/600',
      isHot: false
    }
  ];

  // 必去景点
  const storeListAttractions = [
    { 
      id: 5, 
      name: '甲秀楼', 
      heat: '99.9', 
      score: '4.8', 
      dist: '5.5公里', 
      type: '地标建筑', 
      price: '免费', 
      tags: ['贵阳标志', '南明河畔', '夜景极佳'],
      comment: '贵阳的绝对地标，建在河中的巨石上，晚上亮灯后金碧辉煌，周边散步非常惬意。',
      commentCount: '12w+',
      img: 'https://picsum.photos/seed/jiaxiu/800/600',
      isHot: true
    },
    { 
      id: 6, 
      name: '黔灵山公园', 
      heat: '98.7', 
      score: '4.6', 
      dist: '2.3公里', 
      type: '自然公园', 
      price: '¥5/人', 
      tags: ['看野生猕猴', '弘福寺祈福', '性价比之王'],
      comment: '5块钱的门票简直是做慈善，山清水秀，满山的猴子非常有趣（注意安全），还能爬山俯瞰贵阳。',
      commentCount: '8.5w+',
      img: 'https://picsum.photos/seed/qianling/800/600',
      isHot: true
    }
  ];

  // 必住酒店
  const storeListHotels = [
    { 
      id: 7, 
      name: '贵阳安纳塔拉度假酒店', 
      heat: '95.1', 
      score: '4.8', 
      dist: '28公里', 
      type: '豪华度假酒店', 
      price: '¥1200起', 
      tags: ['双龙镇', '泰式风情', '私汤温泉'],
      comment: '隐藏在山水间的避世秘境，服务无微不至，东南亚风情的建筑拍照很出片，度假首选。',
      commentCount: '3412',
      img: 'https://picsum.photos/seed/hotel1/800/600',
      isHot: true
    },
    { 
      id: 8, 
      name: '贵阳观山湖万丽酒店', 
      heat: '94.3', 
      score: '4.7', 
      dist: '1.5公里', 
      type: '高档型酒店', 
      price: '¥650起', 
      tags: ['观山湖公园旁', '交通便利', '全景落地窗'],
      comment: '地理位置极佳，就在观山湖旁边，房间视野开阔，早餐非常丰富，有很多贵阳特色小吃。',
      commentCount: '5120',
      img: 'https://picsum.photos/seed/hotel2/800/600',
      isHot: false
    }
  ];

  // 饮品甜点
  const storeListDrinks = [
    { 
      id: 9, 
      name: '去茶山(喷水池店)', 
      heat: '96.8', 
      score: '4.9', 
      dist: '6.8公里', 
      type: '本土茶饮', 
      price: '¥22/人', 
      tags: ['贵州特产茶', '鲜奶茶', '排队王'],
      comment: '贵阳本土的茶饮之光！用的是贵州本地好茶，奶味和茶味融合得恰到好处，每次来都要喝。',
      commentCount: '4512',
      img: 'https://picsum.photos/seed/drink1/800/600',
      isHot: true
    },
    { 
      id: 10, 
      name: '雷家豆腐圆子', 
      heat: '93.5', 
      score: '4.6', 
      dist: '7.1公里', 
      type: '特色小吃', 
      price: '¥15/人', 
      tags: ['百年老字号', '外酥里嫩', '折耳根蘸水'],
      comment: '逛街必吃的小零食，豆腐圆子炸得外壳酥脆，里面像豆腐脑一样嫩，灌满蘸水一口吃下绝了！',
      commentCount: '8912',
      img: 'https://picsum.photos/seed/drink2/800/600',
      isHot: false
    }
  ];

  // 根据 activeNav 动态选择渲染的数据源
  const getListData = () => {
    switch (activeNav) {
      case '必吃美食':
      case '多次前往':
      case '主题餐厅':
        return storeListFood;
      case '必去景点':
      case '本地人爱去':
      case '热门':
        return storeListAttractions;
      case '必住酒店':
        return storeListHotels;
      case '饮品甜点':
        return storeListDrinks;
      case '烟火小店':
      case '飙升':
      default:
        return storeListSnacks;
    }
  };

  const currentList = getListData();

  return (
    <div className="h-full bg-white flex flex-col relative font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-4 pt-12 pb-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate('home')} className="p-1 -ml-1 text-gray-900 active:scale-95 transition-transform">
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center text-sm font-bold text-gray-900">
            贵阳市 <ChevronDown size={14} className="ml-0.5" />
          </div>
        </div>
        
        <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
          <div className="text-[17px] font-black text-gray-900 tracking-wide">
            扫街榜
          </div>
          <div className="text-[9px] font-bold mt-0.5 flex items-center gap-1 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-600 px-1.5 py-[1px] rounded-sm">
            <span>黄小西</span>
            <span className="text-orange-400/60 scale-75">X</span>
            <span>高德地图</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-900">
          <Search size={20} />
          <Share2 size={20} />
          <MoreHorizontal size={20} />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-[88px] bg-[#F7F8FA] overflow-y-auto scrollbar-hide flex flex-col pb-20">
            <div className="p-3 text-sm font-bold text-gray-900 flex items-center justify-center gap-1 border-b border-gray-200/50 bg-white sticky top-0 z-10">
              全城 <ChevronDown size={12} />
            </div>
            
            {sideNav.map((item, idx) => {
              if (item.type === 'header') {
                return (
                  <div key={idx} className="mt-6 mb-3 flex flex-col items-center justify-center relative select-none">
                    {/* 背景装饰：类似印章或小旗帜的底底 */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-8 bg-orange-100/50 rounded-[4px] -z-10 skew-x-[-10deg]"></div>
                    
                    {/* 主标题 */}
                    <div className="text-[14px] font-black text-orange-600 tracking-wide flex items-center gap-1 drop-shadow-sm">
                      {item.title}
                    </div>
                    
                    {/* 副标题 */}
                    {item.subtitle && (
                      <div className="text-[9px] text-orange-500 font-medium mt-0.5 bg-orange-50 px-1.5 py-[1px] rounded-sm border border-orange-100/80">
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = activeNav === item.id;
              
              if (isActive) {
                return (
                  <div 
                    key={idx}
                    className="py-2 px-1.5 text-center cursor-default relative"
                  >
                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full py-1.5 shadow-sm shadow-orange-200/50 flex flex-col items-center justify-center transition-all">
                      <span className="text-[12px] font-bold">{item.title}</span>
                      {item.subtitle && <span className="text-[9px] font-medium text-white/90 mt-[1px]">{item.subtitle}</span>}
                    </div>
                  </div>
                );
              }

              return (
                <div 
                  key={idx}
                  onClick={() => setActiveNav(item.id as string)}
                  className="py-2.5 px-2 text-center cursor-pointer relative group"
                >
                  <div className="flex flex-col items-center justify-center transition-colors group-hover:text-orange-500">
                    <span className="text-[12px] font-medium text-gray-600 group-hover:text-orange-500 transition-colors">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <div className="text-[9px] text-gray-400 mt-0.5 relative inline-flex items-center justify-center w-full">
                        <div className="absolute left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gray-200 -z-10"></div>
                        <span className="bg-[#F7F8FA] px-1 relative z-10 transition-colors group-hover:text-orange-400">
                          {item.subtitle}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            <div className="mt-auto p-3">
              <div className="bg-gray-900 text-orange-200 text-[11px] font-bold py-1.5 px-2 rounded-full flex items-center justify-between shadow-sm whitespace-nowrap">
                <span>我的榜单</span>
                <ChevronRight size={12} className="shrink-0" />
              </div>
            </div>
          </div>

        {/* Right Content */}
        <div className="flex-1 bg-white overflow-y-auto scrollbar-hide pb-10">
          
          {/* Top Tags */}
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm px-3 py-3 border-b border-gray-50">
            {activeNav === '扫街广场' ? (
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                {topTagsSquare.map((tag, idx) => (
                  <div 
                    key={idx}
                    className={`shrink-0 px-3 py-1.5 rounded text-[12px] font-bold transition-colors ${
                      idx === 0 ? 'bg-orange-50 text-orange-600' : 'bg-[#F7F8FA] text-gray-700'
                    }`}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                {topTagsList.map((tag, idx) => (
                  <div 
                    key={idx}
                    className="shrink-0 px-3 py-1.5 rounded text-[12px] font-bold transition-colors bg-[#F7F8FA] text-gray-700 flex items-center gap-1"
                  >
                    {tag} <ChevronDown size={12} />
                  </div>
                ))}
                <div className="shrink-0 ml-auto text-xs text-gray-400 font-medium">
                  精选49个地点
                </div>
              </div>
            )}
          </div>

          <div className={`p-3 space-y-4 ${activeNav === '扫街广场' ? 'bg-white' : 'bg-[#F5F6F8]'}`}>
            
            {activeNav === '扫街广场' ? (
              <>
                {/* 附近好店 */}
                <section>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-black text-gray-900 flex items-center gap-1">
                      附近好店 <ChevronRight size={16} className="text-gray-400" />
                    </h2>
                  </div>
                  
                  <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-3 px-3 pb-2">
                    {nearbyStores.map(store => (
                      <div key={store.id} className="w-[140px] shrink-0">
                        <div className="w-full h-[140px] rounded-xl overflow-hidden relative mb-2 shadow-sm">
                          <img src={store.img} className="w-full h-full object-cover" alt={store.name} />
                          <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/80 to-transparent">
                            <span className="text-white text-[12px] font-black tracking-wide">{store.score}</span>
                          </div>
                        </div>
                        <div className="text-[13px] font-bold text-gray-900 truncate mb-1">{store.name}</div>
                        <div className="text-[10px] text-orange-600 bg-orange-50 px-1 py-0.5 rounded truncate mb-1 inline-block max-w-full">
                          {store.rankTag}
                        </div>
                        <div className="text-[11px] text-gray-500 flex items-center gap-1 truncate">
                          <span>{store.dist}</span>
                          <span>{store.type}</span>
                          <span>{store.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 每日推荐 */}
                <section className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-black text-gray-900">每日推荐</h2>
                  </div>

                  <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-3 px-3 pb-4">
                    {dailyRecommends.map(rec => (
                      <div key={rec.id} className="w-[260px] shrink-0 bg-[#F7F8FA] rounded-2xl overflow-hidden">
                        {/* Header Image */}
                        <div className="w-full h-[100px] relative">
                          <img src={rec.img} className="w-full h-full object-cover" alt={rec.title} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute bottom-2 left-3">
                            <div className="text-white text-[16px] font-black mb-0.5 drop-shadow-md">{rec.title}</div>
                            <div className="text-white/90 text-[10px] drop-shadow-md">{rec.subtitle}</div>
                          </div>
                        </div>
                        
                        {/* List Items */}
                        <div className="p-2 space-y-2">
                          {rec.items.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-2 flex items-center gap-2 shadow-sm">
                              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 relative">
                                <img src={item.img} className="w-full h-full object-cover" />
                                <div className="absolute top-0 left-0 bg-black/40 text-white text-[10px] font-black px-1 py-0.5 rounded-br-lg">
                                  {item.rank}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[13px] font-bold text-gray-900 truncate mb-0.5">{item.name}</div>
                                <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                  <span>{item.dist}</span>
                                  <span>{item.hot}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Bottom Title */}
                <div className="pt-2 mt-4 border-t border-gray-100">
                  <h2 className="text-[16px] font-black text-gray-900 flex items-center justify-between">
                    被热评种草的宝藏好去处 <ChevronRight size={16} className="text-gray-400" />
                  </h2>
                </div>
              </>
            ) : (
              /* Store List (List View) */
              <>
                {currentList.map((store, index) => (
                  <div key={store.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                {/* Big Image */}
                <div className="w-full h-[220px] relative">
                  <img src={store.img} className="w-full h-full object-cover" alt={store.name} />
                  
                  {/* Top Right Ranking Badge */}
                  <div className="absolute top-3 right-3">
                    <img src="https://picsum.photos/seed/rankbadge/100/100" className="w-8 h-8 rounded-full border border-white/50 shadow-sm" alt="rank" />
                    <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-[9px] font-bold px-1.5 rounded shadow-sm border border-white">
                      2.7w+
                    </div>
                  </div>

                  {/* Hot Badge */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Info Area */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-1 text-[13px] font-bold text-gray-900">
                      <span className="text-blue-500">▲</span> 全年热度值{store.heat}
                    </div>
                    <div className="text-[13px] font-bold text-gray-900 flex items-center gap-0.5">
                      <span className="text-blue-500 text-[10px]">综合评分</span>
                      <span className="text-blue-500 text-[16px]">{store.score}</span>
                      <ChevronRight size={14} className="text-gray-400" />
                    </div>
                  </div>

                  <h3 className="text-[18px] font-black text-gray-900 mb-1">{store.name}</h3>
                  
                  <div className="text-[12px] text-gray-500 mb-2">
                    {store.type} {store.price} <span className="ml-1">{store.dist}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {store.tags.map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 border border-gray-200 text-gray-500 text-[10px] rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="bg-[#FDFBF7] rounded-xl p-2.5 flex items-start gap-2 relative">
                    <div className="text-orange-300 font-serif text-lg leading-none shrink-0 mt-0.5">“</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-orange-600/90 font-medium leading-relaxed mb-1">
                        {store.comment}
                      </p>
                      <div className="flex items-center justify-end gap-1">
                        <div className="flex -space-x-1.5">
                          <img src="https://i.pravatar.cc/100?img=21" className="w-4 h-4 rounded-full border border-white" />
                          <img src="https://i.pravatar.cc/100?img=22" className="w-4 h-4 rounded-full border border-white" />
                        </div>
                        <span className="text-[10px] text-gray-400">{store.commentCount}人也在说 <ChevronRight size={10} className="inline" /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}