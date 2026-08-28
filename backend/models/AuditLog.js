import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'anonymous'
  },
  action: {
    type: String,
    required: true
  },
  resource: {
    type: String,
    required: true
  },
  resourceId: {
    type: String,
    default: ''
  },
  ipAddress: {
    type: String,
    default: '127.0.0.1'
  },
  userAgent: {
    type: String,
    default: ''
  },
  details: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
