import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import LoginPage from "../../page/loginPage";
import { pageFixture } from "../../hooks/pageFixtures";
import SearchPage from "../../page/PatientSearch";

let loginpage: LoginPage;
let searchpage: SearchPage;

Given('Doctor is logged in to the Smart Hospital system', { timeout: 20000 }, async function () {
  loginpage=new LoginPage(pageFixture.page);
  await loginpage.doctorLogin();
  pageFixture.logger?.info("Doctor logged in successfully.");
});
When('the Doctor enters {string} in the search bar', async function (searchText: string) {
  searchpage=new SearchPage(pageFixture.page);
  pageFixture.logger?.info(`Entering patient name "${searchText}" in the search bar.`);
  await searchpage.enterPatientName(searchText);
});
When('clicks the search button', async function () {
  pageFixture.logger?.info("Clicking the search button.");
  await searchpage.clickSearch();
});
Then('the system should Show the {string}', async function (expectedText: string) {
  if(expectedText==="No data available in table") {
    pageFixture.logger?.warn(`Verifying negative search result: "${expectedText}"`);
    await searchpage.verifyFailureSearch(expectedText);
  }
  else{
    pageFixture.logger?.info(`Verifying successful search result for: "${expectedText}"`);
    await searchpage.verifySuccessSearch(expectedText);
  }
});
