module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less)$": "identity-obj-proxy"
  },
  testEnvironmentOptions: {
    url: "http://localhost/",
    verbose: true
  },
};