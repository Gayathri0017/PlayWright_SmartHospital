import { expect, Page } from "@playwright/test";

export default class PatientDetailsPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private DetailsPageElements = {
        MyAppointmentBtn : "//aside[@id='alert2']/div/section/ul/li[1]//following-sibling::li[1]/a/span",
        patientID : "//div[@class='wrapper']/div[1]/section/div/div[2]/preceding-sibling::div/div/div/div[1]/following-sibling::div/ul/li[1]/a",
        patientMaritalStatus : "//div[@class='wrapper']/div[1]/section/div/div[2]/preceding-sibling::div/div/div/div[1]/following-sibling::div/ul/li[1]/following-sibling::li[1]/a",
        patientEmail : "//div[@class='wrapper']/div[1]/section/div/div[2]/preceding-sibling::div/div/div/div[1]/following-sibling::div/ul/li[1]/following-sibling::li[2]/a",
        patientAge : "//div[@class='wrapper']/div[1]/section/div/div[2]/preceding-sibling::div/div/div/div[1]/following-sibling::div/ul/li[1]/following-sibling::li[3]/a",
        patientGender : "//div[@class='wrapper']/div[1]/section/div/div[2]/preceding-sibling::div/div/div/div[1]/following-sibling::div/ul/li[1]/following-sibling::li[4]/a",
        patientPhone : "//div[@class='wrapper']/div[1]/section/div/div[2]/preceding-sibling::div/div/div/div[1]/following-sibling::div/ul/li[1]/following-sibling::li[5]/a",
        patientAddress : "//div[@class='wrapper']/div[1]/section/div/div[2]/preceding-sibling::div/div/div/div[1]/following-sibling::div/ul/li[1]/following-sibling::li[6]/a",
        patientGuardianName : "//div[@class='wrapper']/div[1]/section/div/div[2]/preceding-sibling::div/div/div/div[1]/following-sibling::div/ul/li[1]/following-sibling::li[7]/a"
    };

    async ClickMyAppointment(){
        await this.page.locator(this.DetailsPageElements.MyAppointmentBtn).click();
    }

    async getPatientDetails(){
        const ID = await this.page.locator(this.DetailsPageElements.patientID).textContent();
        const status = await this.page.locator(this.DetailsPageElements.patientMaritalStatus).textContent();
        const email = await this.page.locator(this.DetailsPageElements.patientEmail).textContent();
        const age = await this.page.locator(this.DetailsPageElements.patientAge).textContent();
        const  gender = await this.page.locator(this.DetailsPageElements.patientGender).textContent();
        const phone = await this.page.locator(this.DetailsPageElements.patientPhone).textContent();
        const address = await this.page.locator(this.DetailsPageElements.patientAddress).textContent();
        const guardianName = await this.page.locator(this.DetailsPageElements.patientGuardianName).textContent();
        console.log(`Patient ID: ${ID?.trim()}`);
        console.log(`Patient Status: ${status?.trim()}`);
        console.log(`Patient Email: ${email?.trim()}`);
        console.log(`Patient Age: ${age?.trim()}`);
        console.log(`Patient Gender: ${gender?.trim()}`);
        console.log(`Patient Phone: ${phone?.trim()}`);
        console.log(`Patient Address: ${address?.trim()}`);
        console.log(`Patient Guardian Name: ${guardianName?.trim()}`);

    }

}