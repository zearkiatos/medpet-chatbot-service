module.exports = {
    name: "medpet-chatbot-service",
    verbose: false,
    testMatch: ["**/*.test.js"],
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**"],
    coverageThreshold: {
      global: {
        statements: 86,
        branches: 87,
        lines: 86,
        functions: 88,
      },
    },
    setupFiles: ["<rootDir>/tests/jest.setup.js"]
  };