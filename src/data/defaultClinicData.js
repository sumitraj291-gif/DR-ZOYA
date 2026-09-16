export const initialClinicData = {
  profile: {
    clinicName: "DNA Dental, Skin & Hair Clinic",
    brandAlias: "Dr. Zoya's DNA Clinic India",
    tagline: "Precision, Care, Confidence and Integrity — That's the DNA Standard",
    doctorName: "Dr. Zoya Rana",
    doctorTitle: "Director & Chief Aesthetic Physician",
    doctorRole: "Founder & Lead Specialist (Skin, Hair & Aesthetics)",
    doctorBio: "At DNA Clinics, we bring together certified specialists, modern infrastructure, and ethical medical practices under one trusted brand. Operating premier centres in Dehradun and Muzaffarnagar, Dr. Zoya Rana and her expert team combine clinical excellence with patient comfort to deliver natural, confident transformations.",
    doctorExperienceYears: 12,
    patientCount: "15,000+",
    rating: "4.9",
    reviewCount: "1,240+",
    instagram: "https://www.instagram.com/dnaclinicindia/",
    instagramHandle: "@dnaclinicindia",
    certifications: [
      "Certified Specialists in Aesthetic Dermatology & Cosmetology",
      "Advanced Digital Smile Design (DSD) & Implantology Center",
      "US-FDA Cleared Laser Protocols & Stringent Sterilization",
      "Dual State Presence: Dehradun (Uttarakhand) & Muzaffarnagar (U.P.)"
    ],
    contact: {
      phone: "+91 63953 77355",
      altPhone: "+91 63953 77355",
      whatsapp: "+916395377355",
      email: "dnadentalclinic3@gmail.com",
      address: "Dehradun & Muzaffarnagar Clinics, Uttarakhand & Uttar Pradesh, India",
      dehradunAddress: "DNA Clinic, Rajpur Road / Ballupur Chowk, Dehradun, Uttarakhand",
      muzaffarnagarAddress: "DNA Dental & Aesthetic Clinic, Civil Lines, Muzaffarnagar, Uttar Pradesh",
      timings: "Mon - Sat: 10:00 AM - 08:00 PM | Sunday: By Exclusive Appointment",
      emergencyHelpline: "+91 63953 77355"
    },
    team: [
      {
        id: "doc-1",
        name: "Dr. Zoya Rana",
        role: "Director",
        qualification: "Chief Aesthetic Physician & Cosmetologist",
        image: "/images/dr_zoya_rana.png",
        specialty: "Advanced Dermatology, Hair Restoration & Anti-Aging"
      },
      {
        id: "doc-2",
        name: "Dr. Zoya Talat",
        role: "Associate Specialist",
        qualification: "Cosmetic & Laser Aesthetic Physician",
        image: "/images/dr_zoya_talat.png",
        specialty: "Medical Facials, Chemical Peels & Skin Rejuvenation"
      },
      {
        id: "doc-3",
        name: "Dr. Varsha Jha",
        role: "Dental Surgeon",
        qualification: "BDS, Cosmetic Dentistry & Smile Specialist",
        image: "/images/dr_varsha_jha.png",
        specialty: "Painless Extractions, Root Canals, Veneers & Aligners"
      }
    ]
  },

  hero: {
    badge: "Official DNA Clinic India • Dr. Zoya",
    titlePrimary: "Advanced Skin, Hair &",
    titleHighlight: "Complete Dental Care",
    description: "Your destination for advanced medical aesthetics, painless digital smile architecture, and clinically guided hair restoration in Dehradun and Muzaffarnagar.",
    stats: [
      { label: "Successful Treatments", value: "15,000+" },
      { label: "Clinical Excellence", value: "12+ Years" },
      { label: "Verified Google Rating", value: "4.9 ★" },
      { label: "Stringent Sterilization", value: "100%" }
    ]
  },

  whyChooseUs: [
    {
      title: "Expert Team",
      desc: "Skilled, certified, experienced specialists focused on ethical patient outcomes."
    },
    {
      title: "Modern Technology",
      desc: "Cutting-edge US-FDA approved lasers, digital 3D intraoral scanners, and sterile suites."
    },
    {
      title: "All-in-One Clinic",
      desc: "Skin rejuvenation, hair growth therapies, cosmetic dentistry, and dental implants under one roof."
    },
    {
      title: "Pain-Free Treatments",
      desc: "Comfort-first approach with advanced topical numbing and minimally invasive protocols."
    },
    {
      title: "Strict Hygiene",
      desc: "Hospital-grade multi-stage autoclave sterilization and disposable instruments."
    },
    {
      title: "Personalized Care",
      desc: "Tailored diagnosis and customized treatment roadmaps crafted for your individual anatomy."
    }
  ],

  treatments: [
    {
      id: "hydrafacial-md",
      title: "Advanced Medical Facials & Glow Therapy",
      category: "Skin Care",
      subCategory: "Skin Rejuvenation",
      duration: "50 Mins",
      price: "₹6,500",
      advanceFee: 500,
      description: "Deep vortex pore purification, clinical exfoliation, and intense hyaluronic infusion for long-lasting radiant glass skin with zero downtime.",
      benefits: ["Instant Red Carpet Radiance", "Purges Blackheads & Congestion", "Unclogs Dermal Pores", "Improves Texture & Tone"],
      isPopular: true,
      image: "/images/advanced_facials.png"
    },
    {
      id: "pico-laser-pigmentation",
      title: "Pigmentation, Melasma & Acne Scar Care",
      category: "Skin Care",
      subCategory: "Laser Technology",
      duration: "45 Mins",
      price: "₹8,500",
      advanceFee: 500,
      description: "High-precision laser and peel protocols to clear stubborn melasma, post-acne dark marks, and sun spots while stimulating fresh collagen.",
      benefits: ["Targeted Melasma Clearance", "Safe for Indian Skin Types", "Collagen Remodeling", "Painless with Topical Numbing"],
      isPopular: true,
      image: "/images/advanced_facials.png"
    },
    {
      id: "general-dentistry",
      title: "Painless General Dentistry & Root Canal",
      category: "Dental Care",
      subCategory: "General Dentistry",
      duration: "45 Mins",
      price: "₹2,500",
      advanceFee: 500,
      description: "Comfort-focused single-sitting rotary root canal therapy, tooth-colored aesthetic fillings, and gentle extractions by Dr. Varsha Jha.",
      benefits: ["100% Pain-Free Experience", "Microscope Assisted Precision", "Preserves Natural Tooth Structure", "Hospital-Grade Sterilization"],
      isPopular: true,
      image: "/images/general_dentistry.png"
    },
    {
      id: "invisalign-smile",
      title: "Braces, Invisible Aligners & Smile Designing",
      category: "Dental Care",
      subCategory: "Smile Architecture",
      duration: "6 - 12 Months",
      price: "From ₹65,000",
      advanceFee: 1000,
      description: "Custom digital clear aligners and handcrafted ceramic veneers designed with 3D digital smile simulation for straight, pearlescent teeth.",
      benefits: ["100% Discreet & Clear", "Comfortable & Removable", "Pre-Visualized 3D Digital Result", "Permanent Stain-Resistant Veneers"],
      isPopular: true,
      image: "/images/general_dentistry.png"
    },
    {
      id: "hair-growth-prp",
      title: "Clinical Hair Growth Therapy & PRP / GFC",
      category: "Hair Care",
      subCategory: "Hair Rejuvenation",
      duration: "60 Mins",
      price: "₹6,500",
      advanceFee: 500,
      description: "Next-generation concentrated growth factors and PRP micro-injections directly into the scalp to halt hair thinning and awaken dormant follicles.",
      benefits: ["Stops Active Hair Fall in 3 Sessions", "Increases Hair Shaft Thickness", "Stimulates Dormant Roots", "Clinically Proven Scalp Therapy"],
      isPopular: true,
      image: "/images/hair_rejuvenation.png"
    },
    {
      id: "hair-transplant",
      title: "FUE Hair Transplant Consultation & Scalp Care",
      category: "Hair Care",
      subCategory: "Hair Restoration",
      duration: "Consultation",
      price: "₹1,000 Consult",
      advanceFee: 500,
      description: "Advanced graft density assessment, hairline architectural planning, and minimally invasive FUE follicular unit extraction.",
      benefits: ["Natural Undetectable Hairline", "Maximum Graft Survival Rate", "Doctor Supervised Protocol", "Permanent Lifetime Results"],
      isPopular: false,
      image: "/images/hair_rejuvenation.png"
    },
    {
      id: "anti-aging-botox-fillers",
      title: "Anti-Aging, Baby Botox & Dermal Contouring",
      category: "Skin Care",
      subCategory: "Aesthetic Medicine",
      duration: "30 Mins",
      price: "From ₹450 / unit",
      advanceFee: 500,
      description: "Micro-dosed wrinkle relaxers and Juvederm hyaluronic fillers strategically placed by Dr. Zoya Rana for a naturally refreshed look.",
      benefits: ["Erases Forehead Lines & Crow's Feet", "Zero Frozen Look", "Restores Youthful Cheek & Lip Volume", "Long-Lasting 12-18 Months"],
      isPopular: true,
      image: "/images/advanced_facials.png"
    },
    {
      id: "teeth-whitening",
      title: "In-Office Laser Teeth Whitening",
      category: "Dental Care",
      subCategory: "Cosmetic Dentistry",
      duration: "45 Mins",
      price: "₹8,500",
      advanceFee: 500,
      description: "Fast-acting clinical light-activated whitening system that safely lifts up to 6-8 shades of deep stains from tea, coffee, and tobacco.",
      benefits: ["Instant Same-Day Brightening", "Enamel-Safe Formulation", "Post-Treatment Sensitivity Barrier", "Long-Lasting Radiant Smile"],
      isPopular: false,
      image: "/images/general_dentistry.png"
    }
  ],

  transformations: [
    {
      id: "trans-smile",
      patientLabel: "Verified Dental Patient",
      concern: "Severe Discoloration & Incisal Edge Damage",
      treatmentUsed: "Handcrafted Ceramic Smile Makeover + Laser Whitening",
      turnaround: "2 Clinical Visits",
      resultDescription: "Complete restoration of tooth proportion, uniform bright white shade, and natural incisal translucency.",
      category: "Smile",
      beforeImage: "/images/ba_smile_before.png",
      afterImage: "/images/ba_smile_after.png"
    },
    {
      id: "trans-skin",
      patientLabel: "Verified Skin Patient",
      concern: "Active Breakouts, Open Pores & Pigment Texture",
      treatmentUsed: "Medical Facial Protocol + Dermal Peels & Home Regimen",
      turnaround: "6 Weeks",
      resultDescription: "Clearance of active pustules, refined pore diameter, and restored radiant epidermal skin barrier.",
      category: "Skin",
      beforeImage: "/images/ba_skin_before.png",
      afterImage: "/images/ba_skin_after.png"
    },
    {
      id: "trans-hair",
      patientLabel: "Verified Hair Patient",
      concern: "Male Pattern Hair Thinning & Receding Frontal Zone",
      treatmentUsed: "Clinical PRP & Growth Factor Concentrate Scalp Therapy",
      turnaround: "4 Months",
      resultDescription: "45% increase in visible follicle density with cessation of shedding and healthy scalp environment.",
      category: "Hair",
      beforeImage: "/images/ba_skin_before.png",
      afterImage: "/images/ba_skin_after.png"
    }
  ],

  testimonials: [
    {
      id: "rev-1",
      name: "Firoz Khan",
      location: "Verified Google Review",
      verifiedProcedure: "Skin & Hair Consultation",
      rating: 5,
      date: "Recent Google Review",
      text: "DNA is one of the best Skin Dental and hair solution center. Very good consultation by Dr. Zoya Rana. The staff is polite and treatments are really effective."
    },
    {
      id: "rev-2",
      name: "Jaynab Zareen",
      location: "Verified Google Review",
      verifiedProcedure: "Painless Tooth Extraction & Care",
      rating: 5,
      date: "Recent Google Review",
      text: "I recently visited Dr. Varsha for a tooth extraction, and she was very patient and understanding. The procedure was completely painless. Highly recommended!"
    },
    {
      id: "rev-3",
      name: "Harshit Sharma",
      location: "Verified Google Review",
      verifiedProcedure: "Aesthetic Treatment",
      rating: 5,
      date: "Recent Google Review",
      text: "Ma'am behaviour is very nice, advised good treatment. The staff is amazing, especially women staff are very nice and cooperative."
    },
    {
      id: "rev-4",
      name: "Sachin Choudhary",
      location: "Verified Google Review",
      verifiedProcedure: "Skin & Dental Care",
      rating: 5,
      date: "Recent Google Review",
      text: "Polite behaviour and suggested very good treatment by Ma'am. I am completely happy with the treatment results at DNA Clinic."
    }
  ],

  instagramFeed: [
    { id: "ig-1", image: "/images/insta_1.webp", title: "Skin Rejuvenation Results" },
    { id: "ig-2", image: "/images/insta_2.webp", title: "Smile Designing" },
    { id: "ig-3", image: "/images/insta_3.webp", title: "Hair Growth Therapy" },
    { id: "ig-4", image: "/images/insta_4.webp", title: "Patient Transformation" },
    { id: "ig-5", image: "/images/insta_5.webp", title: "Clinic Treatment" }
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Incisal Edge Ceramic Smile Restoration",
      category: "Smile",
      type: "before_after",
      beforeImage: "/images/ba_smile_before.png",
      afterImage: "/images/ba_smile_after.png",
      description: "Full cosmetic dental rehabilitation restoring symmetry, bright natural shade, and incisal translucency.",
      timeline: "2 Clinical Sittings",
      clinician: "Dr. Varsha Jha & Dr. Zoya Rana"
    },
    {
      id: "gal-2",
      title: "Active Acne & Dermal Texture Reset",
      category: "Skin",
      type: "before_after",
      beforeImage: "/images/ba_skin_before.png",
      afterImage: "/images/ba_skin_after.png",
      description: "Deep vortex pore clearance with customized medical facial protocol and barrier restoration.",
      timeline: "6 Weeks Protocol",
      clinician: "Dr. Zoya Rana"
    },
    {
      id: "gal-3",
      title: "State-of-the-Art Aesthetic Suite",
      category: "Clinic & Tech",
      type: "single",
      image: "/images/dna_banner1.png",
      description: "Hospital-grade multi-stage sterilization and ergonomic patient consultation suites.",
      timeline: "Infrastructure",
      clinician: "DNA Clinics (Dehradun & Muzaffarnagar)"
    },
    {
      id: "gal-4",
      title: "Painless Endodontics & Cosmetic Operatory",
      category: "Clinic & Tech",
      type: "single",
      image: "/images/general_dentistry.png",
      description: "Microscope-assisted dentistry and computerized digital smile design suites.",
      timeline: "Infrastructure",
      clinician: "Dr. Varsha Jha"
    },
    {
      id: "gal-5",
      title: "Laser Dermatology & Medical Facial Station",
      category: "Skin",
      type: "single",
      image: "/images/advanced_facials.png",
      description: "US-FDA certified laser technology for targeted pigment and anti-aging skin clearance.",
      timeline: "Infrastructure",
      clinician: "Dr. Zoya Rana"
    },
    {
      id: "gal-6",
      title: "PRP & Scalp Rejuvenation Unit",
      category: "Hair",
      type: "single",
      image: "/images/hair_rejuvenation.png",
      description: "Clinical growth factor concentrate and microneedling therapy for hair restoration.",
      timeline: "Infrastructure",
      clinician: "Dr. Zoya Talat"
    },
    {
      id: "gal-7",
      title: "Aesthetic Laser Technology Suite",
      category: "Clinic & Tech",
      type: "single",
      image: "/images/dna_banner2.png",
      description: "Non-invasive laser facial rejuvenation and collagen induction therapy.",
      timeline: "Technology",
      clinician: "DNA Clinic"
    },
    {
      id: "gal-8",
      title: "Clinical Hair Protocol Demonstration",
      category: "Hair",
      type: "single",
      image: "/images/dna_banner3.png",
      description: "Scalp revitalization and follicular strengthening with growth factor protocols.",
      timeline: "Clinical Care",
      clinician: "Dr. Zoya Rana"
    },
    {
      id: "gal-9",
      title: "Instagram Case: Skin Rejuvenation Glow",
      category: "Instagram",
      type: "single",
      image: "/images/insta_1.webp",
      description: "Immediate post-treatment radiant glow after clinical hydra dermabrasion.",
      timeline: "Live Feed",
      clinician: "@dnaclinicindia"
    },
    {
      id: "gal-10",
      title: "Instagram Case: Smile Designing Veneers",
      category: "Instagram",
      type: "single",
      image: "/images/insta_2.webp",
      description: "Ultra-thin ceramic veneers fitted with precision digital margins.",
      timeline: "Live Feed",
      clinician: "@dnaclinicindia"
    },
    {
      id: "gal-11",
      title: "Instagram Case: Clinical Hair Density Protocol",
      category: "Instagram",
      type: "single",
      image: "/images/insta_3.webp",
      description: "Follicular density boost after sessions of scalp PRP therapy.",
      timeline: "Live Feed",
      clinician: "@dnaclinicindia"
    },
    {
      id: "gal-12",
      title: "Instagram Case: Dermal Glow Transformation",
      category: "Instagram",
      type: "single",
      image: "/images/insta_4.webp",
      description: "Clearance of blemishes, even skin tone, and luminous hydration.",
      timeline: "Live Feed",
      clinician: "@dnaclinicindia"
    },
    {
      id: "gal-13",
      title: "Instagram Case: Doctor-Led Treatment Session",
      category: "Instagram",
      type: "single",
      image: "/images/insta_5.webp",
      description: "Doctor-led procedural care with gentle numbing and patient comfort.",
      timeline: "Live Feed",
      clinician: "@dnaclinicindia"
    }
  ],

  faqs: [
    {
      question: "Where are DNA Clinics located?",
      answer: "DNA Clinics operate modern, fully-equipped centres in both Dehradun (Uttarakhand) and Muzaffarnagar (Uttar Pradesh). You can consult Dr. Zoya Rana, Dr. Zoya Talat, and Dr. Varsha Jha at either centre by prior booking."
    },
    {
      question: "How do I book an appointment with Dr. Zoya Rana?",
      answer: "You can book directly through this website using the 'Book Consultation' button (advance fees ₹500 or ₹1,000 for VIP priority slot), call our priority line at +91 63953 77355, or chat with our 24/7 Smart WhatsApp Bot."
    },
    {
      question: "Are dental treatments really pain-free?",
      answer: "Yes! At DNA Clinic, comfort comes first. Dr. Varsha Jha employs gentle local anesthesia, computer-assisted numbing, and modern rotary instruments so you feel relaxed and completely pain-free."
    },
    {
      question: "Is the advance consultation fee deductible?",
      answer: "Yes, 100% of the advance consultation fee (₹500 or ₹1,000) is adjusted against any treatment or procedure package you receive on your appointment day."
    },
    {
      question: "What hair fall treatments do you offer?",
      answer: "We provide comprehensive hair fall therapy including autologous PRP (Platelet-Rich Plasma), Growth Factor Concentrate (GFC), scalp detox, and hair transplant surgical consultations."
    }
  ]
};

