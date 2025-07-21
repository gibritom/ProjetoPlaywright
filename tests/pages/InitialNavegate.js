import { BasePage } from './BasePage';

export class InitialNavegate extends BasePage {
  constructor(page) {
    super(page);
  }

  async verifyInitialInputs() {
    await this.page.waitForTimeout(8000);
    let termsOfServiceScreen = await this.iframe.locator('//*[text()="Termos de Serviço Beta do Cronapp"]').isVisible();
    if (termsOfServiceScreen) await this.iframe.getByText('Concordo').click();

    await this.page.waitForTimeout(10000);
    let updatePopupIsVisible = await this.iframe
      .locator("//text()[contains(., 'Nova versão do Cronapp lançada')]")
      .isVisible();
    if (updatePopupIsVisible) await this.iframe.locator('//*[text()="OK"]').click();
  }

  async deleteProject() {
    await this.iframe.locator("//div[contains (@style, '/workspace/tree/delete.svg')]").first().click();
    await this.iframe.getByText('Sim').click();
    await this.page.waitForTimeout(500);
  }

  async navegateToLink(linkTitle) {
    await this.iframeWelcome.locator(`//*[text()="${linkTitle}"]`).click();
  }
}
