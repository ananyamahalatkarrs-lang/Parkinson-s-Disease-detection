import express from 'express';
import { updateNote, deleteNote } from '../controllers/clinicalNoteController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.put('/:noteId', protect, authorize('doctor', 'admin'), updateNote);
router.delete('/:noteId', protect, authorize('doctor', 'admin'), deleteNote);

export default router;
