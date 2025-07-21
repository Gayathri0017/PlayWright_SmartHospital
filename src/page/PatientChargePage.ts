
import { expect, Page } from "@playwright/test";

export default class PatientChargePage {
    private page: Page;
    private sum: number = 0;

    constructor(page: Page) {
        this.page = page;
    }

    private ChargePageElements = {
        chargeBtn:"(//ul[@class='nav nav-tabs navheader navlistscroll']//li//following-sibling::li[7]/a)[1]",
        total_amount:"//table[@id='DataTables_Table_4']/tbody[2]/tr/td",
        ipd : "//aside[@id='alert2']/div/section/ul/li[1]//following-sibling::li[3]/a/span",
    };

    async ClickChargeBtn(){
        await this.page.locator(this.ChargePageElements.chargeBtn).click();
    }

async getPatientChargeDetails() {
    await this.page.setDefaultTimeout(5000);
    const headers = await this.page.$$('//table[@id="DataTables_Table_4"]/thead/tr/th');
    let amountColIndex = -1;

    for (let i = 0; i < headers.length; i++) {
        const text = (await headers[i].innerText()).trim();
        if (text === "Amount") {
            amountColIndex = i + 1;
            break;
        }
    }

    if (amountColIndex === -1) {
        console.log("Amount column not found.");
        return;
    }

    this.sum = 0;

    for (let i = 1; i <= 7; i++) {
        const cells = await this.page.$$(`//table[@id="DataTables_Table_4"]/tbody[1]/tr[${i}]/td`);

        for (let j = 0; j < cells.length; j++) {
            const headerText = (await headers[j].innerText()).trim();
            const cellText = (await cells[j].innerText()).trim();

            if (j + 1 === amountColIndex) {
                const cleanedValue = cellText.replace(/,/g, "").trim();
                const numericValue = parseFloat(cleanedValue);
                this.sum += numericValue;

            }

            console.log(`${headerText} : ${cellText}`);
        }

        console.log(`Sum : ${this.sum}`);
        console.log("-----------------------------");
    }
}

async getActualAmount() {
    return this.sum;
}

async getTotal() {
    const totalText = await this.page.locator('//input[@id="charge_total"]').textContent();
    if (totalText) {
        return totalText.replace("Total: $", "").trim();
    } else {
        return "";
    }
}

async ClickIPD(){
        await this.page.locator(this.ChargePageElements.ipd).click();
    }

}