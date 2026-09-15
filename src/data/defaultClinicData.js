export const initialClinicData = {
  profile: {
    clinicName: "Dr. Zoya Aesthetic & Smile Studio",
    tagline: "Centre for Advanced Dermatology, Cosmetology & Cosmetic Dentistry",
    doctorName: "Dr. Zoya Qureshi",
    doctorTitle: "MBBS, MD (Dermatology), FAM (Fellowship in Aesthetic Medicine - Germany)",
    doctorRole: "Chief Aesthetic Physician & Cosmetic Smile Architect",
    doctorBio: "With over 12 years of specialized clinical practice, Dr. Zoya combines precision medical science with an artist's eye for facial harmony. Trained at premier medical institutions in India, London, and Munich, she advocates for natural, non-overdone aesthetic results that celebrate each patient's distinctive individuality.",
    doctorExperienceYears: 12,
    patientCount: "15,000+",
    rating: "4.9",
    reviewCount: "1,240+",
    certifications: [
      "Member - American Academy of Aesthetic Medicine (AAAM)",
      "Fellow - International Academy of Cosmetic Dermatology (IACD)",
      "Certified Invisalign & Digital Smile Design (DSD) Specialist",
      "US-FDA Laser Safety & Protocols Board Certified"
    ],
    contact: {
      phone: "+91 98765 43210",
      altPhone: "+91 91234 56789",
      whatsapp: "+919876543210",
      email: "concierge@drzoyaclinic.com",
      address: "Suite 401, The Grand Atrium, Golf Course Road, DLF Phase 5, Gurugram, Delhi NCR",
      timings: "Mon - Sat: 10:00 AM - 08:00 PM | Sunday: By Exclusive Appointment",
      emergencyHelpline: "+91 98765 43299"
    }
  },

  hero: {
    badge: "Voted Premier Aesthetic & Smile Clinic 2026",
    titlePrimary: "Rediscover Your",
    titleHighlight: "Natural Radiance & Confident Smile",
    description: "Experience bespoke aesthetic dermatology and painless digital smile transformations. Where board-certified clinical mastery meets serene private luxury.",
    stats: [
      { label: "Successful Treatments", value: "15,000+" },
      { label: "Years Clinical Excellence", value: "12+ Years" },
      { label: "Google Patient Rating", value: "4.9 ★" },
      { label: "US-FDA Approved Lasers", value: "100%" }
    ]
  },

  treatments: [
    {
      id: "hydrafacial-md",
      title: "HydraFacial Elite MD® Deluxe",
      category: "Aesthetic Dermatology",
      subCategory: "Skin Rejuvenation",
      duration: "50 Mins",
      price: "₹6,500",
      advanceFee: 500,
      description: "Patented vortex-fusion technology to cleanse, extract, and intensely hydrate. Infused with targeted antioxidants, peptides, and hyaluronic acid for glass skin.",
      benefits: ["Instant Red Carpet Glow", "Zero Downtime", "Unclogs Congested Pores", "Improves Texture & Tone"],
      isPopular: true,
      image: "/images/treatment_aesthetic.jpg"
    },
    {
      id: "pico-laser-pigmentation",
      title: "PicoSure® Advanced Pigmentation & Melasma",
      category: "Aesthetic Dermatology",
      subCategory: "Laser Technology",
      duration: "45 Mins",
      price: "₹9,500",
      advanceFee: 500,
      description: "Picosecond laser pulses shatter stubborn melasma, sun spots, and pigmentation into microscopic dust particles without heating surrounding tissue.",
      benefits: ["Targeted Melasma Clearance", "Safe for Indian Skin Types", "Collagen Remodeling", "Painless with Topical Numbing"],
      isPopular: true,
      image: "/images/treatment_aesthetic.jpg"
    },
    {
      id: "invisalign-smile",
      title: "Invisalign® & Clear Smile Alignment",
      category: "Cosmetic Dentistry",
      subCategory: "Smile Architecture",
      duration: "6 - 12 Months",
      price: "From ₹95,000",
      advanceFee: 1000,
      description: "Virtually invisible, computer-engineered custom aligners designed using 3D iTero intraoral scanning. Straightens teeth comfortably without metal braces.",
      benefits: ["100% Discreet & Transparent", "Removable for Dining & Events", "Painless Predictive Movement", "Custom 3D Smile Simulation"],
      isPopular: true,
      image: "/images/dental_smile_makeover.jpg"
    },
    {
      id: "porcelain-veneers",
      title: "Handcrafted Ultra-Thin Ceramic Veneers",
      category: "Cosmetic Dentistry",
      subCategory: "Smile Design",
      duration: "2 Sessions",
      price: "₹18,000 / tooth",
      advanceFee: 1000,
      description: "Micro-thin E-Max porcelain laminates custom sculpted to perfection. Corrects gaps, discoloration, worn edges, and asymmetry with lifelong natural luminescence.",
      benefits: ["Permanent Stain Resistance", "Photorealistic Tooth Enamel", "Minimal Enamel Prep", "Bespoke Shade Customization"],
      isPopular: false,
      image: "/images/dental_smile_makeover.jpg"
    },
    {
      id: "botox-wrinkle-relaxers",
      title: "Baby Botox & Facial Muscle Softening",
      category: "Anti-Aging & Injectables",
      subCategory: "Facial Sculpting",
      duration: "30 Mins",
      price: "₹450 / unit",
      advanceFee: 500,
      description: "Micro-dosed Allergan botulinum toxin meticulously placed to erase forehead lines, crow's feet, and frown furrows while preserving 100% natural facial expression.",
      benefits: ["No Frozen Appearance", "Results within 4 - 7 Days", "Prevents Deep Static Creases", "Quick Lunchtime Procedure"],
      isPopular: true,
      image: "/images/treatment_aesthetic.jpg"
    },
    {
      id: "dermal-fillers-lip-cheek",
      title: "Juvederm® Lip Architecture & Jawline Contour",
      category: "Anti-Aging & Injectables",
      subCategory: "Facial Contouring",
      duration: "45 Mins",
      price: "₹24,000 / syringe",
      advanceFee: 1000,
      description: "Premium hyaluronic acid fillers engineered to restore youthful cheek projection, define the mandibular jawline, or add plush, hydrated lip definition.",
      benefits: ["Instant Sculpted Symmetry", "Reversible & Safe", "Lasts 12 to 18 Months", "Natural Subtle Enhancement"],
      isPopular: false,
      image: "/images/treatment_aesthetic.jpg"
    },
    {
      id: "gfc-hair-therapy",
      title: "Growth Factor Concentrate (GFC) Hair Regrowth",
      category: "Hair Restoration",
      subCategory: "Regenerative Medicine",
      duration: "60 Mins",
      price: "₹8,500 / session",
      advanceFee: 500,
      description: "Next-generation autologous therapy yielding high concentrations of PDGF, VEGF, and EGF derived directly from your blood to reverse hair thinning and awaken dormant follicles.",
      benefits: ["Zero RBC/WBC Contamination", "Significantly Less Pain than Traditional PRP", "Halts Hair Fall in 3 Sessions", "Thickens Hair Shaft Diameter"],
      isPopular: true,
      image: "/images/treatment_aesthetic.jpg"
    },
    {
      id: "zoom-teeth-whitening",
      title: "Philips Zoom!® In-Office Laser Teeth Whitening",
      category: "Cosmetic Dentistry",
      subCategory: "Brightening",
      duration: "45 Mins",
      price: "₹12,500",
      advanceFee: 500,
      description: "Advanced light-activated hydrogen peroxide gel provides up to 8 shades whiter teeth in a single 45-minute clinical session with desensitizing ACP protection.",
      benefits: ["Instant 8 Shades Lighter", "Enamel-Safe Formulation", "Post-Treatment Sensitivity Relief", "Long-Lasting Radiance"],
      isPopular: false,
      image: "/images/dental_smile_makeover.jpg"
    },
    {
      id: "subcision-acne-scars",
      title: "TCA Cross & RF Microneedling Acne Scar Revision",
      category: "Aesthetic Dermatology",
      subCategory: "Scar Remodeling",
      duration: "60 Mins",
      price: "₹11,000",
      advanceFee: 500,
      description: "Triple-modality protocol combining targeted subcision of tethered fibrous bands, TCA Cross for ice-pick scars, and insulated RF microneedling for deep dermal collagen.",
      benefits: ["Up to 70% Scar Depth Reduction", "Stimulates Native Elastin", "Permanent Structural Improvement", "Doctor-Performed Protocol"],
      isPopular: false,
      image: "/images/treatment_aesthetic.jpg"
    }
  ],

  transformations: [
    {
      id: "trans-1",
      patientLabel: "Patient A.M. (Age 29)",
      concern: "Persistent Melasma & Sun Damage",
      treatmentUsed: "3 Sessions PicoSure® Laser + Prescription Retinoids",
      turnaround: "8 Weeks",
      resultDescription: "92% clearance of bilateral cheek pigmentation with restored skin barrier and glass-like reflection.",
      category: "Skin"
    },
    {
      id: "trans-2",
      patientLabel: "Patient R.K. (Age 34)",
      concern: "Severe Crowding & Enamel Wear",
      treatmentUsed: "Invisalign® Express + 6 Minimal-Prep E-Max Porcelain Veneers",
      turnaround: "6 Months",
      resultDescription: "Harmonized buccal corridor, ideal smile curve alignment, and natural pearlescent luminescence.",
      category: "Smile"
    },
    {
      id: "trans-3",
      patientLabel: "Patient S.V. (Age 42)",
      concern: "Under-Eye Hollows & Nasolabial Creases",
      treatmentUsed: "Juvederm Voluma Tear-Trough & Mid-Face Vector Lift",
      turnaround: "Immediate (Review at Day 14)",
      resultDescription: "Complete erasure of chronic fatigue look with zero puffy shelf effect and smooth facial transition.",
      category: "Injectables"
    },
    {
      id: "trans-4",
      patientLabel: "Patient D.P. (Age 31)",
      concern: "Androgenetic Alopecia Grade 3",
      treatmentUsed: "4 Sessions GFC Therapy + Micronutrient Optimization",
      turnaround: "4 Months",
      resultDescription: "Reversal of crown thinning, 45% increase in hair follicle density, and complete cessation of shedding.",
      category: "Hair"
    }
  ],

  testimonials: [
    {
      id: "rev-1",
      name: "Meera Sen",
      location: "Gurugram",
      verifiedProcedure: "HydraFacial Elite MD & Baby Botox",
      rating: 5,
      date: "September 2026",
      text: "Dr. Zoya is the absolute gold standard in aesthetics. I was terrified of looking frozen or plastic. Her approach is so conservative yet incredibly transformative. My skin has never looked this luminous and fresh."
    },
    {
      id: "rev-2",
      name: "Adv. Rohit Malhotra",
      location: "New Delhi",
      verifiedProcedure: "Invisalign® & Zoom Whitening",
      rating: 5,
      date: "August 2026",
      text: "As a practicing lawyer, my smile and speech are crucial. The 3D smile design preview convinced me, and within 7 months my teeth are in perfect alignment. The clinic feels like a 7-star private hotel lounge."
    },
    {
      id: "rev-3",
      name: "Tanya Singhania",
      location: "Golf Course Road",
      verifiedProcedure: "PicoSure Laser Melasma Protocol",
      rating: 5,
      date: "July 2026",
      text: "I spent 4 years hopping from clinic to clinic wasting money on steroid creams. Dr. Zoya correctly diagnosed my dermal melasma and fixed it in 3 sessions. Forever grateful to her and her warm staff."
    },
    {
      id: "rev-4",
      name: "Karan Bajaj",
      location: "South Delhi",
      verifiedProcedure: "GFC Hair Regrowth Therapy",
      rating: 5,
      date: "June 2026",
      text: "GFC therapy here was virtually painless compared to the terrible PRP I had had elsewhere. My hair density at the crown is visibly thicker. Highly recommend Dr. Zoya's clinical protocols."
    }
  ],

  faqs: [
    {
      question: "How do I know which treatment is right for my skin or smile?",
      answer: "Every journey begins with a comprehensive 45-minute clinical consultation with Dr. Zoya. She utilizes digital facial mapping and intraoral 3D scans to assess your dermal layers and smile architecture before recommending an individualized protocol."
    },
    {
      question: "Are the aesthetic procedures painful?",
      answer: "Patient comfort is our obsession. We use medical-grade topical numbing creams, vibration distraction devices, and ultra-fine Japanese micro-cannulas. Most patients report feeling only a light vibration or gentle warmth."
    },
    {
      question: "What is the advance consultation fee and is it deductible?",
      answer: "The advance consultation fee is ₹500 for Standard Clinical Assessment or ₹1,000 for Priority In-Clinic/Senior Doctor consultation. 100% of this fee is fully adjusted against any procedure or package you book on the day."
    },
    {
      question: "Is there any downtime after treatments like lasers or HydraFacial?",
      answer: "HydraFacial and our signature red carpet peels have zero downtime—you can apply makeup and attend events the same evening. Laser procedures may leave mild, healthy pinkness for 3 to 12 hours, easily managed with soothing post-procedure balms."
    },
    {
      question: "Do you offer EMI or split payment options?",
      answer: "Yes! We offer 0% interest EMI options through major credit cards and healthcare financing partners for all comprehensive packages, Invisalign®, and dental veneer smile makeovers."
    }
  ]
};

