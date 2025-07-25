import { Page, APIRequestContext } from '@playwright/test';
export class DoctorPage {
  private page: Page;
  private request:APIRequestContext;
  constructor(page:Page,request: APIRequestContext) {
    this.page=page;
    this.request=request;
  }
async validateLinks(): Promise<{ valid: string[]; broken: string[] }> {
  const validLinks: string[]=[];
  const brokenLinks: string[]=[];
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForSelector('a[href]', { timeout: 5000 });
  const links=await this.page.$$eval('a[href]', anchors =>
    anchors.map(anchor => (anchor as HTMLAnchorElement).href)
  );
  for (const link of links) {
    if (link.startsWith('javascript')||link.startsWith('mailto:')||link.startsWith('tel:')||!link.startsWith('http'))
    {
      continue;
    }
    try{
      const absoluteLink=new URL(link, this.page.url()).href;
      const response=await this.request.get(absoluteLink);
      if(response.ok()) {
        validLinks.push(absoluteLink);
      }else {
        brokenLinks.push(absoluteLink);
      }
    }
    catch (error) {
      brokenLinks.push(link);
    }
  }
  return { valid: validLinks, broken: brokenLinks };
}

}
