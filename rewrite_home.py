import re

with open('src/pages/Home.tsx', 'r') as f:
    content = f.read()

# We want to define a renderContentModule function
# Find the end of `const renderWidget`
render_widget_end_idx = content.find('  const [mainTab, setMainTab]')
if render_widget_end_idx == -1:
    print("Could not find insertion point")
    exit(1)

# Wait, let's insert it before `return (`
return_idx = content.find('  return (\n    <div className="h-screen')
if return_idx == -1:
    print("Could not find return")
    exit(1)

# The content to replace is from `          {/* New Sections Area */}` to `      ) : (`'s closing div.
# Let's find exactly the boundaries.
start_str = '          {/* New Sections Area */}'
end_str = '      {/* Suggested Question */}'

start_idx = content.find(start_str)
end_idx = content.find(end_str)

if start_idx == -1 or end_idx == -1:
    print("Could not find sections")
    exit(1)

# Extract the sections
sections_content = content[start_idx:end_idx]

# Let's break sections_content into the three sections.
s1_start = sections_content.find('{/* Section 1: 好aoao好玩 */}')
s2_start = sections_content.find('{/* Section 2: Hiiiiii玩周末 */}')
s3_start = sections_content.find('{/* Section 3: 来都来lie，看一哈 */}')

# s3 ends where the div ends, which is just before `</div>\n        </div>\n      )}`
s3_end = sections_content.rfind('</div>\n        </div>\n      )}')

s1_content = sections_content[s1_start:s2_start].strip()
s2_content = sections_content[s2_start:s3_start].strip()
s3_content = sections_content[s3_start:s3_end].strip()

# Generate the renderContentModule function
render_content_module = f"""
  const removeContentModule = (id: ContentModuleType) => {{
    setActiveContentModules(prev => prev.filter(m => m !== id));
  }};

  const addContentModule = (id: ContentModuleType) => {{
    if (!activeContentModules.includes(id)) {{
      setActiveContentModules(prev => [...prev, id]);
    }}
    setShowContentModuleSelector(false);
  }};

  const renderContentModule = (id: ContentModuleType) => {{
    const isEditing = isEditingPage;
    
    const Wrapper = ({{ children }}: {{ children: React.ReactNode }}) => (
      <div className={{`relative ${{isEditing ? 'border-2 border-dashed border-indigo-400 p-2 rounded-2xl animate-[jiggle_0.3s_ease-in-out_infinite]' : ''}}`}}>
        {{isEditing && (
          <button 
            onClick={(e) => {{ e.stopPropagation(); removeContentModule(id); }}}
            className="absolute -top-2 -right-2 z-50 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
          >
            <Trash2 size={{14}} />
          </button>
        )}}
        <div className={{isEditing ? 'pointer-events-none opacity-80' : ''}}>
          {{children}}
        </div>
      </div>
    );

    switch(id) {{
      case 'recommend':
        return <Wrapper key="recommend">{s1_content}</Wrapper>;
      case 'weekend':
        return <Wrapper key="weekend">{s2_content}</Wrapper>;
      case 'masonry':
        return <Wrapper key="masonry">{s3_content}</Wrapper>;
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
                <div className="text-[12px] text-gray-500 flex items-center gap-1">更多 <ChevronRight size={{12}} /></div>
              </div>
              <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold italic">1</span>
                    <span className="text-sm font-medium text-gray-800">贵阳吃货必打卡</span>
                    <span className="bg-red-100 text-red-600 text-[9px] px-1 rounded">热</span>
                  </div>
                  <span className="text-xs text-gray-400">12.5w 讨论</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500 font-bold italic">2</span>
                    <span className="text-sm font-medium text-gray-800">周末去哪儿</span>
                  </div>
                  <span className="text-xs text-gray-400">8.2w 讨论</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 font-bold italic">3</span>
                    <span className="text-sm font-medium text-gray-800">避暑胜地推荐</span>
                  </div>
                  <span className="text-xs text-gray-400">5.4w 讨论</span>
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
                <div className="flex items-center gap-1 text-red-500 text-xs font-medium bg-red-50 px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  LIVE
                </div>
              </div>
              <div className="w-full h-48 bg-gray-900 rounded-2xl overflow-hidden relative shadow-sm">
                <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                    <Play size={{20}} className="ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="font-bold text-sm text-shadow">梵净山云海日出</div>
                  <div className="text-xs opacity-80 flex items-center gap-1"><User size={{10}}/> 1.2w 人正在看</div>
                </div>
              </div>
            </div>
          </Wrapper>
        );
      default:
        return null;
    }}
  }};
"""

# New rendering block to replace the sections
new_sections_area = """          {/* New Sections Area */}
          <div className="space-y-6">
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
        </div>
      )}
"""

# Insert renderContentModule before return
content = content[:return_idx] + render_content_module + "\n" + content[return_idx:]

# Update the new_sections_area index because we prepended renderContentModule
# Re-find the indices
start_idx = content.find(start_str)
end_idx = content.find(end_str)

content = content[:start_idx] + new_sections_area + "\n      " + content[end_idx:]

with open('src/pages/Home.tsx', 'w') as f:
    f.write(content)

print("Done")
