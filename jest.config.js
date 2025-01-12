module.exports = {
    name: "medpet-chatbot-service",
    verbose: false,
    testMatch: ["**/*.test.js"],
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**"],
    coverageThreshold: {
      global: {
        statements: 93,
        branches: 93,
        lines: 93,
        functions: 92,
      },
    },
    setupFiles: ["<rootDir>/tests/jest.setup.js"]
  };