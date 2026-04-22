import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { compressImage, isValidImageType } from '../utils/imageCompression';
import { BRANCHES, DIVISIONS, YEARS, HOSTEL_STATUS, BUCKET_PROFILES } from '../utils/constants';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

export default function EditProfile() {
  const navigate = useNavigate();
  const { profile, refreshProfile } = useAuth();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      full_name: profile?.full_name || '',
      age: profile?.age || '',
      branch: profile?.branch || '',
      division: profile?.division || '',
      year: profile?.year || '',
      hostel_or_day: profile?.hostel_or_day || '',
      bio: profile?.bio || '',
    },
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(profile?.profile_photo_url || null);
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
      let photoUrl = profile?.profile_photo_url;

      if (profilePhoto) {
        const compressed = await compressImage(profilePhoto, 'profile');
        const fileName = `${profile.id}/${Date.now()}-profile.jpg`;
        const { error: uploadError } = await supabase.storage
          .from(BUCKET_PROFILES)
          .upload(fileName, compressed);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from(BUCKET_PROFILES)
          .getPublicUrl(fileName);
        photoUrl = publicUrl;
      }

      const { error } = await supabase
        .from('users')
        .update({
          full_name: data.full_name,
          age: parseInt(data.age),
          branch: data.branch,
          division: data.division,
          year: data.year,
          hostel_or_day: data.hostel_or_day,
          bio: data.bio || null,
          profile_photo_url: photoUrl,
        })
        .eq('id', profile.id);

      if (error) throw error;

      await refreshProfile();
      toast.success('Profile updated!');
      navigate('/profile');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (!profile) return null;

  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name)}&background=82c6f1&color=003f5a&size=200`;
  const dashedBg = "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23ff46a0' stroke-width='3' stroke-dasharray='10%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")";

  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen pb-32 selection:bg-primary-container selection:text-white relative">
      {/* Ambient Glow Effects */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0"></div>
      
      <Navbar />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
        <header className="mb-10 text-center lg:text-left animate-fade-in-up">
          <h1 className="font-headline text-4xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-on-surface to-primary">
            Edit Profile
          </h1>
          <p className="font-body text-on-surface-variant/70 text-lg">Update your campus vibe.</p>
        </header>

        <div className="glass-card border border-outline-variant/10 rounded-3xl p-8 lg:p-12 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {/* Decorative Accent */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
            {/* Avatar Upload Zone */}
            <div className="md:col-span-12 flex flex-col items-center justify-center mb-2">
              <label className="relative group cursor-pointer">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center p-2 transition-transform duration-500 group-hover:rotate-12" style={{ backgroundImage: dashedBg }}>
                  <div className="w-full h-full rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border-4 border-surface-container-lowest relative">
                    <img src={photoPreview || avatarFallback} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white text-3xl">add_a_photo</span>
                    </div>
                  </div>
                </div>
                <button type="button" className="absolute bottom-1 right-1 bg-primary-container text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all pointer-events-none">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
                <input type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
              </label>
            </div>

            {/* Form Fields */}
            <div className="md:col-span-8 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary ml-1">Full Name *</label>
              <input 
                {...register('full_name', { required: 'Name is required' })}
                className="w-full bg-surface-container-low/50 border-b-2 border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg transition-all outline-none placeholder:text-on-surface-variant/30" 
              />
              {errors.full_name && <p className="text-xs text-error mt-1">{errors.full_name.message}</p>}
            </div>

            <div className="md:col-span-4 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-primary ml-1">Age *</label>
              <input 
                type="number"
                {...register('age', { required: 'Age is required', min: { value: 16, message: 'Min 16' }, max: { value: 30, message: 'Max 30' } })}
                className="w-full bg-surface-container-low/50 border-b-2 border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg transition-all outline-none placeholder:text-on-surface-variant/30" 
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
                rows="3"
              ></textarea>
            </div>

            <div className="md:col-span-12 pt-6 flex flex-col sm:flex-row gap-4">
              <button 
                type="button" 
                onClick={() => navigate('/profile')} 
                className="sm:w-1/3 glass-card py-4 rounded-full text-on-surface font-bold tracking-widest hover:bg-surface-container-high active:scale-95 transition-all text-center">
                CANCEL
              </button>
              <button 
                type="submit" 
                disabled={submitting}
                className="sm:flex-1 glow-md bg-gradient-to-br from-primary to-primary-container py-4 rounded-full text-on-primary font-bold tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-3 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer">
                <span>{submitting ? 'SAVING...' : 'SAVE CHANGES'}</span>
                <span className="material-symbols-outlined">save</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
