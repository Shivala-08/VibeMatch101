import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

export default function Messages() {
  const { profile } = useAuth();
  const [searchParams] = useSearchParams();
  const targetUserId = searchParams.get('user');

  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loadingConvos, setLoadingConvos] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [searchConvo, setSearchConvo] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    if (!profile) return;
    setLoadingConvos(true);

    const { data: allMessages, error } = await supabase
      .from('messages')
      .select('*, sender:users!sender_id(id, full_name, profile_photo_url), receiver:users!receiver_id(id, full_name, profile_photo_url)')
      .or(`sender_id.eq.${profile.id},receiver_id.eq.${profile.id}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      setLoadingConvos(false);
      return;
    }

    const convMap = new Map();
    for (const msg of (allMessages || [])) {
      const partnerId = msg.sender_id === profile.id ? msg.receiver_id : msg.sender_id;
      const partner = msg.sender_id === profile.id ? msg.receiver : msg.sender;
      if (!convMap.has(partnerId)) {
        convMap.set(partnerId, {
          user: partner,
          lastMessage: msg,
          unread: msg.receiver_id === profile.id && !msg.is_read ? 1 : 0,
        });
      } else {
        const existing = convMap.get(partnerId);
        if (msg.receiver_id === profile.id && !msg.is_read) {
          existing.unread++;
        }
      }
    }

    setConversations(Array.from(convMap.values()));
    setLoadingConvos(false);
  };

  const openChat = async (chatUser) => {
    setActiveChat(chatUser);
    setLoadingMessages(true);

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${profile.id},receiver_id.eq.${chatUser.id}),and(sender_id.eq.${chatUser.id},receiver_id.eq.${profile.id})`)
      .order('created_at', { ascending: true });

    if (error) console.error(error);
    setMessages(data || []);
    setLoadingMessages(false);

    await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('sender_id', chatUser.id)
      .eq('receiver_id', profile.id)
      .eq('is_read', false);

    setConversations(prev =>
      prev.map(c => c.user.id === chatUser.id ? { ...c, unread: 0 } : c)
    );

    setTimeout(scrollToBottom, 100);
  };

  const handleSend = async () => {
    const trimmed = newMessage.trim();
    if (!trimmed || !activeChat) return;

    const { data: blocked } = await supabase
      .from('blocked_users')
      .select('id')
      .or(`and(user_id.eq.${profile.id},blocked_user_id.eq.${activeChat.id}),and(user_id.eq.${activeChat.id},blocked_user_id.eq.${profile.id})`)
      .limit(1);

    if (blocked && blocked.length > 0) {
      toast.error('Cannot send messages to this user');
      return;
    }

    setSending(true);
    setNewMessage('');

    const optimistic = {
      id: `temp-${Date.now()}`,
      sender_id: profile.id,
      receiver_id: activeChat.id,
      content: trimmed,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimistic]);
    setTimeout(scrollToBottom, 50);

    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: profile.id,
        receiver_id: activeChat.id,
        content: trimmed,
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to send message');
      setMessages(prev => prev.filter(m => m.id !== optimistic.id));
    } else {
      setMessages(prev => prev.map(m => m.id === optimistic.id ? data : m));
    }
    setSending(false);
  };

  useEffect(() => {
    fetchConversations();
  }, [profile]);

  useEffect(() => {
    if (targetUserId && profile) {
      (async () => {
        const { data } = await supabase
          .from('users')
          .select('id, full_name, profile_photo_url')
          .eq('id', targetUserId)
          .single();
        if (data) openChat(data);
      })();
    }
  }, [targetUserId, profile]);

  useEffect(() => {
    if (!profile) return;

    const channel = supabase
      .channel('messages-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `receiver_id=eq.${profile.id}` },
        (payload) => {
          const msg = payload.new;
          if (activeChat && msg.sender_id === activeChat.id) {
            setMessages(prev => [...prev, msg]);
            setTimeout(scrollToBottom, 50);
            supabase.from('messages').update({ is_read: true }).eq('id', msg.id);
          }
          fetchConversations();
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [profile, activeChat]);

  const filteredConvos = conversations.filter(c =>
    c.user.full_name?.toLowerCase().includes(searchConvo.toLowerCase())
  );

  const getAvatar = (u) => u?.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(u?.full_name || 'U')}&background=82c6f1&color=003f5a`;

  if (activeChat) {
    return (
      <div className="bg-surface-container-lowest text-on-surface min-h-screen flex flex-col">
        {/* Chat Header */}
        <header className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl flex justify-between items-center px-6 py-4 shadow-[0_0_20px_rgba(233,30,140,0.1)] border-b border-white/5">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveChat(null)} className="hover:scale-105 transition-transform active:scale-95 duration-200 text-on-surface">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="relative">
              <img src={getAvatar(activeChat)} alt={activeChat.full_name} className="w-10 h-10 rounded-full object-cover border border-outline-variant/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary rounded-full border-2 border-surface-dim"></div>
            </div>
            <div>
              <h1 className="font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-pink-600 text-xl tracking-tighter truncate max-w-[150px] sm:max-w-[250px]">{activeChat.full_name}</h1>
              <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-tertiary">Online now</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">videocam</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">info</span>
            </button>
          </div>
        </header>

        {/* Chat Area */}
        <main className="flex-1 pt-24 pb-32 px-4 overflow-y-auto chat-scroll flex flex-col gap-6 max-w-3xl mx-auto w-full relative z-10">
          {loadingMessages ? (
             <div className="flex justify-center my-4">
               <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
             </div>
          ) : messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-outlined text-6xl text-primary/30 mb-4 block animate-fade-in-up">waving_hand</span>
                <p className="text-on-surface-variant text-sm font-medium animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Say hello to {activeChat.full_name}!</p>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isMine = msg.sender_id === profile.id;
              return (
                <div key={msg.id} className={`flex flex-col ${isMine ? 'items-end self-end' : 'items-start'} max-w-[85%] gap-2 animate-fade-in-up`} style={{ animationDelay: `${Math.min(i * 0.05, 1)}s` }}>
                  <div className={`px-5 py-4 font-medium text-sm ${isMine ? 'bg-gradient-to-br from-primary to-primary-container text-on-primary-container shadow-[0_0_20px_rgba(255,70,160,0.3)] rounded-tl-xl rounded-bl-xl rounded-br-xl' : 'glass-card border border-outline-variant/15 text-on-surface rounded-tr-xl rounded-bl-xl rounded-br-xl'}`}>
                    <p style={{ wordBreak: 'break-word' }}>{msg.content}</p>
                  </div>
                  <span className={`text-[10px] text-outline font-medium ${isMine ? 'mr-2' : 'ml-2'}`}>
                    {msg.created_at && new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </main>

        {/* Bottom Input Bar */}
        <footer className="fixed bottom-0 left-0 w-full z-50 bg-slate-950/60 backdrop-blur-2xl px-6 pb-8 pt-4 flex items-center justify-center border-t border-white/5">
          <div className="max-w-3xl w-full flex items-center gap-4">
            <button className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-surface-container-highest hover:bg-surface-variant transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="flex-1 relative flex items-center">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                className="w-full bg-surface-container-high/40 border border-outline-variant/15 rounded-full py-3.5 pl-5 pr-12 text-on-surface placeholder-outline focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all text-sm"
                placeholder="Type a message..."
                type="text"
              />
              <button className="absolute right-4 text-outline hover:text-primary transition-colors">
                <span className="material-symbols-outlined">image</span>
              </button>
            </div>
            <button onClick={handleSend} disabled={sending || !newMessage.trim()} className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary-container rounded-full text-on-primary-container shadow-[0_0_15px_rgba(233,30,140,0.3)] hover:scale-105 active:scale-95 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
            </button>
          </div>
        </footer>
      </div>
    );
  }

  // Conversation List View
  return (
    <div className="bg-surface-container-lowest min-h-screen pb-32 overflow-x-hidden relative">
      {/* Ambient Glow Effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0"></div>
      
      <Navbar />
      
      <main className="pt-24 px-6 max-w-2xl mx-auto relative z-10">
        {/* Editorial Header */}
        <div className="mb-10 mt-6 space-y-2 animate-fade-in">
          <div className="flex justify-between items-end">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-on-surface italic drop-shadow-[0_0_20px_rgba(233,30,140,0.4)]">Messages</h1>
            <button className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-primary shadow-[0_0_15px_rgba(233,30,140,0.2)] hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
          <p className="font-body text-on-surface-variant/70 text-lg ml-1">Spark connections through conversation.</p>
        </div>

        {/* Conversation List */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {loadingConvos ? (
             <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="glass-card p-4 rounded-lg flex items-center gap-4 animate-pulse">
                   <div className="w-12 h-12 rounded-full bg-surface-container-high/50" />
                   <div className="flex-1">
                     <div className="h-5 w-32 bg-surface-container-high/50 rounded mb-2" />
                     <div className="h-4 w-48 bg-surface-container-high/50 rounded" />
                   </div>
                 </div>
               ))}
             </div>
          ) : filteredConvos.length === 0 ? (
             <div className="glass-card p-12 rounded-3xl text-center border border-outline-variant/10 mt-8 animate-fade-in-up">
               <span className="material-symbols-outlined text-6xl text-primary/30 mb-4 block">forum</span>
               <p className="text-xl font-headline font-bold mb-2 text-on-surface">No conversations yet</p>
               <p className="text-sm text-on-surface-variant leading-relaxed max-w-md mx-auto">
                 Find people on the Discover page to start chatting!
               </p>
             </div>
          ) : (
            filteredConvos.map((c, i) => {
              const hasUnread = c.unread > 0;
              return (
                <div 
                  key={c.user.id} 
                  onClick={() => openChat(c.user)}
                  className={`animate-fade-in-up p-4 rounded-lg flex items-center gap-4 transition-all group cursor-pointer ${hasUnread ? 'glass-card shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:bg-surface-variant/60' : 'hover:bg-surface-container-high'}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="relative">
                    <img src={getAvatar(c.user)} alt={c.user.full_name} className={`w-12 h-12 rounded-full object-cover ${hasUnread ? 'outline outline-2 outline-primary/30' : ''}`} />
                    {hasUnread && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-tertiary border-2 border-surface-container-lowest rounded-full"></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-headline font-bold text-lg truncate ${hasUnread ? 'text-on-surface' : 'text-on-surface/80'}`}>{c.user.full_name}</span>
                      <span className={`text-[10px] uppercase tracking-widest ${hasUnread ? 'font-bold text-primary' : 'font-medium text-on-surface-variant/40'}`}>
                        {c.lastMessage.created_at && formatDistanceToNow(new Date(c.lastMessage.created_at), { addSuffix: false }).replace('about ', '')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className={`text-sm truncate ${hasUnread ? 'text-on-surface-variant font-medium' : 'text-on-surface-variant/60 italic'}`}>
                        {c.lastMessage.sender_id === profile.id ? 'You: ' : ''}{c.lastMessage.content}
                      </p>
                      {hasUnread && <div className="bg-primary-container text-on-primary-container text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(255,70,160,0.5)] flex-shrink-0">{c.unread}</div>}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          
          <div className="h-10"></div>
          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/30 font-bold font-sans">End of conversations</p>
        </div>
      </main>
    </div>
  );
}
