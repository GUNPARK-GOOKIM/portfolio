import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Project } from '../types';
import { soundFx } from '../utils/audio';

interface DataFlow3DCanvasProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project | null) => void;
  gpuLoss: number;
}

// 4 Orbital Projects around Central Core matching exact image texture design
const PLANET_CONFIGS = [
  {
    id: 'proj-devdash',
    name: 'DevDash: Native DB Engine',
    color: 0x38bdf8, // Cyan Gas Giant
    radius: 0.7,
    orbitRadiusX: 6.5,
    orbitRadiusZ: 4.5,
    tilt: 0.35,
    speed: 0.35,
    ring: true,
    ringColor: 0x0284c7,
    hasSubOrbit: true,
  },
  {
    id: 'proj-openonyx',
    name: 'OpenOnyx: Local AI Workspace',
    color: 0xa855f7, // Purple Violet Planet
    radius: 0.65,
    orbitRadiusX: 9.0,
    orbitRadiusZ: 6.0,
    tilt: -0.25,
    speed: 0.25,
    ring: false,
    ringColor: 0x7e22ce,
    hasSubOrbit: true,
  },
  {
    id: 'proj-keystrokelab',
    name: 'Keystroke Lab: High-Perf Engine',
    color: 0xf59e0b, // Amber Sun/Gold Ring Planet
    radius: 0.6,
    orbitRadiusX: 4.2,
    orbitRadiusZ: 3.0,
    tilt: 0.5,
    speed: 0.5,
    ring: true,
    ringColor: 0xd97706,
    hasSubOrbit: false,
  },
  {
    id: 'proj-hopper',
    name: 'Hopper v2: Student Agent Platform',
    color: 0x10b981, // Emerald Toxic Biolum
    radius: 0.55,
    orbitRadiusX: 11.5,
    orbitRadiusZ: 7.5,
    tilt: -0.4,
    speed: 0.18,
    ring: true,
    ringColor: 0x059669,
    hasSubOrbit: true,
  },
  {
    id: 'proj-deepfake',
    name: 'DEEPFAKE: AI Detection Engine',
    color: 0xf43f5e, // Crimson / Pink Cyber Planet
    radius: 0.65,
    orbitRadiusX: 14.0,
    orbitRadiusZ: 9.2,
    tilt: 0.28,
    speed: 0.14,
    ring: false,
    ringColor: 0xe11d48,
    hasSubOrbit: true,
  },
];

