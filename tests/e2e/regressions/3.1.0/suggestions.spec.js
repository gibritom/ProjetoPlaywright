import { BasePage } from '../../../pages/BasePage';
import { test, expect } from '@playwright/test';

let basePage, context, page, mainIframe;
let blockServerIframe, blockWebIframe, blockMobileIframe;
const projectName = 'project-reg-3.1.0';

// CRONAPP-12932

test.beforeAll(async ({ browser }) => {
  test.setTimeout(1200000);

  context = await browser.newContext();
  page = await context.newPage();
  basePage = new BasePage(page, context);

  mainIframe = page.frameLocator('#main');

  blockMobileIframe = mainIframe.frameLocator("(//div[contains(@id, 'blocklyeditorw')]//iframe)[1]");
  blockServerIframe = mainIframe.frameLocator("(//div[contains(@id, 'blocklyeditorw')]//iframe)[2]");
  blockWebIframe = mainIframe.frameLocator("(//div[contains(@id, 'blocklyeditorw')]//iframe)[3]");

  /* Login na IDE */

  await basePage.visit();
  await basePage.IDElogin();
  await basePage.IDEopenProject(projectName);

  /* Expade a árvore e abre os Blocos */

  await mainIframe.locator('[ui-id="_03LOGICSItemId"]').click();
  await mainIframe.locator('//*[text()="Mobile "]/parent::*[@data-cell-index="0"]').dblclick();
  await mainIframe.locator('//*[text()="auth "]/parent::*[@data-cell-index="0"]').dblclick();
  await mainIframe.locator('//div[text()="12932-mobile" and @data-cell-index="0"]').dblclick();
  await page.waitForTimeout(3500);

  await mainIframe.locator('//span[text()="Servidor "]').dblclick();
  await mainIframe.locator('//div[text()="12932-server"]').dblclick();
  await page.waitForTimeout(3500);

  await mainIframe.locator('//span[text()="Web "]').dblclick();
  await mainIframe.locator('//div[text()="12932-web"]').dblclick();
  await page.waitForTimeout(3500);
});

test.afterEach(async ({}, testInfo) => {
  const image = await page.screenshot();

  await testInfo.attach('screenshot', {
    body: image,
    contentType: 'image/png',
  });
});

test.afterAll(async () => {
  await basePage.IDELanguage('portuguese');
  await basePage.IDELogout();
  await context.close();
});

