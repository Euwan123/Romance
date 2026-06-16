# Journey Back to Your Heart ❤️

A premium, mobile-first romantic apology website built with Next.js 15, React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Cinematic hero intro with floating hearts and animated background
- Apology letter with line-by-line reveal from editable config
- Polaroid-style memory gallery with lightbox expansion
- Animated "Reasons I Love You" and "Promises" cards
- Scroll-reveal relationship timeline
- Final forgiveness interaction with confetti celebration
- Heart cursor trail, sparkles/particles, smooth gradients, glassmorphism
- Optional background music toggle
- SEO metadata and production-ready Next.js setup

## Project Structure

- `app` - Next.js app router pages and global styles
- `components` - Reusable UI and animated sections
- `data` - Easy-to-edit content (`apology`, `reasons`, `timeline`, `promises`)
- `lib` - Shared types and animation variants
- `public/memories` - Add your couple photos here (auto-detected)
- `public/memories/thumbs` - Optional thumbnails (used if present)
- `public/music` - Add optional `romantic.mp3` here

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Production

```bash
npm run lint
npm run build
npm run start
```

## Customize Content

1. Edit letter lines in `data/apology.ts`
2. Add photos in `public/memories` (webp/jpg/png supported). The gallery will auto-detect and render them as a masonry layout.
3. Update reasons/timeline/promises in their data files
4. Optional: add `public/memories/thumbs` for faster thumbnail loading
5. Optional: add `public/music/romantic.mp3` for background music

## Deploy to Vercel

1. Push this project to GitHub.
2. In Vercel, click **Add New Project** and import the repository.
3. Keep default build settings (framework auto-detected as Next.js).
4. Click **Deploy**.

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
vercel --prod
```

This app is fully compatible with Vercel deployment.
