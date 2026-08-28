import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    ref: 'Patient'
  },
  generatedBy: {
    type: String,
    default: 'Dr. Aris Thorne'
  },
  assessmentId: {
    type: String,
    default: null
  },
  reportType: {
    type: String,
    enum: ['summary', 'longitudinal', 'model_explanation', 'followup'],
    default: 'summary'
  },
  reportContent: {
    type: Object,
    required: true
  },
  generatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export const Report = mongoose.model('Report', reportSchema);
