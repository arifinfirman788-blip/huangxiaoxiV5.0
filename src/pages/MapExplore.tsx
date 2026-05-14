import React, { useState } from 'react';
import { ChevronLeft, MapPin, Sparkles, Filter, Heart, MessageCircle } from 'lucide-react';
import { Page } from '../types';

interface MapExploreProps {
  onNavigate: (page: Page, data?: any) => void;
}

export default function MapExplore({ onNavigate }: MapExploreProps) {
  const [activeRegion, setActiveRegion] = useState<string>('全省');

  // Simulated map regions for Guizhou
  const regions = [
    { id: 'guiyang', name: '贵阳', top: '40%', left: '45%' },
    { id: 'qiandongnan', name: '黔东南', top: '55%', left: '75%' },
    { id: 'anshun', name: '安顺', top: '50%', left: '30%' },
    { id: 'zunyi', name: '遵义', top: '25%', left: '48%' },
    { id: 'tongren', name: '铜仁', top: '20%', left: '70%' },
    { id: 'bijie', name: '毕节', top: '35%', left: '20%' },
    { id: 'qianxinan', name: '黔西南', top: '70%', left: '40%' },
    { id: 'qiannan', name: '黔南', top: '65%', left: '60%' },
    { id: 'liupanshui', name: '六盘水', top: '55%', left: '15%' },
  ];

  // Simulated beautiful masonry content
  const contentFeed = [
    {
      id: 1,
      region: 'guiyang',
      title: '青云市集：赛博朋克与烟火气',
      author: '贵阳土著小王',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
      img: 'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?w=500&q=80',
      likes: 1205,
      height: 'h-64'
    },
    {
      id: 2,
      region: 'qiandongnan',
      title: '西江千户苗寨：万家灯火',
      author: '行走的背包客',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
      img: 'https://images.unsplash.com/photo-1523368749929-6b2bf370dbf8?w=500&q=80',
      likes: 3402,
      height: 'h-48'
    },
    {
      id: 3,
      region: 'anshun',
      title: '黄果树大瀑布：亚洲第一瀑布',
      author: '自然探索者',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80',
      img: 'https://images.unsplash.com/photo-1544883639-653a91fcc0ea?w=500&q=80',
      likes: 890,
      height: 'h-56'
    },
    {
      id: 4,
      region: 'qiandongnan',
      title: '榕江村超：最纯粹的热爱',
      author: '球迷阿张',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80',
      img: 'https://images.unsplash.com/photo-1518605368461-1ee7e53c2a2a?w=500&q=80',
      likes: 5600,
      height: 'h-72'
    },
    {
      id: 5,
      region: 'zunyi',
      title: '赤水丹霞：红色星球的眼泪',
      author: '摄影师老李',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&q=80',
      likes: 420,
      height: 'h-48'
    },
    {
      id: 6,
      region: 'guiyang',
      title: '观山湖公园：城市绿肺',
      author: '周末散步',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80',
      likes: 750,
      height: 'h-56'
    }
  ];

  const filteredFeed = activeRegion === '全省' 
    ? contentFeed 
    : contentFeed.filter(item => regions.find(r => r.name === activeRegion)?.id === item.region);

  // Masonry logic for 2 columns
  const col1 = filteredFeed.filter((_, i) => i % 2 === 0);
  const col2 = filteredFeed.filter((_, i) => i % 2 !== 0);

  return (
    <div className="h-full bg-[#FAF9F5] flex flex-col relative overflow-hidden font-sans">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-20 px-4 pt-14 pb-4 flex justify-between items-center bg-gradient-to-b from-[#FAF9F5]/90 to-transparent">
        <button 
          className="w-10 h-10 bg-white/80 backdrop-blur shadow-sm rounded-full flex items-center justify-center text-gray-800 active:scale-95 transition-transform"
          onClick={() => onNavigate('home')}
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-[18px] font-bold text-gray-800 font-serif tracking-wider">探索·多彩贵州</h1>
          <p className="text-[11px] text-gray-500 tracking-widest mt-0.5">手绘漫游地图</p>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Interactive Hand-drawn Map Section */}
        <div className="relative w-full h-[380px] bg-[#EAF2ED] pt-20 overflow-hidden flex-shrink-0">
          {/* Decorative Map Background (Hand-drawn aesthetic) */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232C3E50' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          
          <div className="absolute inset-0 top-10 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full opacity-30">
              {/* Very abstract province outline */}
              <path d="M150,50 Q200,30 250,60 T350,150 Q360,200 320,250 T280,350 Q200,380 150,330 T50,250 Q30,180 80,120 T150,50 Z" fill="none" stroke="#2C3E50" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>

          {/* Region Markers */}
          {regions.map((region) => (
            <button
              key={region.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center"
              style={{ top: region.top, left: region.left }}
              onClick={() => setActiveRegion(activeRegion === region.name ? '全省' : region.name)}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300
                ${activeRegion === region.name 
                  ? 'bg-orange-500 text-white scale-110' 
                  : 'bg-white text-gray-600 group-hover:scale-105'
                }
              `}>
                <MapPin size={16} className={activeRegion === region.name ? 'fill-current' : ''} />
              </div>
              <span className={`
                mt-1.5 px-2 py-0.5 rounded text-[11px] font-bold tracking-wider transition-colors
                ${activeRegion === region.name 
                  ? 'bg-orange-500 text-white shadow-sm' 
                  : 'bg-white/80 backdrop-blur text-gray-700'
                }
              `}>
                {region.name}
              </span>
            </button>
          ))}
          
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button 
              className={`px-4 py-1.5 rounded-full text-[12px] font-bold shadow-sm transition-colors ${activeRegion === '全省' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveRegion('全省')}
            >
              全省概览
            </button>
          </div>
        </div>

        {/* Content Feed Section */}
        <div className="bg-[#FAF9F5] -mt-4 relative z-10 rounded-t-3xl pt-6 px-4 pb-20 min-h-screen">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[18px] font-bold text-gray-800">
              {activeRegion === '全省' ? '发现新奇' : `探索${activeRegion}`}
            </h2>
            <button className="flex items-center gap-1 text-gray-500 text-[13px] bg-white px-3 py-1.5 rounded-full shadow-sm">
              <Filter size={14} /> 筛选
            </button>
          </div>

          {/* Masonry Layout */}
          <div className="flex gap-3">
            {/* Column 1 */}
            <div className="flex-1 flex flex-col gap-3">
              {col1.map((item) => (
                <FeedCard key={item.id} item={item} onNavigate={onNavigate} />
              ))}
            </div>
            {/* Column 2 */}
            <div className="flex-1 flex flex-col gap-3">
              {col2.map((item) => (
                <FeedCard key={item.id} item={item} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Map Generation / Posting */}
      <button 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3.5 rounded-full shadow-xl flex items-center gap-2 active:scale-95 transition-transform z-50"
        onClick={() => onNavigate('chat', { query: `我想定制${activeRegion === '全省' ? '贵州' : activeRegion}的深度游攻略` })}
      >
        <Sparkles size={18} className="text-yellow-400" />
        <span className="font-bold text-[15px]">AI 定制行程</span>
      </button>
    </div>
  );
}

function FeedCard({ item, onNavigate }: { key?: string | number, item: any, onNavigate: (page: Page, data?: any) => void }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.03)] group relative">
      <div className={`w-full ${item.height} relative`}>
        <img src={item.img} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Floating Ask AI Button */}
        <button 
          className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('chat', { 
              agentTitle: '小西管家', 
              initialMessage: `你好！我对“${item.title}”很感兴趣，能帮我介绍一下或者安排行程吗？` 
            });
          }}
        >
          <Sparkles size={14} />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-[13px] text-gray-800 leading-snug line-clamp-2">{item.title}</h3>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <img src={item.avatar} alt={item.author} className="w-5 h-5 rounded-full object-cover" referrerPolicy="no-referrer" />
            <span className="text-[10px] text-gray-500 truncate max-w-[60px]">{item.author}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Heart size={12} />
            <span className="text-[10px] font-medium">{item.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
