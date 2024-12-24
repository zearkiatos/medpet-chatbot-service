module.exports = {
    name: "medpet-chatbot-service",
    verbose: false,
    testMatch: ["**/*.test.js"],
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**"],
    coverageThreshold: {
      global: {
        statements: 72,
        branches: 85,
        lines: 71,
        functions: 73,
      },
    },
    setupFiles: ["<rootDir>/tests/jest.setup.js"]
  };