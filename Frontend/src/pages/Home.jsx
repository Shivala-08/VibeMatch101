import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';

export default function Home() {
  const { profile } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*, author:users(full_name, profile_photo_url, branch)')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    if (data && profile) {
      const { data: userLikes } = await supabase
        .from('likes')
        .select('post_id')
        .eq('user_id', profile.id);

      const likedIds = new Set((userLikes || []).map(l => l.post_id));
      const enriched = data.map(p => ({ ...p, user_liked: likedIds.has(p.id) }));
      setPosts(enriched);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();

    // Set up realtime subscription
    const channel = supabase
      .channel('public:posts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            // Fetch the full post with author info
            (async () => {
              const { data: newPost } = await supabase
                .from('posts')
                .select('*, author:users(full_name, profile_photo_url, branch)')
                .eq('id', payload.new.id)
                .single();
              
              if (newPost) {
                setPosts(prev => {
                  // check if it's already in the list (e.g. from optimistic update)
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

  const handlePostCreated = (newPost) => {
    // Check if the post is already added by realtime subscription
    setPosts(prev => {
      if (prev.some(p => p.id === newPost.id)) return prev;
      const enriched = {
        ...newPost,
        author: { full_name: profile.full_name, profile_photo_url: profile.profile_photo_url, branch: profile.branch },
        user_liked: false,
      };
      return [enriched, ...prev];
    });
  };

  const handlePostDeleted = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen selection:bg-primary-container selection:text-white pb-32">
      {/* Ambient Glow Effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-container/10 blur-[150px] pointer-events-none z-0"></div>
      
      <Navbar />
      
      <main className="pt-24 max-w-2xl mx-auto px-4 relative z-10">
        <div className="flex flex-col gap-8">
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-card p-6 rounded-3xl animate-fade-in-up">
                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container-high/50 animate-pulse" />
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-surface-container-high/50 rounded animate-pulse mb-2" />
                      <div className="h-3 w-20 bg-surface-container-high/50 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="h-4 w-full bg-surface-container-high/50 rounded animate-pulse mb-3" />
                  <div className="h-4 w-3/4 bg-surface-container-high/50 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl text-center border border-outline-variant/10 shadow-2xl animate-fade-in-up">
              <span className="material-symbols-outlined text-6xl text-primary/30 mb-4 block">landscape</span>
              <p className="text-xl font-headline font-bold mb-2 text-on-surface">It's quiet out here...</p>
              <p className="text-sm text-on-surface-variant leading-relaxed max-w-md mx-auto">
                Be the first to drop a vibe, share a photo, or start a conversation with your campus.
              </p>
            </div>
          ) : (
            posts.map((post, i) => (
              <div key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <PostCard post={post} onDelete={handlePostDeleted} />
              </div>
            ))
          )}
        </div>
      </main>

      <CreatePost onPostCreated={handlePostCreated} />
    </div>
  );
}
