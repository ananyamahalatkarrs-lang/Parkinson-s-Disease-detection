import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  patientIdentifier: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 65
  },
  ageGroup: {
    type: String,
    default: '60-65'
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Male'
  },
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedClinicianName: {
    type: String,
    default: 'Dr. Aris Thorne'
  },
  followUpStatus: {
    type: String,
    enum: ['Scheduled', 'Overdue', 'Completed', 'None'],
    default: 'Scheduled'
  },
  latestAssessmentDate: {
    type: String,
    default: 'Aug 26, 2026'
  },
  observedTrend: {
    type: String,
    enum: ['Stable', 'Changed', 'Monitoring'],
    default: 'Stable'
  },
  riskLevel: {
    type: String,
    enum: ['Low', 'Moderate', 'Elevated', 'High'],
    default: 'Moderate'
  },
  status: {
    type: String,
    enum: ['Review', 'Monitoring', 'Active'],
    default: 'Review'
  },
  nextFollowUp: {
    type: String,
    default: 'Sep 02, 2026'
  }
}, {
  timestamps: true
});

export const Patient = mongoose.model('Patient', patientSchema);
