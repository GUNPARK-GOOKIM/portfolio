import React, { useState, useEffect } from 'react';
import type { Project, Skill } from '../types';
import { BarChart2, Table2, Database, Search, Download, TrendingUp, PieChart } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface LeftSidebarProps {
  projects: Project[];
  skills: Skill[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
  onOpenGovernanceModal: () => void;
}

// Live-animating stat counter
const AnimatedCount: React.FC<{ target: number; suffix?: string; prefix?: string }> = ({ target, suffix = '', prefix = '' }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 40;
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(start));
    }, 30);
    return () => clearInterval(t);
  }, [target]);
  return <span>{prefix}{val.toLocaleString()}{suffix}</span>;
};

// Skill categories for a data analyst
const DATA_STACK = [
  { name: 'Python', icon: '🐍', pct: 90, color: 'from-yellow-500 to-amber-400' },
  { name: 'SQL', icon: '🗃️', pct: 85, color: 'from-cyan-500 to-blue-400' },
  { name: 'Pandas', icon: '📊', pct: 88, color: 'from-lime-500 to-emerald-400' },
  { name: 'NumPy', icon: '🔢', pct: 82, color: 'from-orange-500 to-amber-400' },
  { name: 'Matplotlib', icon: '📈', pct: 78, color: 'from-purple-500 to-violet-400' },
  { name: 'Scikit-Learn', icon: '🤖', pct: 75, color: 'from-rose-500 to-pink-400' },
  { name: 'Rust / Tauri', icon: '⚙️', pct: 70, color: 'from-orange-600 to-red-400' },
  { name: 'TypeScript', icon: '💙', pct: 80, color: 'from-blue-500 to-sky-400' },
];

// Mini EDA stats that cycle
const EDA_QUERIES = [
  'SELECT COUNT(*) FROM projects WHERE status="deployed"',
  'df.describe().T.sort_values("std", ascending=False)',
  'plt.figure(); sns.heatmap(df.corr(), annot=True)',
  'X_train, X_test = train_test_split(df, test_size=0.2)',
];

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  projects,
  selectedProject,
  onSelectProject,
}) => {
  const [queryIdx, setQueryIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQueryIdx(i => (i + 1) % EDA_QUERIES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-80 h-full bg-slate-950/95 backdrop-blur-md border-r border-slate-800 flex flex-col gap-3 p-3 select-none z-20 text-slate-200 overflow-y-auto">

      {/* ── Profile Card ───────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-700/60 rounded-xl p-3.5 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {/* Avatar ring */}
          <div className="relative flex-shrink-0">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-lime-400 p-0.5">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-lg font-bold text-white">
                A
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-lime-400 border-2 border-slate-950" />
          </div>
          <div>
            <p className="font-bold text-sm text-white leading-none">Akshat Lakhera</p>
            <p className="text-[11px] text-cyan-400 mt-0.5">ML & Data Science Aspirant</p>
            <p className="text-[10px] text-slate-500 mt-0.5">📍 India · Open to Work</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/GUNPARK-GOOKIM"
            target="_blank" rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-[11px] font-mono border border-slate-700 transition-all"
          >
            <span>⌗</span> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/gen-z-coder/"
            target="_blank" rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 hover:text-blue-200 rounded-lg text-[11px] font-mono border border-blue-700/50 transition-all"
          >
            <span>in</span> LinkedIn
          </a>
        </div>
      </div>

      {/* ── Live EDA Query Feed ─────────────────────────── */}
      <div className="bg-slate-900/80 border border-lime-500/20 rounded-xl p-3">
        <div className="flex items-center gap-1.5 text-lime-400 font-mono text-[10px] font-bold mb-2 uppercase tracking-widest">
          <Search className="w-3 h-3" />
          Active Query
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping ml-auto" />
        </div>
        <div className="bg-slate-950 rounded-lg p-2.5 border border-slate-800 font-mono text-[10px] text-lime-300 overflow-hidden min-h-[2.5rem] flex items-center">
          <span className="text-slate-500 mr-1">&gt;</span>
          <span className="transition-all duration-500">{EDA_QUERIES[queryIdx]}</span>
        </div>
      </div>

      {/* ── Projects ───────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-2 px-0.5">
          <span className="font-mono text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
            <Database className="w-3.5 h-3.5 text-violet-400" />
            Projects
          </span>
          <span className="text-[10px] font-mono text-slate-500">{projects.length} repos</span>
        </div>

        <div className="space-y-2">
          {projects.map((proj) => {
            const isSelected = selectedProject?.id === proj.id;
            const colors = [
              'border-orange-500/40 hover:border-orange-400/60',
              'border-violet-500/40 hover:border-violet-400/60',
              'border-emerald-500/40 hover:border-emerald-400/60',
              'border-blue-500/40 hover:border-blue-400/60',
            ];
            const selectedColors = [
              'border-orange-500/70 bg-orange-500/10',
              'border-violet-500/70 bg-violet-500/10',
              'border-emerald-500/70 bg-emerald-500/10',
              'border-blue-500/70 bg-blue-500/10',
            ];
            const idx = projects.indexOf(proj);
            return (
              <div
                key={proj.id}
                onClick={() => { soundFx.playClick(); onSelectProject(proj); }}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all text-slate-300 hover:text-white ${
                  isSelected
                    ? selectedColors[idx % 4]
                    : `bg-slate-900/60 ${colors[idx % 4]} hover:bg-slate-800/70`
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] font-bold text-white truncate max-w-[170px]">
                    {proj.title.replace(/^[^\s]+\s/, '')}
                  </span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                    proj.status === 'Deployed'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                  }`}>
                    {proj.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {proj.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 bg-slate-800/80 text-slate-400 rounded border border-slate-700/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Data Stack Proficiency ──────────────────────── */}
      <div>
        <div className="flex items-center gap-1.5 mb-2.5 px-0.5">
          <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-wider">Data Stack</span>
        </div>

        <div className="space-y-2">
          {DATA_STACK.map((skill) => (
            <div key={skill.name} className="flex items-center gap-2">
              <span className="text-[11px] w-6 text-center">{skill.icon}</span>
              <span className="font-mono text-[11px] text-slate-300 w-20 flex-shrink-0">{skill.name}</span>
              <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${skill.color} h-full rounded-full transition-all duration-1000`}
                  style={{ width: `${skill.pct}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-slate-500 w-6 text-right">{skill.pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Stats ─────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: <TrendingUp className="w-3.5 h-3.5" />, label: 'Projects', val: 4, color: 'text-cyan-400' },
          { icon: <PieChart className="w-3.5 h-3.5" />, label: 'Commits', val: 391, color: 'text-violet-400' },
          { icon: <Table2 className="w-3.5 h-3.5" />, label: 'Repos', val: 8, color: 'text-lime-400' },
        ].map(stat => (
          <div key={stat.label} className="bg-slate-900/70 border border-slate-800 rounded-xl p-2.5 flex flex-col items-center gap-1">
            <span className={stat.color}>{stat.icon}</span>
            <span className={`font-mono text-base font-bold ${stat.color}`}>
              <AnimatedCount target={stat.val} />
            </span>
            <span className="font-mono text-[10px] text-slate-500">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ── Download Resume ─────────────────────────────── */}
      <a
        href="/Akshat_Lakhera_Resume.docx"
        download="Akshat_Lakhera_Resume.docx"
        onClick={() => soundFx.playSuccess()}
        className="flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-mono text-xs font-bold rounded-xl shadow-lg shadow-violet-500/20 transition-all mt-auto"
      >
        <Download className="w-4 h-4" />
        Download Resume
      </a>
    </aside>
  );
};
