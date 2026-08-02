import type { Skill } from '../types';

export const skillsData: Skill[] = [
  // Languages
  { name: 'Python', category: 'Languages', proficiency: 98, iconName: 'Terminal', clusterCoords: { x: -1.2, y: 1.0, z: 0.5 } },
  { name: 'SQL', category: 'Languages', proficiency: 92, iconName: 'Database', clusterCoords: { x: -0.8, y: 0.5, z: -1.2 } },
  { name: 'R', category: 'Languages', proficiency: 82, iconName: 'BarChart2', clusterCoords: { x: -2.1, y: 0.2, z: 1.8 } },
  { name: 'C++', category: 'Languages', proficiency: 78, iconName: 'Code', clusterCoords: { x: 1.5, y: -0.8, z: 2.2 } },
  { name: 'TypeScript', category: 'Languages', proficiency: 85, iconName: 'Code2', clusterCoords: { x: 2.0, y: 1.2, z: -0.5 } },

  // Frameworks
  { name: 'PyTorch', category: 'Frameworks', proficiency: 95, iconName: 'Cpu', clusterCoords: { x: 0.0, y: 2.2, z: 0.0 } },
  { name: 'TensorFlow / Keras', category: 'Frameworks', proficiency: 88, iconName: 'Box', clusterCoords: { x: 0.8, y: 2.0, z: -1.1 } },
  { name: 'Scikit-Learn', category: 'Frameworks', proficiency: 96, iconName: 'Layers', clusterCoords: { x: -1.5, y: 1.8, z: -0.8 } },
  { name: 'XGBoost / LightGBM', category: 'Frameworks', proficiency: 94, iconName: 'TrendingUp', clusterCoords: { x: -1.9, y: 1.4, z: 0.2 } },
  { name: 'HuggingFace Transformers', category: 'Frameworks', proficiency: 90, iconName: 'Sparkles', clusterCoords: { x: 1.2, y: 2.5, z: 0.8 } },
  { name: 'LangChain & LlamaIndex', category: 'Frameworks', proficiency: 91, iconName: 'Workflow', clusterCoords: { x: -0.5, y: 2.8, z: 1.4 } },

  // Data & SQL
  { name: 'Pandas & NumPy', category: 'Data & SQL', proficiency: 98, iconName: 'Table', clusterCoords: { x: -2.4, y: -0.5, z: -0.5 } },
  { name: 'BigQuery / Snowflake', category: 'Data & SQL', proficiency: 90, iconName: 'Server', clusterCoords: { x: -1.6, y: -1.2, z: -1.8 } },
  { name: 'PostgreSQL / Vector DBs', category: 'Data & SQL', proficiency: 88, iconName: 'HardDrive', clusterCoords: { x: 0.4, y: -1.8, z: -1.2 } },
  { name: 'Apache Spark', category: 'Data & SQL', proficiency: 84, iconName: 'Zap', clusterCoords: { x: -0.8, y: -2.2, z: 0.6 } },

  // MLOps & Cloud
  { name: 'Docker & Kubernetes', category: 'MLOps & Cloud', proficiency: 87, iconName: 'Container', clusterCoords: { x: 1.8, y: -1.5, z: -1.9 } },
  { name: 'MLflow & Weights & Biases', category: 'MLOps & Cloud', proficiency: 89, iconName: 'Activity', clusterCoords: { x: 2.2, y: -0.2, z: 0.4 } },
  { name: 'FastAPI / REST APIs', category: 'MLOps & Cloud', proficiency: 92, iconName: 'Globe', clusterCoords: { x: 1.4, y: -2.0, z: 1.1 } },
  { name: 'Google Cloud (GCP) / AWS', category: 'MLOps & Cloud', proficiency: 86, iconName: 'Cloud', clusterCoords: { x: 2.5, y: -1.0, z: -0.8 } },
  { name: 'Git / GitHub CI/CD', category: 'MLOps & Cloud', proficiency: 94, iconName: 'GitBranch', clusterCoords: { x: 0.2, y: -2.6, z: 2.0 } },
];
