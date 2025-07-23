import { Given, Then, When } from "@cucumber/cucumber";
import StaffDirectoryPage from "../../page/StaffDirectoryPage";
import { pageFixture } from "../../hooks/pageFixtures";
let staffDirectoryPage : StaffDirectoryPage;
Given('the Doctor clicks the human resource button', async function () {
    staffDirectoryPage = new StaffDirectoryPage(pageFixture.page);
    await staffDirectoryPage.ClickHR();
    pageFixture.logger?.info("HR button is clicked");
         });

When('the Doctor clicks the list view', async function () {
    staffDirectoryPage = new StaffDirectoryPage(pageFixture.page);
    await staffDirectoryPage.ClickListView();
    pageFixture.logger?.info("viewList button is clicked");
         });
Then('the Doctor can able to visible the staff available', async function () {
    staffDirectoryPage = new StaffDirectoryPage(pageFixture.page);
    await staffDirectoryPage.getNameAndRole();
    pageFixture.logger?.info("name and role of staff is received");
         });