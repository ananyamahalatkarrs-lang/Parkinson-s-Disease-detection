import { AuditLog } from '../models/AuditLog.js';

export const logAudit = (action, resource) => {
  return async (req, res, next) => {
    try {
      if (process.env.NODE_ENV !== 'test') {
        const userId = req.user ? (req.user._id || req.user.id) : 'anonymous';
        const resourceId = req.params.id || req.params.noteId || '';

        await AuditLog.create({
          userId,
          action,
          resource,
          resourceId,
          ipAddress: req.ip || req.connection?.remoteAddress || '127.0.0.1',
          userAgent: req.get('user-agent') || '',
          details: { method: req.method, path: req.originalUrl }
        }).catch(err => console.warn('[Audit Log Warning]', err.message));
      }
    } catch (e) {
      // Non-blocking log failure
    }
    next();
  };
};
