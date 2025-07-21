import {expect,Page,Locator } from "@playwright/test";
export default class LoginPage{
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    private LoginPageElements={
        doctorBtn:"//i[@class=\"fa fa-user-md ispace\"]",
        signin:"//button[@class=\"btn\"]",
    }
    async login(){
        await this.page.click(this.LoginPageElements.doctorBtn);
        await this.page.click(this.LoginPageElements.signin);
    }
}
