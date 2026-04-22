import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { compressImage, isValidImageType } from '../utils/imageCompression';
import { containsProfanity } from '../utils/profanityFilter';
import { BUCKET_POSTS } from '../utils/constants';
import toast from 'react-hot-toast';

export default function CreatePost({ onPostCreated }) {
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!isValidImageType(file)) {
      toast.error('Please select a valid image (JPEG, PNG, WebP, or GIF)');
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  const closeModal = () => {
    setIsOpen(false);
    setContent('');
    removeImage();
    setIsAnonymous(false);
  };

  const handleSubmit = async () => {
    const trimmed = content.trim();
    if (!trimmed && !image) {
      toast.error('Write something or add an image');
      return;
    }

    if (containsProfanity(trimmed)) {
      toast.error('Your post contains inappropriate language. Please revise.');
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = null;

      if (image) {
        const compressed = await compressImage(image, 'post');
        const fileName = `${profile.id}/${Date.now()}-${compressed.name}`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET_POSTS)
          .upload(fileName, compressed);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from(BUCKET_POSTS)
          .getPublicUrl(fileName);
        imageUrl = publicUrl;
      }

      const { data, error } = await supabase
        .from('posts')
        .insert({
          user_id: profile.id,
          content: trimmed,
          image_url: imageUrl,
          is_anonymous: isAnonymous,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Post shared!');
      if (onPostCreated) onPostCreated(data);
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error('Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 w-14 h-14 bg-gradient-to-br from-primary to-primary-container rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(233,30,140,0.4)] z-[60] active:scale-90 transition-transform group cursor-pointer border-none"
      >
        <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-90">add</span>
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping"></div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card border border-outline-variant/10 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-fade-in-up">
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline text-2xl font-bold text-on-surface">New Vibe</h3>
              <button onClick={closeModal} className="text-outline hover:text-on-surface transition-colors cursor-pointer bg-surface-container-high rounded-full w-8 h-8 flex items-center justify-center border-none">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {/* Input area */}
            <div className="flex gap-4 mb-4">
              <img
                src={isAnonymous ? `https://ui-avatars.com/api/?name=?&background=d9e4ea&color=566166` : (profile?.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name || 'U')}&background=82c6f1&color=003f5a`)}
                alt=""
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div className="flex-1">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's your campus vibe right now?"
                  rows={4}
                  className="w-full bg-transparent border-none text-on-surface placeholder:text-outline/40 focus:ring-0 resize-none outline-none text-lg leading-relaxed"
                />
              </div>
            </div>

            {/* Image preview */}
            {imagePreview && (
              <div className="relative mt-2 mb-4 rounded-2xl overflow-hidden bg-surface-container-low max-h-[300px]">
                <img src={imagePreview} alt="Preview" className="w-full object-cover" />
                <button
                  onClick={removeImage}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer border-none"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            )}

            {/* Actions row */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-outline-variant/10">
              <div className="flex items-center gap-6">
                {/* Image upload */}
                <label className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors bg-surface-container-high hover:bg-primary/20 text-primary">
                  <span className="material-symbols-outlined">add_photo_alternate</span>
                  <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                </label>

                {/* Anonymous toggle */}
                <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-on-surface-variant uppercase tracking-widest">
                  <div
                    className="relative w-12 h-6 rounded-full transition-colors"
                    style={{ background: isAnonymous ? 'var(--color-primary)' : 'var(--color-surface-container-highest)' }}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-md"
                      style={{ transform: isAnonymous ? 'translateX(26px)' : 'translateX(4px)' }}
                    />
                  </div>
                  Anon
                </label>
              </div>

              <button 
                onClick={handleSubmit} 
                disabled={submitting || (!content.trim() && !image)} 
                className="glow-md bg-gradient-to-br from-primary to-primary-container text-white font-bold tracking-widest px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2 cursor-pointer border-none"
              >
                {submitting ? 'SENDING...' : 'POST'}
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
