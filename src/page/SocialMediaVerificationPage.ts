import { Page, Locator } from '@playwright/test';

export class SocialMediaVerificationPage {
    readonly page: Page;
    readonly facebookLink: Locator;
    readonly twitterLink: Locator;
    readonly youtubeLink: Locator;
    readonly gmailLink: Locator;
    readonly linkedinLink: Locator;
    readonly instagramLink: Locator;
    readonly pinterestLink: Locator;
    readonly frontPageLink: Locator;
    readonly socialMediaLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.facebookLink = page.locator('(//ul[@class="social"])[1]//li[1]');
        this.twitterLink = page.locator('//a[contains(@href, "twitter.com")]');
        this.youtubeLink = page.locator('//a[contains(@href, "youtube.com")]');
        this.gmailLink = page.locator('(//*[@href="https://plus.google.com/people"])[1]');
        this.linkedinLink = page.locator('//a[contains(@href, "linkedin.com")]');
        this.instagramLink = page.locator('//a[contains(@href, "instagram.com")]');
        this.pinterestLink = page.locator('//a[contains(@href, "pinterest.com")]');
        this.frontPageLink = page.locator('//*[@href="https://demo.smart-hospital.in"]');
        this.socialMediaLinks = page.locator('(//*[@class="social"])[1]//li');
    }

    async getSocialMediaLinksCount(): Promise<number> {
        return await this.socialMediaLinks.count();
    }
}
