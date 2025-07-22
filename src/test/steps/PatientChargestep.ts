import { Then } from "@cucumber/cucumber";
import PatientChargePage from "../../page/PatientChargePage";
import { pageFixture } from "../../hooks/pageFixtures";
import DashboardPage from "../../page/DashboardPage";

let patientChargePage : PatientChargePage ;

Then('the User clicks Ipd button', async function () {
    patientChargePage = new PatientChargePage(pageFixture.page);
  await patientChargePage.ClickIPD();
         });

Then('the User Clicks the charge btn', async function () {
  patientChargePage = new PatientChargePage(pageFixture.page);
  await patientChargePage.ClickChargeBtn();
         });

Then('the User is able to see the charge details of the patient', async function () {
  patientChargePage = new PatientChargePage(pageFixture.page);
  await patientChargePage.getPatientChargeDetails();
         });

Then('verify the amount for total charges', async function () {
  patientChargePage = new PatientChargePage(pageFixture.page);
  console.log(await patientChargePage.getActualAmount());
         });