/* eslint-disable */
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Phone, Heart, Share2, ArrowLeft, Tag, MessageSquare, ChevronRight } from 'lucide-react';
import { MOCK_SHOPS, MOCK_PRODUCTS, MOCK_REVIEWS } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';

const ShopDetail = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const shop = MOCK_SHOPS.find(s => s.id === parseInt(id));
  const products = MOCK_PRODUCTS.filter(p => p.shop_id === parseInt(id));
  const reviews = MOCK_REVIEWS.filter(r => r.shop_id === parseInt(id));
  const [wishlist, setWishlist] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [reviewTab, setReviewTab] = useState('products');

  if (!shop) return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center text-white/40">
      Shop not found
    </div>
  );

  const toggleWishlist = (pid) => setWishlist(prev => prev.includes(pid) ? prev.filter(x => x !== pid) : [...prev, pid]);

  const discountedPrice = (price, discount) => Math.round(price * (1 - discount / 100));

  return (
    <div className="min-h-screen bg-[#050508] pt-16 pb-16">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={shop.image} alt={shop.shop_name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/30 to-transparent" />
        <Link to="/home" className="absolute top-6 left-6 flex items-center gap-2 px-3 py-2 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 text-white text-sm hover:bg-black/60 transition-all">
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        {/* Shop Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f0f1a]/90 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 mb-8 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-[#00f5ff]/10 border border-[#00f5ff]/20 rounded-full text-xs text-[#00f5ff]">
                  {shop.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs border ${shop.open ? 'bg-[#00ff88]/10 border-[#00ff88]/20 text-[#00ff88]' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                  {shop.open ? '● Open Now' : '● Closed'}
                </span>
                {shop.featured && <span className="px-3 py-1 bg-[#ffd700]/10 border border-[#ffd700]/20 rounded-full text-xs text-[#ffd700]">⭐ Featured</span>}
              </div>
              <h1 className="font-display text-4xl md:text-5xl text-white tracking-wider mb-3">{shop.shop_name}</h1>
              <p className="text-white/50 text-base leading-relaxed mb-4 max-w-2xl">{shop.description}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-white/50">
                  <MapPin size={14} className="text-[#00f5ff]" />
                  {shop.address} · {shop.distance} km away
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <Clock size={14} className="text-[#00ff88]" />
                  {shop.openTime}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-col items-center p-5 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(shop.rating) ? 'text-[#ffd700] fill-[#ffd700]' : 'text-white/20'} />
                  ))}
                </div>
                <span className="text-3xl font-bold text-white">{shop.rating}</span>
                <span className="text-xs text-white/40">{reviews.length} reviews</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm hover:bg-red-500/20 transition-all">
                <Heart size={14} /> Wishlist
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
            {shop.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/40 border border-white/8">{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['products', 'reviews'].map(tab => (
            <button key={tab} onClick={() => setReviewTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                reviewTab === tab ? 'bg-[#00f5ff]/15 border border-[#00f5ff]/40 text-[#00f5ff]' : 'bg-white/5 border border-white/10 text-white/50 hover:text-white'
              }`}
            >
              {tab === 'products' ? `Products (${products.length})` : `Reviews (${reviews.length})`}
            </button>
          ))}
        </div>

        {/* Products */}
        {reviewTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.length === 0 && (
              <div className="col-span-3 text-center py-16 text-white/30">No products listed yet.</div>
            )}
            {products.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-[#0f0f1a] rounded-2xl border border-white/5 hover:border-white/15 overflow-hidden transition-all group">
                <div className="relative h-44 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.discount > 0 && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-[#00ff88] rounded-lg text-xs font-bold text-black">
                      -{product.discount}% OFF
                    </div>
                  )}
                  <button onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 transition-all hover:scale-110">
                    <Heart size={14} className={wishlist.includes(product.id) ? 'text-red-400 fill-red-400' : 'text-white/50'} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2">{product.name}</h3>
                  {product.offer_text && (
                    <span className="text-xs text-[#ff6b35] flex items-center gap-1 mb-2">
                      <Tag size={10} /> {product.offer_text}
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white">₹{discountedPrice(product.price, product.discount).toLocaleString()}</span>
                    {product.discount > 0 && <span className="text-sm text-white/30 line-through">₹{product.price.toLocaleString()}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Reviews */}
        {reviewTab === 'reviews' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {reviews.map((review, i) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="p-5 bg-[#0f0f1a] rounded-2xl border border-white/5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-white">{review.user_name}</p>
                    <p className="text-xs text-white/30">{review.date}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} className={j < review.rating ? 'text-[#ffd700] fill-[#ffd700]' : 'text-white/20'} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{review.comment}</p>
              </motion.div>
            ))}
            {reviews.length === 0 && <div className="text-center py-16 text-white/30">No reviews yet. Be the first!</div>}

            {isLoggedIn && (
              <div className="p-5 bg-[#0f0f1a] rounded-2xl border border-[#00f5ff]/20">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#00f5ff]" /> Write a Review
                </h3>
                <div className="flex gap-2 mb-3">
                  {[1,2,3,4,5].map(r => (
                    <button key={r} onClick={() => setNewReview(p => ({ ...p, rating: r }))}>
                      <Star size={20} className={r <= newReview.rating ? 'text-[#ffd700] fill-[#ffd700]' : 'text-white/20'} />
                    </button>
                  ))}
                </div>
                <textarea value={newReview.comment} onChange={e => setNewReview(p => ({ ...p, comment: e.target.value }))}
                  placeholder="Share your experience..."
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00f5ff]/40 resize-none"
                  rows={3} />
                <button className="mt-3 px-5 py-2 bg-[#00f5ff] text-black text-sm font-bold rounded-xl hover:bg-[#00f5ff]/90 transition-all">
                  Post Review
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ShopDetail;