test('Valida título "Sugestões cronapp" no bloco do tipo servidor', async ({}, testInfo) => {
  await mainIframe.locator('//span[text()="12932-server"]').click();

  await blockServerIframe.locator('//*[text()="Caminho"]').hover();
  await blockServerIframe.locator('[transform="translate(105.71875,57)"]').click();
  await page.waitForTimeout(1000);

  try {
    await expect(blockServerIframe.locator('//*[text()="Sugestões Cronapp"]')).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida título "Sugestões cronapp" no bloco do tipo web', async ({}, testInfo) => {
  await mainIframe.locator('//span[text()="12932-web"]').click();

  await blockWebIframe.locator('//*[text()="Rota"]').hover();
  await blockWebIframe.locator('[transform="translate(65.109375,30)"]').click();
  await page.waitForTimeout(1000);

  try {
    await expect(blockWebIframe.locator('//*[text()="Sugestões Cronapp"]')).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida título "Sugestões cronapp" no bloco do tipo mobile', async ({}, testInfo) => {
  await mainIframe.locator('//span[text()="12932-mobile"]').click();

  await blockMobileIframe.locator('//*[text()="Milissegundos"]').hover();
  await blockMobileIframe.locator('[transform="translate(96.140625,30)"]').click();
  await page.waitForTimeout(1000);

  try {
    await expect(blockMobileIframe.locator('//*[text()="Sugestões Cronapp"]')).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida ocultação do título ao realizar buscar no bloco tipo servidor', async ({}, testInfo) => {
  await mainIframe.locator('//span[text()="12932-server"]').click();

  await blockServerIframe.locator('//*[text()="Caminho"]').hover();
  await blockServerIframe.locator('[transform="translate(105.71875,57)"]').click();
  await blockServerIframe.locator('[class="blockly-search-input"]').click();
  await blockServerIframe.locator('[class="blockly-search-input"]').type('json');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);

  try {
    await expect(blockServerIframe.locator('//*[text()="Sugestões Cronapp"]')).toBeHidden();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida ocultação do título ao realizar buscar no bloco tipo web', async ({}, testInfo) => {
  await mainIframe.locator('//span[text()="12932-web"]').click();

  await blockWebIframe.locator('//*[text()="Rota"]').hover();
  await blockWebIframe.locator('[transform="translate(65.109375,30)"]').click();
  await blockWebIframe.locator('[class="blockly-search-input"]').click();
  await blockWebIframe.locator('[class="blockly-search-input"]').type('json');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);

  try {
    await expect(blockWebIframe.locator('//*[text()="Sugestões Cronapp"]')).toBeHidden();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida ocultação do título ao realizar buscar no bloco tipo mobile', async ({}, testInfo) => {
  await mainIframe.locator('//span[text()="12932-mobile"]').click();

  await blockMobileIframe.locator('//*[text()="Milissegundos"]').hover();
  await blockMobileIframe.locator('[transform="translate(96.140625,30)"]').click();
  await blockMobileIframe.locator('[class="blockly-search-input"]').click();
  await blockMobileIframe.locator('[class="blockly-search-input"]').type('json');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);

  try {
    await expect(blockMobileIframe.locator('//*[text()="Sugestões Cronapp"]')).toBeHidden();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida título "Cronapp Suggestions" no bloco do tipo servidor', async ({}, testInfo) => {
  await basePage.IDELanguage('english');

  await mainIframe.locator('//span[text()="12932-server"]').click();
  await page.waitForTimeout(1000);
  await mainIframe.locator('//span[text()="12932-server"]').click({ button: 'right' });
  await page.waitForTimeout(1000);
  await mainIframe.locator('//*[text()="Close"]').click();

  await mainIframe.locator('//div[text()="12932-server"]').dblclick();
  await page.waitForTimeout(3500);

  await mainIframe
    .frameLocator("(//div[contains(@id, 'blocklyeditorw')]//iframe)[3]")
    .locator('//*[text()="Path"]')
    .hover();

  await mainIframe
    .frameLocator("(//div[contains(@id, 'blocklyeditorw')]//iframe)[3]")
    .locator('[transform="translate(83.34375,57)"]')
    .click();

  await page.waitForTimeout(1000);

  try {
    await expect(
      mainIframe
        .frameLocator("(//div[contains(@id, 'blocklyeditorw')]//iframe)[3]")
        .locator('//*[text()="Cronapp Suggestions"]')
    ).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida título "Cronapp Suggestions" no bloco do tipo web', async ({}, testInfo) => {
  await basePage.IDELanguage('english');

  await mainIframe.locator('//span[text()="12932-web"]').click();
  await page.waitForTimeout(1000);
  await mainIframe.locator('//span[text()="12932-web"]').click({ button: 'right' });
  await page.waitForTimeout(1000);
  await mainIframe.locator('//*[text()="Close"]').click();

  await mainIframe.locator('//div[text()="12932-web"]').dblclick();
  await page.waitForTimeout(3500);

  await mainIframe
    .frameLocator("(//div[contains(@id, 'blocklyeditorw')]//iframe)[3]")
    .locator('//*[text()="Route"]')
    .hover();
  await mainIframe
    .frameLocator("(//div[contains(@id, 'blocklyeditorw')]//iframe)[3]")
    .locator('[transform="translate(65.109375,30)"]')
    .click();
  await page.waitForTimeout(1000);

  try {
    await expect(
      mainIframe
        .frameLocator("(//div[contains(@id, 'blocklyeditorw')]//iframe)[3]")
        .locator('//*[text()="Cronapp Suggestions"]')
    ).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida título "Cronapp Suggestions" no bloco do tipo mobile', async ({}, testInfo) => {
  await basePage.IDELanguage('english');

  await mainIframe.locator('//span[text()="12932-mobile"]').click();
  await page.waitForTimeout(1000);
  await mainIframe.locator('//span[text()="12932-mobile"]').click({ button: 'right' });
  await page.waitForTimeout(1000);
  await mainIframe.locator('//*[text()="Close"]').click();

  await mainIframe.locator('//div[text()="12932-mobile"]').dblclick();
  await page.waitForTimeout(3500);

  await mainIframe
    .frameLocator("(//div[contains(@id, 'blocklyeditorw')]//iframe)[3]")
    .locator('//*[text()="Milliseconds"]')
    .hover();
  await mainIframe
    .frameLocator("(//div[contains(@id, 'blocklyeditorw')]//iframe)[3]")
    .locator('[transform="translate(85.328125,30)"]')
    .click();
  await page.waitForTimeout(1000);

  try {
    await expect(
      mainIframe
        .frameLocator("(//div[contains(@id, 'blocklyeditorw')]//iframe)[3]")
        .locator('//*[text()="Cronapp Suggestions"]')
    ).toBeVisible();
  } catch (error) {
    testInfo.error = error;
  }
});
