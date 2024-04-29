module.exports = {
  preset: 'playwright',
  testMatch: [
    '**/tests/**/*.spec.js',
    // Add more patterns if necessary
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },

};
