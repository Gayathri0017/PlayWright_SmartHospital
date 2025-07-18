import { Page } from "@playwright/test";
import { pageFixture } from './../hooks/pageFixtures';

export default class LoginPage{
    private page : Page;

    constructor(page: Page) {
           this.page = page;
        }

    private LoginPageElements = {
        userLoginBtn : "//a[normalize-space()='User Login']",
        sigInBtn : "//button[@class=\"btn\"]",
        userLoginText : "//div[@class='form-bottom']/h3" ,
        usernameField : "(//div[@class='form-group']/input)[1]" ,
        passwordField : "(//div[@class='form-group']/input)[2]",
        usernameRequired : "//div[@class='form-bottom']/form/div[1]/span/p" ,
        passwordRequired : "//div[@class='form-bottom']/form/div[2]/span/p"
    }

    // // async clickUserLoginBtn(){
    //     // await this.base.waitAndClick(this.LoginPageElements.userLoginBtn);
    //     await this.page.locator(this.LoginPageElements.userLoginBtn).click();
    //     // await this.page.goForward();
    // // }
//     async clickUserLoginBtn() {
//     const userLoginBtn = this.page.locator(this.LoginPageElements.userLoginBtn);

//     await userLoginBtn.click();

//     // Wait for patient login fields to appear
//     await this.page.locator(this.LoginPageElements.usernameField).waitFor({ 
//         state: 'visible', 
//         timeout: 10000 
//     });

//     console.log("✅ Patient login form loaded.");
// }
async clickUserLoginBtn() {
    const userLoginBtn = this.page.locator(this.LoginPageElements.userLoginBtn);

    await userLoginBtn.click();

    // Wait for username field to become visible (indicating patient login UI is loaded)
    await this.page.locator(this.LoginPageElements.usernameField).waitFor({
        state: "visible",
        timeout: 10000
    });

    console.log("✅ Patient login UI is now visible");

    // Optional: Take screenshot to verify
    await this.page.screenshot({ path: 'after-user-login.png' });
}

   


    // async clickSignInBtn(){
    //     // await this.base.waitAndClick(this.LoginPageElements.sigInBtn);
    //     await this.page.goForward();
    //     await this.page.waitForTimeout(2000);
    //     await this.page.locator(this.LoginPageElements.sigInBtn).click();
    // }
    async clickSignInBtn() {
    const url = this.page.url();
    console.log("🔎 Current URL before Sign In:", url);

    const signInBtn = this.page.locator(this.LoginPageElements.sigInBtn);
    await signInBtn.click();
}


    async provideUsername(username : string){
        // await this.page.getByPlaceholder(this.LoginPageElements.usernameField).fill(username);
        await this.page.locator(this.LoginPageElements.usernameField).fill(username);
    }

    async providePassword(password : string){
        // await this.page.getByPlaceholder(this.LoginPageElements.passwordField).fill(password);
        await this.page.locator(this.LoginPageElements.passwordField).fill(password);
    }

    async emptyUsername(){
        await this.page.getByPlaceholder(this.LoginPageElements.usernameField).clear();
    }

    async emptyPassword(){
        await this.page.getByPlaceholder(this.LoginPageElements.passwordField).clear();
    }

    async usernameRequired(){
        await this.page.locator(this.LoginPageElements.usernameRequired).isVisible();
    }

    async passwordRequired(){
        await this.page.locator(this.LoginPageElements.passwordRequired).isVisible();
    }


}