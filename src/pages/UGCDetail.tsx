import React, { useState } from 'react';
import { ChevronLeft, Share2, MessageCircle, Heart, Star, Sparkles, Navigation, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Page } from '../types';

interface UGCDetailProps {
  onNavigate: (page: Page, data?: any) => void;
  data?: any;
}

export default function UGCDetail({ onNavigate, data }: UGCDetailProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // mock data if none provided
  const post = data || {
    title: '肇兴侗寨避坑指南，这几家酸汤牛肉绝了！',
    author: {
      name: '旅行达人小A',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
      followers: '1.2w'
    },
    content: '这次去肇兴侗寨，真的被那里的夜景和美食惊艳到了。\n\n📸 首先是住宿，建议选在观景台附近，晚上不用挤也能拍出绝美照片。\n\n🍲 关于吃的，不要去主街上拉客的店，往巷子里走，有几家本地人常去的酸汤牛肉，肉质鲜嫩，酸汤超级开胃！\n\n👗 另外，租苗服拍照的话，记得多比价，通常包含化妆和一套衣服。',
    images: [
      `${import.meta.env.BASE_URL}图片/miao.png`,
      'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80'
    ],
    time: '2小时前',
    location: '肇兴侗寨',
    likes: 1284,
    comments: 342,
    saves: 856
  };

  return (
    <div className="h-full bg-white flex flex-col relative font-sans">
      {/* Immersive Header */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-5 pt-12 bg-gradient-to-b from-black/50 to-transparent">
        <button 
          onClick={() => onNavigate('home')}
          className="w-10 h-10 bg-black/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-black/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform">
            <Share2 size={18} />
          </button>
          <button className="w-10 h-10 bg-black/20 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-28 scrollbar-hide">
        {/* Image Carousel */}
        <div className="w-full h-[500px] relative bg-gray-100 snap-x snap-mandatory flex overflow-x-auto scrollbar-hide">
          {post.images.map((img: string, idx: number) => (
            <img key={idx} src={img} className="w-full h-full object-cover flex-shrink-0 snap-center" alt={`Post ${idx}`} />
          ))}
          <div className="absolute bottom-6 right-5 bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1.5 rounded-full font-bold tracking-widest shadow-lg">
            1 / {post.images.length}
          </div>
        </div>

        {/* Post Info Container */}
        <div className="px-6 py-6 -mt-6 bg-white rounded-t-[32px] relative z-10">
          
          {/* Author Section */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">{post.author.name}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">粉丝 {post.author.followers}</div>
              </div>
            </div>
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm active:scale-95 ${isFollowing ? 'bg-gray-100 text-gray-500 border border-gray-200' : 'bg-gray-900 text-white'}`}
            >
              {isFollowing ? '已关注' : '+ 关注'}
            </button>
          </div>

          {/* Title & Content */}
          <h1 className="text-2xl font-black text-gray-900 mb-4 leading-snug tracking-tight">{post.title}</h1>
          
          <div className="text-gray-700 leading-loose whitespace-pre-line text-[15px]">
            {post.content}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <div className="bg-gray-50 text-gray-600 text-[11px] px-3 py-1.5 rounded-full flex items-center gap-1 font-bold border border-gray-100">
              <Navigation size={12} />
              {post.location}
            </div>
            <div className="bg-gray-50 text-blue-600 text-[11px] px-3 py-1.5 rounded-full font-bold border border-blue-100/50">
              #贵州旅游
            </div>
            <div className="bg-gray-50 text-blue-600 text-[11px] px-3 py-1.5 rounded-full font-bold border border-blue-100/50">
              #肇兴侗寨
            </div>
          </div>
          
          <div className="mt-8 text-xs text-gray-400">
            发布于 {post.time}
          </div>
          
          {/* Comments Section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="font-black text-gray-900 mb-6 text-lg">共 {post.comments} 条评论</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" className="w-9 h-9 rounded-full object-cover" alt="user" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-bold">周末游达人</span>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Heart size={12} /> 12
                    </div>
                  </div>
                  <p className="text-sm text-gray-800 mt-1.5 leading-relaxed">这家酸汤牛肉确实不错，上周刚去吃过，强推！</p>
                  <div className="text-[10px] text-gray-400 mt-2">昨天 14:30</div>
                </div>
              </div>
              <div className="flex gap-4">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" className="w-9 h-9 rounded-full object-cover" alt="user" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-bold">小透明</span>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Heart size={12} /> 5
                    </div>
                  </div>
                  <p className="text-sm text-gray-800 mt-1.5 leading-relaxed">请问晚上几点去观景台人比较少呀？</p>
                  <div className="text-[10px] text-gray-400 mt-2">今天 09:15</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Action */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNavigate('chat', { query: `关于这篇"${post.title}"的内容，我想了解更多细节` })}
        className="absolute bottom-24 right-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3.5 rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center z-40 border border-white/20"
      >
        <Sparkles size={24} />
      </motion.button>

      {/* Floating Bottom Bar */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl p-2.5 px-4 flex items-center justify-between z-50">
        <div className="bg-gray-100/80 rounded-full px-4 py-2.5 flex-1 mr-4 text-sm text-gray-500 font-medium">
          说点什么...
        </div>
        <div className="flex items-center gap-5 text-gray-600">
          <button onClick={() => setIsLiked(!isLiked)} className="flex items-center gap-1.5 group">
            <Heart size={22} className={`transition-all ${isLiked ? "fill-red-500 text-red-500" : "group-hover:text-gray-900"}`} />
            <span className="text-xs font-bold">{post.likes}</span>
          </button>
          <button onClick={() => setIsSaved(!isSaved)} className="flex items-center gap-1.5 group">
            <Star size={22} className={`transition-all ${isSaved ? "fill-yellow-400 text-yellow-400" : "group-hover:text-gray-900"}`} />
            <span className="text-xs font-bold">{post.saves}</span>
          </button>
          <button className="flex items-center gap-1.5 group">
            <MessageCircle size={22} className="group-hover:text-gray-900 transition-all" />
            <span className="text-xs font-bold">{post.comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