export const initialSeedAppointments = [
  {
    id: "APT-2026-101",
    patientName: "Aastha Grover",
    phone: "+91 63953 77355",
    email: "aastha.g@gmail.com",
    treatment: "Advanced Medical Facials & Glow Therapy",
    category: "Skin Care",
    date: "2026-09-20",
    timeSlot: "11:30 AM - 12:30 PM",
    feeAmount: 500,
    paymentStatus: "Paid (Advance Verified)",
    leadSource: "Website Pre-Paid Booking",
    status: "Confirmed",
    notes: "Patient inquiring about glow treatment at Dehradun clinic.",
    createdAt: "2026-09-16 10:15 AM"
  },
  {
    id: "APT-2026-102",
    patientName: "Vikram Singhania",
    phone: "+91 99201 88321",
    email: "vikram.s@outlook.com",
    treatment: "Braces, Invisible Aligners & Smile Designing",
    category: "Dental Care",
    date: "2026-09-21",
    timeSlot: "03:00 PM - 04:00 PM",
    feeAmount: 1000,
    paymentStatus: "Paid (Advance Verified)",
    leadSource: "AI Smile Analyzer",
    status: "New",
    notes: "Consultation requested with Dr. Varsha Jha for 3D aligner scan.",
    createdAt: "2026-09-16 11:45 AM"
  },
  {
    id: "APT-2026-103",
    patientName: "Dr. Natasha Roy",
    phone: "+91 97177 55432",
    email: "natasha.roy@hospital.org",
    treatment: "Anti-Aging, Baby Botox & Dermal Contouring",
    category: "Skin Care",
    date: "2026-09-22",
    timeSlot: "05:30 PM - 06:15 PM",
    feeAmount: 500,
    paymentStatus: "Pending at Clinic",
    leadSource: "Smart WhatsApp Bot",
    status: "Contacted",
    notes: "Inquired about facial rejuvenation with Dr. Zoya Rana.",
    createdAt: "2026-09-16 01:20 PM"
  }
];
