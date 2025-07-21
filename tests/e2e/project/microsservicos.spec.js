import { Microsservico } from '../../pages/project/lowCode/Microsservico';
import { test, expect } from '@playwright/test';

let microsservico, newPage;
const dataProject = 'auto-service-data';
const businessProject = 'auto-service-business';

test.beforeEach(async ({ page, context }) => {
  test.setTimeout(250000);
  newPage = null;
  microsservico = new Microsservico(page, context);

  await microsservico.visit();
  await microsservico.ideLogin();
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
  await microsservico.ideLogout();
});

/* Testes criação para projeto de microsserviços de dados */

test('Valida criação Microsserviços de dados', async ({ context }) => {
  test.setTimeout(1320000);

  await microsservico.createMicrosservicesProject(dataProject, 'data');
  await microsservico.runProject();
  await microsservico.openProject('Doc');

  newPage = await context.waitForEvent('page');
  await expect(newPage.getByText('blockly.HelloWorld')).toBeVisible();
});

test('Valida abertura projeto Microsserviços de dados', async ({ context }) => {
  test.setTimeout(250000);

  await microsservico.ideOpenProject(dataProject);
  await microsservico.runProject();
  await microsservico.openProject('Doc');

  newPage = await context.waitForEvent('page');
  await expect(newPage.getByText('blockly.HelloWorld')).toBeVisible();
});

test('Valida exclusão projeto Microsserviços de dados', async ({ page }) => {
  test.setTimeout(60000);

  await microsservico.searchProject(dataProject);
  await microsservico.deleteProject();

  await expect(page.frameLocator('#main').getByText(dataProject).nth(1)).toBeHidden();
});

/* Testes criação para projeto de microsserviços de negócio */

test('Valida criação projeto Microsserviços de Negócio', async ({ context }) => {
  test.setTimeout(1320000);

  await microsservico.createMicrosservicesProject(businessProject, 'business');
  await microsservico.runProject();
  await microsservico.openProject('Doc');

  newPage = await context.waitForEvent('page');
  await expect(newPage.getByText('blockly.HelloWorld')).toBeVisible();
});

test('Valida abertura projeto Microsserviços de Negócio', async ({ context }) => {
  test.setTimeout(250000);

  await microsservico.ideOpenProject(businessProject);
  await microsservico.runProject();
  await microsservico.openProject('Doc');

  newPage = await context.waitForEvent('page');
  await expect(newPage.getByText('blockly.HelloWorld')).toBeVisible();
});

test('Valida exclusão projeto Microsserviços de Negócio', async ({ page }) => {
  test.setTimeout(60000);

  await microsservico.searchProject(businessProject);
  await microsservico.deleteProject();

  await expect(page.frameLocator('#main').getByText(businessProject).nth(1)).toBeHidden();
});
