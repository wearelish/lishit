/* eslint-disable */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Store, Package, Eye, Heart, TrendingUp, Plus, Edit, Trash2, Megaphone, Tag, Crown, Users, DollarSign, Star } from 'lucide-react';
import { MOCK_PRODUCTS } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';

const ANALYTICS_DATA = [
  { day: 'Mon', visitors: 45, views: 120, wishlist: 8 },
  { day: 'Tue', visitors: 62, views: 185, wishlist: 12 },
  { day: 'Wed', visitors: 38, views: 95, wishlist: 5 },
  { day: 'Thu', visitors: 78, views: 210, wishlist: 15 },
  { day: 'Fri', visitors: 95, views: 280, wishlist: 22 },
  { day: 'Sat', visitors: 120, views: 340, wishlist: 30 },
  { day: 'Sun', visitors: 88, views: 245, wishlist: 18 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-3 text-xs">
      <p className="text-white/60 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState(MOCK_PRODUCTS.filter(p => p.shop_id === 1));
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', discount: 0, offer_text: '' });

  const stats = [
    { label: 'Total Visitors', value: '526', change: '+12%', icon: Users, color: '#00f5ff' },
    { label: 'Product Views', value: '1,475', change: '+8%', icon: Eye, color: '#bf00ff' },
    { label: 'Wishlisted', value: '110', change: '+24%', icon: Heart, color: '#ff6b35' },
    { label: 'Avg. Rating', value: '4.7★', change: '+0.2', icon: Star, color: '#ffd700' },
  ];

  const tabs = ['overview', 'products', 'promotions', 'analytics'];

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const p = { id: Date.now(), shop_id: 1, ...newProduct, price: +newProduct.price, discount: +newProduct.discount, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80' };
    setProducts(prev => [...prev, p]);
    setNewProduct({ name: '', price: '', discount: 0, offer_text: '' });
    setShowAddProduct(false);
  };

  return (
    <div className="min-h-screen bg-[#050508] pt-20 pb-16">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[#00f5ff] text-sm font-mono mb-1">SHOP OWNER DASHBOARD</p>
              <h1 className="font-display text-4xl text-white tracking-widest">Welcome, <span className="text-[#00f5ff]">{user?.name?.split(' ')[0]}</span></h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#ffd700]/10 border border-[#ffd700]/20 rounded-xl">
              <Crown size={16} className="text-[#ffd700]" />
              <span className="text-sm text-[#ffd700] font-medium">Growth Plan · Active</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-[#0f0f1a] rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
                  <stat.icon size={16} style={{ color: stat.color }} />
                </div>
                <span className="text-xs font-medium text-[#00ff88]">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                activeTab === tab ? 'bg-[#00f5ff]/15 border border-[#00f5ff]/40 text-[#00f5ff]' : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid lg:grid-cols-2 gap-6">
            <div className="bg-[#0f0f1a] rounded-2xl border border-white/5 p-6">
              <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
                <TrendingUp size={16} className="text-[#00f5ff]" /> Weekly Visitors
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={ANALYTICS_DATA}>
                  <defs>
                    <linearGradient id="visitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00f5ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="visitors" stroke="#00f5ff" fill="url(#visitGrad)" strokeWidth={2} name="Visitors" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#0f0f1a] rounded-2xl border border-white/5 p-6">
              <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
                <Eye size={16} className="text-[#bf00ff]" /> Views vs Wishlist
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={ANALYTICS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="views" fill="#bf00ff" radius={[4,4,0,0]} name="Views" />
                  <Bar dataKey="wishlist" fill="#ff6b35" radius={[4,4,0,0]} name="Wishlist" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <Package size={16} className="text-[#00f5ff]" /> My Products
              </h2>
              <button onClick={() => setShowAddProduct(!showAddProduct)}
                className="flex items-center gap-2 px-4 py-2 bg-[#00f5ff] text-black text-sm font-bold rounded-xl hover:bg-[#00f5ff]/90 transition-all">
                <Plus size={14} /> Add Product
              </button>
            </div>

            <AnimatePresence>
              {showAddProduct && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="mb-5 p-5 bg-[#0f0f1a] rounded-2xl border border-[#00f5ff]/20 overflow-hidden">
                  <h3 className="text-sm font-semibold text-white mb-4">New Product</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))}
                      placeholder="Product name" className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00f5ff]/40" />
                    <input value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))}
                      placeholder="Price (₹)" type="number" className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00f5ff]/40" />
                    <input value={newProduct.discount} onChange={e => setNewProduct(p => ({ ...p, discount: e.target.value }))}
                      placeholder="Discount %" type="number" className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00f5ff]/40" />
                    <input value={newProduct.offer_text} onChange={e => setNewProduct(p => ({ ...p, offer_text: e.target.value }))}
                      placeholder="Offer text (optional)" className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00f5ff]/40" />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={addProduct} className="px-5 py-2 bg-[#00f5ff] text-black text-sm font-bold rounded-xl">Save Product</button>
                    <button onClick={() => setShowAddProduct(false)} className="px-5 py-2 bg-white/5 border border-white/10 text-white/60 text-sm rounded-xl hover:bg-white/10">Cancel</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-[#0f0f1a] rounded-2xl border border-white/5 overflow-hidden group hover:border-white/10 transition-all">
                  <div className="relative h-32 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {p.discount > 0 && <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#00ff88] rounded-lg text-xs font-bold text-black">-{p.discount}%</div>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-white text-sm mb-1 truncate">{p.name}</h3>
                    <p className="text-lg font-bold text-white mb-3">₹{p.price.toLocaleString()}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white/60 hover:bg-white/10">
                        <Edit size={12} /> Edit
                      </button>
                      <button onClick={() => setProducts(prev => prev.filter(x => x.id !== p.id))}
                        className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 hover:bg-red-500/20">
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Promotions Tab */}
        {activeTab === 'promotions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { name: 'Spotlight', price: '₹299', duration: '3 days', icon: '🌟', color: '#ffd700' },
                { name: 'Boost', price: '₹799', duration: '10 days', icon: '⚡', color: '#00f5ff' },
                { name: 'Featured', price: '₹1499', duration: '30 days', icon: '👑', color: '#bf00ff', popular: true },
              ].map((pkg) => (
                <div key={pkg.name} className={`p-5 rounded-2xl border transition-all ${pkg.popular ? 'border-[#bf00ff]/40 bg-[#bf00ff]/5' : 'border-white/10 bg-[#0f0f1a] hover:border-white/20'}`}>
                  {pkg.popular && <div className="text-xs text-[#bf00ff] font-bold mb-2">⭐ MOST POPULAR</div>}
                  <div className="text-3xl mb-2">{pkg.icon}</div>
                  <h3 className="font-semibold text-white mb-1">{pkg.name}</h3>
                  <p className="text-2xl font-bold mb-1" style={{ color: pkg.color }}>{pkg.price}</p>
                  <p className="text-xs text-white/40 mb-4">{pkg.duration}</p>
                  <button className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: `${pkg.color}15`, border: `1px solid ${pkg.color}30`, color: pkg.color }}>
                    Activate
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-[#0f0f1a] rounded-2xl border border-white/5 p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Tag size={16} className="text-[#00ff88]" /> Create Coupon Code
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <input placeholder="Coupon code (e.g. SAVE20)" className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none font-mono" />
                <input placeholder="Discount %" type="number" className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none" />
                <button className="px-4 py-3 bg-[#00ff88] text-black font-bold text-sm rounded-xl hover:bg-[#00ff88]/90 transition-all">
                  Generate Coupon
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-[#0f0f1a] rounded-2xl border border-white/5 p-6">
              <h3 className="font-semibold text-white mb-5">7-Day Performance Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ANALYTICS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="visitors" stroke="#00f5ff" strokeWidth={2} dot={{ fill: '#00f5ff', r: 3 }} name="Visitors" />
                  <Line type="monotone" dataKey="views" stroke="#bf00ff" strokeWidth={2} dot={{ fill: '#bf00ff', r: 3 }} name="Views" />
                  <Line type="monotone" dataKey="wishlist" stroke="#ff6b35" strokeWidth={2} dot={{ fill: '#ff6b35', r: 3 }} name="Wishlist" />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-4">
                {[{ c: '#00f5ff', l: 'Visitors' }, { c: '#bf00ff', l: 'Page Views' }, { c: '#ff6b35', l: 'Wishlist Saves' }].map(({ c, l }) => (
                  <div key={l} className="flex items-center gap-2 text-xs text-white/40">
                    <div className="w-3 h-0.5 rounded" style={{ background: c }} />
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
