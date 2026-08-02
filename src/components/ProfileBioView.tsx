import React from 'react';
import { bioData } from '../data/bioData';
import { Download, Award, GraduationCap, Sparkles, GitBranch, Globe, Mail } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const ProfileBioView: React.FC = () => {
  return (
    <div className="w-full h-full bg-slate-950 p-6 text-slate-100 flex flex-col justify-between overflow-y-auto select-none font-mono">
      <div className="max-w-4xl mx-auto space-y-6 w-full">
        {/* Header Profile Card */}
        <div className="bg-slate-900/90 border border-purple-500/30 rounded-xl p-6 relative overflow-hidden shadow-xl shadow-purple-500/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 font-mono">
                  CANDIDATE DOSSIER
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                  OPEN TO OPPORTUNITIES
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-wide">{bioData.name}</h1>
              <p className="text-sm text-purple-400 font-semibold mt-0.5">{bioData.title}</p>
              <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">{bioData.bio}</p>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              <a
                href="/Akshat_Lakhera_Resume.docx"
                download="Akshat_Lakhera_Resume.docx"
                onClick={() => soundFx.playSuccess()}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs rounded-lg shadow-lg shadow-purple-500/25 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>

              <div className="flex items-center justify-center gap-2 pt-1">
                <a
                  href={bioData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
                  title="GitHub"
                >
                  <GitBranch className="w-4 h-4" />
                </a>
                <a
                  href={bioData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
                  title="LinkedIn"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${bioData.email}`}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Grid: Research & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Research Interests */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-cyan-400 flex items-center gap-2 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Core Research & Engineering Focus
            </h3>

            <ul className="space-y-2 text-xs text-slate-300">
              {bioData.researchInterests.map((interest, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded border border-slate-800/80">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Education & Academic Background */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-blue-400 flex items-center gap-2 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              Education & Academic Honors
            </h3>

            {bioData.education.map((edu, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>{edu.degree}</span>
                  <span className="text-blue-400 text-[11px]">{edu.year}</span>
                </div>
                <p className="text-xs text-slate-400">{edu.institution}</p>
                <div className="pt-1.5 flex flex-wrap gap-1">
                  {edu.highlights.map((hl, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-900 text-slate-300 rounded border border-slate-800">
                      {hl}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Badges */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-2 uppercase tracking-wider">
            <Award className="w-4 h-4" />
            Verified Professional Certifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {bioData.certifications.map((cert, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded border border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-200">{cert}</span>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/30">
                  VERIFIED
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
