import { Page } from "playwright";


export default class PatientAppointmentPage{
    private page : Page ;

    constructor(page : Page){
        this.page = page ;
    }

    private PatientAppointmentElements = {
        myAppointment : "//aside[@id='alert2']/div/section/ul/li[1]//following-sibling::li[1]/a/span",
        addAppointment : "//section[@class='content']/div/div[2]/div/div/div/a",
        dateField : "((//div[@class='form-group'])[1]/input)[1]",
        specialist : "(//div[@class='form-group'])[2]/div/select",
        doctor : "(//div[@class='row'])[3]/div[3]/div/div/select",
        shift : "(//div[@class='row'])[3]/div[4]/div/select",
        slot : "(//div[@class='row'])[3]/div[5]/div/select",
        message : "(//div[@class='row'])[3]/div[7]/div/textarea",
        availableSlot : "//div[@id='slot']/span[2]",
        filedReq : "//div[@id='toast-container']/div/div/p[1]",
        success : "//div[@id='toast-container']/div/div",
        saveBtn : "//button[@id='formaddbtn']"
    }

    async ClickAddAppointment(){
        await this.page.locator(this.PatientAppointmentElements.addAppointment).click();
    }

    async Appointmentdetails(date : string,specialist : string,doctor : string,shift : string,slot : string,message : string){
        await this.setDate(date);
        await this.setSpecialist(specialist);
        await this.setDoctor(doctor);
        await this.setShift(shift);
        await this.setTime(slot);
        await this.setMessage(message);
    }

    async setDate(date: string | null) {
    await this.page.waitForTimeout(1000);
    const dateField = this.page.locator(this.PatientAppointmentElements.dateField);
    await dateField.waitFor({ state: "visible" });

    if (date && date.trim() !== null) {
        await dateField.click();
        await dateField.fill(date);
        await dateField.press('Enter');
        console.log(`Date field provided: ${date}`);
    } else {
        // await dateField.fill("");
    }
}

async setSpecialist(specialist: string) {
    await this.page.waitForTimeout(1000);
    const specialistDropdown = this.page.locator(this.PatientAppointmentElements.specialist);
    await specialistDropdown.scrollIntoViewIfNeeded();
    await specialistDropdown.waitFor({ state: "visible" });

    if (specialist && specialist.trim() !== "") {
        await specialistDropdown.selectOption({ label: specialist });
        console.log(`Specialist field provided: ${specialist}`);
    } else {
        console.log("Specialist field is empty or null");
    }
}

async setDoctor(doctor: string) {
    await this.page.waitForTimeout(1000);
    const doctorDropdown = this.page.locator(this.PatientAppointmentElements.doctor);
    await doctorDropdown.waitFor({ state: "visible" });
    await doctorDropdown.click();
    await doctorDropdown.selectOption({ label: doctor });
    console.log(`Doctor field provided: ${doctor}`);
}

async setShift(shift: string) {
    await this.page.waitForTimeout(1000);
    const shiftDropdown = this.page.locator(this.PatientAppointmentElements.shift);
    await shiftDropdown.waitFor({ state: "attached" });
    await shiftDropdown.selectOption({ label: shift });
    console.log(`Timing shift field provided: ${shift}`);
}

async setTime(slot: string) {
    await this.page.waitForTimeout(1000);
    const slotDropdown = this.page.locator(this.PatientAppointmentElements.slot);
    await slotDropdown.waitFor({ state: "visible" });
    await slotDropdown.click();
    await slotDropdown.selectOption({ label: slot });
    console.log(`Slot provided: ${slot}`);
}

async setAvailableTime() {
    await this.page.waitForTimeout(1000);
    const availableSlot = this.page.locator(this.PatientAppointmentElements.availableSlot);
    await availableSlot.scrollIntoViewIfNeeded();
    await availableSlot.waitFor({ state: "visible" });
    await availableSlot.click();
    console.log("Available time provided");
}

async alert() {
    try {
        const dialogPromise = this.page.waitForEvent('dialog', { timeout: 5000 });
        const dialog = await dialogPromise;
        await dialog.accept();
        console.log("Alert was present and accepted.");
    } catch {
        console.log("No alert present.");
    }
}

async setMessage(message: string) {
    await this.page.waitForTimeout(1000);
    const messageField = this.page.locator(this.PatientAppointmentElements.message);
    await messageField.scrollIntoViewIfNeeded();
    await messageField.waitFor({ state: "attached" });
    await messageField.click();

    if (message && message.trim() !== "") {
        await messageField.fill(message);
        console.log(`Message provided: ${message}`);
    } else {
        console.log("Message field is empty or null");
    }
}

async getError(): Promise<string> {
    await this.page.waitForTimeout(1000);
    const errorMsg = this.page.locator(this.PatientAppointmentElements.filedReq);
    await errorMsg.waitFor({ state: "visible" });
    return await errorMsg.innerText();
}

async getSuccessMsg(): Promise<string> {
    await this.page.waitForTimeout(1000);
    return await this.page.locator(this.PatientAppointmentElements.success).innerText();
}

async ClicksaveBtn(){
    await this.page.waitForTimeout(1000);
    await this.page.locator(this.PatientAppointmentElements.saveBtn).click();
}

}