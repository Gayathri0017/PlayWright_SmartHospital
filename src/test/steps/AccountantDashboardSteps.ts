import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixtures";
import { AccountantPage } from "../../page/AccountantPage";
import { expect } from "@playwright/test";

setDefaultTimeout(60 * 1000);

let accountantPage: AccountantPage;
let capturedData: string;

Given('User launches the Smart Hospital application', async function () {
    accountantPage = new AccountantPage(pageFixture.page);
});

When('the user selects role {string}', async function (role: string) {
    await accountantPage.selectRole();
});

When('the user clicks the Sign In buttons', async function () {
    await accountantPage.clickSignIn();
});

Then('User should see the dashboard summary table', async function () {
    const isDisplayed = await accountantPage.isSummaryTableDisplayed();
    expect(isDisplayed).toBeTruthy();
});

Then('User should capture and print the data from dashboard table section this should be stored in the excel for reference', async function () {
    capturedData = await accountantPage.captureDashboardData();
    console.log("Captured Dashboard Data:\n" + capturedData);
    // Excel writing logic can be added here if needed
});

Then('then need enter to the Expenses', async function () {
    await accountantPage.navigateToExpenses();
});

Then('need click Add Expenses', async function () {
    await accountantPage.clickAddExpense();
});

Then('need to give the Header as {string}, name {string} and amount {string}', async function (header: string, name: string, amount: string) {
    await accountantPage.selectExpenseHeader(header);
    await accountantPage.enterExpenseName(name);
    await accountantPage.enterExpenseAmount(amount);
});

Then('the user click the save', async function () {
    await accountantPage.clickSave();
});

Then('need to see the asseart the success notifications', async function () {
    const isDisplayed = await accountantPage.isSuccessNotificationDisplayed();
    expect(isDisplayed).toBeTruthy();
});

Then('need to see the asseart the error notifications', async function () {
    const isErrorDisplayed = await accountantPage.isErrorNotificationDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
});

Then('User should not see the new entry added in the dashboard summary table', async function () {
    const page = pageFixture.page;
    const summaryTable = page.locator('(//div[@class="row"])[2]');
    await expect(summaryTable).toBeVisible();
    const tableContent = await summaryTable.textContent();
    expect(tableContent).not.toContain('Telephone Bill');
});