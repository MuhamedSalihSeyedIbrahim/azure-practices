module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  name: "part-4-joke-application-function-with-testing",
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "((\\.|/*.)(spec))\\.ts?$",
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
