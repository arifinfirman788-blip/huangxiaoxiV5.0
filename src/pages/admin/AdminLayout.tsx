import React, { useState } from 'react';
import { Page } from '../../types';
import { Users, LayoutDashboard, Component, Settings, LogOut, ChevronRight, Search, Bell, Sliders } from 'lucide-react';
import AdminPermissions from './AdminPermissions';
import AdminContent from './AdminContent';
import AdminWidget from './AdminWidget';
import AdminConfig from './AdminConfig';

interface AdminLayoutProps {
  onNavigate: (page: Page) => void;
}

type AdminTab = 'permissions' | 'content' | 'widgets' | 'settings' | 'config';

export default function AdminLayout({ onNavigate }: AdminLayoutProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('config');

  const renderContent = () => {
    switch (activeTab) {
      case 'permissions': return <AdminPermissions />;
      case 'content': return <AdminContent />;
      case 'widgets': return <AdminWidget />;
      case 'config': return <AdminConfig />;
      default: return <div className="p-8 text-gray-500">该模块建设中...</div>;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm z-10">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <LayoutDashboard className="text-white" size={20} />
          </div>
          <div>
            <h1 className="font-black text-lg text-gray-900 leading-tight">黄小西中枢</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Admin Portal</p>
          </div>
        </div>

        <div className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
          <p className="text-xs font-bold text-gray-400 px-3 mb-2 tracking-wider">个性化配置</p>
          <NavItem 
            icon={<Sliders size={18} />} 
            label="应用配置" 
            isActive={activeTab === 'config'} 
            onClick={() => setActiveTab('config')} 
          />
          <p className="text-xs font-bold text-gray-400 px-3 mb-2 mt-4 tracking-wider">系统管理</p>
          <NavItem 
            icon={<Users size={18} />} 
            label="供应商与权限" 
            isActive={activeTab === 'permissions'} 
            onClick={() => setActiveTab('permissions')} 
          />
          <NavItem 
            icon={<LayoutDashboard size={18} />} 
            label="内容运营管理" 
            isActive={activeTab === 'content'} 
            onClick={() => setActiveTab('content')} 
          />
          <NavItem 
            icon={<Component size={18} />} 
            label="工具箱AI迭代" 
            isActive={activeTab === 'widgets'} 
            onClick={() => setActiveTab('widgets')} 
          />
          <NavItem 
            icon={<Settings size={18} />} 
            label="系统设置" 
            isActive={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4 px-2">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Admin" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
            <div>
              <div className="text-sm font-bold text-gray-900">超级管理员</div>
              <div className="text-[10px] text-green-500 font-medium">在线</div>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('home')}
            className="w-full py-2.5 px-4 text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut size={16} />
            退出返回移动端
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center text-sm font-medium text-gray-500 gap-2">
            <span>黄小西中枢</span>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-900 font-bold">
              {activeTab === 'config' ? '应用配置' : activeTab === 'permissions' ? '供应商与权限' : activeTab === 'content' ? '内容运营管理' : activeTab === 'widgets' ? '工具箱AI迭代' : '系统设置'}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="搜索配置项..." 
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-64 transition-all"
              />
            </div>
            <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive 
          ? 'bg-indigo-50 text-indigo-700 font-bold' 
          : 'text-gray-600 hover:bg-gray-50 font-medium'
      }`}
    >
      <span className={`${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>{icon}</span>
      <span className="text-sm">{label}</span>
      {isActive && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
      )}
    </button>
  );
}
