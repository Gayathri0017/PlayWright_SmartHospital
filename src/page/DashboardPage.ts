import { expect, Page } from "@playwright/test";
export default class DashboardPage{
    private page : Page ;

    constructor(page: Page) {
        // if (!page) throw new Error("Page is not initialized in LoginPage");
        this.page = page ;
    }

    private DashboardPageElements = {
        profile : "//div[@class='navbar-custom-menu']/ul/li[4]/a/img",
        verifyProfile : "//div[@class='navbar-custom-menu']/ul/li[4]/ul/li/div/div[1]//following-sibling::div/h5",
    }

    async clickProfile(){
        // await this.base.waitAndClick(this.DashboardPageElements.profile);
        await this.page.locator(this.DashboardPageElements.profile).click();
    }

    async VerifyProfile(){
        const profileName = await this.page.locator(this.DashboardPageElements.verifyProfile).textContent();

        expect(profileName).toContain("Patient");
    }
}