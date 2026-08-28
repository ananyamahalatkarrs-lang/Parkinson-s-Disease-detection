import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    ref: 'Patient'
  },
  assessmentDate: {
    type: String,
    default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
  },
  type: {
    type: String,
    default: 'Motor & Vocal'
  },
  trendScore: {
    type: Number,
    default: 50
  },
  features: {
    'MDVP:Fo(Hz)': { type: Number, default: 119.992 },
    'MDVP:Fhi(Hz)': { type: Number, default: 157.302 },
    'MDVP:Flo(Hz)': { type: Number, default: 74.997 },
    'MDVP:Jitter(%)': { type: Number, default: 0.00784 },
    'MDVP:Jitter(Abs)': { type: Number, default: 0.00007 },
    'MDVP:RAP': { type: Number, default: 0.00370 },
    'MDVP:PPQ': { type: Number, default: 0.00554 },
    'Jitter:DDP': { type: Number, default: 0.01109 },
    'MDVP:Shimmer': { type: Number, default: 0.04374 },
    'MDVP:Shimmer(dB)': { type: Number, default: 0.426 },
    'Shimmer:APQ3': { type: Number, default: 0.02182 },
    'Shimmer:APQ5': { type: Number, default: 0.03130 },
    'Shimmer:APQ11': { type: Number, default: 0.02971 },
    'Shimmer:DDA': { type: Number, default: 0.06545 },
    NHR: { type: Number, default: 0.02211 },
    HNR: { type: Number, default: 21.033 },
    RPDE: { type: Number, default: 0.414783 },
    DFA: { type: Number, default: 0.815285 },
    spread1: { type: Number, default: -4.813031 },
    spread2: { type: Number, default: 0.266482 },
    D2: { type: Number, default: 2.301442 },
    PPE: { type: Number, default: 0.284654 }
  },
  modelOutputs: {
    classical_svm: {
      result: { type: String, default: 'Elevated Risk Pattern' },
      confidence: { type: Number, default: 0.68 }
    },
    random_forest: {
      result: { type: String, default: 'Elevated Risk Pattern' },
      confidence: { type: Number, default: 0.71 }
    },
    quantum_ml: {
      result: { type: String, default: 'Elevated Risk Pattern' },
      confidence: { type: Number, default: 0.65 }
    },
    hybrid: {
      result: { type: String, default: 'Elevated Risk Pattern' },
      confidence: { type: Number, default: 0.72 }
    }
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Moderate', 'Elevated', 'High'],
    default: 'Moderate'
  },
  riskScore: {
    type: Number,
    default: 62
  },
  modelOutputSummary: {
    type: String,
    default: 'Observed Feature Variance in PPE and Jitter index'
  },
  explainability: {
    featureImportance: [
      { feature: { type: String }, importance: { type: Number } }
    ],
    explanationText: { type: String, default: 'PPE and spread1 were the primary contributors to the elevated risk index.' }
  },
  modelVersion: {
    type: String,
    default: 'v2.4-hybrid-qsvc'
  }
}, {
  timestamps: true
});

export const Assessment = mongoose.model('Assessment', assessmentSchema);
