import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixtures";
import PrescriptionPage from "../../page/PrescriptionPage";
let prescriptionPage: PrescriptionPage;
When('the Doctor Navigates to the OPD section', async function () {
  prescriptionPage = new PrescriptionPage(pageFixture.page);
  pageFixture.logger?.info("Navigating to OPD section.");
  await prescriptionPage.clickOPDMenu();
});

When('Clicks the Add Prescription', async function () {
  pageFixture.logger?.info("Clicking on Add Prescription button.");
  await prescriptionPage.clickAddPrescription();
});

When('the doctor fills the prescription form with:', async function (dataTable) {
  const data = dataTable.raw();
  const formData = {
    Category: data[1][0],
    Medicine: data[1][1],
    Dose: data[1][2],
    Interval: data[1][3],
    Duration: data[1][4],
  };
  pageFixture.logger?.info(`Filling prescription form with data: ${JSON.stringify(formData)}`);
  await prescriptionPage.fillPrescriptionForm(formData);
});

When('Clicks Save button', async function () {
  pageFixture.logger?.info("Clicking Save button to submit prescription.");
  await prescriptionPage.clickSaveButton();
});

Then('the system should show an error {string}', async function (expectedMessage: string) {
  pageFixture.logger?.warn(`Verifying toast message for error: "${expectedMessage}"`);
  await prescriptionPage.verifyToastMessage(expectedMessage);
});
