export interface SwagUser {
  username: string;
  password: string;
  description: string;
}

export const USERS: Record<string, SwagUser> = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
    description: 'Normal, fully-functional user',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    description: 'Blocked from logging in',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
    description: 'UI/image rendering issues',
  },
  performanceGlitch: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    description: 'Simulates slow app performance',
  },
  error: {
    username: 'error_user',
    password: 'secret_sauce',
    description: 'Triggers unexpected errors in flows',
  },
  visual: {
    username: 'visual_user',
    password: 'secret_sauce',
    description: 'Visual/layout inconsistencies',
  },
};

export const CHECKOUT_INFO = {
  valid: { firstName: 'Jane', lastName: 'Doe', postalCode: '10001' },
  missingFirstName: { firstName: '', lastName: 'Doe', postalCode: '10001' },
};
