import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { Project } from '../types';
import { soundFx } from '../utils/audio';

interface DataFlow3DCanvasProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project | null) => void;
  gpuLoss: number;
}

const PLANET_CONFIGS = [
  {
    id: 'proj-devdash',
    textureUrl: '/planet_devdash.png',
    label: '⚡ DevDash',
    size: 1.1,
    orbitRadius: 6.0,
    orbitSpeed: 0.0025,
    hasSaturnRing: false,
    ringColor: 0xff6a00,
  },
  {
    id: 'proj-openonyx',
    textureUrl: '/planet_openonyx.png',
    label: '💎 OpenOnyx',
    size: 0.95,
    orbitRadius: 8.5,
    orbitSpeed: 0.0018,
    hasSaturnRing: false,
    ringColor: 0x4fc3f7,
  },
  {
    id: 'proj-keystrokelab',
    textureUrl: '/planet_keystroke.png',
    label: '🧪 Keystroke Lab',
    size: 1.2,
    orbitRadius: 11.0,
    orbitSpeed: 0.0013,
    hasSaturnRing: true,
    ringColor: 0xdaa520,
    ringScale: 2.2,
  },
  {
    id: 'proj-hopper',
    textureUrl: '/planet_hopper.png',
    label: '🚀 Hopper v2',
    size: 1.0,
    orbitRadius: 13.5,
    orbitSpeed: 0.0009,
    hasSaturnRing: false,
    ringColor: 0x00e676,
  },
];

const UNDISCOVERED_PLANETS = [
  {
    label: '??? Deep Learning Pipeline',
    orbitRadius: 16.0,
    orbitSpeed: 0.0007,
    size: 0.85,
    color: 0x6366f1,
  },
  {
    label: '??? Autonomous Vision Agent',
    orbitRadius: 18.5,
    orbitSpeed: 0.0005,
    size: 0.75,
    color: 0xa855f7,
  },
];

