import React, { useState } from 'react';
import { adminLogin } from '../../services/api';
import {
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Lock,
  Mail,
  AlertCircle,
  Loader,
  CheckCircle2
} from 'lucide-react';

export const AdminLoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await adminLogin(email.trim(), password);
      if (res?.token) {
        // Save JWT token — all admin API calls will now use this
        localStorage.setItem('dna_admin_token', res.token);
        localStorage.setItem('dna_admin_user', JSON.stringify(res.user || {}));
        setSuccess(true);
        setTimeout(() => onLoginSuccess(res.user, res.token), 900);
      } else {
        setError('Login failed. Invalid response from server.');
      }
    } catch (err) {
      if (err.message?.toLowerCase().includes('401') || err.message?.toLowerCase().includes('unauthorized') || err.message?.toLowerCase().includes('invalid')) {
        setError('Incorrect email or password. Please try again.');
      } else if (err.message?.toLowerCase().includes('network') || err.message?.toLowerCase().includes('fetch')) {
        setError('Cannot connect to server. Please check your internet connection.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Animated background glow orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#C5A059]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#1E3A5F]/30 blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-[#C5A059]/5 blur-[80px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#C5A059 1px, transparent 1px), linear-gradient(90deg, #C5A059 1px, transparent 1px)', backgroundSize: '50px 50px' }}
      />

      <div className="relative w-full max-w-md">

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C5A059] to-[#9D7C3A] mb-4 shadow-lg shadow-[#C5A059]/30">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">DNA Clinic Admin</h1>
          <p className="text-sm text-[#94A3B8] mt-1.5 flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Secure Clinical Operations Portal</span>
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">

          {success ? (
            /* Success State */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <p className="text-white font-serif text-xl font-bold">Login Successful!</p>
              <p className="text-[#94A3B8] text-sm">Redirecting to Admin Dashboard...</p>
              <div className="flex justify-center mt-2">
                <div className="w-8 h-1 bg-[#C5A059] rounded-full animate-pulse" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="space-y-1.5">
                <h2 className="text-white font-bold text-lg">Sign In</h2>
                <p className="text-[#64748B] text-xs">Enter your clinic admin credentials to access the dashboard</p>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="flex items-start space-x-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-xs leading-relaxed">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    placeholder="admin@dnaclinicindia.com"
                    autoComplete="email"
                    required
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-[#334155] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 focus:border-[#C5A059]/50 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#94A3B8] uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    required
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-[#334155] rounded-xl pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 focus:border-[#C5A059]/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#C5A059] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#C5A059] to-[#9D7C3A] text-white font-bold py-3.5 rounded-xl text-sm tracking-wide flex items-center justify-center space-x-2 hover:from-[#D4AF70] hover:to-[#B08D4A] transition-all shadow-lg shadow-[#C5A059]/25 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Sign In to Admin Portal</span>
                  </>
                )}
              </button>

              {/* Security Note */}
              <div className="flex items-center justify-center space-x-2 pt-2">
                <Lock className="w-3 h-3 text-[#334155]" />
                <p className="text-[#334155] text-[10px]">
                  256-bit SSL encrypted · JWT secured session
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-[#1E293B] text-xs mt-6">
          DNA Dental, Skin &amp; Hair Clinic India • Admin Portal v2.0
        </p>
      </div>
    </div>
  );
};
