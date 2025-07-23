import { Then } from "@cucumber/cucumber";
import PatientAppointmentPage from "../../page/PatientAppointmentPage";
import { pageFixture } from "../../hooks/pageFixtures";
import { AppointmentDetails, DataProvider } from "../../helper/Util/DataProvider";
import { error } from "console";

let patientAppointmentPage : PatientAppointmentPage;
Then('the User is able to see the add appointment option', async function () {
  patientAppointmentPage = new PatientAppointmentPage(pageFixture.page);
  await patientAppointmentPage.ClickAddAppointment();
  pageFixture.logger?.info("add appointment button is visible");
         });

Then('the User can fill the appointment form', async function () {
  patientAppointmentPage = new PatientAppointmentPage(pageFixture.page);
  const details : AppointmentDetails[] = DataProvider.getAppointmentDetailsFromCSV();
   for (const detail of details){
    await patientAppointmentPage.Appointmentdetails(
      detail.date,
      detail.specialist,
      detail.doctor,
      detail.shift,
      detail.slot,
      detail.message
    );
   }
   pageFixture.logger?.info("patient appointment details are passed by the csv file");
         });

Then('the User should save the form for appointment', async function () {
  patientAppointmentPage = new PatientAppointmentPage(pageFixture.page);
  await patientAppointmentPage.ClicksaveBtn();
  pageFixture.logger?.info("Save button is clicked");
         });

Then('the User is able see the success message {string}', async function (confirmationMessage) {
  patientAppointmentPage = new PatientAppointmentPage(pageFixture.page);
  const sussmsg = await patientAppointmentPage.getSuccessMsg();
  if(sussmsg === confirmationMessage){
    console.log("----------Appointment booked successfully-------")
  }
  pageFixture.logger?.info("The successful message is visible");
         });


Then('the User can fill the appointment', async function (dataTable) {
  patientAppointmentPage = new PatientAppointmentPage(pageFixture.page);
  const appointments = dataTable.hashes();
  for (const appointmentDetails of appointments){
    await patientAppointmentPage.setDate(appointmentDetails.Date);
    await patientAppointmentPage.setSpecialist(appointmentDetails.Specialist);
    await patientAppointmentPage.setDoctor(appointmentDetails.Doctor);
    await patientAppointmentPage.setShift(appointmentDetails.Shift);
    await patientAppointmentPage.setTime(appointmentDetails.Timing);
    await patientAppointmentPage.setAvailableTime();
    await patientAppointmentPage.setMessage(appointmentDetails.Message);
  }
  pageFixture.logger?.info("patient appointment details are passed by data table");
         });


Then('the User can able to see the error msg {string}', async function (errorMsg) {
  patientAppointmentPage = new PatientAppointmentPage(pageFixture.page);
  const errorMessage = await patientAppointmentPage.getError();
  if (errorMessage === errorMsg){
    console.log("Asserted correctly for the error message");
  }
  pageFixture.logger?.info("The error message is visible");
         });
