import { OpenMenu } from '../../pages/ide/OpenMenu';
import { test, expect } from '@playwright/test';
import { WebMobile } from '../../pages/project/lowCode/WebMobile';

let openmenu;
let webMobile;

const projectName = 'auto-datasource';

test.beforeEach(async ({ page, context }) => {
  test.setTimeout(65000);

  openmenu = new OpenMenu(page, context);
  webMobile = new WebMobile(page, context);

  await openmenu.visit();
  await openmenu.ideLogin();
});

test.afterEach(async ({ page }, testInfo) => {
  const image = await page.screenshot();

  await testInfo.attach('screenshot', {
    body: image,
    contentType: 'image/png',
  });

  await openmenu.ideLogout();
});

test('Valida Criação Fonte de daddos', async ({ page, context }, testInfo) => {
  test.setTimeout(200000);

  await webMobile.createProjectMobileWeb(projectName);
  await openmenu.createdatasource();
  await expect(page.frameLocator('#main').locator('//*[text()="select"]')).toBeVisible();
});
