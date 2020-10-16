const { getSpecAndIgnoreGlobs } = require("./cypress-tags-helpers");

test("Happy path with everything configured", () => {
  const cypressConf = {
    integrationFolder: "some/integration",
    ignoreTestFiles: "*.js",
    testFiles: "**/*.{feature,features}"
  };

  expect(getSpecAndIgnoreGlobs(cypressConf).specGlob).equal(
    "some/integration/**/*.{feature,features}"
  );
  expect(getSpecAndIgnoreGlobs(cypressConf).ignoreGlob).equal(
    cypressConf.ignoreTestFiles
  );
});

test("Set ignoreTestFiles", () => {
  const cypressConf = {
    ignoreTestFiles: "*.jsx"
  };

  expect(getSpecAndIgnoreGlobs(cypressConf).ignoreGlob).equal(
    cypressConf.ignoreTestFiles
  );
});

test("Default integration folder", () => {
  const cypressConf = {
    testFiles: "**/*.{feature,features}"
  };

  expect(getSpecAndIgnoreGlobs(cypressConf).specGlob).equal(
    "cypress/integration/**/*.{feature,features}"
  );
});

test("Array for test files", () => {
  const cypressConf = {
    testFiles: ["**/*.feature", "**/*.features"]
  };

  expect(getSpecAndIgnoreGlobs(cypressConf).specGlob).equal(
    "{cypress/integration/**/*.feature,cypress/integration/**/*.features}"
  );
});

test("Remove the trailing slash from the integrafion folder", () => {
  const cypressConf = {
    integrationFolder: "some/integration/"
  };

  expect(getSpecAndIgnoreGlobs(cypressConf).specGlob).equal(
    "some/integration/**/*.feature"
  );
});

test("Default to /**/*.feature if testFiles not set", () => {
  const cypressConf = {};

  expect(getSpecAndIgnoreGlobs(cypressConf).specGlob).equal(
    "cypress/integration/**/*.feature"
  );
});
