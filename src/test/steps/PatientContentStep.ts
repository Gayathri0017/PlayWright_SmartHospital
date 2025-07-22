import { Then, When } from "@cucumber/cucumber";
import PatientContentPage from "../../page/PatientContentPage";
import { pageFixture } from "../../hooks/pageFixtures";
let patientContentPAge : PatientContentPage ;

When('the User is able to click the download center option', async function () {
  patientContentPAge = new PatientContentPage(pageFixture.page);
  await patientContentPAge.ClickDownloadCenter();
         });

Then('the User is able to visible the content list for {string}', async function (content) {
  patientContentPAge = new PatientContentPage(pageFixture.page);
  await patientContentPAge.contentList(content);
         });