import express from 'express';
import { getDoctorDashboard } from '../controllers/doctorController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { logAudit } from '../middleware/auditMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, authorize('doctor', 'admin', 'Clinician'), logAudit('VIEW_DOCTOR_DASHBOARD', 'DOCTOR'), getDoctorDashboard);

export default router;
