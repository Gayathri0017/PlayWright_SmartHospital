import { Given , Then , When , setDefaultTimeout} from "@cucumber/cucumber";
import {Browser } from "@playwright/test";
import dotenv from "dotenv";
import PatientLoginPage from "../../page/PatientLoginPage";
import { pageFixture } from "../../hooks/pageFixtures";
import DashboardPage from "../../page/DashboardPage";

// let browser: Browser;
let patientloginPage:PatientLoginPage ;

dotenv.config({ path: "src/helper/env/.env.prod" });

setDefaultTimeout(60 * 1000);

Given('the User is on the Login Page', async function () {
    // const baseUrl = process.env.BASEURL;
         });

 
When('the User clicks the User Login', async function () {
    patientloginPage = new PatientLoginPage(pageFixture.page);
    patientloginPage.clickUserLoginBtn();
         });


When('the User clicks the Sign In button', async function () {
    patientloginPage = new PatientLoginPage(pageFixture.page);
    patientloginPage.clickSignInBtn();
         });

Then('the User is directed to the patient dashboard', async function () {
    patientloginPage = new PatientLoginPage(pageFixture?.page);
    const dashboardPage = new DashboardPage(pageFixture?.page);
    dashboardPage.clickProfile();
    dashboardPage.VerifyProfile();
         });


When('the User Provides invalid Username', async function () {
    patientloginPage = new PatientLoginPage(pageFixture?.page);
    patientloginPage.emptyUsername();
 });

Then('the User able to see the errorMessage as {string}', async function (error, dataTable) {
    patientloginPage = new PatientLoginPage(pageFixture?.page);
    const rows = dataTable.hashes();

    for (const row of rows){
        const errorMsg = row.errormsg;
    }

    if (error === "Username field is required"){
        patientloginPage.usernameRequired();
    }

    if(error === "Password field is required"){
        patientloginPage.passwordRequired();
    }

         });


When('the User Provides invalid Password', async function () {
    patientloginPage = new PatientLoginPage(pageFixture?.page);
    patientloginPage.emptyPassword();
        });

