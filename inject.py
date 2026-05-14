import re

# Read TripList.tsx
with open('/Users/chenyinbing/Desktop/项目/huangxiaoxiv4.0/src/pages/TripList.tsx', 'r') as f:
    trip_list = f.read()

# Add required imports if missing
if 'CloudRain' not in trip_list:
    trip_list = trip_list.replace("import { Sun, Calendar, Clock, Car, Ticket, Footprints, Plus } from 'lucide-react';", "import { Sun, Calendar, Clock, Car, Ticket, Footprints, Plus, CloudRain, ChevronRight, X } from 'lucide-react';")

# Tooltip and Badge components
components = """
  // tooltip component
  const Tooltip = ({ show, onClose, title, userStory, acceptanceCriteria }: any) => {
    if (!show) return null;
    return (
      <motion.div 
           drag
           dragMomentum={false}
           className="absolute top-[16px] right-[16px] z-[9999] w-[450px] bg-[#1E1E1E] text-white p-4 rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-move text-left"
           onClick={(e: any) => e.stopPropagation()}
           onMouseDown={(e: any) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-3 border-b border-gray-700 pb-2">
          <h3 className="font-bold text-base">{title}</h3>
          <button onClick={(e: any) => { e.stopPropagation(); onClose(); }} className="text-gray-400 hover:text-white">
            <X size={16} />
          </button>
        </div>
        <div className="text-[13px] leading-[1.6] opacity-90">
          <div className="mb-[12px]">
            <div className="font-bold text-gray-300 mb-1 border-b border-gray-700/50 pb-1">User Story (用户故事)</div>
            <div>{userStory}</div>
          </div>
          <div className="mb-[12px]">
            <div className="font-bold text-gray-300 mb-1 border-b border-gray-700/50 pb-1">Acceptance Criteria (验收标准)</div>
            <div>{acceptanceCriteria}</div>
          </div>
        </div>
      </motion.div>
    );
  };

  // badge component
  const Badge = ({ num, onHover, show }: any) => (
    <div className="absolute -top-[6px] -right-[6px] z-[9999]">
      <div className="inline-block align-top bg-[rgb(250,173,20)] text-white font-bold text-[10px] leading-[14px] px-[4px] rounded-[2px] cursor-pointer border-none"
           onMouseEnter={onHover}
           onClick={(e: any) => { e.stopPropagation(); onHover(); }}>
        {num}
      </div>
    </div>
  );
"""

