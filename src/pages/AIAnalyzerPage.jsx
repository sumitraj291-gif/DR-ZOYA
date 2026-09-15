import React, { useState, useRef } from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Calendar, 
  ShieldCheck, 
  Layers, 
  Smile, 
  Activity,
  ArrowRight
} from 'lucide-react';

export const AIAnalyzerPage = () => {
  const { openBookingModal } = useClinic();
  
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'camera'
  const [imagePreview, setImagePreview] = useState('/images/dr_zoya_portrait.jpg');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepText, setScanStepText] = useState('');
  const [analysisReport, setAnalysisReport] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
        setAnalysisReport(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      setActiveTab('camera');
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      alert("Camera access was not granted or is unavailable. Please use the 'Upload Selfie' option.");
      setActiveTab('upload');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const captureCameraPhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setImagePreview(dataUrl);
      stopCamera();
      setActiveTab('upload');
      setAnalysisReport(null);
    }
  };

  const runAIScan = () => {
    setIsScanning(true);
    setAnalysisReport(null);

    const steps = [
      "Calibrating facial landmark points...",
      "Analyzing dermal texture & pore congestion...",
      "Measuring epidermal hydration & pigmentation...",
      "Evaluating dental midline & smile symmetry...",
      "Generating clinical preliminary guidance..."
    ];

    let currentStep = 0;
    setScanStepText(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setScanStepText(steps[currentStep]);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setAnalysisReport({
          skinScore: 84,
          smileScore: 78,
          findings: [
            {
              category: "Dermal Hydration",
              status: "Moderate Dehydration",
              severity: "Mild",
              note: "T-zone moisture barrier indicates sub-optimal hydration. Mild dullness around cheek planes."
            },
            {
              category: "Pigmentation & Sun Damage",
              status: "Sub-surface UV Freckling",
              severity: "Early",
              note: "Localized melanin clustering detectable on malar eminences. Preventative laser toning recommended."
            },
            {
              category: "Smile Harmony & Arch",
              status: "Mild Midline Rotation",
              severity: "Cosmetic",
              note: "Upper central incisors show 1.2mm crowding with high responsiveness to 3D clear aligners."
            }
          ],
          recommendedTreatments: [
            {
              name: "HydraFacial Elite MD® Deluxe",
              reason: "Restores deep cellular moisture, purges sebum, and boosts dermal luminescence.",
              fee: 500
            },
            {
              name: "Philips Zoom! Laser Whitening",
              reason: "Lifts dental shade up to 6 - 8 tones for immediate smile radiance.",
              fee: 500
            },
            {
              name: "Invisalign® 3D Smile Consultation",
              reason: "Aligns incisal arch comfortably without metal brackets.",
              fee: 1000
            }
          ]
        });
      }
    }, 700);
  };

  return (
    <div className="py-10 sm:py-16 space-y-12">
      
      {/* Page Title */}
      <section className="clinic-container text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-[#FAF6EE] border border-[#C5A059]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#C5A059] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Phase 2 Web AR / AI Experience</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0F172A]">
          AI Smile & Skin Analyzer
        </h1>

        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
          Upload a high-resolution selfie or use your camera to receive a real-time computerized assessment of your facial symmetry, dermal glow, and smile dynamics.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-center space-x-2 max-w-xl mx-auto">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Medical Notice:</strong> This AI tool offers preliminary aesthetic guidance and does NOT replace a medical diagnosis by Dr. Zoya.
          </span>
        </div>
      </section>

      {/* Main Interactive Scanner Grid */}
      <section className="clinic-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Camera / Upload Preview Frame */}
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-subtle space-y-6">
            
            {/* Input Selection Tabs */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => { stopCamera(); setActiveTab('upload'); }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    activeTab === 'upload'
                      ? 'bg-[#0F172A] text-[#C5A059]'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Selfie</span>
                </button>

                <button
                  onClick={startCamera}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    activeTab === 'camera'
                      ? 'bg-[#0F172A] text-[#C5A059]'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Live Camera</span>
                </button>
              </div>

              {activeTab === 'upload' && (
                <button
                  onClick={() => {
                    setImagePreview('/images/dr_zoya_portrait.jpg');
                    setAnalysisReport(null);
                  }}
                  className="text-[11px] text-[#C5A059] font-medium hover:underline"
                >
                  Use Sample Photo
                </button>
              )}
            </div>

            {/* Photo / Camera View Area */}
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-[3/4] max-h-[420px] mx-auto border-2 border-gray-200 shadow-inner flex items-center justify-center">
              
              {activeTab === 'camera' ? (
                <div className="w-full h-full relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
                    <button
                      onClick={captureCameraPhoto}
                      className="btn-gold px-5 py-2.5 rounded-full text-xs font-bold shadow-lg"
                    >
                      Capture Selfie
                    </button>
                    <button
                      onClick={() => { stopCamera(); setActiveTab('upload'); }}
                      className="bg-black/70 text-white px-4 py-2 rounded-full text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <img
                  src={imagePreview}
                  alt="Subject for AI Analysis"
                  className="w-full h-full object-cover object-top"
                />
              )}

              {/* Scanning HUD Radar Overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-between p-6 pointer-events-none">
                  {/* Horizontal animated scan line */}
                  <div className="w-full h-0.5 bg-[#C5A059] shadow-[0_0_15px_#C5A059] animate-scan absolute left-0" />

                  {/* Face outline wireframe simulation */}
                  <div className="w-48 h-64 border-2 border-dashed border-[#C5A059]/80 rounded-full animate-pulse my-auto flex items-center justify-center relative">
                    <span className="w-2 h-2 bg-[#C5A059] rounded-full absolute top-1/4 left-1/4" />
                    <span className="w-2 h-2 bg-[#C5A059] rounded-full absolute top-1/4 right-1/4" />
                    <span className="w-3 h-1 bg-[#C5A059] rounded-full absolute bottom-1/3" />
                  </div>

                  {/* Step status label */}
                  <div className="bg-black/85 border border-[#C5A059]/60 px-4 py-2 rounded-full text-xs text-[#C5A059] font-medium tracking-wide">
                    {scanStepText}
                  </div>
                </div>
              )}
            </div>

            {/* Upload trigger button */}
            {activeTab === 'upload' && (
              <div className="flex items-center space-x-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-1/2 py-2.5 border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo File</span>
                </button>

                <button
                  onClick={runAIScan}
                  disabled={isScanning}
                  className="w-1/2 btn-gold py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isScanning ? 'Analyzing Facial Metrics...' : 'Analyze Skin & Smile'}</span>
                </button>
              </div>
            )}

          </div>

          {/* Right: Real-Time Results & Doctor CTA */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-subtle min-h-[460px] flex flex-col justify-between space-y-6">
            
            {!analysisReport && !isScanning && (
              <div className="text-center py-16 space-y-4 my-auto">
                <div className="w-16 h-16 rounded-full bg-[#FAF6EE] border border-[#C5A059]/40 text-[#C5A059] flex items-center justify-center mx-auto">
                  <Activity className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                  Ready to Scan Your Skin & Smile
                </h3>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                  Click <strong>"Analyze Skin & Smile"</strong> to run our advanced computerized facial matrix and generate preliminary cosmetic recommendations.
                </p>
                <button
                  onClick={runAIScan}
                  className="btn-gold px-6 py-2.5 rounded-full text-xs font-bold shadow-md cursor-pointer"
                >
                  Run Analysis Now
                </button>
              </div>
            )}

            {isScanning && (
              <div className="text-center py-20 space-y-4 my-auto">
                <div className="w-12 h-12 border-3 border-[#C5A059] border-t-transparent rounded-full animate-spin mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#0F172A]">
                  AI Vision Engine Processing...
                </h4>
                <p className="text-xs text-gray-500">
                  Calculating surface hydration, smile alignment vectors, and skin tone uniformity.
                </p>
              </div>
            )}

            {analysisReport && (
              <div className="space-y-6">
                
                {/* Score Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE4DC] text-center space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Skin Health Index
                    </span>
                    <div className="font-serif text-3xl font-bold text-[#0F172A]">
                      {analysisReport.skinScore} <span className="text-xs text-[#C5A059] font-sans">/ 100</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold">Good Vitality</div>
                  </div>

                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE4DC] text-center space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Smile Harmony Index
                    </span>
                    <div className="font-serif text-3xl font-bold text-[#0F172A]">
                      {analysisReport.smileScore} <span className="text-xs text-[#C5A059] font-sans">/ 100</span>
                    </div>
                    <div className="text-[10px] text-[#C5A059] font-semibold">High Potential</div>
                  </div>
                </div>

                {/* Key Observations */}
                <div className="space-y-3 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                    Key Preliminary Findings:
                  </h4>
                  <div className="space-y-2">
                    {analysisReport.findings.map((f, i) => (
                      <div key={i} className="p-3 bg-[#FAF8F5] rounded-xl border border-gray-200 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-[#0F172A]">{f.category}</strong>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                            {f.status}
                          </span>
                        </div>
                        <p className="text-gray-600 text-[11px]">{f.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Procedures */}
                <div className="space-y-3 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                    Recommended Clinical Procedures:
                  </h4>
                  <div className="space-y-2">
                    {analysisReport.recommendedTreatments.map((rec, i) => (
                      <div key={i} className="p-3 bg-white border border-[#C5A059]/40 rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-[#0F172A]">{rec.name}</div>
                          <div className="text-[10px] text-gray-500">{rec.reason}</div>
                        </div>
                        <button
                          onClick={() => openBookingModal()}
                          className="btn-gold px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap ml-2"
                        >
                          Book Consult
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overall CTA Button */}
                <div className="pt-2">
                  <button
                    onClick={() => openBookingModal()}
                    className="w-full btn-gold py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book In-Clinic Evaluation with Dr. Zoya (₹500 / ₹1,000)</span>
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
