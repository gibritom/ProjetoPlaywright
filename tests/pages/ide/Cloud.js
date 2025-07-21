import { expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class Cloud extends BasePage {
  constructor(page) {
    super(page);
  }

  async accessWindow() {
    await this.iframe.locator('[ui-id="header-hambuguer"]').click();
    await this.iframe.locator('[ui-id="toolbar-cloudservice"]').click();
    await this.page.waitForTimeout(3000);
  }

  async searchService(serviceName, screen) {
    const inputTabindex = screen == 'initialNavegate' ? '8' : '32';
    await this.iframe
      .locator(`[tabindex="${inputTabindex}"] > *:nth-child(2)`)
      .fill(`${serviceName.replace(/-/g, '')}`);
    await this.page.waitForTimeout(1500);
    await this.page.keyboard.press('Space');
    await this.page.waitForTimeout(2000);
  }

  async accessEditOption(serviceName) {
    await this.iframe.locator(`//*[text()="${serviceName}.cronapp.io"]/../../..`).click({ button: 'right' });
    await this.iframe.locator('(//*[text()="Editar"])[3]').click();
    await this.page.waitForTimeout(5500);
    await expect(this.iframe.locator(`//*[text()="Configuração de ${serviceName}"]`)).toBeVisible();
  }

  async accessService(serviceName) {
    await this.iframe.locator(`//*[text()="${serviceName.replace(/-/g, '')}.cloud.cronapp.io"]`);
    await this.iframe.locator(`//*[text()="${serviceName.replace(/-/g, '')}.cloud.cronapp.io"]`).click();
  }

  async addService(serviceName) {
    await this.iframe.getByText('Nova Publicação').click();

    // Seleciona o tomcat 11
    await this.iframe.locator("(//*[contains(@class, 'rwt-widgets-combo') and contains(@class, 'rwt-widgets-combo-rwt-border')]/div[2]/div[1])[2]").click()
    await this.iframe.locator('//*[@data-cell-index="0" and text()="Tomcat 11"]').click()

    await this.iframe.getByText('Nova Publicação').nth(2).waitFor({ timeout: 3500 });
    await this.iframe.getByText('Nova Publicação').nth(2).click();

    // A publicação no Serviços de Cloud gerará cobranças extras, de acordo com seu plano. Deseja continuar?
    await this.page.waitForTimeout(500);
    await this.iframe.getByText('Sim').click();

    // Uso de instâncias spot pode levar a indisponibilidades momentâneas não previsíveis. Deseja continuar?
    await this.page.waitForTimeout(500);
    await this.iframe.getByText('Sim').click();

    // Deseja gerar o war da aplicação?
    await this.page.waitForTimeout(500);
    await this.iframe.getByText('Sim').click();

    // Opções de Geração de Pacote para Deploy
    await this.page.waitForTimeout(500);
    await this.iframe.getByText('OK').click();

    // Os dados persistidos nesse tipo de banco poderão ser perdidos, devido à arquitetura distribuída e sem estado do cloud.
    await this.page.waitForTimeout(1000);
    await this.iframe.locator('//*[text()="Sim"]').click();

    // Esperar o popup de Progresso sair da tela
    await this.page.waitForTimeout(10000);
    await this.iframe.getByText('Progresso').waitFor({ state: 'detached', timeout: 240000 });

    // Procura serviço
    await this.page.waitForTimeout(20000);
    await this.searchService(serviceName);

    //Espera o projeto finalizar o carregamento
    await this.iframe.getByText('Pronto').waitFor({ timeout: 1500000 });
  }

  async serviceUpdate() {
    await this.iframe.locator('//*[text()="Atualizar"]').click();
  }

  async deleteService(serviceName) {
    await this.iframe.locator("//div[contains (@style, 'workspace/tree/more.svg')]").click();
    await this.iframe.locator('//*[text()="Remover"]').click();
    await this.page.locator(1500);
    await this.iframe.locator(`//*[text()="Deseja remover '${serviceName.replace(/-/g, '')}'?"]`).waitFor();
    await this.iframe.locator('//*[text()="Sim"]').click();
    await this.iframe.locator('[ui-id="dialog-input-text-parent"]').fill('apague');
    await this.iframe.locator('//*[text()="OK"]').click();
    await this.page.waitForTimeout(10000);
  }

  async closeInitialNavegatPopUp() {
    const popUpisVisible = await this.iframe.locator("//div[contains (@style, '/6ef91d03.svg')]").isVisible();
    if (popUpisVisible) await this.iframe.locator('//*[text()="Fechar"]').click();
  }
}
