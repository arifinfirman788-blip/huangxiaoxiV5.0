import React from 'react';
import { ChevronLeft, CloudRain, Sun, Wind } from 'lucide-react';
import { Page } from '../types';

export default function WeatherDetail({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="h-full bg-gradient-to-b from-blue-400 to-blue-200 text-white flex flex-col">
      <div className="pt-12 pb-4 px-4 flex items-center justify-between shrink-0">
        <button onClick={() => onNavigate('trip-list')} className="p-2 -ml-2"><ChevronLeft size={28} /></button>
        <span className="font-bold text-lg">贵阳市</span>
        <div className="w-8"></div>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-8">
        <div className="text-center mt-8 mb-12">
          <div className="text-[100px] font-light leading-none mb-4">24°</div>
          <div className="text-xl font-medium mb-1">多云转晴</div>
          <div className="text-sm opacity-90">最高 26° 最低 18°</div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-5 mb-4">
          <div className="text-xs font-bold opacity-80 border-b border-white/20 pb-3 mb-4">24小时预报</div>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex flex-col items-center gap-3 shrink-0">
                <span className="text-sm font-medium">{14 + i}:00</span>
                {i % 2 === 0 ? <CloudRain size={24} /> : <Sun size={24} />}
                <span className="text-lg font-bold">{24 - i}°</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-5">
          <div className="text-xs font-bold opacity-80 border-b border-white/20 pb-3 mb-4">7天预报</div>
          <div className="space-y-4">
            {['今天', '明天', '周三', '周四', '周五'].map((day, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="w-12 text-sm font-medium">{day}</span>
                <div className="flex gap-2 text-white/80"><Sun size={18} /></div>
                <div className="flex gap-4 text-sm font-bold w-20 justify-end">
                  <span>18°</span>
                  <span className="opacity-60">26°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}