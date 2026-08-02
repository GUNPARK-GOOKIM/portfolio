import React, { useState } from 'react';
import { Search, X, Layers, Terminal, PlayCircle, ShieldCheck } from 'lucide-react';
import type { Project } from '../types';
import { soundFx } from '../utils/audio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onSelectProject: (proj: Project) => void;
  setActiveTab: (tab: 'viewport' | 'notebook' | 'playground' | 'profile') => void;
  onOpenGovernanceModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  projects,
  onSelectProject,
  setActiveTab,
  onOpenGovernanceModal,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-start justify-center pt-20 p-4 font-mono select-none">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-xl max-w-xl w-full text-slate-100 shadow-2xl shadow-cyan-500/20 overflow-hidden">
        <div className="flex items-center gap-2 p-3 border-b border-slate-800 bg-slate-950">
          <Search className="w-4 h-4 text-cyan-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search ML projects, skills, or DAG nodes..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-slate-100 placeholder-slate-500"
            autoFocus
          />
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 border-b border-slate-800 space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 uppercase px-2">Quick Navigation</span>

          <button
            onClick={() => { soundFx.playClick(); setActiveTab('viewport'); onClose(); }}
            className="w-full flex items-center gap-2 p-2 rounded hover:bg-slate-800 text-xs text-slate-300 transition-colors text-left"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Go to 3D Pipeline DAG Viewport</span>
          </button>

          <button
            onClick={() => { soundFx.playClick(); setActiveTab('notebook'); onClose(); }}
            className="w-full flex items-center gap-2 p-2 rounded hover:bg-slate-800 text-xs text-slate-300 transition-colors text-left"
          >
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>Open Pipeline Stage Code Inspector</span>
          </button>

          <button
            onClick={() => { soundFx.playClick(); setActiveTab('playground'); onClose(); }}
            className="w-full flex items-center gap-2 p-2 rounded hover:bg-slate-800 text-xs text-slate-300 transition-colors text-left"
          >
            <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Launch Live REST API Inference Playground</span>
          </button>

          <button
            onClick={() => { soundFx.playClick(); onOpenGovernanceModal(); onClose(); }}
            className="w-full flex items-center gap-2 p-2 rounded hover:bg-slate-800 text-xs text-slate-300 transition-colors text-left"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Audit PII Data Governance Rules</span>
          </button>
        </div>

        <div className="p-3 max-h-60 overflow-y-auto space-y-1">
          <span className="text-[10px] font-semibold text-slate-500 uppercase px-2">ML Showcase Projects</span>

          {filteredProjects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => { soundFx.playClick(); onSelectProject(proj); onClose(); }}
              className="w-full flex items-center justify-between p-2 rounded hover:bg-slate-800 text-xs text-slate-300 transition-colors text-left"
            >
              <div>
                <span className="font-semibold text-cyan-300 block">{proj.title}</span>
                <span className="text-[10px] text-slate-400">{proj.category}</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                {proj.status}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
