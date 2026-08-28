import express from 'express';
import { getFollowUps, createFollowUp, updateFollowUp } from '../controllers/followUpController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', protect, getFollowUps);
router.post('/', protect, authorize('doctor', 'admin'), createFollowUp);
router.put('/:id', protect, authorize('doctor', 'admin'), updateFollowUp);

export default router;
