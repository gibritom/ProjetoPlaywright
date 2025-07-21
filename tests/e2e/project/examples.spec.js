import { WebMobile } from '../../pages/project/lowCode/WebMobile';
import { test, expect } from '@playwright/test';

let webMobile, iframe, newPage;

test.beforeEach(async ({ page, context }) => {
  test.setTimeout(250000);
  webMobile = new WebMobile(page, context);

  iframe = page.frameLocator('#main');

  await webMobile.visit();
  await webMobile.ideLogin();
});

test.afterEach(async ({ page, context }, testInfo) => {
  const image = newPage ? await newPage.screenshot() : await page.screenshot();
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

// Testes para validar o import dos projetos exemplo	

test('Valida importe projeto exemplo Cronapp-Food', async ({ page, context }, testInfo) => {
  test.setTimeout(360000);

  const projectExists = await webMobile.searchProject('Cronapp Food');
  if (projectExists) {
    await webMobile.deleteProject();
  }

  await page.keyboard.press('PageDown');

  await iframe.locator("//img[contains(@src, 'samples/cronapp-food.png')]").click();
  await page.waitForTimeout(3000);
  await iframe.locator('[tabindex="2"]').nth(0).click();
  await page.waitForTimeout(3000);
  await iframe.getByText(' Started').waitFor({ timeout: 250000 });
  await page.waitForTimeout(10000);

  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');

  await newPage.waitForLoadState('load');
  await newPage.waitForTimeout(2000);
  await newPage.isVisible('div[data-component="crn-image"]');
  await newPage.locator('[autocomplete="username"]').fill('admin');
  await newPage.locator('[type="password"]').fill('admin');
  await newPage.locator('button[aria-label="Entrar"]').click();

  await newPage.getByText('Admin').click();
  await newPage.getByText('Usuários').click();

  await expect(newPage.getByText('cliente@cronapp.io')).toBeVisible();
});

test('Valida importe projeto exemplo Farmácia', async ({ page, context }, testInfo) => {
  test.setTimeout(360000);

  const projectExists = await webMobile.searchProject('Controle de Farmácia');
  if (projectExists) {
    await webMobile.deleteProject();
  }

  await page.keyboard.press('PageDown');

  await iframe.locator("//img[contains(@src, '/samples/pharma2.png')]").click();
  await page.waitForTimeout(3000);
  await iframe.locator('[tabindex="2"]').nth(0).click();
  await page.waitForTimeout(3000);
  await iframe.getByText(' Started').waitFor({ timeout: 250000 });
  await page.waitForTimeout(10000);

  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');

  await newPage.waitForLoadState('load');
  await newPage.waitForTimeout(2000);
  await newPage.isVisible('div[data-component="crn-image"]');
  await newPage.locator('[placeholder="Usuário"]').fill('admin');
  await newPage.locator('[placeholder="Senha"]').fill('admin');
  await newPage.locator('button[aria-label="Entrar"]').click();

  await newPage.getByText('Admin').click();
  await newPage.getByText('Usuários').click();

  await expect(newPage.getByText('admin@cronapp.io')).toBeVisible();
});

test('Valida importe projeto exemplo Pit', async ({ page, context }, testInfo) => {
  test.setTimeout(360000);

  const projectExists = await webMobile.searchProject('Pit');
  if (projectExists) {
    await webMobile.deleteProject();
  }

  await page.keyboard.press('PageDown');

  await iframe.locator("//img[contains(@src, '/samples/pit.png')]").click();
  await page.waitForTimeout(3000);
  await iframe.locator('[tabindex="2"]').nth(0).click();
  await page.waitForTimeout(3000);
  await iframe.getByText(' Started').waitFor({ timeout: 250000 });
  await page.waitForTimeout(10000);

  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');

  await newPage.waitForLoadState('load');
  await newPage.waitForTimeout(2000);
  await newPage.isVisible('#container-second');
  await newPage.locator('#input-login-username').fill('admin');
  await newPage.locator('[type="password"]').fill('admin');
  await newPage.locator('button[aria-label="Entrar"]').click();

  await newPage.getByText('Admin').click();
  await newPage.getByText('Usuários').click();

  await expect(newPage.getByText('admin@cronapp.io')).toBeVisible();
});

test('Valida importe projeto exemplo Techne Bet', async ({ page, context }, testInfo) => {
  test.setTimeout(360000);

  const projectExists = await webMobile.searchProject('Techne Bet');
  if (projectExists) {
    await webMobile.deleteProject();
  }

  await page.keyboard.press('PageDown');

  await iframe.locator("//img[contains(@src, '/samples/technebet.png')]").click();
  await page.waitForTimeout(3000);
  await iframe.locator('[tabindex="2"]').nth(0).click();
  await page.waitForTimeout(3000);
  await iframe.getByText(' Started').waitFor({ timeout: 250000 });
  await page.waitForTimeout(10000);

  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');

  await newPage.waitForLoadState('load');
  await newPage.waitForTimeout(2000);
  await newPage.isVisible('div[data-component="crn-image"]');
  await newPage.locator('#input-login-username').fill('admin');
  await newPage.locator('[type="password"]').fill('admin');
  await newPage.locator('button[aria-label="Entrar"]').click();

  await newPage.getByText('Admin').click();
  await newPage.getByText('Usuários').click();

  await expect(newPage.getByText('admin@cronapp.io')).toBeVisible();
});

test('Valida importe projeto exemplo Cronapp FC', async ({ page, context }, testInfo) => {
  test.setTimeout(360000);

  const projectExists = await webMobile.searchProject('Cronapp FC');
  if (projectExists) {
    await webMobile.deleteProject();
  }

  await page.keyboard.press('PageDown');

  await iframe.locator("//img[contains(@src, '/samples/cronapp-fc-sample.png')]").click();
  await page.waitForTimeout(3000);
  await iframe.locator('[tabindex="2"]').nth(0).click();
  await page.waitForTimeout(3000);

  await iframe.getByText(' Started').waitFor({ timeout: 250000 });
  await page.waitForTimeout(10000);

  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');

  await newPage.waitForLoadState('load');
  await newPage.waitForTimeout(2000);
  await newPage.isVisible('div[data-component="crn-image"]');
  await newPage.locator('#input-login-username').fill('admin');
  await newPage.locator('[type="password"]').fill('admin');
  await newPage.locator('button[aria-label="Entrar"]').click();

  await newPage.getByText('Admin').click();
  await newPage.getByText('Usuários').click();

  await expect(newPage.getByText('admin@cronapp.io')).toBeVisible();
});

// Testes para validar redirect após Logout

test('Valida Logout projeto exemplo Farmácia', async ({ page, context }, testInfo) => {
  test.setTimeout(300000);

  await webMobile.ideOpenProject('Controle de Farmácia');
  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');

  await newPage.waitForLoadState('load');
  await newPage.waitForTimeout(2000);
  await newPage.isVisible('div[data-component="crn-image"]');
  await newPage.locator('#input7274').fill('admin');
  await newPage.locator('[type="password"]').fill('admin');
  await newPage.locator('[type="submit"]').click();

  await newPage.getByText('Perfil').click();
  await newPage.getByText('Sair').click();

  await newPage.waitForSelector('[src="img/logo-pharma-manager.png"]');
  await expect(newPage.locator('[src="img/logo-pharma-manager.png"]')).toBeVisible();

});

test('Valida Logout projeto exemplo CronappFood', async ({ page, context }, testInfo) => {
  test.setTimeout(300000);

  await webMobile.ideOpenProject('Cronapp Food');
  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');

  await newPage.waitForLoadState('load');
  await newPage.waitForTimeout(2000);
  await newPage.isVisible('div[data-component="crn-image"]');
  await newPage.locator('#input7274').fill('admin');
  await newPage.locator('[type="password"]').fill('admin');
  await newPage.locator('[type="submit"]').click();

  await newPage.getByText('Perfil').click();
  await newPage.getByText('Sair').click();

  await newPage.waitForSelector('[src="public/assets/background-cronappfood.png"]');
  await expect(newPage.locator('[src="public/assets/background-cronappfood.png"]')).toBeVisible();

});

test('Valida Logout projeto exemplo Techne Bet', async ({ page, context }, testInfo) => {
  test.setTimeout(300000);

  await webMobile.ideOpenProject('Techne Bet');
  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');

  await newPage.waitForLoadState('load');
  await newPage.waitForTimeout(2000);
  await newPage.isVisible('div[data-component="crn-image"]');
  await newPage.locator('[type="text"]').fill('admin');
  await newPage.locator('[type="password"]').fill('admin');
  await newPage.locator('button[aria-label="Entrar"]').click();

  await newPage.getByText('Perfil').click();
  await newPage.getByText('Sair').click();

  await newPage.waitForSelector('[src="img/logo-cup.png"]');
  await expect(newPage.locator('[src="img/logo-cup.png"]')).toBeVisible();

});

test('Valida Logout projeto exemplo Crapp Pit', async ({ page, context }, testInfo) => {
  test.setTimeout(300000);

  await webMobile.ideOpenProject('Pit');
  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');

  await newPage.waitForLoadState('load');
  await newPage.waitForTimeout(2000);
  await newPage.isVisible('#container-second');
  await newPage.locator('#input-login-username').fill('admin');
  await newPage.locator('#input-login-password').fill('admin');
  await newPage.locator('button[aria-label="Entrar"]').click();

  await newPage.getByText('Perfil').click();
  await newPage.getByText('Sair').click();

  await newPagepage.waitForSelector('#container-second');
  await expect(newPage.locator('#container-second')).toBeVisible();

});

test('Valida Logout projeto exemplo Cronapp FC', async ({ page, context }, testInfo) => {
  test.setTimeout(30000);

  await webMobile.ideOpenProject('Cronapp FC');
  await webMobile.runProject();
  await webMobile.openProject('web');

  newPage = await context.waitForEvent('page');

  await newPage.isVisible('div[data-component="crn-image"]');
  await newPage.locator('#input7274').fill('admin');
  await newPage.locator('[type="password"]').fill('admin');
  await newPage.locator('[type="submit"]').click();

  await newPage.getByText('Perfil').click();
  await newPage.getByText('Sair').click();

  await newPagepage.waitForSelector('[src="public/assets/cronapp-fc.png"]');
  await expect(newPage.locator('[src="public/assets/cronapp-fc.png"]')).toBeVisible();


});
