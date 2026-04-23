import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, isMissingCredentials } from '../lib/supabase';
import { APP_NAME, EMAIL_DOMAIN } from '../utils/constants';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden selection:bg-primary-container selection:text-white min-h-screen">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="organic-blob absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-primary/20 opacity-40"></div>
        <div className="organic-blob absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-secondary-container/20 opacity-30"></div>
        <div className="organic-blob absolute -bottom-[10%] left-[20%] w-[700px] h-[700px] bg-tertiary-container/15 opacity-25"></div>
      </div>
      
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/40 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/10 glass-noise">
        <div className="flex justify-between items-center w-full px-12 h-24 max-w-screen-2xl mx-auto">
          <div className="text-3xl font-black italic tracking-tighter text-zinc-100 ml-[-2%] drop-shadow-[0_2px_10px_rgba(255,0,122,0.3)] font-headline-lg">
            {APP_NAME}
          </div>
          <nav className="hidden md:flex items-center space-x-12">
            <Link to="/discover" className="text-pink-500 font-bold border-b-2 border-pink-500 pb-1 font-label-caps cursor-pointer active:scale-95 transition-all duration-300">Discover</Link>
            <a className="text-zinc-400 font-light hover:text-white hover:scale-105 transition-all duration-300 font-label-caps" href="#">About</a>
            <a className="text-zinc-400 font-light hover:text-white hover:scale-105 transition-all duration-300 font-label-caps" href="#">Safety</a>
          </nav>
          <div className="flex items-center space-x-6">
            <Link to="/signup" className="px-6 py-2 border border-white/20 hover:border-white/40 text-on-surface font-label-caps rounded-full backdrop-blur-md hover:bg-white/5 active:scale-95 transition-all duration-500">Sign Up</Link>
          </div>
        </div>
      </header>

      <main className="relative pt-32 pb-40">
        <div className="max-w-screen-2xl mx-auto px-12">
          {/* Missing credentials banner */}
          {isMissingCredentials && (
            <div className="glass-card p-4 mb-6 flex items-start gap-3 bg-error/10 border-error/20 z-50 relative">
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

          {/* Asymmetrical Hero Section */}
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-0">
            {/* Left Content: Expressive Typography */}
            <div className="w-full lg:w-3/5 pt-12 z-10">
              <div className="inline-block px-4 py-1 border border-primary/30 rounded-full mb-8 glass-noise bg-primary/5">
                <span className="font-label-caps text-primary text-[10px] uppercase tracking-[0.3em]">Exclusively for Universities</span>
              </div>
              <h1 className="font-display-xl text-on-surface leading-[0.85] mb-8 max-w-2xl">
                Find your <span className="italic font-normal text-primary">rhythm</span> in the digital <span className="font-serif">noise.</span>
              </h1>
              <p className="font-body-lg text-on-surface-variant max-w-lg mb-12 ml-4 border-l-2 border-primary/20 pl-8 italic">
                The avant-garde social ecosystem for the modern student. Experience high-fashion connections and premium academic networking.
              </p>
              {/* CTA Actions */}
              <div className="flex flex-wrap gap-6 items-center">
                <Link to="/signup" className="px-10 py-5 bg-primary-container text-white font-label-caps rounded-full shadow-[0_0_20px_rgba(255,75,137,0.3)] hover:shadow-[0_0_40px_rgba(255,75,137,0.5)] hover:scale-105 active:scale-95 transition-all duration-500 ease-out glass-noise overflow-hidden relative group">
                  <span className="relative z-10">Initialize Profile</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Link>
                <button className="px-10 py-5 border border-white/20 hover:border-white/40 text-on-surface font-label-caps rounded-full backdrop-blur-md hover:bg-white/5 active:scale-95 transition-all duration-500">
                  Explore Hub
                </button>
              </div>
            </div>
            
            {/* Right Content: Asymmetrical Glass Elements & Login Card */}
            <div className="w-full lg:w-2/5 relative mt-12 lg:mt-0">
              {/* Decorative Floating Glass */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary/10 backdrop-blur-xl rounded-2xl glass-noise border border-white/10 -rotate-6 z-0 shadow-2xl"></div>
              
              {/* Login Glass Card */}
              <div className="relative z-20 w-full max-w-md ml-auto bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-10 glass-noise shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                <div className="mb-10">
                  <h2 className="font-headline-md text-on-surface mb-2">Welcome Back</h2>
                  <p className="font-body-md text-on-surface-variant/70">Secure entry to the CampusMatch grid.</p>
                </div>
                <form className="space-y-8" onSubmit={handleLogin}>
                  <div className="relative group">
                    <label className="font-label-caps text-[10px] text-primary/60 uppercase tracking-widest block mb-2 ml-1">Academic ID</label>
                    <input 
                      className="w-full bg-transparent border-b-2 border-white/10 focus:border-primary py-3 outline-none font-body-md transition-all duration-500 placeholder:text-zinc-600 focus:placeholder:opacity-0 caret-primary" 
                      placeholder={`name@university${EMAIL_DOMAIN}`} 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-700 group-focus-within:w-full"></div>
                  </div>
                  <div className="relative group">
                    <label className="font-label-caps text-[10px] text-primary/60 uppercase tracking-widest block mb-2 ml-1">Access Token</label>
                    <div className="relative">
                      <input 
                        className="w-full bg-transparent border-b-2 border-white/10 focus:border-primary py-3 outline-none font-body-md transition-all duration-500 placeholder:text-zinc-600 focus:placeholder:opacity-0 caret-primary" 
                        placeholder="••••••••" 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                        <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-700 group-focus-within:w-full"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-surface" type="checkbox"/>
                      <span className="font-label-caps text-[11px] text-zinc-400">Remember Pulse</span>
                    </label>
                    <a className="font-label-caps text-[11px] text-primary/80 hover:text-primary transition-colors" href="#">Lost Code?</a>
                  </div>
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full py-5 bg-on-background text-background font-bold font-label-caps rounded-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95 transition-all duration-500 custom-cubic flex items-center justify-center space-x-3 disabled:opacity-50">
                    <span>{loading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}</span>
                    <span className="material-symbols-outlined text-lg">login</span>
                  </button>
                </form>
                <div className="mt-12 pt-8 border-t border-white/5 text-center">
                  <p className="font-label-caps text-[11px] text-zinc-500 mb-6">Alternative Entry</p>
                  <div className="flex justify-center gap-6">
                    <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90 glass-noise">
                      <img alt="Google Sign In" className="w-5 h-5 opacity-70 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQaFAT17Qz88zb-5wg0V_3Ma19LqDmcxVUcM9Xpq6kyebLUpa0m7JXu77kfgQN_kbG001SXBvDr6Vd-ebE2D-L_WV7Bot8v_GwALVuhftKkwbnvx3FRvGUIEMxBHli_BTqhgASm72DEcRJZp-DVU_Z7gsZsacQQUFAFmCOjNV9-xZ0bfsX7Grq0uZptZxRMPvGiYNQB4_9oWuI1yjkIo42RZuJvGcqheyKl695O-TQTARil_-teK-XcMDbh63Vds-lJxDcHCkZXNvg"/>
                    </button>
                    <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90 glass-noise">
                      <span className="material-symbols-outlined text-zinc-400">ios</span>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Overlapping Hero Image Fragment */}
              <div className="absolute -bottom-16 -left-20 w-48 h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-30 hidden xl:block rotate-3">
                <img alt="Students in Library" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdcmhlgfcdTUo3Isbw5UDuRzyG8hPtKXQ2B5fg717CpQYElWdKeEkfkIfKtzLYXEr_JTGg62QeamrD54OWcsOMkEVWsRpOyvtUNanadKu-ilKTP5fpUr9tocd9yGjBpYMWm97CdTAcWYvSls59Iug_Xcf6HxAnljWJF4am31H2-hXUby-isepVJyKTnFt-DQO3hBObmVXbwvU9Z3QVFEMh08u1byMY8lfR6R9sK6PqsZZ2mA_oFgn_Kr5onzZQ05xtjTKM76eBfqOo"/>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Bento Grid Section Preview */}
          <div className="mt-40 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 glass-noise relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <span className="material-symbols-outlined text-primary text-4xl opacity-50">grain</span>
              </div>
              <h3 className="font-headline-lg text-white mb-6">Smart Discovery</h3>
              <p className="font-body-lg text-on-surface-variant max-w-md mb-8">
                Our proprietary Pulse algorithm connects you with peers based on academic synergy and rhythmic social energy.
              </p>
              <div className="flex gap-4">
                <div className="px-6 py-2 rounded-full border border-primary/30 font-label-caps text-[10px] text-primary">Interdisciplinary</div>
                <div className="px-6 py-2 rounded-full border border-secondary/30 font-label-caps text-[10px] text-secondary">Neural Matching</div>
              </div>
            </div>
            <div className="md:col-span-4 bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-[3rem] p-12 glass-noise flex flex-col justify-between hover:bg-primary/20 transition-all duration-700">
              <div>
                <span className="material-symbols-outlined text-primary text-5xl mb-6">bolt</span>
                <h3 className="font-headline-md text-white">Rapid Pulse</h3>
              </div>
              <p className="font-label-caps text-[12px] tracking-[0.2em] text-primary-fixed">Instant campus events synced to your lifestyle.</p>
            </div>
            <div className="md:col-span-4 h-80 rounded-[3rem] overflow-hidden border border-white/10 relative group">
              <img alt="University Architecture" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPnTY07JMp9vciY1rH-Bzs6WV2LFibhIst-KkIMVGuw1gVPsxp9Wxe4D-rPiyyZbDvlPpIoiP95yhhFH5PrRbFCCLVWgv6Nq8ta1T5zNdYmDq8nWLcWsNWAbeee4Cy6G6bAVfKRlflMIJFawAUE8HE9warMcNspbyFAXjQw5la9ztwXPVsZX5TWcy5sz-dqLU-Ae3kYd7G64WByBhLD1Z8G7xeBMw9evUthX_sgfP7Ecv6meL8hVdaDWHxuaGAkfyNwJdf4EEi6Hra"/>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="font-label-caps text-[10px] text-white/60 mb-2">PREMIUM NETWORK</div>
                <div className="font-headline-md text-white">32 Ivy Hubs</div>
              </div>
            </div>
            <div className="md:col-span-8 bg-surface-container-lowest backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 glass-noise overflow-hidden relative">
              <div className="flex items-center gap-12">
                <div className="hidden lg:block w-40 h-40 bg-zinc-800 rounded-2xl flex-shrink-0 glass-noise border border-white/5 shadow-inner p-4">
                  <div className="w-full h-full rounded-lg bg-primary/20 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-headline-md text-white mb-4 italic">The Avant-Garde Standard</h3>
                  <p className="font-body-md text-on-surface-variant">
                    Redefining the collegiate experience through aesthetic excellence and meaningful interaction. No more generic feeds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Decorative Elements */}
      <footer className="py-20 border-t border-white/5 glass-noise">
        <div className="max-w-screen-2xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center opacity-40 hover:opacity-100 transition-opacity duration-1000">
          <p className="font-label-caps text-[10px] tracking-widest uppercase">© 2024 CampusMatch Architectural Media</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a className="font-label-caps text-[10px] tracking-widest uppercase hover:text-primary transition-colors" href="#">Privacy Paradigm</a>
            <a className="font-label-caps text-[10px] tracking-widest uppercase hover:text-primary transition-colors" href="#">Protocol</a>
            <a className="font-label-caps text-[10px] tracking-widest uppercase hover:text-primary transition-colors" href="#">Terms of Flow</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
