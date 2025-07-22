import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect, Locator } from '@playwright/test';
import { pageFixture } from '../../hooks/pageFixtures';
import { SocialMediaVerificationPage } from '../../page/SocialMediaVerificationPage';

setDefaultTimeout(60 * 1000);

let socialPage: SocialMediaVerificationPage;
let mainPage = pageFixture.page;

Given('the user is on the application homepage', async function () {
    await mainPage.goto('https://demo.smart-hospital.in/');
    await mainPage.setViewportSize({ width: 1280, height: 720 });
    socialPage = new SocialMediaVerificationPage(mainPage);
});

When('the user checks all social media icons in the header', async function () {
    // Action done in Then Step — Keeping placeholder for BDD structure
});

Then('the user should see {int} social media links available', async function (expectedCount: number) {
    const actualCount = await socialPage.getSocialMediaLinksCount();
    expect(actualCount).toBe(expectedCount);
});

When('the user click on the {string} link', async function (linkName: string) {
    type LinkName = 'facebook' | 'twitter' | 'youtube' | 'gmail' | 'linkedin' | 'instagram' | 'pinterest' | 'front page';
    const linkMap: Record<LinkName, Locator> = {
        'facebook': socialPage.facebookLink,
        'twitter': socialPage.twitterLink,
        'youtube': socialPage.youtubeLink,
        'gmail': socialPage.gmailLink,
        'linkedin': socialPage.linkedinLink,
        'instagram': socialPage.instagramLink,
        'pinterest': socialPage.pinterestLink,
        'front page': socialPage.frontPageLink
    };

    const lowerLinkName = linkName.toLowerCase() as LinkName;
    const link = linkMap[lowerLinkName];
    if (!link) throw new Error(`Unknown link: ${linkName}`);

    const [newPage] = await Promise.all([
        mainPage.context().waitForEvent('page'),
        link.click()
    ]);

    this.newTab = newPage;
    await newPage.waitForLoadState('domcontentloaded');
});

Then('the user should see the correct {string} page title', async function (platform: string) {
    const newPage = this.newTab;
    const title = await newPage.title();
    const url = newPage.url();

    console.log(`URL: ${url}`);
    console.log(`Title: ${title}`);

    switch (platform.toLowerCase()) {
        case 'facebook':
            expect(title.toLowerCase()).toContain('facebook');
            break;
        case 'twitter':
            expect(
                title.toLowerCase() === 'x' ||
                url.includes('twitter.com') ||
                url.includes('x.com')
            ).toBeTruthy();
            break;
        case 'youtube':
            expect(title.toLowerCase()).toContain('youtube');
            break;
        case 'gmail':
            expect(
                url.includes('googleblog.com') ||
                url.includes('mail.google.com') ||
                url.includes('accounts.google.com')
            ).toBeTruthy();
            break;
        case 'linkedin':
            expect(title.toLowerCase()).toContain('linkedin');
            break;
        case 'instagram':
            expect(title.toLowerCase()).toContain('instagram');
            break;
        case 'pinterest':
            expect(title.toLowerCase()).toContain('pinterest');
            break;
        case 'front page':
            expect(title.toLowerCase()).toContain('smart hospital');
            break;
        default:
            throw new Error(`Unknown platform: ${platform}`);
    }

    await newPage.close();
});
