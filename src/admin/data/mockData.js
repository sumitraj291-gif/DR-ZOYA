export const MOCK_CLINIC_INFO = {
  name: "Dr. Zoya Aesthetic & Smile Studio",
  tagline: "Premier Cosmetic Dentistry & Facial Aesthetics",
  phone: "+91 98765 43210",
  email: "concierge@drzoyaclinic.com",
  address: "Suite 402, Signature Towers, Jubilee Hills, Hyderabad - 500033",
  workingHours: {
    weekdays: "09:00 AM - 08:00 PM",
    saturday: "09:00 AM - 06:00 PM",
    sunday: "10:00 AM - 02:00 PM (Prior Appointment Only)",
  },
  bookingSlotDuration: 45, // mins
};

export const MOCK_ADMIN_PROFILE = {
  name: "Dr. Zoya Khan",
  role: "Super Admin & Managing Director",
  email: "dr.zoya@drzoyaclinic.com",
  phone: "+91 98765 00001",
  avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
  notificationsEnabled: true,
  twoFactorEnabled: true,
};

export const MOCK_KPIS = {
  totalLeads: { value: 1284, change: "+14.2%", period: "vs last month" },
  todayAppointments: { value: 24, upcoming: 8, completed: 14, cancelled: 2 },
  totalAppointments: { value: 1280, change: "+14%", period: "this month" },
  revenue: { value: "₹4.82L", change: "+12.6%", period: "vs last month" },
  conversionRate: { value: "18.4%", change: "+3.2%", period: "vs last month" },
  pendingPayments: { value: "₹65,000", count: 6 },
  followupsDue: { value: 18, attention: true },
};

// 1. LEADS MANAGEMENT DATA
export const INITIAL_LEADS = [
  {
    id: "LED-401",
    name: "Shalini Rao",
    phone: "+91 98112 00112",
    email: "shalini.rao@example.com",
    interestedTreatment: "Hollywood Smile Makeover",
    source: "Website",
    date: "2026-09-16",
    assignedStaff: "Dr. Zoya Khan",
    status: "New",
    nextFollowup: "2026-09-17",
    notes: "Patient requested consultation details for 8 upper porcelain veneers prior to wedding.",
  },
  {
    id: "LED-402",
    name: "Manish Malhotra",
    phone: "+91 97200 33441",
    email: "manish.m@example.com",
    interestedTreatment: "Invisalign® Clear Aligners",
    source: "WhatsApp",
    date: "2026-09-15",
    assignedStaff: "Dr. Meera Nair",
    status: "Contacted",
    nextFollowup: "2026-09-18",
    notes: "Sent financial EMI options & aligner treatment timeline via WhatsApp.",
  },
  {
    id: "LED-403",
    name: "Ankita Lokhande",
    phone: "+91 99103 44552",
    email: "ankita.l@example.com",
    interestedTreatment: "In-Office Laser Teeth Whitening",
    source: "Instagram",
    date: "2026-09-14",
    assignedStaff: "Front Desk Concierge",
    status: "Follow-up",
    nextFollowup: "2026-09-16",
    notes: "Follow-up call scheduled for today evening.",
  },
  {
    id: "LED-404",
    name: "Rahul Dravid",
    phone: "+91 98450 77889",
    email: "rahul.d@example.com",
    interestedTreatment: "Dental Implant Consultation",
    source: "Google",
    date: "2026-09-12",
    assignedStaff: "Dr. Vikramaditya Rao",
    status: "Interested",
    nextFollowup: "2026-09-19",
    notes: "Interested in single molar titanium implant; awaiting CBCT scan.",
  },
  {
    id: "LED-405",
    name: "Siddharth Malhotra",
    phone: "+91 98443 66112",
    email: "sid.m@example.com",
    interestedTreatment: "Composite Edge Bonding",
    source: "Referral",
    date: "2026-09-10",
    assignedStaff: "Dr. Zoya Khan",
    status: "Converted",
    nextFollowup: "N/A",
    notes: "Converted to patient PAT-8012. Appointment booked APT-10485.",
  },
  {
    id: "LED-406",
    name: "Varun Dhawan",
    phone: "+91 97110 22334",
    email: "varun.d@example.com",
    interestedTreatment: "Botox for Gummy Smile",
    source: "Walk-in",
    date: "2026-09-08",
    assignedStaff: "Front Desk Concierge",
    status: "Lost",
    nextFollowup: "N/A",
    notes: "Patient relocated out of state.",
  }
];

