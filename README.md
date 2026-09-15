# Dr. Zoya Aesthetic & Smile Studio — Official Web Platform & CMS

A luxury, production-ready aesthetic medicine and cosmetic dentistry clinic web application with an integrated **Live CMS (Content Management System)**, **Clinic CRM Leads Tracker**, **AI Smile & Skin Analyzer**, and **Multi-Language Selector**.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Create Production Build
```bash
npm run build
```

---

## 📁 Project Architecture & Components

```
DR. ZOYA PROJECT/
├── public/
│   └── images/
│       ├── dr_zoya_portrait.jpg        # Authentic doctor portrait
│       ├── clinic_interior.jpg         # Luxury clinic reception & lounge
│       ├── treatment_aesthetic.jpg     # Clinical HydraFacial & laser suite
│       └── dental_smile_makeover.jpg   # 3D digital smile design consultation
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                  # Sticky blur header with announcement strip
│   │   ├── Footer.jsx                  # Accreditation, legal/medical disclaimer, links
│   │   ├── FloatingWidgets.jsx         # 24/7 Smart WhatsApp Bot & Mobile Sticky Bar
│   │   ├── BookingModal.jsx            # Multi-step booking wizard with ₹500/₹1k fee
│   │   └── LanguageSelector.jsx        # Multi-language dropdown (Hindi, Arabic, etc.)
│   ├── context/
│   │   └── ClinicContext.jsx           # Global state manager for CMS & CRM data (localStorage sync)
│   ├── data/
│   │   └── defaultClinicData.js        # Baseline clinic profiles, treatments, seed leads
│   ├── pages/
│   │   ├── HomePage.jsx                # High-converting luxury landing page
│   │   ├── TreatmentsPage.jsx          # Filterable & searchable treatment directory
│   │   ├── SmileMakeoverPage.jsx       # 4-step Digital Smile Design & comparison
│   │   ├── AboutPage.jsx               # Doctor bio, credentials, ethics
│   │   ├── AIAnalyzerPage.jsx          # Web AR/AI face & smile scanning experience
│   │   ├── GalleryPage.jsx             # Categorized clinical before/after results
│   │   ├── BookPage.jsx                # Dedicated full-page booking portal
│   │   ├── ContactPage.jsx             # Clinic directions, hours & inquiry form
│   │   └── AdminCMSPage.jsx            # Live Content Management System & CRM
│   ├── App.jsx                         # Root application layout and page router
│   ├── main.jsx                        # React entry point
│   └── index.css                       # Luxury clinical custom design system
└── index.html                          # Google fonts, Tailwind config & translation engine
```

---

## 🛠️ Developer Handoff Notes (For Your Backend / Integration Team)

Here is where team members can wire up live third-party services:

### 1. Payment Gateway (Razorpay / Stripe)
- **Files**: 
  - `src/components/BookingModal.jsx` (Lines ~85–115: `handleSimulatePayment`)
  - `src/pages/BookPage.jsx` (Lines ~50–75: `handleConfirm`)
- **Hookup**: 
  Replace the `setTimeout` mock with your Razorpay checkout script:
  ```javascript
  const options = {
    key: "YOUR_RAZORPAY_KEY",
    amount: feeOption * 100,
    currency: "INR",
    name: "Dr. Zoya Clinic",
    handler: function (response) {
      // Call backend API /api/verify-payment with response.razorpay_payment_id
    }
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
  ```

### 2. Clinic CRM & Database Sync
- **File**: `src/context/ClinicContext.jsx`
- **Hookup**: 
  Currently, appointments and CMS changes synchronize to `localStorage`. To persist to MongoDB or PostgreSQL:
  - Replace `addAppointment` with `await fetch('/api/appointments', { method: 'POST', body: ... })`
  - Replace `updateAppointmentStatus` with `PATCH /api/appointments/:id`
  - Replace `updateProfile` and `updateTreatment` with corresponding CMS API calls.

### 3. WhatsApp Business API / Twilio
- **File**: `src/components/FloatingWidgets.jsx` (Lines ~90–120: `handleLeadSubmit`)
- **Hookup**: 
  Currently triggers `https://wa.me/{phone}?text={leadDetails}` directly on client-side. The backend team can connect official WhatsApp Cloud API webhooks here to trigger automated SMS/WhatsApp confirmations to both the doctor and patient.

### 4. AI Vision / Skin Analyzer
- **File**: `src/pages/AIAnalyzerPage.jsx` (Lines ~80–120: `runAIScan`)
- **Hookup**: 
  Currently simulates real-time facial landmark mapping. To connect to an LLM / Python vision API, send the base64 photo (`imagePreview`) to `/api/analyze-face` and populate the resulting score cards.

---

## 👑 Live CMS & Admin Features
- Accessible via the **"CMS & CRM"** button in the header or at `#/admin`.
- Changes saved in CMS immediately reflect across all live pages.
- Includes a one-click **"Reset Defaults"** button to restore clean initial clinic data at any time.
