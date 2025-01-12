module.exports = {
    name: "medpet-chatbot-service",
    verbose: false,
    testMatch: ["**/*.test.js"],
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**"],
    coverageThreshold: {
      global: {
        statements: 92,
        branches: 92,
        lines: 92,
        functions: 91,
      },
    },
    setupFiles: ["<rootDir>/tests/jest.setup.js"]
  };