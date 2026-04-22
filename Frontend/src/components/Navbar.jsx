import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { APP_NAME } from '../utils/constants';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const navItems = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/discover', label: 'Discover', icon: 'explore' },
  { path: '/messages', label: 'Messages', icon: 'chat_bubble' },
  { path: '/profile', label: 'Profile', icon: 'person' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!profile) return;
    async function fetchUnread() {
      const { count } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('receiver_id', profile.id)
        .eq('is_read', false);
      setUnreadCount(count || 0);
    }
    fetchUnread();
    const channel = supabase
      .channel('navbar-unread')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `receiver_id=eq.${profile.id}` },
        () => fetchUnread()
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'messages', filter: `receiver_id=eq.${profile.id}` },
        () => fetchUnread()
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [profile]);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-none shadow-[0_0_20px_rgba(233,30,140,0.1)] flex justify-between items-center px-6 py-4">
        <Link to="/" className="font-headline italic font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-pink-600 text-2xl tracking-tighter hover:opacity-80 transition-opacity no-underline">
          {APP_NAME}
        </Link>
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-pink-400 hover:scale-105 transition-all active:scale-95 duration-200 cursor-pointer bg-transparent border-none">
            <span className="material-symbols-outlined text-[28px]">notifications</span>
          </button>
          <button className="text-slate-400 hover:text-pink-400 hover:scale-105 transition-all active:scale-95 duration-200 cursor-pointer bg-transparent border-none">
            <span className="material-symbols-outlined text-[28px]">favorite</span>
          </button>
        </div>
      </nav>

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-slate-950/60 backdrop-blur-2xl border-t border-white/5 shadow-[0_-4px_30px_rgba(0,0,0,0.5)] flex justify-around items-center px-4 pb-8 pt-4 rounded-t-[2.5rem]">
        {navItems.map(({ path, label, icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center justify-center group active:scale-90 duration-300 relative no-underline ${
                isActive 
                  ? 'text-pink-500 bg-pink-500/10 rounded-full px-5 py-2 shadow-[0_0_15px_rgba(233,30,140,0.3)]' 
                  : 'text-slate-500 px-5 py-2 hover:text-pink-300 transition-colors'
              }`}
            >
              <span 
                className="material-symbols-outlined text-2xl" 
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {icon}
              </span>
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest mt-1">
                {label}
              </span>
              {label === 'Messages' && unreadCount > 0 && (
                <div className="absolute top-2 right-4 w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
