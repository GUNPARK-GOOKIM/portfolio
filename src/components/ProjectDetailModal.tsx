import React, { useEffect } from 'react';
import type { Project } from '../types';
import { X, ExternalLink, GitBranch, ShieldCheck, Cpu, AlertTriangle, Lightbulb, Clock, Layers, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

// Visual accent theme matching project colors
const PROJECT_THEMES: Record<string, { gradient: string; border: string; badge: string; text: string }> = {
  'proj-devdash': {
    gradient: 'from-orange-600/20 via-amber-600/10 to-transparent',
    border: 'border-orange-500/40',
    badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    text: 'text-orange-400',
  },
  'proj-openonyx': {
    gradient: 'from-violet-600/20 via-purple-600/10 to-transparent',
    border: 'border-violet-500/40',
    badge: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
    text: 'text-violet-400',
  },
  'proj-keystrokelab': {
    gradient: 'from-emerald-600/20 via-teal-600/10 to-transparent',
    border: 'border-emerald-500/40',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    text: 'text-emerald-400',
  },
  'proj-hopper': {
    gradient: 'from-cyan-600/20 via-blue-600/10 to-transparent',
    border: 'border-cyan-500/40',
    badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    text: 'text-cyan-400',
  },
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const theme = PROJECT_THEMES[project.id] || {
    gradient: 'from-cyan-600/20 via-blue-600/10 to-transparent',
    border: 'border-cyan-500/40',
    badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    text: 'text-cyan-400',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none">
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border ${theme.border} rounded-2xl shadow-2xl overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Glow Gradient */}
        <div className={`p-6 bg-gradient-to-r ${theme.gradient} border-b border-slate-800 flex items-start justify-between relative`}>
          <div className="space-y-1 pr-8">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${theme.badge} font-bold`}>
                {project.category}
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                {project.status}
              </span>
              {project.timeline && (
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {project.timeline}
                </span>
              )}
            </div>

            <h2 className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight pt-1">
              {project.title}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>

          <button
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700"
            title="Close Explorer [Esc]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body — Scrollable Explorer */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 font-sans text-xs">
          
          {/* Tech Stack Pills */}
          <div>
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Tech Stack & Ecosystem
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-md font-mono text-[11px] font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Grid Section: Problem Statement & Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Problem Statement */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>THE PROBLEM</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {project.problem || project.description}
              </p>
            </div>

            {/* Architecture */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                <Layers className="w-4 h-4" />
                <span>ARCHITECTURE</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {project.architecture || project.longDescription}
              </p>
            </div>

          </div>

          {/* Key Metrics Bar */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-3">
            <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
              Performance Metrics & Production Benchmark
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Latency</span>
                <span className="text-emerald-400 font-bold text-sm">{project.metrics.latency || '< 5ms'}</span>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Efficiency / Savings</span>
                <span className="text-cyan-400 font-bold text-sm">{project.metrics.vramSavings || '100% Local'}</span>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Accuracy / Pass</span>
                <span className="text-violet-400 font-bold text-sm">{project.metrics.accuracy || '99.9%'}</span>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Cost / 1k Ops</span>
                <span className="text-amber-400 font-bold text-sm">{project.metrics.costPer1kInference || '$0.00'}</span>
              </div>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-300">
              <span className="text-slate-500 text-[10px] block">Impact Summary</span>
              <span>{project.metrics.businessImpactMetric}</span>
            </div>
          </div>

          {/* Highlights & Features */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="font-mono text-xs font-bold text-amber-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                KEY HIGHLIGHTS & ARCHITECTURAL FEATURES
              </span>
              <div className="space-y-1.5 pt-1">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="text-amber-400 font-mono mt-0.5">▸</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges & Lessons Learned Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Challenges */}
            {project.challenges && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 font-mono text-xs font-bold">
                  <Cpu className="w-4 h-4" />
                  <span>ENGINEERING CHALLENGES OVERCOME</span>
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-orange-400 font-mono">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lessons Learned */}
            {project.lessonsLearned && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-lime-400 font-mono text-xs font-bold">
                  <Lightbulb className="w-4 h-4" />
                  <span>LESSONS LEARNED & TAKEAWAYS</span>
                </div>
                <ul className="space-y-1.5 text-slate-300">
                  {project.lessonsLearned.map((l, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-lime-400 font-mono">•</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>

        {/* Modal Footer Links */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-[10px] text-slate-400">
              Verified Repository · {project.provenance.modelRegistryVersion}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono font-bold transition-all"
              >
                <GitBranch className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className={`flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r ${theme.gradient} hover:brightness-125 text-white border ${theme.border} rounded-lg text-xs font-mono font-bold transition-all shadow-lg`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo / Release</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
