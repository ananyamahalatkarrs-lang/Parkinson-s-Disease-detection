import { User } from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-passwordHash').sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Users list retrieved',
      count: users.length,
      data: users.map(u => ({
        id: u._id,
        name: u.name,
        email: u.email,
        role: u.role === 'doctor' ? 'Clinician' : u.role,
        status: u.isActive ? 'ACTIVE' : 'INACTIVE',
        lastLogin: u.updatedAt ? new Date(u.updatedAt).toLocaleString() : 'Recent'
      }))
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'User profile retrieved',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role === 'doctor' ? 'Clinician' : user.role,
        status: user.isActive ? 'ACTIVE' : 'INACTIVE',
        profile: user.profile
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
