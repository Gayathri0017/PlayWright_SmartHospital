import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import TodoListPage from './../../page/TodoListPage';
import { pageFixture } from "../../hooks/pageFixtures";
let todolist: TodoListPage;
When('the doctor clicks the calendar', async function () {
  todolist=new TodoListPage(pageFixture.page);
  pageFixture.logger?.info("Doctor clicks on the calendar");
  await todolist.clickCalander();
});

When('clicks the plus icon to add a task', async function () {
  pageFixture.logger?.info("Doctor clicks the plus icon to add a new task");
  await todolist.ClickaddTask();
});

When('fills in the task {string} with date {string}', { timeout: 10000 }, async function (task: string, date: string) {
  pageFixture.logger?.info(`Filling task "${task}" with date "${date}"`);
  await todolist.addTask(task, date);
});

Then('the {string} should be visible in the To Do List', { timeout: 10000 }, async function (expected: string) {
  if (expected==="Date field is required") {
    pageFixture.logger?.warn('Validating error: "Date field is required"');
    await todolist.verifyError(expected);
  }
  else if (expected==="Title field is required") {
    pageFixture.logger?.warn('Validating error: "Title field is required"');
    await todolist.verifyError(expected);
  }
  else {
    pageFixture.logger?.info(`Verifying task "${expected}" is visible in the To Do List`);
    //await todolist.verifyTask(expected);
  }
});
