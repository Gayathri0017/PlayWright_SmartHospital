import {expect,Page,Locator } from "@playwright/test";
import { pageFixture } from './../hooks/pageFixtures';
import test from "node:test";
export default class TodoListPage{
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    private todoListPageElements={
        calander:"//ul[@class='nav navbar-nav headertopmenu']/child::li[4]/a",
        todoList:"//div[@class='media mt5']/div[@class='media-body']/p",
        saveBtn:"//input[@id='addtodo_formbtn']",
        taskName:"(//div[@class='form-group col-md-12']/child::input)[1]",
        date:"(//div[@class='form-group col-md-12']/child::input)[2]",
        addTask:"//div[@class='box-tools pull-right']/button",
        fieldError: "//div[contains(@class, 'toast-message')]/p",
    }
    async clickCalander(){
        await this.page.click(this.todoListPageElements.calander);
    }
    async ClickaddTask(){
        await this.page.click(this.todoListPageElements.addTask);
    } 
// async addTask(task: string, date: string) {
//     const taskInput=this.page.locator(this.todoListPageElements.taskName);
//     const dateInput=this.page.locator(this.todoListPageElements.date);
//     const saveBtn=this.page.locator(this.todoListPageElements.saveBtn);
//     await taskInput.fill(task);
//     await dateInput.click();
//     await dateInput.fill('');
//     await dateInput.press('Control+A');
//     await dateInput.press('Backspace');
//     await dateInput.type(date);
//     // await expect(dateInput).toHaveValue(date, { timeout: 3000 });
//     // await saveBtn.waitFor({ state: 'visible', timeout: 5000 });
//     await this.page.click(this.todoListPageElements.saveBtn);
// }
async addTask(task: string, date: string) {
    const taskInput=this.page.locator(this.todoListPageElements.taskName);
    const dateInput=this.page.locator(this.todoListPageElements.date);
    const saveBtn=this.page.locator(this.todoListPageElements.saveBtn);
    await taskInput.waitFor({ state: 'visible', timeout: 5000 });
    await taskInput.fill(task);
    await dateInput.waitFor({ state: 'visible', timeout: 5000 });
    await dateInput.click();
    await dateInput.fill('');
    await dateInput.press('Control+A');
    await dateInput.press('Backspace');
    await dateInput.type(date, { delay: 100 });
    await saveBtn.waitFor({ state: 'visible', timeout: 5000 });
    await saveBtn.click();
}
    async verifyTask(name: string) {
    const tasks=await pageFixture.page.locator(this.todoListPageElements.todoList);
    const count=await tasks.count();
    let found=false;
        for (let i=0;i<count;i++) {
            const taskText=await tasks.nth(i).textContent();
            console.log(taskText);
            expect(taskText).toBe(name);
            found=true;
            break;
        }
}
async verifyError(expected: string) {
    const toast = this.page.locator(this.todoListPageElements.fieldError);
    await expect(toast).toBeVisible({ timeout: 5000 }); // waits until visible
    const actual = await toast.textContent();
    expect(actual?.trim()).toBe(expected);
}
}
