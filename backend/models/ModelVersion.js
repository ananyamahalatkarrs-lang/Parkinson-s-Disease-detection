import mongoose from 'mongoose';

const modelVersionSchema = new mongoose.Schema({
  modelName: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  modelType: {
    type: String,
    enum: ['classical_ml', 'quantum_ml', 'hybrid'],
    default: 'hybrid'
  },
  metrics: {
    accuracy: { type: Number, default: 0.942 },
    precision: { type: Number, default: 0.931 },
    recall: { type: Number, default: 0.950 },
    f1Score: { type: Number, default: 0.940 },
    qpuSimulationTime: { type: String, default: '42ms' }
  },
  status: {
    type: String,
    enum: ['active', 'experimental', 'deprecated'],
    default: 'active'
  },
  description: {
    type: String,
    default: 'Hybrid Classical-Quantum SVM with QSVC Kernel Mapping'
  }
}, {
  timestamps: true
});

export const ModelVersion = mongoose.model('ModelVersion', modelVersionSchema);
