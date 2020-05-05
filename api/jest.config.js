module.exports = {
  collectCoverageFrom: ['src/**/*.{js}', '!**/node_modules/**'],
  coverageDirectory: '<rootDir>/coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'json', 'node'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  verbose: true,
};