export const initialSeedAppointments = [
  {
    id: "APT-2026-101",
    patientName: "Aastha Grover",
    phone: "+91 98112 34567",
    email: "aastha.g@gmail.com",
    treatment: "HydraFacial Elite MD® Deluxe",
    category: "Aesthetic Dermatology",
    date: "2026-09-18",
    timeSlot: "11:30 AM - 12:30 PM",
    feeAmount: 500,
    paymentStatus: "Paid (Advance Verified)",
    leadSource: "Website Pre-Paid Booking",
    status: "Confirmed",
    notes: "Patient attending cousin's wedding this weekend. Focus on instant radiance and hydration.",
    createdAt: "2026-09-15 10:15 AM"
  },
  {
    id: "APT-2026-102",
    patientName: "Vikram Singhania",
    phone: "+91 99201 88321",
    email: "vikram.s@outlook.com",
    treatment: "Invisalign® & Clear Smile Alignment",
    category: "Cosmetic Dentistry",
    date: "2026-09-19",
    timeSlot: "03:00 PM - 04:00 PM",
    feeAmount: 1000,
    paymentStatus: "Paid (Advance Verified)",
    leadSource: "AI Smile Analyzer",
    status: "New",
    notes: "Completed AI Smile scan online. Moderate midline crowding. Wants 3D iTero scan.",
    createdAt: "2026-09-15 11:45 AM"
  },
  {
    id: "APT-2026-103",
    patientName: "Dr. Natasha Roy",
    phone: "+91 97177 55432",
    email: "natasha.roy@hospital.org",
    treatment: "Baby Botox & Facial Muscle Softening",
    category: "Anti-Aging & Injectables",
    date: "2026-09-20",
    timeSlot: "05:30 PM - 06:15 PM",
    feeAmount: 500,
    paymentStatus: "Pending at Clinic",
    leadSource: "Smart WhatsApp Bot",
    status: "Contacted",
    notes: "Inquired about forehead line prevention. Staff verified slot via WhatsApp.",
    createdAt: "2026-09-15 01:20 PM"
  },
  {
    id: "APT-2026-104",
    patientName: "Kabir Mehra",
    phone: "+91 98450 12890",
    email: "kabir.m@techstart.io",
    treatment: "Growth Factor Concentrate (GFC) Hair Regrowth",
    category: "Hair Restoration",
    date: "2026-09-16",
    timeSlot: "12:00 PM - 01:00 PM",
    feeAmount: 500,
    paymentStatus: "Paid (Advance Verified)",
    leadSource: "Website Direct",
    status: "Confirmed",
    notes: "2nd session GFC treatment. Very pleased with hair fall reduction from session 1.",
    createdAt: "2026-09-14 04:10 PM"
  }
];
