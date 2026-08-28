import mongoose from 'mongoose';

const experimentSchema = new mongoose.Schema({
  experimentName: {
    type: String,
    required: true
  },
  researcherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  modelType: {
    type: String,
    enum: ['classical_svm', 'random_forest', 'quantum_qsvc', 'hybrid_qsvc_svm'],
    default: 'hybrid_qsvc_svm'
  },
  hyperparameters: {
    type: Object,
    default: { qubits: 4, featureMap: 'ZZFeatureMap', entanglerMap: 'linear', C: 1.0 }
  },
  results: {
    accuracy: { type: Number, default: 0.942 },
    qsvcKernelScore: { type: Number, default: 0.915 },
    quantumSpeedupFactor: { type: String, default: '1.4x' }
  },
  notes: {
    type: String,
    default: '4-qubit ZZFeatureMap state vector simulation experiment.'
  }
}, {
  timestamps: true
});

export const Experiment = mongoose.model('Experiment', experimentSchema);
