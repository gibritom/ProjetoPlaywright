import { expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class Mobile extends BasePage {
  constructor(page, context) {
    super(page);
  }

  async acessMobileDevices(destino) {
    await this.iframe.locator('[ui-id="header-hambuguer"]').click();
    await this.page.waitForTimeout(1000);
    await this.iframe.getByText('Deploy').first().click();
    await this.iframe.getByText('Dispositivos Móveis').first().click();
    await this.iframe.getByText(destino).click();
    await this.page.waitForTimeout(2000);
  }

  async generateAndroidApk() {
    await this.acessMobileDevices('Configurações');
    await this.iframe.locator('//*[@tabindex="47"]/*[1]/*[1]').fill('http://qaprojetocomponentes.cloud.cronapp.io/');
    await this.page.keyboard.press('Control+S');
    await this.acessMobileDevices('Compilar');
    await this.iframe.getByText('Android').click();
    await this.iframe.locator('//div[@style and contains(text(),"OK")]').click();
    await this.page.waitForTimeout(3500);
    await this.iframe.getByText('Progresso').waitFor({ state: 'detached', timeout: 580000 });
    await this.iframe.locator("(//div[contains (@style, '/save.svg')])[2]").click();
    await this.page.waitForTimeout(3500);
  }

  async generateAndroidBundle() {
    await this.acessMobileDevices('Configurações');
    await this.iframe.locator('//*[@tabindex="47"]/*[1]/*[1]').fill('http://qaprojetocomponentes.cloud.cronapp.io/');
    await this.page.keyboard.press('Control+S');
    await this.acessMobileDevices('Compilar');
    await this.iframe.getByText('Android').click();
    await this.page.waitForTimeout(2000);
    await this.iframe.locator('//*[@tabindex="3"]').click();
    await this.iframe.locator('//div[@data-cell-index="0" and text()="Release"]').click();
    await this.iframe.locator('//div[@style and contains(text(),"OK")]').click();
    await this.page.waitForTimeout(3500);
    await this.iframe.getByText('Progresso').waitFor({ state: 'detached', timeout: 580000 });
    await this.iframe.locator("(//div[contains (@style, '/save.svg')])[2]").click();
    await this.page.waitForTimeout(3500);
  }

  async UrlErrorValidation() {
    await this.acessMobileDevices('Compilar');
    await this.iframe.getByText('Android').click();
    await expect(this.iframe.getByText('Você precisa informar a URL de produção do Servidor!')).toBeVisible();
    await this.iframe.locator('//div[@style and contains(text(),"OK")]').click();
    await this.page.waitForTimeout(1000);
  }

  async closeSuccessInstallationPopup() {
    const popUpisVisible = await this.iframe.locator('//*[text()="Download Aplicação Movel"]').isVisible();
    if (popUpisVisible) await this.iframe.locator("//div[contains (@style, '/6ef91d03.svg')]").click();
  }
}