# State and functions
state_and_functions = """
  // Widget management state
  const [isEditingWidgets, setIsEditingWidgets] = useState(false);
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState<string[]>(() => {
    const savedWidgets = localStorage.getItem('hx_active_widgets');
    if (savedWidgets) {
      try {
        return JSON.parse(savedWidgets);
      } catch (e) {
        console.error('Failed to parse saved widgets', e);
      }
    }
    return ['weather_2x2', 'map_2x1', 'calendar_2x1', 'countdown_1x1', 'coupon_1x1'];
  });

  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip5, setShowTooltip5] = useState(false);

  useEffect(() => {
    localStorage.setItem('hx_active_widgets', JSON.stringify(activeWidgets));
  }, [activeWidgets]);

  const removeWidget = (id: string) => {
    setActiveWidgets(prev => prev.filter(w => w !== id));
  };

  const addWidget = (id: string) => {
    if (!activeWidgets.includes(id)) {
      setActiveWidgets(prev => [...prev, id]);
    }
    setShowWidgetSelector(false);
  };

  const renderWidget = (id: string, index?: number) => {
    const isEditing = isEditingWidgets;
    const [category, size] = id.split('_') as [WidgetCategory, WidgetSize];
    
    const sizeClasses = {
      '1x1': 'w-full h-full',
      '2x1': 'w-full h-full',
      '2x2': 'w-full h-full'
    };
    
    const wrapperClass = (baseClass: string) => `
      ${sizeClasses[size]} ${baseClass} relative rounded-2xl shadow-sm overflow-hidden 
      ${isEditing ? 'border-2 border-dashed border-indigo-400 animate-[jiggle_0.3s_ease-in-out_infinite]' : 'cursor-pointer active:scale-95 transition-transform'}
    `;

    const DeleteButton = () => isEditing ? (
      <button 
        onClick={(e) => { e.stopPropagation(); removeWidget(id); }}
        className="absolute -top-2 -right-2 z-50 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
      >
        <Trash2 size={14} />
      </button>
    ) : null;

    switch(category) {
      case 'weather':
        if (size === '2x2') {
          return (
            <div key={id} className={wrapperClass("bg-gradient-to-br from-blue-400 to-blue-300 text-white flex flex-col justify-between p-3.5")}>
              <DeleteButton />
              <div className="absolute top-[-20px] right-[-20px] opacity-20">
                <Sun size={100} />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <MapPin size={12} />
                  <span className="text-xs font-medium">贵阳市</span>
                </div>
                <div className="text-3xl font-bold">24°</div>
                <div className="text-xs opacity-90 mt-0.5">多云转晴 | 空气优</div>
              </div>
              <div className="flex justify-between items-end mt-4">
                <div className="text-[10px] opacity-80">明天 25° 晴</div>
                <CloudRain size={20} className="opacity-90" />
              </div>
            </div>
          );
        } else if (size === '2x1') {
          return (
            <div key={id} className={wrapperClass("bg-gradient-to-br from-blue-400 to-blue-300 text-white flex items-center justify-between p-3")}>
              <DeleteButton />
              <div className="flex items-center gap-2">
                <Sun size={28} className="text-yellow-200" />
                <div>
                  <div className="text-2xl font-bold leading-none">24°</div>
                  <div className="text-[10px] opacity-90">贵阳市</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium">多云转晴</div>
                <div className="text-[10px] opacity-80">空气优</div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={id} className={wrapperClass("bg-gradient-to-br from-blue-400 to-blue-300 text-white flex flex-col items-center justify-center p-2")}>
              <DeleteButton />
              <Sun size={20} className="mb-1 text-yellow-200" />
              <div className="text-sm font-bold">24°</div>
              <div className="text-[9px] opacity-90">贵阳</div>
            </div>
          );
        }
      case 'map':
        if (size === '2x2') {
          return (
            <div key={id} className={wrapperClass("flex flex-col p-3 bg-[#EAF2ED] overflow-hidden")} onClick={() => !isEditing && onNavigate('map-explore')}>
              <DeleteButton />
              {/* Hand-drawn map pattern */}
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232C3E50' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
              {/* Abstract map outline */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 400 400" className="w-[150%] h-[150%] opacity-20 text-emerald-800">
                  <path d="M150,50 Q200,30 250,60 T350,150 Q360,200 320,250 T280,350 Q200,380 150,330 T50,250 Q30,180 80,120 T150,50 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="10,10" />
                </svg>
              </div>
              <div className="relative z-10 flex-1 flex flex-col justify-between">
                <div className="bg-white/90 self-start px-2 py-1 rounded-full text-[10px] font-bold text-emerald-700 shadow-sm flex items-center gap-1 backdrop-blur-sm border border-emerald-100">
                  <MapPin size={12} className="text-orange-500" />
                  <span>全省手绘地图</span>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="flex -space-x-1">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                      <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                      <div className="w-6 h-6 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-orange-600">+12</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-gray-800 bg-white/60 px-1.5 py-0.5 rounded inline-block backdrop-blur-sm">12位好友在附近</div>
                </div>
              </div>
            </div>
          );
        } else if (size === '2x1') {
          return (
            <div key={id} className={wrapperClass("flex flex-col justify-end p-2.5 bg-[#EAF2ED] overflow-hidden")} onClick={() => !isEditing && onNavigate('map-explore')}>
              <DeleteButton />
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232C3E50' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
              <div className="absolute top-1 left-1/2 -translate-x-1/2 text-orange-500 drop-shadow-md">
                <MapPin size={24} fill="currentColor" className="text-orange-500" />
              </div>
              <div className="relative z-10 w-full">
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex -space-x-1">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" className="w-5 h-5 rounded-full border-2 border-white object-cover" />
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" className="w-5 h-5 rounded-full border-2 border-white object-cover" />
                    <div className="w-5 h-5 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-orange-600">+8</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] font-bold text-emerald-800 bg-white/90 px-1.5 py-0.5 rounded shadow-sm backdrop-blur-sm border border-emerald-100">10人共享</span>
                  <span className="text-[9px] font-bold text-orange-800 bg-orange-100/90 px-1.5 py-0.5 rounded shadow-sm backdrop-blur-sm">321m</span>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={id} className={wrapperClass("bg-[#EAF2ED] flex flex-col items-center justify-center p-2")} onClick={() => !isEditing && onNavigate('map-explore')}>
              <DeleteButton />
              <div className="bg-white/80 p-2 rounded-full mb-1 shadow-sm border border-emerald-100">
                <MapPin size={18} className="text-orange-500" />
              </div>
              <div className="text-[10px] font-bold text-emerald-800">手绘地图</div>
            </div>
          );
        }
      case 'calendar':
        if (size === '2x2') {
          return (
            <div key={id} className={wrapperClass("text-white flex flex-col justify-between p-3.5")} onClick={() => !isEditing && onNavigate('sports-assistant')}>
              <DeleteButton />
              <img src="https://images.unsplash.com/photo-1507371341162-763b5e419408?w=500&q=80" alt="autumn bg" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs opacity-90 drop-shadow">2026年04月</div>
                    <div className="text-lg font-bold drop-shadow">农历三月初十</div>
                  </div>
                  <div className="text-4xl font-bold leading-none drop-shadow text-orange-400">26</div>
                </div>
                <div className="mt-4 bg-white/20 backdrop-blur-md rounded-xl p-2 border border-white/10">
                  <div className="text-[10px] font-bold text-orange-200 mb-1">即将到来</div>
                  <div className="text-xs">今晚拯救地球，有事DIDI</div>
                </div>
              </div>
            </div>
          );
        } else if (size === '2x1') {
          return (
            <div key={id} className={wrapperClass("text-white flex flex-col justify-between p-2.5")} onClick={() => !isEditing && onNavigate('sports-assistant')}>
              <DeleteButton />
              <img src="https://images.unsplash.com/photo-1507371341162-763b5e419408?w=500&q=80" alt="autumn bg" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <div className="text-[8px] opacity-90 drop-shadow">2026年04月</div>
                  <div className="text-[8px] opacity-90 drop-shadow">丙午年</div>
                  <div className="text-[10px] font-bold mt-0.5 drop-shadow">农历三月初十</div>
                </div>
                <div className="text-3xl font-bold leading-none drop-shadow">26</div>
              </div>
              <div className="relative z-10 flex items-center justify-between mt-1">
                <div className="text-[11px] font-medium tracking-wider drop-shadow">😃今晚拯救地球，<br/>有事DIDI 📎</div>
                <div className="w-6 h-6 bg-white/20 rounded-md backdrop-blur-sm flex items-center justify-center">
                  <Calendar size={14} />
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={id} className={wrapperClass("bg-orange-50 flex flex-col items-center justify-center p-2")} onClick={() => !isEditing && onNavigate('sports-assistant')}>
              <DeleteButton />
              <div className="text-xl font-bold text-orange-500 leading-none mb-1">26</div>
              <div className="text-[9px] font-bold text-orange-800">日历</div>
            </div>
          );
        }
      case 'countdown':
        if (size === '2x2') {
          return (
            <div key={id} className={wrapperClass("bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-3 flex flex-col justify-between")}>
              <DeleteButton />
              <div className="flex items-center gap-1 opacity-90">
                <Clock size={14} />
                <span className="text-xs font-medium">下一次旅行</span>
              </div>
              <div className="text-center">
                <div className="text-[10px] opacity-80 mb-1">距离 贵阳三日游 还有</div>
                <div className="text-5xl font-bold tracking-tight">12<span className="text-sm font-normal ml-1">天</span></div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-xs flex justify-between items-center">
                <span>机票已出，酒店待定</span>
                <ChevronRight size={14} />
              </div>
            </div>
          );
        } else if (size === '2x1') {
          return (
            <div key={id} className={wrapperClass("bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-3 flex items-center justify-between")}>
              <DeleteButton />
              <div>
                <div className="text-[10px] opacity-80 mb-0.5">贵阳三日游</div>
                <div className="text-xl font-bold">12天后出发</div>
              </div>
              <div className="bg-white/20 p-2 rounded-full">
                <Clock size={20} />
              </div>
            </div>
          );
        } else {
          return (
            <div key={id} className={wrapperClass("bg-indigo-50 text-indigo-600 flex flex-col items-center justify-center p-2")}>
              <DeleteButton />
              <div className="text-xl font-bold mb-0.5">12<span className="text-[10px]">天</span></div>
              <div className="text-[9px] font-medium">行程倒计时</div>
            </div>
          );
        }

      case 'traffic':
        if (size === '2x2') {
          return (
            <div key={id} className={wrapperClass("bg-white text-gray-800 p-3 flex flex-col justify-between border border-gray-100")}>
              <DeleteButton />
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1 text-blue-600">
                  <Car size={14} />
                  <span className="text-xs font-bold">实时路况</span>
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">畅通</span>
              </div>
              <div className="flex-1 mt-2 relative rounded-lg overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&q=80" alt="map" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm text-[10px] px-2 py-1 rounded shadow-sm font-medium text-gray-700">沪昆高速 畅通</div>
                </div>
              </div>
            </div>
          );
        } else if (size === '2x1') {
          return (
            <div key={id} className={wrapperClass("bg-white text-gray-800 p-3 flex items-center justify-between border border-gray-100")}>
              <DeleteButton />
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Car size={14} className="text-blue-500" />
                  <span className="text-xs font-bold">高速路况</span>
                </div>
                <div className="text-[10px] text-gray-500">前往黄果树全线畅通</div>
              </div>
              <div className="text-xl font-bold text-green-500">畅通</div>
            </div>
          );
        } else {
          return (
            <div key={id} className={wrapperClass("bg-blue-50 text-blue-600 flex flex-col items-center justify-center p-2")}>
              <DeleteButton />
              <Car size={20} className="mb-1" />
              <div className="text-[10px] font-bold">路况</div>
            </div>
          );
        }

      case 'coupon':
        if (size === '2x2') {
          return (
            <div key={id} className={wrapperClass("bg-gradient-to-br from-orange-400 to-red-500 text-white p-3 flex flex-col justify-between")}>
              <DeleteButton />
              <div className="flex items-center gap-1 opacity-90">
                <Ticket size={14} />
                <span className="text-xs font-medium">每日特惠盲盒</span>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-1">🎁</div>
                <div className="text-sm font-bold">点击抽取今日专属福利</div>
              </div>
              <button className="w-full bg-white text-red-500 text-xs font-bold py-1.5 rounded-lg shadow-sm">
                立即抽取
              </button>
            </div>
          );
        } else if (size === '2x1') {
          return (
            <div key={id} className={wrapperClass("bg-gradient-to-r from-orange-400 to-red-500 text-white p-3 flex items-center justify-between")}>
              <DeleteButton />
              <div>
                <div className="text-xs font-bold mb-0.5">每日特惠</div>
                <div className="text-[10px] opacity-90">酸汤鱼50元代金券</div>
              </div>
              <div className="bg-white text-red-500 text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                去领取
              </div>
            </div>
          );
        } else {
          return (
            <div key={id} className={wrapperClass("bg-red-50 text-red-500 flex flex-col items-center justify-center p-2")}>
              <DeleteButton />
              <Ticket size={20} className="mb-1" />
              <div className="text-[10px] font-bold">领券</div>
            </div>
          );
        }

      case 'footprint':
        if (size === '2x2') {
          return (
            <div key={id} className={wrapperClass("relative bg-white overflow-hidden")} onClick={() => !isEditing && onNavigate('footprint')}>
              <DeleteButton />
              {/* Map Background */}
              <div className="absolute inset-0 bg-[#F4F4F4]">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&q=80" alt="map bg" className="w-full h-full object-cover opacity-30 grayscale" />
              </div>
              
              <div className="relative z-10 p-2 flex flex-col h-full">
                {/* Floating Stats Card */}
                <div className="bg-white rounded-xl p-2 shadow-sm flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-1 justify-around text-center ml-2">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-gray-900 leading-none">66</span>
                      <span className="text-[8px] text-gray-500 mt-0.5">地点</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-gray-900 leading-none">234</span>
                      <span className="text-[8px] text-gray-500 mt-0.5">照片</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-gray-900 leading-none">8</span>
                      <span className="text-[8px] text-gray-500 mt-0.5">收藏</span>
                    </div>
                  </div>
                </div>
                
                {/* Bottom area */}
                <div className="mt-auto flex justify-between items-end">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
                    <span className="text-[10px] font-bold text-gray-800">旅行足迹地图</span>
                  </div>
                  <div className="bg-[#FFE500] w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                    <ChevronRight size={14} className="text-gray-900" />
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (size === '2x1') {
          return (
            <div key={id} className={wrapperClass("bg-emerald-50 text-emerald-800 p-3 flex items-center justify-between")} onClick={() => !isEditing && onNavigate('footprint')}>
              <DeleteButton />
              <div>
                <div className="text-xs font-bold mb-0.5">旅行足迹</div>
                <div className="text-[10px] opacity-80 font-medium">已打卡 12 个城市</div>
              </div>
              <Footprints size={24} className="text-emerald-400" />
            </div>
          );
        } else {
          return (
            <div key={id} className={wrapperClass("bg-emerald-50 text-emerald-600 flex flex-col items-center justify-center p-2")} onClick={() => !isEditing && onNavigate('footprint')}>
              <DeleteButton />
              <Footprints size={20} className="mb-1" />
              <div className="text-[10px] font-bold">足迹</div>
            </div>
          );
        }

      default:
        return null;
    }
  };
"""

