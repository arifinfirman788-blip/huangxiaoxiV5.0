import re
import sys

with open('src/pages/Home.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract sections
s1_match = re.search(r'(<div[^>]*>\s*<div className="flex items-center gap-2 mb-3">.*?好aoao好玩\'ツ.*?</div>\s*</div>)', content, re.DOTALL)
s2_match = re.search(r'(<div[^>]*>\s*<div className="flex items-center justify-between mb-3">.*?Hiiiiii玩周末 👀.*?</div>\s*</div>)', content, re.DOTALL)
s3_match = re.search(r'(<div[^>]*>\s*<h2 className="text-\[18px\] font-bold text-gray-900 mb-3">来都来lie，看一哈 🙄</h2>.*?</div>\s*</div>\s*</div>\s*</div>)', content, re.DOTALL)

if not s1_match or not s2_match or not s3_match:
    print("Failed to find sections")
    sys.exit(1)

s1_content = s1_match.group(1)
s2_content = s2_match.group(1)
s3_content = s3_match.group(1)

# Define new functions to insert
new_funcs = """
  const removeContentModule = (id: ContentModuleType) => {
    setActiveContentModules(prev => prev.filter(m => m !== id));
  };

  const addContentModule = (id: ContentModuleType) => {
    if (!activeContentModules.includes(id)) {
      setActiveContentModules(prev => [...prev, id]);
    }
    setShowContentModuleSelector(false);
  };

  const renderContentModule = (id: ContentModuleType) => {
    const isEditing = isEditingPage;
    
    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <div className={`relative ${isEditing ? 'border-2 border-dashed border-indigo-400 p-2 rounded-2xl animate-[jiggle_0.3s_ease-in-out_infinite]' : ''}`}>
        {isEditing && (
          <button 
            onClick={(e) => { e.stopPropagation(); removeContentModule(id); }}
            className="absolute -top-2 -right-2 z-50 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
          >
            <Trash2 size={14} />
          </button>
        )}
        <div className={isEditing ? 'pointer-events-none opacity-80' : ''}>
          {children}
        </div>
      </div>
    );

    switch(id) {
      case 'recommend':
        return <Wrapper key="recommend">__S1__</Wrapper>;
      case 'weekend':
        return <Wrapper key="weekend">__S2__</Wrapper>;
      case 'masonry':
        return <Wrapper key="masonry">__S3__</Wrapper>;
      case 'banner':
        return (
          <Wrapper key="banner">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[18px] font-bold text-gray-900 flex-shrink-0 whitespace-nowrap">运营活动横幅</h2>
              </div>
              <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-sm overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=800&q=80" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay" />
                <div className="relative z-10 text-center">
                  <div className="font-black text-2xl tracking-wider mb-1">五一狂欢节</div>
                  <div className="text-xs opacity-90">限时门票买一送一</div>
                </div>
              </div>
            </div>
          </Wrapper>
        );
      case 'topic':
        return (
          <Wrapper key="topic">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[18px] font-bold text-gray-900 flex-shrink-0 whitespace-nowrap">热门话题榜</h2>
                <div className="text-[10px] text-gray-500 flex items-center gap-0.5 bg-white/60 px-1.5 py-0.5 rounded-full">
                  <span>查看全部</span>
                  <ChevronRight size={10} />
                </div>
              </div>
              <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-black italic">1</span>
                    <span className="text-[13px] font-bold text-gray-900">#贵阳路边音乐会#</span>
                  </div>
                  <span className="text-[10px] text-gray-400">12.5w 讨论</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 font-black italic">2</span>
                    <span className="text-[13px] font-bold text-gray-900">#黄果树瀑布水量#</span>
                  </div>
                  <span className="text-[10px] text-gray-400">8.2w 讨论</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 font-black italic">3</span>
                    <span className="text-[13px] font-bold text-gray-900">#村超门票怎么抢#</span>
                  </div>
                  <span className="text-[10px] text-gray-400">5.6w 讨论</span>
                </div>
              </div>
            </div>
          </Wrapper>
        );
      case 'live':
        return (
          <Wrapper key="live">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[18px] font-bold text-gray-900 flex-shrink-0 whitespace-nowrap">景区慢直播</h2>
                <div className="text-[10px] text-red-500 bg-red-50 px-2 py-1 rounded-full flex items-center gap-1 border border-red-100 font-bold flex-shrink-0 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  LIVE
                </div>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative">
                <div className="w-full h-40 relative">
                  <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                      <Play size={20} className="ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md font-medium z-10 flex items-center gap-1">
                    <MapPin size={10} /> 梵净山红云金顶
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md font-medium z-10">
                    1.2w 人正在观看
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        );
      default:
        return null;
    }
  };
"""

new_funcs = new_funcs.replace('__S1__', s1_content)
new_funcs = new_funcs.replace('__S2__', s2_content)
new_funcs = new_funcs.replace('__S3__', s3_content)

# Insert the functions before return (
insert_pos = content.rfind('  return (')
if insert_pos == -1:
    print("Failed to find return statement")
    sys.exit(1)

content = content[:insert_pos] + new_funcs + '\n' + content[insert_pos:]

# Replace the New Sections Area
sections_start = content.find('{/* New Sections Area */}')
sections_end = content.find('          {/* Modals & Overlays */}')

if sections_start == -1 or sections_end == -1:
    print("Failed to find sections area")
    sys.exit(1)

new_sections_area = """{/* New Sections Area */}
          <div className="space-y-6 relative">
            {activeContentModules.map(moduleType => renderContentModule(moduleType))}
            
            {isEditingPage && (
              <div 
                onClick={() => setShowContentModuleSelector(true)}
                className="w-full bg-white border border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              >
                <div className="bg-gray-100 p-2 rounded-full">
                  <Plus size={20} />
                </div>
                <span className="text-sm font-medium">添加内容模块</span>
              </div>
            )}
          </div>

"""

content = content[:sections_start] + new_sections_area + content[sections_end:]

with open('src/pages/Home.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated Home.tsx")
