# Luxury Clinical & High-Conversion Web Design System

> **Universal Frontend Design Blueprint**: This specification captures every design token, typography scale, spacing rule, color value, layout pattern, and interactive component used across the Dr. Zoya platform. It can be dropped directly into any web frontend (React, Next.js, Vue, Svelte, or Vanilla HTML/CSS) to reproduce the exact same bespoke, ultra-premium aesthetic.

---

## Table of Contents
1. [Brand Philosophy & Aesthetic Principles](#1-brand-philosophy--aesthetic-principles)
2. [Design Tokens & Color Palette](#2-design-tokens--color-palette)
3. [Typography Hierarchy & Scales](#3-typography-hierarchy--scales)
4. [Spacing, Grids & Container Metrics](#4-spacing-grids--container-metrics)
5. [Borders, Radii, Shadows & Elevations](#5-borders-radii-shadows--elevations)
6. [Motion, Keyframe Animations & Micro-Interactions](#6-motion-keyframes--micro-interactions)
7. [Page-by-Page Architectural Layout Patterns](#7-page-by-page-architectural-layout-patterns)
8. [Component Specifications & Code Blueprints](#8-component-specifications--code-blueprints)
9. [Copy-Paste Universal Setup Files (HTML / CSS / Tailwind)](#9-copy-paste-universal-setup-files)

---

## 1. Brand Philosophy & Aesthetic Principles

- **Bespoke Luxury Over Generic Templates**: Avoid loud neon colors, generic primary blues/reds, or cold sterile clinical looks. Instead, blend **deep obsidian night-tones** with **warm alabaster ivory**, illuminated by **champagne gold** highlights and **botanical emerald** accents.
- **Editorial Clinical Authority**: Use high-fashion serif typography for primary display headings and metric numbers, paired with razor-sharp geometric sans-serif for UI labels, pricing, tables, and inputs.
- **Micro-Hierarchy & Tactility**: Every card has a tactile 1px border (`#E8E2D9`), soft depth shadow, and micro-hover elevate transition (`translateY(-2px)`).
- **Zero Layout Shift Responsiveness**: Fixed fluid containers (`clinic-container`), mobile sticky conversion bars, and touch-optimized drawers.

---

## 2. Design Tokens & Color Palette

### A. Color Definitions

| Role | Color Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- | :--- |
| **Primary Accent** | Champagne Gold | `#C5A059` | Primary CTAs, active indicators, borders, star ratings, icons |
| **Gold Light** | Pale Champagne | `#E8D39E` | Gradient starts, hover glow rings, delicate highlights |
| **Gold Dark** | Antique Bronze | `#9A7736` | Gradient ends, border shadows on hover |
| **Gold Tint** | Warm Gold Wash | `rgba(197, 160, 89, 0.12)` or `#FAF6EE` | Badge backgrounds, selected card states, chip pills |
| **Primary Dark** | Obsidian Night | `#090D14` | Top announcement bar, footer, modal headers, table thead |
| **Secondary Dark**| Deep Charcoal | `#121824` | Secondary dark sections, dark modal card bodies |
| **Tertiary Dark** | Midnight Navy | `#0F172A` | Primary text headings, secondary buttons (`.btn-obsidian`) |
| **Light Canvas** | Warm Alabaster | `#FAF8F5` | Primary background across all pages |
| **Surface Card** | Pure White | `#FFFFFF` | Interactive cards, form containers, dropdown menus |
| **Surface Muted** | Warm Sand | `#F1ECE5` | Card footers, scrollbar track, subtle dividers |
| **Border Subtle** | Ivory Gray | `#E8E2D9` | Universal 1px card and section borders |
| **Border Dark** | Gold Border Tint | `rgba(197, 160, 89, 0.25)` | Borders over dark obsidian panels |

### B. Functional & Semantic Status Colors

| State | Background | Text Color | Border Color | Example Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Confirmed / Verified** | `bg-emerald-50` (`#ECFDF5`) | `text-emerald-800` (`#065F46`) | `border-emerald-300` | Paid booking pill, verified case badge |
| **New Lead / Review** | `bg-blue-50` (`#EFF6FF`) | `text-blue-800` (`#1E40AF`) | `border-blue-300` | Incoming website inquiries in CRM |
| **Contacted / Pending**| `bg-amber-50` (`#FFFBEB`) | `text-amber-800` (`#92400E`) | `border-amber-300` | Follow-up status, medical notice boxes |
| **Completed Slot** | `bg-purple-50` (`#FAF5FF`) | `text-purple-800` (`#6B21A8`) | `border-purple-300` | Patient treatment finished |
| **Danger / Cancelled** | `bg-rose-50` (`#FFF1F2`) | `text-rose-800` (`#9F1239`) | `border-rose-300` | Cancelled appointment, delete triggers |

### C. Signature Gradients

```css
/* Primary Luxury Gold Gradient (Used for buttons, text clips, active states) */
--gold-gradient: linear-gradient(135deg, #DFBE7B 0%, #C5A059 50%, #9F7B39 100%);

/* Dark Hero Backdrop */
--dark-hero-gradient: linear-gradient(180deg, #090D14 0%, #0F172A 100%);

/* Light Section Subtlety */
--light-section-gradient: linear-gradient(180deg, #FAF8F5 0%, #F5EFE6 60%, #FAF8F5 100%);

/* Floating Ambient Glow (under doctor photo or main cards) */
--gold-ambient-glow: radial-gradient(circle, rgba(197, 160, 89, 0.22) 0%, rgba(223, 190, 123, 0.08) 50%, transparent 70%);
```

---

## 3. Typography Hierarchy & Scales

### A. Font Families
1. **Display & Editorial Serif**:
   - `Cormorant Garamond`, `Playfair Display`, `Georgia`, `serif`
   - *Utility Class*: `font-serif`
   - *Atmosphere*: European high-end atelier, surgical precision, bespoke heritage.
2. **Clinical UI Sans-Serif**:
   - `Plus Jakarta Sans`, `Outfit`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
   - *Utility Class*: `font-sans`
   - *Atmosphere*: Contemporary, ultra-legible, geometric precision.

### B. Type Scale & Styling Matrix

| Level | Size (Mobile) | Size (Desktop) | Weight | Tracking (Letter Spacing) | Line Height | Target Elements |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `2.25rem` (36px) | `3.75rem` - `4rem` (60-64px) | SemiBold (600) | `-0.025em` (`tracking-tight`) | `1.12` | Hero headline primary |
| **Section H2** | `1.875rem` (30px)| `2.5rem` - `3rem` (40-48px) | SemiBold (600) | Normal | `1.2` | Major section titles |
| **Card H3** | `1.25rem` (20px) | `1.5rem` (24px) | Bold (700) | Normal | `1.3` | Treatment titles, doctor bio heading |
| **Sub-Header H4**| `1rem` (16px) | `1.125rem` (18px) | SemiBold (600) | Normal | `1.4` | Modal headers, feature names |
| **Category Pill**| `0.625rem` (10px)| `0.6875rem` (11px) | Bold (700) | `0.15em` (`uppercase tracking-wider`) | `1` | Section kicker tags, service category |
| **Body Primary** | `0.8125rem` (13px)| `0.875rem` (14px) | Regular / Medium (400/500) | Normal | `1.65` | Main paragraphs, descriptions |
| **Meta / Small** | `0.6875rem` (11px)| `0.75rem` (12px) | Medium (500) | Normal | `1.5` | Timestamps, durations, helper text |
| **Micro / Note** | `0.5625rem` (9px) | `0.625rem` (10px) | SemiBold (600) | `0.05em` | `1.4` | Booking IDs, disclaimer notes |
| **Big Numbers** | `1.75rem` (28px) | `2.25rem` (36px) | Bold (700) | Normal | `1` | Stat counters (15,000+), prices |

---

## 4. Spacing, Grids & Container Metrics

### A. Responsive Container (`.clinic-container`)
```css
.clinic-container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.25rem;  /* 20px on Mobile */
  padding-right: 1.25rem;
}

@media (min-width: 768px) {
  .clinic-container {
    padding-left: 2rem;    /* 32px on Tablet */
    padding-right: 2rem;
  }
}

@media (min-width: 1280px) {
  .clinic-container {
    padding-left: 2.5rem;  /* 40px on Desktop */
    padding-right: 2.5rem;
  }
}
```

### B. Section Spacing Cadence
- **Vertical Spacing between Major Sections**:
  - Mobile: `space-y-16` (64px)
  - Desktop: `space-y-24` (96px)
- **Section Inner Padding**:
  - Hero: `pt-6 sm:pt-12 pb-12 sm:pb-20`
  - Dark Contrast Sections: `py-16 sm:py-20`
  - Compact Cards / Grids: `py-10 sm:py-14`

### C. Standard Grid Archetypes
- **Hero Grid**: `grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center` (Left 7 cols, Right 5 cols).
- **3-Pillar Specialty / Services**: `grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8`.
- **2-Column Comparative / Transformations**: `grid-cols-1 md:grid-cols-2 gap-8`.
- **4-Column KPI Stats / Reviews**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6`.
- **Form Columns**: `grid-cols-1 sm:grid-cols-2 gap-4`.

---

## 5. Borders, Radii, Shadows & Elevations

### A. Border Radius Matrix
- **Pill / Badges / Buttons**: `rounded-full` (9999px)
- **Large Sections / Hero Banners**: `rounded-3xl` (24px)
- **Main Cards / Review Containers**: `rounded-2xl` (16px)
- **Inputs / Dropdowns / Slot Buttons**: `rounded-xl` (12px)
- **Small Tags / Badges**: `rounded-lg` (8px)

### B. Elevation & Shadow Token Stack
```css
/* Subtle Ambient Card Elevation */
--shadow-subtle: 0 4px 20px -2px rgba(15, 23, 42, 0.05);

/* Hover Depth Card Elevation */
--shadow-card: 0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 0 1px rgba(15, 23, 42, 0.1);

/* Gold Hover Glow on Buttons & Modals */
--shadow-elevated: 0 20px 40px -10px rgba(197, 160, 89, 0.15), 0 10px 25px -5px rgba(15, 23, 42, 0.1);

/* Ambient Floating Glow behind Images */
--shadow-gold-glow: 0 0 40px rgba(197, 160, 89, 0.25);
```

### C. Frosted Glassmorphism Tokens
```css
/* White Frosted Glass Panel */
.glass-panel {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

/* Dark Obsidian Frosted Glass */
.glass-dark {
  background: rgba(14, 21, 32, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(197, 160, 89, 0.2);
}
```

---

## 6. Motion, Keyframes & Micro-Interactions

### A. Keyframes

```css
/* 1. Gold Ambient Radar Pulse (Floating Bot / Accents) */
@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(197, 160, 89, 0.4);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(197, 160, 89, 0);
  }
}
.pulse-gold {
  animation: pulseGlow 2.5s infinite;
}

/* 2. Web AR / AI Scanner Laser Beam */
@keyframes scanLine {
  0% {
    top: 5%;
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 92%;
    opacity: 0.8;
  }
}
.animate-scan {
  animation: scanLine 2.2s ease-in-out infinite alternate;
}

/* 3. Modal Smooth Entrance */
@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.modal-enter {
  animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 4. Gentle Element Float */
@keyframes floatGentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
.animate-float {
  animation: floatGentle 4s ease-in-out infinite;
}
```

---

## 7. Page-by-Page Architectural Layout Patterns

### A. The Announcement Strip (Sub-Header)
- **Background**: `#090D14` with a 1px border `border-b border-[#C5A059]/20`.
- **Height**: 36px (`py-2`).
- **Contents**:
  - Left: Operating Hours with Clock Icon + Clinic Location with MapPin Icon.
  - Right: Global Language Dropdown + Reception Phone (`tel:`) + CMS/Admin Portal Link.

### B. Sticky Luxury Navbar
- **Height**: `py-4` (when un-scrolled), shrinks to `py-3` with `bg-white/95 backdrop-blur-md shadow-md` on scroll.
- **Logo**: 44px circular crest monogram (Obsidian dark background, 1px gold border, serif `Z` in `#C5A059`) + two-line brand typography ("DR. ZOYA" + "AESTHETICS & SMILE STUDIO").
- **Nav Pills**: `rounded-full px-3 py-2 text-sm`. Active state receives background `#EFE9DF` with gold accent underline dot.
- **Action**: Gold `.btn-gold` "Book Consultation" with calendar icon.
- **Mobile Drawer**: Slide-in panel from the right with backdrop blur `bg-black/50` and quick call/WhatsApp buttons.

### C. Hero Banner Architecture
- **Left Column (7 cols)**:
  1. Luxury pill badge: `bg-white/90 border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full`.
  2. Display Headline with dual-color treatment: Neutral Dark (`#0F172A`) for primary phrase, Italic Serif Gold (`#C5A059`) for the highlight.
  3. Elegant subtitle max-width 540px (`text-[#475569] leading-relaxed`).
  4. Dual CTAs: Primary gold button (`Book Consultation (₹500 / ₹1,000)`) + Secondary bordered pill (`Try AI Scan`).
  5. 4-column trust metrics row divided by a top border `#E8E2D9`.
- **Right Column (5 cols)**:
  1. Radial gold glow in background (`-inset-4 blur-2xl`).
  2. High-definition portrait with 4px pure white border and `rounded-2xl`.
  3. Floating credential card overlapping bottom of photo (`bg-white/95 backdrop-blur-md shadow-lg border border-[#C5A059]/30`).
  4. Floating trust pill tag at top-left corner (`#090D14 text-white border border-[#C5A059]/40`).

### D. Treatment & Service Card Blueprint
- **Card Container**: `bg-white rounded-2xl border border-[#E8E2D9] shadow-subtle hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col justify-between`.
- **Image Header (optional)**: Height 192px (`h-48`) with bottom gradient overlay `from-black/60 to-transparent`.
- **Category Badge**: `text-[10px] font-bold tracking-wider uppercase text-[#C5A059] bg-[#FAF6EE] px-2.5 py-1 rounded-full border border-[#C5A059]/30`.
- **Duration Badge**: Right-aligned clock icon with text `text-xs text-gray-500`.
- **Pricing**: `text-xs font-semibold text-emerald-700` (e.g. "₹6,500" or "From ₹95,000").
- **Benefits Checklist**: Micro checkmarks `text-[#C5A059]` with single-line clinical advantages.
- **Footer Bar**: `bg-[#FAF8F5] border-t border-[#EAE4DC] p-4 flex items-center justify-between`.

### E. Before/After Transformation Case Study Cards
- **Card**: 2-column grid, `p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] bg-white`.
- **Top Row**: Category Tag + Turnaround time (e.g., "8 Weeks", "6 Months").
- **Patient Identifier**: Anonymized label (e.g., "Patient A.M. (Age 29)").
- **Concern Headline**: Serif bold (e.g., "Persistent Melasma & Sun Damage").
- **Dual Protocol Box**: Background `#FAF8F5` with `Protocol Used` and `Observed Clinical Outcome`.
- **Verification Seal**: Green shield icon + "Verified Clinical Case".

### F. Phase 2 Web AR / AI Scanner Experience
- **Interactive Container**: 2-column split card (Upload/Camera frame on Left, Real-Time Diagnostic HUD on Right).
- **Scanner Viewport**: Aspect ratio `3/4`, max height 420px, dark background with simulated face mesh guidelines.
- **Animated Scan Line**: Horizontal gold laser with box shadow `0 0 15px #C5A059` moving vertically via `@keyframes scanLine`.
- **Score Cards**: Dual numerical gauges (`Skin Health Index 84/100` and `Smile Harmony Index 78/100`).
- **Observations List**: Severity tags (Mild, Moderate, Cosmetic).
- **Mandatory Medical Disclaimer**: Prominent alert box with `bg-amber-50 border-amber-200 text-amber-900`.

### G. Phase 2 Pre-Paid Booking Wizard (Modal & Page)
- **Step 1: Treatment Picker**: Grid of selectable procedure cards with active gold ring.
- **Step 2: Slot Picker**: Date input with min=tomorrow + grid of morning/afternoon/evening time slots.
- **Step 3: Patient Form**: Full Name, Phone (WhatsApp), Email, Notes.
- **Step 4: Advance Consultation Fee Tier Selector**:
  - Standard Assessment: **₹500** (45-min clinical exam).
  - Priority VIP & 3D Scan: **₹1,000** (Digital iTero scan + senior physician guarantee).
  - 100% Fee Adjustment Policy notice box.
- **Step 5: Confirmation Receipt**:
  - Green checkmark bubble + Canvas Confetti trigger.
  - Receipt card with unique Booking Reference ID (`APT-2026-XXX`).
  - 1-click "Send Confirmation to Clinic WhatsApp" button.

### H. 24/7 Smart WhatsApp Assistant (Floating Widget)
- **Floating Button**: Bottom right (64px x 64px on desktop, 52px on mobile) with glowing WhatsApp green gradient, online green status dot, and notification ping badge.
- **Chat Window**: Width 384px (`w-96`), max height 540px, rounded-2xl, shadow-2xl.
- **Header**: `#0A111C` with doctor avatar, name, and green pulsing status.
- **Interactive FAQ Chips**: Quick pills ("💳 Consultation Fees", "✨ Treatments & Pricing", "📍 Clinic Location", "📅 Book Appointment").
- **Lead Capture Form**: Embedded inputs for Name, Phone, and Concern that automatically logs to the CRM and opens official WhatsApp with pre-composed text.

### I. Data Table & CRM Management (Admin CMS)
- **Header Row**: `#090D14` obsidian background, white text, 10px uppercase tracking-wider.
- **Alternate Rows**: White background, `#FAF8F5` hover effect, 1px border divider.
- **Status Dropdown**: Color-coded select element (Confirmed: green, New: blue, Contacted: amber).
- **Actions Column**: Icon buttons for direct call (`tel:`), direct WhatsApp (`wa.me`), and delete.
- **Export Action**: One-click CSV export button.

### J. Mobile Sticky Action Bar
- **Fixed Position**: `fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] px-4 py-2`.
- **Actions**:
  1. Call Clinic (icon + label)
  2. WhatsApp (icon + label)
  3. Book ₹500/₹1k (`btn-gold` pill button)

---

## 8. Component Specifications & Code Blueprints

### A. Primary Luxury Button (`.btn-gold`)
```html
<button class="btn-gold px-6 py-3 rounded-full text-xs font-bold flex items-center space-x-2 shadow-lg">
  <svg class="w-4 h-4" ...></svg>
  <span>Book Consultation</span>
</button>
```
```css
.btn-gold {
  background: linear-gradient(135deg, #DFBE7B 0%, #C5A059 50%, #9F7B39 100%);
  color: #FFFFFF;
  font-weight: 600;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(197, 160, 89, 0.3);
}

.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(197, 160, 89, 0.45);
}
```

### B. Secondary Obsidian Button (`.btn-obsidian`)
```html
<button class="btn-obsidian px-5 py-2.5 rounded-full text-xs font-semibold flex items-center space-x-2">
  <span>View All Procedures</span>
</button>
```
```css
.btn-obsidian {
  background: #090D14;
  color: #FAF8F5;
  border: 1px solid rgba(197, 160, 89, 0.2);
  transition: all 0.25s ease;
}

.btn-obsidian:hover {
  background: #1E293B;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.2);
}
```

### C. Luxury Section Header Blueprint
```html
<div class="text-center max-w-2xl mx-auto mb-12 space-y-3">
  <!-- Kicker Pill -->
  <span class="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
    Centres of Clinical Excellence
  </span>

  <!-- Serif H2 Title -->
  <h2 class="font-serif text-3xl sm:text-4xl font-semibold text-[#0F172A]">
    Precision Aesthetics Crafted For You
  </h2>

  <!-- Subtitle -->
  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
    We harmonize medical dermatology, facial artistry, and cosmetic dentistry under one bespoke sanctuary.
  </p>
</div>
```

### D. Form Input Blueprint
```html
<div>
  <label class="block text-xs font-semibold text-gray-700 mb-1">
    Phone / WhatsApp Number *
  </label>
  <div class="relative">
    <input
      type="tel"
      required
      placeholder="+91 98765 43210"
      class="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all"
    />
  </div>
</div>
```

---

## 9. Copy-Paste Universal Setup Files

To implement this exact design system in any project, use the following files:

### File 1: `index.html` (Font & Meta Template)
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Brand Name | Luxury Aesthetic & Wellness Studio</title>

    <!-- Google Fonts: Cormorant Garamond & Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Tailwind CSS (CDN or Build) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              gold: {
                DEFAULT: '#C5A059',
                light: '#E8D39E',
                dark: '#9A7736',
                subtle: 'rgba(197, 160, 89, 0.12)'
              },
              obsidian: '#090D14',
              charcoal: '#121824',
              sand: {
                DEFAULT: '#FAF8F5',
                card: '#FFFFFF',
                muted: '#F1ECE5'
              }
            },
            fontFamily: {
              serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
              sans: ['Plus Jakarta Sans', 'Outfit', 'system-ui', 'sans-serif']
            }
          }
        }
      }
    </script>
  </head>
  <body class="bg-[#FAF8F5] text-[#1E293B] antialiased selection:bg-[#C5A059] selection:text-white">
    <div id="root"></div>
  </body>
</html>
```

### File 2: `index.css` (Complete Design System Stylesheet)
```css
/* Luxury Aesthetic Design Tokens */
:root {
  --font-serif: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  --font-sans: 'Plus Jakarta Sans', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  
  --gold-primary: #C5A059;
  --gold-light: #E8D39E;
  --gold-dark: #9A7736;
  --gold-subtle: rgba(197, 160, 89, 0.12);
  --gold-gradient: linear-gradient(135deg, #DFBE7B 0%, #C5A059 50%, #9F7B39 100%);
  
  --obsidian: #090D14;
  --charcoal: #121824;
  --sand: #FAF8F5;
  --sand-card: #FFFFFF;
  --sand-muted: #F1ECE5;
  --border-subtle: #E8E2D9;
  
  --text-main: #1C2430;
  --text-muted: #576579;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-family: var(--font-sans);
  color: var(--text-main);
  background-color: var(--sand);
}

body {
  margin: 0;
  padding: 0;
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* Typography Helpers */
.font-serif { font-family: var(--font-serif); }
.font-sans { font-family: var(--font-sans); }

.gold-gradient-text {
  background: var(--gold-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Buttons */
.btn-gold {
  background: var(--gold-gradient);
  color: #FFFFFF;
  font-weight: 600;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(197, 160, 89, 0.3);
}
.btn-gold:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(197, 160, 89, 0.45);
}

.btn-obsidian {
  background: var(--obsidian);
  color: #FAF8F5;
  transition: all 0.25s ease;
}
.btn-obsidian:hover {
  background: #1E293B;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.2);
}

/* Containers */
.clinic-container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
@media (min-width: 768px) {
  .clinic-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
@media (min-width: 1280px) {
  .clinic-container {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: #F1ECE5; }
::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #9A7736; }

/* Keyframe Animations */
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(197, 160, 89, 0.4); }
  50% { box-shadow: 0 0 0 12px rgba(197, 160, 89, 0); }
}
.pulse-gold { animation: pulseGlow 2.5s infinite; }

@keyframes scanLine {
  0% { top: 5%; opacity: 0.8; }
  50% { opacity: 1; }
  100% { top: 92%; opacity: 0.8; }
}
.animate-scan { animation: scanLine 2.2s ease-in-out infinite alternate; }

@keyframes modalPop {
  from { opacity: 0; transform: scale(0.96) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.modal-enter { animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
```

---

## 10. Summary Checklist for Any New Frontend Project

When applying this design system to another website or admin portal:
1. **Include Fonts**: Load `Cormorant Garamond` and `Plus Jakarta Sans` from Google Fonts.
2. **Set Body Background**: Set page background to Warm Alabaster (`#FAF8F5`) and cards to Pure White (`#FFFFFF`).
3. **Use the Gold Accent**: Reserve Champagne Gold (`#C5A059` and gradient) strictly for high-value actions, active states, ratings, and key badges.
4. **Use Obsidian for Contrast**: Apply `#090D14` to top bars, footers, dark feature panels, and table headers.
5. **Apply 1px Borders**: Frame cards and inputs with a subtle 1px border (`#E8E2D9`).
6. **Round Cards Generously**: Apply `rounded-2xl` or `rounded-3xl` for modern luxury feel.
7. **Maintain Spacing Cadence**: Use `space-y-16` / `space-y-24` between major page sections and `clinic-container` for max-width constraints.
