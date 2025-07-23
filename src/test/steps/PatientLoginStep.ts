import { Given , Then , When , setDefaultTimeout} from "@cucumber/cucumber";
import dotenv from "dotenv";
import PatientLoginPage from "../../page/PatientLoginPage";
import { pageFixture } from "../../hooks/pageFixtures";
import DashboardPage from "../../page/DashboardPage";

let patientloginPage:PatientLoginPage ;
let dashboardPage:DashboardPage;
dotenv.config({ path: "src/helper/env/.env.prod" });

setDefaultTimeout(60 * 1000);

Given('the User is on the Login Page', async function () {
    const baseUrl = process.env.BASEURL;
    patientloginPage = new PatientLoginPage(pageFixture.page);
    pageFixture.logger?.info("URL is passed ");
         });

 
When('the User clicks the User Login',{ timeout: 20000 }, async function () {
    await patientloginPage.clickUserLoginBtn();
    pageFixture.logger?.info("User login button is clicked");
         });


When('the User clicks the Sign In button', async function () {
    await patientloginPage.clickSignInBtn();
    pageFixture.logger?.info("sign in button is clicked");
         });

Then('the User is directed to the patient dashboard', async function () {
    dashboardPage = new DashboardPage(pageFixture.page);
    await pageFixture.page.waitForTimeout(3000);
    await dashboardPage.clickProfile();
    await pageFixture.page.waitForTimeout(3000);
    await dashboardPage.VerifyProfile();
    pageFixture.logger?.info("profile verified");
         });


When('the User Provides invalid Username', async function () {
    await patientloginPage.emptyUsername();
    pageFixture.logger?.info("invalid username is passed");
 });

Then('the User able to see the errorMessage as {string}', async function (error, dataTable) {
    const rows = dataTable.hashes();

    for (const row of rows){
        const errorMsg = row.errormsg;
    }

    if (error === "Username field is required"){
        await patientloginPage.usernameRequired();
    }

    if(error === "Password field is required"){
        await patientloginPage.passwordRequired();
    }

    pageFixture.logger?.info("login error message is visible");
         });


When('the User Provides invalid Password', async function () {
    await patientloginPage.emptyPassword();
    pageFixture.logger?.info("invalid password is passed");
        });
