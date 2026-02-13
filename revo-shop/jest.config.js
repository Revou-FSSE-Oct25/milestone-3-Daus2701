/** @type {import("jest").Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.tsx"],

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: [
  "src/hooks/**/*.{ts,tsx}",
  "src/context/**/*.{ts,tsx}",
  "src/components/**/*.{ts,tsx}",
  "!src/**/*.d.ts",
],

};
