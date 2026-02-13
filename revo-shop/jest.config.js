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
  "src/components/**/*.{ts,tsx}",
  "src/context/**/*.{ts,tsx}",
  "src/hooks/**/*.{ts,tsx}",
  "!src/**/*.d.ts",
  "!src/components/ProductCardSkeleton.tsx",
  "!src/components/ProductGridSkeleton.tsx",
  ],

};
