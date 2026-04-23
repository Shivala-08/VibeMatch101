
{/* Top Navigation Bar */}
<nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-slate-950/40 backdrop-blur-xl border-none shadow-none shadow-[0_0_20px_rgba(233,30,140,0.1)]">
<div className="font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-pink-600 font-serif text-2xl tracking-tighter">
            CampusMatch
        </div>
<div className="flex items-center gap-6">
<span className="material-symbols-outlined text-slate-400 hover:scale-105 transition-transform cursor-pointer" data-icon="favorite">favorite</span>
<span className="material-symbols-outlined text-slate-400 hover:scale-105 transition-transform cursor-pointer" data-icon="notifications">notifications</span>
</div>
</nav>
{/* Main Canvas */}
<main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
{/* Header & Progress */}
<header className="mb-10 text-center lg:text-left">
<h1 className="font-headline text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-on-surface to-primary">
                Complete Your Profile
            </h1>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-2">
<div className="h-full w-3/4 bg-gradient-to-r from-primary to-primary-container progress-glow rounded-full"></div>
</div>
<div className="flex justify-between items-center px-1">
<span className="text-label text-xs uppercase tracking-widest text-primary font-bold">Step 3 of 4</span>
<span className="text-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">75% Finished</span>
</div>
</header>
{/* Profile Setup Container */}
<div className="glass-panel border border-outline-variant/10 rounded-xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
{/* Decorative Accent */}
<div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
<form className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
{/* Avatar Upload Zone */}
<div className="md:col-span-12 flex flex-col items-center justify-center mb-6">
<div className="relative group">
<div className="w-40 h-40 rounded-full custom-dashed flex items-center justify-center p-2 transition-transform duration-500 group-hover:rotate-12">
<div className="w-full h-full rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border-4 border-surface-container-lowest">
<span className="material-symbols-outlined text-primary text-5xl opacity-40 group-hover:opacity-100 transition-opacity" data-icon="add_a_photo">add_a_photo</span>
</div>
</div>
<button className="absolute bottom-1 right-1 bg-primary-container text-on-primary-container w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all" type="button">
<span className="material-symbols-outlined text-sm" data-icon="edit">edit</span>
</button>
</div>
<p className="mt-4 text-label text-sm text-on-surface-variant font-medium">Upload your campus vibe</p>
</div>
{/* Form Fields */}
<div className="md:col-span-8 space-y-2">
<label className="block text-label text-sm font-bold text-primary tracking-wide ml-1">Full Name</label>
<input className="w-full bg-surface-container-low border-b border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg transition-all placeholder:text-on-surface-variant/30" placeholder="Alex Rivers" type="text"/>
</div>
<div className="md:col-span-4 space-y-2">
<label className="block text-label text-sm font-bold text-primary tracking-wide ml-1">Age</label>
<input className="w-full bg-surface-container-low border-b border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg transition-all" placeholder="21" type="number"/>
</div>
<div className="md:col-span-6 space-y-2">
<label className="block text-label text-sm font-bold text-primary tracking-wide ml-1">Branch</label>
<div className="relative">
<select className="w-full bg-surface-container-low border-b border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg appearance-none transition-all">
<option>Computer Science</option>
<option>Mechanical Engineering</option>
<option>Architecture</option>
<option>Business Management</option>
<option>Fine Arts</option>
</select>
<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" data-icon="expand_more">expand_more</span>
</div>
</div>
<div className="md:col-span-3 space-y-2">
<label className="block text-label text-sm font-bold text-primary tracking-wide ml-1">Year</label>
<select className="w-full bg-surface-container-low border-b border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg appearance-none transition-all">
<option>1st Year</option>
<option>2nd Year</option>
<option>3rd Year</option>
<option>4th Year</option>
</select>
</div>
<div className="md:col-span-3 space-y-2">
<label className="block text-label text-sm font-bold text-primary tracking-wide ml-1">Division</label>
<input className="w-full bg-surface-container-low border-b border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg transition-all" placeholder="Sec-A" type="text"/>
</div>
{/* Toggle Switch */}
<div className="md:col-span-12 py-4">
<div className="bg-surface-container-low rounded-xl p-1 flex items-center w-fit border border-outline-variant/10">
<button className="px-6 py-2 rounded-lg text-sm font-bold transition-all bg-primary-container text-on-primary-container shadow-lg" type="button">Hostel</button>
<button className="px-6 py-2 rounded-lg text-sm font-bold transition-all text-on-surface-variant hover:text-on-surface" type="button">Day Scholar</button>
</div>
</div>
<div className="md:col-span-12 space-y-2">
<label className="block text-label text-sm font-bold text-primary tracking-wide ml-1">Bio</label>
<textarea className="w-full bg-surface-container-low border-b border-outline/30 focus:border-primary focus:ring-0 text-on-surface px-4 py-3 rounded-t-lg transition-all resize-none" placeholder="Coffee lover, late-night coder, and looking for someone to explore the campus library's hidden corners with..." rows="4"></textarea>
</div>
{/* Submit Button */}
<div className="md:col-span-12 pt-6">
<button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-bold text-lg py-4 rounded-full shadow-[0_0_30px_rgba(233,30,140,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2" type="submit">
<span>Launch Your Profile</span>
<span className="material-symbols-outlined" data-icon="rocket_launch">rocket_launch</span>
</button>
</div>
</form>
</div>
{/* Secondary Guidance */}
<p className="mt-8 text-center text-on-surface-variant text-sm font-medium italic opacity-60">
            "Your profile is your digital aura. Make it shine."
        </p>
</main>
{/* Bottom Navigation Bar */}
<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-slate-950/60 backdrop-blur-2xl border-t border-white/5 shadow-[0_-4px_30px_rgba(0,0,0,0.5)] rounded-t-[2.5rem]">
<div className="flex flex-col items-center justify-center text-slate-500 px-5 py-2 hover:text-pink-300 transition-colors active:scale-90 duration-300">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-sans text-[10px] font-bold uppercase tracking-widest mt-1">Home</span>
</div>
<div className="flex flex-col items-center justify-center text-slate-500 px-5 py-2 hover:text-pink-300 transition-colors active:scale-90 duration-300">
<span className="material-symbols-outlined" data-icon="explore">explore</span>
<span className="font-sans text-[10px] font-bold uppercase tracking-widest mt-1">Discover</span>
</div>
<div className="flex flex-col items-center justify-center text-slate-500 px-5 py-2 hover:text-pink-300 transition-colors active:scale-90 duration-300">
<span className="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
<span className="font-sans text-[10px] font-bold uppercase tracking-widest mt-1">Messages</span>
</div>
<div className="flex flex-col items-center justify-center text-pink-500 bg-pink-500/10 rounded-full px-5 py-2 shadow-[0_0_15px_rgba(233,30,140,0.3)] active:scale-90 duration-300">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-sans text-[10px] font-bold uppercase tracking-widest mt-1">Profile</span>
</div>
</nav>
