
{/* TopAppBar */}
<header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-zinc-950/40 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
<div className="flex justify-between items-center w-full px-12 h-24 max-w-screen-2xl mx-auto">
<div className="flex items-center gap-8">
<span className="text-3xl font-black italic tracking-tighter text-zinc-100 ml-[-8%] drop-shadow-[0_2px_10px_rgba(255,0,122,0.3)]">CampusMatch</span>
<nav className="hidden md:flex gap-8">
<a className="text-pink-500 font-bold border-b-2 border-pink-500 pb-1 cursor-pointer active:scale-95 cubic-bezier(0.22,1,0.36,1) transition-all duration-300" href="#">Discover</a>
<a className="text-zinc-400 font-light hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer" href="#">Match</a>
<a className="text-zinc-400 font-light hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer" href="#">Pulse</a>
</nav>
</div>
<div className="flex items-center gap-6">
<div className="relative hidden sm:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">search</span>
<input className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs font-label-caps focus:outline-none focus:ring-1 focus:ring-pink-500/50 w-64 transition-all duration-500" placeholder="Search experiences..." type="text"/>
</div>
<div className="flex gap-4">
<span className="material-symbols-outlined text-zinc-400 hover:text-pink-500 cursor-pointer transition-colors" data-icon="notifications">notifications</span>
<span className="material-symbols-outlined text-zinc-400 hover:text-pink-500 cursor-pointer transition-colors" data-icon="settings">settings</span>
</div>
</div>
</div>
</header>
<main className="relative pt-32 pb-40 px-offset-left md:px-0 max-w-screen-2xl mx-auto">
{/* Floating Canvas Element */}
<div className="fixed top-40 right-offset-right hidden xl:block w-px h-64 bg-gradient-to-b from-transparent via-pink-500/20 to-transparent"></div>
<div className="fixed top-1/2 right-offset-right hidden xl:block -rotate-90 origin-right translate-x-12">
<span className="text-label-caps font-label-caps text-zinc-600 tracking-[1em] whitespace-nowrap">CURATED FEED // VOL 04</span>
</div>
{/* Asymmetric Header */}
<section className="mb-lg px-8 lg:pl-32">
<span className="font-label-caps text-pink-500 uppercase tracking-widest block mb-4">Tonight's Rhythm</span>
<h1 className="font-display-xl text-display-xl text-on-background italic">Explore the <br/><span className="text-secondary">Unseen Campus.</span></h1>
</section>
{/* Magazine Grid */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 px-8">
{/* Hero Post (Large) */}
<article className="md:col-span-8 group relative">
<div className="relative rounded-xl overflow-hidden aspect-[16/10] shadow-2xl border border-white/5 transition-transform duration-700 group-hover:scale-[1.01]">
<img alt="" className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000" data-alt="cinematic wide shot of a rooftop jazz lounge at night with purple neon lights and people chatting in soft focus" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSYIJ0X54Ya-UO1Qmfe_7_wEANlRHUvTHOg9tmy-gQnQ1saRghnjnOrhR53alW51NYot99XWHwVIslrgTEpZEJL4lZG8Z8iBLFSY6r_AD6rfa3ie8eGkIlOSLhSL84xG_xJiXL6ZYPRRbDQUS_AHq4avjcR6KdP364jldJepY3Thw7FmiTeG1clQOaIJtCmnwJWu1L-EM2px9vHePzbbTS_--APkzN38nsKNn3a8S_QM8ky36hqOQ-VaDcO-9aUZJlccdTLsY4hCdK"/>
<div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80"></div>
<div className="absolute bottom-0 left-0 p-8 md:p-12">
<div className="flex gap-3 mb-4">
<span className="font-label-caps text-[10px] bg-pink-500/20 text-pink-400 border border-pink-500/30 px-3 py-1 rounded-full">LIVE NOW</span>
<span className="font-label-caps text-[10px] bg-white/5 text-zinc-300 border border-white/10 px-3 py-1 rounded-full">ROOFTOP SESSION</span>
</div>
<h2 className="font-headline-lg text-headline-lg mb-4 leading-tight max-w-xl">Midnight Grooves: The Secret Rooftop Gathering.</h2>
<div className="flex items-center gap-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-pink-500 text-sm" data-icon="bolt" style="font-variation-settings: 'FILL' 1;">bolt</span>
<span className="font-label-caps text-zinc-400">1.2k Pulsing</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-zinc-400 text-sm" data-icon="schedule">schedule</span>
<span className="font-label-caps text-zinc-400">2h Left</span>
</div>
</div>
</div>
</div>
</article>
{/* Small Detail Post */}
<article className="md:col-span-4 flex flex-col justify-end space-y-6">
<div className="relative optical-glass p-8 rounded-xl bg-surface-container-low/30">
<div className="glass-noise"></div>
<span className="font-label-caps text-secondary mb-4 block">New Match</span>
<div className="flex items-center gap-4 mb-6">
<div className="relative w-12 h-12 rounded-full border border-pink-500 p-0.5">
<img alt="" className="w-full h-full object-cover rounded-full" data-alt="portrait of a stylish young woman with neon rim light and cool aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSnRiz96DqW53h4wp8X_Cwpdhp_R1RYtlkZx5I1aaT3bK3kZq_SdCWcn7bADcyO5HR3OlSiU5J43XhjeTzDvKJkgdFwAJIshYDqCbJzcC1Zd-A4d1i-LIZw4fPqsylzT7FTy4zEuybOIfmAubHmt4m3ooZfQDQ9MNyq8FR-uhVvCcTPCoJ7XzZG-AyEd3xipBlpje_xA_2lLgBVG3OkUSCy5sr0xmdRzPtE3S8RN2dWNaRZemo1Xj3phN4MtVMU93y3-0B7RKaWEtU"/>
</div>
<div>
<p className="font-label-caps text-white">Elena Vance</p>
<p className="text-xs text-zinc-500 italic">Architecture Major</p>
</div>
</div>
<p className="font-body-md text-zinc-300 mb-6 italic italic">"Looking for someone to explore the abandoned observatory with tonight."</p>
<button className="w-full font-label-caps py-3 border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all rounded-lg flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-xs" data-icon="favorite">favorite</span>
                        Connect
                    </button>
</div>
<div className="h-40 relative rounded-xl overflow-hidden shadow-xl border border-white/5">
<img alt="" className="w-full h-full object-cover opacity-60" data-alt="architectural close up of modern concrete campus building with sharp shadows and neon street light reflection" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEP0un6Wk_1arxgHBcrPx1HMXAiDGQJJXopBSycQ37HTKXZ2PpE9p-sXN6jNiz6NWQDsXx9YXGB7MKRow_5lE5KwodZZrZQ40HbWlAk-SLFuCBPP9rn7bk6Qh2Q2t-Mt-1aLWVhXMBk5i9Zf-1QduL_XtAdgy8j-STDBPBAoPJZPIgkglfZeaReuAvyry-0pLktUysRrHF18Zf5FOhylwZxR-pSbfmdUlL2_u3p4GPVdCslBAvaAYZIisNZsmFZTGljZNzW8-9kofF"/>
<div className="absolute inset-0 flex items-center justify-center">
<span className="font-label-caps text-white tracking-[0.4em] uppercase text-xs">Architectural Walk</span>
</div>
</div>
</article>
{/* Medium Post (Full height style) */}
<article className="md:col-span-5 md:mt-24 group">
<div className="relative rounded-xl overflow-hidden aspect-[4/5] shadow-2xl border border-white/10 mb-6">
<img alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" data-alt="young people at a neon-lit art gallery event laughing and holding drinks" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDYqDi2ZQZ5a3sfDAQST4zGrUXSBMGvD22flmcERnrEl1Khn0Yhhd5sCQ32zPlOIPa7R7k4zOBA_tyn0uw6uhu0bMM-aV-9O2eF5H49S-e19CxPfueHo--p3LBgq5rma5yOmwOOILqxyLq5JZpV1rCv3n9yb_euMd-fLdBPgJB-xt3zGZEQObeNT3OA9cWlFoflmhK4erNByEFBNCRCteYpQxCo9t1MaYtPpBfALFQ0pG8O-4wHApo_O0a5IW88kVNI5E5Iti_mjob"/>
<div className="absolute top-6 right-6">
<div className="bg-zinc-950/80 backdrop-blur px-4 py-2 rounded-full border border-white/10">
<span className="material-symbols-outlined text-pink-500" data-icon="grain">grain</span>
</div>
</div>
</div>
<span className="font-label-caps text-tertiary-fixed-dim uppercase text-[10px] tracking-widest mb-2 block">Featured Collection</span>
<h3 className="font-headline-md text-headline-md text-white mb-4 italic">The Neon Chronicles.</h3>
<p className="text-zinc-400 font-body-md line-clamp-2">A photographic journey through the campus's most vibrant late-night aesthetic spots curated by the Arts Collective.</p>
</article>
{/* Asymmetric Text Block & Stats */}
<article className="md:col-span-7 md:pl-12 flex flex-col justify-center space-y-12">
<div className="grid grid-cols-2 gap-8">
<div className="p-8 optical-glass rounded-xl bg-surface-container-highest/20">
<div className="glass-noise"></div>
<span className="font-display-xl text-display-xl text-pink-500 block">84%</span>
<span className="font-label-caps text-zinc-500">Match Accuracy</span>
</div>
<div className="p-8 optical-glass rounded-xl bg-surface-container-highest/20">
<div className="glass-noise"></div>
<span className="font-display-xl text-display-xl text-secondary block">24h</span>
<span className="font-label-caps text-zinc-500">Pulse Cycle</span>
</div>
</div>
<div className="relative pl-12 border-l border-white/10">
<span className="material-symbols-outlined absolute -left-4 top-0 text-white/20 text-4xl" data-icon="format_quote">format_quote</span>
<p className="font-headline-md text-zinc-300 italic mb-8">"Campus life isn't about the lecture halls. It's about the spaces between them, the people you find, and the stories you build at 2 AM."</p>
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-zinc-800"></div>
<div>
<p className="font-label-caps text-white text-xs">Jules Thorne</p>
<p className="text-[10px] text-zinc-600 font-label-caps uppercase">Design Director</p>
</div>
</div>
</div>
</article>
</div>
{/* Horizontal Scroll Section */}
<section className="mt-xl overflow-x-hidden">
<div className="px-8 flex items-end justify-between mb-12">
<div>
<span className="font-label-caps text-pink-500 tracking-[0.3em] uppercase block mb-4">Trending Pulses</span>
<h2 className="font-headline-lg text-headline-lg">Nearby Vibes.</h2>
</div>
<button className="font-label-caps text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                    View Map <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
<div className="flex gap-8 px-8 overflow-x-auto pb-12 no-scrollbar">
{/* Vibe Card 1 */}
<div className="flex-none w-80 group cursor-pointer">
<div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-6 border border-white/5 soft-glow-border">
<img alt="" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2" data-alt="close up of colored liquid in glass under neon light with deep shadows and high contrast" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa3sN13RWa80Q4Ob6nmYwwOPJqypUozYg17gWb2NfZdgrIeY7F84QZGIiIFp4FM5tkJn7mu1BqTfKvfDedTZQ7BoT4DokintWFyEk4c3PkU0K3HdBtLMw4I3leK-6p3rkpa__lXLgfUNHizAs2Ipth2tGy0K9dp8jyLZene7PjIiH9ETWTokX-fZOeAYdcL44K-PqsQ5iQIWoIos8hT4qkXZO8U9I5k6vramXZQhKOeUsKtg_hz3Y1iuoqgdS-qmcKwXoqJ0wEUa2v"/>
<div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
<div className="absolute bottom-6 left-6">
<p className="font-label-caps text-white text-lg">Synth-Pop Mix</p>
<p className="text-xs text-pink-400 font-label-caps uppercase tracking-wider">300m away</p>
</div>
</div>
</div>
{/* Vibe Card 2 */}
<div className="flex-none w-80 group cursor-pointer">
<div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-6 border border-white/5">
<img alt="" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2" data-alt="motion blur of colorful party lights and dancing silhouettes in a dark club setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGEQC9qXsWJ401G7EsMmgj4yxqcaEmv0z_bNCGLgpVs9XMAhz47l5nu7TeWfg_Tm1WkX4Andrao16D7m52wGtt4Ck0QMLqOmKtVxQFpBwRkdGI-mQtWy9qeR5zU4rvxpRVYefA8gQ82h8_hrpQXl0O8wpQSft0WFN2ZVcllYWxc8YvsRs4o7z25k8uAbghbU7cTGA5gd2rnQnKpwlWjrAgPCG5I-ojV7PctI9MhCr1uBQZuJt7j7kXgE5L6N8pkaLzJ8vwmhtgtUln"/>
<div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
<div className="absolute bottom-6 left-6">
<p className="font-label-caps text-white text-lg">Neon Underground</p>
<p className="text-xs text-pink-400 font-label-caps uppercase tracking-wider">800m away</p>
</div>
</div>
</div>
{/* Vibe Card 3 */}
<div className="flex-none w-80 group cursor-pointer">
<div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-6 border border-white/5">
<img alt="" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" data-alt="top down view of DJ decks and hands mixing music in a dark smoky room with purple light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1DoONiJJlS6UZvszmENlYfI2y0BpTgF-C9BBNRvl5dZRe2ZcCqY7ZgK_pKoHnX0XxPB4Ax7L9fEJ0DuxuWtF6AoCGKaWB9k00JbnKTdzyd1D8j1cMJBcG7ikiwqWiHpr7jq92qfz4KFh0HAgXb70QHKH5QWyEG8GInH14R8NdkwAuMn5ieQTG_-ts72TSPCxgE6LvXYgY_-oBLXZR4CsEygEGmu-fRhrHH1--CuubRxOR5sUtgYCNag-dmnrn50ayyHZW7ZA-SErs"/>
<div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
<div className="absolute bottom-6 left-6">
<p className="font-label-caps text-white text-lg">Lo-Fi Study Hall</p>
<p className="text-xs text-pink-400 font-label-caps uppercase tracking-wider">1.2km away</p>
</div>
</div>
</div>
{/* Vibe Card 4 */}
<div className="flex-none w-80 group cursor-pointer">
<div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-6 border border-white/5">
<img alt="" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" data-alt="studio microphone in a dimly lit room with soft blue background lighting and bokeh" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJmr6m5VVq74DlbO-v6dFkvUhGCqSbw04KDs_rUrsSLSGmRM4KrV6Tr_dsS2iQqITy9zrjhah6-EbRywB2uLWR6tuRQXFXus3uYBNCTq_Wea7a4NuVvBUxK0Z4ZWHV4-4kRJH3SQLo8DSr8fkyQigldZcfwB1DZPOROIDncnX4wVYmSsGXrkQT_MJODvmfq2l8FmOV9d-Hnx-vkINA6dVgHXdlcNcLBqdkYRa-jTXDxsA97uK4FoQ9seliOqd3CjJ8KnWFk1uckZAp"/>
<div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
<div className="absolute bottom-6 left-6">
<p className="font-label-caps text-white text-lg">The Open Mic</p>
<p className="text-xs text-pink-400 font-label-caps uppercase tracking-wider">1.5km away</p>
</div>
</div>
</div>
</div>
</section>
</main>
{/* FAB */}
<div className="fixed bottom-32 right-12 z-[90]">
<button className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,0,122,0.4)] hover:scale-110 active:scale-90 transition-all duration-300 group">
<span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-180" data-icon="add">add</span>
</button>
</div>
{/* BottomNavBar */}
<nav className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center pb-safe">
<div className="bg-zinc-900/60 backdrop-blur-3xl border border-white/20 rounded-full mb-8 mx-auto w-[90%] max-w-md h-20 flex items-center justify-around px-4 shadow-[0_0_40px_rgba(255,0,122,0.15)] shadow-2xl">
<div className="flex flex-col items-center justify-center bg-pink-500/10 text-pink-400 rounded-full px-6 py-2 shadow-[inset_0_0_12px_rgba(255,0,122,0.3)] scale-110 active:scale-90 transition-all duration-500 ease-out cursor-pointer">
<span className="material-symbols-outlined" data-icon="grain" style="font-variation-settings: 'FILL' 1;">grain</span>
<span className="font-serif text-[10px] uppercase tracking-[0.2em] font-medium">Discover</span>
</div>
<div className="flex flex-col items-center justify-center text-zinc-500 hover:text-pink-200 transition-colors cursor-pointer active:scale-90 duration-500">
<span className="material-symbols-outlined" data-icon="favorite">favorite</span>
<span className="font-serif text-[10px] uppercase tracking-[0.2em] font-medium">Match</span>
</div>
<div className="flex flex-col items-center justify-center text-zinc-500 hover:text-pink-200 transition-colors cursor-pointer active:scale-90 duration-500">
<span className="material-symbols-outlined" data-icon="bolt">bolt</span>
<span className="font-serif text-[10px] uppercase tracking-[0.2em] font-medium">Pulse</span>
</div>
<div className="flex flex-col items-center justify-center text-zinc-500 hover:text-pink-200 transition-colors cursor-pointer active:scale-90 duration-500">
<span className="material-symbols-outlined" data-icon="person_2">person_2</span>
<span className="font-serif text-[10px] uppercase tracking-[0.2em] font-medium">Profile</span>
</div>
</div>
</nav>
