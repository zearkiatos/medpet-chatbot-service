module.exports = {
    name: "medpet-chatbot-service",
    verbose: false,
    testMatch: ["**/*.test.js"],
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**"],
    coverageThreshold: {
      global: {
        statements: 89,
        branches: 90,
        lines: 89,
        functions: 90,
      },
    },
    setupFiles: ["<rootDir>/tests/jest.setup.js"]
  };