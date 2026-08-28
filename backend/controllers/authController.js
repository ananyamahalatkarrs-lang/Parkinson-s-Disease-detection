import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Patient } from '../models/Patient.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'q_parkinson_super_secure_quantum_jwt_key_2026',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, profile } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and password' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const userExists = await User.findOne({ email: cleanEmail }).catch(() => null);

    if (userExists) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const normalizedRole = (role || 'patient').toLowerCase();

    const user = await User.create({
      name,
      email: cleanEmail,
      passwordHash: password,
      role: normalizedRole,
      profile: profile || {}
    });

    // If patient role, create corresponding patient profile record
    if (normalizedRole === 'patient') {
      const pId = `PT-${Math.floor(1000 + Math.random() * 9000)}`;
      await Patient.create({
        userId: user._id,
        patientIdentifier: pId,
        name: user.name,
        age: 62,
        ageGroup: '60-65',
        gender: 'Male',
        assignedClinicianName: 'Dr. Aris Thorne',
        followUpStatus: 'Scheduled',
        latestAssessmentDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        observedTrend: 'Stable',
        riskLevel: 'Moderate',
        status: 'Review'
      }).catch(() => null);
    }

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: user._id || user.id,
          name: user.name,
          email: user.email,
          role: user.role === 'doctor' ? 'Clinician' : user.role,
          status: 'ACTIVE'
        },
        token
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email address or password. Please check your credentials.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email address or password. Please check your credentials.' });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role === 'doctor' ? 'Clinician' : user.role,
          status: 'ACTIVE'
        },
        token
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully',
      data: {
        user: req.user
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
