import React, { useState } from 'react';
import type { Project } from '../types';
import { PlayCircle, Send, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ModelPlaygroundProps {
  projects: Project[];
}

export const ModelPlayground: React.FC<ModelPlaygroundProps> = ({ projects }) => {
  const [selectedProjId, setSelectedProjId] = useState<string>(projects[0]?.id || 'proj-1');
  const [inputText, setInputText] = useState<string>('Evaluate Q3 Financial Earnings document for risk indicators and revenue guidance.');
  const [isInferring, setIsInferring] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<any | null>(null);

  const selectedProj = projects.find(p => p.id === selectedProjId) || projects[0];

  const handleRunInference = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    setIsInferring(true);
    setApiResponse(null);

    setTimeout(() => {
      soundFx.playSuccess();
      setIsInferring(false);
      setApiResponse({
        status: 200,
        latency_ms: parseFloat(selectedProj.metrics.latency || '180ms'),
        cost_usd: selectedProj.metrics.costPer1kInference || '$0.0018',
        model_version: selectedProj.provenance.modelRegistryVersion || 'v2.4.1 Active',
        pii_masking_applied: selectedProj.governance.piiMasking,
        predictions: [
          { label: 'Positive Guidance', confidence: 0.942 },
          { label: 'Low Risk Indicator', confidence: 0.985 }
        ],
        raw_vector_preview: '[0.0421, -0.1284, 0.8912, 0.4410, ...]'
      });
    }, 1000);
  };

  return (
    <div className="w-full h-full bg-slate-950 p-4 text-slate-100 flex flex-col justify-between overflow-y-auto select-none font-mono">
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <PlayCircle className="w-4 h-4" />
              LIVE REST API INFERENCE PLAYGROUND
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Send test payloads to deployed ML models and inspect JSON response telemetry.
            </p>
          </div>

          <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            ENDPOINTS ONLINE
          </span>
        </div>

        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-400 block mb-1.5">
            SELECT DEPLOYED MODEL ENDPOINT:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {projects.map((proj) => (
              <button
                key={proj.id}
                onClick={() => { soundFx.playClick(); setSelectedProjId(proj.id); setApiResponse(null); }}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedProjId === proj.id
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-slate-200 truncate">{proj.title}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    {proj.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleRunInference} className="mb-4 bg-slate-900/90 border border-slate-800 p-3 rounded-lg space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>POST /api/v1/{selectedProj.id}/predict</span>
              <span className="text-cyan-400 text-[10px]">Content-Type: application/json</span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-200 font-mono focus:border-emerald-500/50 outline-none"
              placeholder="Enter JSON payload or sample text input..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isInferring}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-semibold text-xs rounded-lg shadow-md shadow-emerald-500/20 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isInferring ? 'RUNNING INFERENCE...' : 'SEND API REQUEST'}</span>
            </button>
          </div>
        </form>

        {apiResponse && (
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> HTTP 200 OK
              </span>
              <span className="text-slate-400 text-[11px]">
                Latency: {apiResponse.latency_ms}ms | Cost: {apiResponse.cost_usd}
              </span>
            </div>

            <pre className="text-emerald-300 bg-slate-950 p-3 rounded border border-slate-800 text-xs overflow-x-auto">
              <code>{JSON.stringify(apiResponse, null, 2)}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
