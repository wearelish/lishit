/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Zap, Shield, TrendingUp, Star, ArrowRight, Store, Users, ShoppingBag, ChevronDown } from 'lucide-react';
import { MOCK_SHOPS, CATEGORIES } from '../utils/mockData';

const FloatingOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-[80px] opacity-20 ${className}`}
    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
    transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const StatCard = ({ value, label, icon: Icon }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="flex flex-col items-center gap-2 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#00f5ff]/30 transition-all"
  >
    <Icon size={24} className="text-[#00f5ff]" />
    <span className="font-display text-4xl text-white">{value}</span>
    <span className="text-sm text-white/50 text-center">{label}</span>
  </motion.div>
);

const Landing = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  const features = [
    { icon: MapPin, title: 'GPS Discovery', desc: 'Find shops within meters of you using real-time GPS location detection.', color: '#00f5ff' },
    { icon: Zap, title: 'Instant Results', desc: 'Browse hundreds of local shops, products, and deals in under a second.', color: '#bf00ff' },
    { icon: Shield, title: 'Verified Shops', desc: 'Every shop is admin-verified to ensure authenticity and quality.', color: '#00ff88' },
    { icon: TrendingUp, title: 'Live Analytics', desc: 'Shop owners get real-time insights on visitors, views, and revenue.', color: '#ffd700' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050508] text-white overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingOrb className="w-[600px] h-[600px] bg-[#00f5ff] -top-32 -left-32" />
        <FloatingOrb className="w-[400px] h-[400px] bg-[#bf00ff] top-1/2 -right-32" delay={3} />
        <FloatingOrb className="w-[300px] h-[300px] bg-[#ff6b35] bottom-0 left-1/3" delay={1.5} />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <motion.div style={{ y: heroY }} className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00f5ff]/10 border border-[#00f5ff]/20 rounded-full text-sm text-[#00f5ff] backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" />
            India's #1 Local Shop Discovery Platform
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="font-display text-[clamp(3.5rem,12vw,9rem)] leading-[0.9] tracking-wider">
              <span className="block text-white">DISCOVER</span>
              <span className="block" style={{
                background: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>LOCAL</span>
              <span className="block text-white">SHOPS</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            Lishit connects you with hidden gems, local boutiques, and neighborhood stores — all within your reach. Real shops. Real deals. Right now.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/home">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 bg-[#00f5ff] text-black font-bold rounded-2xl text-lg shadow-[0_0_40px_rgba(0,245,255,0.4)] hover:shadow-[0_0_60px_rgba(0,245,255,0.5)] transition-shadow"
              >
                <MapPin size={20} />
                Discover Nearby
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/20 text-white font-semibold rounded-2xl text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                <Store size={20} />
                List Your Shop
              </motion.button>
            </Link>
          </motion.div>

          {/* Floating Cards Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mt-16 flex justify-center gap-4 flex-wrap"
          >
            {MOCK_SHOPS.slice(0, 3).map((shop, i) => (
              <motion.div
                key={shop.id}
                animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
                className="w-56 bg-[#0f0f1a]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
                style={{ transform: `rotate(${(i - 1) * 3}deg)` }}
              >
                <img src={shop.image} alt={shop.shop_name} className="w-full h-28 object-cover" />
                <div className="p-3">
                  <p className="text-sm font-semibold text-white truncate">{shop.shop_name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-white/40">{shop.distance} km away</span>
                    <div className="flex items-center gap-1">
                      <Star size={10} className="text-[#ffd700] fill-[#ffd700]" />
                      <span className="text-xs text-white">{shop.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="relative py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '10K+', label: 'Local Shops', icon: Store },
              { value: '500K+', label: 'Happy Customers', icon: Users },
              { value: '2M+', label: 'Products Listed', icon: ShoppingBag },
              { value: '4.9★', label: 'Average Rating', icon: Star },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-5xl md:text-7xl text-white tracking-widest mb-4">
              BROWSE BY <span style={{ color: '#00f5ff' }}>CATEGORY</span>
            </h2>
            <p className="text-white/40 text-lg">Explore thousands of shops in every category near you</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <Link to={`/home?category=${cat.name}`}>
                  <div className="p-6 bg-[#0f0f1a] rounded-2xl border border-white/5 hover:border-white/20 text-center transition-all group cursor-pointer"
                    style={{ '--cat-color': cat.color }}>
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">{cat.icon}</div>
                    <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{cat.name}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-5xl md:text-7xl text-white tracking-widest mb-4">
              WHY <span style={{ background: 'linear-gradient(90deg, #bf00ff, #00f5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LISHIT?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 bg-[#0f0f1a] rounded-2xl border border-white/5 hover:border-white/15 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${feat.color}20`, border: `1px solid ${feat.color}30` }}>
                  <feat.icon size={22} style={{ color: feat.color }} />
                </div>
                <h3 className="font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / For Shop Owners */}
      <section className="py-24 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-5xl md:text-7xl text-white tracking-widest mb-4">
              FOR <span style={{ color: '#ffd700' }}>SHOP OWNERS</span>
            </h2>
            <p className="text-white/40 text-lg">Grow your business with powerful tools</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '₹0', period: 'First Month Free', features: ['Shop Profile', 'Product Listings', 'Basic Analytics', 'Customer Reviews'], accent: '#00f5ff', highlight: false },
              { name: 'Growth', price: '₹999', period: '/month', features: ['Everything in Starter', 'Advanced Analytics', 'Promotional Ads', 'Featured Listings', 'Coupon Generator', 'Competitor Insights'], accent: '#bf00ff', highlight: true },
              { name: 'Featured', price: '₹1499', period: '/30 days', features: ['Top placement in search', 'Homepage spotlight', 'Priority support', 'Verified badge', 'Custom promotions'], accent: '#ffd700', highlight: false },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl border transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-[#bf00ff]/10 to-[#0f0f1a] border-[#bf00ff]/40 scale-105 shadow-[0_0_40px_rgba(191,0,255,0.2)]'
                    : 'bg-[#0f0f1a] border-white/10 hover:border-white/20'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#bf00ff] rounded-full text-xs font-bold text-white">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="font-display text-2xl tracking-widest mb-1" style={{ color: plan.accent }}>{plan.name}</h3>
                <div className="mb-1">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-2 mt-4 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <span style={{ color: plan.accent }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register">
                  <button className="w-full py-3 rounded-xl font-semibold text-sm transition-all"
                    style={{
                      background: plan.highlight ? '#bf00ff' : `${plan.accent}15`,
                      border: `1px solid ${plan.accent}40`,
                      color: plan.highlight ? 'white' : plan.accent,
                    }}>
                    Get Started
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.1) 0%, rgba(191,0,255,0.1) 100%)', border: '1px solid rgba(0,245,255,0.2)' }}
        >
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
          <div className="relative z-10">
            <h2 className="font-display text-5xl md:text-7xl text-white tracking-widest mb-6">
              JOIN THE<br /><span style={{ color: '#00f5ff' }}>REVOLUTION</span>
            </h2>
            <p className="text-white/50 text-lg mb-8">Be part of the future of local commerce</p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#00f5ff] text-black font-bold rounded-2xl text-lg shadow-[0_0_40px_rgba(0,245,255,0.4)]"
              >
                Start for Free →
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-[#00f5ff]" />
            <span className="font-display text-2xl tracking-widest">LISHI<span className="text-[#00f5ff]">T</span></span>
          </div>
          <p className="text-white/30 text-sm">© 2024 Lishit. All rights reserved. Made with ⚡ in India.</p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
