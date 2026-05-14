import React from 'react';
import { ChevronLeft, Ticket, AlertCircle } from 'lucide-react';
import { Page } from '../types';

export default function CouponDetail({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div className="h-full bg-[#FF4B4B] flex flex-col">
      <div className="pt-12 pb-4 px-4 flex items-center justify-between shrink-0 text-white relative z-10">
        <button onClick={() => onNavigate('trip-list')} className="p-2 -ml-2"><ChevronLeft size={28} /></button>
        <span className="font-bold text-lg">特惠盲盒</span>
        <div className="w-8"></div>
      </div>
      
      <div className="flex-1 px-6 pb-12 pt-6 flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#FF4B4B] to-transparent pointer-events-none z-0" />
        
        <div className="bg-white rounded-3xl w-full flex-1 shadow-2xl relative z-10 flex flex-col overflow-hidden">
          <div className="bg-[#FFF4F4] p-6 text-center border-b-2 border-dashed border-red-200 relative">
            <div className="absolute -left-3 -bottom-3 w-6 h-6 bg-[#FF4B4B] rounded-full"></div>
            <div className="absolute -right-3 -bottom-3 w-6 h-6 bg-[#FF4B4B] rounded-full"></div>
            
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Ticket size={32} />
            </div>
            <h2 className="text-2xl font-black text-red-600 mb-1">酸汤鱼50元代金券</h2>
            <p className="text-xs text-gray-500">满 200 元可用 · 仅限老凯俚酸汤鱼指定门店</p>
          </div>
          
          <div className="flex-1 p-8 flex flex-col items-center justify-center gap-6">
            <div className="w-48 h-48 bg-gray-100 rounded-2xl flex items-center justify-center border-4 border-gray-50">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HX20260507ABC" alt="QR" className="w-[150px] h-[150px] mix-blend-multiply opacity-80" />
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-xl tracking-widest font-bold text-gray-700">
              HX-2026-0507
            </div>
            
            <button onClick={() => (window as any).showGlobalToast?.('success', '请向收银员出示此核销码')} className="w-full bg-[#FF4B4B] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-red-200 active:scale-95 transition-transform mt-4">
              立即核销使用
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex items-start gap-2 text-white/80 text-xs px-2">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          <p className="leading-relaxed">本券自领取起 7 天内有效。不可与其他优惠同享。最终解释权归黄小西平台所有。</p>
        </div>
      </div>
    </div>
  );
}