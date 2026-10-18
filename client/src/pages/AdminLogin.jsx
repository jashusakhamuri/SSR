import React, { useState } from 'react';
import { adminLogin } from '../services/api';
import { Lock, Eye, EyeOff, Loader } from 'lucide-react';

function AdminLogin({ onSuccess }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await adminLogin(form.username, form.password);
      sessionStorage.setItem('adminToken', data.token);
      sessionStorage.setItem('adminUser', JSON.stringify(data.admin));
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background texture */}
      <div className="absolute inset-0 bg-handloom opacity-15" />
      
      {/* Decorative large farmer watermark */}
      <div className="absolute -bottom-8 -right-8 w-64 h-64 opacity-5 select-none pointer-events-none">
        <img src="/images/ssr_logo_icon.jpg" alt="" className="w-full h-full rounded-full object-cover" />
      </div>

      <div className="relative z-10 w-full max-w-md">

        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img
              src="/images/ssr_logo_icon.jpg"
              alt="SSR Store"
              className="w-14 h-14 rounded-full object-cover shadow-xl ring-2 ring-amber-400/40"
            />
            <div className="flex flex-col leading-none text-left select-none">
              <span className="font-black text-3xl tracking-tight text-amber-400 leading-none">SSR</span>
              <span className="text-[11px] font-bold tracking-[0.28em] text-cream/60 uppercase leading-none mt-1">Store</span>
            </div>
          </div>
          <p className="text-turmeric text-xs uppercase tracking-[0.25em] mt-3 font-bold">
            Administrator Portal
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-cream-dark/95 border-2 border-turmeric/40 rounded-lg p-8 shadow-2xl backdrop-blur-md">
          
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-earth/15">
            <div className="w-9 h-9 bg-chilli text-cream rounded-full flex items-center justify-center shadow-md">
              <Lock size={16} />
            </div>
            <div>
              <h2 className="text-earth font-cormorant font-bold text-2xl tracking-wide leading-none">
                Sign In
              </h2>
              <p className="text-earth-light text-xs mt-1">Enter your admin credentials to access console</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-chilli text-chilli-dark text-xs font-semibold p-3.5 rounded-sm mb-5 flex items-center gap-2 shadow-sm">
              <span className="text-base">⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Username Input */}
            <div>
              <label className="block text-earth font-bold text-xs uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full bg-white border-2 border-earth/20 focus:border-chilli rounded-md px-4 py-3 text-gray-900 font-semibold text-sm focus:outline-none placeholder-gray-400 shadow-inner transition-colors"
                placeholder="e.g. admin"
                autoComplete="username"
              />
            </div>

            {/* Password Input with Eye Symbol */}
            <div>
              <label className="block text-earth font-bold text-xs uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-white border-2 border-earth/20 focus:border-chilli rounded-md px-4 py-3 pr-12 text-gray-900 font-semibold text-sm focus:outline-none placeholder-gray-400 shadow-inner transition-colors"
                  placeholder="e.g. Admin@123"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:text-chilli focus:outline-none transition-colors"
                  title={showPw ? 'Hide Password' : 'Show Password'}
                >
                  {showPw ? (
                    <EyeOff size={18} className="text-chilli font-bold" />
                  ) : (
                    <Eye size={18} className="text-gray-600 hover:text-gray-900" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-chilli hover:bg-chilli-dark disabled:opacity-50 text-cream font-bold py-3.5 rounded-md text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 mt-2"
            >
              {loading ? (
                <><Loader size={16} className="animate-spin" /> Authenticating…</>
              ) : (
                'Access Console →'
              )}
            </button>
          </form>

          {/* Back link */}
          <div className="mt-6 text-center pt-4 border-t border-earth/10">
            <button
              onClick={() => window.navigateTo('/')}
              className="text-earth/60 hover:text-chilli text-xs uppercase tracking-widest font-bold transition-colors inline-flex items-center gap-1"
            >
              ← Back to Storefront
            </button>
          </div>
        </div>

        <p className="text-cream/50 text-center text-[11px] mt-6 uppercase tracking-widest font-semibold">
          Default: <span className="text-turmeric">admin</span> / <span className="text-turmeric">Admin@123</span>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
