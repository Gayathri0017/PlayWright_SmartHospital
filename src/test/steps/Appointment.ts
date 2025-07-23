import { Given, When, Then } from "@cucumber/cucumber";
import AppointmentPage from "./../../page/AppointmentPage";
import { pageFixture } from "../../hooks/pageFixtures";
import appointmentData from "./../../helper/Util/AppointmentData.json";
let appointmentPage: AppointmentPage;
Given('the User navigate to the appointment section', async function () {
    appointmentPage = new AppointmentPage(pageFixture.page);
    pageFixture.logger?.info("Navigating to the appointment section");
    await appointmentPage.clickAppointment();
});

When('Doctor clicks the Add Appointment button', async function () {
    pageFixture.logger?.info("Doctor clicks the Add Appointment button");
    await appointmentPage.clickAddAppointment();
});

When('Doctor clicks on New Patient button', async function () {
    pageFixture.logger?.info("Doctor clicks on New Patient button");
    await appointmentPage.clickAddNewPatient();
});

When('Doctor fills in patient details', async function () {
    const p = this.currentTestData.patient;
    pageFixture.logger?.info(`Filling patient details: Name=${p.name}, DOB=${p.date}-${p.month}-${p.year}`);
    await appointmentPage.addPatient(p.name, p.year, p.month, p.date);
});

When('Doctor clicks the save button', async function () {
    pageFixture.logger?.info("Clicking Save button after entering patient details");
    await appointmentPage.savePatient();
});

Then('Patient should be added successfully', async function () {
    const expectedName = appointmentData[0].patient.name;
    pageFixture.logger?.info(`Asserting patient was added successfully with name: ${expectedName}`);
    await appointmentPage.assertPatient(expectedName);
});

Then('Patient creation should fail with {string} message', async function (errorMessage: string) {
    pageFixture.logger?.warn(`Asserting patient creation failed with error message: "${errorMessage}"`);
    await appointmentPage.verifyRequired(errorMessage);
});

When('Doctor fills in appointment details', async function () {
    const data = this.currentTestData.appointment;
    pageFixture.logger?.info(`Filling appointment details: Doctor=${data.doctor}, Slot=${data.slot}, Shift=${data.shift}, Date=${data.appointmentDate}, Status=${data.status}, Discount=${data.discount}`);
    await appointmentPage.appointment(data.doctor, data.slot, data.shift, data.appointmentDate, data.status, data.discount);
});

When('Doctor clicks on save button', async function () {
    pageFixture.logger?.info("Clicking Save button to save the appointment.");
    await appointmentPage.saveAppointment();
});

Then('Appointment should be created successfully', async function () {
    pageFixture.logger?.info("Verifying appointment creation success message.");
    await appointmentPage.verifyAppointmentSuccess();
});

When('Doctor leaves the {string} field empty', async function (field) {
    const patient = this.currentTestData.patient;
    pageFixture.logger?.warn(`Leaving the '${field}' field empty during patient creation.`);
    await appointmentPage.addPatient(patient.name, patient.year, patient.month, patient.date);
});

Then('{string} message should be displayed', async function (message) {
    pageFixture.logger?.info(`Verifying that error message '${message}' is displayed`);
    await appointmentPage.verifyRequired(message);
});
