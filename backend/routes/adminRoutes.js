import express from 'express';
import { getAdminStats, getAuditLogs } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/stats', protect, authorize('admin'), getAdminStats);
router.get('/audit-logs', protect, authorize('admin'), getAuditLogs);

export default router;
