import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixtures";
import { getEnv } from "../helper/env/env";
import { invokeBrowser } from "../helper/browsers/browserManager";
import appointmentData from "../helper/Util/AppointmentData.json";
import { options } from "../helper/Util/logger";
import { createLogger } from "winston";
import { request as playwrightRequest, chromium } from "@playwright/test";
let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
  const scenarioName = pickle.name;
  context=await browser.newContext();
  await context.tracing.start({ screenshots: true, snapshots: true });
  const page=await context.newPage();
  const apiRequestContext=await playwrightRequest.newContext();
  pageFixture.page=page;
  pageFixture.request=apiRequestContext;

  const scenarioTags = pickle.tags.map((tag: any) => tag.name);
  const baseUrl = process.env.BASEURL;
  const firstUrl = process.env.FIRSTURL;
  const patientUrl = process.env.PATIENTURL;

  if (!baseUrl || !firstUrl) {
    throw new Error("BASEURL or FIRSTURL is not defined in environment variables");
  }

  // Handle routing based on tags
  if (scenarioTags.includes("@SocialMedia")) {
    await page.goto(firstUrl, { timeout: 10000 });
  } else if (scenarioTags.includes("@Patient")) {
    if (!patientUrl) {
      throw new Error("PATIENTURL is not defined in environment variables");
    }
    await page.goto(patientUrl, { timeout: 10000 });
  } else {
    await page.goto(baseUrl, { timeout: 20000 });
  }
  // Attach test data if available

  const matchedData = appointmentData.find((data: any) => data.testName === scenarioName);
  if (matchedData) {
    this.currentTestData = matchedData;
  } else {
    this.currentTestData = {};
  }
  pageFixture.logger=createLogger(options(scenarioName));
});

// After(async function ({ pickle, result }) {
//   console.log(`Scenario "${pickle.name}" finished with status: ${result?.status}`);
//   if (result?.status === Status.FAILED) {
//     const img = await pageFixture.page.screenshot({
//       path: `./test-result/screenshots/${pickle.name}.png`,
//       type: "png",
//     });
//     await this.attach(img, "image/png");
//   }
//   await pageFixture.page.close();
//   await context.close();
// });
After(async function({ pickle, result }) {
  const scenarioName=pickle.name.replace(/\s+/g, "_");
  console.log(`Scenario "${pickle.name}" status: ${result?.status}`);

  if (result?.status===Status.FAILED) {
    // Save screenshot
    const screenshot=await pageFixture.page.screenshot({
      path:`./test-result/screenshots/${scenarioName}.png`,
      type:"png",
    });
    await this.attach(screenshot, "image/png");
    // Save trace
    const tracePath=`./test-result/traces/${scenarioName}.zip`;
    await context.tracing.stop({ path: tracePath });
    await this.attach(`Trace: ${tracePath}`);
  }
  else{
    await context.tracing.stop();
  }
  await pageFixture.page.close();
  await context.close();
});


AfterAll(async function () {
  await browser.close();
});
