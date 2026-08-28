import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Patient } from '../models/Patient.js';
import { Assessment } from '../models/Assessment.js';
import { FollowUp } from '../models/FollowUp.js';
import { ClinicalNote } from '../models/ClinicalNote.js';
import { ModelVersion } from '../models/ModelVersion.js';
import { DatasetVersion } from '../models/DatasetVersion.js';

dotenv.config();

const seedData = async () => {
  try {
    const conn = await connectDB();
    if (!conn) {
      console.log('[Seed Warning] MongoDB connection unavailable. Skipping database write.');
      process.exit(0);
    }

    console.log('[Seed] Clearing existing collections...');
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Assessment.deleteMany({});
    await FollowUp.deleteMany({});
    await ClinicalNote.deleteMany({});
    await ModelVersion.deleteMany({});
    await DatasetVersion.deleteMany({});

    console.log('[Seed] Creating demo users...');
    const doctorUser = await User.create({
      name: 'Dr. Aris Thorne',
      email: 'clinician@qparkinson.org',
      passwordHash: 'Password123!',
      role: 'doctor',
      profile: { specialization: 'Neurology & Movement Disorders', hospital: 'Q-Health Medical Center' }
    });

    const patientUser = await User.create({
      name: 'Alex Morgan',
      email: 'alex.morgan@qhealth.org',
      passwordHash: 'Password123!',
      role: 'patient'
    });

    console.log('[Seed] Creating demo patients...');
    const p1 = await Patient.create({
      userId: patientUser._id,
      patientIdentifier: 'PT-1024',
      name: 'Patient A (Robert Carter)',
      age: 65,
      ageGroup: '60-65',
      gender: 'Male',
      assignedDoctor: doctorUser._id,
      assignedClinicianName: doctorUser.name,
      followUpStatus: 'Scheduled',
      latestAssessmentDate: 'Aug 26, 2026',
      observedTrend: 'Stable',
      riskLevel: 'Moderate',
      status: 'Review',
      nextFollowUp: 'Aug 30, 2026'
    });

    const p2 = await Patient.create({
      patientIdentifier: 'PT-1025',
      name: 'Patient B (Sophia Martinez)',
      age: 58,
      ageGroup: '55-60',
      gender: 'Female',
      assignedDoctor: doctorUser._id,
      assignedClinicianName: doctorUser.name,
      followUpStatus: 'Scheduled',
      latestAssessmentDate: 'Aug 25, 2026',
      observedTrend: 'Changed',
      riskLevel: 'Elevated',
      status: 'Review',
      nextFollowUp: 'Sep 02, 2026'
    });

    console.log('[Seed] Creating demo assessments...');
    await Assessment.create({
      patientId: p1.patientIdentifier,
      assessmentDate: 'Aug 26, 2026',
      type: 'Motor & Vocal',
      trendScore: 42,
      riskLevel: 'Moderate',
      riskScore: 62,
      modelOutputSummary: 'Spiral Tremor Delta: +0.28',
      modelVersion: 'v2.4-hybrid-qsvc'
    });

    await Assessment.create({
      patientId: p2.patientIdentifier,
      assessmentDate: 'Aug 25, 2026',
      type: 'Voice / Acoustic',
      trendScore: 68,
      riskLevel: 'Elevated',
      riskScore: 78,
      modelOutputSummary: 'Jitter/Shimmer Index +0.42',
      modelVersion: 'v2.4-hybrid-qsvc'
    });

    console.log('[Seed] Creating demo follow-ups...');
    await FollowUp.create({
      patientId: p1.patientIdentifier,
      patientName: p1.name,
      doctorId: doctorUser._id,
      scheduledDate: 'Aug 30, 2026',
      status: 'scheduled',
      priority: 'high',
      notes: 'Assess vocal tremor frequency shift.'
    });

    console.log('[Seed] Creating demo clinical notes...');
    await ClinicalNote.create({
      patientId: p1.patientIdentifier,
      doctorId: doctorUser._id,
      doctorName: doctorUser.name,
      note: 'Patient exhibits mild vocal tremor during prolonged vowel phonation.',
      tags: ['Vocal Tremor', 'Monitoring']
    });

    console.log('[Seed] Creating demo model versions...');
    await ModelVersion.create({
      modelName: 'Quantum Support Vector Classifier (QSVC)',
      version: 'v2.4-hybrid-qsvc',
      modelType: 'hybrid',
      metrics: { accuracy: 0.942, precision: 0.931, recall: 0.950, f1Score: 0.940, qpuSimulationTime: '42ms' },
      status: 'active',
      description: '4-Qubit ZZFeatureMap state vector quantum kernel classifier.'
    });

    console.log('[Seed] Successfully populated demo data!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error.message);
    process.exit(1);
  }
};

seedData();
