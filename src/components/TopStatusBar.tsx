import React from 'react';
import { Cpu, Volume2, VolumeX, Search, Download, Terminal, Layers, UserCheck, Flame, Zap } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface TopStatusBarProps {
  activeTab: 'viewport' | 'notebook' | 'playground' | 'profile';
  setActiveTab: (tab: 'viewport' | 'notebook' | 'playground' | 'profile') => void;
  gpuLoss?: number;
  gpuVram?: number;
  onOpenCommandPalette: () => void;
  onOpenGovernanceModal?: () => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  isOverclock: boolean;
  setIsOverclock: (overclock: boolean) => void;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  activeTab,
  setActiveTab,
  gpuLoss: _gpuLoss,
  gpuVram: _gpuVram,
  onOpenCommandPalette,
  onOpenGovernanceModal: _onOpenGovernanceModal,
  isMuted,
  setIsMuted,
  terminalOpen,
  setTerminalOpen,
  isOverclock,
  setIsOverclock,
}) => {
  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleOverclock = () => {
    soundFx.playOverclockBeep();
    setIsOverclock(!isOverclock);
  };

  return (
    <header className={`h-14 bg-slate-950/90 backdrop-blur-md border-b text-slate-200 px-4 flex items-center justify-between select-none z-30 relative transition-colors ${
      isOverclock ? 'border-rose-500/50 shadow-lg shadow-rose-500/20' : 'border-cyan-500/20'
    }`}>
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className={`relative flex items-center justify-center w-8 h-8 rounded-lg shadow-lg ${
          isOverclock
            ? 'bg-gradient-to-tr from-rose-500 to-amber-500 shadow-rose-500/40'
            : 'bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-cyan-500/30'
        }`}>
          <Cpu className="w-5 h-5 text-white animate-pulse" />
          <span className="absolute -bottom-1 -right-1 flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isOverclock ? 'bg-rose-400' : 'bg-emerald-400'
            }`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              isOverclock ? 'bg-rose-500' : 'bg-emerald-500'
            }`}></span>
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className={`font-mono font-bold tracking-wider text-sm bg-gradient-to-r bg-clip-text text-transparent ${
              isOverclock
                ? 'from-rose-400 via-amber-400 to-red-500'
                : 'from-cyan-400 via-blue-400 to-emerald-400'
            }`}>
              AKSHAT LAKHERA
            </span>
            <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded border ${
              isOverclock
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
            }`}>
              {isOverclock ? 'TURBO MODE' : 'PORTFOLIO OS'}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline-block">
            Interactive 3D Solar System & Systems Workspace
          </span>
        </div>
      </div>

      {/* Center Workbench Tabs */}
      <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
        <button
          onClick={() => { soundFx.playClick(); setActiveTab('viewport'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            activeTab === 'viewport'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>3D Solar System</span>
        </button>

        <button
          onClick={() => { soundFx.playClick(); setActiveTab('notebook'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            activeTab === 'notebook'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Code Sandbox</span>
        </button>

        <button
          onClick={() => { soundFx.playClick(); setActiveTab('profile'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            activeTab === 'profile'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Bio & Resume</span>
        </button>
      </div>

      {/* Right Telemetry & Action Buttons */}
      <div className="flex items-center gap-2.5">

        {/* OVERCLOCK TURBO Button (Goa Hackerhouse Easter Egg) */}
        <button
          onClick={handleToggleOverclock}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded border text-xs font-mono transition-all ${
            isOverclock
              ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-500/50 animate-pulse'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-rose-500/40 hover:text-rose-400'
          }`}
          title="Toggle Overclock Mode"
        >
          {isOverclock ? <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" /> : <Zap className="w-3.5 h-3.5 text-amber-400" />}
          <span className="hidden xl:inline">{isOverclock ? 'TURBO ON' : 'OVERCLOCK'}</span>
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={() => { soundFx.playClick(); onOpenCommandPalette(); }}
          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 px-2.5 py-1.5 rounded border border-slate-800 text-xs font-mono transition-colors"
          title="Open Command Palette"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded">Ctrl+K</kbd>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={handleToggleSound}
          className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
        </button>

        {/* Terminal Toggle */}
        <button
          onClick={() => { soundFx.playClick(); setTerminalOpen(!terminalOpen); }}
          className={`p-1.5 rounded border transition-colors ${
            terminalOpen
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
          }`}
          title="Toggle REPL Terminal"
        >
          <Terminal className="w-4 h-4" />
        </button>

        {/* Executive Resume PDF Download (Enterprise Recruiter Anchor Button) */}
        <a
          href="/Akshat_Lakhera_Resume.docx"
          download="Akshat_Lakhera_Resume.docx"
          onClick={() => soundFx.playSuccess()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs rounded-lg shadow-md shadow-cyan-500/25 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Download Resume</span>
        </a>
      </div>
    </header>
  );
};
