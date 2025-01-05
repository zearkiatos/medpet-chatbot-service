module.exports = {
    name: "medpet-chatbot-service",
    verbose: false,
    testMatch: ["**/*.test.js"],
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**"],
    coverageThreshold: {
      global: {
        statements: 87,
        branches: 88,
        lines: 87,
        functions: 88,
      },
    },
    setupFiles: ["<rootDir>/tests/jest.setup.js"]
  };