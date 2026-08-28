export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Access denied.'
      });
    }

    const normalizedUserRole = (req.user.role || '').toLowerCase();
    const normalizedAllowed = roles.map(r => r.toLowerCase());

    // Support 'clinician' matching 'doctor'
    if (normalizedAllowed.includes('doctor') && normalizedUserRole === 'clinician') {
      return next();
    }
    if (normalizedAllowed.includes('clinician') && normalizedUserRole === 'doctor') {
      return next();
    }

    if (!normalizedAllowed.includes(normalizedUserRole) && normalizedUserRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: `Role [${req.user.role}] is not authorized to access this resource`
      });
    }

    next();
  };
};
