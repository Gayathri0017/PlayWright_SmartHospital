import {expect,Page,Locator } from "@playwright/test";
import { strict } from "assert";
import { time } from "console";
export default class AppointmentPage{
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }
  private AppointmentPageElements = {
  appointment: "(//li[@class='treeview ']//child::span)[2]",
  addAppointment: "//a[@class='btn btn-primary btn-sm addappointment']",
  addPatient: "//div/child::a[@id='add']",
  pName: "//div[@class='form-group']/child::input[@id='name']",
  year: "//input[@id='age_month']/preceding-sibling::input",
  month: "//input[@id='age_day']/preceding-sibling::input[1]",
  day: "//input[@id='age_month']/following::input",
  gender: "//div[@class='form-group']/child::select[@id='addformgender']",
  bloodGroup: "//div[@class='form-group']/child::select[@name='blood_group']",
  uploadPhoto: "//input[@id='age_day']/following::input[1]",
  savePatientBtn: "//div[@class='pull-right']/child::button[@id='formaddpabtn']",
  nameAfterAdd: "//span[@class='select2-selection select2-selection--single']/child::span",
  document: "#select2-doctorid-container",
  shift: "(//span[@class='select2-selection select2-selection--single'])[3]",
  shiftIp:"//span[@id='select2-global_shift-container']",
  status: "#appointment_status",
  discount: "#discount_percentage",
  date: "//input[@name='date']",
  slot: "(//div[@class=\"col-md-3\"]/child::div)[1]/select",
  saveAppointmentBtn: "//button[@id='formaddbtn']",
  doc: "(//div[@class='col-sm-3']/child::div)[1]/div/select",
  priority: "(//span[@class='selection']/child::span)[4]",
  ip: "//input[@class='select2-search__field']",
  patient: "(//tr[@class='odd'])[1]//a",
  reqError: "//div[@class='toast-message']/p",
  successMsg: "//div[@class='toast-message']/p",
  languageDropdown: "//div[@class='btn-group bootstrap-select language']",
};
async clickAppointment(){
    await this.page.click(this.AppointmentPageElements.appointment);
}
async clickAddAppointment(){
    await this.page.click(this.AppointmentPageElements.addAppointment);
}
async clickAddNewPatient(){
    await this.page.click(this.AppointmentPageElements.addPatient);
}
async addPatient(name:string,year:string,mnt:string,date:string){
    await this.page.fill(this.AppointmentPageElements.pName,name);
    await this.page.fill(this.AppointmentPageElements.year,year);
    await this.page.fill(this.AppointmentPageElements.month,mnt);
    await this.page.fill(this.AppointmentPageElements.day,date);
    await this.page.waitForTimeout(3000);
}
async savePatient(){
    await this.page.click(this.AppointmentPageElements.savePatientBtn);
    await this.page.waitForTimeout(3000);
}
async assertPatient(name:string){
    const actual=await this.page.textContent(this.AppointmentPageElements.nameAfterAdd);
    await expect(actual).toContain(name);
}
async appointment(doctor: string, slot: string, shift: string, date: string, sts: string, discount: string) {
  await this.page.click("//span[@id='select2-doctorid-container']");
  await this.page.waitForSelector("//ul[@id='select2-doctorid-results']//li");
  await this.page.click(`//ul[@id='select2-doctorid-results']//li[contains(text(), "${doctor}")]`);
  await this.page.click(this.AppointmentPageElements.date);
  await this.page.click("//td[@data-action='selectDay' and text()='20']");
  await this.page.waitForSelector(`//td[@data-action='selectDay' and text()='20']`);
  await this.page.click(`//td[@data-action='selectDay' and text()='20']`);
  await this.page.waitForTimeout(1000);
  await this.page.click(this.AppointmentPageElements.shift);
  await this.page.waitForSelector("//ul/li[text()='" + shift + "']");
  await this.page.click("//ul/li[text()='" + shift + "']");
  await this.page.waitForTimeout(3000);
  await this.page.click(this.AppointmentPageElements.slot);
  await this.page.selectOption(this.AppointmentPageElements.slot, { index: 1 });
  await this.page.fill(this.AppointmentPageElements.discount, discount);
  await this.page.selectOption(this.AppointmentPageElements.status, { label: sts });
  await this.page.waitForTimeout(2000);
}
async saveAppointment(){
    await this.page.click(this.AppointmentPageElements.saveAppointmentBtn);
}
async verifyRequired(expected:string){
    let actual=await this.page.textContent(this.AppointmentPageElements.reqError);
    await expect(expected).toEqual(actual);
}
async verifyAppointmentSuccess() {
  const toast=await this.page.locator('div.toast-message');
  await expect(toast).toBeVisible();
  await expect(toast).toHaveText('Record Saved Successfully');
}
}