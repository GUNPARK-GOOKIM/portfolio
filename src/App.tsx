import React, { useState, useEffect } from 'react';
import { projectsData } from './data/projectsData';
import { skillsData } from './data/skillsData';
import type { Project, TelemetryData } from './types';
import { TopStatusBar } from './components/TopStatusBar';
import { LeftSidebar } from './components/LeftSidebar';
import { DataFlow3DCanvas } from './components/DataFlow3DCanvas';
import { PipelineStageInspector } from './components/PipelineStageInspector';
import { ModelPlayground } from './components/ModelPlayground';
import { ProfileBioView } from './components/ProfileBioView';
import { RightTelemetryPanel } from './components/RightTelemetryPanel';
import { TerminalPanel } from './components/TerminalPanel';
import { CommandPalette } from './components/CommandPalette';
import { DataGovernanceModal } from './components/DataGovernanceModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'viewport' | 'notebook' | 'playground' | 'profile'>('viewport');
  const [selectedProject, setSelectedProject] = useState<Project | null>(projectsData[0]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [governanceModalOpen, setGovernanceModalOpen] = useState<boolean>(false);
  const [projectModalOpen, setProjectModalOpen] = useState<boolean>(false);
  const [isOverclock, setIsOverclock] = useState<boolean>(false);

  const [telemetry] = useState<TelemetryData>({
    gpuVramUsedGB: 18.4,
    gpuVramTotalGB: 24.0,
    trainingEpoch: 28,
    totalEpochs: 50,
    currentLoss: 0.0415,
    valLoss: 0.0820,
    accuracy: 98.9,
    learningRate: 0.0003,
    gpuTempC: 62,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectProject = (project: Project | null) => {
    setSelectedProject(project);
    if (project) {
      setProjectModalOpen(true);
    }
  };

  const handleTriggerOverclock = () => {
    setIsOverclock((prev) => !prev);
  };

  const handleTriggerAgent = () => {
    setActiveTab('notebook');
  };

  return (
    <div className={`w-screen h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans ${
      isOverclock ? 'hue-rotate-15 contrast-125' : ''
    }`}>
      <TopStatusBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        gpuLoss={telemetry.currentLoss}
        gpuVram={telemetry.gpuVramUsedGB}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenGovernanceModal={() => setGovernanceModalOpen(true)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        terminalOpen={terminalOpen}
        setTerminalOpen={setTerminalOpen}
        isOverclock={isOverclock}
        setIsOverclock={setIsOverclock}
      />

      <div className="flex-1 flex overflow-hidden relative">
        <LeftSidebar
          projects={projectsData}
          skills={skillsData}
          selectedProject={selectedProject}
          onSelectProject={handleSelectProject}
          onOpenGovernanceModal={() => setGovernanceModalOpen(true)}
        />

        <main className="flex-1 h-full relative overflow-hidden bg-slate-950">
          {activeTab === 'viewport' && (
            <DataFlow3DCanvas
              projects={projectsData}
              selectedProject={selectedProject}
              onSelectProject={handleSelectProject}
              gpuLoss={telemetry.currentLoss}
            />
          )}

          {activeTab === 'notebook' && (
            <PipelineStageInspector selectedProject={selectedProject} />
          )}

          {activeTab === 'playground' && (
            <ModelPlayground projects={projectsData} />
          )}

          {activeTab === 'profile' && (
            <ProfileBioView />
          )}
        </main>

        <RightTelemetryPanel
          selectedProject={selectedProject}
          telemetry={{
            trainingEpoch: telemetry.trainingEpoch,
            gpuVRAM: telemetry.gpuVramUsedGB,
            loss: telemetry.currentLoss,
            rocAuc: telemetry.accuracy,
          }}
          isOverclock={isOverclock}
          onExpandProject={(p) => {
            setSelectedProject(p);
            setProjectModalOpen(true);
          }}
        />
      </div>

      <TerminalPanel
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onTriggerOverclock={handleTriggerOverclock}
        onTriggerAgent={handleTriggerAgent}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        projects={projectsData}
        onSelectProject={handleSelectProject}
        setActiveTab={setActiveTab}
        onOpenGovernanceModal={() => setGovernanceModalOpen(true)}
      />

      <DataGovernanceModal
        isOpen={governanceModalOpen}
        onClose={() => setGovernanceModalOpen(false)}
      />

      <ProjectDetailModal
        project={projectModalOpen ? selectedProject : null}
        onClose={() => setProjectModalOpen(false)}
      />
    </div>
  );
};

export default App;