// 2. APPOINTMENTS DATA
export const INITIAL_APPOINTMENTS = [
  {
    id: "APT-10482",
    patientName: "Aarav Sharma",
    phone: "+91 98450 11223",
    email: "aarav.sharma@example.com",
    treatment: "Smile Makeover Consultation",
    doctor: "Dr. Zoya Khan",
    date: "2026-09-16",
    time: "09:30 AM",
    status: "Confirmed",
    paymentStatus: "Paid",
    assignedStaff: "Dr. Zoya Khan",
    notes: "Patient interested in 8 upper porcelain veneers for wedding in November.",
  },
  {
    id: "APT-10483",
    patientName: "Riya Mehta",
    phone: "+91 97112 33445",
    email: "riya.m@example.com",
    treatment: "In-Office Laser Teeth Whitening",
    doctor: "Dr. Zoya Khan",
    date: "2026-09-16",
    time: "11:00 AM",
    status: "Confirmed",
    paymentStatus: "Paid",
    assignedStaff: "Front Desk Concierge",
    notes: "Regular client. Sensitivity check required prior to whitening.",
  },
  {
    id: "APT-10484",
    patientName: "Ananya Gupta",
    phone: "+91 99887 66554",
    email: "ananya.gupta@example.com",
    treatment: "Invisalign® Progress Review",
    doctor: "Dr. Meera Nair",
    date: "2026-09-16",
    time: "01:30 PM",
    status: "Pending",
    paymentStatus: "Pending",
    assignedStaff: "Dr. Meera Nair",
    notes: "Tray #14 delivery & attachment check.",
  },
  {
    id: "APT-10485",
    patientName: "Karan Johar",
    phone: "+91 98200 44332",
    email: "karan.j@example.com",
    treatment: "Dental Implant CBCT Consultation",
    doctor: "Dr. Vikramaditya Rao",
    date: "2026-09-16",
    time: "03:15 PM",
    status: "Confirmed",
    paymentStatus: "Paid",
    assignedStaff: "Dr. Vikramaditya Rao",
    notes: "Post-extraction tooth #36 replacement assessment.",
  },
  {
    id: "APT-10486",
    patientName: "Sneha Reddy",
    phone: "+91 94401 88776",
    email: "sneha.r@example.com",
    treatment: "Composite Edge Bonding",
    doctor: "Dr. Zoya Khan",
    date: "2026-09-16",
    time: "05:00 PM",
    status: "Pending",
    paymentStatus: "Pending",
    assignedStaff: "Dr. Zoya Khan",
    notes: "Chipped central incisor. Emergency aesthetic restoration.",
  },
  {
    id: "APT-10487",
    patientName: "Kabir Malhotra",
    phone: "+91 99102 55667",
    email: "kabir.m@example.com",
    treatment: "Porcelain Veneers Prep",
    doctor: "Dr. Zoya Khan",
    date: "2026-09-17",
    time: "10:00 AM",
    status: "Confirmed",
    paymentStatus: "Paid",
    assignedStaff: "Dr. Zoya Khan",
    notes: "Upper arch impression and temporary veneer fitting.",
  },
  {
    id: "APT-10488",
    patientName: "Pooja Singh",
    phone: "+91 98800 77112",
    email: "pooja.s@example.com",
    treatment: "Botox for Gummy Smile",
    doctor: "Dr. Zoya Khan",
    date: "2026-09-17",
    time: "02:00 PM",
    status: "Confirmed",
    paymentStatus: "Paid",
    assignedStaff: "Dr. Zoya Khan",
    notes: "Hyperactive upper lip levator muscle evaluation.",
  }
];

