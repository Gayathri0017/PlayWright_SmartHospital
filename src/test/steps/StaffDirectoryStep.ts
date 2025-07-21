import { Given, Then, When } from "@cucumber/cucumber";
import StaffDirectoryPage from "../../page/StaffDirectoryPage";
import { pageFixture } from "../../hooks/pageFixtures";
let staffDirectoryPage : StaffDirectoryPage;
Given('the Doctor clicks the human resource button', async function () {
    staffDirectoryPage = new StaffDirectoryPage(pageFixture.page);
    await staffDirectoryPage.ClickHR();
         });

When('the Doctor clicks the list view', async function () {
    staffDirectoryPage = new StaffDirectoryPage(pageFixture.page);
    await staffDirectoryPage.ClickListView();
         });
Then('the Doctor can able to visible the staff available', async function () {
    staffDirectoryPage = new StaffDirectoryPage(pageFixture.page);
    await staffDirectoryPage.getNameAndRole();
         });