export const DataFlow3DCanvas: React.FC<DataFlow3DCanvasProps> = ({
  projects,
  selectedProject,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const W = container.clientWidth || window.innerWidth;
    const H = container.clientHeight || window.innerHeight;

    // ── Scene Setup ─────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050714);

    // Frame tilted orbital solar system view matching image
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 9, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Ambient & Point Lighting for Central Star Plasma Core
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0x38bdf8, 4, 30);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // ── CENTRAL SUN WITH PROCEDURAL SOLAR SKIN & GEODESIC CAGE ─────────
    const createSunSkinTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      // Base Plasma Background
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(0, 0, 1024, 512);

      // Solar plasma convection granules & magnetic bands
      for (let y = 0; y < 512; y += 8) {
        const opacity = 0.3 + 0.4 * Math.sin(y * 0.06);
        ctx.fillStyle = y % 16 === 0 ? `rgba(224, 242, 254, ${opacity})` : `rgba(56, 189, 248, ${opacity})`;
        ctx.fillRect(0, y, 1024, 10);
      }

      // Cybernetic Meridian & Latitude Scan Lines (Holographic Skin)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 2;
      for (let x = 0; x < 1024; x += 64) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
      }
      for (let y = 0; y < 512; y += 48) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
      }

      // Solar Flares / Hotspots
      for (let i = 0; i < 24; i++) {
        const hx = Math.random() * 1024;
        const hy = Math.random() * 512;
        const hr = 20 + Math.random() * 50;
        const grad = ctx.createRadialGradient(hx, hy, 2, hx, hy, hr);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.6)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(hx, hy, hr, 0, Math.PI * 2); ctx.fill();
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      return tex;
    };

    const sunGeo = new THREE.SphereGeometry(1.4, 64, 64);
    const sunMat = new THREE.MeshStandardMaterial({
      map: createSunSkinTexture() || undefined,
      color: 0x38bdf8,
      roughness: 0.25,
      metalness: 0.45,
      emissive: 0x0284c7,
      emissiveIntensity: 0.65,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sunMesh);

    // ── CONCENTRIC ORBITAL RINGS & DENSE DUST PARTICLES ──
    const orbitMeshes: THREE.Group[] = [];
    const planetMeshes: THREE.Mesh[] = [];

    PLANET_CONFIGS.forEach((cfg) => {
      const proj = projects.find((p) => p.id === cfg.id) || projects[0];
      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.x = cfg.tilt;
      scene.add(orbitGroup);

      // Orbital Ring Line
      const pts: THREE.Vector3[] = [];
      const segs = 128;
      for (let i = 0; i <= segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(theta) * cfg.orbitRadiusX, 0, Math.sin(theta) * cfg.orbitRadiusZ));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const ringMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.35,
      });
      const ringLine = new THREE.Line(ringGeo, ringMat);
      orbitGroup.add(ringLine);

      // Dense Orbital Dust Particles along ring
      const dustCount = 400;
      const dustGeo = new THREE.BufferGeometry();
      const dustPos = new Float32Array(dustCount * 3);
      for (let d = 0; d < dustCount; d++) {
        const theta = Math.random() * Math.PI * 2;
        const spread = (Math.random() - 0.5) * 0.4;
        dustPos[d * 3] = Math.cos(theta) * cfg.orbitRadiusX + spread;
        dustPos[d * 3 + 1] = (Math.random() - 0.5) * 0.3;
        dustPos[d * 3 + 2] = Math.sin(theta) * cfg.orbitRadiusZ + spread;
      }
      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
      const dustMat = new THREE.PointsMaterial({
        size: 0.05,
        color: cfg.color,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      orbitGroup.add(new THREE.Points(dustGeo, dustMat));

      // ── PROCEDURAL PLANET TEXTURE & BUMP MAP GENERATOR (MULTI-LAYER SKIN) ────────
      const createProceduralPlanetTexture = (_baseColorHex: number, type: 'gas' | 'ocean' | 'volcanic' | 'biolum' | 'cyber') => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        if (!ctx) return { map: null, bumpMap: null };

        // 1. Dark Contrast Background Skin (so planets are textured bodies, not uniform lightbulbs)
        ctx.fillStyle = '#0a0f1d';
        ctx.fillRect(0, 0, 1024, 512);

        // 2. Bump Map Canvas for Physical Relief
        const bumpCanvas = document.createElement('canvas');
        bumpCanvas.width = 1024;
        bumpCanvas.height = 512;
        const bumpCtx = bumpCanvas.getContext('2d')!;
        bumpCtx.fillStyle = '#404040';
        bumpCtx.fillRect(0, 0, 1024, 512);

        // Cybernetic Latitude/Longitude Grid on Planet Skin
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        for (let x = 0; x < 1024; x += 128) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke();
        }
        for (let y = 0; y < 512; y += 64) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1024, y); ctx.stroke();
        }

        if (type === 'gas') {
          // Jupiter-style gaseous swirl bands with dark contrast
          for (let y = 0; y < 512; y += 6) {
            const opacity = 0.25 + 0.55 * Math.sin(y * 0.08);
            ctx.fillStyle = y % 12 === 0 ? `rgba(255, 255, 255, ${opacity})` : `rgba(2, 132, 199, ${opacity})`;
            ctx.fillRect(0, y, 1024, 8);
            bumpCtx.fillStyle = y % 12 === 0 ? '#ffffff' : '#000000';
            bumpCtx.fillRect(0, y, 1024, 8);
          }
          // Storm Vortex
          const grad = ctx.createRadialGradient(700, 280, 10, 700, 280, 70);
          grad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath(); ctx.arc(700, 280, 70, 0, Math.PI * 2); ctx.fill();
        } else if (type === 'ocean') {
          // Deep Trench Oceans + Glowing Cyber Continents
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(0, 0, 1024, 512);
          ctx.fillStyle = 'rgba(126, 34, 206, 0.85)';
          bumpCtx.fillStyle = '#ffffff';
          for (let i = 0; i < 60; i++) {
            const cx = Math.random() * 1024;
            const cy = Math.random() * 512;
            const cr = 25 + Math.random() * 70;
            ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI * 2); ctx.fill();
            bumpCtx.beginPath(); bumpCtx.arc(cx, cy, cr, 0, Math.PI * 2); bumpCtx.fill();
          }
          // Cyan glowing coastlines
          ctx.strokeStyle = 'rgba(34, 211, 238, 0.85)';
          ctx.lineWidth = 2;
          for (let i = 0; i < 30; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * 1024, Math.random() * 512, 35, 0, Math.PI * 2);
            ctx.stroke();
          }
        } else if (type === 'volcanic') {
          // Dark Basalt Crust + Glowing Amber Magma Rivers
          ctx.fillStyle = '#18181b';
          ctx.fillRect(0, 0, 1024, 512);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.95)';
          bumpCtx.strokeStyle = '#ffffff';
          ctx.lineWidth = 4;
          bumpCtx.lineWidth = 4;
          for (let i = 0; i < 45; i++) {
            ctx.beginPath(); bumpCtx.beginPath();
            let x = Math.random() * 1024;
            let y = Math.random() * 512;
            ctx.moveTo(x, y); bumpCtx.moveTo(x, y);
            for (let step = 0; step < 6; step++) {
              x += (Math.random() - 0.5) * 90;
              y += (Math.random() - 0.5) * 60;
              ctx.lineTo(x, y); bumpCtx.lineTo(x, y);
            }
            ctx.stroke(); bumpCtx.stroke();
          }
        } else if (type === 'biolum') {
          // Obsidian Crust + Cybernetic Emerald Traces
          ctx.fillStyle = '#064e3b';
          ctx.fillRect(0, 0, 1024, 512);
          ctx.fillStyle = 'rgba(16, 185, 129, 0.95)';
          bumpCtx.fillStyle = '#ffffff';
          for (let i = 0; i < 160; i++) {
            const bx = Math.random() * 1024;
            const by = Math.random() * 512;
            ctx.fillRect(bx, by, 6, 6);
            bumpCtx.fillRect(bx, by, 6, 6);
          }
        } else if (type === 'cyber') {
          // Crimson/Pink Cyber-Security Crust for DEEPFAKE
          ctx.fillStyle = '#1e0114';
          ctx.fillRect(0, 0, 1024, 512);
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.9)';
          bumpCtx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3;
          bumpCtx.lineWidth = 3;
          for (let i = 0; i < 35; i++) {
            ctx.beginPath(); bumpCtx.beginPath();
            let x = Math.random() * 1024;
            let y = Math.random() * 512;
            ctx.moveTo(x, y); bumpCtx.moveTo(x, y);
            for (let step = 0; step < 5; step++) {
              x += (Math.random() - 0.5) * 80;
              y += (Math.random() - 0.5) * 50;
              ctx.lineTo(x, y); bumpCtx.lineTo(x, y);
            }
            ctx.stroke(); bumpCtx.stroke();
          }
        }

        const map = new THREE.CanvasTexture(canvas);
        const bumpMap = new THREE.CanvasTexture(bumpCanvas);
        map.wrapS = THREE.RepeatWrapping; bumpMap.wrapS = THREE.RepeatWrapping;

        return { map, bumpMap };
      };

      const planetTypes: ('gas' | 'ocean' | 'volcanic' | 'biolum' | 'cyber')[] = ['gas', 'ocean', 'volcanic', 'biolum', 'cyber'];
      const { map: planetTex, bumpMap: planetBump } = createProceduralPlanetTexture(cfg.color, planetTypes[PLANET_CONFIGS.indexOf(cfg) % 5]);

      // ── PLANET SPHERE WITH 3D SURFACE RELIEF & SHADOWS ──────────────────
      const planetGeo = new THREE.SphereGeometry(cfg.radius, 64, 64);
      const planetMat = new THREE.MeshStandardMaterial({
        map: planetTex || undefined,
        bumpMap: planetBump || undefined,
        bumpScale: 0.1,
        color: cfg.color,
        roughness: 0.35,
        metalness: 0.55,
        emissive: cfg.color,
        emissiveIntensity: 0.18, // Low emissive so physical surface shading & shadows look like real planet skin, not a bulb!
      });
      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      planetMesh.position.set(cfg.orbitRadiusX, 0, 0);
      planetMesh.userData = { config: cfg, project: proj };
      orbitGroup.add(planetMesh);
      planetMeshes.push(planetMesh);

      // Planetary Ring disabled per user directive

      // Sub-Orbital Moon if enabled
      if (cfg.hasSubOrbit) {
        const moonGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const moonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const moonMesh = new THREE.Mesh(moonGeo, moonMat);
        moonMesh.position.set(cfg.radius + 0.6, 0, 0);
        planetMesh.add(moonMesh);
      }

      orbitMeshes.push(orbitGroup);
    });

    // ── Raycasting & Mouse Interaction ─────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let mouseDownPos = { x: 0, y: 0 };
    let prevMousePos = { x: 0, y: 0 };

    const targetCamPos = new THREE.Vector3(0, 9, 16);
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    const onMouseDown = (e: MouseEvent) => {
      isDragging = false;
      mouseDownPos = { x: e.clientX, y: e.clientY };
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      mouse.x = (mx / container.clientWidth) * 2 - 1;
      mouse.y = -(my / container.clientHeight) * 2 + 1;

      setTooltipPos({ x: mx + 15, y: my + 15 });

      const dist = Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y);
      if (dist > 4) isDragging = true;

      if (e.buttons === 1) {
        const dx = e.clientX - prevMousePos.x;
        const dy = e.clientY - prevMousePos.y;
        scene.rotation.y += dx * 0.003;
        scene.rotation.x += dy * 0.002;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshes, false);

      if (intersects.length > 0) {
        const cfg = intersects[0].object.userData.config;
        setHoveredPlanet(cfg.name);
        container.style.cursor = 'pointer';
      } else {
        setHoveredPlanet(null);
        container.style.cursor = isDragging ? 'grabbing' : 'grab';
      }
    };

    const onClick = (e: MouseEvent) => {
      if (isDragging) return;

      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshes, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const proj = hit.userData?.project as Project;
        soundFx.playPulse();

        const worldPos = new THREE.Vector3();
        hit.getWorldPosition(worldPos);

        targetCamPos.copy(worldPos).add(new THREE.Vector3(0, 1.5, 4.5));
        targetLookAt.copy(worldPos);

        onSelectProject(proj);
      } else {
        soundFx.playClick();
        targetCamPos.set(0, 9, 16);
        targetLookAt.set(0, 0, 0);
        onSelectProject(null);
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.012;
      targetCamPos.z = THREE.MathUtils.clamp(targetCamPos.z + zoomFactor, 6, 28);
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('click', onClick);
    container.addEventListener('wheel', onWheel, { passive: false });

    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Animation Loop ───────────────────────────────────────
    let rafId: number;
    let t = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.005;

      // Sun rotation & dynamic light intensity pulse
      sunMesh.rotation.y += 0.005;
      sunLight.intensity = 4.0 + Math.sin(t * 3) * 0.7;

      // Planet orbital movements & organic gravitational bobbing animation
      PLANET_CONFIGS.forEach((cfg, idx) => {
        const grp = orbitMeshes[idx];
        const planet = planetMeshes[idx];
        const angle = t * cfg.speed;

        planet.position.x = Math.cos(angle) * cfg.orbitRadiusX;
        planet.position.y = Math.sin(t * 2 + idx) * 0.25;
        planet.position.z = Math.sin(angle) * cfg.orbitRadiusZ;
        planet.rotation.y += 0.015;

        grp.rotation.y = t * 0.02;
      });

      // Subtle live telemetry camera drift when idle
      if (!selectedProject && !hoveredPlanet) {
        targetCamPos.x = Math.sin(t * 0.5) * 1.2;
      }

      // Camera smooth ease lerp
      camera.position.lerp(targetCamPos, 0.06);
      currentLookAt.lerp(targetLookAt, 0.06);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('click', onClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#050714] overflow-hidden select-none font-mono orbital-canvas-container">
      <div ref={containerRef} className="w-full h-full" />

      {/* Hover Floating Tooltip */}
      {hoveredPlanet && (
        <div
          className="fixed z-50 pointer-events-none bg-slate-950/90 border border-cyan-500/50 text-cyan-300 text-xs font-mono px-3 py-1.5 rounded-lg shadow-xl backdrop-blur animate-pulse"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          {hoveredPlanet}
        </div>
      )}

      {/* HUD Header */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs bg-slate-950/80 border border-slate-800/80 rounded-lg px-3 py-1.5 backdrop-blur shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          ORBITAL SYSTEM VIEW
        </div>
      </div>

      {/* Reset Camera View */}
      <div className="absolute top-4 right-4 z-10 pointer-events-auto">
        <button
          onClick={() => onSelectProject(null)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500 text-xs font-mono transition-all backdrop-blur shadow-lg"
        >
          <span>⟲ Reset Camera</span>
        </button>
      </div>

      {/* BOTTOM OVERLAY PANELS: DATA STACK + NEURAL NETWORK VIEWPORT */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none hidden lg:flex items-end gap-3">
        {/* DATA STACK PANEL */}
        <div className="bg-[#0b0f19]/90 backdrop-blur border border-slate-800/80 rounded-2xl p-3.5 shadow-2xl space-y-2 w-64">
          <div className="flex items-center justify-between text-[11px] font-mono mb-1">
            <span className="text-slate-300 font-bold uppercase tracking-wider">DATA STACK</span>
          </div>
          <div className="space-y-1.5 font-mono text-[10px]">
            {[
              { name: 'Python', pct: 38, color: 'bg-amber-400' },
              { name: 'SQL', pct: 100, color: 'bg-cyan-400' },
              { name: 'Pandas', pct: 30, color: 'bg-amber-400' },
              { name: 'NumPy', pct: 70, color: 'bg-cyan-400' },
              { name: 'Matplotlib', pct: 30, color: 'bg-amber-400' },
              { name: 'Scikit-Learn', pct: 20, color: 'bg-blue-400' },
            ].map((st) => (
              <div key={st.name} className="flex items-center justify-between gap-2">
                <span className="text-slate-400 w-16">{st.name}</span>
                <div className="flex-1 bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                  <div className={`h-full ${st.color}`} style={{ width: `${st.pct}%` }} />
                </div>
                <span className="text-slate-400 text-[9px] w-6 text-right">{st.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* NEURAL NETWORK VIEWPORT PANEL */}
        <div className="bg-[#0b0f19]/90 backdrop-blur border border-slate-800/80 rounded-2xl p-3.5 shadow-2xl space-y-2 w-80">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              NEURAL NETWORK VIEWPORT
            </span>
            <span className="text-slate-500 text-[9px]">•••</span>
          </div>

          <div className="space-y-2 font-mono text-[10px] text-slate-300 pt-1">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Data Flow: 1.0x</span>
              </div>
              <div className="bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-cyan-400 h-full w-[60%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Learning Rate: 0.001</span>
              </div>
              <div className="bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-purple-400 h-full w-[40%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
