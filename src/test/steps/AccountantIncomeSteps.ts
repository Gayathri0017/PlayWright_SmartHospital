import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixtures";
import { AccountantPageIncome } from "../../page/AccountantPageIncome";
import { expect } from '@playwright/test';

setDefaultTimeout(60 * 1000);

let accountantPage: AccountantPageIncome;

Given('User launches Smart Hospital website', async function () {
    accountantPage = new AccountantPageIncome(pageFixture.page);
});

When('the user selects {string} role', async function (role: string) {
    await accountantPage.selectRole();
});

When('the user clicks the Sign In', async function () {
    await accountantPage.clickSignIn();
});

Then('the user navigates to the finance section and clicks on income', async function () {
    await accountantPage.navigateToIncome();
});

Then('the user clicks on Add Income', async function () {
    await accountantPage.clickAddIncome();
});

When('the user enters the following income details:', async function (dataTable) {
    const data = dataTable.hashes();
    for (const row of data) {
        const header = row.header || '';
        const name = row.name || '';
        const amount = row.amount || '';
        await accountantPage.enterIncomeDetails(header, name, amount);
    }
});

Then('the user clicks the save button', async function () {
    await accountantPage.clickSave();
});

Then('the user verifies that the new income is added to the table', async function (dataTable) {
    const expectedAmount = dataTable.hashes()[0].amount;
    const actualAmount = await accountantPage.getLatestIncomeAmount();
    expect(actualAmount).toBe(expectedAmount);
});

Then('the user verifies that the invalid income is not added to the table', async function (dataTable) {
    const invalidAmount = dataTable.hashes()[0].amount;
    const actualAmount = await accountantPage.getLatestIncomeAmount();
    expect(actualAmount).not.toBe(invalidAmount);
});

