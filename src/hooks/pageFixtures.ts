import { Page, APIRequestContext } from "@playwright/test";
import LoginPage from "../page/loginPage";
import { Logger } from "winston";
export const pageFixture={
    // @ts-ignore
    page:undefined as Page,
    testData: null,
    request: undefined as unknown as APIRequestContext,
    logger:undefined as Logger  | undefined
}