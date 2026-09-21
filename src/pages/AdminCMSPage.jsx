import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  SlidersHorizontal, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  RotateCcw, 
  ExternalLink, 
  Search, 
  Phone, 
  MessageCircle, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Star,
  Check,
  X,
  Camera,
  Layers,
  Maximize2,
  Upload,
  UserCheck,
  UserPlus,
  Image as ImageIcon,
  MapPin,
  GraduationCap
} from 'lucide-react';

export const AdminCMSPage = () => {
  const { 
    clinicData, 
    updateProfile, 
    updateHero, 
    addTreatment, 
    updateTreatment, 
    deleteTreatment,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    updateDoctorTeam,
    addTestimonial,
    deleteTestimonial,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    resetToDefaults,
    appointments, 
    updateAppointmentStatus, 
    deleteAppointment,
    navigateTo,
    showToast 
  } = useClinic();

  const [activeTab, setActiveTab] = useState('crm'); // 'crm', 'treatments', 'doctors', 'profile', 'hero', 'testimonials'
  
  // CRM Filters
  const [crmStatusFilter, setCrmStatusFilter] = useState('All');
  const [crmSearch, setCrmSearch] = useState('');

  // CMS Profile Form state
  const [profileForm, setProfileForm] = useState(clinicData.profile);
  // CMS Hero Form state
  const [heroForm, setHeroForm] = useState(clinicData.hero);

  // New Treatment Modal / Form State
  const [isAddingTreatment, setIsAddingTreatment] = useState(false);
  const [newTreatment, setNewTreatment] = useState({
    title: '',
    category: 'Aesthetic Dermatology',
    subCategory: 'Clinical Skin Care',
    duration: '45 Mins',
    price: '₹7,500',
    advanceFee: 500,
    description: '',
    benefitsStr: 'Instant Radiance, Zero Downtime, Collagen Stimulation',
    image: '/images/advanced_facials.png'
  });

  // Editing existing treatment state
  const [editingTreatmentId, setEditingTreatmentId] = useState(null);
  const [editingTreatmentForm, setEditingTreatmentForm] = useState(null);

  // New Testimonial State
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    location: 'Gurugram',
    verifiedProcedure: 'HydraFacial Elite MD',
    rating: 5,
    date: 'September 2026',
    text: ''
  });

  // Gallery CMS State
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('All');
  const [gallerySearch, setGallerySearch] = useState('');
  const [isAddingGallery, setIsAddingGallery] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    category: 'Smile',
    type: 'before_after',
    beforeImage: '/images/ba_smile_before.png',
    afterImage: '/images/ba_smile_after.png',
    image: '/images/dna_banner1.png',
    description: '',
    timeline: '2 Clinical Sittings',
    clinician: 'Dr. Varsha Jha & Dr. Zoya Rana'
  });

  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [editingGalleryForm, setEditingGalleryForm] = useState(null);

  // Doctor CMS State
  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [editingDoctorForm, setEditingDoctorForm] = useState(null);
  const [isAddingDoctor, setIsAddingDoctor] = useState(false);
  const [newDoctorForm, setNewDoctorForm] = useState({
    name: '',
    role: 'Specialist',
    qualification: '',
    specialty: '',
    image: '/images/dr_zoya_rana.png',
    location: 'Dehradun & Muzaffarnagar Clinics',
    bio: '',
  });

  // Doctor photo presets
  const doctorPhotoPresets = [
    { label: 'Dr. Zoya Rana', path: '/images/dr_zoya_rana.png' },
    { label: 'Dr. Zoya Talat', path: '/images/dr_zoya_talat.png' },
    { label: 'Dr. Varsha Jha', path: '/images/dr_varsha_jha.png' },
    { label: 'Dr. Zoya (Alt)', path: '/images/dr_zoya.png' },
    { label: 'Dr. Varsha (Alt)', path: '/images/dr_varsha.png' },
  ];

  // Compress & convert uploaded image to base64 data URL (max 600x600px)
  const compressImageToDataUrl = (file, maxSize = 600) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/webp', 0.82));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const availableImagePresets = [
    // Live Gallery Assets from dnaclinicindia.com/gallery/
    { label: 'Glow Therapy 1', path: '/images/gallery/glow_therapy_1.png' },
    { label: 'Glow Therapy 2', path: '/images/gallery/glow_therapy_2.png' },
    { label: 'Acne Treatment 1', path: '/images/gallery/acne_treatment_1.png' },
    { label: 'Acne Treatment 2', path: '/images/gallery/acne_treatment_2.png' },
    { label: 'Advanced Facials 1', path: '/images/gallery/advanced_facials_1.png' },
    { label: 'Advanced Facials 2', path: '/images/gallery/advanced_facials_2.png' },
    { label: 'Anti Ageing', path: '/images/gallery/anti_ageing_2.png' },
    { label: 'Skin Rejuvenation', path: '/images/gallery/skin_rejuvenation_2.png' },
    { label: 'Root Canal Therapy', path: '/images/gallery/root_canal_1.png' },
    { label: 'General Dentistry', path: '/images/gallery/general_dentistry_2.png' },
    { label: 'Dental Implants 1', path: '/images/gallery/dental_implants_1.png' },
    { label: 'Dental Implants 2', path: '/images/gallery/dental_implants_2.png' },
    { label: 'Braces & Aligners 1', path: '/images/gallery/braces_aligners_1.png' },
    { label: 'Braces & Aligners 2', path: '/images/gallery/braces_aligners_2.png' },
    { label: 'DNA Case 01', path: '/images/gallery/dna_gallery_01.png' },
    { label: 'DNA Case 02', path: '/images/gallery/dna_gallery_02.png' },
    { label: 'DNA Case 03', path: '/images/gallery/dna_gallery_03.png' },
    { label: 'DNA Case 05', path: '/images/gallery/dna_gallery_05.png' },
    { label: 'DNA Case 06', path: '/images/gallery/dna_gallery_06.png' },
    { label: 'DNA Case 08', path: '/images/gallery/dna_gallery_08.png' },
    { label: 'DNA Case 09', path: '/images/gallery/dna_gallery_09.png' },
    { label: 'DNA Case 10', path: '/images/gallery/dna_gallery_10.png' },
    { label: 'DNA Case 11', path: '/images/gallery/dna_gallery_11.png' },
    { label: 'DNA Case 12', path: '/images/gallery/dna_gallery_12.png' },
    { label: 'DNA Case 13', path: '/images/gallery/dna_gallery_13.png' },
    
    // Core Banners & Clinicians
    { label: 'Smile Before', path: '/images/ba_smile_before.png' },
    { label: 'Smile After', path: '/images/ba_smile_after.png' },
    { label: 'Skin Before', path: '/images/ba_skin_before.png' },
    { label: 'Skin After', path: '/images/ba_skin_after.png' },
    { label: 'Aesthetic Suite 1', path: '/images/dna_banner1.png' },
    { label: 'Laser Tech Suite 2', path: '/images/dna_banner2.png' },
    { label: 'Hair Care Suite 3', path: '/images/dna_banner3.png' },
    { label: 'Dr. Zoya Rana', path: '/images/dr_zoya_rana.png' },
    { label: 'Dr. Zoya Talat', path: '/images/dr_zoya_talat.png' },
    { label: 'Dr. Varsha Jha', path: '/images/dr_varsha_jha.png' }
  ];

  // Filtered appointments for CRM
  const filteredAppointments = appointments.filter(apt => {
    const matchesStatus = crmStatusFilter === 'All' || apt.status === crmStatusFilter;
    const matchesSearch = apt.patientName?.toLowerCase().includes(crmSearch.toLowerCase()) ||
                          apt.phone?.includes(crmSearch) ||
                          apt.treatment?.toLowerCase().includes(crmSearch.toLowerCase()) ||
                          apt.id?.toLowerCase().includes(crmSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Metrics calculation
  const totalRevenue = appointments.reduce((acc, curr) => acc + (Number(curr.feeAmount) || 0), 0);
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;

  const handleExportCSV = () => {
    const headers = ["Booking ID", "Patient Name", "Phone", "Email", "Treatment", "Date", "Slot", "Fee", "Payment Status", "Lead Source", "Status", "Notes", "Created At"];
    const rows = appointments.map(a => [
      `"${a.id}"`,
      `"${a.patientName}"`,
      `"${a.phone}"`,
      `"${a.email}"`,
      `"${a.treatment}"`,
      `"${a.date}"`,
      `"${a.timeSlot}"`,
      `"${a.feeAmount}"`,
      `"${a.paymentStatus}"`,
      `"${a.leadSource}"`,
      `"${a.status}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`,
      `"${a.createdAt}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dr_zoya_clinic_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads CSV exported successfully!');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
  };

  const handleSaveHero = (e) => {
    e.preventDefault();
    updateHero(heroForm);
  };

  const handleCreateTreatment = (e) => {
    e.preventDefault();
    if (!newTreatment.title) {
      alert("Please enter treatment title");
      return;
    }
    const benefits = newTreatment.benefitsStr.split(',').map(b => b.trim()).filter(Boolean);
    addTreatment({
      id: `treat-${Date.now()}`,
      title: newTreatment.title,
      category: newTreatment.category,
      subCategory: newTreatment.subCategory,
      duration: newTreatment.duration,
      price: newTreatment.price,
      advanceFee: Number(newTreatment.advanceFee) || 500,
      description: newTreatment.description,
      benefits: benefits.length > 0 ? benefits : ["Clinical Excellence", "Doctor Supervised"],
      image: newTreatment.image
    });
    setIsAddingTreatment(false);
    setNewTreatment({
      title: '',
      category: 'Aesthetic Dermatology',
      subCategory: 'Clinical Skin Care',
      duration: '45 Mins',
      price: '₹7,500',
      advanceFee: 500,
      description: '',
      benefitsStr: 'Instant Radiance, Zero Downtime, Collagen Stimulation',
      image: '/images/advanced_facials.png'
    });
  };

  const handleStartEditTreatment = (treatment) => {
    setEditingTreatmentId(treatment.id);
    setEditingTreatmentForm({
      ...treatment,
      benefitsStr: treatment.benefits ? treatment.benefits.join(', ') : ''
    });
  };

  const handleSaveTreatmentEdit = () => {
    if (!editingTreatmentForm) return;
    const benefits = editingTreatmentForm.benefitsStr.split(',').map(b => b.trim()).filter(Boolean);
    updateTreatment(editingTreatmentId, {
      ...editingTreatmentForm,
      benefits: benefits.length > 0 ? benefits : editingTreatmentForm.benefits
    });
    setEditingTreatmentId(null);
    setEditingTreatmentForm(null);
  };

  const handleCreateReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) {
      alert("Please enter patient name and review content");
      return;
    }
    addTestimonial({
      id: `rev-${Date.now()}`,
      ...newReview
    });
    setIsAddingReview(false);
    setNewReview({
      name: '',
      location: 'Gurugram',
      verifiedProcedure: 'HydraFacial Elite MD',
      rating: 5,
      date: 'September 2026',
      text: ''
    });
  };

  const handleCreateGalleryItem = (e) => {
    e.preventDefault();
    if (!newGalleryItem.title.trim()) {
      alert("Please enter a case or media title.");
      return;
    }
    addGalleryItem(newGalleryItem);
    setIsAddingGallery(false);
    setNewGalleryItem({
      title: '',
      category: 'Smile',
      type: 'before_after',
      beforeImage: '/images/ba_smile_before.png',
      afterImage: '/images/ba_smile_after.png',
      image: '/images/dna_banner1.png',
      description: '',
      timeline: '2 Clinical Sittings',
      clinician: 'Dr. Varsha Jha & Dr. Zoya Rana'
    });
  };

  const handleStartEditGallery = (item) => {
    setEditingGalleryId(item.id);
    setEditingGalleryForm({ ...item });
  };

  const handleSaveEditGallery = (e) => {
    e.preventDefault();
    if (!editingGalleryForm.title.trim()) {
      alert("Title cannot be blank");
      return;
    }
    updateGalleryItem(editingGalleryId, editingGalleryForm);
    setEditingGalleryId(null);
    setEditingGalleryForm(null);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F6F5F2] min-h-screen">
      <div className="clinic-container space-y-8">
        
        {/* TOP BAR / CMS HEADER */}
        <div className="bg-[#090D14] text-white p-5 sm:p-6 rounded-3xl border border-[#C5A059]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#C5A059] flex items-center justify-center text-[#C5A059] font-serif text-2xl font-bold">
              Z
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Dr. Zoya Clinic Studio
                </h1>
                <span className="bg-[#C5A059] text-[#090D14] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Live CMS & CRM
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Any changes made here instantly synchronize across all public website pages.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => navigateTo('home')}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-white/10"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Preview Live Website</span>
            </button>

            <button
              onClick={resetToDefaults}
              className="bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              title="Revert to pristine defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="bg-white p-2 rounded-2xl border border-[#E8E2D9] shadow-subtle flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveTab('crm')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'crm'
                ? 'bg-[#0F172A] text-[#C5A059] shadow-xs'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Clinic CRM & Leads ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('treatments')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'treatments'
                ? 'bg-[#0F172A] text-[#C5A059] shadow-xs'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Treatments Catalog ({clinicData.treatments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'doctors'
                ? 'bg-[#0F172A] text-[#C5A059] shadow-xs'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Doctors Team ({(clinicData.profile.team || []).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'profile'
                ? 'bg-[#0F172A] text-[#C5A059] shadow-xs'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Doctor & Clinic Info</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'hero'
                ? 'bg-[#0F172A] text-[#C5A059] shadow-xs'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Hero & Trust Numbers</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'testimonials'
                ? 'bg-[#0F172A] text-[#C5A059] shadow-xs'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Patient Reviews ({clinicData.testimonials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              activeTab === 'gallery'
                ? 'bg-[#0F172A] text-[#C5A059] shadow-xs'
                : 'text-gray-600 hover:text-black hover:bg-gray-100'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Gallery & Media ({(clinicData.gallery || []).length})</span>
          </button>
        </div>

        {/* TAB 1: CLINIC CRM & LEADS MANAGEMENT (Phase 2C from PDF) */}
        {activeTab === 'crm' && (
          <div className="space-y-6">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-subtle space-y-1">
                <span className="text-[11px] font-bold uppercase text-gray-400">Total Patient Leads</span>
                <div className="font-serif text-3xl font-bold text-[#0F172A]">{appointments.length}</div>
                <div className="text-[10px] text-gray-500">From Web, WhatsApp Bot & AI Scanner</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-subtle space-y-1">
                <span className="text-[11px] font-bold uppercase text-gray-400">Confirmed Slots</span>
                <div className="font-serif text-3xl font-bold text-emerald-700">{confirmedCount}</div>
                <div className="text-[10px] text-emerald-600 font-medium">Ready for Doctor Consultation</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-subtle space-y-1">
                <span className="text-[11px] font-bold uppercase text-gray-400">Advance Fees Tracked</span>
                <div className="font-serif text-3xl font-bold text-[#0F172A]">₹{totalRevenue.toLocaleString()}</div>
                <div className="text-[10px] text-[#C5A059] font-medium">Phase 2 Pre-Paid Gateway (₹500/₹1k)</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-subtle space-y-1">
                <span className="text-[11px] font-bold uppercase text-gray-400">Conversion Rate</span>
                <div className="font-serif text-3xl font-bold text-[#0F172A]">
                  {appointments.length > 0 ? Math.round((confirmedCount / appointments.length) * 100) : 0}%
                </div>
                <div className="text-[10px] text-gray-500">High-intent clinical bookings</div>
              </div>
            </div>

            {/* Filter & Search Table Controls */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Status Pills */}
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                {['All', 'New', 'Confirmed', 'Contacted', 'Completed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setCrmStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      crmStatusFilter === st
                        ? 'bg-[#0F172A] text-[#C5A059]'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <input
                    type="text"
                    placeholder="Search name, phone, or ID..."
                    value={crmSearch}
                    onChange={(e) => setCrmSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                </div>

                <button
                  onClick={handleExportCSV}
                  className="btn-obsidian px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 whitespace-nowrap"
                  title="Export records to CSV"
                >
                  <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Export CSV</span>
                </button>
              </div>

            </div>

            {/* CRM Table */}
            <div className="bg-white rounded-2xl border border-[#E8E2D9] shadow-subtle overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#090D14] text-white uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3.5">Booking / Patient</th>
                      <th className="p-3.5">Procedure</th>
                      <th className="p-3.5">Date & Slot</th>
                      <th className="p-3.5">Fee & Payment</th>
                      <th className="p-3.5">Source</th>
                      <th className="p-3.5">Status Workflow</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-500">
                          No leads or appointments matching the filter.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-[#FAF8F5] transition-colors">
                          
                          {/* Patient */}
                          <td className="p-3.5">
                            <div className="font-bold text-gray-900">{apt.patientName}</div>
                            <div className="text-[11px] text-gray-500 flex items-center space-x-1">
                              <span>{apt.phone}</span>
                            </div>
                            <div className="font-mono text-[9px] text-gray-400">{apt.id}</div>
                          </td>

                          {/* Procedure */}
                          <td className="p-3.5">
                            <div className="font-medium text-gray-800">{apt.treatment}</div>
                            {apt.notes && (
                              <div className="text-[10px] text-gray-500 truncate max-w-xs" title={apt.notes}>
                                Note: {apt.notes}
                              </div>
                            )}
                          </td>

                          {/* Date & Slot */}
                          <td className="p-3.5">
                            <div className="font-semibold text-gray-900">{apt.date}</div>
                            <div className="text-[11px] text-gray-500">{apt.timeSlot}</div>
                          </td>

                          {/* Fee */}
                          <td className="p-3.5">
                            <div className="font-bold text-[#0F172A]">₹{apt.feeAmount || 0}</div>
                            <span className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded ${
                              apt.paymentStatus?.includes('Paid') ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {apt.paymentStatus || 'Pending'}
                            </span>
                          </td>

                          {/* Lead Source */}
                          <td className="p-3.5">
                            <span className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                              {apt.leadSource || 'Website'}
                            </span>
                          </td>

                          {/* Status Dropdown */}
                          <td className="p-3.5">
                            <select
                              value={apt.status}
                              onChange={(e) => updateAppointmentStatus(apt.id, e.target.value)}
                              className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                                apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                apt.status === 'New' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                                apt.status === 'Contacted' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                                apt.status === 'Completed' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                                'bg-gray-100 text-gray-600 border-gray-300'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end space-x-1.5">
                              <a
                                href={`tel:${apt.phone.replace(/[^0-9+]/g, '')}`}
                                className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                                title="Call patient"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${apt.patientName}, this is Dr. Zoya's Clinic regarding your appointment for ${apt.treatment}.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white rounded-lg transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete record for ${apt.patientName}?`)) {
                                    deleteAppointment(apt.id);
                                  }
                                }}
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
                                title="Delete record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TREATMENTS CMS CATALOG */}
        {activeTab === 'treatments' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0F172A]">Clinical Treatments Manager</h3>
                <p className="text-xs text-gray-500">Add, edit pricing, or modify procedure descriptions.</p>
              </div>

              <button
                onClick={() => setIsAddingTreatment(true)}
                className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Treatment</span>
              </button>
            </div>

            {/* ADD TREATMENT MODAL/FORM */}
            {isAddingTreatment && (
              <form onSubmit={handleCreateTreatment} className="bg-white p-6 rounded-2xl border-2 border-[#C5A059] shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h4 className="font-bold text-sm text-[#0F172A]">Create New Treatment Offering</h4>
                  <button type="button" onClick={() => setIsAddingTreatment(false)} className="text-gray-400 hover:text-black">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Treatment Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Carbon Laser Peel"
                      value={newTreatment.title}
                      onChange={e => setNewTreatment({ ...newTreatment, title: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
                    <select
                      value={newTreatment.category}
                      onChange={e => setNewTreatment({ ...newTreatment, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059] bg-white"
                    >
                      <option>Aesthetic Dermatology</option>
                      <option>Cosmetic Dentistry</option>
                      <option>Anti-Aging & Injectables</option>
                      <option>Hair Restoration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={newTreatment.duration}
                      onChange={e => setNewTreatment({ ...newTreatment, duration: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Price Display</label>
                    <input
                      type="text"
                      value={newTreatment.price}
                      onChange={e => setNewTreatment({ ...newTreatment, price: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Advance Consultation Fee (₹)</label>
                    <input
                      type="number"
                      value={newTreatment.advanceFee}
                      onChange={e => setNewTreatment({ ...newTreatment, advanceFee: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Highlights (comma separated)</label>
                    <input
                      type="text"
                      value={newTreatment.benefitsStr}
                      onChange={e => setNewTreatment({ ...newTreatment, benefitsStr: e.target.value })}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Clinical Description</label>
                  <textarea
                    rows={2}
                    value={newTreatment.description}
                    onChange={e => setNewTreatment({ ...newTreatment, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                    placeholder="Describe how the treatment works and clinical indications..."
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingTreatment(false)}
                    className="px-4 py-2 text-xs text-gray-600 hover:text-black font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-gold px-5 py-2 rounded-xl text-xs font-bold"
                  >
                    Save & Add Treatment
                  </button>
                </div>
              </form>
            )}

            {/* TREATMENTS LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clinicData.treatments.map((t) => {
                const isEditing = editingTreatmentId === t.id;

                if (isEditing) {
                  return (
                    <div key={t.id} className="bg-white p-5 rounded-2xl border-2 border-[#C5A059] shadow-md space-y-3">
                      <div className="font-bold text-xs text-[#0F172A]">Edit Treatment</div>
                      <input
                        type="text"
                        value={editingTreatmentForm.title}
                        onChange={e => setEditingTreatmentForm({ ...editingTreatmentForm, title: e.target.value })}
                        className="w-full p-2 border rounded text-xs font-semibold"
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        value={editingTreatmentForm.price}
                        onChange={e => setEditingTreatmentForm({ ...editingTreatmentForm, price: e.target.value })}
                        className="w-full p-2 border rounded text-xs"
                        placeholder="Price"
                      />
                      <input
                        type="text"
                        value={editingTreatmentForm.duration}
                        onChange={e => setEditingTreatmentForm({ ...editingTreatmentForm, duration: e.target.value })}
                        className="w-full p-2 border rounded text-xs"
                        placeholder="Duration"
                      />
                      <textarea
                        rows={2}
                        value={editingTreatmentForm.description}
                        onChange={e => setEditingTreatmentForm({ ...editingTreatmentForm, description: e.target.value })}
                        className="w-full p-2 border rounded text-xs"
                        placeholder="Description"
                      />
                      <input
                        type="text"
                        value={editingTreatmentForm.benefitsStr}
                        onChange={e => setEditingTreatmentForm({ ...editingTreatmentForm, benefitsStr: e.target.value })}
                        className="w-full p-2 border rounded text-xs"
                        placeholder="Benefits (comma separated)"
                      />
                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingTreatmentId(null)}
                          className="px-3 py-1.5 text-xs text-gray-500 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveTreatmentEdit}
                          className="btn-gold px-4 py-1.5 rounded-lg text-xs font-bold"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={t.id} className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-subtle flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-[#C5A059] bg-[#FAF6EE] px-2 py-0.5 rounded">
                          {t.category}
                        </span>
                        <span className="text-[11px] text-gray-400">{t.duration}</span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#0F172A]">{t.title}</h4>
                      <div className="text-xs font-bold text-emerald-700 mt-1">{t.price}</div>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">{t.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-[10px] text-gray-500">
                        Advance: <strong>₹{t.advanceFee || 500}</strong>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handleStartEditTreatment(t)}
                          className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete treatment "${t.title}"?`)) {
                              deleteTreatment(t.id);
                            }
                          }}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB: DOCTORS TEAM MANAGEMENT                                   */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'doctors' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0F172A]">Doctors &amp; Specialist Panel</h3>
                <p className="text-xs text-gray-500 mt-1">Edit doctor names, roles, qualifications, specialties, and photos. Changes apply live to the entire website instantly.</p>
              </div>
              <button
                onClick={() => { setIsAddingDoctor(true); setEditingDoctorId(null); }}
                className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer shadow-md flex-shrink-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add New Doctor</span>
              </button>
            </div>

            {/* === ADD NEW DOCTOR FORM === */}
            {isAddingDoctor && (
              <div className="bg-white p-6 rounded-3xl border-2 border-[#C5A059]/50 shadow-lg space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-[#0F172A] flex items-center space-x-2">
                    <UserPlus className="w-5 h-5 text-[#C5A059]" />
                    <span>Add New Specialist</span>
                  </h4>
                  <button onClick={() => setIsAddingDoctor(false)} className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Photo Preview */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#C5A059]/40 bg-gray-100">
                      <img src={newDoctorForm.image} alt="Preview" className="w-full h-full object-cover object-top" onError={e => { e.target.src = '/images/dr_zoya_rana.png'; }} />
                    </div>
                    <p className="text-[10px] text-gray-400 text-center mt-1">Photo Preview</p>
                  </div>
                  <div className="flex-1 space-y-3">
                    {/* Upload from device */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center space-x-1"><Upload className="w-3 h-3" /><span>Upload Photo from Device</span></label>
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-[#FAF6EE] file:text-[#C5A059] file:font-semibold hover:file:bg-[#C5A059]/10 cursor-pointer"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const dataUrl = await compressImageToDataUrl(file);
                            setNewDoctorForm(prev => ({ ...prev, image: dataUrl }));
                          }
                        }}
                      />
                    </div>
                    {/* Presets */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center space-x-1"><ImageIcon className="w-3 h-3" /><span>Or Select Official Portrait</span></label>
                      <div className="flex flex-wrap gap-1.5">
                        {doctorPhotoPresets.map(p => (
                          <button key={p.path} type="button" onClick={() => setNewDoctorForm(prev => ({ ...prev, image: p.path }))}
                            className={`text-[10px] px-2.5 py-1 rounded-lg border font-medium transition-all ${newDoctorForm.image === p.path ? 'bg-[#C5A059] text-white border-[#C5A059]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#C5A059]'}`}>
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* URL input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Or Enter Image URL</label>
                      <input type="text" placeholder="https://..." value={newDoctorForm.image.startsWith('data:') ? '' : newDoctorForm.image}
                        onChange={e => setNewDoctorForm(prev => ({ ...prev, image: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]" />
                    </div>
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                    <input type="text" required placeholder="Dr. Rahul Sharma" value={newDoctorForm.name}
                      onChange={e => setNewDoctorForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]" /></div>
                  <div><label className="block text-xs font-semibold text-gray-700 mb-1">Designation / Role *</label>
                    <input type="text" required placeholder="Orthodontist & Smile Specialist" value={newDoctorForm.role}
                      onChange={e => setNewDoctorForm(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]" /></div>
                  <div><label className="block text-xs font-semibold text-gray-700 mb-1">Qualification &amp; Degrees</label>
                    <input type="text" placeholder="BDS, MDS (Orthodontics)" value={newDoctorForm.qualification}
                      onChange={e => setNewDoctorForm(prev => ({ ...prev, qualification: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]" /></div>
                  <div><label className="block text-xs font-semibold text-gray-700 mb-1">Primary Clinical Specialty</label>
                    <input type="text" placeholder="Invisible Aligners & Ceramic Veneers" value={newDoctorForm.specialty}
                      onChange={e => setNewDoctorForm(prev => ({ ...prev, specialty: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]" /></div>
                  <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center space-x-1"><MapPin className="w-3 h-3" /><span>Clinic Locations / OPD Days</span></label>
                    <input type="text" placeholder="Dehradun & Muzaffarnagar Clinics | Mon-Sat" value={newDoctorForm.location}
                      onChange={e => setNewDoctorForm(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]" /></div>
                  <div className="sm:col-span-2"><label className="block text-xs font-semibold text-gray-700 mb-1">Short Biography (Optional)</label>
                    <textarea rows={2} placeholder="Dr. Rahul Sharma brings 8 years of expertise in orthodontic corrections..." value={newDoctorForm.bio}
                      onChange={e => setNewDoctorForm(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]" /></div>
                </div>
                <div className="flex justify-end space-x-2 pt-1">
                  <button type="button" onClick={() => setIsAddingDoctor(false)} className="px-4 py-2 rounded-xl text-xs font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50">Cancel</button>
                  <button type="button" onClick={() => {
                    if (!newDoctorForm.name.trim()) { alert('Please enter doctor name.'); return; }
                    addDoctor(newDoctorForm);
                    setIsAddingDoctor(false);
                    setNewDoctorForm({ name: '', role: 'Specialist', qualification: '', specialty: '', image: '/images/dr_zoya_rana.png', location: 'Dehradun & Muzaffarnagar Clinics', bio: '' });
                  }} className="btn-gold px-5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer">
                    <Check className="w-3.5 h-3.5" /><span>Add to Panel</span>
                  </button>
                </div>
              </div>
            )}

            {/* === DOCTOR CARDS GRID === */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {(clinicData.profile.team || []).map((doc) => (
                <div key={doc.id} className="bg-white rounded-3xl border border-[#E8E2D9] shadow-subtle overflow-hidden">
                  {/* === VIEWING MODE === */}
                  {editingDoctorId !== doc.id ? (
                    <>
                      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                        <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" onError={e => { e.target.src = '/images/dr_zoya_rana.png'; }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090D14]/80 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="font-serif text-lg font-bold text-white leading-tight">{doc.name}</div>
                          <div className="text-[11px] text-[#C5A059] font-semibold mt-0.5">{doc.role}</div>
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="text-xs text-gray-600 flex items-start space-x-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                          <span>{doc.qualification || '—'}</span>
                        </div>
                        <div className="text-xs text-gray-600 flex items-start space-x-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                          <span>Specialty: <strong>{doc.specialty || '—'}</strong></span>
                        </div>
                        <div className="text-xs text-gray-500 flex items-start space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                          <span>{doc.location || 'Dehradun & Muzaffarnagar'}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-100">
                          <button onClick={() => { setEditingDoctorId(doc.id); setEditingDoctorForm({ ...doc }); setIsAddingDoctor(false); }}
                            className="flex items-center space-x-1.5 text-xs font-bold text-[#0F172A] bg-[#FAF6EE] hover:bg-[#C5A059]/20 border border-[#C5A059]/40 px-3 py-1.5 rounded-lg transition-all">
                            <Edit className="w-3.5 h-3.5" /><span>Edit Doctor</span>
                          </button>
                          <button onClick={() => { if (window.confirm(`Remove ${doc.name} from the specialist panel?`)) deleteDoctor(doc.id); }}
                            className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors border border-red-100">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* === EDIT MODE === */
                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-serif text-base font-bold text-[#0F172A]">Edit: {doc.name}</h4>
                        <button onClick={() => setEditingDoctorId(null)} className="p-1 rounded-full text-gray-400 hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Photo management */}
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#C5A059]/40 bg-gray-100">
                            <img src={editingDoctorForm.image} alt="Preview" className="w-full h-full object-cover object-top" onError={e => { e.target.src = '/images/dr_zoya_rana.png'; }} />
                          </div>
                        </div>
                        <div className="flex-1 space-y-2">
                          <label className="block text-[11px] font-bold text-gray-700 flex items-center space-x-1"><Upload className="w-3 h-3" /><span>Upload Photo from Device</span></label>
                          <input type="file" accept="image/*"
                            className="w-full text-xs text-gray-600 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-[#FAF6EE] file:text-[#C5A059] cursor-pointer"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const dataUrl = await compressImageToDataUrl(file);
                                setEditingDoctorForm(prev => ({ ...prev, image: dataUrl }));
                              }
                            }} />
                          <div className="flex flex-wrap gap-1">
                            {doctorPhotoPresets.map(p => (
                              <button key={p.path} type="button" onClick={() => setEditingDoctorForm(prev => ({ ...prev, image: p.path }))}
                                className={`text-[10px] px-2 py-0.5 rounded-md border font-medium transition-all ${editingDoctorForm.image === p.path ? 'bg-[#C5A059] text-white border-[#C5A059]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#C5A059]'}`}>
                                {p.label}
                              </button>
                            ))}
                          </div>
                          <input type="text" placeholder="Or custom image URL" value={editingDoctorForm.image.startsWith('data:') ? '' : editingDoctorForm.image}
                            onChange={e => setEditingDoctorForm(prev => ({ ...prev, image: e.target.value }))}
                            className="w-full px-2.5 py-1.5 border rounded-lg text-[11px] focus:ring-1 focus:ring-[#C5A059]" />
                        </div>
                      </div>

                      {/* Doctor fields */}
                      <div className="space-y-2">
                        <div><label className="block text-[11px] font-bold text-gray-700 mb-0.5">Full Name</label>
                          <input type="text" value={editingDoctorForm.name} onChange={e => setEditingDoctorForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-2.5 py-1.5 border rounded-lg text-xs focus:ring-1 focus:ring-[#C5A059]" /></div>
                        <div><label className="block text-[11px] font-bold text-gray-700 mb-0.5">Designation / Role</label>
                          <input type="text" value={editingDoctorForm.role} onChange={e => setEditingDoctorForm(prev => ({ ...prev, role: e.target.value }))}
                            className="w-full px-2.5 py-1.5 border rounded-lg text-xs focus:ring-1 focus:ring-[#C5A059]" /></div>
                        <div><label className="block text-[11px] font-bold text-gray-700 mb-0.5">Qualification &amp; Degrees</label>
                          <input type="text" value={editingDoctorForm.qualification || ''} onChange={e => setEditingDoctorForm(prev => ({ ...prev, qualification: e.target.value }))}
                            className="w-full px-2.5 py-1.5 border rounded-lg text-xs focus:ring-1 focus:ring-[#C5A059]" /></div>
                        <div><label className="block text-[11px] font-bold text-gray-700 mb-0.5">Primary Clinical Specialty</label>
                          <input type="text" value={editingDoctorForm.specialty || ''} onChange={e => setEditingDoctorForm(prev => ({ ...prev, specialty: e.target.value }))}
                            className="w-full px-2.5 py-1.5 border rounded-lg text-xs focus:ring-1 focus:ring-[#C5A059]" /></div>
                        <div><label className="block text-[11px] font-bold text-gray-700 mb-0.5 flex items-center space-x-1"><MapPin className="w-3 h-3" /><span>Clinic Locations / OPD Days</span></label>
                          <input type="text" value={editingDoctorForm.location || ''} onChange={e => setEditingDoctorForm(prev => ({ ...prev, location: e.target.value }))}
                            className="w-full px-2.5 py-1.5 border rounded-lg text-xs focus:ring-1 focus:ring-[#C5A059]" /></div>
                        <div><label className="block text-[11px] font-bold text-gray-700 mb-0.5">Short Biography</label>
                          <textarea rows={2} value={editingDoctorForm.bio || ''} onChange={e => setEditingDoctorForm(prev => ({ ...prev, bio: e.target.value }))}
                            className="w-full px-2.5 py-1.5 border rounded-lg text-xs focus:ring-1 focus:ring-[#C5A059]" /></div>
                      </div>

                      <div className="flex justify-end space-x-2 pt-1 border-t border-gray-100">
                        <button type="button" onClick={() => setEditingDoctorId(null)} className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-300 text-gray-600">Cancel</button>
                        <button type="button" onClick={() => {
                          updateDoctor(doc.id, editingDoctorForm);
                          setEditingDoctorId(null);
                          setEditingDoctorForm(null);
                        }} className="btn-gold px-4 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 cursor-pointer">
                          <Save className="w-3.5 h-3.5" /><span>Save &amp; Go Live</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Empty state */}
            {(clinicData.profile.team || []).length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#C5A059]/40">
                <UserCheck className="w-12 h-12 text-[#C5A059]/40 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-500">No doctors in the specialist panel yet.</p>
                <p className="text-xs text-gray-400 mt-1">Click "Add New Doctor" to add the first specialist.</p>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB 3: DOCTOR & CLINIC PROFILE INFO */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-subtle space-y-6 text-left max-w-4xl">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0F172A]">Clinic & Doctor Credentials</h3>
              <p className="text-xs text-gray-500">Manage names, phone lines, address, and biography.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Clinic Brand Name</label>
                <input
                  type="text"
                  value={profileForm.clinicName}
                  onChange={e => setProfileForm({ ...profileForm, clinicName: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Lead Physician Name</label>
                <input
                  type="text"
                  value={profileForm.doctorName}
                  onChange={e => setProfileForm({ ...profileForm, doctorName: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Doctor Title & Degrees</label>
                <input
                  type="text"
                  value={profileForm.doctorTitle}
                  onChange={e => setProfileForm({ ...profileForm, doctorTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Doctor Biography</label>
                <textarea
                  rows={4}
                  value={profileForm.doctorBio}
                  onChange={e => setProfileForm({ ...profileForm, doctorBio: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Phone</label>
                <input
                  type="text"
                  value={profileForm.contact.phone}
                  onChange={e => setProfileForm({ 
                    ...profileForm, 
                    contact: { ...profileForm.contact, phone: e.target.value } 
                  })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">WhatsApp Number (e.g. +919876543210)</label>
                <input
                  type="text"
                  value={profileForm.contact.whatsapp}
                  onChange={e => setProfileForm({ 
                    ...profileForm, 
                    contact: { ...profileForm.contact, whatsapp: e.target.value } 
                  })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Concierge Email</label>
                <input
                  type="email"
                  value={profileForm.contact.email}
                  onChange={e => setProfileForm({ 
                    ...profileForm, 
                    contact: { ...profileForm.contact, email: e.target.value } 
                  })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Clinic Timings</label>
                <input
                  type="text"
                  value={profileForm.contact.timings}
                  onChange={e => setProfileForm({ 
                    ...profileForm, 
                    contact: { ...profileForm.contact, timings: e.target.value } 
                  })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Clinic Address</label>
                <input
                  type="text"
                  value={profileForm.contact.address}
                  onChange={e => setProfileForm({ 
                    ...profileForm, 
                    contact: { ...profileForm.contact, address: e.target.value } 
                  })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="btn-gold px-7 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Updates</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: HERO & TRUST STATS */}
        {activeTab === 'hero' && (
          <form onSubmit={handleSaveHero} className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-subtle space-y-6 text-left max-w-4xl">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#0F172A]">Hero Banner & Trust Metrics</h3>
              <p className="text-xs text-gray-500">Edit the top header statement, badge, and proof statistics.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Top Banner Badge</label>
                <input
                  type="text"
                  value={heroForm.badge}
                  onChange={e => setHeroForm({ ...heroForm, badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Title (Primary)</label>
                  <input
                    type="text"
                    value={heroForm.titlePrimary}
                    onChange={e => setHeroForm({ ...heroForm, titlePrimary: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Title (Highlighted Text)</label>
                  <input
                    type="text"
                    value={heroForm.titleHighlight}
                    onChange={e => setHeroForm({ ...heroForm, titleHighlight: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Hero Subtitle / Description</label>
                <textarea
                  rows={3}
                  value={heroForm.description}
                  onChange={e => setHeroForm({ ...heroForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059]"
                />
              </div>

              {/* Stats Editor */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-800 mb-2">Proof Statistics (4 Blocks)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {heroForm.stats.map((s, idx) => (
                    <div key={idx} className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 flex gap-2">
                      <input
                        type="text"
                        placeholder="Value (e.g. 15,000+)"
                        value={s.value}
                        onChange={e => {
                          const updated = [...heroForm.stats];
                          updated[idx].value = e.target.value;
                          setHeroForm({ ...heroForm, stats: updated });
                        }}
                        className="w-1/2 p-2 border rounded-lg text-xs font-bold"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={s.label}
                        onChange={e => {
                          const updated = [...heroForm.stats];
                          updated[idx].label = e.target.value;
                          setHeroForm({ ...heroForm, stats: updated });
                        }}
                        className="w-1/2 p-2 border rounded-lg text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="btn-gold px-7 py-3 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Hero Changes</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 5: PATIENT TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#0F172A]">Patient Testimonials Manager</h3>
                <p className="text-xs text-gray-500">Manage real reviews that display on the homepage.</p>
              </div>

              <button
                onClick={() => setIsAddingReview(true)}
                className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Patient Review</span>
              </button>
            </div>

            {/* ADD REVIEW FORM */}
            {isAddingReview && (
              <form onSubmit={handleCreateReview} className="bg-white p-6 rounded-2xl border-2 border-[#C5A059] shadow-md space-y-4">
                <div className="font-bold text-sm text-[#0F172A]">New Patient Review</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Patient Name"
                    value={newReview.name}
                    onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                    className="p-2 border rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Location (e.g. Gurugram)"
                    value={newReview.location}
                    onChange={e => setNewReview({ ...newReview, location: e.target.value })}
                    className="p-2 border rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Procedure (e.g. Invisalign & Whitening)"
                    value={newReview.verifiedProcedure}
                    onChange={e => setNewReview({ ...newReview, verifiedProcedure: e.target.value })}
                    className="p-2 border rounded-xl text-xs"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="Patient Review Text..."
                  value={newReview.text}
                  onChange={e => setNewReview({ ...newReview, text: e.target.value })}
                  className="w-full p-2 border rounded-xl text-xs"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingReview(false)}
                    className="px-4 py-2 text-xs text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-gold px-5 py-2 rounded-xl text-xs font-bold"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clinicData.testimonials.map((rev) => (
                <div key={rev.id} className="bg-white p-5 rounded-2xl border border-[#E8E2D9] shadow-subtle flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-[#0F172A]">{rev.name}</span>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete review from ${rev.name}?`)) {
                            deleteTestimonial(rev.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-[#C5A059] font-medium">{rev.verifiedProcedure} • {rev.location}</div>
                    <p className="text-xs text-gray-700 italic mt-2">"{rev.text}"</p>
                  </div>
                  <div className="text-[10px] text-gray-400 pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span>{rev.date}</span>
                    <div className="flex text-[#C5A059]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#C5A059]" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: GALLERY & MEDIA SHOWCASE MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Header Controls */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E2D9] shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                {['All', 'Smile', 'Skin', 'Hair', 'Clinic & Tech', 'Instagram'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setGalleryCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      galleryCategoryFilter === cat
                        ? 'bg-[#0F172A] text-[#C5A059] shadow-xs'
                        : 'bg-[#FAF8F5] text-gray-600 hover:bg-[#F1ECE5]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <input
                    type="text"
                    placeholder="Search gallery cases..."
                    value={gallerySearch}
                    onChange={e => setGallerySearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-[#C5A059] bg-[#FAF8F5]"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                </div>

                <button
                  onClick={() => setIsAddingGallery(true)}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Gallery Item</span>
                </button>
              </div>
            </div>

            {/* ADD GALLERY ITEM FORM */}
            {isAddingGallery && (
              <form onSubmit={handleCreateGalleryItem} className="bg-white p-6 rounded-2xl border-2 border-[#C5A059] shadow-lg space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <Camera className="w-5 h-5 text-[#C5A059]" />
                    <h4 className="font-bold text-sm text-[#0F172A]">Add New Clinical Case / Media to Gallery</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddingGallery(false)}
                    className="text-gray-400 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Type Selector */}
                <div className="flex items-center space-x-4 text-xs font-bold text-gray-700">
                  <span>Display Type:</span>
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="newGalleryType"
                      checked={newGalleryItem.type === 'before_after'}
                      onChange={() => setNewGalleryItem({ ...newGalleryItem, type: 'before_after' })}
                    />
                    <span>Before / After Transformation</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="newGalleryType"
                      checked={newGalleryItem.type === 'single'}
                      onChange={() => setNewGalleryItem({ ...newGalleryItem, type: 'single' })}
                    />
                    <span>Single High-Res / Tech Suite Photo</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600">Case / Media Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ceramic Incisal Makeover"
                      value={newGalleryItem.title}
                      onChange={e => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-xs bg-[#FAF8F5]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600">Category</label>
                    <select
                      value={newGalleryItem.category}
                      onChange={e => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-xs bg-[#FAF8F5]"
                    >
                      <option value="Smile">Smile (Dental Care)</option>
                      <option value="Skin">Skin (Dermatology)</option>
                      <option value="Hair">Hair (Restoration / PRP)</option>
                      <option value="Clinic & Tech">Clinic & Tech (Infrastructure)</option>
                      <option value="Instagram">Instagram (@dnaclinicindia)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600">Timeline / Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 2 Visits or 6 Weeks"
                      value={newGalleryItem.timeline}
                      onChange={e => setNewGalleryItem({ ...newGalleryItem, timeline: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-xs bg-[#FAF8F5]"
                    />
                  </div>
                </div>

                {/* Images Configuration */}
                {newGalleryItem.type === 'before_after' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#FAF8F5] rounded-xl border border-gray-200">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-700">Before Image Path / URL *</label>
                      <input
                        type="text"
                        required
                        value={newGalleryItem.beforeImage}
                        onChange={e => setNewGalleryItem({ ...newGalleryItem, beforeImage: e.target.value })}
                        className="w-full p-2 border rounded-xl text-xs bg-white"
                      />
                      <div className="flex flex-wrap gap-1 pt-1">
                        <span className="text-[10px] text-gray-400">Quick presets:</span>
                        <button type="button" onClick={() => setNewGalleryItem({ ...newGalleryItem, beforeImage: '/images/ba_smile_before.png' })} className="text-[10px] text-[#C5A059] underline hover:text-black">Smile Before</button>
                        <button type="button" onClick={() => setNewGalleryItem({ ...newGalleryItem, beforeImage: '/images/ba_skin_before.png' })} className="text-[10px] text-[#C5A059] underline hover:text-black">Skin Before</button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-gray-700">After Image Path / URL *</label>
                      <input
                        type="text"
                        required
                        value={newGalleryItem.afterImage}
                        onChange={e => setNewGalleryItem({ ...newGalleryItem, afterImage: e.target.value })}
                        className="w-full p-2 border rounded-xl text-xs bg-white"
                      />
                      <div className="flex flex-wrap gap-1 pt-1">
                        <span className="text-[10px] text-gray-400">Quick presets:</span>
                        <button type="button" onClick={() => setNewGalleryItem({ ...newGalleryItem, afterImage: '/images/ba_smile_after.png' })} className="text-[10px] text-[#C5A059] underline hover:text-black">Smile After</button>
                        <button type="button" onClick={() => setNewGalleryItem({ ...newGalleryItem, afterImage: '/images/ba_skin_after.png' })} className="text-[10px] text-[#C5A059] underline hover:text-black">Skin After</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#FAF8F5] rounded-xl border border-gray-200 space-y-2">
                    <label className="text-[11px] font-bold text-gray-700">Image Path / URL *</label>
                    <input
                      type="text"
                      required
                      value={newGalleryItem.image}
                      onChange={e => setNewGalleryItem({ ...newGalleryItem, image: e.target.value })}
                      className="w-full p-2 border rounded-xl text-xs bg-white"
                    />
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] text-gray-500 font-medium">Click any downloaded asset to select:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {availableImagePresets.map(preset => (
                          <button
                            key={preset.path}
                            type="button"
                            onClick={() => setNewGalleryItem({ ...newGalleryItem, image: preset.path })}
                            className="text-[10px] bg-white hover:bg-gray-100 border border-gray-300 px-2 py-0.5 rounded-md text-gray-700 font-medium transition-colors"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600">Supervising Clinician</label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Varsha Jha & Dr. Zoya Rana"
                      value={newGalleryItem.clinician}
                      onChange={e => setNewGalleryItem({ ...newGalleryItem, clinician: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-xs bg-[#FAF8F5]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600">Clinical Outcome / Description</label>
                    <input
                      type="text"
                      placeholder="Summary of procedure, clinical results, and patient satisfaction..."
                      value={newGalleryItem.description}
                      onChange={e => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })}
                      className="w-full p-2.5 border rounded-xl text-xs bg-[#FAF8F5]"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingGallery(false)}
                    className="px-4 py-2 border rounded-xl text-xs font-semibold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-gold px-6 py-2 rounded-xl text-xs font-bold shadow"
                  >
                    Save & Publish to Gallery
                  </button>
                </div>
              </form>
            )}

            {/* EDIT GALLERY ITEM MODAL */}
            {editingGalleryId && editingGalleryForm && (
              <form onSubmit={handleSaveEditGallery} className="bg-white p-6 rounded-2xl border-2 border-emerald-500 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <Edit className="w-4 h-4 text-emerald-600" />
                    <h4 className="font-bold text-sm text-[#0F172A]">Edit Gallery Item: {editingGalleryForm.title}</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setEditingGalleryId(null); setEditingGalleryForm(null); }}
                    className="text-gray-400 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600">Title</label>
                    <input
                      type="text"
                      required
                      value={editingGalleryForm.title}
                      onChange={e => setEditingGalleryForm({ ...editingGalleryForm, title: e.target.value })}
                      className="w-full p-2 border rounded-xl text-xs bg-[#FAF8F5]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600">Category</label>
                    <select
                      value={editingGalleryForm.category}
                      onChange={e => setEditingGalleryForm({ ...editingGalleryForm, category: e.target.value })}
                      className="w-full p-2 border rounded-xl text-xs bg-[#FAF8F5]"
                    >
                      <option value="Smile">Smile</option>
                      <option value="Skin">Skin</option>
                      <option value="Hair">Hair</option>
                      <option value="Clinic & Tech">Clinic & Tech</option>
                      <option value="Instagram">Instagram</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600">Timeline</label>
                    <input
                      type="text"
                      value={editingGalleryForm.timeline || ''}
                      onChange={e => setEditingGalleryForm({ ...editingGalleryForm, timeline: e.target.value })}
                      className="w-full p-2 border rounded-xl text-xs bg-[#FAF8F5]"
                    />
                  </div>
                </div>

                {editingGalleryForm.type === 'before_after' || (editingGalleryForm.beforeImage && editingGalleryForm.afterImage) ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#FAF8F5] rounded-xl border">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-600">Before Image</label>
                      <input
                        type="text"
                        value={editingGalleryForm.beforeImage || ''}
                        onChange={e => setEditingGalleryForm({ ...editingGalleryForm, beforeImage: e.target.value })}
                        className="w-full p-2 border rounded-xl text-xs bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-600">After Image</label>
                      <input
                        type="text"
                        value={editingGalleryForm.afterImage || ''}
                        onChange={e => setEditingGalleryForm({ ...editingGalleryForm, afterImage: e.target.value })}
                        className="w-full p-2 border rounded-xl text-xs bg-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600">Image Path / URL</label>
                    <input
                      type="text"
                      value={editingGalleryForm.image || ''}
                      onChange={e => setEditingGalleryForm({ ...editingGalleryForm, image: e.target.value })}
                      className="w-full p-2 border rounded-xl text-xs bg-[#FAF8F5]"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600">Clinician</label>
                    <input
                      type="text"
                      value={editingGalleryForm.clinician || ''}
                      onChange={e => setEditingGalleryForm({ ...editingGalleryForm, clinician: e.target.value })}
                      className="w-full p-2 border rounded-xl text-xs bg-[#FAF8F5]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600">Description</label>
                    <input
                      type="text"
                      value={editingGalleryForm.description || ''}
                      onChange={e => setEditingGalleryForm({ ...editingGalleryForm, description: e.target.value })}
                      className="w-full p-2 border rounded-xl text-xs bg-[#FAF8F5]"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => { setEditingGalleryId(null); setEditingGalleryForm(null); }}
                    className="px-4 py-2 border rounded-xl text-xs font-semibold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-bold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* GALLERY ITEMS LIST / GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(clinicData.gallery || [])
                .filter(item => {
                  const matchCat = galleryCategoryFilter === 'All' || item.category === galleryCategoryFilter;
                  const matchSearch = item.title?.toLowerCase().includes(gallerySearch.toLowerCase()) ||
                                      item.description?.toLowerCase().includes(gallerySearch.toLowerCase()) ||
                                      item.clinician?.toLowerCase().includes(gallerySearch.toLowerCase());
                  return matchCat && matchSearch;
                })
                .map(item => (
                  <div key={item.id} className="bg-white rounded-2xl border border-[#E8E2D9] shadow-subtle flex flex-col justify-between overflow-hidden">
                    <div>
                      {item.type === 'before_after' || (item.beforeImage && item.afterImage) ? (
                        <div className="p-3 bg-[#FAF8F5] border-b border-gray-100">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-gray-100">
                              <img src={item.beforeImage} alt="Before" className="w-full h-full object-cover" />
                              <span className="absolute top-1 left-1 bg-black/80 text-white text-[9px] font-bold px-1 rounded">Before</span>
                            </div>
                            <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-gray-100 border border-[#C5A059]">
                              <img src={item.afterImage} alt="After" className="w-full h-full object-cover" />
                              <span className="absolute top-1 left-1 bg-[#C5A059] text-black text-[9px] font-bold px-1 rounded">After</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 border-b border-gray-100">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <span className="absolute bottom-2 left-2 text-[9px] font-bold uppercase bg-black/70 text-white px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                        </div>
                      )}

                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-gray-500">
                          <span className="font-bold text-[#C5A059] uppercase">{item.category}</span>
                          {item.timeline && <span>{item.timeline}</span>}
                        </div>
                        <h4 className="font-serif font-bold text-[#0F172A] text-sm leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                        {item.clinician && (
                          <div className="text-[11px] text-gray-400 font-medium truncate">
                            {item.clinician}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-3 bg-[#FAF8F5] border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => handleStartEditGallery(item)}
                        className="text-xs font-semibold text-gray-700 hover:text-black flex items-center space-x-1"
                      >
                        <Edit className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${item.title}" from clinic gallery?`)) {
                            deleteGalleryItem(item.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                  </div>
                ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
