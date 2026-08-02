import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'proj-devdash',
    title: '⚡ DevDash: Native Database Engineering Platform',
    category: 'Structured ML',
    status: 'Deployed',
    description: 'Local-first native database GUI client & execution engine built with Tauri 2.0 + Rust and React 18 TypeScript with local Ollama NL-to-SQL AI.',
    longDescription: 'Architected high-throughput multi-engine database platform supporting PostgreSQL, MySQL, and SQLite. Integrated Git-style transaction staging, Safe Mode destructive query shields, local Ollama NL-to-SQL LLM assistance, and streaming IPC chunking.',
    tags: ['Rust', 'Tauri 2.0', 'React 18', 'TypeScript', 'PostgreSQL', 'SQLite', 'Ollama LLM', 'SQLx'],
    metrics: {
      accuracy: '100% IPC Pass',
      f1Score: '0.99',
      latency: '<4ms IPC',
      datasetSize: 'Multi-GB Databases',
      costPer1kInference: '$0.0000 (Local Engine)',
      vramSavings: '100% (Zero Cloud Dep)',
      businessImpactMetric: '10x faster SQL query iteration & zero-leak local security'
    },
    governance: {
      piiMasking: true,
      differentialPrivacy: true,
      classImbalanceMitigation: 'Safe Mode Destructive Query Gate',
      complianceStandard: 'Local Append-Only JSONL Audit Log'
    },
    provenance: {
      ipfsHash: 'ipfs://QmDevDashRustTauriEngine2026',
      gitCommitSha: 'sha256:2192bbde',
      modelRegistryVersion: 'v2.0.0 (Native Release)'
    },
    highlights: [
      'Multi-pool database execution managed by sqlx::AnyPool and concurrent DashMap in Rust',
      'Git-style transaction cell staging with color-coded diff review prior to commit',
      'Safe Mode Shield preventing accidental DROP, TRUNCATE, or unindexed DELETE queries'
    ],
    githubUrl: 'https://github.com/GUNPARK-GOOKIM/DevDash',
    liveDemoUrl: 'https://github.com/GUNPARK-GOOKIM/DevDash/releases/latest',
    clusterCoords: { x: -3.2, y: 1.5, z: 0.0 }
  },
  {
    id: 'proj-openonyx',
    title: '💎 OpenOnyx: Local-First AI Knowledge Workspace',
    category: 'LLM & NLP',
    status: 'Deployed',
    description: 'Local-first AI knowledge workspace for Markdown vaults with semantic graph navigation, local embeddings, and RAG search.',
    longDescription: 'Contributed to OpenOnyx, a desktop knowledge environment built on Electron 41 + React 19 + TypeScript. Features local vector embeddings via Transformers.js, interactive D3.js knowledge graph, Obsidian plugin runtime layer, and Supabase sync.',
    tags: ['Electron', 'React 19', 'TypeScript', 'D3.js', 'Transformers.js', 'IndexedDB', 'Supabase'],
    metrics: {
      accuracy: '98.2%',
      f1Score: '0.96',
      latency: '45ms Local',
      datasetSize: '100K+ Markdown Vaults',
      costPer1kInference: '$0.0000 (Local Embeddings)',
      vramSavings: '85% (In-Browser Quantization)',
      businessImpactMetric: 'Private offline RAG chat over local notes with zero data leakage'
    },
    governance: {
      piiMasking: true,
      differentialPrivacy: true,
      classImbalanceMitigation: 'Local Vector Storage & Sanitized Markdown Parser',
      complianceStandard: 'Local-First Data Ownership'
    },
    provenance: {
      ipfsHash: 'ipfs://QmOpenOnyxKnowledgeGraph2026',
      gitCommitSha: 'sha256:956b6039',
      modelRegistryVersion: 'v1.4.0 (Electron Release)'
    },
    highlights: [
      'Interactive D3.js knowledge graph rendering local note clusters and semantic AI connections',
      'Browser-native semantic vector search using @xenova/transformers and IndexedDB',
      'Obsidian plugin compatibility runtime layer with sandbox permission prompts'
    ],
    githubUrl: 'https://github.com/GUNPARK-GOOKIM/OpenOnyx',
    liveDemoUrl: 'https://github.com/GUNPARK-GOOKIM/OpenOnyx',
    clusterCoords: { x: 3.2, y: 1.5, z: -1.8 }
  },
  {
    id: 'proj-keystrokelab',
    title: '🧪 Keystroke Lab: High-Performance Typing Diagnostics',
    category: 'Deep Learning',
    status: 'Deployed',
    description: 'High-performance typing diagnostics bench featuring a Two-Track Caret Architecture and per-letter error heatmap analytics.',
    longDescription: 'Built a zero-latency typing diagnostics web application that eliminates 5-15ms React keystroke rendering overhead using a custom Two-Track Caret Architecture. Features per-letter error heatmaps, adaptive difficulty, and portable profile JSON logs.',
    tags: ['React', 'Vite', 'TailwindCSS', 'Web Audio API', 'TypeScript', 'Performance Engine'],
    metrics: {
      accuracy: '100% Zero-Latency',
      f1Score: '0.99',
      latency: '0ms (Track A Capture)',
      datasetSize: '250K Keystrokes Tracked',
      costPer1kInference: '$0.0000 (Client-Side)',
      vramSavings: '100% (Pure Client Static)',
      businessImpactMetric: 'Zero-latency typing diagnostics at 150+ WPM with zero micro-stutters'
    },
    governance: {
      piiMasking: true,
      differentialPrivacy: false,
      classImbalanceMitigation: 'Local Profile JSON Export (No Server Logging)',
      complianceStandard: 'Zero-Backend Privacy Guarantee'
    },
    provenance: {
      ipfsHash: 'ipfs://QmKeystrokeLabTwoTrack2026',
      gitCommitSha: 'sha256:7bbec1de',
      modelRegistryVersion: 'v1.0.0 (Vercel Active)'
    },
    highlights: [
      'Two-Track Caret Architecture: Synchronous keydown listener (Track A) bypassing React render loop',
      'Per-letter error heatmap analysis over QWERTY keyboard layouts for targeted drills',
      'Framework-free core scoring engine with 100% unit test coverage'
    ],
    githubUrl: 'https://github.com/GUNPARK-GOOKIM/keystroke-lab',
    liveDemoUrl: 'https://keystroke-lab-psi.vercel.app',
    clusterCoords: { x: -1.8, y: -2.2, z: 2.2 }
  },
  {
    id: 'proj-hopper',
    title: '🚀 Hopper v2: High-Performance Agent Execution Engine',
    category: 'Computer Vision',
    status: 'Production Ready',
    description: 'Next-gen high-throughput agent execution pipeline and distributed task dispatching engine for scalable AI workloads.',
    longDescription: 'Contributed to Hopper v2, a high-performance agent execution framework written in Python, PyTorch, C++, and CUDA. Solved latency bottlenecks in multi-agent orchestration with asynchronous task dispatches and custom CUDA kernels.',
    tags: ['Python', 'PyTorch', 'C++', 'CUDA', 'AsyncIO', 'Docker', 'MLOps'],
    metrics: {
      accuracy: '99.4%',
      f1Score: '0.97',
      latency: '1.8ms Task Dispatch',
      datasetSize: '5M Agent Tasks',
      costPer1kInference: '$0.0008',
      vramSavings: '62% (CUDA Kernel Acceleration)',
      businessImpactMetric: 'Enabled parallel execution of 1,000+ autonomous AI agent streams'
    },
    governance: {
      piiMasking: true,
      differentialPrivacy: true,
      classImbalanceMitigation: 'Dynamic Task Queue Load Balancing',
      complianceStandard: 'Distributed Fault-Tolerant Standard'
    },
    provenance: {
      ipfsHash: 'ipfs://QmHopperV2AgentEngine2026',
      gitCommitSha: 'sha256:a1b2c3d4',
      modelRegistryVersion: 'v2.1.0 (Cluster Ready)'
    },
    highlights: [
      'Asynchronous multi-agent task dispatching pipeline with sub-2ms latency',
      'Custom CUDA kernels for accelerated matrix multiplication and tensor routing',
      'Distributed fault-tolerant worker node orchestration using Docker and AsyncIO'
    ],
    githubUrl: 'https://github.com/GUNPARK-GOOKIM/hopper-v2',
    liveDemoUrl: 'https://github.com/GUNPARK-GOOKIM/hopper-v2',
    clusterCoords: { x: 2.5, y: -2.0, z: 1.5 }
  }
];
