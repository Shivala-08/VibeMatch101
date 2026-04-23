
{/* Top Navigation Bar (Shared Component Contextualized) */}
<header className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl flex justify-between items-center px-6 py-4 w-full shadow-[0_0_20px_rgba(233,30,140,0.1)]">
<div className="flex items-center gap-4">
<button className="hover:scale-105 transition-transform active:scale-95 duration-200 text-on-surface">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<div className="relative">
<img alt="User profile" className="w-10 h-10 rounded-full object-cover ghost-border" data-alt="Close up portrait of a young woman with a warm smile, natural lighting, high fashion photography style, soft bokeh background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU6zw-A280cQHBHlX4uQRt527f-mZAN06heoj6uzhYe44RvXQh5jPhN3pmQp0Hg_AK_jOSeXRr5NnkkUuEG8_QyFVeQcfW9RlwPAjJTiySUFWQwLT99s4eD_J611z03KSz9gyXbuBsA4Hl27xtHlL-NNN980l8o2qJV4xFM8jwc_u0a-wSSaH8TGOV8u-hhSSk6FSlLDlfFBSvK2DjoioaOQ-UnIRDzBRcfR_KsMWhtLR1hEKX4C9T5FzDX08R_QPb4hHn8_1jcBYl"/>
<div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary rounded-full border-2 border-surface-dim"></div>
</div>
<div>
<h1 className="font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-pink-600 text-xl tracking-tighter">Sienna Blake</h1>
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
<main className="flex-1 pt-24 pb-32 px-4 overflow-y-auto chat-scroll flex flex-col gap-6">
{/* Date Marker */}
<div className="flex justify-center">
<span className="text-outline text-[10px] font-bold uppercase tracking-[0.2em] bg-surface-container-high/40 px-3 py-1 rounded-full">Today</span>
</div>
{/* Received Message */}
<div className="flex flex-col items-start max-w-[85%] gap-2">
<div className="glass-panel ghost-border rounded-tr-xl rounded-bl-xl rounded-br-xl px-5 py-4 text-on-surface body-md">
                Hey! I saw your profile and loved your interest in experimental jazz. Have you checked out that new spot on 4th Street?
            </div>
<span className="text-[10px] text-outline ml-2 font-medium">9:41 AM</span>
</div>
{/* Sent Message */}
<div className="flex flex-col items-end max-w-[85%] self-end gap-2">
<div className="primary-gradient shadow-[0_0_20px_rgba(255,70,160,0.3)] rounded-tl-xl rounded-bl-xl rounded-br-xl px-5 py-4 text-on-primary-container font-medium body-md">
                Oh definitely! The acoustics there are incredible. I was actually there last Friday for the jam session.
            </div>
<span className="text-[10px] text-outline mr-2 font-medium">9:43 AM</span>
</div>
{/* Date Marker */}
<div className="flex justify-center my-2">
<span className="text-outline text-[10px] font-bold uppercase tracking-[0.2em]">New Messages</span>
</div>
{/* Received Message with Image */}
<div className="flex flex-col items-start max-w-[85%] gap-2">
<div className="glass-panel ghost-border rounded-tr-xl rounded-bl-xl rounded-br-xl overflow-hidden p-1">
<img alt="Jazz club" className="w-full h-48 object-cover rounded-lg mb-3" data-alt="Interior of a moody, dimly lit jazz club with neon pink accents, vintage instruments, and blurred people in the background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlbt6OvERAIkjXh_Cw6Fz-wtv3vtYuAguOddqr7UNCddH7lC4NzuzmWgccTXw9D2QpF3l674-wOiyt0RIODAW0jJw9hODu-svJ0tGNlORuxQ3-xtTOhgZNSmIZfxxzVd5dihP_y03mFmny8bwuq2gr8ChSYNYaqNzux7Zx757Esyia3cmCR9mH0Rg9Hc0L8bcuwXgfZBv6sQ38M43vSQ9efxQEF0DYx_B1Z8I8B0GQbOEvtYqspGFksiBxEDJao6NC4DU-er1cMujP"/>
<div className="px-4 pb-3 pt-1 text-on-surface body-md">
                    No way! I was there too! I took this right before the headliner started. Maybe we crossed paths?
                </div>
</div>
<span className="text-[10px] text-outline ml-2 font-medium">10:15 AM</span>
</div>
{/* Sent Message */}
<div className="flex flex-col items-end max-w-[85%] self-end gap-2">
<div className="primary-gradient shadow-[0_0_20px_rgba(255,70,160,0.3)] rounded-tl-xl rounded-bl-xl rounded-br-xl px-5 py-4 text-on-primary-container font-medium body-md">
                That's a great shot. We should definitely go together next time. They have a duo playing this Wednesday.
            </div>
<span className="text-[10px] text-outline mr-2 font-medium">10:17 AM</span>
</div>
{/* Typing Indicator */}
<div className="flex items-center gap-2 ml-2 opacity-60">
<div className="flex gap-1">
<span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
<span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-75"></span>
<span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse delay-150"></span>
</div>
<span className="text-[10px] font-bold uppercase tracking-widest text-outline">Sienna is typing</span>
</div>
</main>
{/* Bottom Input Bar */}
<footer className="fixed bottom-0 left-0 w-full z-50 bg-slate-950/60 backdrop-blur-2xl px-6 pb-8 pt-4 flex items-center gap-4 border-t border-white/5">
<button className="w-12 h-12 flex items-center justify-center rounded-full surface-container-highest hover:bg-surface-variant transition-colors text-on-surface-variant">
<span className="material-symbols-outlined">add</span>
</button>
<div className="flex-1 relative flex items-center">
<input className="w-full bg-surface-container-high/40 ghost-border rounded-full py-3.5 pl-5 pr-12 text-on-surface placeholder-outline focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all" placeholder="Type a message..." type="text"/>
<button className="absolute right-4 text-outline hover:text-primary transition-colors">
<span className="material-symbols-outlined">image</span>
</button>
</div>
<button className="w-12 h-12 flex items-center justify-center primary-gradient rounded-full text-on-primary-container shadow-[0_0_15px_rgba(233,30,140,0.3)] hover:scale-105 active:scale-95 transition-transform duration-200">
<span className="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">send</span>
</button>
</footer>
{/* Bottom Navigation Bar (SUPPRESSED for task-focused screen) */}
{/* The user is in a focused conversation; global nav is hidden per UX Goal in system instructions */}
