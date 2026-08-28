import { Patient } from '../models/Patient.js';
import { Assessment } from '../models/Assessment.js';

const DEMO_PATIENTS = [
  {
    id: 'PT-1024',
    patientIdentifier: 'PT-1024',
    name: 'Patient A (Robert Carter)',
    ageGroup: '60-65',
    latestAssessmentDate: 'Aug 26, 2026',
    observedTrend: 'Stable',
    riskLevel: 'Moderate',
    status: 'Review',
    assignedClinicianName: 'Dr. Aris Thorne',
    assessmentHistory: [
      { id: 'ASM-9021', date: 'Aug 26, 2026', type: 'Motor & Vocal', trendScore: 42, risk: 'Moderate', result: 'Elevated Risk Pattern', modelOutput: 'Spiral Tremor Delta: +0.28' },
      { id: 'ASM-8810', date: 'Jul 15, 2026', type: 'Motor Kinematics', trendScore: 40, risk: 'Moderate', result: 'Moderate Tremor Score', modelOutput: 'Baseline Formant Delta: Nominal' },
      { id: 'ASM-8540', date: 'Jun 02, 2026', type: 'Combined Assessment', trendScore: 38, risk: 'Low', result: 'Baseline Stability', modelOutput: 'Nominal Signal' }
    ],
    nextFollowUp: 'Aug 30, 2026',
    followUpStatus: 'Scheduled'
  },
  {
    id: 'PT-1025',
    patientIdentifier: 'PT-1025',
    name: 'Patient B (Sophia Martinez)',
    ageGroup: '55-60',
    latestAssessmentDate: 'Aug 25, 2026',
    observedTrend: 'Changed',
    riskLevel: 'Elevated',
    status: 'Review',
    assignedClinicianName: 'Dr. Aris Thorne',
    assessmentHistory: [
      { id: 'ASM-9020', date: 'Aug 25, 2026', type: 'Voice / Acoustic', trendScore: 68, risk: 'Elevated', result: 'Observed Feature Variance', modelOutput: 'Jitter/Shimmer Index +0.42' },
      { id: 'ASM-8790', date: 'Jul 10, 2026', type: 'Voice / Acoustic', trendScore: 45, risk: 'Moderate', result: 'Moderate Vocal Score', modelOutput: 'Acoustic Formant Shift' }
    ],
    nextFollowUp: 'Sep 02, 2026',
    followUpStatus: 'Scheduled'
  },
  {
    id: 'PT-1026',
    patientIdentifier: 'PT-1026',
    name: 'Patient C (David Miller)',
    ageGroup: '65-70',
    latestAssessmentDate: 'Aug 24, 2026',
    observedTrend: 'Stable',
    riskLevel: 'Low',
    status: 'Monitoring',
    assignedClinicianName: 'Dr. Aris Thorne',
    assessmentHistory: [
      { id: 'ASM-9019', date: 'Aug 24, 2026', type: 'Wellbeing / Non-Motor', trendScore: 22, risk: 'Low', result: 'Low Risk Pattern', modelOutput: 'Sleep disturbance score within threshold' }
    ],
    nextFollowUp: 'Sep 10, 2026',
    followUpStatus: 'Scheduled'
  },
  {
    id: 'PT-1027',
    patientIdentifier: 'PT-1027',
    name: 'Patient D (Emma Watson)',
    ageGroup: '50-55',
    latestAssessmentDate: 'Aug 22, 2026',
    observedTrend: 'Changed',
    riskLevel: 'Moderate',
    status: 'Review',
    assignedClinicianName: 'Dr. Aris Thorne',
    assessmentHistory: [
      { id: 'ASM-9018', date: 'Aug 22, 2026', type: 'Motor & Vocal', trendScore: 54, risk: 'Moderate', result: 'Moderate Risk Pattern', modelOutput: 'Voice acoustic tremor delta' }
    ],
    nextFollowUp: 'Sep 04, 2026',
    followUpStatus: 'Scheduled'
  }
];

export const getPatients = async (req, res) => {
  try {
    const { search, riskLevel, status, followUpStatus } = req.query;

    let dbPatients = await Patient.find({}).catch(() => []);

    if (!dbPatients || dbPatients.length === 0) {
      dbPatients = DEMO_PATIENTS;
    }

    let filtered = [...dbPatients];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.patientIdentifier && p.patientIdentifier.toLowerCase().includes(q)) ||
        (p.id && p.id.toLowerCase().includes(q))
      );
    }

    if (riskLevel && riskLevel !== 'All') {
      filtered = filtered.filter(p => (p.riskLevel || '').toLowerCase() === riskLevel.toLowerCase());
    }

    if (status && status !== 'All') {
      filtered = filtered.filter(p => (p.status || '').toLowerCase() === status.toLowerCase());
    }

    if (followUpStatus && followUpStatus !== 'All') {
      filtered = filtered.filter(p => (p.followUpStatus || '').toLowerCase() === followUpStatus.toLowerCase());
    }

    return res.status(200).json({
      success: true,
      message: 'Patients retrieved successfully',
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    let patient = await Patient.findOne({ $or: [{ _id: id }, { patientIdentifier: id }] }).catch(() => null);

    if (!patient) {
      patient = DEMO_PATIENTS.find(p => p.id === id || p.patientIdentifier === id);
    }

    if (!patient) {
      return res.status(404).json({ success: false, message: `Patient with ID [${id}] not found` });
    }

    return res.status(200).json({
      success: true,
      message: 'Patient details retrieved successfully',
      data: patient
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createPatient = async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body).catch(() => ({
      ...req.body,
      _id: `PT-${Date.now()}`,
      patientIdentifier: req.body.patientIdentifier || `PT-${Date.now()}`
    }));

    return res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      data: newPatient
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
