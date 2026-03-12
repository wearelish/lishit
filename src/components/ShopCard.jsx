import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Zap, Crown } from 'lucide-react';

const ShopCard = ({ shop, index = 0 }) => {
  const discountedProducts = 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative"
    >
      <Link to={`/shop/${shop.id}`}>
        {/* Card */}
        <div className="relative bg-[#0f0f1a] rounded-2xl overflow-hidden border border-white/5 hover:border-[#00f5ff]/30 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(0,245,255,0.1)]">
          
          {/* Image */}
          <div className="relative h-44 overflow-hidden">
            <img
              src={shop.image}
              alt={shop.shop_name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-transparent to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {shop.featured && (
                <span className="flex items-center gap-1 px-2 py-1 bg-[#ffd700]/20 border border-[#ffd700]/40 rounded-full text-xs text-[#ffd700] font-medium backdrop-blur-sm">
                  <Crown size={10} /> Featured
                </span>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
                shop.open
                  ? 'bg-[#00ff88]/20 border-[#00ff88]/40 text-[#00ff88]'
                  : 'bg-red-500/20 border-red-500/40 text-red-400'
              }`}>
                {shop.open ? 'Open' : 'Closed'}
              </span>
            </div>

            {/* Distance */}
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white/80 border border-white/10">
              <MapPin size={10} className="text-[#00f5ff]" />
              {shop.distance} km
            </div>

            {/* Category */}
            <div className="absolute bottom-3 left-3">
              <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs text-white/60 border border-white/10">
                {shop.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-white text-base leading-tight group-hover:text-[#00f5ff] transition-colors line-clamp-1">
                {shop.shop_name}
              </h3>
              <div className="flex items-center gap-1 shrink-0">
                <Star size={12} className="text-[#ffd700] fill-[#ffd700]" />
                <span className="text-sm font-semibold text-white">{shop.rating}</span>
              </div>
            </div>

            <p className="text-sm text-white/40 line-clamp-2 mb-3 leading-relaxed">
              {shop.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {shop.tags?.slice(0, 3).map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-white/5 rounded-full text-xs text-white/50 border border-white/5">
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex items-center gap-1 text-xs text-white/40">
                <Clock size={11} />
                {shop.openTime}
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#00f5ff]/10 border border-[#00f5ff]/20 rounded-lg text-xs text-[#00f5ff] font-medium group-hover:bg-[#00f5ff]/20 transition-all"
              >
                <Zap size={10} />
                View Shop
              </motion.div>
            </div>
          </div>

          {/* Hover glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 40px rgba(0,245,255,0.03)' }} />
        </div>
      </Link>
    </motion.div>
  );
};

export default ShopCard;
