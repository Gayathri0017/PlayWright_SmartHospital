import { expect, Page } from "@playwright/test";
export default class DashboardPage{
    private page : Page ;

    constructor(page: Page) {
        this.page = page ;
    }

    private DashboardPageElements = {
        profile : "//a[@class='dropdown-toggle']",
        verifyProfile : "//div[@class='navbar-custom-menu']/ul/li[4]/ul/li/div/div[1]//following-sibling::div/h5",
        ipd : "//aside[@id='alert2']/div/section/ul/li[1]//following-sibling::li[3]/a/span",
    }

    async clickProfile(){
        const profile = await this.page.locator(this.DashboardPageElements.profile);
        await profile.waitFor({ state: 'visible', timeout: 10000 }); 
        await profile.click();

    }

    async VerifyProfile(){
        const nameLocator = this.page.locator(this.DashboardPageElements.verifyProfile);
        await nameLocator.waitFor({ state: 'visible', timeout: 10000 });

        const profileName = await nameLocator.textContent();
        expect(profileName?.trim()).toContain("Patient");
    }

    async ClickIPD(){
        await this.page.locator(this.DashboardPageElements.ipd).click();
    }
}
