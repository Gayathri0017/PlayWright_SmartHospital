import { Page, Locator } from "@playwright/test";

export default class PatientDischargePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private PatientDischargeElements = {
    ipd: "//div[@class='slimScrollDiv']/section/ul[2]/li[1]//following-sibling::li[4]/a",
    firstPatient: "//table[@id='DataTables_Table_0']/tbody/tr[1]/td/a",
    dischargePatientName: "//div[@id='overview']/div/div[1]/div[1]/h3",
    dischargeIcon: "//div[@id='overview']/div/div[1]/div[1]/div/div/a[3]/i",
    dischargeDateField: "//form[@id='patient_discharge']/div[2]/div[1]/div/input",
    dischargeDatetext: "(//div[@class='col-md-6'])[1]/div/label",
    dischargeStatus: "//form[@id=\"patient_discharge\"]/div[2]/div[2]/div/select",
    dischargeSaveBtn: "(//button[@id='add_paymentbtn'])[1]",
    error: "//div[@id=\"toast-container\"]/div/div/p",
    searchField: "//div[@id='DataTables_Table_0_filter']/label/input",
    noDataAavail: "//tr[@class='odd']/td/div"
  };

  async ClickIPD() {
    await this.page.locator(this.PatientDischargeElements.ipd).click();
    console.log("IPD button clicked");
  }

  async ClickFirstPatient() {
    await this.page.locator(this.PatientDischargeElements.firstPatient).click();
    console.log("First patient record clicked");
  }

  async SetCaseID(id: string) {
    await this.page.locator(this.PatientDischargeElements.searchField).fill(id);
    await this.page.waitForTimeout(1000); // wait for table to update

    const caseIdElements = this.page.locator("//table[@id='DataTables_Table_0']/tbody/tr/td[2]");
    const count = await caseIdElements.count();

    for (let i = 0; i < count; i++) {
      const text = await caseIdElements.nth(i).textContent();
      if (text?.includes(id)) {
        await this.page.locator(`//table[@id='DataTables_Table_0']/tbody/tr[${i + 1}]/td[1]`).click();
        console.log(`Case ID matched and clicked: ${id}`);
        break;
      }
    }
  }

  async GetPatientID(): Promise<string> {
    const text = await this.page.locator(this.PatientDischargeElements.dischargePatientName).textContent();
    console.log(`Retrieved patient ID: ${text}`);
    return text?.trim() || '';
  }

  async ClickDischargeBtn() {
    await this.page.locator(this.PatientDischargeElements.dischargeIcon).click();
    console.log("Discharge icon clicked");
  }

  async SetDischargeDate() {
    await this.page.locator(this.PatientDischargeElements.dischargeDateField).click();
    console.log("Discharge date field clicked");
  }

  async SetDischargeStatus(status: string) {
    await this.page.locator(this.PatientDischargeElements.dischargeStatus).selectOption({ label: status });
    console.log(`Discharge status set to: ${status}`);
  }

  async ClickDischargeSaveBtn() {
    await this.page.locator(this.PatientDischargeElements.dischargeSaveBtn).click();
    console.log("Discharge save button clicked");
  }

  async GetError(): Promise<string> {
    return await this.page.locator(this.PatientDischargeElements.error).textContent() || '';
  }

  async GetNoDataAvailable(): Promise<string> {
    return await this.page.locator(this.PatientDischargeElements.noDataAavail).textContent() || '';
  }

  async IsNoDataAvailableDisplayed(): Promise<boolean> {
    return await this.page.locator(this.PatientDischargeElements.noDataAavail).isVisible();
  }

  async searchPatient(id : string){
    await this.page.locator(this.PatientDischargeElements.searchField).fill(id);
    await this.page.waitForTimeout(3000);
  }
}
