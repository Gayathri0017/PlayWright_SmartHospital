import { expect, Page } from "@playwright/test";
export default class PrescriptionPage {
  private page: Page;
  constructor(page: Page) {
    this.page=page;
  }
  private PrescriptionElements = {
  opdMenu: '//ul[@class="sidebar-menu verttop"]/li[4]',
  addPrescriptionBtn: '//div[@class="white-space-nowrap"]/a[2]',
  categoryDropdown: "//label[contains(text(),'Medicine Category')]/following::span[contains(@class,'select2-selection')][1]",
  medicineDropdown: "//label[contains(text(),'Medicine Category')]/following::span[contains(@class,'select2-selection')][4]",
  doseDropdown: "(//label[contains(text(),'Dose')]/following::span[contains(@class,'select2-selection')][1])[1]",
  intervalDropdown: "//label[contains(text(),'Dose Interval')]/following::span[contains(@class,'select2-selection')][1]",
  durationDropdown: "//label[contains(text(),'Dose Duration')]/following::span[contains(@class,'select2-selection')][1]",
  saveBtn: '(//button[@class="btn btn-info"])[2]',
  toastMsg: '//div[@class="toast-message"]/p',
};
  async clickOPDMenu() {
    await this.page.click(this.PrescriptionElements.opdMenu);
  }
  async clickAddPrescription() {
    await this.page.click(this.PrescriptionElements.addPrescriptionBtn);
  }
async selectDropdown(dropdownLocator: string, optionText: string) {
  const dropdown = this.page.locator(dropdownLocator);
  await dropdown.scrollIntoViewIfNeeded();
  await dropdown.click();
  const optionLocator = this.page.locator(`.select2-results__option`,{
    hasText: optionText
  });
  await optionLocator.scrollIntoViewIfNeeded(); // Just in case
  await optionLocator.click();
}
  async fillPrescriptionForm(data: {
    Category: string;
    Medicine: string;
    Dose: string;
    Interval: string;
    Duration: string;
  }) {
    await this.selectDropdown(this.PrescriptionElements.categoryDropdown, data.Category);
    await this.selectDropdown(this.PrescriptionElements.medicineDropdown, data.Medicine);
    await this.selectDropdown(this.PrescriptionElements.doseDropdown, data.Dose);
    await this.selectDropdown(this.PrescriptionElements.intervalDropdown, data.Interval);
    await this.selectDropdown(this.PrescriptionElements.durationDropdown, data.Duration);
  }
  async clickSaveButton() {
    await this.page.click(this.PrescriptionElements.saveBtn);
  }
  async verifyToastMessage(expected: string) {
    const actual=await this.page.textContent(this.PrescriptionElements.toastMsg);
    await expect(actual).toContain(expected);
  }
}
