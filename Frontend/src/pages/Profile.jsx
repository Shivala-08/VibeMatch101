import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';

export default function Profile() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    async function fetchMyPosts() {
      setLoading(true);
      const { data } = await supabase
        .from('posts')
        .select('*, author:users(full_name, profile_photo_url, branch)')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });

      // Check likes
      const { data: userLikes } = await supabase
        .from('likes')
        .select('post_id')
        .eq('user_id', profile.id);

      const likedIds = new Set((userLikes || []).map(l => l.post_id));
      setPosts((data || []).map(p => ({ ...p, user_liked: likedIds.has(p.id) })));
      setLoading(false);
    }

    fetchMyPosts();

    // Set up realtime subscription
    const channel = supabase
      .channel(`public:posts:profile=${profile.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts', filter: `user_id=eq.${profile.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
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
  }, [profile]);

  if (!profile) return null;

  const avatar = profile.profile_photo_url
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name)}&background=82c6f1&color=003f5a&size=200`;

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
              <img src={avatar} alt={profile.full_name} className="w-full h-full object-cover" />
            </div>
            <h1 className="font-headline font-bold text-[22px] text-on-surface tracking-tight mb-2">{profile.full_name}</h1>
            
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {profile.branch && <span className="bg-surface-container-highest px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-outline-variant/10">{profile.branch}</span>}
              {profile.year && <span className="bg-surface-container-highest px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-outline-variant/10">{profile.year}</span>}
              {profile.hostel_or_day && <span className="bg-surface-container-highest px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-outline-variant/10">{profile.hostel_or_day}</span>}
            </div>
            
            {profile.bio && (
              <p className="text-center italic text-on-surface-variant font-body leading-relaxed max-w-xs mb-6 opacity-80">
                "{profile.bio}"
              </p>
            )}
            
            <div className="flex gap-3 w-full max-w-sm">
              <button onClick={() => navigate('/edit-profile')} className="w-full py-3 rounded-full border-2 border-primary text-primary font-bold tracking-wide hover:bg-primary/10 transition-all active:scale-95 duration-200 flex justify-center items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Edit Profile
              </button>
            </div>
          </div>
        </section>
        
        {/* Divider */}
        <div className="h-8 bg-gradient-to-b from-surface-container-low/30 to-transparent mb-8"></div>
        
        {/* Posts Section */}
        <section className="px-6 space-y-6">
          <div className="flex items-end justify-between mb-4">
            <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight">Your Activity</h2>
            <div className="h-1 w-12 bg-primary rounded-full"></div>
          </div>
          
          <div className="flex flex-col gap-6">
            {loading ? (
              <div className="space-y-6">
                {[1, 2].map(i => (
                  <div key={i} className="glass-card p-6 rounded-3xl animate-pulse">
                    <div className="h-4 w-full bg-surface-container-high/50 rounded mb-2" />
                    <div className="h-4 w-3/4 bg-surface-container-high/50 rounded" />
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="glass-card p-12 text-center rounded-3xl border border-outline-variant/10 animate-fade-in-up">
                <p className="text-sm text-on-surface-variant font-medium">No posts yet. Share your first thought!</p>
              </div>
            ) : (
              posts.map((p, i) => (
                <div key={p.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <PostCard post={p} onDelete={(id) => setPosts(prev => prev.filter(x => x.id !== id))} />
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
