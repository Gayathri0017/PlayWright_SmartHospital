const report = require("multiple-cucumber-html-reporter");

const currentTime = new Date().toLocaleString("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata", 
});

report.generate({
  jsonDir: "test-results",
  reportPath: "./reports/html",
  metadata: {
    browser: {
      name: "chrome",
      version: "138.0.7204.97",
    },
    device: "Local test machine",
    platform: {
      name: "windows",
      version: "11",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "book cart azure project" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "B11221.34321" },
      { label: "Execution Start Time", value: currentTime },
      { label: "Execution End Time", value: currentTime },
    ],
  },
});