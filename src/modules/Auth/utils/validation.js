// Form validation and password strength utilities

export const validateEmail = (email) => {
  if (!email) return 'Email address is required.';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.trim())) {
    return 'Please enter a valid email address.';
  }
  return null;
};

export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'None', variant: 'muted', checks: {} };

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  const score = Object.values(checks).filter(Boolean).length;

  if (score <= 2) {
    return { score, label: 'Weak', variant: 'danger', checks };
  } else if (score <= 4) {
    return { score, label: 'Medium', variant: 'warning', checks };
  } else {
    return { score, label: 'Strong', variant: 'success', checks };
  }
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required.';
  if (password.length < 8) {
    return 'Password must contain at least 8 characters.';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return 'Phone number is required.';
  const clean = phone.replace(/[\s\-\(\)\+]/g, '');
  if (clean.length < 7 || clean.length > 15) {
    return 'Please enter a valid telephone contact number.';
  }
  return null;
};
