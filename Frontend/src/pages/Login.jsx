import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, isMissingCredentials } from '../lib/supabase';
import { APP_NAME, COLLEGE_NAME, EMAIL_DOMAIN } from '../utils/constants';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Enter your email first');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (error) throw error;
      toast.success('Password reset link sent to your email!');
      setResetMode(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest min-h-screen text-on-surface overflow-hidden relative selection:bg-primary-container selection:text-white">
      {/* Atmospheric Background Elements */}
      <div className="blob-pink -top-20 -left-20"></div>
      <div className="blob-purple bottom-0 right-0"></div>

      <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-lg">
          
          {/* Missing credentials banner */}
          {isMissingCredentials && (
            <div className="glass-card p-4 mb-6 flex items-start gap-3 bg-error/10 border-error/20">
              <span className="material-symbols-outlined flex-shrink-0 mt-0.5 text-error">warning</span>
              <div>
                <p className="text-sm font-medium mb-1 text-error">Supabase not connected</p>
                <p className="text-xs text-on-surface-variant">
                  Create a <code className="px-1 py-0.5 rounded text-xs bg-surface-container">.env</code> file in <code className="px-1 py-0.5 rounded text-xs bg-surface-container">Frontend/</code> with:<br />
                  <code className="text-xs text-primary">VITE_SUPABASE_URL=https://xxx.supabase.co</code><br />
                  <code className="text-xs text-primary">VITE_SUPABASE_ANON_KEY=your-key</code>
                </p>
              </div>
            </div>
          )}

          {/* Glassmorphism Card */}
          <div className="glass-card p-10 md:p-14 rounded-3xl border border-outline-variant/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-fade-in-up">
            
            {/* Branding Header */}
            <header className="text-center mb-10">
              <h1 className="text-5xl md:text-6xl font-bold italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container mb-3 font-headline">
                {APP_NAME}
              </h1>
              <p className="font-headline italic text-on-surface-variant text-lg tracking-wide">
                Your campus. Your people. Your vibe.
              </p>
            </header>

            {/* Auth Mode Switcher */}
            <nav className="flex justify-center mb-12 relative">
              <div className="flex gap-10">
                <button className="relative pb-2 text-primary font-semibold tracking-wider">
                  {resetMode ? 'Reset Password' : 'Login'}
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-primary-container rounded-full"></span>
                </button>
                {!resetMode && (
                  <Link to="/signup" className="pb-2 text-on-surface/50 font-medium tracking-wider hover:text-on-surface transition-colors">
                    Sign Up
                  </Link>
                )}
              </div>
            </nav>

            {/* Form Section */}
            <form className="space-y-8" onSubmit={resetMode ? handleResetPassword : handleLogin}>
              <div className="space-y-6">
                
                {/* Email Input */}
                <div className="group relative">
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary/80 mb-2 ml-1">University Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/60 group-focus-within:text-primary transition-colors">mail</span>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface-container-low/50 border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-high transition-all outline-none" 
                      placeholder={`yourname${EMAIL_DOMAIN}`} 
                    />
                  </div>
                </div>

                {/* Password Input */}
                {!resetMode && (
                  <div className="group relative">
                    <div className="flex justify-between items-end mb-2">
                      <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary/80 ml-1">Password</label>
                      <button 
                        type="button" 
                        onClick={() => setResetMode(true)}
                        className="text-[10px] uppercase font-bold text-outline hover:text-primary transition-colors">
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/60 group-focus-within:text-primary transition-colors">lock</span>
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-surface-container-low/50 border-none rounded-xl py-4 pl-12 pr-12 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-high transition-all outline-none" 
                        placeholder="••••••••" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/60 hover:text-on-surface transition-colors">
                        <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full glow-md bg-gradient-to-br from-primary to-primary-container py-4 rounded-full text-on-primary font-bold text-lg tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-3 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer">
                {loading ? 'WAITING...' : (resetMode ? 'SEND LINK' : 'ENTER CAMPUS')}
                <span className="material-symbols-outlined">arrow_right_alt</span>
              </button>

              {resetMode && (
                <button 
                  type="button" 
                  onClick={() => setResetMode(false)}
                  className="w-full text-center text-sm text-outline hover:text-primary transition-colors mt-4">
                  ← Back to login
                </button>
              )}
            </form>

            {/* Footer Restriction Note */}
            {!resetMode && (
              <footer className="mt-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary/10 border border-tertiary/20">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                  <span className="text-xs font-semibold text-tertiary tracking-wide">
                    Only {EMAIL_DOMAIN} emails allowed.
                  </span>
                </div>
              </footer>
            )}
          </div>

          {/* Social/Secondary Proof */}
          <div className="mt-12 flex justify-center gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface">shield_person</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface">security</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface">school</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Exclusive</span>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
