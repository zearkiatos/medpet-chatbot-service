module.exports = {
    name: "medpet-chatbot-service",
    verbose: false,
    testMatch: ["**/*.test.js"],
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**"],
    coverageThreshold: {
      global: {
        statements: 91,
        branches: 92,
        lines: 91,
        functions: 91,
      },
    },
    setupFiles: ["<rootDir>/tests/jest.setup.js"]
  };