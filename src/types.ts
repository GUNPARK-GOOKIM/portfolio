export type Project = {
  id: string;
  title: string;
  category: 'LLM & NLP' | 'Computer Vision' | 'Time Series' | 'Structured ML' | 'Deep Learning';
  status: 'Deployed' | 'Production Ready' | 'Research Prototype';
  description: string;
  longDescription: string;
  problem?: string;
  architecture?: string;
  challenges?: string[];
  lessonsLearned?: string[];
  timeline?: string;
  tags: string[];
  metrics: {
    accuracy?: string;
    f1Score?: string;
    latency?: string;
    loss?: string;
    datasetSize?: string;
    costPer1kInference?: string;
    vramSavings?: string;
    businessImpactMetric?: string;
  };
  governance: {
    piiMasking: boolean;
    differentialPrivacy: boolean;
    classImbalanceMitigation: string;
    complianceStandard: string;
  };
  provenance: {
    ipfsHash: string;
    gitCommitSha: string;
    modelRegistryVersion: string;
  };
  highlights: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  clusterCoords: { x: number; y: number; z: number };
};

export type Skill = {
  name: string;
  category: 'Languages' | 'Frameworks' | 'Data & SQL' | 'MLOps & Cloud' | 'Libraries';
  proficiency: number;
  iconName: string;
  clusterCoords: { x: number; y: number; z: number };
};

export type NotebookCell = {
  id: string;
  cellType: 'markdown' | 'code';
  content: string;
  executionCount?: number;
  outputType?: 'table' | 'chart' | 'logs' | 'metrics' | 'text';
  outputData?: any;
  isExecuting?: boolean;
};

export type TelemetryData = {
  gpuVramUsedGB: number;
  gpuVramTotalGB: number;
  trainingEpoch: number;
  totalEpochs: number;
  currentLoss: number;
  valLoss: number;
  accuracy: number;
  learningRate: number;
  gpuTempC: number;
};
