# Lóvi - Mobile-First Skincare PWA

A beautiful, mobile-first Progressive Web App for personalized skincare recommendations built with React, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎨 Features

- **Mobile-first design** with bottom tab navigation
- **Beautiful purple gradient theme** matching the splash screen
- **Smart product recommendations** with fit percentages
- **Daily routine tracking** with persistent state
- **Skin diary** with mood tracking
- **Daily affirmations** for wellness
- **AI cosmetologist suggestions** (coming soon)

## 📱 Pages

- **/splash** - Beautiful gradient splash screen with Lóvi branding
- **/today** - Main dashboard with greeting, day pills, routine, and diary
- **/products** - Product catalog with collections and search
- **/new-scan** - Product scanning interface (camera/upload)
- **/insights** - Analytics and progress tracking
- **/me** - User profile and settings

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** with custom design system
- **Zustand** for state management with persistence
- **SWR** for data fetching
- **Framer Motion** for animations
- **Radix UI** components via shadcn/ui

## 🎯 Design System

The app uses a comprehensive design system with:
- **Purple primary color** (HSL 264, 83%, 70%)
- **Fit pill colors**: Violet (90%+), Emerald (75-89%), Gray (<75%)
- **Yellow price pills** with retailer icons
- **Rounded cards** with soft shadows
- **Consistent spacing** and typography

## 📦 Seed Data

Product data is located in `src/lib/seed.ts` with collections:
- Acne-Safe Ceramides for Fall
- Acne-Safe Rosehip Oil Blends  
- Acne-Safe Squalane Cleansers
- Acne-Safe PHA Serums

## 🖼 Images

Product images are generated and stored in `public/images/products/`. The splash screen uses the provided gradient background at `public/images/splash-iphone.png`.

Built with ❤️ for beautiful, accessible skincare experiences.