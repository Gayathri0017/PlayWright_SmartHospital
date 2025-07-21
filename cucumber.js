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
    // paths: ["src/test/features/PatientLogin.feature",
    //   "src/test/features/PatientAppointment.feature",
    //   "src/test/features/PatientCharge.feature",
    //   "src/test/features/PatientContent.feature",
    //   "src/test/features/PatientDetails.feature"
      
    // ],
    paths:["src/test/features/Appointment.feature",
      "src/test/features/TodoList.feature",
      "src/test/features/PatientSearch.feature"
    ],
    format: [
      "progress-bar",
      "html:reports/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:rerun.txt"
    ],
    requireModule: ["ts-node/register"],
    // parallel: 4
  },

  rerun: {
    formatOptions: {
      snippetInterface: "async-await"
    },
    dryRun: false,
    require: [
      "src/test/steps/*.ts",
      "src/hooks/*.ts"
    ],
    format: [
      "progress-bar",
      "html:reports/cucumber-rerun-report.html",
      "json:test-results/cucumber-rerun.json"
    ],
    requireModule: ["ts-node/register"]
  }
};
