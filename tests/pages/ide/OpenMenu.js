import { BasePage } from '../BasePage';

export class OpenMenu extends BasePage {
  constructor(page) {
    super(page);
  }

  async accessview() {
    await this.iframe.locator('[ui-id="_02UIItemId"]').click();
    await this.page.waitForTimeout(1000);
    await this.iframe.locator("//div[@style and contains(text(),'Formulários')]").click();
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(1000);
    await this.iframe.locator("//div[contains (@style, '/icons/subfolder_web.svg')]").first().click();
    await this.page.keyboard.press('Enter');
    await this.iframe.locator("//div[contains (@style, '/workspace/tree/view_logged.svg')]").click();
    await this.page.keyboard.press('Enter');
    await this.iframe.locator("//div[@style and contains(text(),'home')]").click();
    await this.page.keyboard.press('Enter');
  }

  async accessdiagrama() {
    await this.iframe.locator('[ui-id="_00DIAGRAMSItemId"]').click();
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(3000);
    await this.iframe.locator("//div[contains (@style, '/filesicon/umlcd.svg')]").first().click();
    await this.page.keyboard.press('Enter');
  }

  async creatediagrama() {
    await this.iframe.locator('[ui-id="_00DIAGRAMSItemId"]').click();
    await this.page.waitForTimeout(2000);
    await this.iframe.locator('[ui-class="selected-item-lowcode"]').hover();
    await this.page.waitForTimeout(1000);
    await this.iframe.locator('a[href^="javascript:cronos.ide.newResource"]').click();
    await this.page.waitForTimeout(2000);
    await this.iframe.locator('[ui-id="dialog-input-text-parent"]').click();
    await this.iframe.locator('[ui-id="dialog-input-text-parent"]').fill('qateste');
    await this.iframe.locator('[ui-id="dialog-ok-input"]').click();
    await this.page.waitForTimeout(4000);
  }

  async createdatasource() {
    await this.iframe.locator('[ui-id="_01DATASOURCESItemId"]').click();
    await this.page.waitForTimeout(2000);
    await this.iframe.locator('[ui-class="selected-item-lowcode"]').hover();
    await this.page.waitForTimeout(1000);
    await this.iframe.locator('a[href^="javascript:cronos.ide.newResource"]').click();

    await this.page.waitForTimeout(3000);
    await this.iframe.locator('[tabindex="34"] > *:nth-child(1)').click();
    await this.iframe.locator('[tabindex="34"] > *:nth-child(1)').fill('qanewfonte');

    await this.iframe.locator('[tabindex="39"] > *:nth-child(1)').click();
    await this.iframe.locator('[tabindex="39"] > *:nth-child(1)').fill('qanewfonte');

    await this.iframe.locator('[tabindex="44"]').nth(0).click();
    await this.iframe.getByText('app.entity.Application (Application)').click();
    await this.page.waitForTimeout(2000);
    await this.iframe.locator('[tabindex="9"]').click();

    await this.page.waitForTimeout(5000);
    await this.iframe.locator("//div[contains (@style, '/icons/global/save.svg')]").click();
    await this.page.waitForTimeout(6000);
  }
}
