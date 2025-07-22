import { Page, Locator } from '@playwright/test';

export class AccountantPage {
    readonly page: Page;
    readonly accountantRoleButton: Locator;
    readonly signInButton: Locator;
    readonly dashboardTitle: Locator;
    readonly dashboardButton: Locator;
    readonly summaryTable: Locator;
    readonly expensesMenu: Locator;
    readonly addExpenseButton: Locator;
    readonly expenseHeaderDropdown: Locator;
    readonly expenseNameField: Locator;
    readonly expenseAmountField: Locator;
    readonly saveButton: Locator;
    readonly successNotification: Locator;
    readonly errorNotification: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountantRoleButton = page.locator('(//*[@class="btn-group btn-group-justified"])[3]/child::a[1]');
        this.signInButton = page.locator('//*[@class="btn"]');
        this.dashboardTitle = page.locator('//h2[contains(text(),"Accountant Dashboard")]');
        this.dashboardButton = page.locator('(//*[@href="https://demo.smart-hospital.in/admin/admin/dashboard"])[2]');
        this.summaryTable = page.locator('//*[@class="content"]/child :: div[2]');
        this.expensesMenu = page.locator('(//*[@class="info-box-content"])[9]');
        this.addExpenseButton = page.locator('//*[@class="btn btn-primary btn-sm addexpense"]');
        this.expenseHeaderDropdown = page.locator('//*[@id="exp_head_id"]');
        this.expenseNameField = page.locator('//*[@id="name"]');
        this.expenseAmountField = page.locator('//*[@id="amount"]');
        this.saveButton = page.locator('//*[@class="pull-right"]/child::button');
        this.successNotification = page.locator('//*[@class="toast toast-success"]');
        this.errorNotification = page.locator('//*[@id="toast-container"]/div/div');
    }

    async selectRole() {
        await this.accountantRoleButton.click();
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async isSummaryTableDisplayed(): Promise<boolean> {
        try {
            await this.dashboardButton.click();
            await this.summaryTable.waitFor({ state: 'visible', timeout: 15000 });
            return true;
        } catch {
            return false;
        }
    }

    async navigateToExpenses() {
        await this.expensesMenu.click();
    }

    async clickAddExpense() {
        await this.addExpenseButton.click();
    }

    async selectExpenseHeader(header: string) {
        await this.expenseHeaderDropdown.selectOption({ label: header });
    }

    async enterExpenseName(name: string) {
        await this.expenseNameField.fill(name);
    }

    async enterExpenseAmount(amount: string) {
        await this.expenseAmountField.fill(amount);
    }

    async clickSave() {
        await this.saveButton.click();
    }

    async isSuccessNotificationDisplayed(): Promise<boolean> {
        try {
            await this.successNotification.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async isErrorNotificationDisplayed(): Promise<boolean> {
        try {
            await this.errorNotification.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async captureDashboardData(): Promise<string> {
        const data = await this.summaryTable.textContent();
        return data ? data.trim() : '';
    }
}
