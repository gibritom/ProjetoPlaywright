import { LowCodePage } from '../../project/lowCode/LowCodePage';

export class Microsservico extends LowCodePage {
  constructor(page, context) {
    super(page);
  }

  async createMicrosservicesProject(projectName, type) {
    const nextButton = await this.iframe.locator('div[ui-id="template-next-button"]');

    await this.searchProject(projectName);
    await this.page.waitForTimeout(1000);

    const projectExistis = await this.iframe.getByText(projectName).nth(1).isVisible();
    if (projectExistis) await this.deleteProject();

    await this.iframe.getByText('+ Novo Projeto').nth(1).click();
    await this.iframe.getByText('Microsserviço').click();
    await this.iframe.locator('input[ui-id="newProject-projectName-input"]').fill(projectName);
    await this.iframe.getByText('Finalizar').click();

    await this.iframe.locator(`[ui-id="template-item-${type}-service"]`).click();
    await this.page.waitForTimeout(1000);
    await nextButton.click();
    await this.page.waitForTimeout(1000);
    await this.iframe.locator('[ui-id="template-finish-button"]').click({ delay: 1000 });
    await this.iframe.locator('[ui-id="dialog_confirmation"]').waitFor({ timeout: 120000 });
    await this.page.waitForTimeout(500);
    await this.iframe.locator('(//*[text()="Não"])[2]').click();
    await this.iframe.getByText(' Started').waitFor({ timeout: 100000 });

    await this.page.waitForTimeout(32000);
  }
}
