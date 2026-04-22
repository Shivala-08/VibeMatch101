import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { APP_NAME, EMAIL_DOMAIN } from '../utils/constants';
import toast from 'react-hot-toast';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email) => {
    return email.toLowerCase().endsWith(EMAIL_DOMAIN.toLowerCase());
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      toast.error(`Only ${EMAIL_DOMAIN} emails are allowed`);
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });
      if (error) throw error;
      setEmailSent(true);
      toast.success('Verification email sent!');
    } catch (error) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="bg-surface-container-lowest min-h-screen text-on-surface flex items-center justify-center p-4">
        {/* Atmospheric Background Elements */}
        <div className="blob-pink -top-20 -left-20"></div>
        <div className="blob-purple bottom-0 right-0"></div>
        
        <div className="glass-card p-10 md:p-14 max-w-md w-full text-center animate-fade-in-up border border-outline-variant/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative z-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-primary/20">
            <span className="material-symbols-outlined text-4xl text-primary">mark_email_unread</span>
          </div>
          <h2 className="text-2xl font-bold mb-3 font-headline text-on-surface">Check Your Email</h2>
          <p className="text-sm mb-8 text-on-surface-variant leading-relaxed">
            We've sent a verification link to <strong className="text-primary">{email}</strong>.
            Click the link to verify your account, then come back to sign in.
          </p>
          <Link to="/login" className="w-full glow-md bg-gradient-to-br from-primary to-primary-container py-4 rounded-full text-on-primary font-bold tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-3">
            GO TO LOGIN
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest min-h-screen text-on-surface overflow-hidden relative selection:bg-primary-container selection:text-white">
      {/* Atmospheric Background Elements */}
      <div className="blob-pink -top-20 -left-20"></div>
      <div className="blob-purple bottom-0 right-0"></div>

      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          
          {/* Glassmorphism Card */}
          <div className="glass-card p-10 md:p-14 rounded-3xl border border-outline-variant/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-fade-in-up">
            
            {/* Branding Header */}
            <header className="text-center mb-10">
              <h1 className="text-5xl md:text-6xl font-bold italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container mb-3 font-headline">
                {APP_NAME}
              </h1>
              <p className="font-headline italic text-on-surface-variant text-lg tracking-wide">
                Join the community.
              </p>
            </header>

            {/* Auth Mode Switcher */}
            <nav className="flex justify-center mb-12 relative">
              <div className="flex gap-10">
                <Link to="/login" className="pb-2 text-on-surface/50 font-medium tracking-wider hover:text-on-surface transition-colors">
                  Login
                </Link>
                <button className="relative pb-2 text-primary font-semibold tracking-wider">
                  Sign Up
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-primary-container rounded-full"></span>
                </button>
              </div>
            </nav>

            {/* Form Section */}
            <form className="space-y-6" onSubmit={handleSignup}>
              
              {/* Email Input */}
              <div className="group relative">
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary/80 mb-2 ml-1">College Email</label>
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
              <div className="group relative">
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary/80 mb-2 ml-1">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/60 group-focus-within:text-primary transition-colors">lock</span>
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-container-low/50 border-none rounded-xl py-4 pl-12 pr-12 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-high transition-all outline-none" 
                    placeholder="Min 6 characters" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/60 hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="group relative">
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary/80 mb-2 ml-1">Confirm Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/60 group-focus-within:text-primary transition-colors">lock</span>
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-surface-container-low/50 border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-high transition-all outline-none" 
                    placeholder="Re-enter password" 
                  />
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full glow-md bg-gradient-to-br from-primary to-primary-container py-4 rounded-full text-on-primary font-bold text-lg tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-3 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer">
                  {loading ? 'WAITING...' : 'CREATE ACCOUNT'}
                  <span className="material-symbols-outlined">arrow_right_alt</span>
                </button>
              </div>

            </form>

            {/* Footer Restriction Note */}
            <footer className="mt-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary/10 border border-tertiary/20">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                <span className="text-xs font-semibold text-tertiary tracking-wide">
                  Only {EMAIL_DOMAIN} emails allowed.
                </span>
              </div>
            </footer>
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
