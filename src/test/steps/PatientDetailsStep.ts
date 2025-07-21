import { Then } from "@cucumber/cucumber";
import PatientDetailsPage from "../../page/PatientDetailsPage";
import { pageFixture } from "../../hooks/pageFixtures";

let patientDetailsPage : PatientDetailsPage ;
Then('the User is able to click the my appointment button', async function () {
    patientDetailsPage = new PatientDetailsPage(pageFixture.page);
    await patientDetailsPage.ClickMyAppointment();
         });
Then('the User can see the details of patient', async function () {
    patientDetailsPage = new PatientDetailsPage(pageFixture.page);
    await patientDetailsPage.getPatientDetails();
         });