// 3. PATIENT RECORDS DATA
export const INITIAL_PATIENTS = [
  {
    id: "PAT-8012",
    name: "Aarav Sharma",
    phone: "+91 98450 11223",
    email: "aarav.sharma@example.com",
    dob: "1992-06-14",
    gender: "Male",
    lastVisit: "2026-09-16",
    totalAppointments: 4,
    totalSpent: 180000,
    status: "Active",
    leadHistory: "Website Consultation Form (2026-08-20)",
    notes: "High aesthetic expectation. Prefers OM1 ultra-white ceramic shade.",
    appointments: [
      { id: "APT-10482", treatment: "Smile Makeover Consultation", date: "2026-09-16", status: "Confirmed" },
      { id: "APT-10390", treatment: "Digital Intraoral Scan", date: "2026-08-28", status: "Completed" },
    ],
    treatments: ["Digital Smile Design (DSD) Scan", "Diagnostic Wax-Up"],
    payments: [
      { id: "PAY-9001", orderId: "ord_RZP_88102", amount: 180000, method: "Razorpay (Credit Card)", date: "2026-09-16", status: "Paid" }
    ]
  },
  {
    id: "PAT-8013",
    name: "Riya Mehta",
    phone: "+91 97112 33445",
    email: "riya.m@example.com",
    dob: "1995-11-03",
    gender: "Female",
    lastVisit: "2026-09-16",
    totalAppointments: 6,
    totalSpent: 42000,
    status: "Active",
    leadHistory: "Instagram DM Campaign (2026-06-01)",
    notes: "Slight enamel fluorosis. Whitening protocol recommended.",
    appointments: [
      { id: "APT-10483", treatment: "In-Office Laser Teeth Whitening", date: "2026-09-16", status: "Confirmed" }
    ],
    treatments: ["Full Mouth Prophylaxis", "Laser Whitening"],
    payments: [
      { id: "PAY-9002", orderId: "ord_RZP_88103", amount: 18000, method: "Razorpay (UPI)", date: "2026-09-16", status: "Paid" }
    ]
  },
  {
    id: "PAT-8014",
    name: "Ananya Gupta",
    phone: "+91 99887 66554",
    email: "ananya.gupta@example.com",
    dob: "1998-04-22",
    gender: "Female",
    lastVisit: "2026-08-15",
    totalAppointments: 8,
    totalSpent: 250000,
    status: "Active",
    leadHistory: "Google Search Ad (2025-11-10)",
    notes: "Invisalign Comprehensive patient. Tray #14 delivery pending.",
    appointments: [
      { id: "APT-10484", treatment: "Invisalign® Progress Review", date: "2026-09-16", status: "Pending" }
    ],
    treatments: ["Invisalign Full Arch Attachment Placement"],
    payments: [
      { id: "PAY-9003", orderId: "ord_RZP_88104", amount: 125000, method: "Razorpay EMI", date: "2026-08-15", status: "Paid" }
    ]
  }
];

