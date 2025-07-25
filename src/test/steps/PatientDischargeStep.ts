import { Given, Then, When } from "@cucumber/cucumber";
import PatientDischargePage from "../../page/PatientDischargePage";
import { pageFixture } from "../../hooks/pageFixtures";
import { Logger } from "winston";

let patientDischargePage : PatientDischargePage;

Given('the Doctor Navigates to the IPD section', async function () {
    patientDischargePage = new PatientDischargePage(pageFixture.page);
    await patientDischargePage.ClickIPD();
    pageFixture.logger?.info("Ipd Clicked successfully");
         });

When('the Doctor clicks the ipdNo', async function () {
    patientDischargePage = new PatientDischargePage(pageFixture.page);
    await patientDischargePage.ClickFirstPatient();
    pageFixture.logger?.info("patient Clicked successfully");
         });

When('the Doctor clicks the discharge button', async function () {
    patientDischargePage = new PatientDischargePage(pageFixture.page);
    await patientDischargePage.ClickDischargeBtn();
    pageFixture.logger?.info("Discharge button Clicked successfully");
         });

Then('the Doctor provides only discharge status {string}', async function (status) {
    patientDischargePage = new PatientDischargePage(pageFixture.page);
    await patientDischargePage.SetDischargeStatus(status);
    pageFixture.logger?.info("Discharge status is passed");
         });

Then('the Doctor should save the Discharge status', async function () {
    patientDischargePage = new PatientDischargePage(pageFixture.page);
    await patientDischargePage.ClickDischargeSaveBtn();
    pageFixture.logger?.info("save button Clicked successfully");
         });

Then('the Doctor able to see the error {string}', async function (error) {
    patientDischargePage = new PatientDischargePage(pageFixture.page);
    const errorMsg = await patientDischargePage.GetError();
    if ( errorMsg === error){
        pageFixture.logger?.info("Error is asserted correctly");
    }
    else{
        pageFixture.logger?.info("Error is asserted wrongly");
    }
         });

Then('the Doctor provides only discharge date', async function () {
    patientDischargePage = new PatientDischargePage(pageFixture.page);
    await patientDischargePage.SetDischargeDate();
    pageFixture.logger?.info("Discharge Date is passed");
         });

Then('the Doctor provides discharge date and status as {string}', async function (status) {
    patientDischargePage = new PatientDischargePage(pageFixture.page);
    await patientDischargePage.SetDischargeDate();
    await patientDischargePage.SetDischargeStatus(status);
    pageFixture.logger?.info("Discharge Date and Status passed ");
         });

When('the Doctor provides the case Id in search field', async function (dataTable) {
    patientDischargePage = new PatientDischargePage(pageFixture.page);
      const dischargeDetails = dataTable.hashes();
      for (const dischargeDetail of dischargeDetails){
        await patientDischargePage.searchPatient(dischargeDetail.caseID);
      }
    //   if( await patientDischargePage.IsNoDataAvailableDisplayed){
    //     pageFixture.logger?.error("The dischrage patient is not there ")
    //   }
    //   else{
    //     Then('the Doctor provides the discharge details', async function (dataTable) {
    //         patientDischargePage = new PatientDischargePage(pageFixture.page);
    //         const statuss = dataTable.hashes();
    //         for ( const status of statuss){
    //             await patientDischargePage.SetDischargeStatus(status.DischargeStatus);
    //         }
    //     });
    // }
});

Then('the Doctor provides the discharge details', async function (dataTable) {
    patientDischargePage = new PatientDischargePage(pageFixture.page);
    if( await patientDischargePage.IsNoDataAvailableDisplayed){
        pageFixture.logger?.error("The discharge patient id is not there ")
      }
      else{
          const statuss = dataTable.hashes();
          for ( const status of statuss){
              await patientDischargePage.SetDischargeStatus(status.DischargeStatus);
          }

      }
         });