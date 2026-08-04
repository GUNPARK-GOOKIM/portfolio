import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Play } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface TerminalPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerOverclock: () => void;
  onTriggerAgent: () => void;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({
  isOpen,
  onClose,
  onTriggerOverclock,
  onTriggerAgent,
}) => {
  const [history, setHistory] = useState<string[]>([
    'AKSHAT LAKHERA Interactive Portfolio Shell [v3.0]',
    'Type "help" for available commands, "overclock" for Turbo Mode, or "cat resume" for summary.',
    '--------------------------------------------------------------------------------------------------'
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    soundFx.playClick();
    const newHistory = [...history, `> ${cmd}`];

    const lower = cmd.toLowerCase();

    if (lower === 'help') {
      newHistory.push(
        'Available Commands:',
        '  agent run    - Launch Autonomous AI Agent to crawl portfolio & tune hyperparameters live',
        '  overclock    - Toggle Easter Egg Turbo Mode (2x 3D Particle Conduits & Thermal Boost)',
        '  mlflow status- View active MLflow model registry deployments & container health',
        '  cat resume   - Display Executive Summary, Education, and Skills',
        '  ls projects  - List showcase Machine Learning & Data Science projects',
        '  clear        - Clear terminal log output'
      );
    } else if (lower === 'agent run') {
      soundFx.playAgentPulse();
      onTriggerAgent();
      newHistory.push(
        '🤖 [AUTONOMOUS AI AGENT] Initialized Agent Worker...',
        '------------------------------------------------',
        '• [Step 1] Crawling 3D Pipeline Node 1: Data Ingestion (1.2M Docs)',
        '• [Step 2] Executing PII Masking Audit Gate... [PASS]',
        '• [Step 3] Tuning Hyperparameters: Optuna Trial #42 (Learning Rate: 0.0003 -> Loss: 0.0415)',
        '• [Step 4] Registering Model Weight Hash to IPFS... [VERIFIED]',
        '✨ Agent Task Complete: All nodes optimized successfully!'
      );
    } else if (lower === 'overclock' || lower === 'overclock --max') {
      soundFx.playOverclockBeep();
      onTriggerOverclock();
      newHistory.push(
        '🔥 [TURBO OVERCLOCK ACTIVATED]',
        '• GPU Frequency: 2,520 MHz -> 3,100 MHz [OVERDRIVE]',
        '• Thermal Sensor: 95°C (WARNING: Cyber Glitch Activated)',
        '• 3D Data Particle Conduits accelerated to 200% speed!'
      );
    } else if (lower === 'mlflow status') {
      newHistory.push(
        '📊 [PROJECT REGISTRY STATUS]',
        '• DevDash v2.0.0        [DEPLOYED] — IPC Latency: <4ms — Local Engine: ACTIVE',
        '• OpenOnyx v1.4.0       [DEPLOYED] — Embed Latency: 45ms — Local IndexedDB: OK',
        '• Keystroke Lab v1.0.0  [LIVE]     — Caret Latency: 0ms — Vercel CDN: HEALTHY',
        '• Hopper v2 v2.1.0      [CONTRIB]  — Dispatch: 1.8ms — CUDA Kernels: ACTIVE'
      );
    } else if (lower === 'cat resume' || lower === 'cat resume.txt' || lower === 'cat resume.pdf') {
      newHistory.push(
        '📄 [RESUME // AKSHAT LAKHERA]',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'Candidate : Akshat Lakhera',
        'Role      : ML & Data Science Aspirant | Software Engineer',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '⚙  PROJECTS',
        '  • DevDash        — Native DB GUI (Tauri 2.0 + Rust + React 18 + Ollama NL-to-SQL)',
        '  • OpenOnyx        — AI Knowledge Workspace (Electron + D3 + Transformers.js)',
        '  • Keystroke Lab   — Zero-Latency Typing Engine (Two-Track Caret Architecture)',
        '  • Hopper v2       — Agent Execution Pipeline (Python + PyTorch + CUDA)',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '🛠  SKILLS',
        '  Languages : Python, Rust, TypeScript, SQL, C++',
        '  AI/ML     : PyTorch, Scikit-Learn, LangChain, Transformers.js, Ollama',
        '  Systems   : Tauri 2.0, Electron, Vite, React 18/19, SQLx, IndexedDB',
        '  Tools     : MLflow, Docker, Git, Supabase, D3.js, TensorRT',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '🔗  LINKS',
        '  GitHub   : github.com/akshat-lakhera',
        '  LinkedIn : linkedin.com/in/gen-z-coder',
        '  DevDash  : github.com/akshat-lakhera/DevDash',
        '  Download : /Akshat_Lakhera_Resume.docx'
      );
    } else if (lower === 'ls projects') {
      newHistory.push(
        '📂 [PROJECTS // AKSHAT LAKHERA]',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '1. ⚡ DevDash        — Native DB GUI Client (Tauri 2.0 + Rust) [DEPLOYED]',
        '   github.com/akshat-lakhera/DevDash',
        '2. 💎 OpenOnyx        — AI Knowledge Workspace (Electron + AI) [DEPLOYED]',
        '   github.com/akshat-lakhera/OpenOnyx',
        '3. 🧪 Keystroke Lab   — High-Perf Typing Engine (React + Vite) [LIVE]',
        '   keystroke-lab-psi.vercel.app',
        '4. 🚀 Hopper v2       — Agent Execution Pipeline (Python + CUDA) [CONTRIB]',
        '   github.com/akshat-lakhera/hopper-v2'
      );
    } else if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else {
      newHistory.push(`Command not recognized: "${cmd}". Type "help" for command list.`);
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-cyan-500/30 z-30 transition-all duration-300 font-mono ${
      isExpanded ? 'h-96' : 'h-48'
    }`}>
      {/* Terminal Titlebar */}
      <div className="h-8 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between text-xs text-slate-300 select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold text-cyan-300">DATA-FLOW MATRIX REPL SHELL</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            Interactive
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title="Close Terminal"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Log */}
      <div className="p-3 h-[calc(100%-4rem)] overflow-y-auto text-xs text-slate-300 space-y-1">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={
              line.startsWith('>')
                ? 'text-cyan-400 font-semibold'
                : line.includes('[AUTONOMOUS AI AGENT]') || line.includes('Agent Task Complete')
                ? 'text-emerald-400'
                : line.includes('[TURBO OVERCLOCK')
                ? 'text-rose-400 font-bold'
                : 'text-slate-300'
            }
          >
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command Prompt Form */}
      <form onSubmit={handleCommand} className="h-8 bg-slate-900 border-t border-slate-800 px-3 flex items-center gap-2">
        <span className="text-cyan-400 font-bold text-xs">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder='Type command ("agent run", "overclock", "help")...'
          className="flex-1 bg-transparent border-none outline-none text-xs text-slate-100 font-mono placeholder-slate-500"
        />
        <button type="submit" className="p-1 text-cyan-400 hover:text-cyan-300">
          <Play className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
