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

// 4 Latent Space Project Cluster Nodes matching design reference
const CLUSTER_NODES = [
  {
    id: 'proj-devdash',
    label: 'DevDash: Native DB Platform',
    color: 0x38bdf8, // Cyan glow
    pos: new THREE.Vector3(-6, 3, 2),
    particleCount: 750,
  },
  {
    id: 'proj-openonyx',
    label: 'OpenOnyx: Local AI Workspace',
    color: 0xa855f7, // Purple glow
    pos: new THREE.Vector3(6, 4, -2),
    particleCount: 700,
  },
  {
    id: 'proj-keystrokelab',
    label: 'Keystroke Lab: High-Perf Engine',
    color: 0xec4899, // Pink glow
    pos: new THREE.Vector3(-4, -4, 3),
    particleCount: 650,
  },
  {
    id: 'proj-hopper',
    label: 'Hopper v2: Student Agent Platform',
    color: 0x06b6d4, // Cyan-Teal glow
    pos: new THREE.Vector3(5, -3, -1),
    particleCount: 600,
  },
];

export const DataFlow3DCanvas: React.FC<DataFlow3DCanvasProps> = ({
  projects,
  selectedProject,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<Project | null>(selectedProject);

  useEffect(() => {
    selectedRef.current = selectedProject;
  }, [selectedProject]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const W = container.clientWidth || window.innerWidth;
    const H = container.clientHeight || window.innerHeight;

    // ── Scene Setup ─────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030712); // Deep dark slate grid background

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 0, 24);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // ── 3D Grid & Latent Space Bounding Box ───────────────────
    const boxGeo = new THREE.BoxGeometry(22, 14, 14);
    const boxWireMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const boundingBoxMesh = new THREE.Mesh(boxGeo, boxWireMat);
    scene.add(boundingBoxMesh);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(30, 20, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -7;
    scene.add(gridHelper);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // ── Cluster Nodes & Particle Swarms ───────────────────────
    const clusterMeshes: THREE.Mesh[] = [];
    const connectionLines: THREE.Line[] = [];

    CLUSTER_NODES.forEach((node) => {
      const proj = projects.find((p) => p.id === node.id) || projects[0];

      // Central glowing core sphere
      const sphereGeo = new THREE.SphereGeometry(0.7, 32, 32);
      const sphereMat = new THREE.MeshBasicMaterial({
        color: node.color,
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.position.copy(node.pos);
      sphereMesh.userData = { project: proj, nodeData: node };

      // Outer aura halo
      const auraGeo = new THREE.SphereGeometry(1.2, 16, 16);
      const auraMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      });
      sphereMesh.add(new THREE.Mesh(auraGeo, auraMat));

      scene.add(sphereMesh);
      clusterMeshes.push(sphereMesh);

      // Particle Cloud Swarm around node
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(node.particleCount * 3);
      for (let i = 0; i < node.particleCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 0.8 + Math.pow(Math.random(), 2) * 2.2;

        pPos[i * 3] = node.pos.x + r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = node.pos.y + r * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = node.pos.z + r * Math.cos(phi);
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

      const pMat = new THREE.PointsMaterial({
        color: node.color,
        size: 0.08,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });
      const pSystem = new THREE.Points(pGeo, pMat);
      scene.add(pSystem);
    });

    // ── Inter-Cluster Synaptic Neural Beam Lines ─────────────────
    for (let i = 0; i < CLUSTER_NODES.length; i++) {
      for (let j = i + 1; j < CLUSTER_NODES.length; j++) {
        const p1 = CLUSTER_NODES[i].pos;
        const p2 = CLUSTER_NODES[j].pos;

        // Curved line via QuadraticBezierCurve3
        const midPoint = new THREE.Vector3()
          .addVectors(p1, p2)
          .multiplyScalar(0.5)
          .add(new THREE.Vector3((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4));

        const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
        const points = curve.getPoints(30);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

        const lineMat = new THREE.LineBasicMaterial({
          color: 0x818cf8,
          transparent: true,
          opacity: 0.4,
          blending: THREE.AdditiveBlending,
        });

        const line = new THREE.Line(lineGeo, lineMat);
        scene.add(line);
        connectionLines.push(line);
      }
    }

    // ── Raycasting & Mouse Interactivity ──────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let mouseDownPos = { x: 0, y: 0 };
    let prevMousePos = { x: 0, y: 0 };

    const targetCamPos = new THREE.Vector3(0, 0, 24);
    const targetLookAt = new THREE.Vector3(0, 0, 0);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

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

    const onClick = (e: MouseEvent) => {
      if (isDragging) return;

      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clusterMeshes, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object;
        const proj = hitMesh.userData?.project as Project;
        if (proj) {
          soundFx.playPulse();

          const worldPos = new THREE.Vector3();
          hitMesh.getWorldPosition(worldPos);

          targetCamPos.copy(worldPos).add(new THREE.Vector3(0, 1, 6));
          targetLookAt.copy(worldPos);

          setTimeout(() => {
            onSelectProject(proj);
          }, 350);
        }
      } else {
        soundFx.playClick();
        targetCamPos.set(0, 0, 24);
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

    // ── Animation Loop ───────────────────────────────────────
    let rafId: number;
    let t = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      t += 0.01;

      // Camera lerp
      camera.position.lerp(targetCamPos, 0.08);
      currentLookAt.lerp(targetLookAt, 0.08);
      camera.lookAt(currentLookAt);

      // Pulse Cluster Nodes
      clusterMeshes.forEach((mesh, idx) => {
        mesh.rotation.y += 0.005;
        const isSelected = selectedRef.current?.id === mesh.userData.project.id;
        if (isSelected) {
          mesh.scale.setScalar(1.3 + Math.sin(t * 5) * 0.1);
        } else {
          mesh.scale.setScalar(1.0 + Math.sin(t * 2 + idx) * 0.05);
        }
      });

      // Slowly rotate bounding scene box
      boundingBoxMesh.rotation.y = Math.sin(t * 0.2) * 0.05;

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
    <div className="relative w-full h-full bg-[#030712] overflow-hidden select-none font-mono">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 3D LATENT SPACE MAP HUD Header */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="bg-slate-950/90 backdrop-blur border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 shadow-2xl">
          <div className="flex items-center gap-2 text-purple-400 font-bold mb-1 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping inline-block" />
            3D LATENT SPACE MAP
          </div>
          <div className="text-[10px] text-slate-400 space-y-0.5">
            <div>• Drag to rotate high-dimensional vector space</div>
            <div>• Click cluster nodes to inspect project deep dive</div>
            <div>• Inter-cluster neural beams show architecture relations</div>
          </div>
        </div>
      </div>

      {/* Cluster Legend */}
      <div className="absolute top-4 right-4 pointer-events-none z-10 hidden sm:flex flex-col gap-1.5">
        {CLUSTER_NODES.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 bg-slate-950/80 backdrop-blur border border-slate-800 rounded-lg px-3 py-1 text-[10px] font-mono text-slate-300 shadow-md"
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: `#${item.color.toString(16).padStart(6, '0')}` }}
            />
            {item.label}
          </div>
        ))}
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
        <div className="bg-slate-950/90 backdrop-blur border border-slate-800 rounded-full px-5 py-1.5 text-[10px] flex items-center gap-3 shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400">4 ACTIVE LATENT CLUSTERS</span>
          <span className="text-slate-600">|</span>
          <span className="text-purple-400">NEURAL BEAMS ONLINE</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">FPS: 60</span>
        </div>
      </div>
    </div>
  );
};
