import type { NotebookCell } from '../types';

export const initialNotebookCells: NotebookCell[] = [
  {
    id: 'cell-1',
    cellType: 'markdown',
    content: `### 📓 Machine Learning Workbench: Model Training & Evaluation pipeline
Welcome to the interactive **DATA-FLOW MATRIX REPL environment**. You can execute any code block by clicking **Run Cell [Shift + Enter]** to simulate model training, epoch loss curves, and feature importances.`
  },
  {
    id: 'cell-2',
    cellType: 'code',
    content: `import torch
import torch.nn as nn
import torch.optim as optim

# Initialize Neural Network Architecture
class DeepNeuralClassifier(nn.Module):
    def __init__(self, input_dim=64, hidden_dim=128, num_classes=3):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.BatchNorm1d(hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(hidden_dim, 64),
            nn.ReLU(),
            nn.Linear(64, num_classes)
        )
    def forward(self, x):
        return self.net(x)

model = DeepNeuralClassifier()
print(f"Model Parameters: {sum(p.numel() for p in model.parameters()):,}")`,
    executionCount: 1,
    outputType: 'text',
    outputData: 'Model Parameters: 12,931\nDevice: CUDA (NVIDIA GeForce RTX 4090)\nNetwork Architecture Initialized Successfully.'
  }
];
