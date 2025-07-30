// tests/stepDefinitions/validateLinks.steps.ts
import { When, Then } from '@cucumber/cucumber';
import { DoctorPage } from './../../page/VerifyLinksPage';
import { pageFixture } from "../../hooks/pageFixtures";
let doctorPage:DoctorPage;
let results: { valid: string[]; broken: string[] };
When('the user checks all the links on the page', { timeout: 120 * 1000 }, async function () {
  doctorPage=new DoctorPage(pageFixture.page, pageFixture.request);
  results=await doctorPage.validateLinks();
});
Then('the user should see which links are broken and which are valid', async function () {
  console.log(`Total Valid Links: ${results.valid.length}`);
  console.log(`Total Broken Links: ${results.broken.length}`);
});
