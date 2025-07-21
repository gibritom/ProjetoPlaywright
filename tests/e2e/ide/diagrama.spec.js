import { OpenMenu } from '../../pages/ide/OpenMenu';
import { test, expect } from '@playwright/test';
import { WebMobile } from '../../pages/project/lowCode/WebMobile';

let openmenu;
let webMobile;

const projectName = 'auto-diagrama';

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

test('Valida Criação de Diagrama', async ({ page, context }, testInfo) => {
  test.setTimeout(200000);

  await webMobile.createProjectMobileWeb(projectName);
  await openmenu.creatediagrama();
  await expect(page.frameLocator('#main').locator("//div[@style and contains(text(),'qateste')]")).toBeVisible(7000);
});

test('Valida Abertura do Diagrama', async ({ page, context }, testInfo) => {
  const camadaapp = "//div[contains (@style, '/icons/layers.svg')]";
  test.setTimeout(200000);

  await openmenu.ideOpenProject(projectName);
  await openmenu.accessdiagrama();
  await expect(page.frameLocator('#main').locator(camadaapp)).toBeVisible(7000);
});
