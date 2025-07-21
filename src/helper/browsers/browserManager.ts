import { LaunchOptions,chromium,firefox,webkit } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: "src/helper/env/.env.prod" });
const headlessMode = String(process.env.HEAD) !== "true";

const options: LaunchOptions = {
    headless: headlessMode,
}
export const invokeBrowser=()=>{
    const browserType=process.env.npm_config_BROWSER || "chrome";
    switch(browserType){
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Please set the proper browser!");
    }
}