// 4. PAYMENTS DATA (RAZORPAY INTEGRATION READY)
export const INITIAL_PAYMENTS = [
  {
    id: "PAY-9001",
    razorpayPaymentId: "pay_Pz9K284aLq109",
    orderId: "ord_RZP_88102",
    patientName: "Aarav Sharma",
    appointmentId: "APT-10482",
    treatment: "Hollywood Smile Makeover",
    amount: 180000,
    method: "Credit Card (Razorpay)",
    date: "2026-09-16 09:15 AM",
    status: "Paid",
    refundStatus: "None",
  },
  {
    id: "PAY-9002",
    razorpayPaymentId: "pay_Pz8L193bMq210",
    orderId: "ord_RZP_88103",
    patientName: "Riya Mehta",
    appointmentId: "APT-10483",
    treatment: "In-Office Laser Teeth Whitening",
    amount: 18000,
    method: "UPI (Google Pay / Razorpay)",
    date: "2026-09-16 10:45 AM",
    status: "Paid",
    refundStatus: "None",
  },
  {
    id: "PAY-9003",
    razorpayPaymentId: "pay_Pz7M082cNq311",
    orderId: "ord_RZP_88104",
    patientName: "Ananya Gupta",
    appointmentId: "APT-10484",
    treatment: "Invisalign® Clear Aligners (Advance)",
    amount: 125000,
    method: "0% Interest Bajaj Finance EMI",
    date: "2026-09-15 03:20 PM",
    status: "Pending",
    refundStatus: "None",
  },
  {
    id: "PAY-9004",
    razorpayPaymentId: "pay_Pz6N971dOq412",
    orderId: "ord_RZP_88105",
    patientName: "Divya Spandana",
    appointmentId: "APT-10490",
    treatment: "In-Office Laser Whitening",
    amount: 18000,
    method: "Net Banking (HDFC)",
    date: "2026-09-14 11:10 AM",
    status: "Refunded",
    refundStatus: "Full Refund (₹18,000)",
  },
  {
    id: "PAY-9005",
    razorpayPaymentId: "pay_Pz5O860dPq513",
    orderId: "ord_RZP_88106",
    patientName: "Kabir Malhotra",
    appointmentId: "APT-10487",
    treatment: "Porcelain Veneers Prep",
    amount: 45000,
    method: "Debit Card (Razorpay)",
    date: "2026-09-13 04:30 PM",
    status: "Failed",
    refundStatus: "None",
  }
];

// 5. DEDICATED FOLLOW-UPS TRACKER DATA
export const INITIAL_FOLLOWUPS = [
  {
    id: "FLP-101",
    name: "Ankita Lokhande",
    type: "Lead Follow-up",
    phone: "+91 99103 44552",
    reason: "Confirm whitening appointment slot for Saturday",
    assignedStaff: "Front Desk Concierge",
    dueDate: "2026-09-16",
    lastContact: "2026-09-14",
    status: "Due Today",
    priority: "High",
  },
  {
    id: "FLP-102",
    name: "Shalini Rao",
    type: "Lead Follow-up",
    phone: "+91 98112 00112",
    reason: "Review 3D Digital Smile Design proposal",
    assignedStaff: "Dr. Zoya Khan",
    dueDate: "2026-09-15",
    lastContact: "2026-09-12",
    status: "Overdue",
    priority: "High",
  },
  {
    id: "FLP-103",
    name: "Manish Malhotra",
    type: "Lead Follow-up",
    phone: "+91 97200 33441",
    reason: "Discuss Invisalign financing options",
    assignedStaff: "Dr. Meera Nair",
    dueDate: "2026-09-18",
    lastContact: "2026-09-15",
    status: "Pending",
    priority: "Medium",
  },
  {
    id: "FLP-104",
    name: "Aarav Sharma",
    type: "Post-Treatment Check",
    phone: "+91 98450 11223",
    reason: "24-hour post whitening sensitivity checkup",
    assignedStaff: "Front Desk Concierge",
    dueDate: "2026-09-17",
    lastContact: "2026-09-16",
    status: "Pending",
    priority: "Medium",
  }
];

