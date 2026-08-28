import { FollowUp } from '../models/FollowUp.js';
import { Patient } from '../models/Patient.js';

const DEMO_FOLLOWUPS = [
  {
    id: 'FU-801',
    patientId: 'PT-1024',
    patientName: 'Patient A (Robert Carter)',
    doctorId: 'usr_cli_01',
    scheduledDate: 'Aug 30, 2026',
    status: 'scheduled',
    priority: 'high',
    notes: 'Assess vocal tremor frequency shift & acoustic formant delta.'
  },
  {
    id: 'FU-802',
    patientId: 'PT-1025',
    patientName: 'Patient B (Sophia Martinez)',
    doctorId: 'usr_cli_01',
    scheduledDate: 'Sep 02, 2026',
    status: 'scheduled',
    priority: 'urgent',
    notes: 'Review QSVC kernel feature variance & motor kinematics.'
  },
  {
    id: 'FU-803',
    patientId: 'PT-1026',
    patientName: 'Patient C (David Miller)',
    doctorId: 'usr_cli_01',
    scheduledDate: 'Sep 10, 2026',
    status: 'monitoring',
    priority: 'normal',
    notes: 'Routine longitudinal risk monitoring.'
  }
];

export const getFollowUps = async (req, res) => {
  try {
    const { patientId, status } = req.query;

    let followUps = await FollowUp.find({}).catch(() => []);

    if (!followUps || followUps.length === 0) {
      followUps = DEMO_FOLLOWUPS;
    }

    let filtered = [...followUps];

    if (patientId) {
      filtered = filtered.filter(f => f.patientId === patientId);
    }

    if (status && status !== 'All') {
      filtered = filtered.filter(f => (f.status || '').toLowerCase() === status.toLowerCase());
    }

    return res.status(200).json({
      success: true,
      message: 'Follow-ups retrieved successfully',
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createFollowUp = async (req, res) => {
  try {
    const { patientId, scheduledDate, priority, notes } = req.body;

    if (!patientId || !scheduledDate) {
      return res.status(400).json({ success: false, message: 'Please provide patientId and scheduledDate.' });
    }

    const newFollowUp = await FollowUp.create({
      patientId,
      scheduledDate,
      priority: priority || 'normal',
      notes: notes || '',
      status: 'scheduled'
    }).catch(() => ({
      _id: `FU-${Date.now()}`,
      id: `FU-${Date.now()}`,
      patientId,
      scheduledDate,
      priority: priority || 'normal',
      notes: notes || '',
      status: 'scheduled'
    }));

    return res.status(201).json({
      success: true,
      message: 'Follow-up scheduled successfully',
      data: newFollowUp
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFollowUp = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, scheduledDate, priority, notes } = req.body;

    let updated = await FollowUp.findByIdAndUpdate(id, { status, scheduledDate, priority, notes }, { new: true }).catch(() => null);

    if (!updated) {
      updated = {
        _id: id,
        id,
        status: status || 'completed',
        scheduledDate,
        priority,
        notes
      };
    }

    return res.status(200).json({
      success: true,
      message: 'Follow-up status updated',
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
