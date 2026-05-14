import React from 'react';
import { ChevronLeft, MapPin, Share2, Award, Heart, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Page } from '../types';

interface FootprintProps {
  onNavigate: (page: Page) => void;
}

export default function Footprint({ onNavigate }: FootprintProps) {
  return (
    <div className="h-full bg-[#F7F8FA] flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-3 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => onNavigate('home')} className="p-2 -ml-2 text-gray-900 active:scale-95 transition-transform">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">旅行足迹</h1>
        <button className="p-2 -mr-2 text-gray-900 active:scale-95 transition-transform">
          <Share2 size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        {/* Map & Stats Section */}
        <div className="relative w-full h-[400px] bg-gray-100 overflow-hidden shadow-sm">
          {/* Map Image (Simulated Map) */}
          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="Map" className="w-full h-full object-cover opacity-40 grayscale" />
          
          {/* Floating Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-6 left-6 right-6 bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between z-10"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#FFE500] shadow-sm flex-shrink-0 relative">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" alt="Avatar" className="w-full h-full object-cover" />
              <div className="absolute -bottom-1 -right-1 bg-[#FFE500] text-gray-900 text-[8px] font-bold px-1 rounded-sm border border-white">Lv.5</div>
            </div>
            
            <div className="flex flex-1 justify-around text-center ml-4">
              <div className="flex flex-col">
                <span className="text-[22px] font-black text-gray-900 leading-none">66</span>
                <span className="text-[10px] text-gray-500 mt-1">地点</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[22px] font-black text-gray-900 leading-none">234</span>
                <span className="text-[10px] text-gray-500 mt-1">照片</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[22px] font-black text-gray-900 leading-none">8</span>
                <span className="text-[10px] text-gray-500 mt-1">收藏</span>
              </div>
            </div>
          </motion.div>

          {/* Location Pins (Simulated) */}
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <MapPin size={32} className="text-[#FFE500] drop-shadow-md z-10 relative" fill="#FFE500" stroke="#000" strokeWidth={1.5} />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/20 rounded-[100%] blur-[1px]"></div>
            </div>
          </div>
          <div className="absolute top-2/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <MapPin size={24} className="text-[#FFE500] drop-shadow-md z-10 relative" fill="#FFE500" stroke="#000" strokeWidth={1.5} />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-black/20 rounded-[100%] blur-[1px]"></div>
            </div>
          </div>

          {/* Bottom Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F7F8FA] to-transparent pointer-events-none" />
        </div>

        {/* Content Area */}
        <div className="px-4 -mt-6 relative z-20 space-y-6">
          
          {/* Badges Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[16px] font-bold text-gray-900">勋章</h2>
              <span className="text-[12px] text-gray-400 flex items-center">全部 <ChevronRight size={14} /></span>
            </div>
            
            <div className="flex flex-col gap-3">
              {/* Badge 1 */}
              <div className="bg-[#EAFCD4] rounded-2xl p-4 flex items-center justify-between shadow-sm border border-[#D5F5B5]">
                <div>
                  <h3 className="text-[16px] font-black text-gray-900 mb-1 italic tracking-wide">获得新手徽章</h3>
                  <p className="text-[11px] text-gray-600">已完成新手任务，查看徽章</p>
                </div>
                <div className="w-14 h-14 bg-[#4CAF50] rounded-full border-[3px] border-white shadow-sm flex items-center justify-center text-white font-black transform rotate-12 relative overflow-hidden">
                  <div className="absolute inset-0 border-[2px] border-dashed border-white/30 rounded-full m-1"></div>
                  👍
                </div>
              </div>
              
              {/* Badge 2 */}
              <div className="bg-[#FFF8D6] rounded-2xl p-4 flex items-center justify-between shadow-sm border border-[#FBEBA4]">
                <div>
                  <h3 className="text-[16px] font-black text-gray-900 mb-1 italic tracking-wide">收藏了5个地点</h3>
                  <p className="text-[11px] text-gray-600">再收藏5个可解锁新徽章</p>
                </div>
                <div className="w-14 h-14 bg-[#FFC107] rounded-full border-[3px] border-white shadow-sm flex items-center justify-center text-white font-black transform -rotate-6 relative overflow-hidden">
                  <div className="absolute inset-0 border-[2px] border-dashed border-white/30 rounded-full m-1"></div>
                  <Heart size={20} fill="currentColor" />
                </div>
              </div>

              {/* Badge 3 */}
              <div className="bg-[#FDE2F3] rounded-2xl p-4 flex items-center justify-between shadow-sm border border-[#F9CBE6] relative overflow-hidden">
                <div>
                  <h3 className="text-[16px] font-black text-gray-900 mb-1 italic tracking-wide">打卡了5个地方</h3>
                  <p className="text-[11px] text-gray-600">再打卡5个可解锁新徽章</p>
                </div>
                <div className="w-14 h-14 bg-[#E91E63] rounded-full border-[3px] border-white shadow-sm flex items-center justify-center text-white font-black transform rotate-6 relative overflow-hidden">
                  <div className="absolute inset-0 border-[2px] border-dashed border-white/30 rounded-full m-1"></div>
                  <MapPin size={20} fill="currentColor" />
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#FFE500] rounded-full border-2 border-white shadow-sm flex items-center justify-center font-bold text-gray-900">+</div>
              </div>
            </div>
          </div>

          {/* Themed Maps Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[16px] font-bold text-gray-900">专属打卡地图</h2>
              <span className="text-[12px] text-gray-400 flex items-center">发现更多 <ChevronRight size={14} /></span>
            </div>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
              {/* Themed Map Card 1 */}
              <div className="w-[260px] flex-shrink-0 bg-[#FFE500] rounded-[24px] p-4 shadow-sm border-2 border-black relative overflow-hidden transform transition-transform active:scale-95">
                <div className="absolute -top-10 -right-10 text-black/10">
                  <MapPin size={120} fill="currentColor" />
                </div>
                
                <div className="bg-black text-white px-3 py-1.5 inline-block rounded font-black text-[14px] italic transform -skew-x-6 mb-3 shadow-[2px_2px_0px_#fff]">
                  美食干饭地图
                </div>
                
                <div className="bg-[#FF4B4B] text-white px-2 py-1 inline-block text-[11px] font-bold rounded shadow-sm mb-4">
                  江湖人称无情的"干饭机器"
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border-2 border-black relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" className="w-6 h-6 rounded-full border border-black" />
                    <span className="text-[12px] font-bold text-gray-900">干饭王</span>
                    <span className="ml-auto text-[10px] bg-red-100 text-red-600 px-1.5 rounded font-bold">打卡57%</span>
                  </div>
                  
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <div className="text-[10px] text-gray-500 font-bold mb-0.5">为了那一口，走遍了</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[24px] font-black text-gray-900 leading-none">6</span>
                        <span className="text-[12px] font-bold text-gray-600">个地点</span>
                      </div>
                      <div className="text-[14px] font-black text-gray-900 mt-1">76.8公里</div>
                    </div>
                    <div className="w-10 h-10 bg-black text-[#FFE500] rounded-full flex items-center justify-center shadow-md">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Themed Map Card 2 */}
              <div className="w-[260px] flex-shrink-0 bg-[#E6F4F1] rounded-[24px] p-4 shadow-sm border-2 border-black relative overflow-hidden transform transition-transform active:scale-95">
                <div className="absolute -bottom-8 -right-8 text-emerald-500/20">
                  <Award size={120} fill="currentColor" />
                </div>
                
                <div className="bg-emerald-600 text-white px-3 py-1.5 inline-block rounded font-black text-[14px] italic transform -skew-x-6 mb-3 shadow-[2px_2px_0px_#000]">
                  特种兵徒步地图
                </div>
                
                <div className="bg-[#FFE500] text-gray-900 px-2 py-1 inline-block text-[11px] font-bold rounded shadow-sm border border-black mb-4">
                  用脚步丈量世界的勇士
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border-2 border-black relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" className="w-6 h-6 rounded-full border border-black" />
                    <span className="text-[12px] font-bold text-gray-900">户外达人</span>
                    <span className="ml-auto text-[10px] bg-emerald-100 text-emerald-600 px-1.5 rounded font-bold">步数击败99%</span>
                  </div>
                  
                  <div className="flex items-end justify-between mt-4">
                    <div>
                      <div className="text-[10px] text-gray-500 font-bold mb-0.5">翻山越岭，累计爬升</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[24px] font-black text-gray-900 leading-none">3</span>
                        <span className="text-[12px] font-bold text-gray-600">座高峰</span>
                      </div>
                      <div className="text-[14px] font-black text-gray-900 mt-1">12万步</div>
                    </div>
                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-md">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
