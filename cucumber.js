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
<<<<<<< HEAD
    // paths: ["src/test/features/PatientLogin.feature",
    //   "src/test/features/PatientAppointment.feature",
    //   "src/test/features/PatientCharge.feature",
    //   "src/test/features/PatientContent.feature",
    //   "src/test/features/PatientDetails.feature"
      
    // ],
    paths:[
    "src/test/features/Appointment.feature",
      "src/test/features/TodoList.feature",
      "src/test/features/PatientSearch.feature",
      "src/test/features/Prescription.feature"
    ],
=======
    paths: ["src/test/features/*.feature"],
>>>>>>> 228b482bc08ee87c7a16aa7d278e1c1a1d4dc76d
    format: [
      "progress-bar",
      "html:reports/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:rerun.txt"
    ],
    requireModule: ["ts-node/register"]
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