export const DataFlow3DCanvas: React.FC<DataFlow3DCanvasProps> = ({
  projects,
  selectedProject,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<Project | null>(selectedProject);

  const [speedMult, setSpeedMult] = React.useState<number>(1.0);
  const [exposureVal, setExposureVal] = React.useState<number>(1.35);

  const speedRef = useRef<number>(1.0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => { selectedRef.current = selectedProject; }, [selectedProject]);
  useEffect(() => { speedRef.current = speedMult; }, [speedMult]);
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.toneMappingExposure = exposureVal;
    }
  }, [exposureVal]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const W = container.clientWidth || window.innerWidth;
    const H = container.clientHeight || window.innerHeight;

    // ── Scene Setup ─────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    scene.fog = new THREE.FogExp2(0x020617, 0.01);

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);
    camera.position.set(0, 9, 23);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // ── Lighting System ──────────────────────────────────
    // Ambient light so shadows are soft darks, not pitch black
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Primary Sun PointLight at center (0,0,0)
    const sunLight = new THREE.PointLight(0xfffae6, 8.0, 100, 0.8);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    // Soft orbital rim light
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(-15, 12, 10);
    scene.add(rimLight);

    // ── Deep Starfield Background ────────────────────────
    const starCount = 2500;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCols = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 90 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);

      const randColor = Math.random();
      if (randColor > 0.8) {
        starCols[i * 3] = 0.3; starCols[i * 3 + 1] = 0.8; starCols[i * 3 + 2] = 1.0;
      } else if (randColor > 0.6) {
        starCols[i * 3] = 1.0; starCols[i * 3 + 1] = 0.9; starCols[i * 3 + 2] = 0.5;
      } else {
        starCols[i * 3] = 1.0; starCols[i * 3 + 1] = 1.0; starCols[i * 3 + 2] = 1.0;
      }
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCols, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── Sun (Photorealistic Solar Star) ────────────────
    const textureLoader = new THREE.TextureLoader();
    const sunGroup = new THREE.Group();
    scene.add(sunGroup);

    // 1. Core Sun Mesh with 4K Photorealistic Solar Turbulence Map
    const sunGeo = new THREE.SphereGeometry(1.75, 64, 64);
    const sunTex = textureLoader.load('/sun.png');
    sunTex.colorSpace = THREE.SRGBColorSpace;
    const sunMat = new THREE.MeshBasicMaterial({ map: sunTex });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sun);

    // 2. Volumetric Solar Corona Atmosphere (Smooth Additive Glow)
    const sunCoronaGeo = new THREE.SphereGeometry(2.15, 32, 32);
    const sunCoronaMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sunCorona = new THREE.Mesh(sunCoronaGeo, sunCoronaMat);
    sunGroup.add(sunCorona);

    // ── Clean Thin Orbit Line Paths ──────────────────────
    [...PLANET_CONFIGS, ...UNDISCOVERED_PLANETS].forEach((cfg) => {
      const points: THREE.Vector3[] = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * cfg.orbitRadius, 0, Math.sin(theta) * cfg.orbitRadius));
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x334155,
        transparent: true,
        opacity: 0.4,
      });
      scene.add(new THREE.LineLoop(lineGeo, lineMat));
    });

    // ── Discovered Project Planets ───────────────────────
    type PlanetItem = {
      group: THREE.Group;
      mesh: THREE.Mesh;
      selectionRing: THREE.Mesh;
      saturnRing?: THREE.Mesh;
      orbitAngle: number;
      cfg: typeof PLANET_CONFIGS[0];
      project: Project;
    };

    const planetItems: PlanetItem[] = [];

    PLANET_CONFIGS.forEach((cfg, idx) => {
      const proj = projects.find((p) => p.id === cfg.id) || projects[idx];
      if (!proj) return;

      const group = new THREE.Group();
      const angle = (idx / PLANET_CONFIGS.length) * Math.PI * 2;

      // Fully lit planet mesh with texture map (MeshBasicMaterial eliminates all dark sides/shadows)
      const sphereGeo = new THREE.SphereGeometry(cfg.size, 64, 64);
      const planetTex = textureLoader.load(cfg.textureUrl);
      planetTex.colorSpace = THREE.SRGBColorSpace;

      const sphereMat = new THREE.MeshBasicMaterial({
        map: planetTex,
      });

      const planetMesh = new THREE.Mesh(sphereGeo, sphereMat);
      planetMesh.userData = { project: proj };
      group.add(planetMesh);

      // Clean single-line Selection Ring (hidden until selected or hovered)
      const selRingGeo = new THREE.RingGeometry(cfg.size * 1.45, cfg.size * 1.55, 64);
      const selRingMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });
      const selectionRing = new THREE.Mesh(selRingGeo, selRingMat);
      selectionRing.rotation.x = Math.PI / 2;
      group.add(selectionRing);

      // Single crisp Saturn ring for Keystroke Lab
      let saturnRing: THREE.Mesh | undefined;
      if (cfg.hasSaturnRing && cfg.ringScale) {
        const ringGeo = new THREE.RingGeometry(cfg.size * 1.35, cfg.size * cfg.ringScale, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: cfg.ringColor,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.65,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        saturnRing = new THREE.Mesh(ringGeo, ringMat);
        saturnRing.rotation.x = Math.PI / 2.5;
        group.add(saturnRing);
      }

      group.position.set(
        Math.cos(angle) * cfg.orbitRadius,
        Math.sin(idx * 0.8) * 0.4,
        Math.sin(angle) * cfg.orbitRadius
      );

      scene.add(group);

      planetItems.push({
        group,
        mesh: planetMesh,
        selectionRing,
        saturnRing,
        orbitAngle: angle,
        cfg,
        project: proj,
      });
    });

    // ── Undiscovered Planets (Clickable to show in right panel) ──
    type UndiscoveredItem = {
      group: THREE.Group;
      mesh: THREE.Mesh;
      selectionRing: THREE.Mesh;
      orbitAngle: number;
      cfg: typeof UNDISCOVERED_PLANETS[0];
      projectMock: Project;
    };

    const undiscoveredItems: UndiscoveredItem[] = [];

    UNDISCOVERED_PLANETS.forEach((cfg, idx) => {
      const group = new THREE.Group();
      const angle = Math.PI * (idx + 1) * 0.85;

      const sphereGeo = new THREE.SphereGeometry(cfg.size, 48, 48);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: 0.5,
        metalness: 0.2,
        emissive: new THREE.Color(cfg.color),
        emissiveIntensity: 0.35,
      });
      const planetMesh = new THREE.Mesh(sphereGeo, sphereMat);

      // Create a mock project for the undiscovered planet so clicking it works properly
      const mockProject: Project = {
        id: `undiscovered-${idx}`,
        title: cfg.label,
        category: 'Deep Learning',
        status: 'Research Prototype',
        description: 'Upcoming AI/ML & Systems engineering project currently in active research & development.',
        longDescription: `This planet represents an upcoming flagship project (${cfg.label}). Features including real-time pipeline visualization, dataset profiling, and native system bindings are currently under active development.`,
        tags: ['Upcoming', 'AI-ML', 'In-Development', 'Research'],
        metrics: {
          accuracy: 'Target 99%+',
          latency: '< 5ms',
          costPer1kInference: '$0.00 (Local)',
          vramSavings: '80% (Quantized)',
          businessImpactMetric: 'Next-gen analytics & automated ML pipeline',
        },
        governance: {
          piiMasking: true,
          differentialPrivacy: false,
          classImbalanceMitigation: 'SMOTE',
          complianceStandard: 'ISO/IEC 27001',
        },
        provenance: {
          ipfsHash: 'ipfs://QmFutureProjectDev...',
          gitCommitSha: 'sha256:dev_in_progress',
          modelRegistryVersion: 'v0.1.0-alpha',
        },
        highlights: ['Autonomous execution', 'Local vector search'],
        githubUrl: 'https://github.com/GUNPARK-GOOKIM',
        clusterCoords: { x: 0, y: 0, z: 0 },
      };

      planetMesh.userData = { project: mockProject };
      group.add(planetMesh);

      // Pulse ring for undiscovered planet
      const ringGeo = new THREE.RingGeometry(cfg.size * 1.3, cfg.size * 1.4, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
      });
      const selectionRing = new THREE.Mesh(ringGeo, ringMat);
      selectionRing.rotation.x = Math.PI / 2;
      group.add(selectionRing);

      group.position.set(
        Math.cos(angle) * cfg.orbitRadius,
        Math.sin(idx * 1.1) * 0.3,
        Math.sin(angle) * cfg.orbitRadius
      );

      scene.add(group);

      undiscoveredItems.push({
        group,
        mesh: planetMesh,
        selectionRing,
        orbitAngle: angle,
        cfg,
        projectMock: mockProject,
      });
    });

    // (Cleaned up separate skill constellation group - stars integrated into background starfield & planet inspector)

    // ── Mouse & Interaction Handling ─────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let mouseDownPos = { x: 0, y: 0 };
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = false;
      mouseDownPos = { x: e.clientX, y: e.clientY };
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      const dist = Math.hypot(e.clientX - mouseDownPos.x, e.clientY - mouseDownPos.y);
      if (dist > 4) {
        isDragging = true;
      }

      if (e.buttons === 1) {
        const dx = e.clientX - prevMousePos.x;
        const dy = e.clientY - prevMousePos.y;
        scene.rotation.y += dx * 0.003;
        scene.rotation.x += dy * 0.002;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    // Target camera position for smooth fly-to lerp
    const defaultCamPos = new THREE.Vector3(0, 9, 23);
    const targetCamPos = new THREE.Vector3(0, 9, 23);
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    const onClick = (e: MouseEvent) => {
      // If user was dragging camera orbit, do not treat as a click
      if (isDragging) return;

      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const allPlanetMeshes = [
        ...planetItems.map((p) => p.mesh),
        ...undiscoveredItems.map((u) => u.mesh),
      ];

      const intersects = raycaster.intersectObjects(allPlanetMeshes, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const proj = hitMesh.userData?.project as Project;
        if (proj) {
          soundFx.playPulse();

          // Calculate target camera position offset from planet
          const planetWorldPos = new THREE.Vector3();
          hitMesh.getWorldPosition(planetWorldPos);

          // Fly to position offset from planet
          targetCamPos.copy(planetWorldPos).add(new THREE.Vector3(0, 2, 5));
          targetLookAt.copy(planetWorldPos);

          // Trigger project modal after brief fly-to camera zoom
          setTimeout(() => {
            onSelectProject(proj);
          }, 350);
        }
      } else {
        // User clicked blank space — Reset camera & deselect
        soundFx.playClick();
        targetCamPos.copy(defaultCamPos);
        targetLookAt.set(0, 0, 0);
        onSelectProject(null);
      }
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('click', onClick);

    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Animation Loop ───────────────────────────────────
    let rafId: number;
    let t = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.008;

      // Smooth Camera Fly-To Lerp
      camera.position.lerp(targetCamPos, 0.08);
      currentLookAt.lerp(targetLookAt, 0.08);
      camera.lookAt(currentLookAt);

      // Orbit for Discovered Planets (multiplied by speedRef.current)
      planetItems.forEach((item) => {
        item.orbitAngle += item.cfg.orbitSpeed * speedRef.current;
        const radius = item.cfg.orbitRadius;

        item.group.position.x = Math.cos(item.orbitAngle) * radius;
        item.group.position.z = Math.sin(item.orbitAngle) * radius;
        item.group.position.y = Math.sin(item.orbitAngle * 2) * 0.3;

        // Make planet face the Sun at (0,0,0)
        item.mesh.lookAt(0, 0, 0);

        // Selection highlight ring & scale
        const isSelected = selectedRef.current?.id === item.project.id;
        const ringMat = item.selectionRing.material as THREE.MeshBasicMaterial;

        if (isSelected) {
          ringMat.opacity = 0.85 + Math.sin(t * 4) * 0.15;
          item.group.scale.setScalar(1.25);
        } else {
          ringMat.opacity = 0;
          item.group.scale.setScalar(1.0);
        }
      });

      // Orbit for Undiscovered Planets
      undiscoveredItems.forEach((item) => {
        item.orbitAngle += item.cfg.orbitSpeed * speedRef.current;
        const radius = item.cfg.orbitRadius;

        item.group.position.x = Math.cos(item.orbitAngle) * radius;
        item.group.position.z = Math.sin(item.orbitAngle) * radius;
        item.group.position.y = Math.sin(item.orbitAngle * 2.2) * 0.3;

        // Make undiscovered planet face the Sun at (0,0,0)
        item.mesh.lookAt(0, 0, 0);

        const isSelected = selectedRef.current?.id === item.projectMock.id;
        const ringMat = item.selectionRing.material as THREE.MeshBasicMaterial;

        if (isSelected) {
          ringMat.opacity = 0.9;
          item.group.scale.setScalar(1.2);
        } else {
          ringMat.opacity = 0.3 + Math.sin(t * 2.5) * 0.15;
          item.group.scale.setScalar(1.0);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
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
    <div className="relative w-full h-full bg-[#020617] overflow-hidden select-none">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* HUD Info & Interactive Shader Controls */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <div className="bg-slate-950/90 backdrop-blur border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-slate-200 shadow-xl">
          <div className="flex items-center justify-between gap-3 mb-2 pb-1 border-b border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              3D SOLAR SYSTEM VIEWPORT
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="space-y-2 text-[10px] text-slate-300 pt-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Orbit Speed: {speedMult.toFixed(1)}x</span>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.2"
                value={speedMult}
                onChange={(e) => setSpeedMult(parseFloat(e.target.value))}
                className="w-24 accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-400">Sun Exposure: {exposureVal.toFixed(2)}</span>
              <input
                type="range"
                min="0.8"
                max="2.5"
                step="0.1"
                value={exposureVal}
                onChange={(e) => setExposureVal(parseFloat(e.target.value))}
                className="w-24 accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 pointer-events-none z-10 hidden sm:flex flex-col gap-1.5">
        {[
          { color: '#ff6a00', label: 'DevDash' },
          { color: '#4fc3f7', label: 'OpenOnyx' },
          { color: '#daa520', label: 'Keystroke Lab' },
          { color: '#00e676', label: 'Hopper v2' },
          { color: '#6366f1', label: '??? Future Builds', pulse: true },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-lg px-3 py-1 text-[10px] font-mono text-slate-300"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${item.pulse ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </div>
        ))}
      </div>

      {/* Bottom Status */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <div className="bg-slate-950/90 backdrop-blur border border-slate-800 rounded-full px-5 py-1.5 text-[10px] font-mono flex items-center gap-3 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400">4 DISCOVERED PROJECTS</span>
          <span className="text-slate-600">|</span>
          <span className="text-indigo-400">2 FUTURE BUILDS</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">ORBIT ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
