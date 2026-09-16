import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { 
  Sparkles, 
  RotateCw, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  AlertCircle,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

// Clinical Treatment & Pathology Data for 3D Hotspots
const ANATOMY_ZONES = [
  {
    id: 'teeth',
    title: 'Dental & Smile Architecture',
    shortLabel: 'Teeth & Smile',
    icon: '🦷',
    color: '#10B981',
    cameraTarget: { rotY: 0, rotX: 0.05 },
    hotspot3D: new THREE.Vector3(0, -0.42, 1.05),
    doctor: 'Dr. Varsha Jha',
    doctorRole: 'Lead Dental Surgeon & Smile Specialist',
    doctorImg: '/images/dr_varsha_jha.png',
    problems: [
      { name: 'Misaligned or Crooked Teeth', detail: 'Crowding, uneven bite, and aesthetic smile asymmetry' },
      { name: 'Yellowing, Enamel Stains & Fluorosis', detail: 'Deep intrinsic discoloration resistant to normal brushing' },
      { name: 'Severe Toothache & Deep Decay', detail: 'Pulp infection requiring precision nerve saving care' },
      { name: 'Missing or Broken Teeth', detail: 'Gaps impairing chewing comfort, speech, and jaw structure' }
    ],
    solutions: [
      { name: 'Invisible Clear Aligners', time: '4–9 Months', tag: 'Computerized 3D Scanning' },
      { name: 'Ceramic Veneers & Smile Makeover', time: '2 Visits', tag: 'Custom Hollywood Smile' },
      { name: 'Painless Single-Sitting RCT', time: '45 Mins', tag: 'Zero Discomfort Protocol' },
      { name: 'Permanent Dental Implants', time: 'Lifetime', tag: 'Titanium Biocompatible' }
    ]
  },
  {
    id: 'hair',
    title: 'Scalp & Hair Restoration',
    shortLabel: 'Hair & Scalp',
    icon: '🌿',
    color: '#06B6D4',
    cameraTarget: { rotY: 0, rotX: -0.35 },
    hotspot3D: new THREE.Vector3(0, 1.05, 0.45),
    doctor: 'Dr. Zoya Talat',
    doctorRole: 'Associate Specialist & Laser Cosmetologist',
    doctorImg: '/images/dr_zoya_talat.png',
    problems: [
      { name: 'Receding Hairline & Crown Thinning', detail: 'Genetic male & female pattern androgenetic alopecia' },
      { name: 'Excessive Hair Fall & Shedding', detail: 'Stress, hormonal, or nutritional follicle weakening' },
      { name: 'Dormant or Shrinking Follicles', detail: 'Reduced blood circulation and miniature hair shafts' }
    ],
    solutions: [
      { name: 'Clinical Scalp PRP Therapy', time: 'Monthly', tag: 'Autologous Platelet Healing' },
      { name: 'Growth Factor Concentrate (GFC)', time: '3 Sessions', tag: 'Next-Gen Regenerative Care' },
      { name: 'Follicle Reactivation Mesotherapy', time: '4 Sessions', tag: 'Targeted Nutrient Infusion' },
      { name: 'Clinical Hair Transplant Consult', time: 'Permanent', tag: 'Natural Hairline Design' }
    ]
  },
  {
    id: 'skin',
    title: 'Medical Skin & Laser Complexion',
    shortLabel: 'Skin & Cheeks',
    icon: '✨',
    color: '#C5A059',
    cameraTarget: { rotY: 0.35, rotX: 0 },
    hotspot3D: new THREE.Vector3(0.68, -0.05, 0.72),
    doctor: 'Dr. Zoya Rana',
    doctorRole: 'Director & Chief Aesthetic Physician',
    doctorImg: '/images/dr_zoya_rana.png',
    problems: [
      { name: 'Acne Scars & Open Pores', detail: 'Post-inflammatory marks, pitted rolling & icepick scars' },
      { name: 'Melasma, Sunspots & Pigmentation', detail: 'Deep dermal epidermal hyperpigmentation' },
      { name: 'Fine Lines, Dullness & Dehydration', detail: 'Compromised dermal moisture barrier and collagen depletion' }
    ],
    solutions: [
      { name: 'US-FDA Medical HydraFacial MD', time: '45 Mins', tag: 'Deep Vortex Hydration' },
      { name: 'Pico Nd:YAG Laser Toning', time: '3–5 Sessions', tag: 'Melanin Shattering' },
      { name: 'Micro-Needling RF & TCA Cross', time: '3 Sessions', tag: 'Scar Remodeling' },
      { name: 'Glass Skin Radiance Infusion', time: 'Instant Glow', tag: 'Multi-Vitamin Peptide Cocktail' }
    ]
  },
  {
    id: 'jawline',
    title: 'Facial Architecture & Anti-Aging',
    shortLabel: 'Jawline & Lips',
    icon: '💎',
    color: '#EC4899',
    cameraTarget: { rotY: -0.35, rotX: 0.1 },
    hotspot3D: new THREE.Vector3(-0.55, -0.65, 0.75),
    doctor: 'Dr. Zoya Rana',
    doctorRole: 'Director & Chief Aesthetic Physician',
    doctorImg: '/images/dr_zoya_rana.png',
    problems: [
      { name: 'Sagging Jowls & Double Chin', detail: 'Loss of mandibular jawline sharpness and laxity' },
      { name: 'Thin or Dehydrated Lips', detail: 'Loss of natural lip definition, volume, and hydration' },
      { name: 'Deep Nasolabial Folds & Hollows', detail: 'Mid-face volume loss creating tired expression' }
    ],
    solutions: [
      { name: 'HIFU Non-Surgical Face Lift', time: '1 Session', tag: 'SMAS Layer Tightening' },
      { name: 'Hyaluronic Acid Lip Architecture', time: '12 Months', tag: 'Natural Plump & Hydration' },
      { name: 'Jawline Contour Definition', time: 'Immediate', tag: 'Sculpted Mandibular Edge' },
      { name: 'Baby Botox & Wrinkle Softening', time: '3–6 Months', tag: 'Expressive Smooth Finish' }
    ]
  }
];

export const Interactive3DFace = () => {
  const { openBookingModal } = useClinic();
  const mountRef = useRef(null);
  const [selectedZone, setSelectedZone] = useState(ANATOMY_ZONES[0]); // default to Teeth
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [screenHotspots, setScreenHotspots] = useState([]);
  const [rotationHintDismissed, setRotationHintDismissed] = useState(false);

  // References to keep across renders
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const headGroupRef = useRef(null);
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const previousPointerRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 520;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.8);
    cameraRef.current = camera;

    // 3. Renderer with high DPI and alpha transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;
    container.replaceChildren(renderer.domElement);

    // 4. Lighting setup (Luxury Clinic Aesthetics)
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    const keyGoldLight = new THREE.DirectionalLight(0xc5a059, 2.8);
    keyGoldLight.position.set(3, 4, 3);
    scene.add(keyGoldLight);

    const softFillLight = new THREE.DirectionalLight(0xffffff, 1.6);
    softFillLight.position.set(-3, 2, 2);
    scene.add(softFillLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 1.2);
    rimLight.position.set(0, -3, -2);
    scene.add(rimLight);

    // 5. Head Group
    const headGroup = new THREE.Group();
    scene.add(headGroup);
    headGroupRef.current = headGroup;

    // Aesthetic Ring Grid around the 3D Head
    const ringGeo = new THREE.RingGeometry(1.65, 1.67, 64);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: 0xc5a059, 
      side: THREE.DoubleSide, 
      transparent: true, 
      opacity: 0.35 
    });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 2.2;
    headGroup.add(orbitRing);

    // Subtle DNA Floating Particle Field
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 3.5;
      particlePos[i + 1] = (Math.random() - 0.5) * 3.5;
      particlePos[i + 2] = (Math.random() - 0.5) * 2.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc5a059,
      size: 0.035,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    headGroup.add(particles);

    // 6. Load the 3D Head Model
    const loader = new GLTFLoader();
    loader.load(
      '/models/head.glb',
      (gltf) => {
        const root = gltf.scene;

        // Apply luxury porcelain aesthetic material
        const luxuryMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xf6f0e6,
          roughness: 0.32,
          metalness: 0.12,
          clearcoat: 0.65,
          clearcoatRoughness: 0.2,
          reflectivity: 0.7,
          sheen: 0.4,
          sheenColor: 0xd4af37
        });

        root.traverse((child) => {
          if (child.isMesh) {
            child.material = luxuryMaterial;
            child.geometry.computeVertexNormals();
          }
        });

        // Center and normalize scale
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / maxDim;

        root.position.sub(center.multiplyScalar(scale));
        root.position.y += 0.05;
        root.scale.multiplyScalar(scale);

        headGroup.add(root);
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.warn('Failed to load head.glb, falling back to procedural aesthetic sculpture', error);
        
        // Procedural Aesthetic Sculpture Fallback (Smooth Stylized Bust)
        const fallbackGroup = new THREE.Group();
        const headGeo = new THREE.SphereGeometry(1, 48, 48);
        headGeo.scale(0.85, 1.15, 0.95);
        const fallbackMat = new THREE.MeshPhysicalMaterial({
          color: 0xf5eee2,
          roughness: 0.28,
          clearcoat: 0.8,
          clearcoatRoughness: 0.15
        });
        const headMesh = new THREE.Mesh(headGeo, fallbackMat);
        fallbackGroup.add(headMesh);

        // Stylized Neck
        const neckGeo = new THREE.CylinderGeometry(0.42, 0.56, 0.75, 32);
        const neckMesh = new THREE.Mesh(neckGeo, fallbackMat);
        neckMesh.position.y = -1.1;
        fallbackGroup.add(neckMesh);

        headGroup.add(fallbackGroup);
        setIsLoading(false);
      }
    );

    // 7. Mouse / Touch Drag Rotation Handlers
    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      setIsInteracting(true);
      setRotationHintDismissed(true);
      previousPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousPointerRef.current.x;
      const deltaY = e.clientY - previousPointerRef.current.y;
      previousPointerRef.current = { x: e.clientX, y: e.clientY };

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x = Math.max(
        -0.45, 
        Math.min(0.45, targetRotationRef.current.x + deltaY * 0.008)
      );
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 8. Animation & Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Auto-rotation when idle and not interacting
      if (isAutoRotate && !isDraggingRef.current && !isInteracting) {
        targetRotationRef.current.y += delta * 0.28;
      }

      // Smooth inertia damping
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;

      if (headGroupRef.current) {
        headGroupRef.current.rotation.y = currentRotationRef.current.y;
        headGroupRef.current.rotation.x = currentRotationRef.current.x;

        // Subtle floating breath effect
        const elapsed = clock.getElapsedTime();
        headGroupRef.current.position.y = Math.sin(elapsed * 1.5) * 0.035;
        orbitRing.rotation.z = elapsed * 0.25;
      }

      renderer.render(scene, camera);

      // Project 3D Hotspot Coordinates to 2D Screen Space
      if (headGroupRef.current && cameraRef.current) {
        const calculatedHotspots = ANATOMY_ZONES.map((zone) => {
          const worldPos = zone.hotspot3D.clone();
          worldPos.applyMatrix4(headGroupRef.current.matrixWorld);

          // Calculate normal vector facing to determine if hotspot is on visible side
          const cameraDir = cameraRef.current.position.clone().sub(worldPos).normalize();
          const normal = worldPos.clone().sub(headGroupRef.current.position).normalize();
          const dot = cameraDir.dot(normal);

          // Project to 2D screen coordinates
          const projected = worldPos.project(cameraRef.current);
          const x = (projected.x * 0.5 + 0.5) * width;
          const y = (-(projected.y * 0.5) + 0.5) * height;

          return {
            ...zone,
            screenX: x,
            screenY: y,
            isVisible: dot > 0.15 // only show when facing towards camera
          };
        });

        setScreenHotspots(calculatedHotspots);
      }
    };

    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
      if (container) container.replaceChildren();
    };
  }, [isAutoRotate, isInteracting]);

  // Handle Zone Selection (smoothly rotate 3D head to face that anatomical area)
  const handleSelectZone = (zone) => {
    setSelectedZone(zone);
    setIsInteracting(true);
    setRotationHintDismissed(true);

    if (zone.cameraTarget) {
      targetRotationRef.current = {
        x: zone.cameraTarget.rotX,
        y: zone.cameraTarget.rotY
      };
    }
  };

  return (
    <div className="w-full">
      
      {/* 1. Quick Anatomy Zone Filter Chips */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
        {ANATOMY_ZONES.map((zone) => {
          const isActive = selectedZone.id === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => handleSelectZone(zone)}
              className={`flex items-center space-x-2 py-2 px-3.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#090D14] text-white shadow-lg scale-105 border border-[#C5A059]'
                  : 'bg-white/90 text-[#475569] border border-[#E8E2D9] hover:border-[#C5A059] hover:bg-[#FAF6EE]'
              }`}
            >
              <span>{zone.icon}</span>
              <span>{zone.shortLabel}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Main 3D Viewport + Clinical Diagnosis Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        
        {/* 3D Head Stage (Col 7) */}
        <div className="lg:col-span-6 relative flex flex-col items-center">
          
          {/* Subtle Ambient Glow behind 3D Head */}
          <div 
            className="absolute inset-0 rounded-full blur-3xl opacity-40 -z-10 transition-all duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${selectedZone.color}40 0%, rgba(197, 160, 89, 0.15) 50%, transparent 75%)`
            }}
          />

          {/* WebGL Canvas Container */}
          <div 
            ref={mountRef} 
            className="w-full h-[400px] sm:h-[460px] cursor-grab active:cursor-grabbing relative select-none touch-none"
          >
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-[#FAF8F5]/70 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-full border-2 border-[#C5A059] border-t-transparent animate-spin" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#0F172A]">
                  Initializing 3D Anatomy Canvas...
                </span>
              </div>
            )}

            {/* Projected Interactive 3D Hotspot Pins */}
            {!isLoading && screenHotspots.map((zone) => {
              if (!zone.isVisible) return null;
              const isSelected = selectedZone.id === zone.id;
              return (
                <div
                  key={zone.id}
                  onClick={() => handleSelectZone(zone)}
                  style={{
                    left: `${zone.screenX}px`,
                    top: `${zone.screenY}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="absolute cursor-pointer group z-20 transition-transform hover:scale-125"
                >
                  {/* Outer Pulsing Beacon Ring */}
                  <div 
                    className="w-8 h-8 rounded-full absolute -inset-1 opacity-75 animate-ping"
                    style={{ backgroundColor: zone.color }}
                  />

                  {/* Pin Core */}
                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md border-2 border-white transition-all ${
                      isSelected ? 'ring-4 ring-[#C5A059] scale-115' : ''
                    }`}
                    style={{ backgroundColor: zone.color }}
                  >
                    <span>{zone.icon}</span>
                  </div>

                  {/* Hover Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 bottom-7 bg-[#090D14] text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-xl pointer-events-none border border-[#C5A059]/40">
                    Click to Inspect: {zone.shortLabel}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3D Interaction Toolbar */}
          <div className="flex items-center justify-between w-full px-4 pt-2 text-[11px] text-[#64748B] font-medium">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>3D Anatomy Active • Drag to Rotate</span>
            </div>

            <button
              onClick={() => setIsAutoRotate(prev => !prev)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white border border-[#E8E2D9] hover:border-[#C5A059] transition-all text-[#0F172A] cursor-pointer shadow-2xs"
            >
              <RotateCw className={`w-3 h-3 ${isAutoRotate ? 'animate-spin' : ''}`} />
              <span>{isAutoRotate ? 'Auto-Spin: ON' : 'Auto-Spin: OFF'}</span>
            </button>
          </div>

          {!rotationHintDismissed && (
            <div className="mt-2 text-[10px] font-mono text-[#C5A059] bg-[#FAF6EE] px-3 py-1 rounded-full border border-[#C5A059]/30">
              💡 Tip: Click pins on the face or drag in 360° to inspect different areas
            </div>
          )}
        </div>

        {/* Clinical Problem & Solution Inspector Drawer (Col 5) */}
        <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-[#EAE4DC] shadow-xl space-y-4">
          
          {/* Header of Active Inspection */}
          <div className="flex items-center justify-between border-b border-[#F0EBE4] pb-3.5">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-xs"
                style={{ backgroundColor: `${selectedZone.color}20` }}
              >
                {selectedZone.icon}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-serif font-bold text-[#0F172A] text-lg">
                    {selectedZone.title}
                  </h3>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedZone.color }} />
                </div>
                <div className="text-xs text-[#64748B] font-medium">
                  {selectedZone.doctor} • {selectedZone.doctorRole}
                </div>
              </div>
            </div>
          </div>

          {/* Two-Column Breakdown: Common Problems vs How DNA Clinic Fixes Them */}
          <div className="space-y-4">
            
            {/* 1. Common Patient Problems (Yeh Yeh Problem Hoti Hai) */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Common Clinical Conditions:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedZone.problems.map((prob, idx) => (
                  <div 
                    key={idx} 
                    className="p-2.5 rounded-xl bg-[#FEF2F2]/60 border border-[#FCA5A5]/30 space-y-0.5"
                  >
                    <div className="text-xs font-semibold text-[#0F172A] flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                      <span className="truncate">{prob.name}</span>
                    </div>
                    <div className="text-[11px] text-[#64748B] leading-tight">
                      {prob.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Clinical Fixes (Inko Aise Fix Karte Hain) */}
            <div className="space-y-2 pt-2 border-t border-[#F0EBE4]">
              <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#059669]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>How DNA Clinic Resolves It:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedZone.solutions.map((sol, idx) => (
                  <div 
                    key={idx} 
                    className="p-2.5 rounded-xl bg-[#F0FDF4]/70 border border-[#86EFAC]/40 space-y-1 hover:border-[#10B981] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0F172A]">
                        {sol.name}
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white text-[#059669] border border-[#86EFAC]/50">
                        {sol.time}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#64748B] font-medium">
                      ✓ {sol.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-[#F0EBE4] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <img 
                src={selectedZone.doctorImg} 
                alt={selectedZone.doctor} 
                className="w-8 h-8 rounded-full object-cover border border-[#C5A059]"
              />
              <div className="text-[11px] leading-tight">
                <span className="font-bold text-[#0F172A] block">{selectedZone.doctor}</span>
                <span className="text-[#64748B]">Consultation Available</span>
              </div>
            </div>

            <button
              onClick={() => openBookingModal(selectedZone.title)}
              className="btn-gold px-5 py-2.5 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book For {selectedZone.shortLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
