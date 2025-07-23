import { Page } from "@playwright/test";
import LoginPage from "../page/loginPage";
import { Logger } from "winston";
export const pageFixture={
    // @ts-ignore
    page:undefined as Page,
    testData: null,
    logger:undefined as Logger  | undefined
}