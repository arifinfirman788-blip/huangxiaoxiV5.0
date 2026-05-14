import re

with open('src/pages/Home.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the start and end of the New Sections Area
start_marker = '{/* New Sections Area */}'
end_marker = '{/* Suggested Question */}'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

old_area = content[start_idx:end_idx]

sec1_start = old_area.find('{/* Section 1: 好aoao好玩 */}')
sec2_start = old_area.find('{/* Section 2: Hiiiiii玩周末 */}')
sec3_start = old_area.find('{/* Section 3: 来都来lie，看一哈 */}')

sec1_content = old_area[sec1_start + len('{/* Section 1: 好aoao好玩 */}'):sec2_start].strip()
sec2_content = old_area[sec2_start + len('{/* Section 2: Hiiiiii玩周末 */}'):sec3_start].strip()

sec3_end = old_area.rfind('</div>', 0, old_area.rfind('</div>', 0, old_area.rfind('</div>', 0, old_area.rfind('</div>'))))
sec3_content = old_area[sec3_start + len('{/* Section 3: 来都来lie，看一哈 */}'):sec3_end].strip()

render_section_code = """
  const renderSection = (id: string) => {
    const isEditing = isEditingWidgets;
    const wrapperClass = `relative ${isEditing ? 'border-2 border-dashed border-indigo-400 p-2 rounded-2xl mb-4 animate-[jiggle_0.3s_ease-in-out_infinite]' : 'mb-6'}`;
    
    const DeleteButton = () => isEditing ? (
      <button 
        onClick={(e) => { e.stopPropagation(); removeSection(id); }}
        className="absolute -top-2 -right-2 z-50 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
      >
        <Trash2 size={14} />
      </button>
    ) : null;

    switch(id) {
      case 'section_fun':
        return (
          <div key={id} className={wrapperClass}>
            <DeleteButton />
            REPLACE_SEC1
          </div>
        );
      case 'section_weekend':
        return (
          <div key={id} className={wrapperClass}>
            <DeleteButton />
            REPLACE_SEC2
          </div>
        );
      case 'section_look':
        return (
          <div key={id} className={wrapperClass}>
            <DeleteButton />
            REPLACE_SEC3
          </div>
        );
      case 'section_food':
        return (
          <div key={id} className={wrapperClass}>
            <DeleteButton />
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[18px] font-bold text-gray-900">吃货集结号 🍜</h2>
              <div className="text-[10px] text-orange-600 bg-orange-50 px-2 py-1 rounded-full flex items-center gap-1 border border-orange-100 font-bold">
                <Utensils size={12} />
                附近必吃榜
              </div>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              <div className="w-[140px] flex-shrink-0 bg-white rounded-xl p-2 shadow-sm">
                <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&q=80" className="w-full h-[80px] rounded-lg object-cover mb-2" />
                <div className="text-[13px] font-bold text-gray-900 truncate">老凯俚酸汤鱼</div>
                <div className="text-[10px] text-gray-500 mt-1">贵阳必吃榜 · 3.2km</div>
              </div>
              <div className="w-[140px] flex-shrink-0 bg-white rounded-xl p-2 shadow-sm">
                <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=300&q=80" className="w-full h-[80px] rounded-lg object-cover mb-2" />
                <div className="text-[13px] font-bold text-gray-900 truncate">丝恋红汤丝娃娃</div>
                <div className="text-[10px] text-gray-500 mt-1">特色小吃 · 1.5km</div>
              </div>
            </div>
          </div>
        );
      case 'section_culture':
        return (
          <div key={id} className={wrapperClass}>
            <DeleteButton />
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[18px] font-bold text-gray-900">非遗体验馆 🎭</h2>
              <div className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1 border border-emerald-100 font-bold">
                <Languages size={12} />
                文化之旅
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-100 flex items-center gap-3">
              <img src={`${import.meta.env.BASE_URL}图片/miao.png`} className="w-[60px] h-[60px] rounded-lg object-cover" />
              <div className="flex-1">
                <div className="text-[14px] font-bold text-gray-900 mb-1">苗族银饰锻造技艺</div>
                <div className="text-[11px] text-gray-600">亲自体验敲打出属于自己的银饰纪念品</div>
                <div className="mt-2 bg-emerald-500 text-white text-[10px] px-2 py-1 rounded w-fit font-bold">立即预约体验</div>
              </div>
            </div>
          </div>
        );
      case 'section_hotel':
        return (
          <div key={id} className={wrapperClass}>
            <DeleteButton />
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[18px] font-bold text-gray-900">躺平指南 🏨</h2>
              <div className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full flex items-center gap-1 border border-indigo-100 font-bold">
                <Hotel size={12} />
                精选美宿
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm relative">
                <img src="https://images.unsplash.com/photo-1551882547-ff40c0d5f9af?w=300&q=80" className="w-full h-[100px] object-cover" />
                <div className="absolute top-2 left-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded backdrop-blur-sm">温泉私汤</div>
                <div className="p-2">
                  <div className="text-[12px] font-bold text-gray-900 truncate">柏联温泉酒店</div>
                  <div className="text-[10px] text-red-500 font-bold mt-0.5">¥1288<span className="text-gray-400 font-normal text-[9px]">起</span></div>
                </div>
              </div>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm relative">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80" className="w-full h-[100px] object-cover" />
                <div className="absolute top-2 left-2 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded backdrop-blur-sm">山景房</div>
                <div className="p-2">
                  <div className="text-[12px] font-bold text-gray-900 truncate">黄果树柏曼酒店</div>
                  <div className="text-[10px] text-red-500 font-bold mt-0.5">¥588<span className="text-gray-400 font-normal text-[9px]">起</span></div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
"""

render_section_code = render_section_code.replace('REPLACE_SEC1', sec1_content[5:-6])
render_section_code = render_section_code.replace('REPLACE_SEC2', sec2_content[5:-6])
render_section_code = render_section_code.replace('REPLACE_SEC3', sec3_content[5:-6])

new_area = """{/* New Sections Area */}
          <div>
            {activeSections.map(sectionId => renderSection(sectionId))}
            
            {/* Add Section Button */}
            {isEditingWidgets && (
              <div 
                onClick={() => setShowWidgetSelector(true)}
                className="w-full bg-white border border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform text-gray-400 hover:text-gray-600 hover:bg-gray-50 mt-2 mb-6"
              >
                <Plus size={24} />
                <span className="text-sm font-bold">添加内容模块</span>
              </div>
            )}
          </div>
        </div>
        </div>
      )}
"""

return_idx = content.find('  return (\n    <div className="h-full bg-gradient-to-b')
content = content[:return_idx] + render_section_code + "\n" + content[return_idx:start_idx] + new_area + "\n      " + content[end_idx:]

with open('src/pages/Home.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
