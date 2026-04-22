import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { containsProfanity } from '../utils/profanityFilter';
import toast from 'react-hot-toast';

export default function PostCard({ post, onDelete }) {
  const { profile } = useAuth();
  const [liked, setLiked] = useState(post.user_liked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentAnon, setCommentAnon] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const isOwn = profile?.id === post.user_id;
  const displayName = post.is_anonymous ? 'Anonymous' : (post.author?.full_name || 'User');
  const displayAvatar = post.is_anonymous
    ? `https://ui-avatars.com/api/?name=?&background=d9e4ea&color=566166`
    : (post.author?.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=82c6f1&color=003f5a`);
  const displayBranch = post.author?.branch || '';

  const timeAgo = post.created_at
    ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true })
    : '';

  const handleLike = async () => {
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikesCount(prev => wasLiked ? prev - 1 : prev + 1);

    try {
      if (wasLiked) {
        await supabase.from('likes').delete().eq('post_id', post.id).eq('user_id', profile.id);
      } else {
        await supabase.from('likes').insert({ post_id: post.id, user_id: profile.id });
      }
      await supabase.from('posts').update({ likes_count: wasLiked ? likesCount - 1 : likesCount + 1 }).eq('id', post.id);
    } catch {
      setLiked(wasLiked);
      setLikesCount(prev => wasLiked ? prev + 1 : prev - 1);
    }
  };

  const loadComments = async () => {
    setLoadingComments(true);
    const { data } = await supabase
      .from('comments')
      .select('*, author:users(full_name, profile_photo_url)')
      .eq('post_id', post.id)
      .order('created_at', { ascending: true });
    setComments(data || []);
    setLoadingComments(false);
  };

  const toggleComments = () => {
    if (!showComments) loadComments();
    setShowComments(!showComments);
  };

  const addComment = async () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;
    if (containsProfanity(trimmed)) {
      toast.error('Comment contains inappropriate language.');
      return;
    }

    const { data, error } = await supabase
      .from('comments')
      .insert({ post_id: post.id, user_id: profile.id, content: trimmed, is_anonymous: commentAnon })
      .select('*, author:users(full_name, profile_photo_url)')
      .single();

    if (error) {
      toast.error('Failed to add comment');
      return;
    }

    setComments(prev => [...prev, data]);
    setCommentText('');
    setCommentAnon(false);
    await supabase.from('posts').update({ comments_count: (post.comments_count || 0) + 1 }).eq('id', post.id);
  };

  const handleDelete = async () => {
    if (!confirm('Delete this post?')) return;
    const { error } = await supabase.from('posts').delete().eq('id', post.id);
    if (error) {
      toast.error('Failed to delete');
    } else {
      toast.success('Post deleted');
      if (onDelete) onDelete(post.id);
    }
    setShowMenu(false);
  };

  const submitReport = async () => {
    if (!reportReason.trim()) {
      toast.error('Please provide a reason');
      return;
    }
    const { error } = await supabase.from('reports').insert({
      reporter_id: profile.id,
      reported_post_id: post.id,
      reported_user_id: post.user_id,
      reason: reportReason.trim(),
    });
    if (error) {
      toast.error('Failed to submit report');
    } else {
      toast.success('Report submitted. Thank you.');
    }
    setShowReport(false);
    setReportReason('');
    setShowMenu(false);
  };

  return (
    <article className="bg-surface-variant/40 glass-card rounded-3xl p-6 border border-outline-variant/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            {post.is_anonymous ? (
              <img src={displayAvatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
            ) : (
              <Link to={`/user/${post.user_id}`}>
                <img src={displayAvatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
              </Link>
            )}
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface-container-lowest ${post.is_anonymous ? 'bg-slate-500' : 'bg-tertiary'}`}></div>
          </div>
          <div>
            {post.is_anonymous ? (
              <h3 className="font-headline text-lg font-bold text-on-surface">Anonymous</h3>
            ) : (
              <Link to={`/user/${post.user_id}`} className="font-headline text-lg font-bold text-on-surface hover:text-primary transition-colors no-underline">
                <h3 className="inline">{displayName}</h3>
              </Link>
            )}
            <div className="flex items-center gap-2">
              {!post.is_anonymous && displayBranch && (
                <span className="bg-secondary-container/30 text-on-secondary-container px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest">{displayBranch}</span>
              )}
              <span className="text-slate-500 text-xs uppercase tracking-tighter">{timeAgo}</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="text-slate-500 hover:text-on-surface transition-colors cursor-pointer bg-transparent border-none">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-surface-container-high border border-outline-variant/10 rounded-xl py-2 z-10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] min-w-[150px]">
              {isOwn && (
                <button onClick={handleDelete} className="w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-surface-variant text-error transition-colors cursor-pointer border-none bg-transparent">
                  <span className="material-symbols-outlined text-sm">delete</span> Delete
                </button>
              )}
              {!isOwn && (
                <button onClick={() => { setShowReport(true); setShowMenu(false); }} className="w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-surface-variant text-on-surface-variant transition-colors cursor-pointer border-none bg-transparent">
                  <span className="material-symbols-outlined text-sm">flag</span> Report
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {post.content && (
        <p className={`${!post.image_url ? 'text-xl font-headline italic bg-gradient-to-r from-pink-200 to-primary-container bg-clip-text text-transparent' : 'text-on-surface-variant font-body'} mb-4 leading-relaxed whitespace-pre-wrap`}>
          {post.content}
        </p>
      )}

      {/* Image */}
      {post.image_url && (
        <div className="rounded-2xl overflow-hidden mb-4 bg-surface-container-low max-h-[500px]">
          <img src={post.image_url} alt="Post content" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-6">
          <button onClick={handleLike} className={`flex items-center gap-2 transition-transform active:scale-90 bg-transparent border-none cursor-pointer ${liked ? 'text-pink-500 hover:scale-110' : 'text-slate-400 hover:text-pink-400'}`}>
            <span className="material-symbols-outlined text-2xl" style={liked ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
            <span className="text-xs font-bold font-label">{likesCount > 0 && likesCount}</span>
          </button>
          <button onClick={toggleComments} className="flex items-center gap-2 text-slate-400 hover:text-on-surface transition-colors active:scale-90 bg-transparent border-none cursor-pointer">
            <span className="material-symbols-outlined text-2xl">chat_bubble</span>
            <span className="text-xs font-bold font-label">{post.comments_count > 0 && post.comments_count}</span>
          </button>
          <button className="flex items-center gap-2 text-slate-400 hover:text-on-surface transition-colors active:scale-90 bg-transparent border-none cursor-pointer">
            <span className="material-symbols-outlined text-2xl">share</span>
          </button>
        </div>
        <button className="text-slate-400 hover:text-on-surface transition-colors active:scale-90 bg-transparent border-none cursor-pointer">
          <span className="material-symbols-outlined text-2xl">bookmark</span>
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="mt-6 pt-4 border-t border-outline-variant/10">
          {loadingComments ? (
            <div className="space-y-4 mb-4">
              {[1, 2].map(i => <div key={i} className="animate-pulse h-12 rounded-xl bg-surface-container-low/50" />)}
            </div>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto mb-4 custom-scrollbar pr-2">
              {comments.map(c => (
                <div key={c.id} className="flex gap-3">
                  <img
                    src={c.is_anonymous
                      ? `https://ui-avatars.com/api/?name=?&background=d9e4ea&color=566166&size=32`
                      : (c.author?.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.author?.full_name || 'U')}&background=82c6f1&color=003f5a&size=32`)}
                    alt="" className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/20"
                  />
                  <div className="flex-1 rounded-2xl px-4 py-3 bg-surface-container-low/40">
                    <span className="font-bold text-sm text-on-surface block mb-1">
                      {c.is_anonymous ? 'Anonymous' : (c.author?.full_name || 'User')}
                    </span>
                    <p className="text-on-surface-variant text-sm leading-relaxed">{c.content}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-sm text-center py-4 text-outline font-medium italic">No comments yet. Be the first to start the conversation.</p>
              )}
            </div>
          )}

          {/* Add comment */}
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment…"
                className="w-full bg-surface-container-low/60 border-none rounded-xl py-3 px-4 pr-20 text-sm text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-primary/40 focus:bg-surface-container-high transition-all outline-none"
                onKeyDown={(e) => e.key === 'Enter' && addComment()}
              />
              <label className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest cursor-pointer text-primary/80 hover:text-primary transition-colors bg-surface-container/80 px-2 py-1 rounded-md">
                <input type="checkbox" checked={commentAnon} onChange={(e) => setCommentAnon(e.target.checked)} className="w-3 h-3 accent-primary" />
                Anon
              </label>
            </div>
            <button onClick={addComment} className="glow-md bg-gradient-to-br from-primary to-primary-container text-white p-3 rounded-xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center cursor-pointer border-none">
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      )}

      {/* Report modal */}
      {showReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-card border border-outline-variant/10 p-8 rounded-3xl w-full max-w-md animate-fade-in-up shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline text-xl font-bold text-on-surface">Report Post</h3>
              <button onClick={() => setShowReport(false)} className="text-outline hover:text-on-surface transition-colors cursor-pointer bg-transparent border-none">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Why are you reporting this post?"
              className="w-full bg-surface-container-low/50 border-none rounded-xl py-4 px-4 text-on-surface placeholder:text-outline/40 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-high transition-all outline-none resize-none mb-6"
              rows={4}
            />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowReport(false)} className="px-6 py-3 rounded-full text-sm font-bold text-on-surface-variant hover:bg-surface-variant transition-colors cursor-pointer bg-transparent border-none">
                Cancel
              </button>
              <button onClick={submitReport} className="px-6 py-3 rounded-full text-sm font-bold bg-error/20 text-error hover:bg-error/30 transition-colors cursor-pointer border-none">
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
