import { Locator, Page } from '@playwright/test';

export default class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private signInBtn: Locator;
  private sideLogo: Locator;
  private errorMsg: Locator;
  private doctorBtn: Locator;
  private signinButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.signInBtn = page.locator('button[type="submit"]');
    this.sideLogo = page.locator('.topuser-image');
    this.errorMsg = page.locator('.text-danger');
    this.doctorBtn = page.locator('//i[@class="fa fa-user-md ispace"]');
    this.signinButton = page.locator('//button[@class="btn"]');
  }

  async navigateToLogin(url: string) {
    await this.page.goto(url);
  }

  async selectRole(role: string) {
    const roleLocator = this.page.locator(`//button[contains(., "${role}")] | //a[contains(., "${role}")]`);
    await roleLocator.first().click();
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clearUsername() {
    try {
      await this.usernameInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.usernameInput.fill('');
      console.log("Username field cleared");
    } catch (err) {
      console.error("Failed to clear username field:", err);
      throw err;
    }
  }

  async clearPassword() {
    await this.passwordInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.passwordInput.fill('');
  }

  async clearBothFields() {
    await this.clearUsername();
    await this.clearPassword();
  }

  async clickSignIn() {
    await this.signInBtn.click();
  }

  async isDashboardVisible(): Promise<boolean> {
    try {
      await this.sideLogo.waitFor({ timeout: 5000 });
      return await this.sideLogo.isVisible();
    } catch {
      return false;
    }
  }

  async getErrorMessage(): Promise<string> {
    const errors = this.page.locator('.text-danger');
    const count = await errors.count();

    for (let i = 0; i < count; i++) {
      const text = await errors.nth(i).textContent();
      if (text && text.trim().length > 0) {
        return text.trim();
      }
    }
    return '';
  }

  // Added from initial requirement
  async doctorLogin() {
    await this.doctorBtn.click();
    await this.signinButton.click();
  }
}
