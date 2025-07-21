import { Page } from "playwright/test";

export default class staffDirectoryPage{
    private page : Page ;

    constructor(page :Page ){
        this.page = page ;
    }

    private StaffDirectoryElements = {
        hr : "//section[@id='sibe-box']/ul[2]/li[11]/a",
        listView : "//section[@class='content']/div/div/div/div[3]/div[2]/ul/li[1]/following-sibling::li/a",
        name : "//div[@class='tab-content']/div[3]/preceding-sibling::div[1]/div/table/tbody/tr/td[2]",
        role : "//div[@class='tab-content']/div[3]/preceding-sibling::div[1]/div/table/tbody/tr/td[3]"
    }

    async ClickHR(){
        await this.page.locator(this.StaffDirectoryElements.hr).click();
    }

    async ClickListView(){
        await this.page.locator(this.StaffDirectoryElements.listView).click();
    }

    async getNameAndRole(){
        const names = await this.page.$$('//div[@class=\'tab-content\']/div[3]/preceding-sibling::div[1]/div/table/tbody/tr/td[2]');  // selects all elements in an arra y
        const roles = await this.page.$$('//div[@class=\'tab-content\']/div[3]/preceding-sibling::div[1]/div/table/tbody/tr/td[3]');  

        for (let i = 0; i < names.length; i++) {
            const nameText = (await names[i].innerText()).trim();
            const roleText = (await roles[i].innerText()).trim();
            console.log(`Name : ${nameText}, Role : ${roleText}`);
        }

    }
}