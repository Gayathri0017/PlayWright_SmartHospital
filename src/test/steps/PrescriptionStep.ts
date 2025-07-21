import { Given, When, Then } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixtures";
import PrescriptionPage from "../../page/PrescriptionPage";

let prescriptionPage: PrescriptionPage;
When('the Doctor Navigates to the OPD section', async function () {
  prescriptionPage = new PrescriptionPage(pageFixture.page);
  await prescriptionPage.clickOPDMenu();
});

When('Clicks the Add Prescription', async function () {
  await prescriptionPage.clickAddPrescription();
});

When('the doctor fills the prescription form with:', async function (dataTable) {
  const data = dataTable.raw();
  await prescriptionPage.fillPrescriptionForm({
    Category: data[1][0],
    Medicine: data[1][1],
    Dose: data[1][2],
    Interval: data[1][3],
    Duration: data[1][4],
  });
});
When('Clicks Save button', async function () {
  await prescriptionPage.clickSaveButton();
});
Then('the system should show an error {string}', async function (expectedMessage: string) {
  await prescriptionPage.verifyToastMessage(expectedMessage);
});
