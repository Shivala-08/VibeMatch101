import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { compressImage, isValidImageType } from '../utils/imageCompression';
import { BRANCHES, DIVISIONS, YEARS, HOSTEL_STATUS, BUCKET_PROFILES } from '../utils/constants';
import toast from 'react-hot-toast';

export default function CreateProfile() {
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: { hostel_or_day: 'hostel' }
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const hostelOrDay = watch('hostel_or_day');

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!isValidImageType(file)) {
      toast.error('Please select a valid image');
      return;
    }
    setProfilePhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      let photoUrl = null;

      if (profilePhoto) {
        const compressed = await compressImage(profilePhoto, 'profile');
        const fileName = `${user.id}/${Date.now()}-profile.jpg`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET_PROFILES)
          .upload(fileName, compressed);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from(BUCKET_PROFILES)
          .getPublicUrl(fileName);
        photoUrl = publicUrl;
      }

      const { error } = await supabase.from('users').insert({
        id: user.id,
        email: user.email,
        full_name: data.full_name,
        age: parseInt(data.age),
        branch: data.branch,
        division: data.division,
        year: data.year,
        hostel_or_day: data.hostel_or_day,
        bio: data.bio || null,
        profile_photo_url: photoUrl,
      });

      if (error) throw error;

      await refreshProfile();
      toast.success('Profile created!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to create profile');
    } finally {
      setSubmitting(false);
    }
  };

  const dashedBg = "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23ff46a0' stroke-width='3' stroke-dasharray='10%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")";

  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen pb-20 selection:bg-primary-container selection:text-white">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-slate-950/40 backdrop-blur-xl border-none shadow-none shadow-[0_0_20px_rgba(233,30,140,0.1)]">
        <div className="font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-pink-600 text-2xl tracking-tighter">
          CampusMatch
        </div>
      </nav>

      {/* Main Canvas */}
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Header & Progress */}
        <header className="mb-10 text-center lg:text-left animate-fade-in-up">
          <h1 className="font-headline text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-on-surface to-primary">
            Complete Your Profile
          </h1>
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-2">
            <div className="h-full w-3/4 bg-gradient-to-r from-primary to-primary-container glow-sm rounded-full"></div>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="text-xs uppercase tracking-widest text-primary font-bold">Step 3 of 4</span>
            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">75% Finished</span>
          </div>
        </header>

        {/* Profile Setup Container */}
        <div className="glass-card border border-outline-variant/10 rounded-3xl p-8 lg:p-12 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {/* Decorative Accent */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
            
            {/* Avatar Upload Zone */}
            <div className="md:col-span-12 flex flex-col items-center justify-center mb-2">
              <label className="relative group cursor-pointer">
                <div className="w-40 h-40 rounded-full flex items-center justify-center p-2 transition-transform duration-500 group-hover:rotate-12" style={{ backgroundImage: dashedBg }}>
                  <div className="w-full h-full rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border-4 border-surface-container-lowest">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-primary text-5xl opacity-40 group-hover:opacity-100 transition-opacity">add_a_photo</span>
                    )}
                  </div>
                </div>
                <button type="button" className="absolute bottom-1 right-1 bg-primary-container text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all pointer-events-none">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
                <input type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
              </label>
              <p className="mt-4 text-xs text-on-surface-variant font-medium uppercase tracking-wider">Upload your campus vibe</p>
            </div>

            {/* Form Fields */}
            <div className="md:col-span-8 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary ml-1">Full Name *</label>
              <input 
                {...register('full_name', { required: 'Name is required' })}
                className="w-full bg-surface-container-low/50 border-b-2 border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg transition-all outline-none placeholder:text-on-surface-variant/30" 
                placeholder="Alex Rivers" 
              />
              {errors.full_name && <p className="text-xs text-error mt-1">{errors.full_name.message}</p>}
            </div>

            <div className="md:col-span-4 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary ml-1">Age *</label>
              <input 
                type="number"
                {...register('age', { required: 'Age is required', min: { value: 16, message: 'Min 16' }, max: { value: 30, message: 'Max 30' } })}
                className="w-full bg-surface-container-low/50 border-b-2 border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg transition-all outline-none placeholder:text-on-surface-variant/30" 
                placeholder="21" 
              />
              {errors.age && <p className="text-xs text-error mt-1">{errors.age.message}</p>}
            </div>

            <div className="md:col-span-6 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary ml-1">Branch *</label>
              <div className="relative">
                <select 
                  {...register('branch', { required: 'Branch is required' })}
                  className="w-full bg-surface-container-low/50 border-b-2 border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg appearance-none transition-all outline-none">
                  <option value="" disabled>Select your branch</option>
                  {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
              {errors.branch && <p className="text-xs text-error mt-1">{errors.branch.message}</p>}
            </div>

            <div className="md:col-span-3 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary ml-1">Year *</label>
              <div className="relative">
                <select 
                  {...register('year', { required: 'Required' })}
                  className="w-full bg-surface-container-low/50 border-b-2 border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg appearance-none transition-all outline-none">
                  <option value="" disabled>Year</option>
                  {YEARS.map(y => <option key={y.value} value={y.value}>{y.label}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
              {errors.year && <p className="text-xs text-error mt-1">{errors.year.message}</p>}
            </div>

            <div className="md:col-span-3 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary ml-1">Division *</label>
              <div className="relative">
                <select 
                  {...register('division', { required: 'Required' })}
                  className="w-full bg-surface-container-low/50 border-b-2 border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg appearance-none transition-all outline-none">
                  <option value="" disabled>Div</option>
                  {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
              {errors.division && <p className="text-xs text-error mt-1">{errors.division.message}</p>}
            </div>

            {/* Toggle Switch */}
            <div className="md:col-span-12 py-2">
              <div className="bg-surface-container-low rounded-xl p-1 flex items-center w-fit border border-outline-variant/10">
                {HOSTEL_STATUS.map(h => (
                  <button 
                    key={h.value}
                    type="button"
                    onClick={() => setValue('hostel_or_day', h.value)}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                      hostelOrDay === h.value 
                        ? 'bg-primary-container text-white shadow-lg' 
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
              {errors.hostel_or_day && <p className="text-xs text-error mt-1">{errors.hostel_or_day.message}</p>}
            </div>

            <div className="md:col-span-12 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary ml-1">Bio</label>
              <textarea 
                {...register('bio')}
                className="w-full bg-surface-container-low/50 border-b-2 border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg transition-all outline-none resize-none placeholder:text-on-surface-variant/30" 
                placeholder="Coffee lover, late-night coder, and looking for someone to explore the campus library's hidden corners with..." 
                rows="3"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-12 pt-6">
              <button 
                type="submit" 
                disabled={submitting}
                className="w-full glow-md bg-gradient-to-br from-primary to-primary-container py-4 rounded-full text-on-primary font-bold text-lg tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-3 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer">
                <span>{submitting ? 'LAUNCHING...' : 'LAUNCH YOUR PROFILE'}</span>
                <span className="material-symbols-outlined">rocket_launch</span>
              </button>
            </div>
          </form>
        </div>

        {/* Secondary Guidance */}
        <p className="mt-8 text-center text-on-surface-variant text-sm font-medium italic opacity-60 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          "Your profile is your digital aura. Make it shine."
        </p>
      </main>
    </div>
  );
}
