import { Then } from "@cucumber/cucumber";
import PatientChargePage from "../../page/PatientChargePage";
import { pageFixture } from "../../hooks/pageFixtures";
import DashboardPage from "../../page/DashboardPage";

let patientChargePage : PatientChargePage ;

Then('the User clicks Ipd button', async function () {
    patientChargePage = new PatientChargePage(pageFixture.page);
  await patientChargePage.ClickIPD();
  pageFixture.logger?.info("IPD button clicked");
         });

Then('the User Clicks the charge btn', async function () {
  patientChargePage = new PatientChargePage(pageFixture.page);
  await patientChargePage.ClickChargeBtn();
  pageFixture.logger?.info("Chsrge button is clicked");
         });

Then('the User is able to see the charge details of the patient', async function () {
  patientChargePage = new PatientChargePage(pageFixture.page);
  await patientChargePage.getPatientChargeDetails();
  pageFixture.logger?.info("patient charge details are visble");
         });

Then('verify the amount for total charges', async function () {
  patientChargePage = new PatientChargePage(pageFixture.page);
  console.log(await patientChargePage.getActualAmount());
  pageFixture.logger?.info("the total amount is verified");
         });