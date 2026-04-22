import { Link } from 'react-router-dom';

export default function UserCard({ user }) {
  const avatar = user.profile_photo_url
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || 'U')}&background=82c6f1&color=003f5a`;

  const hostelText = user.hostel_or_day || 'Day Scholar';
  const isHostel = hostelText.toLowerCase().includes('hostel');

  return (
    <Link to={`/user/${user.id}`} className="group relative aspect-[3/4] rounded-2xl overflow-hidden glass-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer block no-underline animate-fade-in">
      <img src={avatar} alt={user.full_name} className="absolute inset-0 w-full h-[65%] object-cover" />
      <div className={`absolute top-3 right-3 z-10 backdrop-blur-md px-2 py-1 rounded-full border ${isHostel ? 'bg-tertiary/20 border-tertiary/30' : 'bg-secondary/20 border-secondary/30'}`}>
        <span className={`text-[10px] font-bold uppercase tracking-tighter ${isHostel ? 'text-tertiary' : 'text-secondary'}`}>{hostelText}</span>
      </div>
      <div className="absolute bottom-0 w-full h-[35%] p-4 flex flex-col justify-center gap-1 border-t border-white/5 bg-surface-container-low/80 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="font-headline font-bold text-lg leading-tight text-on-surface truncate pr-2">{user.full_name}</span>
          <div className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-[10px] font-bold uppercase shrink-0">{user.year || 'FY'}</div>
        </div>
        <span className="text-xs text-on-surface-variant font-medium truncate">{user.branch || 'General'}</span>
      </div>
    </Link>
  );
}
