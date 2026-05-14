import React, { useState } from 'react';
import { ChevronLeft, Check, Sun, Calendar, Clock, MapPin, Footprints, Ticket, Car, Plus } from 'lucide-react';
import { Page } from '../types';
import { WidgetCategory, WidgetSize, AVAILABLE_WIDGETS } from './TripList';

interface WidgetDetailProps {
  onNavigate: (page: Page) => void;
  data?: {
    category: WidgetCategory;
  };
}

export default function WidgetDetail({ onNavigate, data }: WidgetDetailProps) {
  const category = data?.category || 'weather';
  const [activeWidgets, setActiveWidgets] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('hx_active_widgets') || '[]');
    } catch {
      return [];
    }
  });

  const handleToggleWidget = (id: string) => {
    let newWidgets = [...activeWidgets];
    if (newWidgets.includes(id)) {
      newWidgets = newWidgets.filter(w => w !== id);
    } else {
      newWidgets.push(id);
    }
    setActiveWidgets(newWidgets);
    localStorage.setItem('hx_active_widgets', JSON.stringify(newWidgets));
    (window as any).showGlobalToast?.('success', '桌面组件已更新');
  };

  const getCategoryInfo = () => {
    switch(category) {
      case 'weather': return { title: '天气组件', icon: <Sun size={24} className="text-blue-500" />, desc: '实时掌握目的地天气变化，智能提醒出行装备' };
      case 'map': return { title: '活点地图', icon: <MapPin size={24} className="text-orange-500" />, desc: '查看附近的好友、热门打卡地及拥挤程度' };
      case 'calendar': return { title: '活动日历', icon: <Calendar size={24} className="text-orange-500" />, desc: '贵州全省赛事、演出、民俗活动一手掌握' };
      case 'countdown': return { title: '行程倒计时', icon: <Clock size={24} className="text-indigo-500" />, desc: '倒数每一次期待的旅程，让等待也变得美好' };
      case 'traffic': return { title: '实时路况', icon: <Car size={24} className="text-blue-500" />, desc: '高速、景区周边路况实时播报，避开拥堵' };
      case 'coupon': return { title: '每日特惠', icon: <Ticket size={24} className="text-red-500" />, desc: '专属特惠盲盒，每天都有新惊喜' };
      case 'footprint': return { title: '旅行足迹', icon: <Footprints size={24} className="text-emerald-500" />, desc: '点亮贵州地图，记录你的每一个精彩瞬间' };
      default: return { title: '组件详情', icon: <Sun size={24} />, desc: '自定义你的出行工具箱' };
    }
  };

  const info = getCategoryInfo();
  const relatedWidgets = AVAILABLE_WIDGETS.filter(w => w.category === category);

  return (
    <div className="h-full bg-gray-50 flex flex-col relative">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center shadow-sm relative z-10">
        <button onClick={() => onNavigate('trip-list')} className="p-2 -ml-2 text-gray-900">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-gray-900 pr-6">{info.title}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {/* Intro Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
            {info.icon}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h2>
          <p className="text-sm text-gray-500 leading-relaxed">{info.desc}</p>
        </div>

        <h3 className="font-bold text-gray-900 mb-4 px-1">可用尺寸及样式</h3>

        {/* Widget Variants */}
        <div className="space-y-4">
          {relatedWidgets.map(widget => {
            const isAdded = activeWidgets.includes(widget.id);
            return (
              <div key={widget.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between border border-transparent hover:border-indigo-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs ${
                    widget.size === '2x2' ? 'bg-blue-50 text-blue-600' :
                    widget.size === '2x1' ? 'bg-green-50 text-green-600' :
                    'bg-orange-50 text-orange-600'
                  }`}>
                    {widget.size}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-0.5">{widget.title}</div>
                    <div className="text-xs text-gray-400">尺寸: {widget.size}</div>
                  </div>
                </div>

                <button 
                  onClick={() => handleToggleWidget(widget.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isAdded ? 'bg-gray-100 text-gray-400' : 'bg-indigo-500 text-white shadow-md shadow-indigo-200'
                  }`}
                >
                  {isAdded ? <Check size={16} /> : <Plus size={16} />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
