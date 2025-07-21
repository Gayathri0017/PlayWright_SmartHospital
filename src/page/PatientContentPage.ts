
import { expect, Page } from "@playwright/test";

export default class PatientContentPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private ContentPageElements = {
        downloadCenter : "//aside[@id='alert2']/div/section/ul/li[1]//following-sibling::li[10]/a/span",
    };

    async ClickDownloadCenter(){
        await this.page.locator(this.ContentPageElements.downloadCenter).click();
    }

async contentList(content: string) {
  const rows = await this.page.$$("//div[@id='DataTables_Table_0_wrapper']/table/tbody/tr");

  for (let i = 0; i < rows.length; i++) {
    const firstCell = await rows[i].$eval("td:nth-child(1)", el => el.textContent?.trim() || "");
    // const firstCell = await this.page.locator("//div[@id='DataTables_Table_0_wrapper']/table/tbody/tr[" + i + "]/td").textContent();

    if (firstCell.includes(content)) {
      const cells = await rows[i].$$("td");

      for (let j = 0; j < cells.length; j++) {
        const cellText = (await cells[j].innerText()).trim();

        switch (j) {
          case 0:
            // console.log("Title       :", cellText);
            
            process.stdout.write("Title       :"+ `${cellText?.trim()}\n`);
            break;
          case 1:
            // console.log("Share Date  :", cellText);
            process.stdout.write("Share Date  :"+ `${cellText?.trim()}\n`);
            break;
          case 2:
            // console.log("Valid upto  :", cellText);
            process.stdout.write("Valid upto  :"+ `${cellText?.trim()}\n`);
            break;
          case 3:
            // console.log("Shared By   :", cellText);
            process.stdout.write("Shared By   :"+ `${cellText?.trim()}\n`);
            break;
          default:
            console.log("Try again");
        }
      }
    }
  }
}


}