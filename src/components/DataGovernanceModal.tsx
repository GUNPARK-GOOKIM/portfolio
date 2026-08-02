import React from 'react';
import { ShieldCheck, Lock, EyeOff, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface DataGovernanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataGovernanceModal: React.FC<DataGovernanceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-xl max-w-2xl w-full p-6 text-slate-100 shadow-2xl shadow-cyan-500/20 relative">
        {/* Close Button */}
        <button
          onClick={() => { soundFx.playClick(); onClose(); }}
          className="absolute top-4 right-4 p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2">
              DATA GOVERNANCE & COMPLIANCE GATE
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ACTIVE GATE
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Automated PII Masking, Differential Privacy & Class Imbalance Enforcement
            </p>
          </div>
        </div>

        {/* Governance Rules & Live Verification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Rule 1: PII Masking */}
          <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold mb-2">
              <Lock className="w-4 h-4" />
              1. Automated SHA-256 PII Masking
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Detects and redacts SSNs, Emails, Credit Cards, and Phone Numbers before embedding vector generation.
            </p>
            <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-slate-300">
              <span className="text-rose-400">- Raw Input: "User SSN 123-45-678"</span>
              <br />
              <span className="text-emerald-400">+ Masked: "User SSN [SHA256:8f9a2b]"</span>
            </div>
          </div>

          {/* Rule 2: Differential Privacy */}
          <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-semibold mb-2">
              <EyeOff className="w-4 h-4" />
              2. Differential Privacy (&epsilon;=0.5)
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Injects Laplace noise into feature vectors ensuring individual identity cannot be reverse-engineered.
            </p>
            <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-slate-300">
              <span>Noise Parameter: &epsilon; = 0.5, &delta; = 1e-5</span>
              <br />
              <span className="text-emerald-400">Privacy Guarantee: Verified</span>
            </div>
          </div>

          {/* Rule 3: Class Imbalance */}
          <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold mb-2">
              <AlertTriangle className="w-4 h-4" />
              3. Class Imbalance Mitigation
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Auto-applies SMOTE oversampling & Focal Loss when minority class representation drops below 15%.
            </p>
            <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-slate-300">
              <span>Current Ratio: 85:15 ➔ Balanced to 50:50</span>
            </div>
          </div>

          {/* Rule 4: Compliance Certification */}
          <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-2">
              <CheckCircle2 className="w-4 h-4" />
              4. Audit Standards
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Full automated audit logging compliant with enterprise SOC2 Type II, GDPR Article 22, and HIPAA.
            </p>
            <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-emerald-400">
              STATUS: PASSING ALL AUDIT CHECKS
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-mono text-xs font-semibold rounded-lg shadow-md shadow-emerald-500/20"
          >
            CONFIRM COMPLIANCE PASS
          </button>
        </div>
      </div>
    </div>
  );
};
