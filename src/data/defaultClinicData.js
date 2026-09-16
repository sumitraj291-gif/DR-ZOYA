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
    // 1. DENTAL CARE & SMILE DESIGNING CASES FROM https://dnaclinicindia.com/gallery/
    {
      id: "gal-smile-1",
      title: "Incisal Edge Ceramic Smile Restoration",
      category: "Smile",
      type: "before_after",
      beforeImage: "/images/ba_smile_before.png",
      afterImage: "/images/ba_smile_after.png",
      description: "Full cosmetic dental rehabilitation restoring incisal translucency, tooth proportion, and natural bright shade.",
      timeline: "2 Clinical Sittings",
      clinician: "Dr. Varsha Jha & Dr. Zoya Rana"
    },
    {
      id: "gal-braces-1",
      title: "Invisible Aligners & Orthodontic Smile Architecture",
      category: "Smile",
      type: "single",
      image: "/images/gallery/braces_aligners_1.png",
      description: "Computer-guided digital clear aligners custom planned for crowded and misaligned anterior teeth.",
      timeline: "6 - 9 Months",
      clinician: "Dr. Varsha Jha (Dental Surgeon)"
    },
    {
      id: "gal-braces-2",
      title: "Digital Smile Designing & Aligner Alignment",
      category: "Smile",
      type: "single",
      image: "/images/gallery/braces_aligners_2.png",
      description: "Precision orthodontic correction using discreet, removable medical-grade clear aligners.",
      timeline: "Comprehensive Care",
      clinician: "Dr. Varsha Jha"
    },
    {
      id: "gal-implant-1",
      title: "Titanium Dental Implant & Crown Replacement",
      category: "Smile",
      type: "single",
      image: "/images/gallery/dental_implants_1.png",
      description: "Permanent bio-compatible titanium root replacement restored with zirconia lifelike crown.",
      timeline: "Single Sitting + Osseointegration",
      clinician: "Dr. Varsha Jha"
    },
    {
      id: "gal-implant-2",
      title: "Full Arch Implant Rehabilitation",
      category: "Smile",
      type: "single",
      image: "/images/gallery/dental_implants_2.png",
      description: "Advanced implantology restoring complete chewing functionality and facial profile balance.",
      timeline: "Specialist Protocol",
      clinician: "Dr. Varsha Jha"
    },
    {
      id: "gal-rct-1",
      title: "Painless Rotary Endodontics & Micro-Restoration",
      category: "Smile",
      type: "single",
      image: "/images/gallery/root_canal_1.png",
      description: "Microscope-assisted painless single-visit root canal therapy preserving the natural tooth anatomy.",
      timeline: "45 Mins (Single Visit)",
      clinician: "Dr. Varsha Jha"
    },
    {
      id: "gal-gen-dent",
      title: "Aesthetic Composite Fillings & General Operatory",
      category: "Smile",
      type: "single",
      image: "/images/gallery/general_dentistry_2.png",
      description: "Tooth-colored nano-hybrid fillings with hospital-grade multi-stage sterilization protocols.",
      timeline: "Preventive Care",
      clinician: "Dr. Varsha Jha"
    },

    // 2. SKIN CARE & AESTHETIC DERMATOLOGY CASES FROM https://dnaclinicindia.com/gallery/
    {
      id: "gal-skin-1",
      title: "Active Acne & Dermal Texture Reset",
      category: "Skin",
      type: "before_after",
      beforeImage: "/images/ba_skin_before.png",
      afterImage: "/images/ba_skin_after.png",
      description: "Deep pore clearance with customized medical facial protocol, chemical peeling, and barrier restoration.",
      timeline: "6 Weeks Protocol",
      clinician: "Dr. Zoya Rana (Director)"
    },
    {
      id: "gal-glow-1",
      title: "Medical Glow Therapy & Deep Hydration Infusion",
      category: "Skin",
      type: "single",
      image: "/images/gallery/glow_therapy_1.png",
      description: "Clinical hyaluronic and antioxidant infusion for immediate red-carpet luminosity and glass skin texture.",
      timeline: "50 Mins Protocol",
      clinician: "Dr. Zoya Rana"
    },
    {
      id: "gal-glow-2",
      title: "Radiant Skin Tone & Dermal Hydration",
      category: "Skin",
      type: "single",
      image: "/images/gallery/glow_therapy_2.png",
      description: "Intense dermal nourishment targeting dullness, uneven complexion, and environmental oxidative stress.",
      timeline: "Instant Radiance",
      clinician: "Dr. Zoya Rana"
    },
    {
      id: "gal-acne-1",
      title: "Medical-Grade Acne Clearance Protocol",
      category: "Skin",
      type: "single",
      image: "/images/gallery/acne_treatment_1.png",
      description: "Targeted salicylic peels and blue light phototherapy to calm active inflammation and eradicate bacteria.",
      timeline: "4 - 6 Sessions",
      clinician: "Dr. Zoya Rana"
    },
    {
      id: "gal-acne-2",
      title: "Post-Acne Scar Remodeling & Pore Refinement",
      category: "Skin",
      type: "single",
      image: "/images/gallery/acne_treatment_2.png",
      description: "Microneedling and collagen induction therapy to smooth out pitted scars and texture irregularities.",
      timeline: "Sequential Care",
      clinician: "Dr. Zoya Rana"
    },
    {
      id: "gal-facials-1",
      title: "Advanced Medical Hydra Facial Suite",
      category: "Skin",
      type: "single",
      image: "/images/gallery/advanced_facials_1.png",
      description: "Vortex suction pore purification and nutrient infusion with US-FDA approved clinical instruments.",
      timeline: "Monthly Maintenance",
      clinician: "Dr. Zoya Rana"
    },
    {
      id: "gal-facials-2",
      title: "Clinical Exfoliation & Epidermal Polish",
      category: "Skin",
      type: "single",
      image: "/images/gallery/advanced_facials_2.png",
      description: "Gentle clinical peeling and epidermal polishing leaving skin smooth, supple, and radiant.",
      timeline: "Zero Downtime",
      clinician: "Dr. Zoya Rana"
    },
    {
      id: "gal-anti-age",
      title: "Anti-Ageing Collagen Induction & Fine Line Softening",
      category: "Skin",
      type: "single",
      image: "/images/gallery/anti_ageing_2.png",
      description: "Non-invasive dermal firming and targeted peptide delivery to restore youthful bounce and firmness.",
      timeline: "Preventive Anti-Aging",
      clinician: "Dr. Zoya Rana"
    },
    {
      id: "gal-skin-rej",
      title: "Laser Skin Rejuvenation & Melasma Management",
      category: "Skin",
      type: "single",
      image: "/images/gallery/skin_rejuvenation_2.png",
      description: "Q-switched pigment clearance and gentle collagen stimulation for Indian skin types.",
      timeline: "3 - 5 Sessions",
      clinician: "Dr. Zoya Talat"
    },

    // 3. CLINICAL OUTCOME SHOWCASES DIRECT FROM https://dnaclinicindia.com/gallery/
    {
      id: "gal-dna-01",
      title: "DNA Clinical Case: Comprehensive Smile Reconstruction",
      category: "Smile",
      type: "single",
      image: "/images/gallery/dna_gallery_01.png",
      description: "Documented smile makeover case restoring symmetry, aesthetics, and bite alignment.",
      timeline: "Clinical Case 01",
      clinician: "DNA Clinic Team"
    },
    {
      id: "gal-dna-02",
      title: "DNA Clinical Case: Anterior Dental Restorations",
      category: "Smile",
      type: "single",
      image: "/images/gallery/dna_gallery_02.png",
      description: "Precision ceramic incisal veneers crafted to match natural tooth translucency.",
      timeline: "Clinical Case 02",
      clinician: "Dr. Varsha Jha"
    },
    {
      id: "gal-dna-03",
      title: "DNA Clinical Case: Laser Skin Tone Perfection",
      category: "Skin",
      type: "single",
      image: "/images/gallery/dna_gallery_03.png",
      description: "Even tone and blemish elimination through personalized dermatological protocol.",
      timeline: "Clinical Case 03",
      clinician: "Dr. Zoya Rana"
    },
    {
      id: "gal-dna-05",
      title: "DNA Clinical Case: Dermal Glow & Texture Polish",
      category: "Skin",
      type: "single",
      image: "/images/gallery/dna_gallery_05.png",
      description: "Restoration of glowing complexion and reduction in congested pores.",
      timeline: "Clinical Case 05",
      clinician: "Dr. Zoya Rana"
    },
    {
      id: "gal-dna-06",
      title: "DNA Clinical Case: Cosmetic Dentistry Outcome",
      category: "Smile",
      type: "single",
      image: "/images/gallery/dna_gallery_06.png",
      description: "Straight, bright, uniform aesthetic outcome for dental makeover patient.",
      timeline: "Clinical Case 06",
      clinician: "Dr. Varsha Jha"
    },
    {
      id: "gal-dna-08",
      title: "DNA Clinical Case: Skin Barrier Renewal",
      category: "Skin",
      type: "single",
      image: "/images/gallery/dna_gallery_08.png",
      description: "Restoring sensitive dermal barrier with gentle medical-grade nourishment.",
      timeline: "Clinical Case 08",
      clinician: "Dr. Zoya Talat"
    },
    {
      id: "gal-dna-09",
      title: "DNA Clinical Case: Clear Aligners Result",
      category: "Smile",
      type: "single",
      image: "/images/gallery/dna_gallery_09.png",
      description: "Complete closure of dental diastema and harmonious smile curve.",
      timeline: "Clinical Case 09",
      clinician: "Dr. Varsha Jha"
    },
    {
      id: "gal-dna-10",
      title: "DNA Clinical Case: Laser Facial Resurfacing",
      category: "Skin",
      type: "single",
      image: "/images/gallery/dna_gallery_10.png",
      description: "Smoothing of coarse skin texture and elimination of sun spots.",
      timeline: "Clinical Case 10",
      clinician: "Dr. Zoya Rana"
    },
    {
      id: "gal-dna-11",
      title: "DNA Clinical Case: Advanced Hair Growth Protocol",
      category: "Hair",
      type: "single",
      image: "/images/gallery/dna_gallery_11.png",
      description: "Follicular density boost with growth factor concentrate (GFC) scalp therapy.",
      timeline: "Clinical Case 11",
      clinician: "Dr. Zoya Rana & Dr. Zoya Talat"
    },
    {
      id: "gal-dna-12",
      title: "DNA Clinical Case: Aesthetic Smile Makeover",
      category: "Smile",
      type: "single",
      image: "/images/gallery/dna_gallery_12.png",
      description: "Hollywood smile transformation with ultra-thin porcelain veneers.",
      timeline: "Clinical Case 12",
      clinician: "Dr. Varsha Jha"
    },
    {
      id: "gal-dna-13",
      title: "DNA Clinical Case: Pigmentation & Melasma Clearance",
      category: "Skin",
      type: "single",
      image: "/images/gallery/dna_gallery_13.png",
      description: "Deep melasma fading with targeted medical laser protocols.",
      timeline: "Clinical Case 13",
      clinician: "Dr. Zoya Rana"
    },

    // 4. CLINIC SUITES & INFRASTRUCTURE
    {
      id: "gal-suite-1",
      title: "State-of-the-Art Aesthetic Suite",
      category: "Clinic & Tech",
      type: "single",
      image: "/images/dna_banner1.png",
      description: "Hospital-grade multi-stage sterilization and ergonomic patient consultation suites.",
      timeline: "Infrastructure",
      clinician: "DNA Clinics (Dehradun & Muzaffarnagar)"
    },
    {
      id: "gal-suite-2",
      title: "Aesthetic Laser Technology Suite",
      category: "Clinic & Tech",
      type: "single",
      image: "/images/dna_banner2.png",
      description: "Non-invasive laser facial rejuvenation and collagen induction therapy.",
      timeline: "Technology",
      clinician: "DNA Clinic"
    },
    {
      id: "gal-suite-3",
      title: "Scalp PRP & Clinical Hair Unit",
      category: "Hair",
      type: "single",
      image: "/images/hair_rejuvenation.png",
      description: "Clinical growth factor concentrate and microneedling therapy for hair restoration.",
      timeline: "Infrastructure",
      clinician: "Dr. Zoya Talat"
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
