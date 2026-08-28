import express from 'express';
import { getModelVersions, createModelVersion } from '../controllers/modelController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getModelVersions);
router.post('/', protect, createModelVersion);

export default router;
