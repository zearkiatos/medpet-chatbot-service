module.exports = {
    name: "medpet-chatbot-service",
    verbose: false,
    testMatch: ["**/*.test.js"],
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**"],
    coverageThreshold: {
      global: {
        statements: 76,
        branches: 85,
        lines: 76,
        functions: 75,
      },
    },
    setupFiles: ["<rootDir>/tests/jest.setup.js"]
  };