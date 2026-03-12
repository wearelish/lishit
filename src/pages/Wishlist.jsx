/* eslint-disable */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingBag, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_SHOPS } from '../utils/mockData';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(MOCK_PRODUCTS.slice(0, 4).map(p => p.id));

  const wishlistProducts = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id));
  const remove = (id) => setWishlist(prev => prev.filter(x => x !== id));
  const discountedPrice = (price, discount) => Math.round(price * (1 - discount / 100));

  return (
    <div className="min-h-screen bg-[#050508] pt-20 pb-16">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={24} className="text-red-400 fill-red-400" />
            <h1 className="font-display text-4xl md:text-5xl text-white tracking-widest">WISHLIST</h1>
          </div>
          <p className="text-white/40">{wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved</p>
        </motion.div>

        {wishlistProducts.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <Heart size={56} className="mx-auto mb-5 text-white/10" />
            <h3 className="text-xl font-semibold text-white/40 mb-3">Your wishlist is empty</h3>
            <p className="text-white/25 mb-6">Discover amazing products from local shops</p>
            <Link to="/home">
              <button className="flex items-center gap-2 mx-auto px-6 py-3 bg-[#00f5ff] text-black font-bold rounded-xl">
                Explore Shops <ArrowRight size={16} />
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            <AnimatePresence>
              {wishlistProducts.map((product, i) => {
                const shop = MOCK_SHOPS.find(s => s.id === product.shop_id);
                return (
                  <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, x: -20 }} transition={{ delay: i * 0.05 }}
                    className="bg-[#0f0f1a] rounded-2xl border border-white/5 hover:border-white/10 overflow-hidden transition-all group">
                    <div className="relative h-40">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] to-transparent" />
                      {product.discount > 0 && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-[#00ff88] rounded-lg text-xs font-bold text-black">
                          -{product.discount}% OFF
                        </div>
                      )}
                      <button onClick={() => remove(product.id)}
                        className="absolute top-3 right-3 p-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-500/40 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-1">{product.name}</h3>
                      {shop && (
                        <Link to={`/shop/${shop.id}`} className="text-xs text-[#00f5ff] hover:underline flex items-center gap-1 mb-2">
                          <ShoppingBag size={10} /> {shop.shop_name}
                        </Link>
                      )}
                      {product.offer_text && (
                        <span className="text-xs text-[#ff6b35] flex items-center gap-1 mb-2">
                          <Tag size={10} /> {product.offer_text}
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-white">₹{discountedPrice(product.price, product.discount).toLocaleString()}</span>
                          {product.discount > 0 && <span className="text-xs text-white/30 line-through">₹{product.price.toLocaleString()}</span>}
                        </div>
                        <button className="px-3 py-1.5 bg-[#00f5ff]/10 border border-[#00f5ff]/20 text-[#00f5ff] text-xs rounded-lg hover:bg-[#00f5ff]/20 transition-all">
                          Visit Shop
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
