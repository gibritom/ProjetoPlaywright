import { BasePage } from '../../../pages/BasePage';
import { test, expect } from '@playwright/test';

let basePage, context, page, mainIframe;
const projectName = 'project-reg-3.1.0';

// CRONAPP-12860

test.beforeAll(async ({ browser }) => {
  test.setTimeout(120000);

  context = await browser.newContext();
  page = await context.newPage();
  basePage = new BasePage(page, context);

  mainIframe = page.frameLocator('#main');

  /* Login na IDE */
  await basePage.visit();
  await basePage.IDElogin();
  await basePage.IDEopenProject(projectName);

  /* Acessa menu de blocos */
  await mainIframe.locator('[ui-id="_03LOGICSItemId"]').click();
});

test.afterEach(async ({}, testInfo) => {
  const image = await page.screenshot();

  await testInfo.attach('screenshot', {
    body: image,
    contentType: 'image/png',
  });
  await mainIframe.locator("//div[contains (@style, '/tree/collapse_12_12.svg')]").click();
  await mainIframe.locator('[ui-id="_02UIItemId"]').click();
  await mainIframe.locator('[ui-id="_03LOGICSItemId"]').click();
});

test.afterAll(async () => {
  await basePage.IDELogout();
  await context.close();
});

test('Valida a remoção do menu expandir para função de bloco Mobile', async ({}, testInfo) => {
  await mainIframe.locator('//*[text()="Mobile "]/parent::*[@data-cell-index="0"]').dblclick();
  await mainIframe.locator('//*[text()="auth "]/parent::*[@data-cell-index="0"]').dblclick();
  await mainIframe.locator('//div[text()="Home" and @data-cell-index="0"]').click();
  await page.keyboard.press('ArrowRight');

  await mainIframe.locator('//div[text()="change" and @data-cell-index="0"]').click({ button: 'right' });
  await page.waitForTimeout(1500);

  try {
    await expect(
      mainIframe.locator("(//*[@cronapp-menu='true' and contains(@style, 'display: none')])[0]")
    ).toBeHidden();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida a remoção do menu expandir para função de bloco Servidor', async ({}, testInfo) => {
  await mainIframe.locator('//span[text()="Servidor "]').dblclick();
  await mainIframe.locator('//div[text()="Application"]').click();
  await page.keyboard.press('ArrowRight');

  await mainIframe.locator('//div[text()="Current" and @data-cell-index="0"]').click({ button: 'right' });
  await page.waitForTimeout(1500);

  try {
    await expect(
      mainIframe.locator("(//*[@cronapp-menu='true' and contains(@style, 'display: none')])[0]")
    ).toBeHidden();
  } catch (error) {
    testInfo.error = error;
  }
});

test('Valida a remoção do menu expandir para função de bloco Web', async ({}, testInfo) => {
  await mainIframe.locator('//span[text()="Web "]').dblclick();
  await mainIframe.locator('//div[text()="MutualAuth"]').click();
  await page.keyboard.press('ArrowRight');

  await mainIframe.locator('//div[text()="signup" and @data-cell-index="0"]').click({ button: 'right' });
  await page.waitForTimeout(1500);

  try {
    await expect(
      mainIframe.locator("(//*[@cronapp-menu='true' and contains(@style, 'display: none')])[0]")
    ).toBeHidden();
  } catch (error) {
    testInfo.error = error;
  }
});
