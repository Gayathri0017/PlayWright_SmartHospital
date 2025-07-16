import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import TodoListPage from './../../page/TodoListPage';
import { pageFixture } from "../../hooks/pageFixtures";
import { todo } from "node:test";
import { TIMEOUT } from "dns";
let t:string;
    let todolist:TodoListPage;
    When('the doctor clicks the calendar', async function () {
            todolist=new TodoListPage(pageFixture.page);
            await todolist.clickCalander();
        });
    When('clicks the plus icon to add a task', async function () {
            await todolist.ClickaddTask();
         });
   When('fills in the task {string} with date {string}',{ timeout: 10000 },async function (task: string, date: string) {
        await todolist.addTask(task, date);
    }
    );
    Then('the {string} should be visible in the To Do List', async function (expected: string) {
        if(expected=="Date field is required"){
            await todolist.verifyError(expected);
        }
        else if(expected=="Title field is required"){
            await todolist.verifyError(expected);
        }
        else{
            await pageFixture.page.waitForTimeout(3000);
            await todolist.verifyTask(expected);
        }
        });

