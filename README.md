# Portfolio - Nguyen Hoai Gia Bao

Premium portfolio with modern Apple-like design. Built with React + Framer Motion + Tailwind CSS.

## Tech Stack
- React 18 (Functional Components)
- Vite (Build tool)
- Tailwind CSS (Styling)
- Framer Motion (Animations)

## Design Features
- Glassmorphism cards with smooth blur effects
- Framer Motion scroll animations
- Staggered reveal animations
- Smooth hover micro-interactions
- Apple-like navigation with animated indicator
- Dark/Light mode toggle
- Bilingual support (VI/EN)

## Scripts
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Structure
```
src/
  components/      # React components with Framer Motion
    AuroraBackground.jsx
    Hero.jsx
    About.jsx
    Projects.jsx
    Methodology.jsx
    Skills.jsx
    Contact.jsx
    Navigation.jsx
  contexts/        # Language & Theme contexts
  data/            # Translations (VI/EN)
  hooks/           # Custom React hooks
    useScrollAnimation.js
  utils/           # Animation variants
    animations.js
  App.jsx
  main.jsx
  index.css        # Global styles + Tailwind
public/
  1bao2.jpg        # Profile image
```

## Animation Highlights
1. **Hero**: Staggered fade-in + typing effect + animated gradient orb
2. **Scroll**: Sections reveal with fade + upward motion
3. **Cards**: Hover scale (1.02) + shadow lift
4. **Navigation**: Animated active indicator (layoutId)
5. **Theme Toggle**: Icon rotation animation
6. **Skill Pills**: Staggered entrance + hover scale
