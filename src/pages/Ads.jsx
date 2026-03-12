/* eslint-disable */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Tag, Clock, Store, ChevronRight, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_ADS, MOCK_SHOPS } from '../utils/mockData';

const ADS_EXTENDED = [
  ...MOCK_ADS,
  { id: 4, shop_id: 4, shop_name: 'Wellness Hub', text: '🌿 Buy any 2 organic supplements, get 1 FREE — Limited time wellness deal!', category: 'Health', gradient: 'from-emerald-500 to-teal-600' },
  { id: 5, shop_id: 5, shop_name: 'BookNest', text: '📖 10% OFF on all new arrivals + FREE bookmark with every purchase!', category: 'Books', gradient: 'from-yellow-500 to-amber-600' },
];

const COUPONS = [
  { code: 'SAVE20', discount: '20% OFF', shop: 'TechZone Electronics', expiry: 'Mar 31, 2024', color: '#00f5ff' },
  { code: 'COFFEE10', discount: '₹100 OFF', shop: 'Aroma Cafe & Bakery', expiry: 'Apr 5, 2024', color: '#ff6b35' },
  { code: 'STYLE25', discount: '25% OFF', shop: 'Fusion Wardrobe', expiry: 'Mar 25, 2024', color: '#bf00ff' },
  { code: 'HEALTH15', discount: '15% OFF', shop: 'Wellness Hub', expiry: 'Apr 10, 2024', color: '#00ff88' },
];

const Ads = () => {
  return (
    <div className="min-h-screen bg-[#050508] pt-20 pb-16">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Megaphone size={24} className="text-[#ff6b35]" />
            <h1 className="font-display text-4xl md:text-5xl text-white tracking-widest">ADS & <span className="text-[#ff6b35]">OFFERS</span></h1>
          </div>
          <p className="text-white/40">Exclusive deals from local shops near you</p>
        </motion.div>

        {/* Featured Ads */}
        <section className="mb-12">
          <h2 className="font-display text-2xl text-white tracking-widest mb-5 flex items-center gap-2">
            <Zap size={18} className="text-[#ffd700]" /> FEATURED PROMOTIONS
          </h2>
          <div className="space-y-4">
            {ADS_EXTENDED.map((ad, i) => (
              <motion.div key={ad.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 4 }}
                className={`relative overflow-hidden rounded-2xl border border-white/10 p-6 bg-gradient-to-r ${ad.gradient} bg-opacity-10 cursor-pointer group`}
                style={{ background: `linear-gradient(135deg, rgba(15,15,26,0.9) 0%, rgba(15,15,26,0.6) 100%)` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white/3 to-transparent" />
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Store size={14} className="text-white/40" />
                      <span className="text-xs text-white/40 font-mono">{ad.shop_name}</span>
                      <span className="px-2 py-0.5 bg-white/5 rounded-full text-xs text-white/30 border border-white/10">{ad.category}</span>
                    </div>
                    <p className="text-base font-medium text-white leading-relaxed">{ad.text}</p>
                  </div>
                  <ChevronRight size={20} className="text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Coupon Codes */}
        <section>
          <h2 className="font-display text-2xl text-white tracking-widest mb-5 flex items-center gap-2">
            <Tag size={18} className="text-[#00ff88]" /> COUPON CODES
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {COUPONS.map((coupon, i) => (
              <motion.div key={coupon.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative bg-[#0f0f1a] rounded-2xl border border-dashed border-white/15 p-5 overflow-hidden group hover:border-white/25 transition-all"
              >
                {/* Cutout effect */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#050508] rounded-r-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#050508] rounded-l-full" />

                <div className="pl-2">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-white/40 mb-1">{coupon.shop}</p>
                      <p className="text-2xl font-bold" style={{ color: coupon.color }}>{coupon.discount}</p>
                    </div>
                    <button
                      onClick={() => navigator.clipboard?.writeText(coupon.code)}
                      className="px-4 py-2 rounded-xl text-sm font-mono font-bold transition-all hover:scale-105"
                      style={{ background: `${coupon.color}15`, border: `1px solid ${coupon.color}30`, color: coupon.color }}
                    >
                      {coupon.code}
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/30">
                    <Clock size={10} />
                    Expires {coupon.expiry}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA for shop owners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-3xl text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.05) 0%, rgba(191,0,255,0.05) 100%)', border: '1px solid rgba(0,245,255,0.15)' }}
        >
          <Megaphone size={32} className="mx-auto mb-4 text-[#00f5ff]" />
          <h3 className="font-display text-3xl text-white tracking-widest mb-3">PROMOTE YOUR SHOP</h3>
          <p className="text-white/40 mb-6 max-w-md mx-auto">Reach thousands of customers near you. Starting at just ₹499 for 5 days.</p>
          <Link to="/register">
            <button className="px-8 py-3 bg-[#00f5ff] text-black font-bold rounded-xl shadow-[0_0_30px_rgba(0,245,255,0.3)]">
              Start Advertising →
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Ads;