# The JSX to insert before List Section
jsx = """
      {/* Bento Grid User Widgets Area */}
      <div className="relative px-6 mt-6">
        {/* Workflow A: [1] 工具箱管理 (Widget Management) */}
        <Badge num="1" onHover={() => { setShowTooltip1(true); setShowTooltip5(false); }} />
        <Tooltip show={showTooltip1} onClose={() => setShowTooltip1(false)} title="[1] 工具箱管理 (Widget Management)" 
          userStory={
            <div className="bg-gray-800 p-2 rounded text-gray-300 font-mono text-xs">
              <span className="text-blue-400">As a</span> 平台用户,<br/>
              <span className="text-blue-400">I want to</span> 自定义首页头部的模块卡片,<br/>
              <span className="text-blue-400">So that</span> 我可以快速访问最常用的功能。
            </div>
          }
          acceptanceCriteria={
            <ul className="list-disc pl-4 space-y-2 text-gray-300">
              <li><span className="text-green-400 font-bold">Given</span> 首页加载完成，<span className="text-yellow-400 font-bold">when</span> 用户点击卡片区域的“编辑”按钮，<span className="text-purple-400 font-bold">then</span> 卡片呈现晃动效果（jiggle）并出现红色删除按钮。</li>
              <li><span className="text-green-400 font-bold">Given</span> 处于编辑模式，<span className="text-yellow-400 font-bold">when</span> 用户点击“+”号按钮，<span className="text-purple-400 font-bold">then</span> 弹出添加浮窗支持 1x1, 2x1, 2x2 尺寸的小组件添加。</li>
              <li><span className="text-green-400 font-bold">Given</span> 处于编辑模式，<span className="text-yellow-400 font-bold">when</span> 用户点击卡片的删除按钮，<span className="text-purple-400 font-bold">then</span> 移除该卡片并同步更新本地存储。</li>
            </ul>
          }
        />
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-gray-900">出行工具箱</h2>
          <button 
            onClick={() => setIsEditingWidgets(!isEditingWidgets)}
            className={`text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${isEditingWidgets ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {isEditingWidgets ? '完成' : '编辑'} <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {activeWidgets.map((widgetId, index) => {
            const [category] = widgetId.split('_');
            const isMapFootprint = category === 'map' || category === 'footprint';
            const isFirstMapFootprint = activeWidgets.findIndex(w => w.startsWith('map_') || w.startsWith('footprint_')) === index;
            
            return (
              <div key={widgetId} className={`relative ${widgetId.endsWith('2x2') ? 'col-span-2 row-span-2' : widgetId.endsWith('2x1') ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'}`}>
                {isMapFootprint && isFirstMapFootprint && (
                  <>
                    <Badge num="5" onHover={() => { setShowTooltip1(false); setShowTooltip5(true); }} />
                    <Tooltip show={showTooltip5} onClose={() => setShowTooltip5(false)} title="[5] 地图组件区 (足迹 & 全省地图)" 
                      userStory={
                        <div className="bg-gray-800 p-2 rounded text-gray-300 font-mono text-xs">
                          <span className="text-blue-400">As a</span> 旅行记录者,<br/>
                          <span className="text-blue-400">I want to</span> 在首页直观看到地图入口,<br/>
                          <span className="text-blue-400">So that</span> 我能快速进入我的足迹或全省地图。
                        </div>
                      }
                      acceptanceCriteria={
                        <ul className="list-disc pl-4 space-y-2 text-gray-300">
                          <li><span className="text-green-400 font-bold">Given</span> 首页小组件，<span className="text-yellow-400 font-bold">when</span> 渲染旅行足迹，<span className="text-purple-400 font-bold">then</span> 背景为黑白灰实景地图并悬浮数据统计（地点、照片、收藏）。</li>
                          <li><span className="text-green-400 font-bold">Given</span> 首页小组件，<span className="text-yellow-400 font-bold">when</span> 渲染全省手绘地图，<span className="text-purple-400 font-bold">then</span> 背景为淡绿色手绘风格加橙色定位图标。</li>
                          <li><span className="text-green-400 font-bold">Given</span> 用户点击对应地图，<span className="text-yellow-400 font-bold">when</span> 触发点击事件，<span className="text-purple-400 font-bold">then</span> 分别导航至 Footprint.tsx 和 MapExplore.tsx。</li>
                        </ul>
                      }
                    />
                  </>
                )}
                {renderWidget(widgetId, index)}
              </div>
            );
          })}

          {/* Add Widget Button */}
          {isEditingWidgets && (
            <div 
              onClick={() => setShowWidgetSelector(true)}
              className="col-span-1 row-span-1 bg-white border border-dashed border-gray-300 rounded-2xl p-2 flex flex-col items-center justify-center gap-1 cursor-pointer active:scale-95 transition-transform text-gray-400 hover:text-gray-600 hover:bg-gray-50 min-h-[70px]"
            >
              <Plus size={20} />
              <span className="text-[10px]">添加组件</span>
            </div>
          )}
        </div>
      </div>
"""

# Insert state and functions before 'const handleUpdateTrips = ...'
trip_list = trip_list.replace('  const handleUpdateTrips = (newTrips: Trip[] | ((prev: Trip[]) => Trip[])) => {', components + '\\n' + state_and_functions + '\\n  const handleUpdateTrips = (newTrips: Trip[] | ((prev: Trip[]) => Trip[])) => {')

# Insert JSX before '      {/* List Section */}'
trip_list = trip_list.replace('      {/* List Section */}', jsx + '\\n      {/* List Section */}')

with open('/Users/chenyinbing/Desktop/项目/huangxiaoxiv4.0/src/pages/TripList.tsx', 'w') as f:
    f.write(trip_list)
