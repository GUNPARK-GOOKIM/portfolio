import React from 'react';
import { Cpu, Search, Download, Flame, Zap } from 'lucide-react';
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
  activeTab: _activeTab,
  setActiveTab: _setActiveTab,
  gpuLoss: _gpuLoss,
  gpuVram: _gpuVram,
  onOpenCommandPalette,
  onOpenGovernanceModal: _onOpenGovernanceModal,
  isMuted: _isMuted,
  setIsMuted: _setIsMuted,
  terminalOpen: _terminalOpen,
  setTerminalOpen: _setTerminalOpen,
  isOverclock,
  setIsOverclock,
}) => {

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
            <span className="font-mono font-bold tracking-wider text-sm text-slate-100">
              ML Intelligence Portfolio Dashboard
            </span>
          </div>
        </div>
      </div>

      {/* Hardware Telemetry Pills matching reference image: CPU 27%, RAM 200GB, Network 1.3TB/s */}
      <div className="hidden lg:flex items-center gap-3 font-mono text-[11px] bg-slate-900/90 border border-slate-800/80 px-3 py-1.5 rounded-xl">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">⚙ CPU</span>
          <span className="text-cyan-400 font-bold">27%</span>
          <div className="w-10 bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full w-[27%]" />
          </div>
        </div>

        <span className="text-slate-700">|</span>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">📊 RAM</span>
          <span className="text-purple-400 font-bold">200 GB</span>
          <div className="w-10 bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-400 h-full w-[65%]" />
          </div>
        </div>

        <span className="text-slate-700">|</span>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">🌐 Network</span>
          <span className="text-emerald-400 font-bold">1.3TB/s</span>
          <div className="w-10 bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[85%]" />
          </div>
        </div>
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

        {/* Executive Resume Download Button matching reference image */}
        <a
          href="/Akshat_Lakhera_Resume.docx"
          download="Akshat_Lakhera_Resume.docx"
          onClick={() => soundFx.playSuccess()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs rounded-lg transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Download Resume</span>
        </a>
      </div>
    </header>
  );
};
