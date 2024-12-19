module.exports = {
    name: "medpet-chatbot-service",
    verbose: false,
    testMatch: ["**/*.test.js"],
    testEnvironment: "node",
    collectCoverageFrom: ["src/**/*.js", "!**/node_modules/**"],
    coverageThreshold: {
      global: {
        statements: 65,
        branches: 66,
        lines: 66,
        functions: 69,
      },
    },
    setupFiles: ["<rootDir>/tests/jest.setup.js"]
  };