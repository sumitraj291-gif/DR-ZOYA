import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { 
  Sparkles, 
  RotateCw, 
  CheckCircle2, 
  ArrowRight, 
  Calendar,
  Sliders,
  Maximize2,
  Compass,
  Star,
  ShieldCheck,
  Zap,
  Eye,
  Activity
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

// 4 Cinematic Treatment Dimensions
const AESTHETIC_DIMENSIONS = [
  {
    id: 'skin',
    num: '01',
    title: 'Medical Dermal Radiance',
    subtitle: 'US-FDA Lasers & Hydra Vortex Infusion',
    tagline: 'Flawless glass skin texture, scar remodeling & pigmentation clearance.',
    icon: '✨',
    color: '#C5A059',
    cameraTarget: { rotY: 0.32, rotX: 0.04, posZ: 3.5 },
    hotspot3D: new THREE.Vector3(0.65, -0.05, 0.75),
    doctor: 'Dr. Zoya Rana',
    doctorRole: 'Director & Chief Aesthetic Physician',
    doctorImg: '/images/dr_zoya_rana.png',
    baBefore: '/images/ba_skin_before.png',
    baAfter: '/images/ba_skin_after.png',
    stats: { primary: '99.4%', label: 'Pore & Texture Clearance', time: '45 Mins' },
    highlights: [
      'Medical HydraFacial MD Vortex Hydration',
      'Pico Laser Melanin Shattering Protocol',
      'TCA Cross & Subcision Scar Remodeling',
      'Stem Cell & Peptide Glass Skin Infusion'
    ]
  },
  {
    id: 'smile',
    num: '02',
    title: 'Digital Smile Architecture',
    subtitle: '3D Computerized Smile Design & Veneers',
    tagline: 'Painless digital smile makeover, custom veneers, and invisible alignment.',
    icon: '🦷',
    color: '#10B981',
    cameraTarget: { rotY: 0, rotX: 0.12, posZ: 3.2 },
    hotspot3D: new THREE.Vector3(0, -0.42, 1.05),
    doctor: 'Dr. Varsha Jha',
    doctorRole: 'Lead Dental Surgeon & Smile Specialist',
    doctorImg: '/images/dr_varsha_jha.png',
    baBefore: '/images/ba_smile_before.png',
    baAfter: '/images/ba_smile_after.png',
    stats: { primary: '0.1mm', label: 'Ceramic Veneer Precision', time: '2 Visits' },
    highlights: [
      'Computerized 3D Digital Smile Pre-Visualization',
      'Ultra-Thin E-Max Ceramic Porcelain Veneers',
      'Painless Single-Sitting Laser Root Canal',
      'Custom Invisible Clear Aligners Protocol'
    ]
  },
  {
    id: 'hair',
    num: '03',
    title: 'Scalp & Follicle Restoration',
    subtitle: 'Autologous Cold-PRP & GFC Therapy',
    tagline: 'Arrest shedding, awaken dormant follicles, and regrow natural hair density.',
    icon: '🌿',
    color: '#06B6D4',
    cameraTarget: { rotY: 0, rotX: -0.32, posZ: 3.4 },
    hotspot3D: new THREE.Vector3(0, 1.05, 0.45),
    doctor: 'Dr. Zoya Talat',
    doctorRole: 'Associate Specialist & Laser Cosmetologist',
    doctorImg: '/images/dr_zoya_talat.png',
    baBefore: '/images/hair_rejuvenation.png',
    baAfter: '/images/hair_rejuvenation.png',
    stats: { primary: '+45%', label: 'Verified Hair Density Boost', time: 'Monthly' },
    highlights: [
      'Concentrated Growth Factor (GFC) Injections',
      'Clinical Cold-PRP Platelet Regeneration',
      'Microneedling Mesotherapy Nutrient Drive',
      'Permanent Natural Hairline Transplant Consult'
    ]
  },
  {
    id: 'contour',
    num: '04',
    title: 'Facial Sculpt & Anti-Aging',
    subtitle: 'Golden Ratio Mandibular & Lip Architecture',
    tagline: 'Non-surgical contouring, youthful volume restoration, and wrinkle smoothing.',
    icon: '💎',
    color: '#E11D48',
    cameraTarget: { rotY: -0.38, rotX: 0.08, posZ: 3.5 },
    hotspot3D: new THREE.Vector3(-0.6, -0.6, 0.75),
    doctor: 'Dr. Zoya Rana',
    doctorRole: 'Director & Chief Aesthetic Physician',
    doctorImg: '/images/dr_zoya_rana.png',
    baBefore: '/images/dr_zoya_portrait.jpg',
    baAfter: '/images/dr_zoya_rana.png',
    stats: { primary: '100%', label: 'Natural Expressive Result', time: 'Immediate' },
    highlights: [
      'HIFU SMAS Layer Non-Surgical Facelift',
      'Hyaluronic Acid Russian Lip Architecture',
      'Mandibular Jawline & Chin Definition',
      'Baby Botox Natural Micro-Tox Protocol'
    ]
  }
];

export const Hero3DAestheticExperience = () => {
  const { openBookingModal } = useClinic();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // States
  const [activeDimIndex, setActiveDimIndex] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [lightingMode, setLightingMode] = useState('gold'); // 'gold', 'studio', 'cyber'
  const [sliderPos, setSliderPos] = useState(50); // Before/After slider %
  const [isLoading, setIsLoading] = useState(true);
  const [screenHotspots, setScreenHotspots] = useState([]);
  const [activeViewMode, setActiveViewMode] = useState('front'); // 'front', 'left', 'right', 'top'

  const activeDim = AESTHETIC_DIMENSIONS[activeDimIndex];

  // Animation & Three.js Refs
  const isAutoSpinRef = useRef(isAutoSpin);
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const mousePointerRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });
  const targetCameraZRef = useRef(3.6);
  const currentCameraZRef = useRef(3.6);
  const previousPointerRef = useRef({ x: 0, y: 0 });
  const headGroupRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const keyLightRef = useRef(null);
  const rimLightRef = useRef(null);
  const wireframeMeshRef = useRef(null);
  const particlesRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    isAutoSpinRef.current = isAutoSpin;
  }, [isAutoSpin]);

  // Handle Lighting Mode Switching
  useEffect(() => {
    if (!keyLightRef.current || !rimLightRef.current) return;
    if (lightingMode === 'gold') {
      keyLightRef.current.color.setHex(0xc5a059);
      rimLightRef.current.color.setHex(0x06b6d4);
      keyLightRef.current.intensity = 3.2;
    } else if (lightingMode === 'studio') {
      keyLightRef.current.color.setHex(0xffffff);
      rimLightRef.current.color.setHex(0xf5ebe0);
      keyLightRef.current.intensity = 2.8;
    } else if (lightingMode === 'cyber') {
      keyLightRef.current.color.setHex(0x10b981);
      rimLightRef.current.color.setHex(0xec4899);
      keyLightRef.current.intensity = 3.5;
    }
  }, [lightingMode]);

  // Mount 3D Scene Once
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 460;
    let height = container.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera with smooth FOV
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.6);
    cameraRef.current = camera;

    // 3. Renderer with ACES ToneMapping & Ultra Alpha
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xc5a059, 3.2);
    keyLight.position.set(3.5, 4.5, 3.5);
    scene.add(keyLight);
    keyLightRef.current = keyLight;

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.8);
    fillLight.position.set(-3.5, 2.5, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 1.5);
    rimLight.position.set(0, -4, -3);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    // 5. Head Group & Aesthetic Concentric Rings
    const headGroup = new THREE.Group();
    scene.add(headGroup);
    headGroupRef.current = headGroup;

    // Golden Ratio Architectural Rings
    const ring1Geo = new THREE.RingGeometry(1.68, 1.70, 72);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: 0xc5a059, 
      side: THREE.DoubleSide, 
      transparent: true, 
      opacity: 0.38 
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 2.15;
    headGroup.add(ring1);

    const ring2Geo = new THREE.RingGeometry(1.95, 1.96, 72);
    const ring2Mat = new THREE.MeshBasicMaterial({ 
      color: 0x10b981, 
      side: THREE.DoubleSide, 
      transparent: true, 
      opacity: 0.22 
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    headGroup.add(ring2);

    // Floating Stardust Particles
    const pCount = 90;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 4.2;
      pPos[i + 1] = (Math.random() - 0.5) * 4.2;
      pPos[i + 2] = (Math.random() - 0.5) * 3;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xc5a059,
      size: 0.04,
      transparent: true,
      opacity: 0.65
    });
    const particles = new THREE.Points(pGeo, pMat);
    headGroup.add(particles);
    particlesRef.current = particles;

    // 6. Load 3D Head Model with Luxury Marble + Holographic Wireframe
    const loader = new GLTFLoader();
    loader.load(
      '/models/head.glb',
      (gltf) => {
        const root = gltf.scene;

        // Base Marble Material
        const marbleMat = new THREE.MeshPhysicalMaterial({
          color: 0xfbf8f3,
          roughness: 0.26,
          metalness: 0.08,
          clearcoat: 0.9,
          clearcoatRoughness: 0.12,
          reflectivity: 0.85,
          sheen: 0.6,
          sheenColor: 0xd4af37
        });

        root.traverse((child) => {
          if (child.isMesh) {
            child.material = marbleMat;
            child.geometry.computeVertexNormals();

            // Create Subtle Golden Hologram Wireframe Clone
            const wireGeo = new THREE.WireframeGeometry(child.geometry);
            const wireMat = new THREE.LineBasicMaterial({ 
              color: 0xc5a059, 
              transparent: true, 
              opacity: 0.14 
            });
            const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
            wireMesh.scale.set(1.002, 1.002, 1.002);
            child.add(wireMesh);
            wireframeMeshRef.current = wireMesh;
          }
        });

        // Center and normalize dimensions
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.45 / maxDim;

        root.position.sub(center.multiplyScalar(scale));
        root.position.y += 0.08;
        root.scale.multiplyScalar(scale);

        headGroup.add(root);
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.warn('Using procedural sculpture', err);
        const fallbackGroup = new THREE.Group();
        const headGeo = new THREE.SphereGeometry(1, 48, 48);
        headGeo.scale(0.85, 1.18, 0.95);
        const fallbackMat = new THREE.MeshPhysicalMaterial({
          color: 0xfbf8f3,
          roughness: 0.25,
          clearcoat: 0.85
        });
        const mesh = new THREE.Mesh(headGeo, fallbackMat);
        fallbackGroup.add(mesh);
        headGroup.add(fallbackGroup);
        setIsLoading(false);
      }
    );

    // 7. Interactive Mouse / Touch Parallax & Rotation
    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      isInteractingRef.current = true;
      previousPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      // Ambient mouse tracking for subtle head gaze
      const rect = container.getBoundingClientRect();
      mousePointerRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 0.35,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 0.25
      };

      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousPointerRef.current.x;
      const deltaY = e.clientY - previousPointerRef.current.y;
      previousPointerRef.current = { x: e.clientX, y: e.clientY };

      targetRotationRef.current.y += deltaX * 0.009;
      targetRotationRef.current.x = Math.max(
        -0.48, 
        Math.min(0.48, targetRotationRef.current.x + deltaY * 0.009)
      );
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => {
        isInteractingRef.current = false;
      }, 3000);
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // 8. 60 FPS Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Continuous rotation when idle
      if (isAutoSpinRef.current && !isDraggingRef.current && !isInteractingRef.current) {
        targetRotationRef.current.y += delta * 0.32;
      }

      // Parallax gaze tracking when not dragging
      const gazeX = isDraggingRef.current ? 0 : mousePointerRef.current.y;
      const gazeY = isDraggingRef.current ? 0 : mousePointerRef.current.x;

      // Smooth damping
      currentRotationRef.current.y += (targetRotationRef.current.y + gazeY - currentRotationRef.current.y) * 0.08;
      currentRotationRef.current.x += (targetRotationRef.current.x + gazeX - currentRotationRef.current.x) * 0.08;
      currentCameraZRef.current += (targetCameraZRef.current - currentCameraZRef.current) * 0.07;

      if (cameraRef.current) {
        cameraRef.current.position.z = currentCameraZRef.current;
      }

      if (headGroupRef.current) {
        headGroupRef.current.rotation.y = currentRotationRef.current.y;
        headGroupRef.current.rotation.x = currentRotationRef.current.x;

        // Subtle biological breathing float
        headGroupRef.current.position.y = Math.sin(elapsed * 1.4) * 0.04;
        ring1.rotation.z = elapsed * 0.22;
        ring2.rotation.x = elapsed * -0.18;

        if (particlesRef.current) {
          particlesRef.current.rotation.y = elapsed * 0.1;
        }
      }

      renderer.render(scene, camera);

      // Project 3D Hotspot Coordinates to Screen Space
      if (headGroupRef.current && cameraRef.current) {
        const calculatedHotspots = AESTHETIC_DIMENSIONS.map((dim, idx) => {
          const worldPos = dim.hotspot3D.clone();
          worldPos.applyMatrix4(headGroupRef.current.matrixWorld);

          const cameraDir = cameraRef.current.position.clone().sub(worldPos).normalize();
          const normal = worldPos.clone().sub(headGroupRef.current.position).normalize();
          const dot = cameraDir.dot(normal);

          const projected = worldPos.project(cameraRef.current);
          const x = (projected.x * 0.5 + 0.5) * width;
          const y = (-(projected.y * 0.5) + 0.5) * height;

          return {
            ...dim,
            index: idx,
            screenX: x,
            screenY: y,
            isVisible: dot > 0.12
          };
        });

        setScreenHotspots(calculatedHotspots);
      }
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      width = container.clientWidth;
      height = container.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
    };
  }, []);

  // Smooth Focus Transition to Chosen Dimension
  const handleSelectDimension = (index) => {
    setActiveDimIndex(index);
    isInteractingRef.current = true;
    const dim = AESTHETIC_DIMENSIONS[index];

    if (dim && dim.cameraTarget) {
      targetRotationRef.current = {
        x: dim.cameraTarget.rotX,
        y: dim.cameraTarget.rotY
      };
      targetCameraZRef.current = dim.cameraTarget.posZ || 3.5;
    }

    setTimeout(() => {
      isInteractingRef.current = false;
    }, 3500);
  };

  // Quick Camera Presets
  const setCameraPreset = (preset) => {
    setActiveViewMode(preset);
    isInteractingRef.current = true;
    if (preset === 'front') {
      targetRotationRef.current = { x: 0, y: 0 };
      targetCameraZRef.current = 3.6;
    } else if (preset === 'left') {
      targetRotationRef.current = { x: 0, y: 0.75 };
      targetCameraZRef.current = 3.5;
    } else if (preset === 'right') {
      targetRotationRef.current = { x: 0, y: -0.75 };
      targetCameraZRef.current = 3.5;
    } else if (preset === 'top') {
      targetRotationRef.current = { x: -0.45, y: 0 };
      targetCameraZRef.current = 3.3;
    }
    setTimeout(() => { isInteractingRef.current = false; }, 3000);
  };

  return (
    <div className="w-full relative">

      {/* Top Floating Dimension Navigation Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[#EAE4DC] pb-4">
        
        {/* Dimension Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {AESTHETIC_DIMENSIONS.map((dim, idx) => {
            const isActive = activeDimIndex === idx;
            return (
              <button
                key={dim.id}
                onClick={() => handleSelectDimension(idx)}
                className={`group flex items-center space-x-2 py-2 px-3.5 sm:px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#090D14] text-white shadow-xl scale-105 border border-[#C5A059]'
                    : 'bg-white/95 text-[#475569] border border-[#E8E2D9] hover:border-[#C5A059] hover:bg-[#FAF6EE]'
                }`}
              >
                <span className="text-[10px] font-mono text-[#C5A059] opacity-80">{dim.num}</span>
                <span>{dim.icon}</span>
                <span className="tracking-wide">{dim.title.split(' ')[0]} {dim.title.split(' ')[1]}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Cinematic Studio Controls */}
        <div className="flex items-center space-x-2 text-xs">
          {/* Light Theme */}
          <div className="hidden sm:flex items-center space-x-1 bg-white px-2 py-1 rounded-full border border-[#E8E2D9] text-[10px] font-semibold text-[#64748B]">
            <span>Light:</span>
            <button 
              onClick={() => setLightingMode('gold')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${lightingMode === 'gold' ? 'bg-[#C5A059] text-white font-bold' : 'hover:text-black'}`}
            >
              Gold
            </button>
            <button 
              onClick={() => setLightingMode('studio')}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${lightingMode === 'studio' ? 'bg-[#090D14] text-white font-bold' : 'hover:text-black'}`}
            >
              Pure
            </button>
          </div>

          {/* Auto Spin Toggle */}
          <button
            onClick={() => setIsAutoSpin(prev => !prev)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8E2D9] hover:border-[#C5A059] text-[#0F172A] text-xs font-semibold shadow-2xs cursor-pointer transition-all"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoSpin ? 'animate-spin' : ''}`} />
            <span>{isAutoSpin ? 'Auto-Spin: ON' : 'Paused'}</span>
          </button>
        </div>

      </div>

      {/* Main 3D Experience Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left / Center: Interactive 3D Holographic Head (Col 6) */}
        <div className="lg:col-span-6 relative flex flex-col items-center">
          
          {/* Ambient Luminescent Glow */}
          <div 
            className="absolute inset-0 rounded-full blur-3xl opacity-50 -z-10 transition-all duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${activeDim.color}45 0%, rgba(197, 160, 89, 0.15) 55%, transparent 75%)`
            }}
          />

          {/* WebGL Canvas & Hotspot Stage */}
          <div 
            ref={containerRef}
            className="w-full h-[410px] sm:h-[470px] relative select-none touch-none"
          >
            {/* Dedicated Three.js Canvas */}
            <canvas 
              ref={canvasRef} 
              className="w-full h-full cursor-grab active:cursor-grabbing block"
            />

            {/* Sibling Overlay: Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-[#FAF8F5]/85 backdrop-blur-xs pointer-events-none">
                <div className="w-9 h-9 rounded-full border-2 border-[#C5A059] border-t-transparent animate-spin" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#0F172A] font-bold">
                  Synthesizing 3D Anatomy Mesh...
                </span>
              </div>
            )}

            {/* Sibling Overlay: 3D Holographic Hotspot Beacons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {!isLoading && screenHotspots.map((spot) => {
                if (!spot.isVisible) return null;
                const isSelected = activeDimIndex === spot.index;
                return (
                  <div
                    key={spot.id}
                    onClick={() => handleSelectDimension(spot.index)}
                    style={{
                      left: `${spot.screenX}px`,
                      top: `${spot.screenY}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className="absolute cursor-pointer pointer-events-auto group z-20 transition-transform hover:scale-130"
                  >
                    {/* Outer Radiating Pulse Wave */}
                    <div 
                      className="w-9 h-9 rounded-full absolute -inset-1.5 opacity-75 animate-ping pointer-events-none"
                      style={{ backgroundColor: spot.color }}
                    />

                    {/* Central Glowing Pearl Beacon */}
                    <div 
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-xl border-2 border-white transition-all ${
                        isSelected 
                          ? 'ring-4 ring-[#C5A059] scale-120 shadow-[0_0_20px_#C5A059]' 
                          : 'opacity-90 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: spot.color }}
                    >
                      <span className="drop-shadow-xs">{spot.icon}</span>
                    </div>

                    {/* Interactive Floating Pill Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute left-1/2 -translate-x-1/2 bottom-8 bg-[#090D14] text-white text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shadow-2xl pointer-events-none border border-[#C5A059]/50 flex items-center space-x-1">
                      <span>{spot.icon}</span>
                      <span>{spot.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Camera Angle Buttons (Bottom-Left of canvas) */}
            <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/15 text-[10px] font-mono text-white">
              {[
                { key: 'front', label: 'Front' },
                { key: 'left', label: 'Smile' },
                { key: 'right', label: 'Profile' },
                { key: 'top', label: 'Scalp' }
              ].map(preset => (
                <button
                  key={preset.key}
                  onClick={() => setCameraPreset(preset.key)}
                  className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                    activeViewMode === preset.key 
                      ? 'bg-[#C5A059] text-black font-bold' 
                      : 'hover:bg-white/20 text-white/80'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Verified Clinical Seal (Top-Right of canvas) */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-[#C5A059]/40 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F172A]">
                Dehradun & MZN
              </span>
            </div>

          </div>

          {/* Interactive Hint Bar */}
          <div className="w-full flex items-center justify-between text-[11px] font-medium text-[#64748B] pt-2 px-3 border-t border-[#EAE4DC]/60">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>3D Anatomy Active • Drag to Rotate 360°</span>
            </span>
            <span className="text-[10px] font-mono text-[#C5A059]">
              ✦ Touch pins to focus clinical protocols
            </span>
          </div>

        </div>

        {/* Right: The Luxury Clinical Transformation Showcase (Col 6) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Cinematic Glassmorphic Card */}
          <div className="bg-gradient-to-b from-white/95 via-[#FAF8F5]/90 to-white/95 backdrop-blur-xl rounded-3xl p-6 border border-[#EAE4DC] shadow-2xl space-y-5 relative overflow-hidden">
            
            {/* Ambient Corner Flare */}
            <div 
              className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ backgroundColor: activeDim.color }}
            />

            {/* Department Header */}
            <div className="flex items-start justify-between border-b border-[#EAE4DC] pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{activeDim.icon}</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C5A059]">
                    DNA CLINICAL PROTOCOL {activeDim.num}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0F172A] leading-tight">
                  {activeDim.title}
                </h3>
                <p className="text-xs text-[#64748B] font-medium">
                  {activeDim.subtitle}
                </p>
              </div>

              {/* Verified Result Metric Badge */}
              <div className="text-right shrink-0 bg-[#FAF6EE] px-3.5 py-2 rounded-2xl border border-[#C5A059]/30 shadow-xs">
                <div className="font-serif text-xl font-bold text-[#0F172A]">
                  {activeDim.stats.primary}
                </div>
                <div className="text-[9px] font-bold text-[#C5A059] uppercase tracking-wider">
                  {activeDim.stats.label}
                </div>
              </div>
            </div>

            {/* Interactive Before & After Transformation Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#0F172A]">
                <span className="flex items-center space-x-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Clinical Result Verification</span>
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">
                  Slide to Compare: {sliderPos}%
                </span>
              </div>

              {/* Slider Visual Container */}
              <div className="relative h-44 sm:h-48 rounded-2xl overflow-hidden shadow-inner border border-[#EAE4DC] select-none bg-black">
                {/* "After" Image (Background) */}
                <img
                  src={activeDim.baAfter}
                  alt={`${activeDim.title} After Result`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <span className="absolute bottom-2.5 right-3 bg-[#090D14]/85 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/20 backdrop-blur-sm z-10">
                  AFTER PROTOCOL
                </span>

                {/* "Before" Image (Clipped by sliderPos) */}
                <div 
                  className="absolute inset-0 overflow-hidden border-r-2 border-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={activeDim.baBefore}
                    alt={`${activeDim.title} Before`}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: 'none' }}
                  />
                  <span className="absolute bottom-2.5 left-3 bg-[#090D14]/85 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/20 backdrop-blur-sm">
                    BEFORE
                  </span>
                </div>

                {/* Interactive Drag Control */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />

                {/* Floating Divider Handle */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-7 h-7 -ml-3.5 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-none z-10 border border-[#C5A059]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <Sliders className="w-3.5 h-3.5 text-[#0F172A]" />
                </div>
              </div>
            </div>

            {/* Verified Clinical Procedures Checklist */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                Doctor's Prescribed Modalities:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeDim.highlights.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center space-x-2 text-xs text-[#0F172A] bg-white/90 p-2 rounded-xl border border-[#EAE4DC] shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span className="truncate font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor Signature & Instant Action Bar */}
            <div className="pt-3 border-t border-[#EAE4DC] flex flex-wrap items-center justify-between gap-3">
              {/* Doctor Details */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={activeDim.doctorImg} 
                    alt={activeDim.doctor} 
                    className="w-10 h-10 rounded-full object-cover object-top border-2 border-[#C5A059] shadow-xs"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">
                    {activeDim.doctor}
                  </div>
                  <div className="text-[10px] text-[#64748B] font-medium">
                    {activeDim.doctorRole}
                  </div>
                </div>
              </div>

              {/* Direct Booking Action */}
              <button
                onClick={() => openBookingModal(activeDim.title)}
                className="btn-gold px-5 py-2.5 rounded-full text-xs font-bold flex items-center space-x-2 shadow-md hover:shadow-xl transition-all cursor-pointer group"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book This Protocol</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
