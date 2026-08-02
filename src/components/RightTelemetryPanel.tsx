import React from 'react';
import type { Project } from '../types';
import { BarChart2, Activity, ExternalLink, GitBranch, Zap, UserCheck, GraduationCap, Award } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface RightTelemetryPanelProps {
  selectedProject: Project | null;
  telemetry: { trainingEpoch: number; gpuVRAM: number; loss: number; rocAuc: number };
  isOverclock: boolean;
}

const TECH_STACK_BADGES: Record<string, { label: string; color: string }[]> = {
  'proj-devdash': [
    { label: 'Rust / Tauri 2.0', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
    { label: 'React 18 & TypeScript', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { label: 'Ollama Local AI', color: 'text-lime-400 border-lime-500/30 bg-lime-500/10' },
    { label: 'PostgreSQL & SQLite', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  ],
  'proj-openonyx': [
    { label: 'Electron & React 19', color: 'text-violet-400 border-violet-500/30 bg-violet-500/10' },
    { label: 'Transformers.js Embeddings', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { label: 'IndexedDB & Supabase', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { label: 'D3.js Graph Engine', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  ],
  'proj-keystrokelab': [
    { label: 'React & Vite Engine', color: 'text-lime-400 border-lime-500/30 bg-lime-500/10' },
    { label: 'Two-Track Caret System', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { label: 'Web Audio API', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    { label: 'Tailwind CSS', color: 'text-sky-400 border-sky-500/30 bg-sky-500/10' },
  ],
  'proj-hopper': [
    { label: 'Next.js 16 & React 19', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
    { label: 'Fastify 5 & Socket.IO', color: 'text-lime-400 border-lime-500/30 bg-lime-500/10' },
    { label: 'WebRTC P2P Streams', color: 'text-violet-400 border-violet-500/30 bg-violet-500/10' },
    { label: 'Redis & Postgres Prisma', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
  ],
};

export const RightTelemetryPanel: React.FC<RightTelemetryPanelProps> = ({
  selectedProject,
  isOverclock,
}) => {
  const proj = selectedProject;
  const badges = proj ? TECH_STACK_BADGES[proj.id] || [] : [];

  return (
    <aside className="w-88 h-full bg-slate-950/95 backdrop-blur-md border-l border-slate-800 flex flex-col gap-3 p-3 select-none z-20 text-slate-200 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <span className="font-mono text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
          <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
          {proj ? 'Project Inspection' : 'Candidate Details & Profile'}
        </span>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
            isOverclock
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          }`}
        >
          {isOverclock ? '🔥 TURBO MODE' : '● ACTIVE'}
        </span>
      </div>

      {proj ? (
        /* Selected Project Deep Dive */
        <div className="space-y-3">
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-3.5 space-y-2.5">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Selected Project
              </span>
            </div>

            <h3 className="font-mono text-sm font-bold text-white leading-snug">{proj.title}</h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">{proj.longDescription || proj.description}</p>

            {badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {badges.map((b, i) => (
                  <span
                    key={i}
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${b.color}`}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-2 pt-2">
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-[11px] font-mono transition-all"
                >
                  <GitBranch className="w-3.5 h-3.5" /> GitHub
                </a>
              )}
              {proj.liveDemoUrl && proj.liveDemoUrl !== proj.githubUrl && (
                <a
                  href={proj.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-[11px] font-mono transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Performance & Metrics */}
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-3 space-y-2">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" /> Key Metrics & Impact
            </span>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-500 text-[9px] block">Latency / Speed</span>
                <span className="text-emerald-400 font-bold">{proj.metrics?.latency || '< 4ms'}</span>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <span className="text-slate-500 text-[9px] block">Efficiency / Savings</span>
                <span className="text-cyan-400 font-bold">{proj.metrics?.vramSavings || '100% Local'}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[10px] text-slate-300">
              <span className="text-slate-500 text-[9px] block">Business / System Impact</span>
              <span className="text-emerald-300 font-semibold">{proj.metrics?.businessImpactMetric || 'High performance execution'}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Default: Real Candidate Info & Academics */
        <div className="space-y-3">
          {/* Candidate Profile Overview */}
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-3.5 space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] font-bold">
              <UserCheck className="w-4 h-4" />
              <span>ABOUT THE CANDIDATE</span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-white">Akshat Lakhera</h3>
              <p className="text-[11px] text-cyan-400 font-mono mt-0.5">CSE (AI-ML) Specialist & Developer</p>
              <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                Focused on Computer Science, Artificial Intelligence, and Machine Learning. Passionate about engineering high-performance desktop tools, vector search workspaces, and real-time interactive data apps.
              </p>
            </div>
          </div>

          {/* Education & Academic Record */}
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-[11px] font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC BACKGROUND</span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono">
              <div className="flex items-center justify-between text-xs text-white font-bold">
                <span>B.Tech in CSE (AI-ML)</span>
                <span className="text-cyan-400 text-[10px]">2024 - Present</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Computer Science & Engineering (AI & ML Specialization)</p>
            </div>

            <div className="space-y-1 pt-1 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-cyan-400">▸</span> Open Source Contributor (Tauri, Electron, React)
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-emerald-400">▸</span> Real-World ML & AI Systems Engineering
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-purple-400">▸</span> Full-Stack Web & Data Visualization Architecture
              </div>
            </div>
          </div>

          {/* Core Technical Highlights */}
          <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-lime-400 font-mono text-[11px] font-bold">
              <Award className="w-4 h-4" />
              <span>KEY DOMAINS</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
              <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-200">
                <span className="text-cyan-400 font-bold block mb-0.5">Machine Learning</span>
                PyTorch, Scikit-Learn, LLMs
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-200">
                <span className="text-orange-400 font-bold block mb-0.5">Systems Dev</span>
                Rust, Tauri 2.0, C++
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-200">
                <span className="text-emerald-400 font-bold block mb-0.5">Frontend/Web</span>
                React, TypeScript, Vite
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800 text-slate-200">
                <span className="text-purple-400 font-bold block mb-0.5">Data Analysis</span>
                Pandas, SQL, D3.js
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
