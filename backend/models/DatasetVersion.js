import mongoose from 'mongoose';

const datasetVersionSchema = new mongoose.Schema({
  datasetName: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'UCI Biomedical Voice Telemetry & Kinematic Dataset'
  },
  sampleCount: {
    type: Number,
    default: 195
  },
  featureCount: {
    type: Number,
    default: 22
  },
  features: [{
    type: String
  }],
  sourceInfo: {
    type: String,
    default: 'Oxford Parkinson Voice Dataset'
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active'
  }
}, {
  timestamps: true
});

export const DatasetVersion = mongoose.model('DatasetVersion', datasetVersionSchema);
