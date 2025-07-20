import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import LoginPage from "../../page/loginPage";
import { pageFixture } from "../../hooks/pageFixtures";
import SearchPage from "../../page/PatientSearch";
    let loginpage:LoginPage;
    let searchpage:SearchPage;
    Given('Doctor is logged in to the Smart Hospital system', { timeout: 20000 },async function () {
       loginpage=new LoginPage(pageFixture.page);
       //await loginpage.login();
       await loginpage.doctorLogin();

    });
    When('the Doctor enters {string} in the search bar', async function (string) {
       searchpage=new SearchPage(pageFixture.page);
       await searchpage.enterPatientName(string);
    });
    When('clicks the search button', async function () {
       await searchpage.clickSearch();
    });
    Then('the system should Show the {string}', async function (string) {
       if(string=="No data available in table"){
              await searchpage.verifyFailureSearch(string);
       }
       else{
              await searchpage.verifySuccessSearch(string);
       }
    });

    