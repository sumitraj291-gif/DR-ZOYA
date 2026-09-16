import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { 
  Sparkles, 
  Play, 
  Pause, 
  RotateCw, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

// 4 Visual Simulation Phases (Total 28 Seconds Cycle: ~7s each)
const SIMULATION_PHASES = [
  {
    id: 'hair',
    num: '01',
    title: 'Scalp PRP & Follicle Regrowth',
    icon: '🌿',
    color: '#06B6D4',
    timeRange: [0, 7],
    targetCamera: { rotY: 0.0, rotX: -0.58, posZ: 2.85 },
    badge: 'PRP Follicle Infusion Active',
    metric: '+45% Density Awoken',
    doctor: 'Dr. Zoya Rana',
    doctorRole: 'Certified Hair Specialist'
  },
  {
    id: 'skin',
    num: '02',
    title: 'Dermal Hydra & Laser Clarity',
    icon: '✨',
    color: '#C5A059',
    timeRange: [7, 14],
    targetCamera: { rotY: 0.42, rotX: 0.02, posZ: 2.95 },
    badge: 'Laser Clarity & Glass Skin Scan',
    metric: '99.4% Pore Reset',
    doctor: 'Dr. Zoya Rana',
    doctorRole: 'Chief Aesthetic Physician'
  },
  {
    id: 'smile',
    num: '03',
    title: 'Digital 3D Smile Makeover',
    icon: '🦷',
    color: '#10B981',
    timeRange: [14, 21],
    targetCamera: { rotY: 0.0, rotX: 0.18, posZ: 2.65 },
    badge: 'Ceramic Veneer Arch Aligning',
    metric: '0.1mm Precision Smile',
    doctor: 'Dr. Varsha Jha',
    doctorRole: 'Lead Dental Surgeon'
  },
  {
    id: 'contour',
    num: '04',
    title: 'SMAS Jawline Sculpt & Lift',
    icon: '💎',
    color: '#E11D48',
    timeRange: [21, 28],
    targetCamera: { rotY: -0.65, rotX: 0.08, posZ: 3.05 },
    badge: 'Mandibular V-Line Tightening',
    metric: '100% Sharp Contour',
    doctor: 'Dr. Zoya Rana',
    doctorRole: 'Director DNA Clinics'
  }
];

export const Hero3DAestheticExperience = () => {
  const { openBookingModal } = useClinic();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // 28-Second Cinematic Simulation Clock
  const [simTime, setSimTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Active Phase calculation
  const activePhaseIndex = Math.min(
    3, 
    Math.max(0, Math.floor(simTime / 7))
  );
  const activePhase = SIMULATION_PHASES[activePhaseIndex];

  // Refs for 60fps render loop
  const simTimeRef = useRef(0);
  const isPlayingRef = useRef(true);
  const isUserInteractingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const targetRotationRef = useRef({ x: -0.58, y: 0.0 });
  const currentRotationRef = useRef({ x: -0.58, y: 0.0 });
  const targetCameraZRef = useRef(2.85);
  const currentCameraZRef = useRef(2.85);
  const previousPointerRef = useRef({ x: 0, y: 0 });

  // Three.js References
  const headGroupRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const skinMaterialRef = useRef(null);
  const animationFrameRef = useRef(null);

  // 3D Effect Groups
  const hairFXGroupRef = useRef(null);
  const skinFXGroupRef = useRef(null);
  const smileFXGroupRef = useRef(null);
  const contourFXGroupRef = useRef(null);
  const hairRaysMeshRef = useRef(null);
  const smileStarsGroupRef = useRef(null);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Jump to Phase directly on click
  const handleJumpToPhase = (phaseIdx) => {
    const targetSec = phaseIdx * 7 + 0.1;
    simTimeRef.current = targetSec;
    setSimTime(targetSec);
    const phase = SIMULATION_PHASES[phaseIdx];
    if (phase) {
      targetRotationRef.current = {
        x: phase.targetCamera.rotX,
        y: phase.targetCamera.rotY
      };
      targetCameraZRef.current = phase.targetCamera.posZ;
    }
  };

  // Mount Three.js Once
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 560;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 2.85);
    cameraRef.current = camera;

    // 3. Renderer with ACES ToneMapping
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

    // 4. Portrait Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 3.6);
    keyLight.position.set(3.5, 4.2, 3.8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.7);
    fillLight.position.set(-3.5, 2.2, 2.8);
    scene.add(fillLight);

    const goldRimLight = new THREE.DirectionalLight(0xc5a059, 2.6);
    goldRimLight.position.set(0, -3.5, -2.8);
    scene.add(goldRimLight);

    // 5. Head Group
    const headGroup = new THREE.Group();
    scene.add(headGroup);
    headGroupRef.current = headGroup;

    // Floating Stardust Starlight Particles
    const pCount = 110;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 4.2;
      pPos[i + 1] = (Math.random() - 0.5) * 4.2;
      pPos[i + 2] = (Math.random() - 0.5) * 3.0;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xc5a059,
      size: 0.038,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(pGeo, pMat);
    headGroup.add(particles);

    // ===============================================
    // 3D SIMULATION VISUAL EFFECTS (ATTACHED TO HEAD)
    // ===============================================

    // 1. HAIR & SCALP EFFECT (PRP Concentrated Energy Halo + Growing Follicle Rays)
    const hairFX = new THREE.Group();
    const haloGeo = new THREE.RingGeometry(0.55, 0.78, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.set(0, 0.98, 0.38);
    haloMesh.rotation.x = Math.PI / 2.05;
    hairFX.add(haloMesh);

    // Dynamic growing follicle strands
    const hairRayCount = 36;
    const hairRayGeo = new THREE.BufferGeometry();
    const hairRayPos = new Float32Array(hairRayCount * 6);
    for (let i = 0; i < hairRayCount; i++) {
      const angle = (i / hairRayCount) * Math.PI * 2;
      const r = 0.52 + Math.random() * 0.22;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r * 0.85;
      const y = 0.96;
      hairRayPos[i * 6] = x;
      hairRayPos[i * 6 + 1] = y;
      hairRayPos[i * 6 + 2] = z;
      hairRayPos[i * 6 + 3] = x;
      hairRayPos[i * 6 + 4] = y + 0.25; // hair height
      hairRayPos[i * 6 + 5] = z;
    }
    hairRayGeo.setAttribute('position', new THREE.BufferAttribute(hairRayPos, 3));
    const hairRayMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.9 });
    const hairRays = new THREE.LineSegments(hairRayGeo, hairRayMat);
    hairFX.add(hairRays);
    hairRaysMeshRef.current = hairRays;

    headGroup.add(hairFX);
    hairFXGroupRef.current = hairFX;

    // 2. DERMAL SKIN EFFECT (Golden Laser Sweeper Grid over cheek)
    const skinFX = new THREE.Group();
    const dermalDiskGeo = new THREE.RingGeometry(0.32, 0.52, 32);
    const dermalDiskMat = new THREE.MeshBasicMaterial({
      color: 0xc5a059,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    });
    const dermalDisk = new THREE.Mesh(dermalDiskGeo, dermalDiskMat);
    dermalDisk.position.set(0.60, -0.05, 0.76);
    dermalDisk.rotation.y = Math.PI / 3.8;
    skinFX.add(dermalDisk);

    // Laser crosshair
    const chGeo = new THREE.BufferGeometry();
    const chPos = new Float32Array([
      -0.22, 0, 0, 0.22, 0, 0,
      0, -0.22, 0, 0, 0.22, 0
    ]);
    chGeo.setAttribute('position', new THREE.BufferAttribute(chPos, 3));
    const chMat = new THREE.LineBasicMaterial({ color: 0xffd700 });
    const chMesh = new THREE.LineSegments(chGeo, chMat);
    chMesh.position.copy(dermalDisk.position);
    chMesh.rotation.copy(dermalDisk.rotation);
    skinFX.add(chMesh);

    headGroup.add(skinFX);
    skinFXGroupRef.current = skinFX;

    // 3. DIGITAL SMILE ARCH (Glowing Dental Veneer Curve with Sparkling Stars)
    const smileFX = new THREE.Group();
    const smileCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.35, -0.44, 0.98),
      new THREE.Vector3(-0.18, -0.40, 1.05),
      new THREE.Vector3(0.0, -0.38, 1.08),
      new THREE.Vector3(0.18, -0.40, 1.05),
      new THREE.Vector3(0.35, -0.44, 0.98)
    ]);
    const smileTubeGeo = new THREE.TubeGeometry(smileCurve, 32, 0.024, 12, false);
    const smileTubeMat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.9 });
    const smileTube = new THREE.Mesh(smileTubeGeo, smileTubeMat);
    smileFX.add(smileTube);

    // Sparkling tooth nodes
    const starsGroup = new THREE.Group();
    for (let t = 0; t <= 1; t += 0.2) {
      const pt = smileCurve.getPoint(t);
      const starGeo = new THREE.SphereGeometry(0.035, 16, 16);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(starGeo, starMat);
      star.position.copy(pt);
      starsGroup.add(star);
    }
    smileFX.add(starsGroup);
    smileStarsGroupRef.current = starsGroup;

    headGroup.add(smileFX);
    smileFXGroupRef.current = smileFX;

    // 4. CONTOUR & JAWLINE (Rose Gold Mandibular Lift Line)
    const contourFX = new THREE.Group();
    const jawCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.75, -0.22, 0.45),
      new THREE.Vector3(-0.68, -0.48, 0.65),
      new THREE.Vector3(-0.45, -0.68, 0.82),
      new THREE.Vector3(0.0, -0.74, 0.92)
    ]);
    const jawTubeGeo = new THREE.TubeGeometry(jawCurve, 32, 0.022, 12, false);
    const jawTubeMat = new THREE.MeshBasicMaterial({ color: 0xe11d48, transparent: true, opacity: 0.9 });
    const jawTube = new THREE.Mesh(jawTubeGeo, jawTubeMat);
    contourFX.add(jawTube);

    headGroup.add(contourFX);
    contourFXGroupRef.current = contourFX;

    // ===============================================
    // LOAD REALISTIC HUMAN HEAD
    // ===============================================
    const loader = new GLTFLoader();
    loader.load(
      '/models/head.glb',
      (gltf) => {
        const root = gltf.scene;
        const skinMat = new THREE.MeshPhysicalMaterial({
          color: 0xdfb49d,
          roughness: 0.58,
          metalness: 0.0,
          clearcoat: 0.24,
          clearcoatRoughness: 0.32,
          reflectivity: 0.55,
          sheen: 0.75,
          sheenColor: 0xd97757
        });
        skinMaterialRef.current = skinMat;

        root.traverse((child) => {
          if (child.isMesh) {
            child.material = skinMat;
            child.geometry.computeVertexNormals();
          }
        });

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
        const skinMat = new THREE.MeshPhysicalMaterial({
          color: 0xdfb49d,
          roughness: 0.55,
          clearcoat: 0.25
        });
        skinMaterialRef.current = skinMat;
        const mesh = new THREE.Mesh(headGeo, skinMat);
        fallbackGroup.add(mesh);
        headGroup.add(fallbackGroup);
        setIsLoading(false);
      }
    );

    // ===============================================
    // MANUAL DRAG INTERACTION HANDLERS
    // ===============================================
    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      isUserInteractingRef.current = true;
      previousPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousPointerRef.current.x;
      const deltaY = e.clientY - previousPointerRef.current.y;
      previousPointerRef.current = { x: e.clientX, y: e.clientY };

      targetRotationRef.current.y += deltaX * 0.009;
      targetRotationRef.current.x = Math.max(
        -0.65, 
        Math.min(0.65, targetRotationRef.current.x + deltaY * 0.009)
      );
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 4000);
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // ===============================================
    // 28-SECOND ANIMATION LOOP & SIMULATION ENGINE
    // ===============================================
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Progress 28-second simulation time
      if (isPlayingRef.current) {
        simTimeRef.current = (simTimeRef.current + delta) % 28;
        setSimTime(simTimeRef.current);

        // Auto-direct camera to current phase if user isn't manually dragging
        if (!isUserInteractingRef.current) {
          const currentPhaseIdx = Math.min(3, Math.floor(simTimeRef.current / 7));
          const p = SIMULATION_PHASES[currentPhaseIdx];
          if (p) {
            targetRotationRef.current = {
              x: p.targetCamera.rotX,
              y: p.targetCamera.rotY
            };
            targetCameraZRef.current = p.targetCamera.posZ;
          }
        }
      }

      // Smooth camera and head movement
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentCameraZRef.current += (targetCameraZRef.current - currentCameraZRef.current) * 0.07;

      if (cameraRef.current) {
        cameraRef.current.position.z = currentCameraZRef.current;
      }

      if (headGroupRef.current) {
        headGroupRef.current.rotation.y = currentRotationRef.current.y;
        headGroupRef.current.rotation.x = currentRotationRef.current.x;
        headGroupRef.current.position.y = Math.sin(elapsed * 1.4) * 0.025;
      }

      // Activate corresponding visual simulation on 3D model based on simTime
      const curPhase = Math.floor(simTimeRef.current / 7);

      // Phase 0: Hair (0-7s)
      if (hairFXGroupRef.current) {
        const isHair = curPhase === 0;
        hairFXGroupRef.current.visible = isHair;
        if (isHair) {
          haloMesh.rotation.z = elapsed * 0.8;
          // Animate growing hair rays
          const growth = (Math.sin(elapsed * 4) * 0.5 + 0.5);
          if (hairRaysMeshRef.current) {
            hairRaysMeshRef.current.scale.set(1, 0.7 + growth * 0.6, 1);
          }
        }
      }

      // Phase 1: Skin (7-14s)
      if (skinFXGroupRef.current) {
        const isSkin = curPhase === 1;
        skinFXGroupRef.current.visible = isSkin;
        if (isSkin) {
          dermalDisk.rotation.z = elapsed * 0.9;
          // Skin glow aura effect
          if (skinMaterialRef.current) {
            skinMaterialRef.current.clearcoat = 0.2 + (Math.sin(elapsed * 3) * 0.5 + 0.5) * 0.4;
          }
        }
      }

      // Phase 2: Smile (14-21s)
      if (smileFXGroupRef.current) {
        const isSmile = curPhase === 2;
        smileFXGroupRef.current.visible = isSmile;
        if (isSmile && smileStarsGroupRef.current) {
          smileTube.material.opacity = 0.7 + Math.sin(elapsed * 4) * 0.25;
          smileStarsGroupRef.current.children.forEach((c, idx) => {
            c.scale.setScalar(1 + Math.sin(elapsed * 5 + idx) * 0.35);
          });
        }
      }

      // Phase 3: Contour (21-28s)
      if (contourFXGroupRef.current) {
        const isContour = curPhase === 3;
        contourFXGroupRef.current.visible = isContour;
        if (isContour) {
          jawTube.material.opacity = 0.75 + Math.sin(elapsed * 3.5) * 0.22;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

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

  return (
    <div className="w-full relative">

      {/* 3D Clinical Stage Viewport */}
      <div 
        ref={containerRef}
        className="w-full h-[480px] sm:h-[540px] relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EDE4]/60 to-[#FAF8F5] border border-[#EAE4DC] shadow-2xl select-none"
      >
        {/* Dynamic Atmospheric Glow */}
        <div 
          className="absolute inset-0 rounded-full blur-3xl opacity-40 -z-10 transition-all duration-1000 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${activePhase.color}55 0%, rgba(197, 160, 89, 0.15) 55%, transparent 75%)`
          }}
        />

        {/* 3D WebGL Canvas */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full cursor-grab active:cursor-grabbing block"
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-[#FAF8F5]/85 backdrop-blur-xs pointer-events-none">
            <div className="w-9 h-9 rounded-full border-2 border-[#C5A059] border-t-transparent animate-spin" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#0F172A] font-bold">
              Loading 3D Anatomy Simulator...
            </span>
          </div>
        )}

        {/* TOP HUD: Live Clinical Scan Readout */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          
          {/* Active Phase Chip */}
          <div className="bg-[#090D14]/90 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 flex items-center space-x-2.5 shadow-xl">
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: activePhase.color }} />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white flex items-center space-x-1.5">
              <span>{activePhase.icon}</span>
              <span style={{ color: activePhase.color }}>{activePhase.badge}</span>
            </span>
          </div>

          {/* Real-time Metric Pill */}
          <div className="hidden sm:flex items-center space-x-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-[#C5A059]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-xs font-bold text-[#0F172A]">{activePhase.metric}</span>
          </div>
        </div>

        {/* CENTER FLOATING BIG ACTION BUTTON (Instant One-Click Booking) */}
        <div className="absolute top-4 right-4 sm:top-auto sm:bottom-20 sm:right-6 z-20">
          <button
            onClick={() => openBookingModal(activePhase.title)}
            className="btn-gold px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-2xl hover:scale-105 transition-all cursor-pointer group border border-white/40"
          >
            <Calendar className="w-4 h-4" />
            <span>Book {activePhase.title.split(' ')[0]} Care</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* USER ROTATION HINT */}
        <div className="absolute top-16 left-4 pointer-events-none hidden sm:block">
          <span className="bg-black/50 text-white/80 text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-xs">
            ✋ Drag 360° to inspect anytime
          </span>
        </div>

        {/* BOTTOM HUD: 28-Second Visual Journey Scrubber & Controls */}
        <div className="absolute bottom-4 left-4 right-4 bg-[#090D14]/90 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-white/15 shadow-2xl z-20 space-y-2.5">
          
          {/* Scrubber Progress Bar */}
          <div className="relative h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-100 rounded-full"
              style={{
                width: `${(simTime / 28) * 100}%`,
                backgroundColor: activePhase.color
              }}
            />
          </div>

          {/* 4 Phase Selectors & Timeline Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            
            {/* 4 Phase Quick-Jump Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {SIMULATION_PHASES.map((p, idx) => {
                const isCur = activePhaseIndex === idx;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleJumpToPhase(idx)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isCur
                        ? 'bg-white text-black shadow-lg scale-105'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span className="hidden sm:inline">{p.title.split(' ')[0]}</span>
                    {isCur && (
                      <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: p.color }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Play/Pause & Time Indicator */}
            <div className="flex items-center space-x-3 text-xs text-white">
              <span className="font-mono text-[11px] text-[#C5A059] font-bold">
                {Math.floor(simTime)}s / 28s
              </span>

              <button
                onClick={() => setIsPlaying(prev => !prev)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center cursor-pointer transition-all text-white"
                title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
