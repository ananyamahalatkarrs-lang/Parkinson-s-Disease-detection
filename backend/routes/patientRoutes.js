import express from 'express';
import { getPatients, getPatientById, createPatient } from '../controllers/patientController.js';
import { getPatientAssessments, getPatientTrends, compareAssessments } from '../controllers/assessmentController.js';
import { getPatientNotes, createNote } from '../controllers/clinicalNoteController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import { logAudit } from '../middleware/auditMiddleware.js';

const router = express.Router();

router.get('/', protect, logAudit('LIST_PATIENTS', 'PATIENT'), getPatients);
router.post('/', protect, authorize('doctor', 'admin'), createPatient);
router.get('/:id', protect, logAudit('VIEW_PATIENT_DETAILS', 'PATIENT'), getPatientById);

// Patient specific assessment history, trends, compare, notes
router.get('/:id/assessments', protect, getPatientAssessments);
router.get('/:id/trends', protect, getPatientTrends);
router.get('/:id/assessments/compare', protect, compareAssessments);

router.get('/:id/notes', protect, getPatientNotes);
router.post('/:id/notes', protect, authorize('doctor', 'admin'), createNote);

export default router;