// 6. WHATSAPP / AI CHAT INBOX DATA
export const INITIAL_CHATS = [
  {
    id: "CHAT-01",
    contactName: "Priya Varma",
    phone: "+91 98111 00223",
    lastMessage: "Can you share the cost for 8 upper porcelain veneers?",
    timestamp: "10:15 AM",
    unreadCount: 2,
    leadStatus: "AI Captured",
    capturedData: {
      name: "Priya Varma",
      phone: "+91 98111 00223",
      interestedTreatment: "Porcelain Veneers",
      preferredDate: "2026-09-18",
      preferredTime: "11:00 AM",
      source: "WhatsApp AI Bot",
    },
    messages: [
      { sender: "patient", text: "Hello! I saw your Dr. Zoya Instagram page. Do you do digital smile designing?", time: "10:10 AM" },
      { sender: "ai_bot", text: "Welcome to Dr. Zoya Aesthetic & Smile Studio! ✨ Yes, we specialize in 3D Digital Smile Design and hand-crafted porcelain veneers. Would you like to schedule a consultation?", time: "10:11 AM" },
      { sender: "patient", text: "Can you share the cost for 8 upper porcelain veneers?", time: "10:15 AM" }
    ]
  },
  {
    id: "CHAT-02",
    contactName: "Rohan Kapoor",
    phone: "+91 97772 44110",
    lastMessage: "Thanks! I'll visit the studio this Saturday at 2 PM.",
    timestamp: "Yesterday",
    unreadCount: 0,
    leadStatus: "Contacted",
    capturedData: null,
    messages: [
      { sender: "patient", text: "Hi, do you offer EMI options for Invisalign?", time: "Yesterday 04:00 PM" },
      { sender: "admin", text: "Hello Rohan, yes! We offer 0% interest EMI options starting at ₹8,500/month. We can book a 3D scan consultation for you this Saturday.", time: "Yesterday 04:15 PM" },
      { sender: "patient", text: "Thanks! I'll visit the studio this Saturday at 2 PM.", time: "Yesterday 04:20 PM" }
    ]
  }
];

// 7. TREATMENTS CATALOG DATA
export const INITIAL_TREATMENTS = [
  {
    id: "TRT-01",
    name: "Hollywood Smile Makeover",
    category: "Smile Designing",
    price: 180000,
    discountedPrice: 165000,
    duration: 90,
    offer: "10% Pre-Wedding Package Off",
    status: "Active",
    description: "Custom digital smile design using ultra-thin IPS e.max ceramic veneers.",
  },
  {
    id: "TRT-02",
    name: "Porcelain Veneers (Per Tooth)",
    category: "Smile Designing",
    price: 22000,
    discountedPrice: 20000,
    duration: 60,
    offer: "Complimentary Teeth Whitening on 6+ teeth",
    status: "Active",
    description: "Handcrafted ceramic veneers for flawless aesthetic alignment.",
  },
  {
    id: "TRT-03",
    name: "In-Office Laser Teeth Whitening",
    category: "Cosmetic Dentistry",
    price: 18000,
    discountedPrice: 15000,
    duration: 45,
    offer: "Monsoon Whitening Special",
    status: "Active",
    description: "Advanced Philips Zoom bleaching protocol up to 8 shades lighter in 45 minutes.",
  },
  {
    id: "TRT-04",
    name: "Invisalign® Clear Aligners",
    category: "Aligners",
    price: 250000,
    discountedPrice: 225000,
    duration: 30,
    offer: "Free 3D Intraoral Scan & ClinCheck",
    status: "Active",
    description: "Discreet computer-designed transparent alignment treatment.",
  },
  {
    id: "TRT-05",
    name: "Dental Implant Consultation & 3D Scan",
    category: "Dental Implants",
    price: 5000,
    discountedPrice: 3500,
    duration: 45,
    offer: "Complimentary CBCT Assessment",
    status: "Active",
    description: "Comprehensive 3D planning consultation for biocompatible titanium implants.",
  }
];

// 8. STAFF MANAGEMENT & RBAC PERMISSIONS DATA
export const MOCK_DOCTORS = [
  { id: "DOC-01", name: "Dr. Zoya Khan", specialization: "Cosmetic & Smile Specialist", experience: "12+ yrs" },
  { id: "DOC-02", name: "Dr. Vikramaditya Rao", specialization: "Implantologist & Oral Surgeon", experience: "15+ yrs" },
  { id: "DOC-03", name: "Dr. Meera Nair", specialization: "Orthodontist & Clear Aligner Specialist", experience: "9+ yrs" },
];

export const MOCK_SERVICES = INITIAL_TREATMENTS;

