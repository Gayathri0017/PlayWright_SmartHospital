import { Page, Locator } from '@playwright/test';

export class AccountantPageIncome {
    readonly page: Page;
    readonly accountantRoleButton: Locator;
    readonly signInButton: Locator;
    readonly incomeButton: Locator;
    readonly addIncomeButton: Locator;
    readonly incomeHeaderField: Locator;
    readonly incomeNameField: Locator;
    readonly incomeAmountField: Locator;
    readonly saveButton: Locator;
    readonly errorNotification: Locator;
    readonly validationError: Locator;
    readonly tableAmount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountantRoleButton = page.locator('a:has-text("Accountant")');
        this.signInButton = page.locator('button.btn');
        this.incomeButton = page.locator('span:has-text("General Income")');
        this.addIncomeButton = page.locator('.box-tools .btn-primary');
        this.incomeHeaderField = page.locator('select.form-control');
        this.incomeNameField = page.locator('(//*[@class="form-control"])[2]');
        this.incomeAmountField = page.locator('(//*[@class="form-control"])[5]');
        this.saveButton = page.locator('//*[@class="pull-right"]//BUTTON[@class="btn btn-info pull-right"]');
        this.errorNotification = page.locator('#toast-container div.toast-message');
        this.validationError = page.locator('span.error');
        this.tableAmount = page.locator('table.dataTable tbody tr:first-child td:nth-child(6)');
    }

    async selectRole() {
        await this.accountantRoleButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.accountantRoleButton.click();
    }

    async clickSignIn() {
        await this.signInButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.signInButton.click();
    }

    async navigateToIncome() {
        await this.incomeButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.incomeButton.click();
    }

    async clickAddIncome() {
        await this.addIncomeButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.addIncomeButton.click();
    }

    async enterIncomeDetails(header: string, name: string, amount: string) {
        if (header) await this.incomeHeaderField.selectOption({ label: header });
        if (name) await this.incomeNameField.fill(name);
        if (amount) await this.incomeAmountField.fill(amount);
    }

    async clickSave() {
        await this.saveButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.saveButton.click();
    }

    async getLatestIncomeAmount(): Promise<string> {
        await this.tableAmount.waitFor({ state: 'visible', timeout: 10000 });
        return (await this.tableAmount.textContent())?.trim() || '';
    }

    async isErrorNotificationDisplayed(): Promise<boolean> {
        try {
            await this.page.waitForTimeout(1000); // Wait for any animation
            await this.errorNotification.waitFor({ state: 'visible', timeout: 15000 });
            console.log('Toast Notification Shown');
            return true;
        } catch {
            console.log('Toast Notification NOT Shown');
            return false;
        }
    }

    async isInlineValidationErrorDisplayed(): Promise<boolean> {
        try {
            await this.page.waitForTimeout(1000);
            await this.validationError.first().waitFor({ state: 'visible', timeout: 10000 });
            console.log('Inline Validation Error Shown');
            return true;
        } catch {
            console.log('Inline Validation Error NOT Shown');
            return false;
        }
    }
}
