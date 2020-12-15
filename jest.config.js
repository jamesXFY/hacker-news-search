module.exports = {
  roots: [
    '<rootDir>/src'
  ],
  testMatch: [
    '**/**.spec.ts'
  ],
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts']
}