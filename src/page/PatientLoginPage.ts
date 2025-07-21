
import { expect, Page } from "@playwright/test";

export default class PatientLoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private LoginPageElements = {
        userLoginBtn: "//a[normalize-space()='User Login']",
        sigInBtn: "//button[@class='btn']",
        usernameField: "(//div[@class='form-group']/input)[1]",
        passwordField: "(//div[@class='form-group']/input)[2]",
        usernameRequired: "//div[@class='form-bottom']/form/div[1]/span/p",
        passwordRequired: "//div[@class='form-bottom']/form/div[2]/span/p",
        profile : "//a[@class='dropdown-toggle']",
        verifyProfile : "//div[@class='navbar-custom-menu']/ul/li[4]/ul/li/div/div[1]//following-sibling::div/h5",
    };

    async clickUserLoginBtn() {
        // const [newPage] = await Promise.all([
        // this.page.context().waitForEvent('page'),
        this.page.locator(this.LoginPageElements.userLoginBtn).click()
    // ]);
    // await newPage.waitForLoadState('load');
    // return this.page = newPage;
    }

    async clickSignInBtn() {
            await this.page.locator(this.LoginPageElements.sigInBtn).click()
    }

    async provideUsername(username: string) {
        await this.page.locator(this.LoginPageElements.usernameField).fill(username);
    }

    async providePassword(password: string) {
        await this.page.locator(this.LoginPageElements.passwordField).fill(password);
    }

    async emptyUsername() {
        await this.page.locator(this.LoginPageElements.usernameField).fill('');
    }

    async emptyPassword() {
        await this.page.locator(this.LoginPageElements.passwordField).fill('');
    }

    async usernameRequired() {
        await this.page.locator(this.LoginPageElements.usernameRequired).isVisible();
    }

    async passwordRequired() {
        await this.page.locator(this.LoginPageElements.passwordRequired).isVisible();
    }

    async clickProfile(){

            const profile = await this.page.locator(this.LoginPageElements.profile);
            await profile.waitFor({ state: 'visible', timeout: 10000 }); // Increased wait
            await profile.click();
    
        }
    
        async VerifyProfile(){
            const nameLocator = this.page.locator(this.LoginPageElements.verifyProfile);
            await nameLocator.waitFor({ state: 'visible', timeout: 10000 });
    
            const profileName = await nameLocator.textContent();
            expect(profileName?.trim()).toContain("Patient");
        }
}