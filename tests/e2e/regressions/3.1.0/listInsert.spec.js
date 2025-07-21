import { BasePage } from '../../../pages/BasePage';
import { LowCodePage } from '../../../pages/project/lowCode/LowCodePage';
import { test, expect } from '@playwright/test';

let basePage, lowCodePage, newPage, context, page;
const projectName = 'project-reg-3.1.0';

// CRONAPP-9489

test.beforeAll(async ({ browser }) => {
  test.setTimeout(1200000);

  context = await browser.newContext();
  page = await context.newPage();
  basePage = new BasePage(page, context);
  lowCodePage = new LowCodePage(page, context);

  /* Login na IDE */
  await basePage.visit();
  await basePage.IDElogin();
  await basePage.IDEopenProject(projectName);

  /* Executa o projeto e realiza o login */
  await lowCodePage.runProject();
  await lowCodePage.openProject('web');

  newPage = await context.waitForEvent('page');
  await newPage.isVisible('div[data-component="crn-image"]');
  await newPage.locator('input[id="input-login-username"]').fill('admin');
  await newPage.locator('input[id="input-login-password"]').fill('admin');
  await newPage.locator('div[id="crn-button-login"]').click();

  /* Navega até a View configurada */
  await newPage.getByText('Painel').click();
  await newPage.getByText('CRONAPP-9489').click();
});

test.afterEach(async ({}, testInfo) => {
  const image = await newPage.screenshot();

  await testInfo.attach('screenshot', {
    body: image,
    contentType: 'image/png',
  });
});

test.afterAll(async () => {
  await basePage.IDELogout();
  await context.close();
});

test('Valida inserção de elementos em uma lista - Bloco Cliente', async ({}, testInfo) => {
  await newPage.locator('//*[text()="Cliente"]').click();
  try {
    await expect(newPage.locator('[id="input9498"]')).toHaveValue('2c,1c,3c');
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida inserção de elementos em uma lista - Bloco Servidor', async ({}, testInfo) => {
  await newPage.locator('//*[text()="Servidor"]').click();
  try {
    await expect(newPage.locator('[id="input9498"]')).toHaveValue('2s,1s,3s');
  } catch (error) {
    testInfo.error = error;
  }
});
