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
  ShieldCheck,
  Eye,
  Activity,
  UserCheck
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

// 4 Cinematic Treatment Dimensions with exact anatomical camera targets & overlays
const AESTHETIC_DIMENSIONS = [
  {
    id: 'skin',
    num: '01',
    title: 'Medical Dermal Radiance',
    subtitle: 'US-FDA Lasers & Hydra Vortex Infusion',
    tagline: 'Flawless glass skin texture, scar remodeling & pigmentation clearance.',
    icon: '✨',
    color: '#C5A059',
    badgeText: 'Dermal Layer Scan',
    cameraTarget: { rotY: 0.38, rotX: 0.02, posZ: 3.1 },
    hotspot3D: new THREE.Vector3(0.62, -0.05, 0.78),
    doctor: 'Dr. Zoya Rana',
    doctorRole: 'Director & Chief Aesthetic Physician',
    doctorImg: '/images/dr_zoya_rana.png',
    baBefore: '/images/ba_skin_before.png',
    baAfter: '/images/ba_skin_after.png',
    stats: { primary: '99.4%', label: 'Pore & Texture Clearance', time: '45 Mins' },
    focusDescription: 'Focused on Dermal Complexion: Pore tightening, active acne scar revision, and vortex deep hydration on the cheeks & forehead.',
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
    badgeText: 'Dental Arch Focus',
    cameraTarget: { rotY: 0.0, rotX: 0.18, posZ: 2.7 }, // Zoomed close on mouth
    hotspot3D: new THREE.Vector3(0, -0.42, 1.05),
    doctor: 'Dr. Varsha Jha',
    doctorRole: 'Lead Dental Surgeon & Smile Specialist',
    doctorImg: '/images/dr_varsha_jha.png',
    baBefore: '/images/ba_smile_before.png',
    baAfter: '/images/ba_smile_after.png',
    stats: { primary: '0.1mm', label: 'Ceramic Veneer Precision', time: '2 Visits' },
    focusDescription: 'Focused on Dental Alignment & Smile Arch: Computerized smile proportion, porcelain ceramic veneers, and zero-pain single-sitting root canals.',
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
    badgeText: 'Scalp & Crown View',
    cameraTarget: { rotY: 0.0, rotX: -0.54, posZ: 3.0 }, // Tilted down looking at scalp
    hotspot3D: new THREE.Vector3(0, 1.05, 0.45),
    doctor: 'Dr. Zoya Talat',
    doctorRole: 'Associate Specialist & Laser Cosmetologist',
    doctorImg: '/images/dr_zoya_talat.png',
    baBefore: '/images/hair_rejuvenation.png',
    baAfter: '/images/hair_rejuvenation.png',
    stats: { primary: '+45%', label: 'Verified Hair Density Boost', time: 'Monthly' },
    focusDescription: 'Focused on Trichology & Scalp Crown: Reactivating dormant hair roots, micro-nutrient delivery, and concentrated growth factor injections.',
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
    badgeText: 'Mandibular Profile',
    cameraTarget: { rotY: -0.62, rotX: 0.08, posZ: 3.2 }, // 3/4 Jawline Profile
    hotspot3D: new THREE.Vector3(-0.6, -0.6, 0.75),
    doctor: 'Dr. Zoya Rana',
    doctorRole: 'Director & Chief Aesthetic Physician',
    doctorImg: '/images/dr_zoya_rana.png',
    baBefore: '/images/dr_zoya_portrait.jpg',
    baAfter: '/images/dr_zoya_rana.png',
    stats: { primary: '100%', label: 'Natural Expressive Result', time: 'Immediate' },
    focusDescription: 'Focused on Jawline & Facial Symmetry: Non-surgical SMAS lifting, Russian lip architecture, and sharp mandibular definition.',
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
  const [sliderPos, setSliderPos] = useState(50); // Before/After slider %
  const [isLoading, setIsLoading] = useState(true);
  const [screenHotspots, setScreenHotspots] = useState([]);
  const [isAutoSpin, setIsAutoSpin] = useState(false); // AUTO ROTATION OFF BY DEFAULT per user request

  const activeDim = AESTHETIC_DIMENSIONS[activeDimIndex];

  // Animation & Three.js Refs
  const isAutoSpinRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const mousePointerRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.02, y: 0.38 }); // Start focused on Dermal
  const currentRotationRef = useRef({ x: 0.02, y: 0.38 });
  const targetCameraZRef = useRef(3.1);
  const currentCameraZRef = useRef(3.1);
  const previousPointerRef = useRef({ x: 0, y: 0 });
  const headGroupRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);

  // 4 Dedicated 3D Anatomical Overlays
  const dermalOverlayRef = useRef(null);
  const smileOverlayRef = useRef(null);
  const scalpOverlayRef = useRef(null);
  const contourOverlayRef = useRef(null);

  useEffect(() => {
    isAutoSpinRef.current = isAutoSpin;
  }, [isAutoSpin]);

  // Update 3D Anatomical Overlays Visibility based on activeDim
  useEffect(() => {
    if (dermalOverlayRef.current) dermalOverlayRef.current.visible = activeDim.id === 'skin';
    if (smileOverlayRef.current) smileOverlayRef.current.visible = activeDim.id === 'smile';
    if (scalpOverlayRef.current) scalpOverlayRef.current.visible = activeDim.id === 'hair';
    if (contourOverlayRef.current) contourOverlayRef.current.visible = activeDim.id === 'contour';
  }, [activeDimIndex]);

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
    camera.position.set(0, 0, 3.1);
    cameraRef.current = camera;

    // 3. Renderer with ACES Filmic ToneMapping for Lifelike Human Skin Tone
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.28;
    rendererRef.current = renderer;

    // 4. Photorealistic Portrait Studio Lighting Rig (Warm Key + Soft Cool Fill + Gold Rim)
    const ambientLight = new THREE.AmbientLight(0xfff3e8, 1.8);
    scene.add(ambientLight);

    // Warm Key Light (Softbox 3500K)
    const keyLight = new THREE.DirectionalLight(0xffeedd, 3.4);
    keyLight.position.set(3.2, 4.0, 3.8);
    scene.add(keyLight);

    // Soft Cool Ambient Sky Fill Light
    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.6);
    fillLight.position.set(-3.2, 2.0, 2.8);
    scene.add(fillLight);

    // Golden Aesthetic Rim Light (traces jawline, cheekbones, hair)
    const rimLight = new THREE.DirectionalLight(0xc5a059, 2.4);
    rimLight.position.set(0, -3.5, -2.8);
    scene.add(rimLight);

    // 5. Head Group
    const headGroup = new THREE.Group();
    scene.add(headGroup);
    headGroupRef.current = headGroup;

    // Subtle Golden Concentric Ring (Golden Ratio aesthetic frame)
    const ringGeo = new THREE.RingGeometry(1.68, 1.70, 72);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: 0xc5a059, 
      side: THREE.DoubleSide, 
      transparent: true, 
      opacity: 0.3 
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.15;
    headGroup.add(ring);

    // Floating Stardust Particles
    const pCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 4.0;
      pPos[i + 1] = (Math.random() - 0.5) * 4.0;
      pPos[i + 2] = (Math.random() - 0.5) * 2.8;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xc5a059,
      size: 0.035,
      transparent: true,
      opacity: 0.55
    });
    const particles = new THREE.Points(pGeo, pMat);
    headGroup.add(particles);

    // ==========================================
    // 6. BUILD 4 DEDICATED 3D ANATOMICAL OVERLAYS
    // ==========================================

    // OVERLAY 01: Dermal Scanner Grid over Cheek (Golden Dermal Mesh)
    const dermalGroup = new THREE.Group();
    const dermalGridGeo = new THREE.RingGeometry(0.35, 0.48, 32);
    const dermalGridMat = new THREE.MeshBasicMaterial({
      color: 0xc5a059,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    });
    const dermalDisk = new THREE.Mesh(dermalGridGeo, dermalGridMat);
    dermalDisk.position.set(0.60, -0.05, 0.76);
    dermalDisk.rotation.y = Math.PI / 3.8;
    dermalGroup.add(dermalDisk);

    // Scanning crosshair
    const crossGeo = new THREE.BufferGeometry();
    const crossVerts = new Float32Array([
      -0.2, 0, 0,  0.2, 0, 0,
      0, -0.2, 0,  0, 0.2, 0
    ]);
    crossGeo.setAttribute('position', new THREE.BufferAttribute(crossVerts, 3));
    const crossMat = new THREE.LineBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.9 });
    const crossMesh = new THREE.LineSegments(crossGeo, crossMat);
    crossMesh.position.copy(dermalDisk.position);
    crossMesh.rotation.copy(dermalDisk.rotation);
    dermalGroup.add(crossMesh);

    headGroup.add(dermalGroup);
    dermalOverlayRef.current = dermalGroup;
    dermalGroup.visible = true; // active by default (01 Skin)

    // OVERLAY 02: Digital Smile Arch over Mouth/Teeth (Emerald & White Crystalline Arc)
    const smileGroup = new THREE.Group();
    const smileCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.35, -0.44, 0.98),
      new THREE.Vector3(-0.18, -0.40, 1.05),
      new THREE.Vector3(0.0, -0.38, 1.08),
      new THREE.Vector3(0.18, -0.40, 1.05),
      new THREE.Vector3(0.35, -0.44, 0.98)
    ]);
    const smileTubeGeo = new THREE.TubeGeometry(smileCurve, 32, 0.022, 12, false);
    const smileTubeMat = new THREE.MeshBasicMaterial({ 
      color: 0x10b981, 
      transparent: true, 
      opacity: 0.85 
    });
    const smileTube = new THREE.Mesh(smileTubeGeo, smileTubeMat);
    smileGroup.add(smileTube);

    // Sparkling Teeth Nodes along smile arch
    for (let t = 0; t <= 1; t += 0.25) {
      const pt = smileCurve.getPoint(t);
      const toothNodeGeo = new THREE.SphereGeometry(0.032, 16, 16);
      const toothNodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const toothNode = new THREE.Mesh(toothNodeGeo, toothNodeMat);
      toothNode.position.copy(pt);
      smileGroup.add(toothNode);
    }
    headGroup.add(smileGroup);
    smileOverlayRef.current = smileGroup;
    smileGroup.visible = false;

    // OVERLAY 03: Scalp Follicle Density Crown on top of Head (Cyan Growth Aura)
    const scalpGroup = new THREE.Group();
    const scalpHaloGeo = new THREE.RingGeometry(0.55, 0.75, 48);
    const scalpHaloMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const scalpHalo = new THREE.Mesh(scalpHaloGeo, scalpHaloMat);
    scalpHalo.position.set(0, 0.98, 0.38);
    scalpHalo.rotation.x = Math.PI / 2.05;
    scalpGroup.add(scalpHalo);

    // Upward follicle growth rays
    const rayGeo = new THREE.BufferGeometry();
    const rayPositions = [];
    for (let i = 0; i < 28; i++) {
      const angle = (i / 28) * Math.PI * 2;
      const r = 0.55 + Math.random() * 0.2;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r * 0.8;
      const y = 0.98;
      rayPositions.push(x, y, z, x, y + 0.18, z);
    }
    rayGeo.setAttribute('position', new THREE.Float32BufferAttribute(rayPositions, 3));
    const rayMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.8 });
    const rayMesh = new THREE.LineSegments(rayGeo, rayMat);
    scalpGroup.add(rayMesh);

    headGroup.add(scalpGroup);
    scalpOverlayRef.current = scalpGroup;
    scalpGroup.visible = false;

    // OVERLAY 04: Golden Ratio Jawline & Mandibular Contour (Rose Gold Curve)
    const contourGroup = new THREE.Group();
    const jawCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.75, -0.22, 0.45), // ear
      new THREE.Vector3(-0.68, -0.48, 0.65), // jaw angle
      new THREE.Vector3(-0.45, -0.68, 0.82), // chin side
      new THREE.Vector3(0.0, -0.74, 0.92)    // chin apex
    ]);
    const jawTubeGeo = new THREE.TubeGeometry(jawCurve, 32, 0.02, 12, false);
    const jawTubeMat = new THREE.MeshBasicMaterial({ 
      color: 0xe11d48, 
      transparent: true, 
      opacity: 0.85 
    });
    const jawTube = new THREE.Mesh(jawTubeGeo, jawTubeMat);
    contourGroup.add(jawTube);

    headGroup.add(contourGroup);
    contourOverlayRef.current = contourGroup;
    contourGroup.visible = false;

    // ==========================================
    // 7. LOAD 3D MODEL WITH REALISTIC HUMAN SKIN
    // ==========================================
    const loader = new GLTFLoader();
    loader.load(
      '/models/head.glb',
      (gltf) => {
        const root = gltf.scene;

        // REALISTIC HUMAN SKIN MATERIAL (Natural warm tone, velvety roughness, subsurface scattering)
        const realisticSkinMat = new THREE.MeshPhysicalMaterial({
          color: 0xdfb49d,           // Natural warm Mediterranean / Indian aesthetic skin tone
          roughness: 0.58,           // Human skin is velvety with natural pore diffusion
          metalness: 0.0,            // Dielectric non-metal
          clearcoat: 0.22,           // Natural healthy skin sheen
          clearcoatRoughness: 0.32,
          reflectivity: 0.5,
          sheen: 0.75,               // Biological peach-fuzz & subsurface scattering simulation
          sheenColor: 0xd97757,      // Warm reddish-peach undertone
          sheenRoughness: 0.45
        });

        root.traverse((child) => {
          if (child.isMesh) {
            child.material = realisticSkinMat;
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
        console.warn('Using procedural realistic fallback', err);
        const fallbackGroup = new THREE.Group();
        const headGeo = new THREE.SphereGeometry(1, 48, 48);
        headGeo.scale(0.85, 1.18, 0.95);
        const skinFallbackMat = new THREE.MeshPhysicalMaterial({
          color: 0xdfb49d,
          roughness: 0.55,
          clearcoat: 0.25,
          sheen: 0.7,
          sheenColor: 0xd97757
        });
        const mesh = new THREE.Mesh(headGeo, skinFallbackMat);
        fallbackGroup.add(mesh);
        headGroup.add(fallbackGroup);
        setIsLoading(false);
      }
    );

    // ==========================================
    // 8. 100% USER-DRIVEN 360° MOUSE / TOUCH CONTROL
    // ==========================================
    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      isInteractingRef.current = true;
      previousPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousPointerRef.current.x;
      const deltaY = e.clientY - previousPointerRef.current.y;
      previousPointerRef.current = { x: e.clientX, y: e.clientY };

      // User rotates freely with smooth touch
      targetRotationRef.current.y += deltaX * 0.009;
      targetRotationRef.current.x = Math.max(
        -0.65, 
        Math.min(0.65, targetRotationRef.current.x + deltaY * 0.009)
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

    // ==========================================
    // 9. 60 FPS RENDER LOOP
    // ==========================================
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // ONLY rotate automatically if user explicitly turned auto-spin ON
      if (isAutoSpinRef.current && !isDraggingRef.current && !isInteractingRef.current) {
        targetRotationRef.current.y += delta * 0.3;
      }

      // Smooth damping to user-controlled angles
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.09;
      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.09;
      currentCameraZRef.current += (targetCameraZRef.current - currentCameraZRef.current) * 0.08;

      if (cameraRef.current) {
        cameraRef.current.position.z = currentCameraZRef.current;
      }

      if (headGroupRef.current) {
        headGroupRef.current.rotation.y = currentRotationRef.current.y;
        headGroupRef.current.rotation.x = currentRotationRef.current.x;

        // Subtle biological breathing float
        headGroupRef.current.position.y = Math.sin(elapsed * 1.3) * 0.025;
        ring.rotation.z = elapsed * 0.15;
      }

      // Gentle pulsing on active 3D overlays
      if (dermalOverlayRef.current && dermalOverlayRef.current.visible) {
        dermalDisk.rotation.z = elapsed * 0.8;
      }
      if (smileOverlayRef.current && smileOverlayRef.current.visible) {
        smileTube.material.opacity = 0.7 + Math.sin(elapsed * 4) * 0.25;
      }
      if (scalpOverlayRef.current && scalpOverlayRef.current.visible) {
        scalpHalo.rotation.z = elapsed * 0.5;
      }
      if (contourOverlayRef.current && contourOverlayRef.current.visible) {
        jawTube.material.opacity = 0.7 + Math.sin(elapsed * 3) * 0.2;
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
            isVisible: dot > 0.1
          };
        });

        setScreenHotspots(calculatedHotspots);
      }
    };

    animate();

    // 10. Resize Handling
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

  // Smooth Focus Transition to Chosen Dimension (distinct camera angle and 3D overlay)
  const handleSelectDimension = (index) => {
    setActiveDimIndex(index);
    isInteractingRef.current = true;
    const dim = AESTHETIC_DIMENSIONS[index];

    if (dim && dim.cameraTarget) {
      targetRotationRef.current = {
        x: dim.cameraTarget.rotX,
        y: dim.cameraTarget.rotY
      };
      targetCameraZRef.current = dim.cameraTarget.posZ || 3.1;
    }

    setTimeout(() => {
      isInteractingRef.current = false;
    }, 3500);
  };

  return (
    <div className="w-full relative">

      {/* Top 4 Treatment Dimension Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[#EAE4DC] pb-4">
        
        {/* 4 Dimension Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {AESTHETIC_DIMENSIONS.map((dim, idx) => {
            const isActive = activeDimIndex === idx;
            return (
              <button
                key={dim.id}
                onClick={() => handleSelectDimension(idx)}
                className={`group flex items-center space-x-2 py-2 px-3.5 sm:px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#090D14] text-white shadow-xl scale-105 border-2'
                    : 'bg-white/95 text-[#475569] border border-[#E8E2D9] hover:border-[#C5A059] hover:bg-[#FAF6EE]'
                }`}
                style={{
                  borderColor: isActive ? dim.color : undefined
                }}
              >
                <span className="text-[10px] font-mono opacity-80" style={{ color: dim.color }}>{dim.num}</span>
                <span>{dim.icon}</span>
                <span className="tracking-wide">{dim.title.split(' ')[0]} {dim.title.split(' ')[1]}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: dim.color }} />
                )}
              </button>
            );
          })}
        </div>

        {/* User Drag Freedom Controls */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-[11px] font-medium text-[#64748B] hidden sm:inline">
            ✦ Touch & drag face to inspect 360°
          </span>

          <button
            onClick={() => setIsAutoSpin(prev => !prev)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-2xs cursor-pointer transition-all ${
              isAutoSpin 
                ? 'bg-[#090D14] text-white border-[#C5A059]' 
                : 'bg-white border-[#E8E2D9] text-[#0F172A] hover:border-[#C5A059]'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoSpin ? 'animate-spin' : ''}`} />
            <span>{isAutoSpin ? 'Auto-Spin: ON' : 'Manual Move: ACTIVE'}</span>
          </button>
        </div>

      </div>

      {/* Main 3D Experience Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left / Center: Interactive 3D Real Human Face (Col 6) */}
        <div className="lg:col-span-6 relative flex flex-col items-center">
          
          {/* Ambient Luminescent Glow corresponding to active service */}
          <div 
            className="absolute inset-0 rounded-full blur-3xl opacity-45 -z-10 transition-all duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${activeDim.color}45 0%, rgba(197, 160, 89, 0.12) 55%, transparent 75%)`
            }}
          />

          {/* WebGL Canvas & Hotspot Stage */}
          <div 
            ref={containerRef}
            className="w-full h-[420px] sm:h-[480px] relative select-none touch-none"
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
                  Rendering Realistic Anatomy Model...
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
                          ? 'ring-4 ring-white scale-125 shadow-[0_0_20px_rgba(255,255,255,0.9)]' 
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

            {/* Active Anatomical Badge on Canvas */}
            <div className="absolute top-3 left-3 bg-[#090D14]/85 text-white backdrop-blur-md px-3 py-1 rounded-full border border-white/15 flex items-center space-x-2 text-[10px] font-mono tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: activeDim.color }} />
              <span style={{ color: activeDim.color }}>{activeDim.badgeText} Active</span>
            </div>

            {/* Verified Clinical Seal (Top-Right of canvas) */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-[#C5A059]/40 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F172A]">
                DNA Clinics
              </span>
            </div>

            {/* User Interaction Guide on Canvas */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/10">
                ✋ Drag anywhere to inspect from any angle
              </span>
              <span className="bg-black/60 backdrop-blur-md text-[#C5A059] text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/10">
                Active: {activeDim.title.split(' ')[0]}
              </span>
            </div>

          </div>

          {/* Interactive Hint Bar */}
          <div className="w-full text-center text-[11px] font-medium text-[#64748B] pt-2 px-3 border-t border-[#EAE4DC]/60">
            {activeDim.focusDescription}
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
