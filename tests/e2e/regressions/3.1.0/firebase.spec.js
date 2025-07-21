import { PLugin } from '../../../pages/ide/Plugin';
import { test, expect } from '@playwright/test';
import { Mobile } from '../../../pages/ide/Mobile';
import { BasePage } from '../../../pages/BasePage';

let plugin, mobile, page, context, basePage;
const projectName = 'project-reg-3.1.0';

// CRONAPP-12984

test.beforeAll(async ({ browser }) => {
  test.setTimeout(1200000);

  context = await browser.newContext();
  page = await context.newPage();
  plugin = new PLugin(page, context);
  mobile = new Mobile(page, context);
  basePage = new BasePage(page, context);

  /* Login na IDE */

  await basePage.visit();
  await basePage.IDElogin();
  await basePage.IDEopenProject(projectName);
});

test.afterEach(async ({}, testInfo) => {
  const image = await page.screenshot();

  await testInfo.attach('screenshot', {
    body: image,
    contentType: 'image/png',
  });

  await mobile.closeSuccessInstallationPopup();
});

test.afterAll(async ({}, testInfo) => {
  const image = await page.screenshot();

  await testInfo.attach('screenshot', {
    body: image,
    contentType: 'image/png',
  });

  await basePage.IDELogout();
  await context.close();
});

test('Valida Instação do plugin FireBase', async ({}, testInfo) => {
  test.setTimeout(250000);

  await plugin.installPlugin('Google Firebase - Push Notification');
  await plugin.accessPackageJson();

  await page.frameLocator('#main').locator('(//*[contains(@ui-class, "selected")])[2]').click({ button: 'right' });
  await page.waitForTimeout(1000);
  await page.frameLocator('#main').locator('//*[text()="Fechar"]').click();

  try {
    await expect(
      page.frameLocator('#main').locator(`(//*[contains(text(), "cordova-plugin-firebasex")])[1]`)
    ).toBeVisible();
    await expect(page.frameLocator('#main').locator(`//*[text()='"17.0.0-cli"']`)).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida geração de APK do plugin FireBase', async ({}, testInfo) => {
  test.setTimeout(600000);

  await mobile.generateAndroidApk();

  try {
    await expect(
      page.frameLocator('#main').locator(`//*[text()="Sua aplicação foi gerada com sucesso!"]`)
    ).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});
