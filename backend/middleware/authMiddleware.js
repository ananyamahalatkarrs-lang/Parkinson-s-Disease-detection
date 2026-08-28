import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'q_parkinson_super_secure_quantum_jwt_key_2026');

      const user = await User.findById(decoded.id).select('-passwordHash');
      if (user) {
        req.user = user;
      } else {
        req.user = {
          _id: decoded.id,
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role
        };
      }
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, token validation failed' });
    }
  }

  return res.status(401).json({ success: false, message: 'Not authorized, no bearer token provided' });
};

