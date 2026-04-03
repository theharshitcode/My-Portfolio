# 🚀 Dev Portfolio — Next.js

A production-grade, animated portfolio for Backend Developers built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

| Feature | Details |
|---|---|
| 🖥️ **Hero Section** | Matrix rain, animated terminal, typewriter effect, glitch name |
| 👤 **About Section** | Syntax-highlighted code window, achievement cards |
| 🧠 **Skills Section** | 5 categories, animated progress bars, tab-based mobile |
| 📂 **Projects Section** | 6 projects, category filter, GitHub stats, featured badges |
| 💼 **Experience Section** | Color-coded vertical timeline |
| 📬 **Contact Section** | Working form, social links, availability badge |
| 🌟 **Extras** | Loading screen, custom cursor, scroll-to-top, smooth scroll |
| 📱 **Responsive** | Mobile, tablet, desktop — fully tested |
| ⚡ **Performance** | Next.js 14, dynamic imports, optimized animations |

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (custom CS dark theme)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Orbitron (display) + JetBrains Mono + IBM Plex Sans

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Customize your info

Edit **one file** to update all your info:

```
src/lib/data.ts
```

Change your:
- Name, bio, location, email, phone
- GitHub, LinkedIn, Twitter links
- Skills and proficiency levels
- Projects (title, description, tech, links)
- Experience / timeline entries
- Achievements

### 4. Add your resume

Place your resume PDF at:
```
public/resume.pdf
```

### 5. Add project images (optional)

Place images at:
```
public/projects/project-name.png
```

---

## 🌐 Deploy to Vercel (Free — Recommended)

```bash
# Step 1: Push to GitHub
git init
git add .
git commit -m "feat: initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main

# Step 2: Deploy
# Go to vercel.com → Import Project → Select your repo → Deploy
# Your site will be live at: YOUR_USERNAME.vercel.app
```

## 🌐 Deploy to Netlify (Alternative Free)

```bash
npm run build
# Drag & drop the .next folder to netlify.com/drop
```

## 🌐 Deploy to GitHub Pages

```bash
# Add this to next.config.js:
# output: 'export'

npm run build
# Push the 'out' folder to gh-pages branch
```

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout + metadata
│   │   └── page.tsx            ← Main page (assembles all sections)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      ← Sticky nav with mobile menu
│   │   │   └── Footer.tsx      ← Footer with links
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      ← Hero with terminal
│   │   │   ├── AboutSection.tsx     ← About with code window
│   │   │   ├── SkillsSection.tsx    ← Skills with progress bars
│   │   │   ├── ProjectsSection.tsx  ← Projects with filter
│   │   │   ├── ExperienceSection.tsx ← Timeline
│   │   │   └── ContactSection.tsx   ← Contact form
│   │   └── ui/
│   │       ├── CustomCursor.tsx     ← Glowing cursor
│   │       ├── MatrixRain.tsx       ← Canvas matrix bg
│   │       ├── LoadingScreen.tsx    ← Startup loader
│   │       └── ScrollToTop.tsx      ← Floating back-to-top
│   ├── lib/
│   │   └── data.ts             ← ⭐ ALL YOUR CONTENT HERE
│   └── styles/
│       └── globals.css         ← Global styles + animations
├── public/
│   ├── resume.pdf              ← Your resume (add this!)
│   └── projects/               ← Project screenshots (optional)
├── tailwind.config.js
├── next.config.js
└── package.json
```

---

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:
```js
colors: {
  accent: {
    green: '#00ff88',   // Main accent — change this
    cyan:  '#00d4ff',   // Secondary accent
    purple: '#8b5cf6',  // Tertiary accent
  }
}
```

### Add a New Section

1. Create `src/components/sections/NewSection.tsx`
2. Import it in `src/app/page.tsx`
3. Add nav link in `src/components/layout/Navbar.tsx`

### Add Contact Form Backend

Replace the `handleSubmit` function in `ContactSection.tsx` with:

**Option A — Formspree (free):**
```ts
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
```

**Option B — EmailJS (free):**
```ts
import emailjs from '@emailjs/browser'
await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
```

---

## 🤝 Connect

If you use this portfolio, give a ⭐ on GitHub!

Built with ❤️ for Indian developers looking to land their dream job.
