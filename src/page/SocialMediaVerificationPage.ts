import { Page, Locator } from '@playwright/test';

export class SocialMediaPage {
  readonly page: Page;
  readonly socialMediaLinks: Locator;
  readonly facebook: Locator;
  readonly twitter: Locator;
  readonly youtube: Locator;
  readonly gmail: Locator;
  readonly linkedin: Locator;
  readonly instagram: Locator;
  readonly pinterest: Locator;

  constructor(page: Page) {
    this.page = page;
    this.socialMediaLinks = page.locator('(//*[@class="social"])[1]//li');
    this.facebook = page.locator('(//*[@class="social"])[1]//li[1]');
    this.twitter = page.locator('(//*[@class="social"])[1]//li[2]');
    this.youtube = page.locator('(//*[@class="social"])[1]//li[3]');
    this.gmail = page.locator('(//*[@class="social"])[1]//li[4]');
    this.linkedin = page.locator('(//*[@class="social"])[1]//li[5]');
    this.instagram = page.locator('(//*[@class="social"])[1]//li[6]');
    this.pinterest = page.locator('(//*[@class="social"])[1]//li[7]');
  }

  async openHomePage() {
    await this.page.goto('https://demo.smart-hospital.in/', { waitUntil: 'load' });
  }
}
