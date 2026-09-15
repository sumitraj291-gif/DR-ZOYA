# Dr. Zoya Clinic — Admin Panel Design System & Consistency Guide

> **Purpose**: Share this document with the developer building the Admin Panel. When passed into their Antigravity workspace or agent prompt, it guarantees that the Admin Panel looks and feels 100% consistent with the main website.

---

## 1. Core Brand Color Palette & Tokens

### Primary & Accent Colors
- **Champagne Gold (Brand Accent)**:
  - Base Gold: `#C5A059`
  - Light Gold: `#E8D39E`
  - Dark Gold: `#9A7736`
  - Subtle Gold Tint: `rgba(197, 160, 89, 0.12)` or `#FAF6EE`
  - Gold Gradient: `linear-gradient(135deg, #DFBE7B 0%, #C5A059 50%, #9F7B39 100%)`
- **Obsidian & Luxury Darks**:
  - Primary Dark / Header / Sidebars: `#090D14`
  - Charcoal Surface: `#121824`
  - Midnight Navy / Tables: `#0F172A`
  - Dark Borders: `rgba(197, 160, 89, 0.3)`
- **Warm Alabaster & Surfaces (Light Theme)**:
  - Page Background: `#FAF8F5` or `#F6F5F2`
  - Card Background: `#FFFFFF`
  - Border Subtles: `#E8E2D9` or `#EAE4DC`
  - Muted Surfaces: `#F1ECE5`
- **Semantic Status Colors**:
  - **Confirmed / Paid / Active**: Text `emerald-800`, Bg `emerald-50`, Border `emerald-300`
  - **New / In-Review**: Text `blue-800`, Bg `blue-50`, Border `blue-300`
  - **Contacted / Follow-up**: Text `amber-800`, Bg `amber-50`, Border `amber-300`
  - **Completed**: Text `purple-800`, Bg `purple-50`, Border `purple-300`
  - **Cancelled / Danger**: Text `rose-800`, Bg `rose-50`, Border `rose-300`

---

## 2. Typography Rules

Load these Google Fonts in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Font Usage Hierarchy
- **Editorial Headings, Page Titles & Big Metric Numbers**:
  - Font: `Cormorant Garamond`, `Playfair Display`, `Georgia`, serif
  - Class: `font-serif`
  - Weight: `font-bold` or `font-semibold`
  - Color: `#0F172A` or `#FFFFFF` (on dark)
- **UI Elements, Labels, Data Tables, Inputs & Navigation**:
  - Font: `Plus Jakarta Sans`, `Outfit`, sans-serif
  - Class: `font-sans`
  - Weight: `font-medium` (400) for body, `font-semibold` (600) / `font-bold` (700) for labels
  - Section Taglines: `text-[10px]` or `text-[11px]`, uppercase, tracking-wider, text `#C5A059`

---

## 3. UI Component Patterns

### A. Top Bar / Header Component
- Background: `#090D14` with subtle gold bottom border `border-b border-[#C5A059]/30`.
- Clinic Monogram: 
  - `w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#C5A059] flex items-center justify-center text-[#C5A059] font-serif text-2xl font-bold`
- Title: `DR. ZOYA CLINIC` in `font-serif tracking-wide text-white` + `Live Admin & CRM` gold pill.

### B. KPI Metric Summary Cards
```html
<div class="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-1">
  <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Bookings</span>
  <div class="font-serif text-3xl font-bold text-[#0F172A]">1,280</div>
  <div class="text-[10px] text-emerald-600 font-medium">↑ +14% vs last week</div>
</div>
```

### C. Data Tables (CRM & Records)
- Header: `bg-[#090D14] text-white uppercase text-[10px] tracking-wider py-3.5 px-4 font-semibold`
- Rows: `hover:bg-[#FAF8F5] transition-colors border-b border-gray-100 py-3.5 px-4 text-xs`
- Primary text: `font-bold text-gray-900`
- Secondary text: `text-[11px] text-gray-500`
- ID / Code: `font-mono text-[10px] text-gray-400`

### D. Status Badges & Pills
```html
<!-- Confirmed -->
<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
  Confirmed
</span>

<!-- Pending -->
<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
  Contacted
</span>
```

### E. Buttons
- **Primary Action (Gold Button)**:
  ```css
  .btn-gold {
    background: linear-gradient(135deg, #DFBE7B 0%, #C5A059 50%, #9F7B39 100%);
    color: #FFFFFF;
    font-weight: 700;
    border-radius: 0.75rem; /* rounded-xl */
    box-shadow: 0 4px 15px rgba(197, 160, 89, 0.3);
    transition: all 0.2s ease;
  }
  .btn-gold:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 25px rgba(197, 160, 89, 0.45);
  }
  ```
- **Secondary Action (Dark Obsidian)**:
  ```html
  <button class="bg-[#090D14] hover:bg-[#1E293B] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all border border-gray-700">
    Secondary Action
  </button>
  ```

### F. Form Inputs & Selects
- Inputs: `w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059] focus:outline-none`
- Labels: `block text-xs font-semibold text-gray-700 mb-1`
- Cards / Containers: `bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-sm`

---

## 4. Antigravity Prompt Snippet for the Developer

Copy and paste the prompt below into the other Antigravity chat:

```markdown
You are building the Admin Panel for the Dr. Zoya Aesthetic & Smile Studio project.
You MUST adhere strictly to the established design system for visual consistency:

1. Color Scheme:
   - Primary Accent: Champagne Gold (#C5A059, gradient: linear-gradient(135deg, #DFBE7B 0%, #C5A059 50%, #9F7B39 100%))
   - Darks: Obsidian #090D14 and Charcoal #121824
   - Background: Warm Alabaster #FAF8F5 / Cards: Clean White #FFFFFF with border #E8E2D9
   - Statuses: Emerald for Confirmed/Paid, Amber for Follow-up, Blue for New, Rose for Cancelled.
2. Typography:
   - Headings & Big Numbers: Cormorant Garamond / Serif font (font-serif)
   - UI, Navigation, Forms, and Data Tables: Plus Jakarta Sans / Sans-serif (font-sans)
3. UI Patterns:
   - Rounded corners: rounded-2xl or rounded-3xl for cards, rounded-xl for buttons/inputs.
   - Tables: Dark #090D14 header with uppercase 10px tracking, alternating row hovers.
   - Buttons: Gold gradient primary buttons (.btn-gold) and obsidian dark secondary buttons.
   - Use Lucide icons (lucide-react).
Ensure the layout feels luxury, clinical, and 100% handcrafted.
```