export const INITIAL_STAFF = [
  {
    id: "STF-01",
    name: "Dr. Zoya Khan",
    role: "Super Admin",
    email: "dr.zoya@drzoyaclinic.com",
    phone: "+91 98765 00001",
    status: "Active",
    permissions: { leads: "Manage", appointments: "Manage", patients: "Manage", payments: "Manage", treatments: "Manage", reports: "Manage", settings: "Manage" }
  },
  {
    id: "STF-02",
    name: "Dr. Vikramaditya Rao",
    role: "Doctor",
    email: "dr.vikram@drzoyaclinic.com",
    phone: "+91 98765 00002",
    status: "Active",
    permissions: { leads: "View", appointments: "Manage", patients: "Manage", payments: "View", treatments: "View", reports: "View", settings: "None" }
  },
  {
    id: "STF-03",
    name: "Dr. Meera Nair",
    role: "Doctor",
    email: "dr.meera@drzoyaclinic.com",
    phone: "+91 98765 00003",
    status: "Active",
    permissions: { leads: "View", appointments: "Manage", patients: "Manage", payments: "View", treatments: "View", reports: "View", settings: "None" }
  },
  {
    id: "STF-04",
    name: "Pooja Hegde",
    role: "Receptionist",
    email: "concierge@drzoyaclinic.com",
    phone: "+91 98765 00004",
    status: "Active",
    permissions: { leads: "Manage", appointments: "Manage", patients: "View", payments: "View", treatments: "View", reports: "None", settings: "None" }
  }
];

// 9. REVIEWS MODERATION DATA
export const INITIAL_REVIEWS = [
  {
    id: "REV-301",
    patientName: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    service: "Hollywood Smile Makeover",
    reviewText: "Dr. Zoya is an artist! The digital 3D mock-up gave me total confidence, and the final porcelain veneers look completely natural and radiant. The studio feels like a 5-star luxury lounge.",
    date: "2026-09-10",
    status: "Published",
  },
  {
    id: "REV-302",
    patientName: "Riya Mehta",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    service: "In-Office Laser Teeth Whitening",
    reviewText: "Pain-free Zoom whitening treatment with zero sensitivity afterwards. Staff is incredibly attentive and courteous. Best dental experience in Hyderabad!",
    date: "2026-09-08",
    status: "Published",
  }
];

// 10. NOTIFICATIONS STREAM DATA
export const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-01",
    type: "appointment",
    title: "New Appointment Booking",
    description: "Aarav Sharma booked Smile Makeover Consultation for Today at 09:30 AM",
    time: "10 mins ago",
    read: false,
  },
  {
    id: "NOTIF-02",
    type: "payment",
    title: "Razorpay Payment Received",
    description: "Payment of ₹1,80,000 received for Order ord_RZP_88102 (Aarav Sharma)",
    time: "15 mins ago",
    read: false,
  },
  {
    id: "NOTIF-03",
    type: "lead",
    title: "AI Chat Captured Lead",
    description: "Priya Varma requested consultation for Porcelain Veneers via WhatsApp AI Chat",
    time: "30 mins ago",
    read: false,
  }
];

// 11. PRACTICE ANALYTICS DATA
export const ANALYTICS_DATA = {
  conversionRates: {
    conversionPercentage: "61.7%",
  },
  monthlyAppointments: [
    { month: "Apr", appointments: 120, revenue: 380000 },
    { month: "May", appointments: 135, revenue: 420000 },
    { month: "Jun", appointments: 140, revenue: 440000 },
    { month: "Jul", appointments: 155, revenue: 470000 },
    { month: "Aug", appointments: 148, revenue: 460000 },
    { month: "Sep", appointments: 160, revenue: 482000 },
  ],
  serviceDistribution: [
    { service: "Hollywood Smile Makeover", count: 48, percentage: 35, color: "#C5A059" },
    { service: "Invisalign Aligners", count: 38, percentage: 28, color: "#090D14" },
    { service: "Laser Teeth Whitening", count: 26, percentage: 19, color: "#1E293B" },
    { service: "Porcelain Veneers", count: 18, percentage: 13, color: "#9A7736" },
    { service: "Dental Implants", count: 8, percentage: 5, color: "#64748B" },
  ],
};
