module.exports = {
  preset: 'jest-puppeteer',
  // testEnvironment: 'node',
  testEnvironment: 'jest-environment-puppeteer',
  globals: {
    // 'ts-jest': {
    //   tsconfig: 'tsconfig.json',
    // },
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        /* ts-jest config goes here in Jest */
      },
    ],
  },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
};
