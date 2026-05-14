import React, { useState } from 'react';
import { Bot, Code2, RefreshCw, Smartphone, Play, Plus, Trash2 } from 'lucide-react';

export default function AdminWidget() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // Simulate completion
    }, 2000);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-1">工具箱组件 AI 快速迭代</h2>
          <p className="text-sm text-gray-500">通过自然语言描述，利用 AI 生成新的行程页小组件代码，并实时预览效果。</p>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left: AI Prompt & Control */}
        <div className="w-1/2 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="text-indigo-600" size={20} />
              <h3 className="font-bold text-gray-900">需求描述 (Prompt)</h3>
            </div>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例如：帮我生成一个 2x2 尺寸的汇率换算小组件，深色模式，左侧显示人民币，右侧显示泰铢，带有一个刷新按钮..."
              className="w-full flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none font-mono"
            ></textarea>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <Code2 size={14} /> 支持 React/Tailwind 语法
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
              >
                {isGenerating ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
                {isGenerating ? '生成中...' : '生成组件代码'}
              </button>
            </div>
          </div>

          {/* Component List */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">已发布组件库</h3>
              <button className="text-indigo-600 text-xs font-bold flex items-center gap-1 hover:bg-indigo-50 px-2 py-1 rounded">
                <Plus size={14} /> 新建空模板
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {['天气组件 (weather_2x2)', '活点地图 (map_2x1)', '倒计时 (countdown_1x1)'].map((name, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-indigo-100 group cursor-pointer transition-colors">
                  <span className="text-sm font-medium text-gray-700">{name}</span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded font-bold">编辑</button>
                    <button className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Preview & Code */}
        <div className="w-1/2 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Smartphone className="text-gray-900" size={20} />
                <h3 className="font-bold text-gray-900">实时预览 (Preview)</h3>
              </div>
              <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                <button className="px-3 py-1 bg-white rounded shadow-sm text-xs font-bold text-gray-900">2x2</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-900 text-xs font-bold rounded">2x1</button>
                <button className="px-3 py-1 text-gray-500 hover:text-gray-900 text-xs font-bold rounded">1x1</button>
              </div>
            </div>
            
            <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center relative overflow-hidden">
              {isGenerating ? (
                <div className="flex flex-col items-center text-indigo-500">
                  <RefreshCw size={32} className="animate-spin mb-3" />
                  <span className="text-sm font-bold animate-pulse">AI 正在编写代码并渲染...</span>
                </div>
              ) : prompt ? (
                <div className="w-32 h-32 bg-gray-900 rounded-2xl text-white flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform cursor-pointer">
                  <span className="text-2xl mb-1">¥ / ฿</span>
                  <span className="text-xs font-medium text-gray-400">汇率换算</span>
                </div>
              ) : (
                <span className="text-gray-400 text-sm font-medium">在左侧输入需求并生成预览</span>
              )}
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl shadow-sm p-5 flex-1 flex flex-col min-h-0 relative group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded font-mono transition-colors">Copy</button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="text-gray-400" size={20} />
              <h3 className="font-bold text-gray-200">生成代码 (Generated JSX)</h3>
            </div>
            <div className="flex-1 overflow-auto">
              <pre className="text-xs text-green-400 font-mono leading-relaxed">
{isGenerating ? '// Generating...' : prompt ? `export const ExchangeWidget = () => {
  return (
    <div className="w-full h-full bg-gray-900 rounded-2xl p-4 flex flex-col justify-between text-white">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">实时汇率</span>
        <button><RefreshCw size={14} /></button>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold">1</span>
        <span className="text-sm pb-1">CNY</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-green-400">4.85</span>
        <span className="text-xs pb-1 text-gray-400">THB</span>
      </div>
    </div>
  );
};` : '// No code generated yet. Enter prompt above.'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
