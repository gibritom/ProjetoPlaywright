import { WebMobile } from '../../pages/project/lowCode/WebMobile';
import { test, expect } from '@playwright/test';

let webMobile, newPage;
const fullProject = 'auto-create-webMobile';
const frontProject = 'auto-create-front';

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

/* Valida projeto Full-stack */

test('Valida criação de projeto WebMobile', async ({ context }) => {
  test.setTimeout(1320000);

  await webMobile.createProjectMobileWeb(fullProject);
  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');
  await webMobile.loginRunningWebmobile(newPage);
  await expect(newPage.getByText('admin@cronapp.io')).toBeVisible();
});

test('Valida abertura de projeto WebMobile', async ({ context }) => {
  test.setTimeout(250000);

  await webMobile.ideOpenProject(fullProject);
  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');
  await webMobile.loginRunningWebmobile(newPage);
  await expect(newPage.getByText('admin@cronapp.io')).toBeVisible();
});

test('Valida exclusão de projeto WebMobile', async ({ page }) => {
  test.setTimeout(60000);

  await webMobile.searchProject(fullProject);
  await webMobile.deleteProject();

  await expect(page.frameLocator('#main').getByText(fullProject).nth(1)).toBeHidden();
});

/* Valida projeto Front-end */

test('Valida criação de projeto WebMobile - Front-end', async ({ context }) => {
  test.setTimeout(1320000);

  await webMobile.createProjectMobileWeb(frontProject, 'config_front');
  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');
  await expect(newPage.locator('#main-view')).toBeVisible({ timeout: 50000 });
});

test('Valida abertura de projeto WebMobile - Front-end', async ({ context }) => {
  test.setTimeout(180000);

  await webMobile.ideOpenProject(frontProject);
  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');
  await expect(newPage.locator('#main-view')).toBeVisible({ timeout: 50000 });
});

test('Valida exclusão de projeto WebMobile - Frone-end', async ({ page }) => {
  test.setTimeout(60000);

  await webMobile.searchProject(frontProject);
  await webMobile.deleteProject();

  await expect(page.frameLocator('#main').getByText(frontProject).nth(1)).toBeHidden();
});
