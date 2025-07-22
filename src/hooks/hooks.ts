import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixtures";
import { getEnv } from "../helper/env/env";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { invokeBrowser } from "../helper/browsers/browserManager";
import appointmentData from "../helper/util/AppointmentData.json";

export let currentTestData: any;
setDefaultTimeout(30 * 1000);

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  getEnv();
  browser=await invokeBrowser();
});

Before(async function ({ pickle }) {
  const scenarioName = pickle.name;
  const context=await browser.newContext();
  const page=await context.newPage();
  pageFixture.page = page;
  const baseUrl=process.env.BASEURL;
  if (!baseUrl) {
    throw new Error("BASEURL is not defined in environment variables");
  }
  await page.goto(baseUrl, { timeout: 20000 });
  const matchedData=appointmentData.find((data: any) => data.testName === scenarioName);
  if (matchedData) {
    this.currentTestData=matchedData;
  } else {
    this.currentTestData={};
    console.warn(`⚠️ No test data found for scenario: "${scenarioName}" — continuing without it.`);
  }
});
After(async function ({ pickle, result }) {
  console.log(result?.status);
  if (result?.status===Status.FAILED) {
    const img = await pageFixture.page.screenshot({
      path: `./test-result/screenshots/${pickle.name}.png`,
      type: "png",
    });
    await this.attach(img, "image/png");
  }
  await pageFixture.page.close();
});
AfterAll(async function () {
  await browser.close();

});
