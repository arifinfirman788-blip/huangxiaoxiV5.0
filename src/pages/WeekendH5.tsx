import React, { useState } from 'react';
import { ChevronDown, Search, MoreHorizontal, Minus, Circle, SlidersHorizontal, Plus, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Page } from '../types';

export default function WeekendH5({ onNavigate }: { onNavigate: (page: Page, data?: any) => void }) {
  const [activeTab, setActiveTab] = useState('全部');
  const tabs = ['比赛', '全部', '遛遛商场', '城市运动', '去户外'];

  const communityCategories = [
    { title: '看展览', count: '13091在玩', img: 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=200&q=80' },
    { title: '羽毛球', count: '155717在玩', img: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=200&q=80' },
    { title: '看电影', count: '64232在玩', img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&q=80' },
    { title: 'Live现场', count: '51182在玩', img: 'https://images.unsplash.com/photo-1540039155733-d77ef2c62dc2?w=200&q=80' }
  ];

  const superPlayItems = [
    { title: '网球', time: '周四5.14 09:00', users: '和94人玩', author: 'charlie', img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=300&q=80', color: 'bg-emerald-400' },
    { title: '飞盘', time: '周四5.14 10:00', users: '和0人玩', author: '聪一', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80', color: 'bg-emerald-400' },
    { title: 'cos委托', time: '周五5.15 14:00', users: '和0人玩', author: '极夜狐', img: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=300&q=80', color: 'bg-emerald-400' }
  ];

  return (
    <div className="h-full bg-[#F5F8F5] flex flex-col relative font-sans overflow-y-auto scrollbar-hide">
      {/* Header - WeChat Mini Program Style */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-[#E8F7F0]/90 backdrop-blur-md px-4 pt-12 pb-3 flex items-center gap-3">
        <div 
          className="flex items-center gap-1 cursor-pointer shrink-0 text-gray-900 font-bold"
          onClick={() => onNavigate('home')}
        >
          贵阳 <ChevronDown size={14} className="mt-0.5" />
        </div>
        
        <div className="flex-1 bg-white rounded-full h-8 flex items-center px-3 gap-2 shadow-sm border border-gray-100">
          <Search size={14} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="搜索俱乐部、活动..." 
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-full h-8 px-3 gap-3 border border-gray-200/50 shadow-sm shrink-0">
          <MoreHorizontal size={16} className="text-gray-700 cursor-pointer" />
          <div className="w-px h-3 bg-gray-300" />
          <Minus size={16} className="text-gray-700 cursor-pointer" />
          <div className="w-px h-3 bg-gray-300" />
          <Circle size={14} className="text-gray-700 cursor-pointer" />
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 pb-10">
        
        {/* 会玩社区 */}
        <div className="mt-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-end gap-2">
              <h2 className="text-[18px] font-black italic relative">
                <span className="relative z-10 text-gray-900">会玩社区</span>
                <div className="absolute bottom-1 left-0 right-0 h-2 bg-emerald-400 -z-0" />
              </h2>
              <span className="text-xs text-gray-400 font-medium mb-0.5">2500万人在玩</span>
            </div>
            <div className="text-xs text-gray-400 flex items-center font-medium cursor-pointer">
              去看看<ChevronRight size={14} />
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {communityCategories.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-full aspect-square rounded-[14px] overflow-hidden mb-1.5 shadow-sm">
                  <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
                </div>
                <div className="text-[12px] font-bold text-gray-900 mb-0.5">{item.title}</div>
                <div className="text-[10px] text-gray-400">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 超会玩 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[18px] font-black italic relative">
              <span className="relative z-10 text-gray-900">超会玩</span>
              <div className="absolute bottom-1 left-0 right-0 h-2 bg-emerald-400 -z-0" />
            </h2>
            <div className="text-xs text-gray-400 flex items-center font-medium cursor-pointer">
              去看看<ChevronRight size={14} />
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
            {superPlayItems.map((item, idx) => (
              <div key={idx} className="w-[140px] h-[190px] shrink-0 rounded-[16px] overflow-hidden relative shadow-sm">
                <img src={item.img} className="w-full h-full object-cover" alt={item.title} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
                
                <div className="absolute top-2 left-2 text-[10px] text-white font-bold tracking-wide">
                  {item.time}
                </div>
                
                <div className="absolute bottom-2 left-0 right-0 px-2 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1 text-white font-bold text-xs drop-shadow-md">
                    {item.author} <span className="text-pink-400 text-[10px]">♀</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`${item.color} text-gray-900 text-[10px] font-black px-1.5 py-0.5 rounded-sm`}>
                      {item.title}
                    </span>
                    <span className="bg-gray-900/80 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-r-sm backdrop-blur-sm">
                      {item.users}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Filter Tabs Sticky */}
      <div className="sticky top-[88px] z-40 bg-[#F5F8F5] px-4 py-2 flex items-center gap-4 border-b border-gray-200/50">
        <div className="flex flex-1 gap-5 overflow-x-auto scrollbar-hide text-sm font-bold text-gray-400">
          {tabs.map(tab => (
            <div 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 cursor-pointer relative pb-1 ${activeTab === tab ? 'text-gray-900 text-[15px]' : ''}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full" />
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 shrink-0 text-gray-900 border-l border-gray-200 pl-3">
          <SlidersHorizontal size={18} />
          <Plus size={20} />
        </div>
      </div>

      {/* Feed List */}
      <div className="px-4 py-4 space-y-4">
        {/* Card 1 */}
        <div className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-50">
          <h3 className="text-[17px] font-black text-gray-900 mb-2">五人场飞盘体验局（新老混合局）</h3>
          <div className="flex items-center gap-2 mb-3">
            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80" className="w-5 h-5 rounded-full" />
            <span className="text-xs text-gray-500 font-medium">坐标公园Xpark</span>
            <span className="text-[11px] text-emerald-500 font-bold ml-1">#853人玩过 #飞盘</span>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">报名中</span>
            <span className="text-[12px] text-gray-900 font-bold">周二05.12 19:00 | 3.3km X-PARK坐标公园</span>
          </div>

          <div className="flex gap-1.5 mb-4 overflow-hidden rounded-[12px]">
            <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=200&q=80" className="w-1/3 aspect-square object-cover" />
            <img src="https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=200&q=80" className="w-1/3 aspect-square object-cover" />
            <img src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=200&q=80" className="w-1/3 aspect-square object-cover" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <img src="https://i.pravatar.cc/100?img=11" className="w-6 h-6 rounded-full border border-white relative z-40 grayscale" />
                <img src="https://i.pravatar.cc/100?img=12" className="w-6 h-6 rounded-full border border-white relative z-30 grayscale" />
                <img src="https://i.pravatar.cc/100?img=13" className="w-6 h-6 rounded-full border border-white relative z-20" />
                <img src="https://i.pravatar.cc/100?img=14" className="w-6 h-6 rounded-full border border-white relative z-10" />
              </div>
              <span className="text-xs text-gray-500">14人已上车</span>
            </div>
            <button className="bg-[#1A1A1A] text-white px-6 py-2 rounded-full text-sm font-bold active:scale-95 transition-transform">
              上车
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-50">
          <h3 className="text-[17px] font-black text-gray-900 mb-2">贵阳万象城首届西广场运动会</h3>
          <div className="flex items-center gap-2 mb-3">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&q=80" className="w-5 h-5 rounded-full" />
            <span className="text-xs text-gray-500 font-medium">葫芦运动馆</span>
            <span className="text-[11px] text-emerald-500 font-bold ml-1">#&lt;100人玩过 #体能健身</span>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-gray-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">已结束</span>
            <span className="text-[12px] text-gray-900 font-bold">周六04.18 09:00 | 5.4km 贵阳万象城</span>
          </div>

          <div className="flex gap-1.5 mb-4 overflow-hidden rounded-[12px]">
            <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80" className="w-1/3 aspect-[3/4] object-cover" />
            <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=200&q=80" className="w-1/3 aspect-[3/4] object-cover" />
            <img src="https://images.unsplash.com/photo-1544531585-9847b68c8c86?w=200&q=80" className="w-1/3 aspect-[3/4] object-cover" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <img src="https://i.pravatar.cc/100?img=15" className="w-6 h-6 rounded-full border border-white relative z-40" />
                <img src="https://i.pravatar.cc/100?img=16" className="w-6 h-6 rounded-full border border-white relative z-30" />
                <img src="https://i.pravatar.cc/100?img=17" className="w-6 h-6 rounded-full border border-white relative z-20" />
                <img src="https://i.pravatar.cc/100?img=18" className="w-6 h-6 rounded-full border border-white relative z-10" />
              </div>
              <span className="text-xs text-gray-500">22人已上车</span>
            </div>
            <button className="bg-[#1A1A1A] text-emerald-400 px-5 py-2 rounded-full text-sm font-bold active:scale-95 transition-transform">
              查看影集
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}