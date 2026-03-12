/* eslint-disable */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { mockLogin, mockRegister } from '../utils/mockData';
import { Zap, Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

export const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = mockLogin(form.email, form.password);
    setLoading(false);
    if (!result) return setError('Invalid email or password');
    login(result.user, result.token);
    if (result.user.role === 'admin') navigate('/admin');
    else if (result.user.role === 'owner') navigate('/dashboard');
    else navigate('/home');
  };

  const fillDemo = (email, pw) => setForm({ email, password: pw });

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <Zap size={20} className="text-[#00f5ff]" />
              <span className="font-display text-2xl tracking-widest">LISHI<span className="text-[#00f5ff]">T</span></span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
            <p className="text-white/40 text-sm">Sign in to your account</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              <AlertCircle size={14} /> {error}
            </motion.div>
          )}

          {/* Demo Accounts */}
          <div className="mb-6 p-4 bg-white/3 rounded-2xl border border-white/5">
            <p className="text-xs text-white/30 mb-2 font-mono">DEMO ACCOUNTS</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Customer', e: 'customer@test.com', p: 'customer123' },
                { label: 'Owner', e: 'owner@test.com', p: 'owner123' },
                { label: 'Admin', e: 'admin@lishit.com', p: 'admin123' },
              ].map(d => (
                <button key={d.label} onClick={() => fillDemo(d.e, d.p)}
                  className="py-2 px-2 bg-[#00f5ff]/10 border border-[#00f5ff]/20 rounded-xl text-xs text-[#00f5ff] hover:bg-[#00f5ff]/20 transition-all">
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-white/40 mb-1.5 font-medium">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00f5ff]/50 focus:bg-white/8 transition-all text-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5 font-medium">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00f5ff]/50 transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 bg-[#00f5ff] text-black font-bold rounded-xl shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:shadow-[0_0_40px_rgba(0,245,255,0.4)] transition-shadow disabled:opacity-50 text-sm"
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </motion.button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            New here?{' '}
            <Link to="/register" className="text-[#00f5ff] hover:underline">Create account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = mockRegister(form.name, form.email, form.password, form.role);
    setLoading(false);
    if (result.error) return setError(result.error);
    login(result.user, result.token);
    navigate(form.role === 'owner' ? '/dashboard' : '/home');
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center px-4 relative py-10">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <Zap size={20} className="text-[#00f5ff]" />
              <span className="font-display text-2xl tracking-widest">LISHI<span className="text-[#00f5ff]">T</span></span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-1">Create account</h1>
            <p className="text-white/40 text-sm">Join the local discovery revolution</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-2 p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              <AlertCircle size={14} /> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00f5ff]/50 text-sm"
                placeholder="Your name" required />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00f5ff]/50 text-sm"
                placeholder="your@email.com" required />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full px-4 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#00f5ff]/50 text-sm"
                  placeholder="Min 8 characters" required minLength={6} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">I am a...</label>
              <div className="grid grid-cols-2 gap-2">
                {['customer', 'owner'].map(r => (
                  <button key={r} type="button" onClick={() => setForm(p => ({ ...p, role: r }))}
                    className={`py-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                      form.role === r
                        ? 'bg-[#00f5ff]/15 border-[#00f5ff]/50 text-[#00f5ff]'
                        : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20'
                    }`}>
                    {r === 'customer' ? '🛍 Customer' : '🏪 Shop Owner'}
                  </button>
                ))}
              </div>
            </div>
            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="w-full py-3 bg-[#00f5ff] text-black font-bold rounded-xl shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-shadow disabled:opacity-50 text-sm mt-2">
              {loading ? 'Creating account...' : 'Create Account →'}
            </motion.button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#00f5ff] hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
