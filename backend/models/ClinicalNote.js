import mongoose from 'mongoose';

const clinicalNoteSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    ref: 'Patient'
  },
  doctorId: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    default: 'Dr. Aris Thorne'
  },
  note: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

export const ClinicalNote = mongoose.model('ClinicalNote', clinicalNoteSchema);
