module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await"
    },
    dryRun: false,
    require: [
      "src/test/steps/*.ts",
      "src/hooks/*.ts"
    ],
    
    paths: ["src/test/features/*.feature"],
    format: [
      "progress-bar",
      "html:reports/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:rerun.txt"
    ],
    requireModule: ["ts-node/register"],
    parallel: 4
  },
  rerun: {
    formatOptions: {
      snippetInterface: "async-await"
    },
    dryRun: false,
    paths: ["@rerun.txt"],
    require: [
      "src/test/steps/*.ts",
      "src/hooks/*.ts"
    ],
    format: [
      "progress-bar",
      "html:reports/cucumber-rerun-report.html",
      "json:test-results/cucumber-rerun.json"
    ],
    requireModule: ["ts-node/register"],
    parallel: 4
  }
};
