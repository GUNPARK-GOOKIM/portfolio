import React, { useState } from 'react';
import type { Project } from '../types';
import { Play, CheckCircle2, Code2, Database, ShieldCheck, Cpu } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface PipelineStageInspectorProps {
  selectedProject: Project | null;
}

export const PipelineStageInspector: React.FC<PipelineStageInspectorProps> = ({ selectedProject }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  const steps = [
    {
      id: 1,
      title: 'Data Ingestion & PII Masking',
      icon: Database,
      code: `import hashlib\nimport pandas as pd\n\ndef mask_pii_features(df):\n    # Hash sensitive SSN & Email columns\n    df['ssn_hash'] = df['ssn'].apply(lambda x: hashlib.sha256(x.encode()).hexdigest())\n    df.drop(columns=['ssn', 'email', 'phone'], inplace=True)\n    return df\n\nclean_df = mask_pii_features(raw_data_stream)`
    },
    {
      id: 2,
      title: 'Feature Engineering & Vector Embeddings',
      icon: Code2,
      code: `import torch\nfrom transformers import AutoTokenizer, AutoModel\n\ntokenizer = AutoTokenizer.from_pretrained('meta-llama/Meta-Llama-3-8B')\nmodel = AutoModel.from_pretrained('meta-llama/Meta-Llama-3-8B')\n\ndef generate_embeddings(text_list):\n    inputs = tokenizer(text_list, padding=True, truncation=True, return_tensors='pt')\n    with torch.no_grad():\n        outputs = model(**inputs)\n    return outputs.last_hidden_state.mean(dim=1)`
    },
    {
      id: 3,
      title: 'Model Training & Optuna Tuning',
      icon: Cpu,
      code: `import optuna\nimport xgboost as xgb\n\ndef objective(trial):\n    params = {\n        'n_estimators': trial.suggest_int('n_estimators', 100, 1000),\n        'max_depth': trial.suggest_int('max_depth', 3, 10),\n        'learning_rate': trial.suggest_float('learning_rate', 1e-4, 1e-1, log=True)\n    }\n    model = xgb.XGBClassifier(**params)\n    model.fit(X_train, y_train)\n    return model.score(X_val, y_val)`
    },
    {
      id: 4,
      title: 'Model Registry & Production Deployment',
      icon: ShieldCheck,
      code: `import mlflow\nfrom fastapi import FastAPI\n\napp = FastAPI(title="Neural-RAG API")\nmodel = mlflow.pytorch.load_model("models:/NeuralRAG/Production")\n\n@app.post("/predict")\nasync def predict(payload: dict):\n    result = model.predict(payload)\n    return {"prediction": result, "status": "200 OK"}`
    }
  ];

  const handleRunStep = () => {
    soundFx.playClick();
    setIsExecuting(true);
    setExecutionOutput(null);

    setTimeout(() => {
      soundFx.playSuccess();
      setIsExecuting(false);
      setExecutionOutput(`[SUCCESS] Step ${activeStep} executed cleanly in 14ms. Output tensor shape: (64, 768). PII compliance: 100% PASS.`);
    }, 1200);
  };

  const currentStepObj = steps.find(s => s.id === activeStep) || steps[0];

  return (
    <div className="w-full h-full bg-slate-950 p-4 text-slate-100 flex flex-col justify-between overflow-y-auto select-none">
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div>
            <h2 className="font-mono text-sm font-bold text-cyan-400 flex items-center gap-2">
              PIPELINE STAGE CODE INSPECTOR
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                {selectedProject?.title || 'Neural-RAG Pipeline'}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspect production Python code transformations and execute test pipeline runs.
            </p>
          </div>

          <button
            onClick={handleRunStep}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-mono text-xs font-bold rounded-lg shadow-md shadow-emerald-500/20 transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isExecuting ? 'EXECUTING STEP...' : 'EXECUTE PIPELINE STEP'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => { soundFx.playClick(); setActiveStep(step.id); }}
                className={`p-2.5 rounded-lg border flex items-center gap-2 text-left transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <div className="truncate">
                  <span className="text-[10px] font-mono text-slate-400 block">Step 0{step.id}</span>
                  <span className="font-mono text-xs font-semibold truncate block">{step.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 font-mono text-xs relative">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400 text-[11px]">
            <span>File: pipeline_step_0{activeStep}.py</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Syntax Verified
            </span>
          </div>

          <pre className="text-cyan-300 bg-slate-950 p-3 rounded border border-slate-800/80 overflow-x-auto leading-relaxed">
            <code>{currentStepObj.code}</code>
          </pre>
        </div>

        {executionOutput && (
          <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-emerald-300 font-mono text-xs">
            {executionOutput}
          </div>
        )}
      </div>
    </div>
  );
};
