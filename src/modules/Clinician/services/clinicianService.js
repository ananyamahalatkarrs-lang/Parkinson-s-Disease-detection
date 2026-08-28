// Asynchronous Clinician Service API abstraction

const INITIAL_PATIENTS = [
  {
    id: 'PT-1024',
    name: 'Patient A (Robert Carter)',
    ageGroup: '60-65',
    latestAssessmentDate: 'Aug 26, 2026',
    observedTrend: 'Stable',
    riskLevel: 'Moderate',
    status: 'Review',
    assignedClinician: 'Dr. Aris Thorne',
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
    name: 'Patient B (Sophia Martinez)',
    ageGroup: '55-60',
    latestAssessmentDate: 'Aug 25, 2026',
    observedTrend: 'Changed',
    riskLevel: 'Elevated',
    status: 'Review',
    assignedClinician: 'Dr. Aris Thorne',
    assessmentHistory: [
      { id: 'ASM-9020', date: 'Aug 25, 2026', type: 'Voice / Acoustic', trendScore: 68, risk: 'Elevated', result: 'Observed Feature Variance', modelOutput: 'Jitter/Shimmer Index +0.42' },
      { id: 'ASM-8790', date: 'Jul 10, 2026', type: 'Voice / Acoustic', trendScore: 45, risk: 'Moderate', result: 'Moderate Vocal Score', modelOutput: 'Acoustic Formant Shift' }
    ],
    nextFollowUp: 'Sep 02, 2026',
    followUpStatus: 'Scheduled'
  },
  {
    id: 'PT-1026',
    name: 'Patient C (David Miller)',
    ageGroup: '65-70',
    latestAssessmentDate: 'Aug 24, 2026',
    observedTrend: 'Stable',
    riskLevel: 'Low',
    status: 'Monitoring',
    assignedClinician: 'Dr. Aris Thorne',
    assessmentHistory: [
      { id: 'ASM-9019', date: 'Aug 24, 2026', type: 'Wellbeing / Non-Motor', trendScore: 22, risk: 'Low', result: 'Low Risk Pattern', modelOutput: 'Sleep disturbance score within threshold' }
    ],
    nextFollowUp: 'Sep 10, 2026',
    followUpStatus: 'Scheduled'
  },
  {
    id: 'PT-1027',
    name: 'Patient D (Emma Watson)',
    ageGroup: '50-55',
    latestAssessmentDate: 'Aug 22, 2026',
    observedTrend: 'Changed',
    riskLevel: 'Moderate',
    status: 'Review',
    assignedClinician: 'Dr. Aris Thorne',
    assessmentHistory: [
      { id: 'ASM-9015', date: 'Aug 22, 2026', type: 'Combined Assessment', trendScore: 54, risk: 'Moderate', result: 'Observed Changes', modelOutput: 'Gait variance +0.31' }
    ],
    nextFollowUp: 'Aug 29, 2026',
    followUpStatus: 'Overdue'
  },
  {
    id: 'PT-1028',
    name: 'Patient E (James Wilson)',
    ageGroup: '70-75',
    latestAssessmentDate: 'Aug 20, 2026',
    observedTrend: 'Stable',
    riskLevel: 'Low',
    status: 'Monitoring',
    assignedClinician: 'Dr. Aris Thorne',
    assessmentHistory: [
      { id: 'ASM-9010', date: 'Aug 20, 2026', type: 'Motor Kinematics', trendScore: 18, risk: 'Low', result: 'Baseline Stability', modelOutput: 'Tap frequency nominal' }
    ],
    nextFollowUp: 'Sep 15, 2026',
    followUpStatus: 'Scheduled'
  }
];

let patientsStore = [...INITIAL_PATIENTS];

export const clinicianService = {
  getDashboardOverview: async () => {
    await new Promise(res => setTimeout(res, 200));

    return {
      totalPatients: 128,
      assessmentsThisWeek: 24,
      followUpsDue: 8,
      newAssessments: 12,
      longitudinalTrendData: [
        { date: 'May 2026', baseline: 32, currentSeries: 34, quantumVariational: 33 },
        { date: 'Jun 2026', baseline: 35, currentSeries: 38, quantumVariational: 36 },
        { date: 'Jul 2026', baseline: 38, currentSeries: 44, quantumVariational: 41 },
        { date: 'Aug 2026', baseline: 40, currentSeries: 48, quantumVariational: 45 }
      ],
      aiObservations: [
        {
          id: 'obs_1',
          title: 'Longitudinal Gait & Tremor Feature Variance',
          patient: 'Patient B (PT-1025)',
          observation: 'Feature vector shift detected across multi-modal motor accelerometry (3D tremor frequency shift: +0.42).',
          model: 'Hybrid QML v2.1 Engine',
          date: 'Aug 25, 2026'
        },
        {
          id: 'obs_2',
          title: 'Acoustic Phonations Stability',
          patient: 'Patient A (PT-1024)',
          observation: 'Vocal acoustic formant spectrum remains within expected longitudinal confidence interval.',
          model: 'Acoustic Baseline Classifier v1.8',
          date: 'Aug 26, 2026'
        }
      ]
    };
  },

  getPatients: async (filters = {}) => {
    await new Promise(res => setTimeout(res, 220));

    let filtered = [...patientsStore];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    }

    if (filters.trend && filters.trend !== 'ALL') {
      filtered = filtered.filter(p => p.observedTrend === filters.trend);
    }

    if (filters.status && filters.status !== 'ALL') {
      filtered = filtered.filter(p => p.status === filters.status);
    }

    return filtered;
  },

  getPatientById: async (id) => {
    await new Promise(res => setTimeout(res, 180));
    return patientsStore.find(p => p.id === id) || null;
  },

  getAssessments: async () => {
    await new Promise(res => setTimeout(res, 200));

    const allAssessments = [];
    patientsStore.forEach(p => {
      p.assessmentHistory.forEach(a => {
        allAssessments.push({
          ...a,
          patientId: p.id,
          patientName: p.name,
          ageGroup: p.ageGroup
        });
      });
    });
    return allAssessments;
  },

  getFollowUps: async () => {
    await new Promise(res => setTimeout(res, 180));
    return patientsStore.map(p => ({
      patientId: p.id,
      patientName: p.name,
      followUpDate: p.nextFollowUp,
      status: p.followUpStatus,
      latestAssessmentDate: p.latestAssessmentDate,
      observedTrend: p.observedTrend
    }));
  },

  scheduleFollowUp: async (patientId, date, notes) => {
    await new Promise(res => setTimeout(res, 250));
    patientsStore = patientsStore.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          nextFollowUp: date,
          followUpStatus: 'Scheduled'
        };
      }
      return p;
    });
    return true;
  }
};
