import { test, expect } from '@playwright/test';
import { WebMobile } from '../../pages/project/lowCode/WebMobile';
import { Mobile } from '../../pages/ide/Mobile';

let webMobile, mobile;
const projectName = 'auto-project-apk';

test.beforeEach(async ({ page, context }) => {
  test.setTimeout(65000);

  webMobile = new WebMobile(page, context);
  mobile = new Mobile(page, context);

  await mobile.visit();
  await mobile.ideLogin();
});

test.afterEach(async ({ page }, testInfo) => {
  const imagem = await page.screenshot();

  await testInfo.attach('screenshot', {
    body: imagem,
    contentType: 'image/png',
  });

  await mobile.closeSuccessInstallationPopup();
  await mobile.ideLogout();
});

test('Valida mensagem de URL inválida', async ({ page }) => {
  test.setTimeout(300000);

  await webMobile.createProjectMobileWeb(projectName);
  await mobile.UrlErrorValidation();

  await expect(page.frameLocator('#main').getByText('URL do Servidor (produção)')).toBeVisible();
});

test('Valida geração de APK', async ({ page }) => {
  test.setTimeout(600000);

  await mobile.ideOpenProject(projectName);
  await mobile.generateAndroidApk();

  await expect(page.frameLocator('#main').locator(`//*[text()="Sua aplicação foi gerada com sucesso!"]`)).toBeVisible();
});

test('Valida geração de Bundle Android', async ({ page }) => {
  test.setTimeout(600000);

  await mobile.ideOpenProject(projectName);
  await mobile.generateAndroidBundle();

  await expect(page.frameLocator('#main').locator(`//*[text()="Sua aplicação foi gerada com sucesso!"]`)).toBeVisible();
});
