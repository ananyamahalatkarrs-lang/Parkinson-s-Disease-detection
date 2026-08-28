import mongoose from 'mongoose';

const followUpSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    ref: 'Patient'
  },
  patientName: {
    type: String,
    default: ''
  },
  doctorId: {
    type: String,
    default: 'usr_cli_01'
  },
  scheduledDate: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'review_required', 'monitoring', 'completed', 'Scheduled', 'Review Required', 'Monitoring', 'Completed'],
    default: 'scheduled'
  },
  priority: {
    type: String,
    enum: ['normal', 'high', 'urgent', 'Normal', 'High', 'Urgent'],
    default: 'normal'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export const FollowUp = mongoose.model('FollowUp', followUpSchema);
