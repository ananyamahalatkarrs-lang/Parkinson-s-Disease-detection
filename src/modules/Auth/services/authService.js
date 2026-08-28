// Light Enterprise Authentication API Abstraction

const INITIAL_USERS = [
  {
    id: 'usr_cli_01',
    name: 'Dr. Aris Thorne',
    email: 'clinician@qparkinson.org',
    password: 'Password123!',
    role: 'Clinician',
    status: 'ACTIVE',
    specialization: 'Neurology & Movement Disorders',
    createdAt: '2025-02-10'
  }
];

let usersStore = [...INITIAL_USERS];

export const authService = {
  login: async (email, password) => {
    await new Promise(res => setTimeout(res, 250));

    const cleanEmail = email.trim().toLowerCase();
    const user = usersStore.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user || user.password !== password) {
      throw new Error('Invalid email address or password. Please check your credentials.');
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'Clinician',
        status: user.status
      },
      token: `q_parkinson_token_${Date.now()}`
    };
  },

  signup: async (signupData) => {
    await new Promise(res => setTimeout(res, 300));

    const cleanEmail = signupData.email.trim().toLowerCase();
    const existing = usersStore.find(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      throw new Error('An account with this email address already exists. Please sign in instead.');
    }

    const newUser = {
      id: `usr_cli_${Date.now()}`,
      name: signupData.name,
      email: cleanEmail,
      password: signupData.password,
      role: 'Clinician',
      status: 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0]
    };

    usersStore.unshift(newUser);

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status
      },
      token: `q_parkinson_token_${Date.now()}`
    };
  },

  forgotPassword: async (email) => {
    await new Promise(res => setTimeout(res, 200));
    return {
      message: 'If an account is associated with this email address, password recovery instructions have been sent.'
    };
  },

  resetPassword: async (token, newPassword) => {
    await new Promise(res => setTimeout(res, 250));
    return {
      message: 'Your password has been updated successfully. Please sign in with your new password.'
    };
  }
};
