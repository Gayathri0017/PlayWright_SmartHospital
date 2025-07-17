import { expect, Page } from "@playwright/test";
export default class DashboardPage{
    private page : Page ;

    constructor(page: Page) {
        // if (!page) throw new Error("Page is not initialized in LoginPage");
        this.page = page ;
    }

    private DashboardPageElements = {
        // profile : "//div[@class='navbar-custom-menu']/ul/li[4]/a/img",
        profile : "//a[@class='dropdown-toggle']",
        verifyProfile : "//div[@class='navbar-custom-menu']/ul/li[4]/ul/li/div/div[1]//following-sibling::div/h5",
    }

    async clickProfile(){
        // await this.base.waitAndClick(this.DashboardPageElements.profile);
        const profile = await this.page.locator(this.DashboardPageElements.profile);
        await profile.waitFor({ state: 'visible', timeout: 10000 }); // Increased wait
        await profile.click();

    }

    async VerifyProfile(){
        // const profileName = await this.page.locator(this.DashboardPageElements.verifyProfile).textContent();

        // expect(profileName).toContain("Patient");
        const nameLocator = this.page.locator(this.DashboardPageElements.verifyProfile);
        await nameLocator.waitFor({ state: 'visible', timeout: 10000 });

        const profileName = await nameLocator.textContent();
        expect(profileName?.trim()).toContain("Patient");
    }
}
