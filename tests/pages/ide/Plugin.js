import { BasePage } from '../BasePage';

export class PLugin extends BasePage {
  constructor(page) {
    super(page);
  }

  async installPlugin(name) {
    await this.iframe.locator('[ui-id="header-hambuguer"]').click();
    await this.iframe.locator('//*[text()="Plugin"]').click();
    await this.iframe.locator("//div[contains (@style, '/gluonsoft_add.svg')]").click();

    await this.iframe.locator('//*[@tabindex="18"]/*[4]').fill(name);
    await this.iframe.locator('//*[@tabindex="18"]/*[1]').click();
    await this.iframe.locator(`//b[text()="${name}"]`).waitFor({ timeout: 4000 });
    await this.iframe.locator(`//b[text()="${name}"]`).click();
    await this.page.waitForTimeout(500);
    await this.iframe.locator('//*[text()="Avançar >"]').click();
    await this.page.waitForTimeout(500);
    await this.iframe.locator('//*[text()="Finalizar"]').click();

    await this.iframe.locator('[ui-id="idClose"]').waitFor({ state: 'detached', timeout: 240000 });
  }

  async accessPackageJson() {
    let iconVisible = await this.iframe.locator("//div[contains (@style, '/category-sources.svg')]").isVisible();
    if (!iconVisible) {
      await this.iframe.locator('[ui-id="header-hambuguer"]').click();
      await this.iframe.locator('//*[@id="cronapp-switch-mode"]/following-sibling::*').click();
      await this.page.waitForTimeout(3000);
    }
    await this.iframe.locator('[ui-id="_02UI__02VIEWS__MOBILEItemId"]').click();

    await this.iframe.locator("(//div[contains(@style, '/web_folder.svg')])[1]").dblclick();
    await this.page.waitForTimeout(500);
    await this.iframe.locator('//*[text()="package.json"]').dblclick();
    await this.page.waitForTimeout(1000);
  }
}
