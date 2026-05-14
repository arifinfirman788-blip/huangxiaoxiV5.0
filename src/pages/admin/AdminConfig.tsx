import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, Upload, Eye, EyeOff, Type, Image as ImageIcon, MessageSquare, Bell, Globe, CheckCircle2 } from 'lucide-react';
import { getConfig, setConfig, resetConfig, AppConfig, subscribeConfig } from '../../store';

export default function AdminConfig() {
  const [config, setLocalConfig] = useState<AppConfig>(getConfig());
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState<'plaza' | 'discover'>('plaza');

  useEffect(() => {
    const unsubscribe = subscribeConfig(() => {
      setLocalConfig(getConfig());
    });
    return unsubscribe;
  }, []);

  const handlePlazaChange = (field: keyof AppConfig['plaza'], value: string) => {
    setLocalConfig(prev => ({
      ...prev,
      plaza: { ...prev.plaza, [field]: value }
    }));
  };

  const handleDiscoverModuleChange = (index: number, field: keyof AppConfig['discover']['modules'][0], value: any) => {
    setLocalConfig(prev => ({
      ...prev,
      discover: {
        ...prev.discover,
        modules: prev.discover.modules.map((m, i) =>
          i === index ? { ...m, [field]: value } : m
        )
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setConfig(config);
    
    setIsSaving(false);
    setSaveSuccess(true);
    
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('确定要重置所有配置为默认值吗？')) {
      resetConfig();
      setLocalConfig(getConfig());
    }
  };

  const sections = [
    { id: 'plaza' as const, label: '广场配置', icon: <Globe size={18} /> },
    { id: 'discover' as const, label: '发现页配置', icon: <Type size={18} /> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900">应用配置</h2>
          <p className="text-sm text-gray-500 mt-1">分别配置广场和发现页的个性化设置</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl flex items-center gap-2 transition-colors"
          >
            <RefreshCw size={16} />
            重置默认
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-2.5 text-sm font-bold text-white rounded-xl flex items-center gap-2 transition-all ${
              isSaving 
                ? 'bg-gray-400 cursor-not-allowed' 
                : saveSuccess 
                  ? 'bg-green-600' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200'
            }`}
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                保存中...
              </>
            ) : saveSuccess ? (
              <>
                <CheckCircle2 size={18} />
                已保存
              </>
            ) : (
              <>
                <Save size={18} />
                保存配置
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl w-fit">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
              activeSection === section.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {section.icon}
            {section.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {activeSection === 'plaza' && (
          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Globe size={20} className="text-indigo-600" />
                广场配置
              </h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Logo 图片</label>
                    <div className="text-xs text-gray-400">支持 PNG、JPG、SVG</div>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer group">
                    {config.plaza.logoUrl ? (
                      <div className="space-y-4">
                        <img src={config.plaza.logoUrl} alt="Logo 预览" className="h-20 mx-auto object-contain" />
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); handlePlazaChange('logoUrl', ''); }}
                            className="text-sm text-red-500 hover:text-red-600 font-medium"
                          >
                            移除
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-indigo-50 transition-colors">
                          <ImageIcon size={28} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium text-gray-700">点击上传</span> 或拖拽文件到此处
                        </div>
                      </div>
                    )}
                  </div>
                  {!config.plaza.logoUrl && (
                    <input
                      type="text"
                      value={config.plaza.logoUrl}
                      onChange={(e) => handlePlazaChange('logoUrl', e.target.value)}
                      placeholder="或输入 Logo URL 链接"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MessageSquare size={16} className="text-gray-500" />
                    欢迎语
                  </label>
                  <textarea
                    value={config.plaza.welcomeText}
                    onChange={(e) => handlePlazaChange('welcomeText', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                    placeholder="输入欢迎语"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Bell size={16} className="text-gray-500" />
                    公告文案
                  </label>
                  <input
                    type="text"
                    value={config.plaza.announcementText}
                    onChange={(e) => handlePlazaChange('announcementText', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="输入公告文案"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'discover' && (
          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Type size={20} className="text-indigo-600" />
                发现页模块配置
              </h3>
              <p className="text-sm text-gray-500 mb-6">配置发现页各模块的标题和可见性</p>
              
              <div className="space-y-4">
                {config.discover.modules.map((module, index) => (
                  <div 
                    key={module.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <button
                      onClick={() => handleDiscoverModuleChange(index, 'visible', !module.visible)}
                      className={`p-2 rounded-xl transition-colors ${
                        module.visible 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {module.visible ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-gray-700">模块 {index + 1}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          module.visible 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {module.visible ? '显示' : '隐藏'}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) => handleDiscoverModuleChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                        placeholder="模块标题"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4">
        <Bell size={24} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-bold text-amber-900">配置说明</h4>
          <p className="text-sm text-amber-800 mt-1 leading-relaxed">
            广场配置：可设置 Logo、欢迎语和公告文案。发现页配置：可配置各模块的标题和是否显示。
          </p>
        </div>
      </div>
    </div>
  );
}
