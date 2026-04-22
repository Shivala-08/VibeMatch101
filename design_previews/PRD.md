CAMPUSMATCH — FULL WEBSITE BUILD PROMPT
Build a complete, production-ready college social & dating web app called CampusMatch using React 18 + Vite + Tailwind CSS + Supabase. The design must be mesmerizing — think glassmorphism cards, fluid pink-to-purple gradients, soft glows, micro-animations on every interaction, and a dark-mode-first aesthetic that feels like a premium consumer app, not a college project.

DESIGN SYSTEM
Color palette:
Primary: #E91E8C (hot pink)
Primary dark: #C2185B
Secondary: #7B1FA2 (deep purple)
Background: #0D0D1A (near-black)
Surface: rgba(255,255,255,0.06) (glass cards)
Text primary: #F5F5F5
Text muted: #9E9E9E
Accent glow: rgba(233,30,140,0.25)

Typography: Use DM Sans for body, DM Serif Display for display headings. Import from Google Fonts.

Visual style:
Glassmorphism cards: backdrop-filter: blur(20px), background: rgba(255,255,255,0.06), border: 1px solid rgba(255,255,255,0.1)
Gradient backgrounds: linear-gradient(135deg, #0D0D1A 0%, #1a0530 50%, #0D0D1A 100%)
Pink glow on interactive elements: box-shadow: 0 0 24px rgba(233,30,140,0.3)
All buttons have hover glow + scale transform: hover:scale-105 transition-all duration-200
Animated gradient blobs in background (CSS keyframe @keyframes blob-drift)
Bottom nav has frosted glass effect
Smooth page transitions with opacity + translateY fade-in on mount

SCREENS TO BUILD (13 total)
Screen 1 — Landing / Login (/login)
Screen 2 — Email Verification (/verify-email)
Screen 3 — Profile Setup (/setup-profile)
Screen 4 — Home Feed (/)
Screen 5 — Create Post (Bottom Sheet Modal)
Screen 6 — Discover (/discover)
Screen 7 — User Profile (/profile/:userId)
Screen 8 — Messages List (/messages)
Screen 9 — Chat (/messages/:userId)
Screen 10 — My Profile (/profile/me)
Screen 11 — Edit Profile (/edit-profile)
Screen 12 — Report Modal
Screen 13 — Admin Dashboard (/admin)