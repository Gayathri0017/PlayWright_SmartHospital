import { Before,After, BeforeAll ,AfterAll, Status} from "@cucumber/cucumber";
import { chromium,Browser,Page,BrowserContext} from "@playwright/test";
import { pageFixture } from "./pageFixtures";
import { getEnv } from "../helper/env/env";
import { invokeBrowser } from "../helper/browsers/browserManager";
// import { createLogger } from "winston";
// import { options } from "../helper/util/logger";
let browser:Browser;
let context:BrowserContext;
BeforeAll(async function(){
    getEnv();
    browser=await invokeBrowser();
});
Before(async function({ pickle }) {
    const scenarioName = pickle.name + pickle.id;
    context = await browser.newContext();
    const page = await browser.newPage();
    pageFixture.page = page;
    const baseUrl = "https://demo.smart-hospital.in/site/login";

    if (!baseUrl) {
        throw new Error("BASEURL is not defined in environment variables");
    }

    await pageFixture.page.goto(baseUrl, { timeout: 10000 });
});After(async function({pickle,result}){
    console.log(result?.status);
    if(result?.status==Status.FAILED){
        const img=await pageFixture.page.screenshot({path:`./test-result/screenshots/${pickle.name}.png`,type:"png"})
        await this.attach(img,"image/png");
    }
    // await pageFixture.logger?.close();
    await pageFixture.page.close();
    await context.close();
});
AfterAll(async function(){
    // await pageFixture.logger?.close();
    await browser.close();
});