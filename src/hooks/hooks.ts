import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixtures";
import { getEnv } from "../helper/env/env";
import { invokeBrowser } from "../helper/browsers/browserManager";
let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
  const scenarioName = pickle.name;
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;

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
  // const matchedData = appointmentData.find((data: any) => data.testName === scenarioName);
  // if (matchedData) {
  //   this.currentTestData = matchedData;
  // } else {
  //   this.currentTestData = {};
  //   console.warn(`⚠️ No test data found for scenario: "${scenarioName}" — continuing without it.`);
  // }
});

After(async function ({ pickle, result }) {
  console.log(`Scenario "${pickle.name}" finished with status: ${result?.status}`);
  if (result?.status === Status.FAILED) {
    const img = await pageFixture.page.screenshot({
      path: `./test-result/screenshots/${pickle.name}.png`,
      type: "png",
    });
    await this.attach(img, "image/png");
  }
  await pageFixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
