import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import followUpRoutes from './routes/followUpRoutes.js';
import clinicalNoteRoutes from './routes/clinicalNoteRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import modelRoutes from './routes/modelRoutes.js';
import researchRoutes from './routes/researchRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes.' }
});
app.use('/api/', limiter);

// Request Parsing & Logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Base Route & Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Q-PARKINSON Hybrid Quantum AI REST Backend is operational',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/followups', followUpRoutes);
app.use('/api/notes', clinicalNoteRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
