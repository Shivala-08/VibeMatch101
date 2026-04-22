import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import toast from 'react-hot-toast';
import {
  ChatBubbleLeftRightIcon,
  NoSymbolIcon,
  FlagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function UserProfile() {
  const { userId } = useParams();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState('');

  useEffect(() => {
    if (!userId || !profile) return;

    if (userId === profile.id) {
      navigate('/profile');
      return;
    }

    async function fetchData() {
      setLoading(true);

      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      setUser(userData);

      const { data: blockData } = await supabase
        .from('blocked_users')
        .select('id')
        .eq('user_id', profile.id)
        .eq('blocked_user_id', userId)
        .limit(1);
      setIsBlocked(blockData && blockData.length > 0);

      const { data: postsData } = await supabase
        .from('posts')
        .select('*, author:users(full_name, profile_photo_url, branch)')
        .eq('user_id', userId)
        .eq('is_anonymous', false)
        .order('created_at', { ascending: false });

      const { data: userLikes } = await supabase
        .from('likes')
        .select('post_id')
        .eq('user_id', profile.id);

      const likedIds = new Set((userLikes || []).map(l => l.post_id));
      setPosts((postsData || []).map(p => ({ ...p, user_liked: likedIds.has(p.id) })));
      setLoading(false);
    }

    fetchData();

    // Set up realtime subscription
    const channel = supabase
      .channel(`public:posts:user=${userId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts', filter: `user_id=eq.${userId}` },
        (payload) => {
          if (payload.eventType === 'INSERT' && !payload.new.is_anonymous) {
            (async () => {
              const { data: newPost } = await supabase
                .from('posts')
                .select('*, author:users(full_name, profile_photo_url, branch)')
                .eq('id', payload.new.id)
                .single();
              
              if (newPost) {
                setPosts(prev => {
                  if (prev.some(p => p.id === newPost.id)) return prev;
                  return [{ ...newPost, user_liked: false }, ...prev];
                });
              }
            })();
          } else if (payload.eventType === 'DELETE') {
            setPosts(prev => prev.filter(p => p.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setPosts(prev => prev.map(p => 
              p.id === payload.new.id ? { ...p, ...payload.new } : p
            ));
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [userId, profile, navigate]);

  const handleBlock = async () => {
    if (isBlocked) {
      await supabase.from('blocked_users').delete().eq('user_id', profile.id).eq('blocked_user_id', userId);
      setIsBlocked(false);
      toast.success('User unblocked');
    } else {
      if (!confirm('Block this user? They won\'t be able to message you.')) return;
      await supabase.from('blocked_users').insert({ user_id: profile.id, blocked_user_id: userId });
      setIsBlocked(true);
      toast.success('User blocked');
    }
  };

  const submitReport = async () => {
    if (!reportReason.trim()) {
      toast.error('Provide a reason');
      return;
    }
    const { error } = await supabase.from('reports').insert({
      reporter_id: profile.id,
      reported_user_id: userId,
      reason: reportReason.trim(),
    });
    if (error) {
      toast.error('Failed to submit report');
    } else {
      toast.success('Report submitted');
    }
    setShowReport(false);
    setReportReason('');
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen pb-32">
        <Navbar />
        <main className="pt-24 px-6 max-w-2xl mx-auto">
          <div className="glass-card p-6 rounded-3xl flex flex-col items-center animate-fade-in-up">
            <div className="w-24 h-24 rounded-full mb-4 bg-surface-container-high/50 animate-pulse" />
            <div className="h-6 w-40 mb-3 bg-surface-container-high/50 rounded animate-pulse" />
            <div className="h-4 w-60 bg-surface-container-high/50 rounded animate-pulse" />
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-background min-h-screen pb-32">
        <Navbar />
        <main className="pt-24 px-6 max-w-2xl mx-auto">
          <div className="glass-card p-12 text-center rounded-3xl animate-fade-in-up">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4 block">person_off</span>
            <p className="text-xl font-headline font-bold text-on-surface">User not found</p>
          </div>
        </main>
      </div>
    );
  }

  const avatar = user.profile_photo_url
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name)}&background=82c6f1&color=003f5a&size=200`;

  return (
    <div className="bg-background min-h-screen pb-32 relative">
      {/* Ambient Glow Effects */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0"></div>
      
      <Navbar />
      
      <main className="pt-16 max-w-3xl mx-auto pb-24 relative z-10">
        {/* Profile Banner Section */}
        <section className="relative animate-fade-in">
          <div className="h-[130px] w-full bg-gradient-to-r from-primary-container to-secondary-container opacity-80"></div>
          
          {/* Profile Info Container */}
          <div className="px-6 flex flex-col items-center -mt-12 mb-8 relative z-10">
            <div className="w-[84px] h-[84px] rounded-full ring-4 ring-background shadow-xl overflow-hidden mb-4 bg-surface-container">
              <img src={avatar} alt={user.full_name} className="w-full h-full object-cover" />
            </div>
            <h1 className="font-headline font-bold text-[22px] text-on-surface tracking-tight mb-2">{user.full_name}</h1>
            
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {user.branch && <span className="bg-surface-container-highest px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-outline-variant/10">{user.branch}</span>}
              {user.year && <span className="bg-surface-container-highest px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-outline-variant/10">{user.year}</span>}
              {user.hostel_or_day && <span className="bg-surface-container-highest px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-outline-variant/10">{user.hostel_or_day}</span>}
            </div>
            
            {user.bio && (
              <p className="text-center italic text-on-surface-variant font-body leading-relaxed max-w-xs mb-6 opacity-80">
                "{user.bio}"
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <Link to={`/messages?user=${user.id}`} className="flex-1 text-center py-3 rounded-full border-2 border-primary text-primary font-bold tracking-wide hover:bg-primary/10 transition-all active:scale-95 duration-200 flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                Message
              </Link>
              <button onClick={handleBlock} className="flex-1 py-3 rounded-full border-2 border-outline-variant text-on-surface-variant font-bold tracking-wide hover:bg-surface-container-highest transition-all active:scale-95 duration-200 flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">{isBlocked ? 'check_circle' : 'block'}</span>
                {isBlocked ? 'Unblock' : 'Block'}
              </button>
            </div>
            <button onClick={() => setShowReport(true)} className="mt-4 text-xs font-bold uppercase tracking-widest text-error/80 hover:text-error flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-[14px]">flag</span> Report User
            </button>
          </div>
        </section>
        
        {/* Divider */}
        <div className="h-8 bg-gradient-to-b from-surface-container-low/30 to-transparent mb-8"></div>
        
        {/* Posts Section */}
        <section className="px-6 space-y-6">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight">Posts by {user.full_name.split(' ')[0]}</h2>
            <div className="h-1 w-12 bg-primary rounded-full"></div>
          </div>
          
          <div className="flex flex-col gap-6">
            {posts.length === 0 ? (
              <div className="glass-card p-12 text-center rounded-3xl border border-outline-variant/10 animate-fade-in-up">
                <p className="text-sm text-on-surface-variant font-medium">No public posts yet.</p>
              </div>
            ) : (
              posts.map((p, i) => (
                <div key={p.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <PostCard post={p} />
                </div>
              ))
            )}
          </div>
        </section>

        {/* Report modal */}
        {showReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <div className="glass-card p-6 w-full max-w-md animate-fade-in rounded-3xl border border-error/20 shadow-[0_0_40px_rgba(255,180,171,0.1)]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error">flag</span>
                  <h3 className="font-headline font-bold text-xl text-on-surface">Report User</h3>
                </div>
                <button onClick={() => setShowReport(false)} className="text-on-surface-variant hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Why are you reporting this user?"
                className="w-full bg-surface-container-high py-3 px-4 rounded-xl border-none focus:ring-1 focus:ring-error text-on-surface placeholder-on-surface-variant/50 transition-all outline-none resize-none mb-6 min-h-[100px]"
              />
              <div className="flex gap-3 justify-end w-full">
                <button onClick={() => setShowReport(false)} className="px-6 py-2 rounded-full font-bold text-sm bg-surface-container-highest text-on-surface hover:bg-surface-bright transition-colors">Cancel</button>
                <button onClick={submitReport} className="px-6 py-2 rounded-full font-bold text-sm bg-error text-on-error hover:bg-error/90 transition-colors shadow-[0_0_15px_rgba(255,180,171,0.3)]">Submit Report</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
