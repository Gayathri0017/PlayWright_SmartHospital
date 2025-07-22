import { Page, APIRequestContext } from '@playwright/test';
export class DoctorPage{
  constructor(private page: Page, private request: APIRequestContext) {}
  async getAllLinks(): Promise<string[]> {
    const links=await this.page.$$eval('a',anchors =>
      anchors.map(a => a.getAttribute('href')));
    return links as string[];
  }

  async checkStatus(link: string): Promise<number> {
    try {
      const response = await this.request.head(link);
      return response.status();
    }catch (error) {
      return 0;
    }
  }

  async validateLinks(): Promise<{ valid: string[]; broken: string[]}> {
    const links=await this.getAllLinks();
    const valid: string[]=[];
    const broken: string[]=[];
    for (const link of links) {
      if (link.startsWith('javascript') || link.startsWith('mailto') || link.trim() === ''){
        continue;
      }
      
      const fullLink=link.startsWith('http') ? link : new URL(link, this.page.url()).href;
      const status=await this.checkStatus(fullLink);
      if (status >= 200 && status < 400) {
        valid.push(fullLink);
      } else {
        broken.push(fullLink);
      }
    }
    return { valid, broken };
  }
}
