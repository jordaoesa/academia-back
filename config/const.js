module.exports = {
  server: {
    title: 'Academia-Back',
    port: process.env.PORT || 3000
  },

  db: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/academia-back',
    options: {
      useNewUrlParser: true,
      user: process.env.MONGO_USER || '',
      pass: process.env.MONGO_PASS || ''
    }
  },

  userSession: {
    TIME: 10
  },

  http: {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    FORBIDDEN: 401,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },

  successDetails: {
    USER_REGISTERED_SUCCESS: { code: 2000, message: 'User successfully registered' },
    USER_SIGN_OUT_SUCCESS: { code: 2001, message: 'User successfully signed out' },
  },

  errorDetails: {
    UNAUTHORIZED_USER: { code: 3000, message: 'Unauthorized user' },
    WRONG_USER_PASSWORD: { code: 3001, message: 'Wrong user or password' },
    USER_NOT_FOUND: { code: 3002, message: 'User not found' },
  }

};
