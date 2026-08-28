import express from 'express';
import { createAssessment, getAssessmentExplanation } from '../controllers/assessmentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { logAudit } from '../middleware/auditMiddleware.js';

const router = express.Router();

router.post('/', protect, logAudit('RUN_HYBRID_ASSESSMENT', 'ASSESSMENT'), createAssessment);
router.get('/:id/explanation', protect, getAssessmentExplanation);

export default router;
