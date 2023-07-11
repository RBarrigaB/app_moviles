module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  setupFiles: ['<rootDir>/src/polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  testPathIgnorePatterns: [
    "<rootDir>/src/test.ts",
    "<rootDir>/src - copia/test.ts",
  ],
  transform: {
    '^.+\\.ts$': 'babel-jest',
    '^.+\\.(ts|js|html)$': 'jest-preset-angular'
  }
};
