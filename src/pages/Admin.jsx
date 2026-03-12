/* eslint-disable */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Store, CheckCircle, XCircle, Trash2, TrendingUp, AlertTriangle, Eye } from 'lucide-react';
import { MOCK_SHOPS, MOCK_USERS } from '../utils/mockData';

const Admin = () => {
  const [shops, setShops] = useState([
    ...MOCK_SHOPS,
    { id: 99, shop_name: 'New Shop Pending', category: 'Electronics', address: 'HSR Layout', approved: false, rating: 0, owner_id: 1, image: 'https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=200&q=80' },
  ]);
  const [activeTab, setActiveTab] = useState('shops');

  const approve = (id) => setShops(prev => prev.map(s => s.id === id ? { ...s, approved: true } : s));
  const reject = (id) => setShops(prev => prev.filter(s => s.id !== id));

  const pending = shops.filter(s => !s.approved);
  const approved = shops.filter(s => s.approved);

  const platformStats = [
    { label: 'Total Users', value: '12,841', icon: Users, color: '#00f5ff' },
    { label: 'Active Shops', value: approved.length, icon: Store, color: '#00ff88' },
    { label: 'Pending Review', value: pending.length, icon: AlertTriangle, color: '#ffd700' },
    { label: 'Monthly Revenue', value: '₹2.4L', icon: TrendingUp, color: '#bf00ff' },
  ];

  return (
    <div className="min-h-screen bg-[#050508] pt-20 pb-16">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield size={24} className="text-red-400" />
            <p className="text-red-400 text-sm font-mono">ADMIN CONTROL PANEL</p>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white tracking-widest">PLATFORM <span className="text-red-400">ADMIN</span></h1>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {platformStats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-[#0f0f1a] rounded-2xl border border-white/5 p-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.color}15` }}>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-xs text-white/40">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['shops', 'users'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                activeTab === tab ? 'bg-red-500/15 border border-red-500/40 text-red-400' : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'shops' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Pending */}
            {pending.length > 0 && (
              <div>
                <h2 className="font-semibold text-[#ffd700] mb-4 flex items-center gap-2">
                  <AlertTriangle size={16} /> Pending Approval ({pending.length})
                </h2>
                <div className="space-y-3">
                  {pending.map(shop => (
                    <motion.div key={shop.id} layout className="flex items-center gap-4 p-4 bg-[#0f0f1a] rounded-2xl border border-[#ffd700]/15">
                      <img src={shop.image} alt={shop.shop_name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-white">{shop.shop_name}</p>
                        <p className="text-xs text-white/40">{shop.category} · {shop.address}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => approve(shop.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-xl text-xs text-[#00ff88] hover:bg-[#00ff88]/20 transition-all">
                          <CheckCircle size={12} /> Approve
                        </button>
                        <button onClick={() => reject(shop.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 hover:bg-red-500/20 transition-all">
                          <XCircle size={12} /> Reject
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Approved Shops */}
            <div>
              <h2 className="font-semibold text-[#00ff88] mb-4 flex items-center gap-2">
                <CheckCircle size={16} /> Approved Shops ({approved.length})
              </h2>
              <div className="overflow-hidden rounded-2xl border border-white/5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/2">
                      <th className="text-left px-4 py-3 text-white/40 font-normal">Shop</th>
                      <th className="text-left px-4 py-3 text-white/40 font-normal hidden sm:table-cell">Category</th>
                      <th className="text-left px-4 py-3 text-white/40 font-normal hidden md:table-cell">Rating</th>
                      <th className="text-left px-4 py-3 text-white/40 font-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approved.map((shop, i) => (
                      <motion.tr key={shop.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                        className="border-b border-white/3 hover:bg-white/2 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={shop.image} alt={shop.shop_name} className="w-8 h-8 rounded-lg object-cover" />
                            <span className="text-white font-medium">{shop.shop_name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-white/50 hidden sm:table-cell">{shop.category}</td>
                        <td className="px-4 py-3 text-[#ffd700] hidden md:table-cell">★ {shop.rating}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                              <Eye size={12} />
                            </button>
                            <button onClick={() => reject(shop.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="overflow-hidden rounded-2xl border border-white/5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/2">
                    <th className="text-left px-4 py-3 text-white/40 font-normal">User</th>
                    <th className="text-left px-4 py-3 text-white/40 font-normal">Email</th>
                    <th className="text-left px-4 py-3 text-white/40 font-normal">Role</th>
                    <th className="text-left px-4 py-3 text-white/40 font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_USERS.map((user, i) => (
                    <tr key={user.id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#bf00ff] flex items-center justify-center text-xs font-bold text-black">
                            {user.name[0]}
                          </div>
                          <span className="text-white">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/50 font-mono text-xs">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs capitalize border ${
                          user.role === 'admin' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                          user.role === 'owner' ? 'bg-[#ffd700]/10 border-[#ffd700]/20 text-[#ffd700]' :
                          'bg-[#00f5ff]/10 border-[#00f5ff]/20 text-[#00f5ff]'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;
