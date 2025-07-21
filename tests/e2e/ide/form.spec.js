import { OpenMenu } from '../../pages/ide/OpenMenu';
import { test, expect } from '@playwright/test';
import { WebMobile } from '../../pages/project/lowCode/WebMobile';

let openmenu;
let webMobile;
let iframe, iframeview, iframefirst;
const projectName = 'auto-form';

test.beforeEach(async ({ page, context }) => {
  test.setTimeout(65000);

  openmenu = new OpenMenu(page, context);
  webMobile = new WebMobile(page, context);

  //iframes para chegar ao editor de views
  iframe = page.frameLocator('#main');
  iframefirst = iframe.frameLocator("[scrolling='yes']");
  iframeview = iframefirst.frameLocator('#iframe-view');

  //acesso e login na IDE
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

test('Valida Abertura Formulario home', async ({ page, context }, testInfo) => {
  test.setTimeout(200000);

  await webMobile.createProjectMobileWeb(projectName);
  await openmenu.ideOpenProject();
  await openmenu.accessview();
  await page.waitForTimeout(4000);
  await expect(iframeview.locator('[id="main-nav-bar"]')).toBeVisible({ timeout: 5000 });
});
