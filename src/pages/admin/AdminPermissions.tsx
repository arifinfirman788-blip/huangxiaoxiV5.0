import React, { useState } from 'react';
import { Plus, Filter, MoreHorizontal, Shield, UserCheck, Briefcase, Edit, Trash2, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPermissions() {
  const [users, setUsers] = useState([
    { id: 1, name: '张三', company: '贵州文旅集团', role: '超级管理员', status: '正常', modules: ['全量模块'] },
    { id: 2, name: '李四', company: '高德地图', role: '榜单供应商', status: '正常', modules: ['榜单运营', 'POI管理'] },
    { id: 3, name: '王五', company: '马蜂窝', role: 'UGC运营专员', status: '正常', modules: ['社区瀑布流审核'] },
    { id: 4, name: '赵六', company: '携程旅行', role: '酒店供应商', status: '冻结', modules: ['酒店数据录入'] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleOpenModal = (mode: 'add' | 'edit', user?: any) => {
    setModalMode(mode);
    setCurrentUser(user || { name: '', company: '', role: '内容供应商', status: '正常', modules: [] });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (modalMode === 'add') {
      setUsers([{ ...currentUser, id: Date.now() }, ...users]);
    } else {
      setUsers(users.map(u => u.id === currentUser.id ? currentUser : u));
    }
    setIsModalOpen(false);
    (window as any).showGlobalToast?.('success', modalMode === 'add' ? '新增供应商成功' : '供应商信息已更新');
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除该供应商账号吗？此操作不可恢复。')) {
      setUsers(users.filter(u => u.id !== id));
      (window as any).showGlobalToast?.('success', '供应商已删除');
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-1">供应商与权限分配</h2>
          <p className="text-sm text-gray-500">管理各合作方供应商的账号及后台模块可见权限。</p>
        </div>
        <button 
          onClick={() => handleOpenModal('add')}
          className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 active:scale-95"
        >
          <Plus size={16} />
          新增供应商账号
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Briefcase size={24} />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">{users.length}</div>
            <div className="text-xs text-gray-500 font-medium">合作供应商总数</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <UserCheck size={24} />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">{users.filter(u => u.status === '正常').length}</div>
            <div className="text-xs text-gray-500 font-medium">活跃运营账号</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <Shield size={24} />
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900">8</div>
            <div className="text-xs text-gray-500 font-medium">预设权限角色</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex gap-2">
            <select className="bg-white border border-gray-200 text-sm px-3 py-1.5 rounded-lg outline-none font-medium text-gray-600">
              <option>所有供应商</option>
              <option>高德地图</option>
              <option>马蜂窝</option>
              <option>携程旅行</option>
            </select>
            <select className="bg-white border border-gray-200 text-sm px-3 py-1.5 rounded-lg outline-none font-medium text-gray-600">
              <option>账号状态</option>
              <option>正常</option>
              <option>冻结</option>
            </select>
          </div>
          <button className="text-gray-500 hover:text-gray-900 p-1">
            <Filter size={18} />
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-wider">
              <th className="p-4 pl-6">账号信息</th>
              <th className="p-4">所属供应商</th>
              <th className="p-4">角色</th>
              <th className="p-4">权限模块</th>
              <th className="p-4">状态</th>
              <th className="p-4 text-right pr-6">操作</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                <td className="p-4 pl-6">
                  <div className="font-bold text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500 font-mono">ID: {String(user.id).padStart(4, '0')}</div>
                </td>
                <td className="p-4 font-medium text-gray-700">{user.company}</td>
                <td className="p-4">
                  <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-bold">
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {user.modules.map(m => (
                      <span key={m} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100">
                        {m}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${
                    user.status === '正常' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {user.status === '正常' ? <CheckCircle2 size={12} /> : <X size={12} />}
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-right pr-6">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal('edit', user)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">暂无供应商数据</td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div className="p-4 flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 bg-gray-50/50">
          <span>共 {users.length} 条记录</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">上一页</button>
            <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50">下一页</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-black text-gray-900">
                  {modalMode === 'add' ? '新增供应商' : '编辑供应商'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">联系人姓名</label>
                  <input 
                    type="text" 
                    value={currentUser?.name}
                    onChange={(e) => setCurrentUser({...currentUser, name: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="输入姓名"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">所属供应商 (公司)</label>
                  <input 
                    type="text" 
                    value={currentUser?.company}
                    onChange={(e) => setCurrentUser({...currentUser, company: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="例如：高德地图"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">分配角色</label>
                    <select 
                      value={currentUser?.role}
                      onChange={(e) => setCurrentUser({...currentUser, role: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    >
                      <option>内容供应商</option>
                      <option>榜单供应商</option>
                      <option>酒店供应商</option>
                      <option>超级管理员</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">账号状态</label>
                    <select 
                      value={currentUser?.status}
                      onChange={(e) => setCurrentUser({...currentUser, status: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    >
                      <option>正常</option>
                      <option>冻结</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">授权模块 (可多选)</label>
                  <div className="flex flex-wrap gap-2">
                    {['全量模块', '榜单运营', 'POI管理', '社区瀑布流审核', '酒店数据录入', '周末游管理'].map(m => {
                      const isSelected = currentUser?.modules?.includes(m);
                      return (
                        <button
                          key={m}
                          onClick={(e) => {
                            e.preventDefault();
                            const currentModules = currentUser?.modules || [];
                            if (isSelected) {
                              setCurrentUser({ ...currentUser, modules: currentModules.filter((mod: string) => mod !== m) });
                            } else {
                              setCurrentUser({ ...currentUser, modules: [...currentModules, m] });
                            }
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                            isSelected
                              ? 'bg-blue-50 border-blue-200 text-blue-600'
                              : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={handleSave}
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors active:scale-95"
                >
                  保存
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
