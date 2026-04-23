
{/* TopNavBar */}
<header className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl border-none shadow-[0_0_20px_rgba(233,30,140,0.1)]">
<div className="flex justify-between items-center px-6 py-4 w-full">
<div className="font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-pink-600 font-serif text-2xl tracking-tighter">
                CampusMatch
            </div>
<div className="flex items-center gap-4">
<button className="text-slate-400 hover:scale-105 transition-transform active:scale-95 duration-200">
<span className="material-symbols-outlined">favorite</span>
</button>
<button className="text-slate-400 hover:scale-105 transition-transform active:scale-95 duration-200 relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
</button>
</div>
</div>
</header>
<main className="pt-24 px-6 max-w-7xl mx-auto">
{/* Search and Discover Header */}
<div className="space-y-6">
<h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface">Discover</h1>
{/* Sticky Search Bar Container */}
<div className="sticky top-20 z-40 py-2 bg-background/80 backdrop-blur-md">
<div className="relative group neon-glow-pink transition-all duration-300 rounded-full overflow-hidden border border-outline-variant/20">
<div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-on-surface-variant">
<span className="material-symbols-outlined">search</span>
</div>
<input className="w-full bg-surface-container-high py-4 pl-14 pr-6 rounded-full border-none focus:ring-0 text-on-surface placeholder-on-surface-variant/50 transition-all outline-none" placeholder="Search by name, branch, or interest..." type="text"/>
</div>
</div>
{/* Scrollable Filter Chips */}
<div className="flex gap-3 overflow-x-auto hide-scrollbar py-2 -mx-6 px-6">
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-bold text-sm shadow-[0_0_15px_rgba(233,30,140,0.3)] transition-transform active:scale-95">
                    All
                </button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-bright transition-colors active:scale-95">
                    FY
                </button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-bright transition-colors active:scale-95">
                    SY
                </button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-bright transition-colors active:scale-95">
                    TY
                </button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-bright transition-colors active:scale-95">
                    Final Year
                </button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-bright transition-colors active:scale-95">
                    Hosteller
                </button>
<button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-bright transition-colors active:scale-95">
                    Day Scholar
                </button>
