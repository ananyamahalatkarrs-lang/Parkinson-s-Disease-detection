import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Patient } from '../models/Patient.js';
import { Assessment } from '../models/Assessment.js';
import { FollowUp } from '../models/FollowUp.js';
import { ClinicalNote } from '../models/ClinicalNote.js';
import { ModelVersion } from '../models/ModelVersion.js';
import { DatasetVersion } from '../models/DatasetVersion.js';
import { Experiment } from '../models/Experiment.js';
import { AuditLog } from '../models/AuditLog.js';

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
    await Experiment.deleteMany({});
    await AuditLog.deleteMany({});

    console.log('[Seed] Creating demo users for all 4 roles...');
    
    // Doctor / Clinician
    const doctorUser = await User.create({
      name: 'Dr. Aris Thorne',
      email: 'clinician@qparkinson.org',
      passwordHash: 'Password123!',
      role: 'doctor',
      profile: { specialization: 'Neurology & Movement Disorders', hospital: 'Q-Health Medical Center' }
    });

    // Patient
    const patientUser = await User.create({
      name: 'Alex Morgan',
      email: 'patient@qparkinson.org',
      passwordHash: 'Password123!',
      role: 'patient',
      profile: { phone: '+1 (555) 234-5678' }
    });

    // Researcher
    const researcherUser = await User.create({
      name: 'Dr. Evelyn Reed',
      email: 'researcher@qparkinson.org',
      passwordHash: 'Password123!',
      role: 'researcher',
      profile: { specialization: 'Quantum Neurosciences & QML' }
    });

    // Admin
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@qparkinson.org',
      passwordHash: 'Password123!',
      role: 'admin'
    });

    console.log('[Seed] Creating demo patients...');
    const p1 = await Patient.create({
      userId: patientUser._id,
      patientIdentifier: 'PT-1024',
      name: 'Alex Morgan',
      age: 67,
      ageGroup: '65-70',
      gender: 'Male',
      assignedDoctor: doctorUser._id,
      assignedClinicianName: doctorUser.name,
      followUpStatus: 'Scheduled',
      latestAssessmentDate: 'Aug 28, 2026',
      observedTrend: 'Stable',
      riskLevel: 'Moderate',
      status: 'Review',
      nextFollowUp: 'Aug 30, 2026'
    });

    const p2 = await Patient.create({
      patientIdentifier: 'PT-1025',
      name: 'Sophia Martinez',
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

    const p3 = await Patient.create({
      patientIdentifier: 'PT-1026',
      name: 'David Miller',
      age: 68,
      ageGroup: '65-70',
      gender: 'Male',
      assignedDoctor: doctorUser._id,
      assignedClinicianName: doctorUser.name,
      followUpStatus: 'Scheduled',
      latestAssessmentDate: 'Aug 24, 2026',
      observedTrend: 'Stable',
      riskLevel: 'Low',
      status: 'Monitoring',
      nextFollowUp: 'Sep 10, 2026'
    });

    console.log('[Seed] Creating demo assessments...');
    await Assessment.create({
      patientId: p1.patientIdentifier,
      userId: patientUser._id,
      assessmentDate: 'Aug 28, 2026',
      type: 'Motor & Vocal',
      trendScore: 42,
      riskLevel: 'Moderate',
      riskScore: 62,
      modelOutputs: {
        classical_svm: { result: 'Elevated Risk', confidence: 0.68 },
        random_forest: { result: 'Elevated Risk', confidence: 0.71 },
        quantum_ml: { result: 'Elevated Risk', confidence: 0.65 },
        hybrid: { result: 'Elevated Risk', confidence: 0.72 }
      },
      explainability: {
        featureImportance: [
          { feature: 'PPE', importance: 0.91 },
          { feature: 'spread1', importance: 0.78 },
          { feature: 'RPDE', importance: 0.72 },
          { feature: 'MDVP:Jitter(%)', importance: 0.61 },
          { feature: 'HNR', importance: 0.54 },
          { feature: 'DFA', importance: 0.47 }
        ]
      },
      modelVersion: 'v2.4-hybrid-qsvc'
    });

    await Assessment.create({
      patientId: p2.patientIdentifier,
      assessmentDate: 'Aug 25, 2026',
      type: 'Voice / Acoustic',
      trendScore: 68,
      riskLevel: 'Elevated',
      riskScore: 78,
      modelOutputs: {
        classical_svm: { result: 'Elevated Risk', confidence: 0.75 },
        random_forest: { result: 'Elevated Risk', confidence: 0.81 },
        quantum_ml: { result: 'Elevated Risk', confidence: 0.85 },
        hybrid: { result: 'Elevated Risk', confidence: 0.88 }
      },
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

    console.log('[Seed] Creating demo dataset versions...');
    await DatasetVersion.create({
      datasetName: 'Oxford Parkinson Voice Telemetry Dataset',
      version: 'v1.0',
      sampleCount: 195,
      featureCount: 22,
      features: ['MDVP:Fo(Hz)', 'MDVP:Jitter(%)', 'MDVP:Shimmer', 'NHR', 'HNR', 'RPDE', 'DFA', 'spread1', 'spread2', 'D2', 'PPE'],
      sourceInfo: 'UCI Machine Learning Repository',
      status: 'active'
    });

    console.log('[Seed] Creating demo experiments...');
    await Experiment.create({
      experimentName: '4-Qubit ZZFeatureMap Quantum Kernel Comparison',
      modelType: 'hybrid_qsvc_svm',
      hyperparameters: { qubits: 4, featureMap: 'ZZFeatureMap', entanglerMap: 'linear', C: 1.0 },
      results: { accuracy: 0.942, qsvcKernelScore: 0.915, quantumSpeedupFactor: '1.4x' },
      notes: 'Demonstrated superior non-linear separability over classical RBF kernel on vocal perturbation feature vectors.'
    });

    console.log('[Seed] Creating demo audit logs...');
    await AuditLog.create({
      userId: adminUser._id,
      userRole: 'admin',
      action: 'SYSTEM_INITIALIZATION',
      resource: 'SYSTEM',
      ipAddress: '127.0.0.1',
      details: 'Platform initialized with hybrid QML telemetry engine.'
    });

    console.log('[Seed] Successfully populated demo data for all 4 roles!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error.message);
    process.exit(1);
  }
};

seedData();
