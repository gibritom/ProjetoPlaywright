import { Cloud } from '../../pages/ide/Cloud';
import { WebMobile } from '../../pages/project/lowCode/WebMobile';
import { test, expect } from '@playwright/test';

let webMobile, cloud, newPage;
const PROJECTNAME = 'qa-auto-project-cloud';

test.beforeEach(async ({ page, context }) => {
  test.setTimeout(65000);

  webMobile = new WebMobile(page, context);
  cloud = new Cloud(page, context);

  await cloud.visit();
  await cloud.ideLogin();
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
  await cloud.closeInitialNavegatPopUp();
  await cloud.ideLogout();
});

test('Valida criação de serviço no Cloud de um projeto recém-criado', async ({ page, context }) => {
  test.setTimeout(900000);

  webMobile = new WebMobile(page, context);

  await webMobile.createProjectMobileWeb(PROJECTNAME);
  await webMobile.runProject();
  await webMobile.openProject('closedMenu');

  await cloud.accessWindow();
  await cloud.addService(PROJECTNAME);
  await cloud.accessService(PROJECTNAME);

  newPage = await context.waitForEvent('page');
  await webMobile.loginRunningWebmobile(newPage);
  await expect(newPage.getByText('admin@cronapp.io')).toBeVisible();
});

test('Valida execução de projeto no Cloud', async ({ context }) => {
  test.setTimeout(70000);

  await cloud.accessWindow();
  await cloud.searchService(PROJECTNAME, 'initialNavegate');
  await cloud.accessService(PROJECTNAME);

  newPage = await context.waitForEvent('page');
  await webMobile.loginRunningWebmobile(newPage);
  await expect(newPage.getByText('admin@cronapp.io')).toBeVisible();
});

test('Valida remoção de serviço do Cloud', async ({ page }) => {
  test.setTimeout(70000);

  await cloud.accessWindow();
  await cloud.searchService(PROJECTNAME, 'initialNavegate');
  await cloud.deleteService(PROJECTNAME);

  await expect(
    page.frameLocator('#main').locator(`//*[text()="${PROJECTNAME.replace(/-/g, '')}.cloud.cronapp.io"]`)
  ).toBeHidden();
});
