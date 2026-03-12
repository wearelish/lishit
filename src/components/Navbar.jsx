import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { MapPin, Search, Heart, Bell, LogOut, User, LayoutDashboard, Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); setProfileOpen(false); };

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin';
    if (user?.role === 'owner') return '/dashboard';
    return '/wishlist';
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#050508]/90 backdrop-blur-xl border-b border-[#00f5ff]/10 shadow-[0_0_30px_rgba(0,245,255,0.05)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-[#00f5ff] rounded-lg rotate-12 opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap size={18} className="text-[#00f5ff]" />
              </div>
            </div>
            <span className="font-display text-2xl tracking-widest text-white">
              LISHI<span className="text-[#00f5ff]">T</span>
            </span>
          </Link>

          {/* Center Nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: 'Discover', path: '/home' },
              { label: 'Ads', path: '/ads' },
              ...(isLoggedIn ? [{ label: 'Wishlist', path: '/wishlist' }] : []),
            ].map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  location.pathname === path
                    ? 'text-[#00f5ff]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {location.pathname === path && (
                  <motion.div
                    layoutId="navActive"
                    className="absolute inset-0 bg-[#00f5ff]/10 rounded-lg border border-[#00f5ff]/20"
                  />
                )}
                <span className="relative z-10">{label}</span>
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/home" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm transition-all">
                  <Search size={14} />
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#00f5ff]/10 border border-[#00f5ff]/20 hover:bg-[#00f5ff]/20 transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#bf00ff] flex items-center justify-center text-xs font-bold text-black">
                      {user?.name?.[0]?.toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-sm text-white/80 max-w-[80px] truncate">{user?.name}</span>
                  </button>
                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-52 bg-[#0f0f1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-white/5">
                          <p className="text-sm font-semibold text-white">{user?.name}</p>
                          <p className="text-xs text-white/40 capitalize">{user?.role}</p>
                        </div>
                        <div className="p-2">
                          <Link to={getDashboardLink()} onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
                            <LayoutDashboard size={14} /> Dashboard
                          </Link>
                          <button onClick={handleLogout}
                            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
                            <LogOut size={14} /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 bg-[#00f5ff] text-black text-sm font-semibold rounded-xl hover:bg-[#00f5ff]/90 transition-all shadow-[0_0_20px_rgba(0,245,255,0.3)]">
                  Get Started
                </Link>
              </div>
            )}
            <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-2">
              {[
                { label: 'Discover', path: '/home' },
                { label: 'Ads & Offers', path: '/ads' },
                { label: 'Wishlist', path: '/wishlist' },
              ].map(({ label, path }) => (
                <Link key={path} to={path} onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-white/70 hover:text-white rounded-lg hover:bg-white/5">
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
