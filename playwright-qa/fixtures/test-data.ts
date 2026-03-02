export const testData = {
  validProfile: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890'
  },
  
  invalidProfiles: {
    emptyName: {
      name: '',
      email: 'test@example.com',
      phone: '+1234567890'
    },
    invalidEmail: {
      name: 'John Doe',
      email: 'invalid-email',
      phone: '+1234567890'
    },
    emptyPhone: {
      name: 'John Doe',
      email: 'test@example.com',
      phone: ''
    }
  },
  
  updatedProfile: {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+9876543210'
  },

  // Login test data
  login: {
    valid: {
      username: 'admin',
      password: 'password123',
      remember: true,
    },
    invalid: {
      username: 'wrong',
      password: 'wrongpass',
    },
    empty: {
      username: '',
      password: '',
    },
  },

  // Contact form test data
  contactForm: {
    valid: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+62 812 3456 7890',
      subject: 'pertanyaan',
      message: 'This is a test message for the contact form.',
      terms: true,
    },
    invalid: {
      firstName: '',
      email: 'invalid-email',
      subject: '',
      message: 'short',
      terms: false,
    },
  },
};
