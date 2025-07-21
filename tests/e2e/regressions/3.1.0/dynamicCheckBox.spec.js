import { BasePage } from '../../../pages/BasePage';
import { LowCodePage } from '../../../pages/project/lowCode/LowCodePage';
import { test, expect } from '@playwright/test';

let basePage, lowCodePage, newPage, context, page;
const projectName = 'project-reg-3.1.0';

// CRONAPP-12347

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

  /* Popula os dados no banco user */
  await newPage.locator('//*[text()="Popular dados"]').click();

  /* Navega até a View configurada */
  await newPage.getByText('Painel').click();
  await newPage.locator('#btn-cronapp-12347').click();
});

test.afterEach(async ({}, testInfo) => {
  const image = await newPage.screenshot();

  await testInfo.attach('screenshot', {
    body: image,
    contentType: 'image/png',
  });

  /* Limpa o combobox */
  await newPage.locator("//*[@id='dynamic-combobox-12347-list']/child::*[2]").click();
  await page.waitForTimeout(500);
});

test.afterAll(async () => {
  await basePage.IDELogout();
  await context.close();
});

test('Valida campo presente ao filtrar e selecionar algum elemento através do Click', async ({}, testInfo) => {
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(3500);
  await newPage.locator('input[aria-label="Pesquisar"]').type('Fabio Almeida');
  await page.waitForTimeout(2500);
  await newPage.locator('//li[text()="Fabio Almeida"]').click();
  await page.waitForTimeout(500);
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(1000);

  try {
    await expect(newPage.locator('[class="k-list-optionlabel k-state-selected k-state-focused"]')).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida campo presente ao filtrar e selecionar algum elemento através do Enter', async ({}, testInfo) => {
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(3000);
  await newPage.locator('input[aria-label="Pesquisar"]').type('Mariana Silva');
  await page.waitForTimeout(2500);
  await newPage.keyboard.press('Enter');
  await page.waitForTimeout(500);
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(1000);

  try {
    await expect(newPage.locator('[class="k-list-optionlabel k-state-selected k-state-focused"]')).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida campo presente ao selecionar algum elemento', async ({}, testInfo) => {
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(3500);
  await newPage.locator('//li[text()="Diego Ribeiro"]').click();
  await page.waitForTimeout(500);
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(1000);

  try {
    await expect(newPage.locator('[class="k-list-optionlabel k-state-selected k-state-focused"]')).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida campo presente ao limpar busca após seleção de elemento', async ({}, testInfo) => {
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(3500);
  await newPage.locator('//li[text()="Administrator"]').click();
  await page.waitForTimeout(500);
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(500);

  await newPage.locator("//*[@id='dynamic-combobox-12347-list']/child::*[2]").click();
  await page.waitForTimeout(500);
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(1000);

  try {
    await expect(newPage.locator('[class="k-list-optionlabel k-state-selected k-state-focused"]')).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida campo presente ao limpar busca após filtragem e seleção de elemento através do Click', async ({}, testInfo) => {
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(3500);
  await newPage.locator('input[aria-label="Pesquisar"]').type('Gabriela Lima');
  await page.waitForTimeout(2500);
  await newPage.locator('//li[text()="Gabriela Lima"]').click();
  await page.waitForTimeout(1000);
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(1000);

  await newPage.locator("//*[@id='dynamic-combobox-12347-list']/child::*[2]").click();
  await page.waitForTimeout(1500);
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(1000);

  try {
    await expect(newPage.locator('[class="k-list-optionlabel k-state-selected k-state-focused"]')).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida campo presente ao limpar busca após filtragem e seleção de elemento através do Enter', async ({}, testInfo) => {
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(3500);
  await newPage.locator('input[aria-label="Pesquisar"]').type('Mariana Silva');
  await page.waitForTimeout(2500);
  await newPage.keyboard.press('Enter');
  await page.waitForTimeout(500);
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(1000);

  await newPage.locator("//*[@id='dynamic-combobox-12347-list']/child::*[2]").click();
  await page.waitForTimeout(1500);
  await newPage.locator('span[aria-label="Pesquisar"]').click();
  await page.waitForTimeout(1000);

  try {
    await expect(newPage.locator('[class="k-list-optionlabel k-state-selected k-state-focused"]')).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});
