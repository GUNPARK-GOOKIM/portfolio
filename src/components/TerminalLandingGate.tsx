import React, { useState } from 'react';

interface TerminalLandingGateProps {
  onEnterDashboard: () => void;
}

export const TerminalLandingGate: React.FC<TerminalLandingGateProps> = ({ onEnterDashboard }) => {
  const [cmdInput, setCmdInput] = useState<string>('import portfolio as pt');
  const [outputHistory, setOutputHistory] = useState<string[]>([
    'In [1]: import portfolio as pt',
    'AVAILABLE COMMANDS:',
    ' > help',
    ' > about_me (ML/Data)',
    ' > data_projects',
    ' > view_dashboard'
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = cmdInput.trim().toLowerCase();

    if (val.includes('view_dashboard') || val.includes('pt') || val.includes('dashboard')) {
      onEnterDashboard();
      return;
    }

    const newLogs = [...outputHistory, `In [2]: ${cmdInput}`];

    if (val.includes('help')) {
      newLogs.push(
        'AVAILABLE COMMANDS:',
        ' > help                - Show available Python terminal commands',
        ' > about_me (ML/Data)  - Inspect candidate ML engineering background',
        ' > data_projects       - List showcase high-dimensional ML projects',
        ' > view_dashboard      - Launch 3D Latent Space Map Dashboard'
      );
    } else if (val.includes('about')) {
      newLogs.push(
        'AKSHAT LAKHERA // CSE (AI-ML) Specialist & Systems Engineer',
        'Specializing in high-performance desktop tools, vector search workspaces, and real-time interactive ML apps.'
      );
    } else if (val.includes('projects')) {
      newLogs.push(
        'SHOWCASE PROJECTS:',
        ' 1. DevDash: Native Database Engineering Platform (Tauri 2.0 + Rust)',
        ' 2. OpenOnyx: Local-First AI Knowledge Workspace (Electron + AI)',
        ' 3. Keystroke Lab: High-Performance Typing Diagnostics (React + Vite)',
        ' 4. Hopper v2: Verified Student Matchmaking (Next.js 16 + WebRTC)'
      );
    } else {
      newLogs.push(`Command unrecognized. Type "view_dashboard" to launch main dashboard.`);
    }

    setOutputHistory(newLogs);
    setCmdInput('');
  };

  return (
    <div className="w-screen h-screen bg-[#040914] text-slate-200 font-mono relative overflow-hidden flex flex-col justify-between p-6 select-none">
      {/* Background Hexagon Network Mesh Texture */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.15) 0%, transparent 70%),
                            linear-gradient(to right, rgba(30, 41, 59, 0.3) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(30, 41, 59, 0.3) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px'
        }}
      />

      {/* Top Status Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 z-10">
        <div className="flex items-center gap-4">
          <span className="text-cyan-400 font-semibold">[LOG] CONNECTION ESTABLISHED: 192.168.1.10</span>
          <span>[SYSTEM] GATEWAY ACTIVE</span>
        </div>

        {/* System Authentication Pill */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-cyan-500/40 rounded-xl px-4 py-1.5 shadow-lg shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-200 font-bold text-xs">System Authentication</span>
          <span className="text-slate-500">⚙ 🖥</span>
        </div>

        <div className="flex items-center gap-4 text-cyan-300 font-semibold">
          <span>EPOCH_READY: <strong className="text-emerald-400">100%</strong></span>
          <span>MODEL_STABLE: <strong className="text-cyan-400">TRUE</strong></span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            NEURAL_NET ACTIVE
          </span>
        </div>
      </div>

      {/* Center Landing Visual */}
      <div className="flex flex-col items-center justify-center relative z-10 max-w-2xl mx-auto text-center my-auto space-y-6">
        
        {/* Background Math Equations Watermark */}
        <div className="absolute -top-16 inset-x-0 flex items-center justify-between opacity-25 text-xs text-cyan-300 pointer-events-none font-serif">
          <span>e.g., ∫ f(x)dx</span>
          <span>Linear Algebra</span>
          <span>A · x = b</span>
        </div>

        {/* Large ASCII Banner: AKSHAT */}
        <div className="font-mono text-4xl sm:text-6xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
          AKSHAT
        </div>

        {/* Python Terminal Card */}
        <div className="w-full bg-slate-950/90 border border-cyan-500/40 rounded-2xl p-4 shadow-2xl shadow-cyan-500/10 text-left space-y-3">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/60 rounded-xl px-3.5 py-2">
            <span className="text-cyan-400 font-bold text-sm">In [1]:</span>
            <input
              type="text"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              className="flex-1 bg-transparent text-slate-100 text-sm font-mono focus:outline-none"
              placeholder="import portfolio as pt"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-bold transition-all"
            >
              Run ↵
            </button>
          </form>

          {/* Terminal Command Output Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 space-y-1 text-xs text-slate-300">
            {outputHistory.map((line, idx) => (
              <div key={idx} className={line.startsWith(' >') ? 'text-cyan-300 font-semibold pl-2' : line.startsWith('In') ? 'text-emerald-400 font-bold' : ''}>
                {line}
              </div>
            ))}
          </div>

          {/* Direct Launch Button */}
          <button
            onClick={onEnterDashboard}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm rounded-xl shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>🚀 LAUNCH 3D LATENT SPACE DASHBOARD</span>
          </button>
        </div>
      </div>

      {/* Bottom Status Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 z-10">
        <div className="space-y-0.5 text-cyan-400">
          <div>[LOG] NEURAL_NET INITIALIZED</div>
          <div>[LOG] DATA_PIPELINE ACTIVE: 192.168.1.10</div>
          <div>[LOG] TENSORFLOW BACKEND READY</div>
        </div>

        <div className="text-right text-slate-400">
          <div>system logs</div>
          <div className="text-emerald-400 font-bold">[SYSTEM] GATEWAY ACTIVE</div>
        </div>
      </div>
    </div>
  );
};
