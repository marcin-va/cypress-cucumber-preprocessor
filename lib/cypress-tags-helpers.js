module.exports = {
  getSpecAndIgnoreGlobs: cypressConf => {
    let specGlob;
    let ignoreGlob;
    const integrationFolder =
      cypressConf && cypressConf.integrationFolder
        ? cypressConf.integrationFolder.replace(/\/$/, "")
        : "cypress/integration";

    if (cypressConf && cypressConf.ignoreTestFiles) {
      ignoreGlob = cypressConf.ignoreTestFiles;
    }

    if (cypressConf && cypressConf.testFiles) {
      let testFiles = Array.isArray(cypressConf.testFiles)
        ? cypressConf.testFiles
        : [cypressConf.testFiles];
      testFiles = testFiles.map(pattern => `${integrationFolder}/${pattern}`);
      specGlob =
        testFiles.length > 1 ? `{${testFiles.join(",")}}` : testFiles[0];
    } else {
      specGlob = `${integrationFolder}/**/*.feature`;
    }
    return { specGlob, ignoreGlob };
  }
};
