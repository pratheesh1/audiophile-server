/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

const NODE_MODULES = "<rootDir>/node_modules/";
const BUILD_DIR = "<rootDir>/build/";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  verbose: true,
  testMatch: ["**/*.test.ts"],
  testPathIgnorePatterns: [NODE_MODULES, BUILD_DIR],
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: [NODE_MODULES, BUILD_DIR],
  coverageReporters: ["json", "html", "text"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>" }),
  modulePaths: ["<rootDir>"],
};
