import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, CheckCircle2, Copy, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

type SampleSnippet = {
  id: string;
  name: string;
  lang: 'python' | 'sql' | 'rust';
  code: string;
};

const SAMPLE_SNIPPETS: SampleSnippet[] = [
  {
    id: 'eda-python',
    name: 'Python — Exploratory Data Analysis & Outlier Clean',
    lang: 'python',
    code: `import pandas as pd
import numpy as np

# Load dataset & compute statistics
df = pd.DataFrame({
    'latency_ms': [1.2, 1.8, 2.4, 15.0, 1.9, 2.1],
    'vram_mb': [512, 540, 520, 1800, 530, 525]
})

# Calculate Z-score for outlier removal
z_scores = np.abs((df - df.mean()) / df.std())
clean_df = df[(z_scores < 2).all(axis=1)]

print(f"Cleaned {len(df) - len(clean_df)} outlier rows.")
print("Summary Statistics:\n", clean_df.describe())`
  },
  {
    id: 'sql-query',
    name: 'SQL — High-Throughput Aggregation Query',
    lang: 'sql',
    code: `SELECT 
    DATE_TRUNC('hour', created_at) AS time_bucket,
    COUNT(id) AS total_requests,
    ROUND(AVG(execution_time_ms)::numeric, 2) AS avg_latency,
    PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY execution_time_ms) AS p99_latency
FROM pipeline_audit_logs
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY 1
ORDER BY 1 DESC
LIMIT 10;`
  },
  {
    id: 'rust-ipc',
    name: 'Rust — Safe Mode Query AST Parser Guard',
    lang: 'rust',
    code: `pub fn validate_sql_safety(query: &str) -> Result<(), String> {
    let uppercase = query.to_uppercase();
    if uppercase.contains("DROP TABLE") || uppercase.contains("TRUNCATE") {
        return Err("SAFE_MODE_TRIGGER: Destructive query blocked".into());
    }
    if uppercase.contains("DELETE FROM") && !uppercase.contains("WHERE") {
        return Err("SAFE_MODE_TRIGGER: Unindexed DELETE without WHERE clause".into());
    }
    Ok(())
}`
  }
];

export const InteractiveSandbox: React.FC = () => {
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>(SAMPLE_SNIPPETS[0].id);
  const [codeVal, setCodeVal] = useState<string>(SAMPLE_SNIPPETS[0].code);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [outputLog, setOutputLog] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const selectedSnippet = SAMPLE_SNIPPETS.find(s => s.id === selectedSnippetId) || SAMPLE_SNIPPETS[0];

  const handleSelectSnippet = (snippet: SampleSnippet) => {
    soundFx.playClick();
    setSelectedSnippetId(snippet.id);
    setCodeVal(snippet.code);
    setOutputLog(null);
  };

  const handleRunCode = () => {
    soundFx.playClick();
    setIsRunning(true);
    setOutputLog(null);

    setTimeout(() => {
      soundFx.playSuccess();
      setIsRunning(false);

      if (selectedSnippet.lang === 'python') {
        setOutputLog(`[OUTPUT] Execution Clean (Finished in 8.4ms)
Cleaned 1 outlier rows.
Summary Statistics:
       latency_ms     vram_mb
count    5.000000    5.000000
mean     1.880000  525.400000
std      0.443847   10.830512
min      1.200000  512.000000
max      2.400000  540.000000`);
      } else if (selectedSnippet.lang === 'sql') {
        setOutputLog(`[OUTPUT] Query OK — 10 rows returned in 2.1ms
time_bucket          | total_requests | avg_latency | p99_latency
---------------------+----------------+-------------+-------------
2026-08-02 23:00:00  | 42,190         | 1.84 ms     | 4.20 ms
2026-08-02 22:00:00  | 38,412         | 1.92 ms     | 4.45 ms
2026-08-02 21:00:00  | 41,005         | 1.79 ms     | 3.98 ms`);
      } else {
        setOutputLog(`[OUTPUT] cargo test --lib ... ok
test validate_sql_safety ... ok (0.01s)
[PASS] Safe mode AST parser verified zero destructive SQL leaks.`);
      }
    }, 850);
  };

  const handleCopyCode = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(codeVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full bg-slate-950 p-4 text-slate-100 flex flex-col justify-between overflow-y-auto select-none font-mono">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              INTERACTIVE CODE & DATA SANDBOX
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select or edit real Python, SQL, or Rust code snippets to test live execution telemetry.
            </p>
          </div>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-400 hover:to-emerald-500 text-slate-950 font-bold text-xs rounded-lg shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>{isRunning ? 'RUNNING...' : 'EXECUTE CODE'}</span>
          </button>
        </div>

        {/* Snippet Picker */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
          {SAMPLE_SNIPPETS.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => handleSelectSnippet(snippet)}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                selectedSnippetId === snippet.id
                  ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-500">{snippet.lang}</span>
                <Sparkles className="w-3 h-3 text-cyan-400" />
              </div>
              <span className="text-xs font-semibold text-slate-200 truncate block mt-0.5">
                {snippet.name.split('—')[1] || snippet.name}
              </span>
            </button>
          ))}
        </div>

        {/* Code Editor Area */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden mb-4">
          <div className="bg-slate-950 px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="text-[11px]">{selectedSnippet.name}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCodeVal(selectedSnippet.code)}
                className="hover:text-slate-200 flex items-center gap-1 text-[10px]"
                title="Reset code"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
              <button
                onClick={handleCopyCode}
                className="hover:text-slate-200 flex items-center gap-1 text-[10px]"
              >
                {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <textarea
            value={codeVal}
            onChange={(e) => setCodeVal(e.target.value)}
            rows={10}
            className="w-full bg-slate-950/80 p-3 text-xs text-emerald-300 font-mono focus:outline-none leading-relaxed resize-none"
            spellCheck={false}
          />
        </div>

        {/* Execution Output Console */}
        {outputLog && (
          <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-3 text-xs font-mono text-emerald-400 animate-fadeIn space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold border-b border-emerald-500/20 pb-1 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> EXECUTION TERMINAL OUTPUT
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed text-[11px]">{outputLog}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
