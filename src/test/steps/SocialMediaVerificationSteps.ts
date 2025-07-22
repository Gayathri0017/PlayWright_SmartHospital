import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';
import { SocialMediaPage } from '../../page/SocialMediaVerificationPage';

let socialMediaPage: SocialMediaPage;

Given('the user is on the application homepage', async function () {
  socialMediaPage = new SocialMediaPage(pageFixture.page);
  await socialMediaPage.openHomePage();
});

When('the user checks all social media icons in the header', async function () {
  const count = await socialMediaPage.socialMediaLinks.count();
  this.socialMediaCount = count;
});

Then('the user should see {int} social media links available', async function (expectedCount: number) {
  expect(this.socialMediaCount).toBe(expectedCount);
});

When('the user clicks on the {string} link', async function (linkName: string) {
  const linkMap: { [key: string]: import('@playwright/test').Locator } = {
    'Facebook': socialMediaPage.facebook,
    'Twitter': socialMediaPage.twitter,
    'YouTube': socialMediaPage.youtube,
    'Gmail': socialMediaPage.gmail,
    'LinkedIn': socialMediaPage.linkedin,
    'Instagram': socialMediaPage.instagram,
    'Pinterest': socialMediaPage.pinterest,
  };

  const link = linkMap[linkName as keyof typeof linkMap];
  if (!link) throw new Error(`Unknown link: ${linkName}`);
  const [newPage] = await Promise.all([
    pageFixture.page.context().waitForEvent('page'),
    link.click(),
  ]);
  this.newPage = newPage;
  await newPage.waitForLoadState('domcontentloaded');
});

Then('the user should see the correct {string} page title', async function (expected: string) {
  const title = await this.newPage.title();
  console.log(`Opened Page Title: ${title}`);
  expect(title.toLowerCase()).toContain(expected.toLowerCase());
  await this.newPage.close();
});

Then('the user should be navigated to the correct {string} URL', async function (expectedUrl: string) {
    const context = pageFixture.page.context();
    const pages = context.pages();

    const newPage = pages.length > 1 ? pages[pages.length - 1] : pages[0];
    await newPage.waitForLoadState();

    const actualUrl = newPage.url();
    console.log(`Expected URL: ${expectedUrl} | Actual URL: ${actualUrl}`);

    expect(actualUrl).toContain(expectedUrl);

    if (pages.length > 1) await newPage.close();
});
