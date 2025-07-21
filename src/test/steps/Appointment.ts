import { Given, When, Then } from "@cucumber/cucumber";
import AppointmentPage from "./../../page/AppointmentPage";
import { pageFixture } from "../../hooks/pageFixtures";
import appointmentData from "./../../helper/util/AppointmentData.json";
import { currentTestData } from "../../hooks/hooks";
let appointmentPage:AppointmentPage;
Given('the User navigate to the appointment section', async function () {
    appointmentPage=new AppointmentPage(pageFixture.page);
    await appointmentPage.clickAppointment();
});
When('Doctor clicks the Add Appointment button', async function () {
    await appointmentPage.clickAddAppointment();
});
When('Doctor clicks on New Patient button', async function () {
    await appointmentPage.clickAddNewPatient();
});
When('Doctor fills in patient details', async function () {
    const p=this.currentTestData.patient;
    await appointmentPage.addPatient(p.name, p.year, p.month, p.date);
});
When('Doctor clicks the save button', async function () {
    await appointmentPage.savePatient();
});
Then('Patient should be added successfully', async function () {
    await appointmentPage.assertPatient(appointmentData[0].patient.name);
});
Then('Patient creation should fail with {string} message', async function (errorMessage: string) {
    await appointmentPage.verifyRequired(errorMessage);
});
When('Doctor fills in appointment details', async function () {
    const data=this.currentTestData.appointment;
    await appointmentPage.appointment(data.doctor,data.slot,data.shift,data.appointmentDate,data.status,data.discount);
});
When('Doctor clicks on save button', async function () {
    await appointmentPage.saveAppointment();
});
Then('Appointment should be created successfully', async function () {
    await appointmentPage.verifyAppointmentSuccess();
});
When('Doctor leaves the {string} field empty', async function (field) {
  const patient = this.currentTestData.patient;
  await appointmentPage.addPatient(patient.name, patient.year, patient.month, patient.date);
});

Then('{string} message should be displayed', async function (string) {
    await appointmentPage.verifyRequired(string);
});

