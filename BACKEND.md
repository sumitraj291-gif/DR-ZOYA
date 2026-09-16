# Dr. Zoya Aesthetic & Smile Studio — Complete Backend Architecture & API Specification

> **For Backend Engineering Team**: This specification defines the complete backend requirements, database schemas, RESTful APIs, third-party payment/WhatsApp integrations, and security rules needed to power both the **Dr. Zoya Client Website** and the **Clinic Admin Panel & CRM**.

---

## Table of Contents
1. [System Architecture & Recommended Stack](#1-system-architecture--recommended-stack)
2. [Database Schemas & Data Models](#2-database-schemas--data-models)
3. [Complete REST API Specification](#3-complete-rest-api-specification)
   - [A. Authentication & Staff Management](#a-authentication--staff-management)
   - [B. Public Website & Patient APIs](#b-public-website--patient-apis)
   - [C. Pre-Paid Booking & Payment Gateway (Phase 2B)](#c-pre-paid-booking--payment-gateway-phase-2b)
   - [D. WhatsApp Bot & Lead Automation (Phase 2A)](#d-whatsapp-bot--lead-automation-phase-2a)
   - [E. Clinic CRM & Admin Dashboard (Phase 2C)](#e-clinic-crm--admin-dashboard-phase-2c)
   - [F. Web AR / AI Smile & Skin Analyzer (Phase 2D)](#f-web-ar--ai-smile--skin-analyzer-phase-2d)
   - [G. Dynamic Content Management (CMS)](#g-dynamic-content-management-cms)
4. [Third-Party Integration Guides & Code Snippets](#4-third-party-integration-guides--code-snippets)
   - [Razorpay / Stripe Payment Verification](#razorpay--stripe-payment-verification)
   - [WhatsApp Business Cloud API Webhooks](#whatsapp-business-cloud-api-webhooks)
   - [AI Image Analysis Engine](#ai-image-analysis-engine)
5. [Security, Compliance & Validation](#5-security-compliance--validation)
6. [Environment Variables Reference (`.env.example`)](#6-environment-variables-reference-envexample)
7. [Developer Implementation Checklist](#7-developer-implementation-checklist)

---

## 1. System Architecture & Recommended Stack

- **Runtime**: Node.js (v20+ LTS) or Bun
- **Framework**: Express.js, Fastify, or NestJS
- **Database**: PostgreSQL with Prisma ORM (Recommended) or MongoDB with Mongoose
- **Caching & Rate Limiting**: Redis (for API throttling, OTPs, and slot locking)
- **File Storage**: AWS S3 or Cloudinary (for patient selfie uploads & CMS images)
- **Payment Gateway**: Razorpay (Primary for INR) or Stripe (Multi-currency)
- **WhatsApp Provider**: Meta WhatsApp Cloud API or Twilio WhatsApp API
- **AI Vision / LLM**: Gemini API or OpenAI GPT-4o-mini Vision (for skin/smile preliminary report)

```
[ Public Client Website ]     [ Clinic Admin Panel / CRM ]
          │                                │
          └───────────────┬────────────────┘
                          ▼
             [ Node.js REST API Gateway ]
        (CORS, Helmet, Rate Limiter, JWT Auth)
                          │
       ┌──────────────────┼──────────────────┐
       ▼                  ▼                  ▼
[ PostgreSQL / Prisma ] [ Redis Cache ] [ AWS S3 / Media ]
       │                  │                  │
       ▼                  ▼                  ▼
 [ Razorpay Webhook ] [ WhatsApp API ]  [ AI Vision Engine ]
```

---

## 2. Database Schemas & Data Models

### A. `User` / `AdminStaff` (Authentication & Access Control)
```prisma
model User {
  id           String      @id @default(uuid())
  email        String      @unique
  passwordHash String
  fullName     String
  phone        String?
  role         Role        @default(STAFF) // SUPER_ADMIN, DOCTOR, STAFF
  isActive     Boolean     @default(true)
  lastLoginAt  DateTime?
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
}

enum Role {
  SUPER_ADMIN
  DOCTOR
  STAFF
}
```

### B. `Appointment` / `Lead` (CRM Core)
```prisma
model Appointment {
  id              String            @id @default(uuid()) // Display ID: APT-2026-XXX
  displayId       String            @unique
  patientName     String
  phone           String
  email           String?
  treatmentId     String?
  treatmentName   String            // Stored snapshot in case treatment is renamed
  category        String            // Aesthetic Dermatology, Cosmetic Dentistry, etc.
  appointmentDate DateTime
  timeSlot        String            // e.g. "11:00 AM", "02:30 PM"
  feeAmount       Decimal           @default(500.00) // ₹500 or ₹1000
  paymentStatus   PaymentStatus     @default(PENDING)
  leadSource      LeadSource        @default(WEBSITE_BOOKING)
  status          AppointmentStatus @default(NEW)
  patientNotes    String?
  staffNotes      String?
  aiScanId        String?           @unique
  aiScan          AIScanAnalysis?   @relation(fields: [aiScanId], references: [id])
  payment         PaymentTransaction?
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  @@index([phone])
  @@index([status])
  @@index([appointmentDate])
}

enum PaymentStatus {
  PENDING
  PAID_ADVANCE
  FAILED
  REFUNDED
  ADJUSTED_IN_BILL
}

enum AppointmentStatus {
  NEW           // Just arrived, unreviewed
  CONTACTED     // Clinic concierge has reached out via call/WhatsApp
  CONFIRMED     // Slot verified & patient confirmed arrival
  COMPLETED     // Consultation / procedure finished
  CANCELLED     // Cancelled or no-show
}

enum LeadSource {
  WEBSITE_BOOKING
  SMART_WHATSAPP_BOT
  AI_SMILE_SKIN_SCANNER
  CONTACT_FORM
  DIRECT_CALL
}
```

### C. `PaymentTransaction` (Razorpay / Stripe Record)
```prisma
model PaymentTransaction {
  id                String       @id @default(uuid())
  appointmentId     String       @unique
  appointment       Appointment  @relation(fields: [appointmentId], references: [id], onDelete: Cascade)
  gateway           String       @default("RAZORPAY") // RAZORPAY, STRIPE
  orderId           String       @unique // rzp_order_xxx
  paymentId         String?      @unique // rzp_payment_xxx
  signature         String?
  amount            Decimal      // in INR (e.g. 500.00)
  currency          String       @default("INR")
  status            String       // CREATED, AUTHORIZED, CAPTURED, FAILED
  rawWebhookPayload Json?
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
}
```

### D. `Treatment` (CMS Catalog)
```prisma
model Treatment {
  id          String   @id @default(uuid())
  slug        String   @unique
  title       String
  category    String   // Aesthetic Dermatology, Cosmetic Dentistry, etc.
  subCategory String?
  duration    String   // e.g. "45 Mins"
  priceDisplay String  // e.g. "₹6,500" or "From ₹95,000"
  advanceFee  Decimal  @default(500.00)
  description String
  benefits    String[] // Array of bullet points
  imageUrl    String?
  isPopular   Boolean  @default(false)
  isActive    Boolean  @default(true)
  orderIndex  Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### E. `AIScanAnalysis` (Phase 2D Records)
```prisma
model AIScanAnalysis {
  id                   String       @id @default(uuid())
  imageUrl             String
  skinHealthScore      Int          // e.g. 84 / 100
  smileHarmonyScore    Int          // e.g. 78 / 100
  detectedFindings     Json         // [{ category, status, severity, note }]
  suggestedTreatments  Json         // [{ name, reason, fee }]
  appointment          Appointment?
  createdAt            DateTime     @default(now())
}
```

### F. `ClinicSetting` & `Testimonial` (Dynamic CMS)
```prisma
model ClinicSetting {
  id          String   @id @default("default")
  clinicName  String   @default("Dr. Zoya Aesthetic & Smile Studio")
  doctorName  String   @default("Dr. Zoya Qureshi")
  doctorTitle String
  doctorBio   String
  phone       String
  altPhone    String?
  whatsapp    String
  email       String
  address     String
  timings     String
  heroBadge   String
  heroTitlePrimary String
  heroTitleHighlight String
  heroDescription String
  heroStats   Json     // [{ label, value }]
  updatedAt   DateTime @updatedAt
}

model Testimonial {
  id                 String   @id @default(uuid())
  patientName        String
  location           String
  verifiedProcedure  String
  rating             Int      @default(5)
  reviewDate         String
  reviewText         String
  isActive           Boolean  @default(true)
  createdAt          DateTime @default(now())
}
```

---

## 3. Complete REST API Specification

### Base URL
```
Development: http://localhost:5000/api/v1
Production:  https://api.drzoyaclinic.com/api/v1
```

---

### A. Authentication & Staff Management

#### 1. Admin Login
- **Endpoint**: `POST /auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "dr.zoya@clinic.com",
    "password": "SecurePassword123!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr-123",
      "fullName": "Dr. Zoya Qureshi",
      "email": "dr.zoya@clinic.com",
      "role": "SUPER_ADMIN"
    }
  }
  ```

#### 2. Get Current Authenticated Profile
- **Endpoint**: `GET /auth/me`
- **Access**: Bearer JWT Required
- **Response**: User object with permissions.

---

### B. Public Website & Patient APIs

#### 1. Bootstrap All Website Content (Single Fast Call)
- **Endpoint**: `GET /public/clinic-data`
- **Access**: Public (Cached via Redis 60s)
- **Description**: Returns clinic settings, treatments catalog, testimonials, and trust stats in one combined JSON for instantaneous frontend rendering.

#### 2. Submit General Contact Inquiry
- **Endpoint**: `POST /public/contact-inquiry`
- **Request Body**:
  ```json
  {
    "name": "Priya Kapoor",
    "phone": "+91 98765 43210",
    "email": "priya@example.com",
    "treatment": "Aesthetic Dermatology Consultation",
    "message": "Inquiring about melasma treatment before my wedding in November."
  }
  ```
- **Action**: Creates a new record in `Appointment` with `status: "NEW"`, `leadSource: "CONTACT_FORM"`, and triggers clinic WhatsApp alert.

---

### C. Pre-Paid Booking & Payment Gateway (Phase 2B)

#### 1. Create Razorpay Order
- **Endpoint**: `POST /bookings/create-order`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "treatmentId": "treat-hydrafacial",
    "treatmentName": "HydraFacial Elite MD Deluxe",
    "date": "2026-09-20",
    "timeSlot": "11:30 AM",
    "feeAmount": 500, // 500 or 1000
    "patient": {
      "fullName": "Radhika Sharma",
      "phone": "+91 98765 43210",
      "email": "radhika@example.com",
      "notes": "Acne scar consultation"
    }
  }
  ```
- **Backend Flow**:
  1. Validates slot availability in Redis/Database.
  2. Generates Razorpay Order via `razorpay.orders.create({ amount: 500 * 100, currency: "INR", receipt: "apt_xxx" })`.
  3. Pre-creates `Appointment` record with status `PENDING`.
  4. Returns `orderId`, `amount`, `keyId`, and `appointmentId`.
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "orderId": "order_NXK829J109sL",
    "amount": 50000,
    "currency": "INR",
    "appointmentId": "APT-2026-842"
  }
  ```

#### 2. Server-Side Payment Verification (Crucial Security)
- **Endpoint**: `POST /bookings/verify-payment`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "appointmentId": "APT-2026-842",
    "razorpay_order_id": "order_NXK829J109sL",
    "razorpay_payment_id": "pay_NXK982K201aB",
    "razorpay_signature": "9a8b7c6d5e4f3a2b1c0d..."
  }
  ```
- **Backend Verification Logic**:
  ```javascript
  const crypto = require("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ error: "Invalid payment signature" });
  }
  ```
- **Post-Verification Actions**:
  1. Updates `Appointment` status to `CONFIRMED` and `paymentStatus` to `PAID_ADVANCE`.
  2. Stores `PaymentTransaction` record.
  3. Sends automated WhatsApp booking confirmation to patient and clinic front desk.

#### 3. Razorpay Webhook Handler
- **Endpoint**: `POST /webhooks/razorpay`
- **Access**: Public (Signature verified via header `X-Razorpay-Signature`)
- **Handles**: `payment.captured`, `payment.failed`, `refund.processed`.

---

### D. WhatsApp Bot & Lead Automation (Phase 2A)

#### 1. Ingest Bot Lead from Web Chatbot
- **Endpoint**: `POST /whatsapp-bot/lead`
- **Request Body**:
  ```json
  {
    "name": "Karan Mehra",
    "phone": "+91 98112 34567",
    "concern": "Invisalign alignment pricing & timeline"
  }
  ```
- **Action**:
  1. Logs lead to CRM with `leadSource: "SMART_WHATSAPP_BOT"`.
  2. Formats WhatsApp template payload and sends notification to Dr. Zoya's official reception number via WhatsApp Cloud API.
  3. Returns WhatsApp deep-link URL for the visitor.

---

### E. Clinic CRM & Admin Dashboard (Phase 2C)

#### 1. Get All Leads & Appointments (with Filters & Pagination)
- **Endpoint**: `GET /admin/crm/appointments`
- **Access**: JWT Auth (STAFF, DOCTOR, SUPER_ADMIN)
- **Query Parameters**:
  - `status`: `ALL | NEW | CONTACTED | CONFIRMED | COMPLETED | CANCELLED`
  - `search`: Matches patient name, phone, or appointment ID
  - `startDate` & `endDate`: Filter by scheduled date
  - `page`: default 1
  - `limit`: default 20
- **Response**:
  ```json
  {
    "success": true,
    "total": 142,
    "page": 1,
    "data": [
      {
        "id": "APT-2026-101",
        "patientName": "Aastha Grover",
        "phone": "+91 98112 34567",
        "treatmentName": "HydraFacial Elite MD Deluxe",
        "appointmentDate": "2026-09-18",
        "timeSlot": "11:30 AM",
        "feeAmount": 500,
        "paymentStatus": "PAID_ADVANCE",
        "status": "CONFIRMED",
        "leadSource": "WEBSITE_BOOKING"
      }
    ]
  }
  ```

#### 2. Update Appointment Workflow Status
- **Endpoint**: `PATCH /admin/crm/appointments/:id/status`
- **Access**: JWT Auth
- **Request Body**:
  ```json
  {
    "status": "CONTACTED", // NEW, CONTACTED, CONFIRMED, COMPLETED, CANCELLED
    "staffNotes": "Spoke to patient. Confirmed arrival at 11:15 AM."
  }
  ```

#### 3. Export Leads to CSV
- **Endpoint**: `GET /admin/crm/export-csv`
- **Access**: JWT Auth (Streams formatted CSV file).

#### 4. CRM Analytics & KPI Metrics
- **Endpoint**: `GET /admin/crm/analytics`
- **Response**:
  ```json
  {
    "totalLeads": 240,
    "confirmedSlots": 182,
    "totalAdvanceRevenueINR": 114500,
    "conversionRatePercent": 75.8,
    "topTreatments": [
      { "name": "HydraFacial Elite MD", "count": 64 },
      { "name": "Invisalign Clear Aligners", "count": 42 }
    ]
  }
  ```

---

### F. Web AR / AI Smile & Skin Analyzer (Phase 2D)

#### 1. Analyze Uploaded Patient Photo
- **Endpoint**: `POST /ai/analyze-face`
- **Access**: Public (Rate-limited to 5 requests / IP / hour)
- **Content-Type**: `multipart/form-data`
- **Form Data**:
  - `image`: Image file (JPEG, PNG, WebP — max 8MB)
- **Backend Flow**:
  1. Validates image format and scans for basic face detection.
  2. Uploads image to private S3 bucket.
  3. Prompts LLM Vision API (Gemini or GPT-4o-mini Vision) with Dr. Zoya's clinical scoring criteria.
  4. Parses structured JSON containing Skin Health Index (0-100), Smile Harmony Index (0-100), key concerns (hydration, melasma, crowding), and matching clinic treatments.
  5. Includes mandatory **Non-Diagnostic Medical Disclaimer**.
  6. Stores in `AIScanAnalysis` table and returns scan ID to frontend.
- **Response**:
  ```json
  {
    "scanId": "scan-98213",
    "skinHealthScore": 84,
    "smileHarmonyScore": 78,
    "findings": [
      {
        "category": "Dermal Hydration",
        "status": "Moderate Dehydration",
        "severity": "Mild",
        "note": "T-zone moisture barrier sub-optimal."
      }
    ],
    "suggestedTreatments": [
      { "name": "HydraFacial Elite MD", "fee": 500 }
    ],
    "disclaimer": "This analysis provides preliminary cosmetic guidance and does not replace in-person diagnosis by Dr. Zoya."
  }
  ```

---

### G. Dynamic Content Management (CMS)

- `PUT /admin/cms/profile`: Updates doctor biography, qualifications, contact lines, address, and timings.
- `PUT /admin/cms/hero`: Updates main banner headlines, badge text, and 4 trust statistics.
- `POST /admin/cms/treatments`: Creates new procedure in catalog.
- `PUT /admin/cms/treatments/:id`: Updates pricing, description, duration, or benefits.
- `DELETE /admin/cms/treatments/:id`: Soft-deletes or archives treatment.
- `POST /admin/cms/testimonials`: Adds patient review.
- `DELETE /admin/cms/testimonials/:id`: Removes review.

---

## 4. Third-Party Integration Guides & Code Snippets

### Razorpay Payment Verification
```javascript
// controllers/paymentController.js
const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.verifyPayment = async (req, res) => {
  const { appointmentId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  // Update appointment
  const updatedApt = await prisma.appointment.update({
    where: { displayId: appointmentId },
    data: {
      paymentStatus: "PAID_ADVANCE",
      status: "CONFIRMED",
      payment: {
        create: {
          gateway: "RAZORPAY",
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          amount: 500, // or fetched from appointment record
          status: "CAPTURED"
        }
      }
    }
  });

  // Trigger WhatsApp confirmation
  await sendWhatsAppConfirmation(updatedApt);

  return res.json({ success: true, appointment: updatedApt });
};
```

### WhatsApp Cloud API Notification
```javascript
// services/whatsappService.js
const axios = require("axios");

exports.sendWhatsAppConfirmation = async (appointment) => {
  const url = `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
  
  const payload = {
    messaging_product: "whatsapp",
    to: appointment.phone.replace(/[^0-9]/g, ""),
    type: "template",
    template: {
      name: "booking_confirmation_dr_zoya",
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: appointment.patientName },
            { type: "text", text: appointment.treatmentName },
            { type: "text", text: `${appointment.appointmentDate} at ${appointment.timeSlot}` },
            { type: "text", text: String(appointment.feeAmount) },
            { type: "text", text: appointment.displayId }
          ]
        }
      ]
    }
  };

  await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}` }
  });
};
```

---

## 5. Security, Compliance & Validation

1. **CORS Configuration**:
   - Restrict origins to the official frontend domain (`https://drzoyaclinic.com`) and admin panel domain (`https://admin.drzoyaclinic.com`).
2. **Rate Limiting**:
   - Limit `/bookings/create-order` to 10 requests / 15 mins per IP.
   - Limit `/ai/analyze-face` to 5 uploads / hour per IP.
3. **Medical Data Privacy**:
   - Patient selfies uploaded to the AI analyzer should have an optional auto-expiry retention rule (e.g. deleted after 30 days) to comply with data protection regulations.
4. **Input Validation**:
   - Use `Zod` or `Joi` schema validation on every endpoint before reaching database queries.

---

## 6. Environment Variables Reference (`.env.example`)

```bash
# Server Port & Environment
PORT=5000
NODE_ENV=production

# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://zoya_user:SecretPass123@localhost:5432/dr_zoya_db?schema=public"

# JWT Secret & Expiry
JWT_SECRET="super-secret-jwt-key-minimum-32-characters"
JWT_EXPIRES_IN="7d"

# Razorpay Credentials (from Dashboard -> Settings -> API Keys)
RAZORPAY_KEY_ID="rzp_live_xxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="xxxxxxxxxxxxxxxxxxxxxxxx"
RAZORPAY_WEBHOOK_SECRET="webhook_signing_secret_xxx"

# WhatsApp Cloud API (Meta for Developers)
WHATSAPP_PHONE_NUMBER_ID="109283746592019"
WHATSAPP_ACCESS_TOKEN="EAAG..."
CLINIC_RECEPTION_WHATSAPP="+919876543210"

# AI Vision API (for Skin & Smile Scanner)
GEMINI_API_KEY="AIzaSy..."
# or OPENAI_API_KEY="sk-..."

# Cloud Storage (AWS S3)
AWS_ACCESS_KEY_ID="AKIA..."
AWS_SECRET_ACCESS_KEY="wJalr..."
AWS_REGION="ap-south-1"
S3_BUCKET_NAME="dr-zoya-clinic-uploads"

# CORS Allowed Origins
CORS_ORIGIN="http://localhost:5173,https://drzoyaclinic.com,https://admin.drzoyaclinic.com"
```

---

## 7. Developer Implementation Checklist

- [ ] Setup Node.js project (`npm init -y`) with TypeScript / ES Modules.
- [ ] Initialize Prisma ORM and run migrations (`npx prisma migrate dev`).
- [ ] Implement JWT authentication for Admin & Staff users.
- [ ] Build Public API endpoints (`/public/clinic-data`, `/public/contact-inquiry`).
- [ ] Wire Razorpay API (`/bookings/create-order` and `/bookings/verify-payment` with HMAC SHA256).
- [ ] Implement WhatsApp Cloud API webhook receiver and automated patient confirmation.
- [ ] Build Admin CRM Lead Management endpoints with filters and CSV export.
- [ ] Connect Gemini / Vision API for the Web AR Face Scanner (`/ai/analyze-face`).
- [ ] Test end-to-end booking flow from frontend to backend database and verify status sync.
