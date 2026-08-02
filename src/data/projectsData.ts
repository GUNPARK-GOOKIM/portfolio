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
    title: '🚀 Hopper v2: Verified Student Real-Time Matchmaking Platform',
    category: 'Structured ML',
    status: 'Production Ready',
    description: 'High-performance monorepo platform for verified student video, voice, and text matchmaking built with Socket.IO, WebRTC, Next.js 16 & Fastify.',
    longDescription: 'Hopper v2 is a real-time matchmaking & video/voice chat platform for verified college students (.ac.in / .edu). Built as an npm monorepo with Next.js 16 (React 19, Tailwind v4), Fastify 5, Socket.IO real-time state relay, Redis queue matchmaking, PostgreSQL + Prisma ORM, and native WebRTC peer-to-peer media streaming.',
    tags: ['Next.js 16', 'React 19', 'Fastify 5', 'Socket.IO', 'WebRTC', 'Redis', 'PostgreSQL', 'Prisma'],
    metrics: {
      accuracy: '99.9%',
      f1Score: '0.99',
      latency: '< 50ms Match Queue',
      datasetSize: 'Real-Time Socket Streams',
      costPer1kInference: '$0.0000 (P2P WebRTC)',
      vramSavings: 'Zero-Server Relay (Peer-to-Peer)',
      businessImpactMetric: 'Sub-second real-time matchmaking queue with academic domain OTP auth & automated ban moderation'
    },
    governance: {
      piiMasking: true,
      differentialPrivacy: false,
      classImbalanceMitigation: 'CSPRNG 6-Digit OTP & HMAC-SHA256 Email Hash',
      complianceStandard: 'Academic Email Domain Verification (.ac.in / .edu)'
    },
    provenance: {
      ipfsHash: 'ipfs://QmHopperV2Matchmaking2026',
      gitCommitSha: 'sha256:hopper_realtime_v2',
      modelRegistryVersion: 'v2.1.0 (Production)'
    },
    highlights: [
      'High-throughput Redis-backed matchmaking queue & Socket.IO signaling server',
      'Peer-to-peer WebRTC video/audio streams with zero server media overhead',
      'Monorepo architecture (Next.js 16 App Router, Fastify 5, Prisma ORM, Zod validation)'
    ],
    githubUrl: 'https://github.com/GUNPARK-GOOKIM/hopper-v2',
    liveDemoUrl: 'https://github.com/GUNPARK-GOOKIM/hopper-v2',
    clusterCoords: { x: 2.2, y: 1.8, z: -1.5 }
  }
];
