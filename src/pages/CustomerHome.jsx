/* eslint-disable */
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, SlidersHorizontal, Zap, TrendingUp, Crown, X, ChevronDown } from 'lucide-react';
import { MOCK_SHOPS, CATEGORIES } from '../utils/mockData';
import ShopCard from '../components/ShopCard';

const CustomerHome = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('distance');
  const [filterOpen, setFilterOpen] = useState(false);
  const [maxDistance, setMaxDistance] = useState(10);
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(() => {
    return MOCK_SHOPS
      .filter(s => {
        const matchQuery = !query || s.shop_name.toLowerCase().includes(query.toLowerCase()) || s.category.toLowerCase().includes(query.toLowerCase());
        const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
        const matchDist = s.distance <= maxDistance;
        const matchRating = s.rating >= minRating;
        return matchQuery && matchCat && matchDist && matchRating && s.approved;
      })
      .sort((a, b) => {
        if (sortBy === 'distance') return a.distance - b.distance;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.shop_name.localeCompare(b.shop_name);
        return 0;
      });
  }, [query, selectedCategory, sortBy, maxDistance, minRating]);

  const featured = MOCK_SHOPS.filter(s => s.featured && s.approved);

  return (
    <div className="min-h-screen bg-[#050508] pt-20 pb-16">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="py-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-[#00f5ff] text-sm mb-2">
              <MapPin size={14} />
              <span className="font-mono">Bengaluru, Karnataka · GPS Active</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-white tracking-widest">
              SHOPS <span className="text-[#00f5ff]">NEAR YOU</span>
            </h1>
          </motion.div>
        </div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search shops, categories..."
              className="w-full pl-11 pr-4 py-3.5 bg-[#0f0f1a] border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-[#00f5ff]/40 text-sm"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-3.5 bg-[#0f0f1a] border border-white/10 rounded-2xl text-white/70 text-sm focus:outline-none focus:border-[#00f5ff]/40 cursor-pointer"
          >
            <option value="distance">Nearest First</option>
            <option value="rating">Top Rated</option>
            <option value="name">A to Z</option>
          </select>

          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex items-center gap-2 px-4 py-3.5 rounded-2xl border text-sm font-medium transition-all ${
              filterOpen ? 'bg-[#00f5ff]/15 border-[#00f5ff]/40 text-[#00f5ff]' : 'bg-[#0f0f1a] border-white/10 text-white/70 hover:border-white/20'
            }`}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-5 bg-[#0f0f1a] rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-white/40 block mb-2">Max Distance: <span className="text-[#00f5ff]">{maxDistance} km</span></label>
                  <input type="range" min="0.5" max="20" step="0.5" value={maxDistance} onChange={e => setMaxDistance(+e.target.value)}
                    className="w-full accent-[#00f5ff]" />
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-2">Min Rating: <span className="text-[#ffd700]">{minRating}★</span></label>
                  <input type="range" min="0" max="5" step="0.5" value={minRating} onChange={e => setMinRating(+e.target.value)}
                    className="w-full accent-[#ffd700]" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {['All', ...CATEGORIES.map(c => c.name)].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#00f5ff]/15 border border-[#00f5ff]/40 text-[#00f5ff]'
                  : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/8'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Section */}
        {selectedCategory === 'All' && !query && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <Crown size={18} className="text-[#ffd700]" />
              <h2 className="font-display text-2xl text-white tracking-widest">FEATURED SHOPS</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((shop, i) => <ShopCard key={shop.id} shop={shop} index={i} />)}
            </div>
          </section>
        )}

        {/* All Shops */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[#00f5ff]" />
              <h2 className="font-display text-2xl text-white tracking-widest">
                {selectedCategory === 'All' ? 'ALL SHOPS' : selectedCategory.toUpperCase()}
              </h2>
            </div>
            <span className="text-sm text-white/30 font-mono">{filtered.length} found</span>
          </div>

          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 text-white/30">
              <Search size={40} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No shops found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((shop, i) => <ShopCard key={shop.id} shop={shop} index={i} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CustomerHome;
