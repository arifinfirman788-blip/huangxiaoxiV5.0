import React, { useState } from 'react';
import { ChevronLeft, Share2, MapPin, Sparkles, Navigation, Heart, Clock, Calendar, CheckCircle2, ArrowRight, Compass, Utensils, Tent, Users, MessageCircle, UserPlus, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page } from '../types';

export default function WeekendDetail({ onNavigate }: { onNavigate: (page: Page, data?: any) => void }) {
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('highlights');
  const [isJoined, setIsJoined] = useState(false);

  const highlights = [
    {
      title: "大草坪野餐",
      desc: "5000平米阳光草坪，自带帐篷即可安营扎寨，孩子们可以尽情奔跑释放精力。",
      img: "https://images.unsplash.com/photo-1533588269722-e64c39f1e185?w=500&q=80",
      icon: <Tent size={16} />
    },
    {
      title: "无动力乐园",
      desc: "原木打造的攀爬架、滑梯、沙池，让孩子回归自然，安全又充满挑战。",
      img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&q=80",
      icon: <Compass size={16} />
    },
    {
      title: "农家柴火鸡",
      desc: "小镇自营餐厅，土鸡土灶，香气四溢，是游玩后补充体力的最佳选择。",
      img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80",
      icon: <Utensils size={16} />
    }
  ];

  const timeline = [
    { time: "10:00", title: "抵达小镇，安营扎寨", desc: "在阳光草坪选个好位置，铺好野餐垫。", type: "arrive" },
    { time: "10:30", title: "无动力乐园放电", desc: "带孩子去攀爬区玩耍，体验户外乐趣。", type: "play" },
    { time: "12:30", title: "享用柴火鸡午餐", desc: "大家一起前往小镇餐厅，品尝地道农家风味，AAAA。", type: "food" },
    { time: "14:00", title: "草坪午休 & 飞盘时光", desc: "在帐篷里小憩，或者和孩子玩会儿飞盘，结识新朋友。", type: "relax" },
    { time: "16:00", title: "葡萄园采摘体验", desc: "应季体验，体验亲手采摘的乐趣。", type: "play" },
    { time: "17:30", title: "收拾行囊，返程", desc: "伴着夕阳，结束愉快的周末时光。", type: "leave" }
  ];

  return (
    <div className="h-full bg-[#F5F5F7] flex flex-col relative font-sans">
      {/* Immersive Header */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-5 pt-12">
        <button 
          onClick={() => onNavigate('home')} 
          className="w-10 h-10 bg-black/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          className="w-10 h-10 bg-black/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
        >
          <Share2 size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-28 scrollbar-hide">
        {/* Hero Image */}
        <div className="w-full h-[420px] relative">
          <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F7] via-black/10 to-black/40" />
          
          {/* Floating Hero Content */}
          <div className="absolute bottom-10 left-5 right-5 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-purple-500/80 backdrop-blur-md border border-purple-400/50 text-white text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 font-bold mb-3 shadow-lg"
            >
              <Users size={14} className="text-white" /> 周末亲子圈
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-black text-white mb-2 tracking-tight leading-tight drop-shadow-md"
            >
              太阳葡萄小镇·亲子周末
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 text-sm text-white/90"
            >
              <span className="flex items-center gap-1"><MapPin size={14} /> 贵阳市·花溪区</span>
              <span className="w-1 h-1 rounded-full bg-white/50" />
              <span className="flex items-center gap-1"><Calendar size={14} /> 本周六 10:00</span>
            </motion.div>
          </div>
        </div>

        {/* Content Overlapping */}
        <div className="px-5 -mt-6 relative z-20 space-y-5">
          
          {/* Organizer & Team Status */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[24px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="https://i.pravatar.cc/100?img=1" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="organizer" />
                  <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-gray-900 text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm border border-white">团长</div>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm flex items-center gap-1">小雨妈妈 <Star size={12} className="fill-yellow-400 text-yellow-400" /></div>
                  <div className="text-[11px] text-gray-500 mt-0.5">发起过 12 次周边游 · 靠谱</div>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100 transition-colors">
                <MessageCircle size={16} />
              </button>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-gray-900">拼队进度</span>
                <span className="text-[11px] text-gray-500 font-medium">3/5 人 (还差 2 人成行)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-indigo-400 to-purple-500 h-full rounded-full"
                />
              </div>
              
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?img=1" className="w-8 h-8 rounded-full border-2 border-white shadow-sm relative z-30" alt="avatar" />
                  <img src="https://i.pravatar.cc/100?img=2" className="w-8 h-8 rounded-full border-2 border-white shadow-sm relative z-20" alt="avatar" />
                  <img src="https://i.pravatar.cc/100?img=3" className="w-8 h-8 rounded-full border-2 border-white shadow-sm relative z-10" alt="avatar" />
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 bg-white flex items-center justify-center text-gray-400 relative z-0">
                    <UserPlus size={14} />
                  </div>
                </div>
                <div className="text-[11px] text-gray-500">已加入：小雨妈妈、大白、CC</div>
              </div>
            </div>
          </motion.div>

          {/* AI Match Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-900 rounded-[24px] p-6 text-white shadow-xl shadow-gray-900/10 relative overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -ml-10 -mb-10" />
            
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 p-0.5 flex-shrink-0">
                <div className="w-full h-full bg-gray-900 rounded-full flex flex-col items-center justify-center">
                  <span className="text-[10px] text-purple-300 font-bold mb-0.5">匹配度</span>
                  <span className="text-base font-black text-white leading-none">98%</span>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-black mb-1 flex items-center gap-1.5 tracking-tight">
                  <Sparkles size={16} className="text-yellow-400" /> AI 拼队分析
                </h2>
                <p className="text-white/70 text-xs leading-relaxed mb-3">
                  该车队主要由有娃家庭组成，孩子年龄在 5-8 岁之间，与您的标签非常契合。行程安排轻松，不累妈。
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['同频带娃', '节奏轻松', '距离适中'].map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded text-[10px] font-medium text-white/90">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Content Section */}
          <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button 
                onClick={() => setActiveTab('highlights')}
                className={`flex-1 py-4 text-sm font-bold transition-colors relative ${activeTab === 'highlights' ? 'text-gray-900' : 'text-gray-400'}`}
              >
                活动亮点
                {activeTab === 'highlights' && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gray-900 rounded-t-full" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab('timeline')}
                className={`flex-1 py-4 text-sm font-bold transition-colors relative ${activeTab === 'timeline' ? 'text-gray-900' : 'text-gray-400'}`}
              >
                行程安排
                {activeTab === 'timeline' && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gray-900 rounded-t-full" />
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'highlights' ? (
                  <motion.div 
                    key="highlights"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {highlights.map((item, idx) => (
                      <div key={idx} className="group">
                        <div className="relative h-40 rounded-2xl overflow-hidden mb-3">
                          <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 p-2 rounded-xl shadow-sm">
                            {item.icon}
                          </div>
                        </div>
                        <h3 className="text-lg font-black text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="timeline"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    {/* Timeline Line */}
                    <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gray-100" />
                    
                    <div className="space-y-8 relative">
                      {timeline.map((item, idx) => (
                        <div key={idx} className="flex gap-4 relative">
                          <div className="w-14 text-right shrink-0 pt-1">
                            <span className="text-xs font-black text-gray-900">{item.time}</span>
                          </div>
                          <div className="relative shrink-0 z-10">
                            <div className={`w-4 h-4 rounded-full border-4 border-white shadow-sm flex items-center justify-center mt-1 ${
                              item.type === 'food' ? 'bg-orange-500' : 
                              item.type === 'play' ? 'bg-blue-500' : 
                              'bg-gray-300'
                            }`} />
                          </div>
                          <div className="flex-1 pb-2">
                            <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>

      {/* Floating Bottom Bar */}
      <div className="absolute bottom-6 left-5 right-5 bg-white/90 backdrop-blur-2xl border border-white/50 p-2 rounded-[24px] z-50 shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          <div className="flex flex-col pl-4">
            <span className="text-[10px] text-gray-500 font-bold">预估人均</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-black text-gray-900">¥</span>
              <span className="text-2xl font-black text-gray-900 leading-none">80</span>
            </div>
          </div>
          
          <div className="flex-1 flex gap-2 justify-end">
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors border ${
                isSaved ? 'bg-red-50 border-red-100 text-red-500' : 'bg-gray-50 border-gray-100 text-gray-400'
              }`}
            >
              <Heart size={22} className={isSaved ? "fill-current" : ""} />
            </button>
            
            <button onClick={() => {
              setIsJoined(true);
              (window as any).showGlobalToast?.('success', '已发送拼队申请，等待团长通过');
            }} className={`px-6 h-12 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 transition-all ${
              isJoined ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-gray-900 text-white shadow-gray-900/20 active:scale-95'
            }`}>
              {isJoined ? (
                <><CheckCircle2 size={18} /> 申请中</>
              ) : (
                <><UserPlus size={18} /> 申请加入拼队</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}