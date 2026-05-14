import React from 'react';
import { ChevronLeft, AlertTriangle, Car, Navigation } from 'lucide-react';
import { Page } from '../types';

export default function TrafficDetail({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="bg-white pt-12 pb-4 px-4 flex items-center justify-between shrink-0 shadow-sm relative z-10">
        <button onClick={() => onNavigate('trip-list')} className="p-2 -ml-2 text-gray-900"><ChevronLeft size={28} /></button>
        <span className="font-bold text-lg text-gray-900">路况详情</span>
        <div className="w-8"></div>
      </div>
      <div className="flex-1 relative overflow-hidden flex flex-col">
        <div className="h-1/2 relative bg-gray-200">
          <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
            <AlertTriangle size={14} /> 拥堵 2.5km
          </div>
        </div>
        <div className="flex-1 bg-white rounded-t-3xl -mt-6 relative z-10 p-6 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] overflow-y-auto">
          <h3 className="font-bold text-gray-900 mb-4">实时路况播报</h3>
          <div className="space-y-4">
            <div className="border border-red-100 bg-red-50 p-4 rounded-2xl flex gap-4">
              <div className="w-10 h-10 bg-red-100 text-red-500 rounded-full flex items-center justify-center shrink-0"><Car size={20} /></div>
              <div>
                <h4 className="font-bold text-red-900 text-sm mb-1">沪昆高速 贵阳段</h4>
                <p className="text-xs text-red-700 mb-2">前方发生交通事故，预计拥堵 20 分钟。</p>
                <button className="text-[10px] bg-red-500 text-white px-3 py-1.5 rounded-full font-bold">查看避堵路线</button>
              </div>
            </div>
            <div className="border border-green-100 bg-green-50 p-4 rounded-2xl flex gap-4">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0"><Navigation size={20} /></div>
              <div>
                <h4 className="font-bold text-green-900 text-sm mb-1">黄果树景区专线</h4>
                <p className="text-xs text-green-700">全线畅通，建议保持安全车速。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}