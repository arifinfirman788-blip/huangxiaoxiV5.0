import React, { useState, useEffect } from 'react';
import { Image, FileText, MapPin, Sparkles, CheckCircle2, XCircle, Plus, Edit, Trash2, X, ChevronLeft, Save, ShieldCheck, UserCircle, Tag, Layers, Database, Edit3, Info, RefreshCw, LayoutGrid, List as ListIcon, UploadCloud, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUgcCategories, setUgcCategoriesStore, subscribeUgcCategories } from '../../store';

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState('ugc');
  const [viewMode, setViewMode] = useState<'list' | 'edit'>('list');

  // --- UGC States ---
  const [ugcViewMode, setUgcViewMode] = useState<'list' | 'audit'>('list');
  const [ugcSubTab, setUgcSubTab] = useState<'matrix' | 'audit'>('audit');
  const [currentUgc, setCurrentUgc] = useState<any>(null);
  const [ugcDisplayStyle, setUgcDisplayStyle] = useState<'grid' | 'table'>('grid');

  const [ugcCategories, setUgcCategories] = useState(getUgcCategories());

  useEffect(() => {
    const unsubscribe = subscribeUgcCategories(() => {
      setUgcCategories(getUgcCategories());
    });
    return unsubscribe;
  }, []);

  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [currentCat, setCurrentCat] = useState<any>(null);

  const [activeUgcCategory, setActiveUgcCategory] = useState<string | 'all'>('all');

  const handleOpenCatModal = (cat?: any) => {
    setCurrentCat(cat || { name: '', supplier: '内部运营', accessMethod: 'manual' });
    setIsCatModalOpen(true);
  };

  const handleSaveCat = () => {
    let newCats;
    if (!currentCat.id) {
      newCats = [...ugcCategories, { ...currentCat, id: Date.now(), isHot: false }];
    } else {
      newCats = ugcCategories.map(c => c.id === currentCat.id ? currentCat : c);
    }
    setUgcCategoriesStore(newCats);
    setIsCatModalOpen(false);
    (window as any).showGlobalToast?.('success', '细分分类已保存');
  };

  const handleDeleteCat = (id: number) => {
    if (confirm('确定要删除该分类吗？删除后相关内容可能失去路由。')) {
      const newCats = ugcCategories.filter(c => c.id !== id);
      setUgcCategoriesStore(newCats);
      (window as any).showGlobalToast?.('success', '分类已删除');
    }
  };

  const [ugcPosts, setUgcPosts] = useState([
    { id: 1, title: '贵阳草莓音乐节早鸟票抢票攻略，附周边住宿推荐！', category: '音乐节', author: '旅行达人小A', image: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?w=500&q=80', status: '待审核', content: '这次草莓音乐节阵容太强大了，教大家怎么在第一时间抢到早鸟票...', source: 'API 接口同步' },
    { id: 2, title: '梵净山云海日出实拍，太震撼了！', category: '户外徒步', author: '户外老李', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80', status: '待审核', content: '凌晨三点开始爬，终于赶上了日出，云海翻腾的感觉真的语言无法形容...', source: '手动录入' },
    { id: 3, title: '隐秘在老城区的神仙咖啡馆', category: '探店美食', author: 'CofferLover', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=80', status: '已发布', content: '今天发现了一家超棒的复古咖啡馆，老板是个很有故事的人...', source: 'API 接口同步' },
  ]);

  const handleCategorySupplierChange = (categoryId: number, newSupplier: string) => {
    const newCats = ugcCategories.map(c => c.id === categoryId ? { ...c, supplier: newSupplier } : c);
    setUgcCategoriesStore(newCats);
    (window as any).showGlobalToast?.('success', '分类授权已更新');
  };

  const handleUgcAction = (id: number, action: 'approve' | 'reject') => {
    setUgcPosts(ugcPosts.map(p => p.id === id ? { ...p, status: action === 'approve' ? '已发布' : '已驳回' } : p));
    (window as any).showGlobalToast?.('success', action === 'approve' ? '内容已发布' : '内容已驳回');
  };

  const handleOpenUgcAudit = (post?: any) => {
    if (!post) {
      // New UGC entry
      setCurrentUgc({ title: '', content: '', image: '', category: '音乐节', author: '当前账号', status: '待审核', source: '手动录入' });
    } else {
      setCurrentUgc(post);
    }
    setUgcViewMode('audit');
  };

  const handleSaveUgcAudit = () => {
    if (!currentUgc.id) {
      setUgcPosts([{ ...currentUgc, id: Date.now() }, ...ugcPosts]);
    } else {
      setUgcPosts(ugcPosts.map(p => p.id === currentUgc.id ? currentUgc : p));
    }
    setUgcViewMode('list');
    (window as any).showGlobalToast?.('success', currentUgc.id ? '审核信息已保存' : 'UGC 内容已录入');
  };

  const getSupplierForCategory = (categoryName: string) => {
    return ugcCategories.find(c => c.name === categoryName)?.supplier || '内部运营';
  };

  const tabs = [
    { id: 'weekend', label: '周末计划管理' },
    { id: 'ugc', label: 'UGC 社区运营管理' },
    { id: 'home_config', label: '首页外部模块配置' },
    { id: 'ranking_list', label: '高德扫街榜管理' }
  ];

  // --- Ranking List States ---
  const [rankingViewMode, setRankingViewMode] = useState<'list' | 'edit' | 'import'>('list');
  const [currentRanking, setCurrentRanking] = useState<any>(null);
  const [rankingData, setRankingData] = useState([
    { id: 1, title: '玉珍酸笋火锅(喷水池店)', category: '烟火小店', score: '4.8', source: '高德 API 同步', status: '已上架' },
    { id: 2, title: '老凯俚酸汤鱼(省府路店)', category: '必吃美食', score: '4.9', source: '内部运营录入', status: '已上架' },
    { id: 3, title: '甲秀楼', category: '必去景点', score: '4.8', source: '高德 API 同步', status: '待审核' }
  ]);

  const handleOpenRankingEditor = (ranking?: any) => {
    setCurrentRanking(ranking || { title: '', category: '必吃美食', score: '5.0', source: '内部运营录入', status: '已上架', image: '', content: '' });
    setRankingViewMode('edit');
  };

  const handleSaveRanking = () => {
    if (!currentRanking.id) {
      setRankingData([{ ...currentRanking, id: Date.now() }, ...rankingData]);
    } else {
      setRankingData(rankingData.map(r => r.id === currentRanking.id ? currentRanking : r));
    }
    setRankingViewMode('list');
    (window as any).showGlobalToast?.('success', currentRanking.id ? '榜单内容已更新' : '榜单内容已录入');
  };

  const handleDeleteRanking = (id: number) => {
    if (confirm('确定要删除这条榜单数据吗？')) {
      setRankingData(rankingData.filter(r => r.id !== id));
      (window as any).showGlobalToast?.('success', '数据已删除');
    }
  };

  // Mock data for home external configs
  const homeConfigData = [
    { id: 1, moduleName: '周末去哪儿 - 圈子拼队大厅', redirectUrl: 'https://h5.example.com/team', thirdParty: '同程旅行', status: '生效中' },
    { id: 2, moduleName: '玩点不一样 (旅游套餐)', redirectUrl: 'https://h5.example.com/packages', thirdParty: '携程旅行', status: '生效中' }
  ];

  const [weekendPlans, setWeekendPlans] = useState([
    { id: 1, title: '太阳葡萄小镇', tags: ['户外', '亲子游'], image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=500&q=80', supplier: '携程旅行', status: '待审核', content: '周末带孩子逃离城市喧嚣...' },
    { id: 2, title: '沣河梁家滩湿地公园', tags: ['露营', '自然'], image: 'https://images.unsplash.com/photo-1533588269722-e64c39f1e185?w=500&q=80', supplier: '内部运营', status: '已上架', content: '非常适合露营...' },
  ]);

  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentPlan, setCurrentPlan] = useState<any>(null);

  const handleOpenEditor = (mode: 'add' | 'edit', plan?: any) => {
    setModalMode(mode);
    setCurrentPlan(plan || { title: '', tags: [], image: '', supplier: '内部运营', status: '已上架', content: '' });
    setViewMode('edit');
  };

  const handleSave = () => {
    if (modalMode === 'add') {
      setWeekendPlans([{ ...currentPlan, id: Date.now() }, ...weekendPlans]);
    } else {
      setWeekendPlans(weekendPlans.map(p => p.id === currentPlan.id ? currentPlan : p));
    }
    setViewMode('list');
    (window as any).showGlobalToast?.('success', modalMode === 'add' ? '新增计划成功' : '计划已更新');
  };

  const handleDelete = (id: number) => {
    if (confirm('确定要删除该周末计划吗？')) {
      setWeekendPlans(weekendPlans.filter(p => p.id !== id));
      (window as any).showGlobalToast?.('success', '计划已删除');
    }
  };

  const handleSupplierChange = (newSupplier: string) => {
    const newStatus = newSupplier === '内部运营' ? '已上架' : '待审核';
    setCurrentPlan({ ...currentPlan, supplier: newSupplier, status: newStatus });
  };

  const renderUgcList = () => {
    const filteredPosts = activeUgcCategory === 'all' 
      ? ugcPosts 
      : ugcPosts.filter(p => p.category === activeUgcCategory);

    if (ugcDisplayStyle === 'table') {
      return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-wider">
                <th className="p-4 pl-6 w-1/3">图文内容</th>
                <th className="p-4">作者/来源</th>
                <th className="p-4">路由方</th>
                <th className="p-4">状态</th>
                <th className="p-4 text-right pr-6">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredPosts.map(post => (
                <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <img src={post.image} alt={post.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-gray-900 line-clamp-1">{post.title}</div>
                        <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                          <Tag size={10} /> {post.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-700 flex items-center gap-1">
                        <UserCircle size={12} className="text-gray-400" /> {post.author}
                      </span>
                      <span className={`text-[10px] font-bold w-fit px-1.5 py-0.5 rounded ${post.source === 'API 接口同步' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                        {post.source === 'API 接口同步' ? <><Database size={10} className="inline mr-0.5" /> API同步</> : '手工录入'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                      {getSupplierForCategory(post.category)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 w-fit border ${
                      post.status === '已发布' ? 'bg-green-50 text-green-600 border-green-100' :
                      post.status === '已驳回' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6">
                    {post.status === '待审核' ? (
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleUgcAction(post.id, 'approve')} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="通过">
                          <CheckCircle2 size={16} />
                        </button>
                        <button onClick={() => handleUgcAction(post.id, 'reject')} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="驳回">
                          <XCircle size={16} />
                        </button>
                        <button onClick={() => handleOpenUgcAudit(post)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="编辑/查看">
                          <Edit size={16} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleOpenUgcAudit(post)} className="px-3 py-1.5 text-[10px] font-bold text-indigo-600 border border-indigo-100 hover:bg-indigo-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        查看详情
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">该分类下暂无内容</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-6">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-lg transition-all flex flex-col group">
            <div className="h-48 relative overflow-hidden">
              <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1 border border-white/10 shadow-sm">
                  <Tag size={10} /> {post.category}
                </span>
                <span className="bg-indigo-600/90 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1 shadow-sm">
                  <ShieldCheck size={10} /> 路由至: {getSupplierForCategory(post.category)}
                </span>
              </div>
              {post.source === 'API 接口同步' && (
                <div className="absolute top-3 right-3">
                  <span className="bg-blue-500/90 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1 shadow-sm">
                    <Database size={10} /> API 同步
                  </span>
                </div>
              )}
            </div>
            <div className="p-5 flex-1 flex flex-col relative z-10 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <UserCircle size={16} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-600">{post.author}</span>
                <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                  post.status === '已发布' ? 'bg-green-50 text-green-600 border-green-100' :
                  post.status === '已驳回' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                }`}>{post.status}</span>
              </div>
              <h3 className="font-black text-gray-900 text-sm mb-2 line-clamp-2 leading-snug">{post.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-5 leading-relaxed">{post.content}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex gap-2">
                {post.status === '待审核' ? (
                  <>
                    <button onClick={() => handleUgcAction(post.id, 'approve')} className="flex-1 bg-green-50 text-green-600 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-green-100 transition-colors">
                      <CheckCircle2 size={14} /> 通过
                    </button>
                    <button onClick={() => handleUgcAction(post.id, 'reject')} className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-red-100 transition-colors">
                      <XCircle size={14} /> 驳回
                    </button>
                    <button onClick={() => handleOpenUgcAudit(post)} className="px-3 bg-gray-50 text-gray-600 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center hover:bg-gray-100 transition-colors">
                      <Edit size={14} />
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleOpenUgcAudit(post)} className="w-full bg-gray-50 text-gray-600 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-gray-100 transition-colors">
                    <Edit size={14} /> 查看详情 / 重新编辑
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderUgcMatrix = () => {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <ShieldCheck size={16} className="text-indigo-600" />
            内容分类管理
          </div>
          <button 
            onClick={() => handleOpenCatModal()}
            className="bg-white border border-gray-200 text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Plus size={14} /> 新增分类
          </button>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-wider sticky top-0 z-10">
                <th className="p-4 pl-6">细分品类</th>
                <th className="p-4">供应商</th>
                <th className="p-4">接入方式</th>
                <th className="p-4 text-right pr-6">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr 
                onClick={() => setActiveUgcCategory('all')}
                className={`border-b border-gray-50 cursor-pointer transition-colors ${activeUgcCategory === 'all' ? 'bg-indigo-50/50' : 'hover:bg-gray-50/50'}`}
              >
                <td className="p-4 pl-6 font-bold text-gray-900 whitespace-nowrap">全部内容</td>
                <td className="p-4 text-gray-400">-</td>
                <td className="p-4 text-gray-400">-</td>
                <td className="p-4 text-right pr-6 text-gray-400">-</td>
              </tr>
              {ugcCategories.map(cat => (
                <tr 
                  key={cat.id} 
                  onClick={() => setActiveUgcCategory(cat.name)}
                  className={`border-b border-gray-50 cursor-pointer transition-colors group ${activeUgcCategory === cat.name ? 'bg-indigo-50/50' : 'hover:bg-gray-50/50'}`}
                >
                  <td className="p-4 pl-6 font-bold text-gray-900 flex items-center gap-2 whitespace-nowrap">
                    {activeUgcCategory === cat.name && <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />}
                    <span className="truncate">{cat.name}</span>
                  </td>
                  <td className="p-4">
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-bold">
                      {cat.supplier}
                    </span>
                  </td>
                  <td className="p-4">
                    {cat.accessMethod === 'api' ? (
                      <span className="text-blue-600 text-[10px] font-bold flex items-center gap-1">
                        <Database size={12} /> API 同步
                      </span>
                    ) : (
                      <span className="text-gray-600 text-[10px] font-bold flex items-center gap-1">
                        <Edit3 size={12} /> 手动录入
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right pr-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); handleOpenCatModal(cat); }} className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Edit size={14} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDeleteCat(cat.id); }} className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderRankingList = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white border-b border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <th className="p-4 pl-6">标题</th>
            <th className="p-4">分类</th>
            <th className="p-4">评分</th>
            <th className="p-4">数据来源</th>
            <th className="p-4">状态</th>
            <th className="p-4 text-right pr-6">操作</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {rankingData.map(item => (
            <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
              <td className="p-4 pl-6 font-bold text-gray-900">{item.title}</td>
              <td className="p-4 font-medium text-gray-700">{item.category}</td>
              <td className="p-4 font-bold text-orange-500">{item.score}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                  item.source.includes('API') ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-100 text-gray-600'
                }`}>
                  {item.source}
                </span>
              </td>
              <td className="p-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${
                  item.status === '已上架' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {item.status === '已上架' ? <CheckCircle2 size={12} /> : <Sparkles size={12} />}
                  {item.status}
                </span>
              </td>
              <td className="p-4 text-right pr-6">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenRankingEditor(item)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDeleteRanking(item.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderHomeConfig = () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2 text-sm text-gray-600">
        <Info size={16} className="text-blue-500" />
        此模块用于配置首页对接第三方 H5 的引流入口（如“周末玩乐大本营”、“玩点不一样”），仅需配置样式与跳转链接，无需录入具体业务数据。
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white border-b border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <th className="p-4 pl-6">首页入口模块</th>
            <th className="p-4">跳转链接 (H5 URL)</th>
            <th className="p-4">第三方供应商</th>
            <th className="p-4">状态</th>
            <th className="p-4 text-right pr-6">操作</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {homeConfigData.map(item => (
            <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
              <td className="p-4 pl-6 font-bold text-gray-900">{item.moduleName}</td>
              <td className="p-4 text-gray-500 text-xs font-mono max-w-[200px] truncate">{item.redirectUrl}</td>
              <td className="p-4 font-medium text-gray-700">{item.thirdParty}</td>
              <td className="p-4">
                <span className="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
                  <CheckCircle2 size={12} />
                  {item.status}
                </span>
              </td>
              <td className="p-4 text-right pr-6">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-100">
                    配置入口样式
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderRankingImport = () => (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => setRankingViewMode('list')} className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-500 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-black text-gray-900">批量导入榜单数据</h2>
            <p className="text-xs text-gray-500">通过 Excel 或 CSV 文件快速导入高德榜单数据</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex-1 flex flex-col items-center justify-center relative">
        <div className="w-full max-w-2xl">
          <div className="flex justify-end mb-4">
            <button className="text-indigo-600 font-bold text-sm flex items-center gap-1.5 hover:text-indigo-700 transition-colors bg-indigo-50 px-4 py-2 rounded-lg">
              <Download size={16} /> 下载 Excel 数据模板
            </button>
          </div>
          <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-3xl p-16 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-indigo-50 transition-colors">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <UploadCloud size={32} />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-2">点击上传或将文件拖拽到此处</h3>
            <p className="text-sm text-gray-500 mb-6">支持 .xlsx, .xls, .csv 格式，单次最多导入 500 条数据</p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors">
              选择文件
            </button>
          </div>
          
          <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
            <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
              <Info size={16} className="text-indigo-500" /> 导入注意事项
            </h4>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5 marker:text-indigo-300">
              <li>请先下载模板，严格按照模板的列名和格式填写数据。</li>
              <li>「榜单分类」必须填写系统已存在的分类名称（如：烟火小店、必吃美食）。</li>
              <li>批量导入的数据，其来源将被自动标记为 <span className="font-bold text-gray-900">“内部运营录入”</span>。</li>
              <li>如果出现名称重复的数据，系统将默认跳过不作覆盖。</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRankingEdit = () => (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => setRankingViewMode('list')} className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-500 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-black text-gray-900">{currentRanking?.id ? '编辑榜单数据' : '手工录入榜单'}</h2>
            <p className="text-xs text-gray-500">录入或修改扫街榜具体的店铺/景点信息</p>
          </div>
        </div>
        <button onClick={handleSaveRanking} className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <Save size={16} /> 保存数据
        </button>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 overflow-y-auto space-y-6">
          {currentRanking?.source?.includes('API') && (
            <div className="bg-blue-50 text-blue-700 p-4 rounded-xl border border-blue-100 flex gap-3 mb-2">
              <Info size={20} className="shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-bold">这是通过高德 API 自动拉取的数据。</span>
                <p className="mt-1 opacity-80 leading-relaxed">系统建议不要大幅修改评分和基础信息，以免与高德地图原数据产生歧义。</p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-2">店铺/地点名称</label>
              <input type="text" value={currentRanking?.title || ''} onChange={(e) => setCurrentRanking({...currentRanking, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="例如：玉珍酸笋火锅(喷水池店)" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">综合评分 (满分5.0)</label>
              <input type="number" step="0.1" max="5.0" min="0" value={currentRanking?.score || ''} onChange={(e) => setCurrentRanking({...currentRanking, score: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold text-orange-500" placeholder="4.8" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">人均消费/门票 (元)</label>
              <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="例如：¥56/人" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">精选热评/推荐语</label>
            <textarea value={currentRanking?.content || ''} onChange={(e) => setCurrentRanking({...currentRanking, content: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 min-h-[120px] resize-y leading-relaxed" placeholder="例如：小巷里的红棚大排档，坐的都是本地人，热气腾腾..." />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">特色标签 (用逗号分隔)</label>
            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" placeholder="例如：酸笋发酵汤底, 独门炸茄片" />
          </div>
        </div>

        <div className="col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 overflow-y-auto space-y-8">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">封面图/招牌菜图</label>
            <input type="text" value={currentRanking?.image || ''} onChange={(e) => setCurrentRanking({...currentRanking, image: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 mb-3" placeholder="图片 URL" />
            {currentRanking?.image ? (
              <img src={currentRanking?.image} className="w-full aspect-[4/3] object-cover rounded-xl border border-gray-100" alt="Ranking" />
            ) : (
              <div className="w-full aspect-[4/3] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-xs font-bold">暂无图片</div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100 space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">归属榜单分类</label>
              <select 
                value={currentRanking?.category || ''}
                onChange={(e) => setCurrentRanking({...currentRanking, category: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold text-gray-900"
              >
                <option>烟火小店</option>
                <option>必吃美食</option>
                <option>必去景点</option>
                <option>必住酒店</option>
                <option>饮品甜点</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">数据来源</label>
                <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-2.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 cursor-not-allowed">
                  {currentRanking?.source?.includes('API') ? <Database size={14} className="text-blue-500 shrink-0" /> : <Edit3 size={14} className="text-green-500 shrink-0" />}
                  <span className="truncate">{currentRanking?.source || '内部运营录入'}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">展示状态</label>
                <select 
                  value={currentRanking?.status || '已上架'}
                  onChange={(e) => setCurrentRanking({...currentRanking, status: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold"
                >
                  <option value="已上架">已上架</option>
                  <option value="待审核">待审核</option>
                  <option value="已下架">已下架</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Effect to reset active tab when component mounts
  useEffect(() => {
    setActiveTab('weekend');
  }, []);

  if (ugcViewMode === 'audit') {
    return (
      <div className="space-y-6 h-full flex flex-col">
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setUgcViewMode('list')} className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-500 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 className="text-xl font-black text-gray-900">{currentUgc?.id ? 'UGC 内容编辑与审核' : '手动录入 UGC 内容'}</h2>
              <p className="text-xs text-gray-500">服务商人员在本平台手动录入或维护 API 同步的图文内容</p>
            </div>
          </div>
          <button onClick={handleSaveUgcAudit} className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Save size={16} /> 保存并返回
          </button>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">
          <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 overflow-y-auto space-y-6">
            {currentUgc?.source === 'API 接口同步' && (
              <div className="bg-blue-50 text-blue-700 p-4 rounded-xl border border-blue-100 flex gap-3 mb-2">
                <Info size={20} className="shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-bold">这是通过 API 自动同步的内容。</span>
                  <p className="mt-1 opacity-80 leading-relaxed">系统建议仅进行审核（通过/驳回）或下架操作。若修改正文内容，可能会在下一次服务商接口推送数据时被覆盖。</p>
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">内容标题</label>
              <input type="text" value={currentUgc?.title || ''} onChange={(e) => setCurrentUgc({...currentUgc, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="输入吸引人的图文标题" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center justify-between">
                <span>正文内容</span>
                <span className="text-gray-400 font-normal">支持富文本 / Markdown</span>
              </label>
              <textarea value={currentUgc?.content || ''} onChange={(e) => setCurrentUgc({...currentUgc, content: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 min-h-[200px] resize-y leading-relaxed" placeholder="输入图文详情..." />
            </div>
          </div>

          <div className="col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 overflow-y-auto space-y-8">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">封面配图</label>
              <input type="text" value={currentUgc?.image || ''} onChange={(e) => setCurrentUgc({...currentUgc, image: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 mb-3" placeholder="图片 URL" />
              {currentUgc?.image ? (
                <img src={currentUgc?.image} className="w-full aspect-square object-cover rounded-xl border border-gray-100" alt="UGC" />
              ) : (
                <div className="w-full aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-xs font-bold">暂无图片</div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-100 space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">所属细分品类</label>
                <select 
                  value={currentUgc?.category || ''}
                  onChange={(e) => setCurrentUgc({...currentUgc, category: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold text-indigo-700"
                >
                  {ugcCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <label className="block text-[10px] font-bold text-indigo-400 mb-1 uppercase tracking-wider">该品类负责方 (本平台账号)</label>
                <div className="flex items-center gap-2 text-indigo-700 font-black text-sm">
                  <ShieldCheck size={16} />
                  {getSupplierForCategory(currentUgc?.category)}
                </div>
                <p className="text-[10px] text-indigo-400/80 mt-2 leading-relaxed">
                  此供应商的服务人员拥有该品类内容的「手动录入」与「API 对接数据维护」权限。
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">数据来源</label>
                  <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 cursor-not-allowed">
                    {currentUgc?.source === 'API 接口同步' ? <Database size={16} className="text-blue-500" /> : <Edit3 size={16} className="text-green-500" />}
                    {currentUgc?.source || '手动录入'}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">审核状态</label>
                  <select 
                    value={currentUgc?.status || '待审核'}
                    onChange={(e) => setCurrentUgc({...currentUgc, status: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option>待审核</option>
                    <option>已发布</option>
                    <option>已驳回</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'edit') {
    return (
      <div className="space-y-6 h-full flex flex-col">
        {/* Editor Header */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setViewMode('list')}
              className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-500 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 className="text-xl font-black text-gray-900">{modalMode === 'add' ? '创建周末计划' : '编辑周末计划'}</h2>
              <p className="text-xs text-gray-500">通过结构化表单编辑图文内容，配置即时生效</p>
            </div>
          </div>
          <button 
            onClick={handleSave}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors active:scale-95 flex items-center gap-2"
          >
            <Save size={16} />
            保存并返回
          </button>
        </div>

        {/* Editor Body */}
        <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">
          {/* Main Content Area (Left 2/3) */}
          <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 overflow-y-auto">
            <h3 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-2">
              <FileText size={18} className="text-indigo-500" /> 内容主体
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">主标题 (吸引眼球的亮点)</label>
                <input 
                  type="text" 
                  value={currentPlan?.title}
                  onChange={(e) => setCurrentPlan({...currentPlan, title: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  placeholder="例如：秦岭脚下的幸福·太阳葡萄小镇"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center justify-between">
                  <span>正文详情 (支持 Markdown 语法)</span>
                  <span className="text-gray-400 font-normal">已输入 {currentPlan?.content?.length || 0} 字</span>
                </label>
                <textarea 
                  value={currentPlan?.content || ''}
                  onChange={(e) => setCurrentPlan({...currentPlan, content: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all min-h-[300px] resize-y leading-relaxed"
                  placeholder="在这里输入周末游的详细介绍、游玩亮点、交通指引等内容... 
例如：
### 游玩亮点
1. 大草坪野餐：5000平米阳光草坪...
2. 无动力乐园：原木打造的攀爬架...

### 详细行程
- 10:00 抵达小镇
- 12:30 享用农家柴火鸡..."
                />
              </div>
            </div>
          </div>

          {/* Metadata Area (Right 1/3) */}
          <div className="col-span-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 overflow-y-auto space-y-8">
            <div>
              <h3 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
                <Image size={18} className="text-indigo-500" /> 封面设置
              </h3>
              <input 
                type="text" 
                value={currentPlan?.image}
                onChange={(e) => setCurrentPlan({...currentPlan, image: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all mb-4"
                placeholder="输入图片 URL (https://...)"
              />
              <div className="w-full aspect-[4/3] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 overflow-hidden group">
                {currentPlan?.image ? (
                  <img src={currentPlan.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Cover Preview" />
                ) : (
                  <>
                    <Image size={24} className="mb-2 text-gray-300" />
                    <span className="text-xs font-bold">暂无封面预览</span>
                  </>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-indigo-500" /> 属性与状态
              </h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">来源供应商</label>
                  <select 
                    value={currentPlan?.supplier}
                    onChange={(e) => handleSupplierChange(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  >
                    <option>内部运营</option>
                    <option>携程旅行</option>
                    <option>马蜂窝</option>
                    <option>高德地图</option>
                  </select>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label className="block text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">系统判定状态</label>
                  <div className="flex items-center gap-2">
                    {currentPlan?.status === '已上架' ? (
                      <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                        <CheckCircle2 size={16} />
                        <span className="text-sm font-bold">已上架 (内部直发)</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                        <Sparkles size={16} />
                        <span className="text-sm font-bold">待审核 (需管理员确认)</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
                    * 状态由系统自动判定。内部运营账号提交的内容将自动发布上架，外部合作供应商提交的内容需经过审核。
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">分类标签 (英文逗号分隔)</label>
                  <input 
                    type="text" 
                    value={currentPlan?.tags?.join(', ')}
                    onChange={(e) => setCurrentPlan({...currentPlan, tags: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    placeholder="例如：户外, 亲子游, 露营"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {currentPlan?.tags?.map((t: string, idx: number) => (
                      <span key={idx} className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md text-[10px] font-bold border border-indigo-100">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-1">内容运营管理</h2>
          <p className="text-sm text-gray-500">管理首页各大运营版块的内容上架与审核，支持与供应商协同。</p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'weekend' && (
            <button 
              onClick={() => handleOpenEditor('add')}
              className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 active:scale-95"
            >
              <Plus size={16} />
              新增周末计划
            </button>
          )}
          {activeTab === 'ranking_list' && rankingViewMode === 'list' && (
            <>
              <button onClick={() => setRankingViewMode('import')} className="bg-orange-50 text-orange-600 hover:bg-orange-100 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors border border-orange-200">
                <UploadCloud size={16} />
                批量导入数据
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-orange-200 active:scale-95">
                <RefreshCw size={16} />
                手动拉取 API
              </button>
              <button onClick={() => handleOpenRankingEditor()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-200 active:scale-95">
                <Plus size={16} />
                内部手工录入
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'weekend' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
            <span className="text-sm font-bold text-gray-900">全部计划 ({weekendPlans.length})</span>
            <span className="text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-900">已上架</span>
            <span className="text-sm font-medium text-gray-500 cursor-pointer hover:text-gray-900">待审核</span>
          </div>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-wider">
                <th className="p-4 pl-6">计划内容</th>
                <th className="p-4">来源/供应商</th>
                <th className="p-4">标签</th>
                <th className="p-4">状态</th>
                <th className="p-4 text-right pr-6">操作</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {weekendPlans.map(plan => (
                <tr key={plan.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4 pl-6 flex items-center gap-4">
                    <img src={plan.image} alt={plan.title} className="w-16 h-12 rounded-lg object-cover bg-gray-100" />
                    <span className="font-bold text-gray-900">{plan.title}</span>
                  </td>
                  <td className="p-4 font-medium text-gray-700">{plan.supplier}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {plan.tags.map((t: string) => (
                        <span key={t} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${
                      plan.status === '已上架' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {plan.status === '已上架' ? <CheckCircle2 size={12} /> : <Sparkles size={12} />}
                      {plan.status}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleOpenEditor('edit', plan)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(plan.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {weekendPlans.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">暂无周末计划数据</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'ugc' && (
        <div className="flex gap-6 h-[calc(100vh-140px)]">
          <div className="w-1/3 min-w-[320px] h-full">
            {renderUgcMatrix()}
          </div>
          <div className="flex-1 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {activeUgcCategory === 'all' ? '全部内容' : `【${activeUgcCategory}】相关内容`}
                </h2>
                <div className="flex bg-gray-100 p-0.5 rounded-lg">
                  <button 
                    onClick={() => setUgcDisplayStyle('grid')}
                    className={`p-1.5 rounded-md transition-colors ${ugcDisplayStyle === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    title="卡片展示"
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button 
                    onClick={() => setUgcDisplayStyle('table')}
                    className={`p-1.5 rounded-md transition-colors ${ugcDisplayStyle === 'table' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    title="列表展示"
                  >
                    <ListIcon size={16} />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => handleOpenUgcAudit()}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
              >
                <Plus size={14} /> 手动录入内容
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 pb-8">
              {renderUgcList()}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'home_config' && renderHomeConfig()}
      {activeTab === 'ranking_list' && rankingViewMode === 'list' && renderRankingList()}
      {activeTab === 'ranking_list' && rankingViewMode === 'import' && renderRankingImport()}
      {activeTab === 'ranking_list' && rankingViewMode === 'edit' && renderRankingEdit()}

      {/* UGC Category Modal */}
      <AnimatePresence>
        {isCatModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCatModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-black text-gray-900">{currentCat?.id ? '编辑细分分类' : '新增细分分类'}</h3>
                <button onClick={() => setIsCatModalOpen(false)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"><X size={18} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">细分品类名称</label>
                  <input type="text" value={currentCat?.name} onChange={(e) => setCurrentCat({...currentCat, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="例如：展览演出" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">指定负责供应商</label>
                  <select value={currentCat?.supplier} onChange={(e) => setCurrentCat({...currentCat, supplier: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold text-indigo-700 mb-4">
                    <option>内部运营</option>
                    <option>马蜂窝</option>
                    <option>携程旅行</option>
                    <option>高德地图</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">数据接入方式</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="accessMethod" 
                        value="manual"
                        checked={currentCat?.accessMethod === 'manual'}
                        onChange={(e) => setCurrentCat({...currentCat, accessMethod: e.target.value})}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="text-sm font-medium text-gray-700">仅手工录入</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="accessMethod" 
                        value="api"
                        checked={currentCat?.accessMethod === 'api'}
                        onChange={(e) => setCurrentCat({...currentCat, accessMethod: e.target.value})}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <span className="text-sm font-medium text-gray-700">API 接口同步</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button onClick={() => setIsCatModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200 transition-colors">取消</button>
                <button onClick={handleSaveCat} className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors active:scale-95">保存配置</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

