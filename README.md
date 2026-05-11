<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Carl Dictaan Portfolio

A modern, interactive portfolio website showcasing my work as a Front-End Developer, UI/UX Designer, and Robotics Enthusiast.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **GSAP** - Scroll animations
- **Lenis** - Smooth scrolling
- **Lucide React** - Icons

## Local Development

**Prerequisites:** Node.js

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

### Cloudflare Pages (Recommended)

1. Push code to GitHub
2. Connect repository to [Cloudflare Pages](https://pages.cloudflare.com)
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Build directory:** `dist`
4. Add environment variable:
   - `VITE_WEB3FORMS_ACCESS_KEY` = `b5373b8b-b22b-4253-aa93-35b037769c70`
5. Deploy!

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

## Features

- Responsive design (mobile, tablet, desktop)
- Interactive robotic core animation
- Smooth scroll effects
- Contact form with Web3Forms
- Modern cyber/tech aesthetic

## Project Structure

```
src/
  App.tsx        # Main application
  main.tsx       # Entry point
  index.css      # Global styles
public/
  images/        # Project images
  videos/       # Demo videos
  _headers      # Cloudflare security headers
  _redirects     # Cloudflare routing
```

## Security

- Security headers configured (CSP, X-Frame-Options, etc.)
- No API keys exposed in client code
- Honeypot anti-bot protection on contact form
- Rate limiting on server endpoints (local dev only)