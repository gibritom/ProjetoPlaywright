import { WebMobile } from '../../pages/project/lowCode/WebMobile';
import { test, expect } from '@playwright/test';

let webMobile, newPage;
const projectName = 'auto-create-web';

test.beforeEach(async ({ page, context }) => {
  test.setTimeout(250000);
  newPage = null;
  webMobile = new WebMobile(page, context);

  await webMobile.visit();
  await webMobile.ideLogin();
});

test.afterEach(async ({ page }, testInfo) => {
  const image = newPage == null ? await page.screenshot() : await newPage.screenshot();
  await testInfo.attach('screenshot', {
    body: image,
    contentType: 'image/png',
  });

  if (newPage) {
    await newPage.close();
    newPage = null;
  }

  await webMobile.ideLogout();
});

test('Valida criação de projeto Web', async ({ context }) => {
  test.setTimeout(1320000);

  await webMobile.createProjectWeb(projectName);
  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');
  await webMobile.loginRunningWebmobile(newPage);
  await expect(newPage.getByText('admin@cronapp.io')).toBeVisible();
});

test('Valida abertura de projeto Web', async ({ context }) => {
  test.setTimeout(250000);

  await webMobile.ideOpenProject(projectName);
  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');
  await webMobile.loginRunningWebmobile(newPage);
  await expect(newPage.getByText('admin@cronapp.io')).toBeVisible();
});

test('Valida exclusão de projeto Web', async ({ page }) => {
  test.setTimeout(60000);

  await webMobile.searchProject(projectName);
  await webMobile.deleteProject();

  await expect(page.frameLocator('#main').getByText(projectName).nth(1)).toBeHidden();
});