</div>
</div>
{/* 2-column card grid (3-column desktop) */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
{/* User Card 1 */}
<div className="group relative aspect-[3/4] rounded-lg overflow-hidden glass-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer">
<img alt="" className="absolute inset-0 w-full h-[65%] object-cover" data-alt="portrait of a confident young man in a stylish denim jacket against an urban brick wall background with soft afternoon lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAllP4zh37BkPDl5Q3Dncjw2tMaYTcSsk7I9aYsL8VH1eQ-UIW5gC8FrNuMzDvJ6uVRmf-7aUDldLcyE1mMC60RHs2w6NkiQ8Rk7nTKBKWwBd0PwxVH6FeALwd91k16GrNUJNk-Avssx6IEKzQLa2vcr46fdROy0KtbZBMGBKQgnSowm0RGQs0Kjv41SJC_tpHU6BhRpJhPAOyKFgKYNcwSSdyrkCA4Z34UFS6xTDZ40tEx-ieC5eHu-CxVD5zueQRzm0jz0Gd65kA"/>
<div className="absolute top-3 right-3 z-10 bg-tertiary/20 backdrop-blur-md px-2 py-1 rounded-full border border-tertiary/30">
<span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">Hostel A</span>
</div>
<div className="absolute bottom-0 w-full h-[35%] p-4 flex flex-col justify-center gap-1 border-t border-white/5">
<div className="flex items-center justify-between">
<span className="font-headline font-bold text-lg leading-tight text-on-surface">Arjun R.</span>
<div className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-[10px] font-bold uppercase">SY</div>
</div>
<span className="text-xs text-on-surface-variant font-medium">Computer Engineering</span>
</div>
</div>
{/* User Card 2 */}
<div className="group relative aspect-[3/4] rounded-lg overflow-hidden glass-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer">
<img alt="" className="absolute inset-0 w-full h-[65%] object-cover" data-alt="close-up portrait of a young woman with curly hair laughing, outdoors in a park with golden hour sunlight filtering through trees" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzcs9SAu_QZL8gIXV4hqCUGoWzK6dddbw-c3oduuWJRllnEiE8Uvi84f3yKERwc_Dz-WaoG65zwIQ0yDmfaQI64jPU0AkCaTdHjTha7NopTqlQe4b5wxpE5G2KBHkwefqQXY3EhTpHCVq2vOk0SHDLAsdD5anw0GjPblYzEYKu5oGh_wmkJhnrCp8CRqPi8-kX884HDLiuLgSSQQ38ktBJf--53YAOdO8qV2gIN4JQfhhB14h8E3Pb-ONECYa3A2XOH4JVMLMv-LKa"/>
<div className="absolute top-3 right-3 z-10 bg-secondary/20 backdrop-blur-md px-2 py-1 rounded-full border border-secondary/30">
<span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">Day Scholar</span>
</div>
<div className="absolute bottom-0 w-full h-[35%] p-4 flex flex-col justify-center gap-1 border-t border-white/5">
<div className="flex items-center justify-between">
<span className="font-headline font-bold text-lg leading-tight text-on-surface">Meera V.</span>
<div className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-[10px] font-bold uppercase">TY</div>
</div>
<span className="text-xs text-on-surface-variant font-medium">Design &amp; Arts</span>
</div>
</div>
{/* User Card 3 */}
<div className="group relative aspect-[3/4] rounded-lg overflow-hidden glass-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer">
<img alt="" className="absolute inset-0 w-full h-[65%] object-cover" data-alt="thoughtful young man looking off-camera, wearing glasses and a turtleneck sweater, minimalist studio background with cool moody lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsEtx4zP2erftyFiocL4bdVb2hNESLUIgsgTIEn0OVkFkWLosQca174vX96MDjvGP2aMKUYWTFhICf7rycXcDA5UfW24uhtONWFI6icPFohxSo1kgnAwtAzDH0lxzGBRe3RyGL_fncDd_xy_PbAl-9e0YWZAUgtb68D2Ta25cx9aHEyyk_XL1Khe_sPzAKw5voD6v11xVBDJAuZGWFpiAfT5Br5g5Qk3L-ynl9U7UN0e-heLRRq20RBu0inwmnarOsUDjaznm84cCH"/>
<div className="absolute top-3 right-3 z-10 bg-tertiary/20 backdrop-blur-md px-2 py-1 rounded-full border border-tertiary/30">
<span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">Hostel C</span>
</div>
<div className="absolute bottom-0 w-full h-[35%] p-4 flex flex-col justify-center gap-1 border-t border-white/5">
<div className="flex items-center justify-between">
<span className="font-headline font-bold text-lg leading-tight text-on-surface">Rohan K.</span>
<div className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-[10px] font-bold uppercase">FY</div>
</div>
<span className="text-xs text-on-surface-variant font-medium">Business Admin</span>
</div>
</div>
{/* User Card 4 */}
<div className="group relative aspect-[3/4] rounded-lg overflow-hidden glass-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer">
<img alt="" className="absolute inset-0 w-full h-[65%] object-cover" data-alt="portrait of a young woman with a focused expression in an urban setting at night, illuminated by neon purple and pink lights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6dhcmwx7OvEsvQcm_KSvmt1Fkv4OTN-4ruLrr1XZLR6kGh9ilsyEiVx3VLig_IWzFjyeZ5Lvo2Lh-oXV2_0UaNaC7zHTKnhJftY5IzE2VA_LR_BOVippFmjpdzduQ6U3zMggYP4wJM8IIQsp7q4673R4WxMabBF_FJwB-usHwtkR4mFw4ge9Pqg2N25K2PLCWi_R0PJIFEa-ff6cJN52Rm6qq7peXH7-a69oKbFwhKrRV_0vNeW7Qlm9qFV9GzoaUcT32mmzT0rjH"/>
<div className="absolute top-3 right-3 z-10 bg-tertiary/20 backdrop-blur-md px-2 py-1 rounded-full border border-tertiary/30">
<span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">Hostel B</span>
</div>
<div className="absolute bottom-0 w-full h-[35%] p-4 flex flex-col justify-center gap-1 border-t border-white/5">
<div className="flex items-center justify-between">
<span className="font-headline font-bold text-lg leading-tight text-on-surface">Sara A.</span>
<div className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-[10px] font-bold uppercase">Final</div>
</div>
<span className="text-xs text-on-surface-variant font-medium">Medical Science</span>
</div>
</div>
{/* User Card 5 */}
<div className="group relative aspect-[3/4] rounded-lg overflow-hidden glass-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer">
<img alt="" className="absolute inset-0 w-full h-[65%] object-cover" data-alt="cheerful young woman with a vibrant smile in a library, wearing a yellow knit sweater with warm interior lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjeWR_imoFa-bfmsbwx1hjMFaMNs1exT9YV2hzXUREillpYaFyJUSncfCamiiwVGzBdb7mBR2onV3qnmm7Qx7Vs06t3VpyA-e9WnaxpWsW_W85HlKQmRYgcXbRKqJb4cMGRme6lgD6GFeQv6P5UDgkuDiyMncoK9tM_jBhsRY3dwP8bjCHgozWYKCw8Fh6EaQwNfLy1VkaoUbtXdSr07gLUysdCjI28Zsj9UQCstU0o6RGfmFInyHmBH_WEHqCVNF0-fIUMTL_HOUG"/>
<div className="absolute top-3 right-3 z-10 bg-secondary/20 backdrop-blur-md px-2 py-1 rounded-full border border-secondary/30">
<span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">Day Scholar</span>
</div>
<div className="absolute bottom-0 w-full h-[35%] p-4 flex flex-col justify-center gap-1 border-t border-white/5">
<div className="flex items-center justify-between">
<span className="font-headline font-bold text-lg leading-tight text-on-surface">Ishani S.</span>
<div className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-[10px] font-bold uppercase">SY</div>
</div>
<span className="text-xs text-on-surface-variant font-medium">Architecture</span>
</div>
</div>
{/* User Card 6 */}
<div className="group relative aspect-[3/4] rounded-lg overflow-hidden glass-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer">
<img alt="" className="absolute inset-0 w-full h-[65%] object-cover" data-alt="portrait of a stylish young man outdoors in an urban environment with soft bokeh background and cool blue hour lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsyeA1GvzDpyWEHr3Y6Iuq6kzL7zc-SkXIW0u89dtZd5vopkf0AohfHe-B4Kc0SxA0peeNqVpqYK9tFnC5mzc4ayzJ9cl-CmOnSkafx-PYg3YZkqZ6ru_gPKx1xn4fPRTIT47zn_gy9dFRLoksd3btOcG4t4QiwrrK89X35_6BeuTCEpUu4by9uXJ89CzEX4IT9i3sVcaOcfoAHrWuXYJvf5dGU4LRhLnxYv1ukcKurYr6dp1fvvQIuX_MsAPypd1JL_VwQMtow68t"/>
<div className="absolute top-3 right-3 z-10 bg-tertiary/20 backdrop-blur-md px-2 py-1 rounded-full border border-tertiary/30">
<span className="text-[10px] font-bold text-tertiary uppercase tracking-tighter">Hostel D</span>
</div>
<div className="absolute bottom-0 w-full h-[35%] p-4 flex flex-col justify-center gap-1 border-t border-white/5">
<div className="flex items-center justify-between">
<span className="font-headline font-bold text-lg leading-tight text-on-surface">Zayn M.</span>
<div className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary text-[10px] font-bold uppercase">TY</div>
</div>
<span className="text-xs text-on-surface-variant font-medium">Mechanical Eng.</span>
</div>
</div>
</div>
</main>
{/* BottomNavBar */}
<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-slate-950/60 backdrop-blur-2xl border-t border-white/5 shadow-[0_-4px_30px_rgba(0,0,0,0.5)] rounded-t-[2.5rem]">
<a className="flex flex-col items-center justify-center text-slate-500 px-5 py-2 hover:text-pink-300 transition-colors active:scale-90 duration-300" href="#">
<span className="material-symbols-outlined mb-1">home</span>
<span className="font-sans text-[10px] font-bold uppercase tracking-widest">Home</span>
</a>
<a className="flex flex-col items-center justify-center text-pink-500 bg-pink-500/10 rounded-full px-5 py-2 shadow-[0_0_15px_rgba(233,30,140,0.3)] hover:text-pink-300 transition-colors active:scale-90 duration-300" href="#">
<span className="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 1;">explore</span>
<span className="font-sans text-[10px] font-bold uppercase tracking-widest">Discover</span>
</a>
<a className="flex flex-col items-center justify-center text-slate-500 px-5 py-2 hover:text-pink-300 transition-colors active:scale-90 duration-300" href="#">
<span className="material-symbols-outlined mb-1">chat_bubble</span>
<span className="font-sans text-[10px] font-bold uppercase tracking-widest">Messages</span>
</a>
<a className="flex flex-col items-center justify-center text-slate-500 px-5 py-2 hover:text-pink-300 transition-colors active:scale-90 duration-300" href="#">
<span className="material-symbols-outlined mb-1">person</span>
<span className="font-sans text-[10px] font-bold uppercase tracking-widest">Profile</span>
</a>
</nav>
