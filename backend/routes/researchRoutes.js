import express from 'express';
import { getDatasets, getExperiments, getModelComparison } from '../controllers/researchController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/datasets', protect, getDatasets);
router.get('/experiments', protect, getExperiments);
router.get('/comparison', protect, getModelComparison);

export default router;
