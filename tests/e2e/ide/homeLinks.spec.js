import { InitialNavegate } from '../../pages/InitialNavegate';
import { test, expect } from '@playwright/test';

let initialNavegate, image, newPage;

test.beforeEach(async ({ page, context }) => {
  test.setTimeout(65000);

  initialNavegate = new InitialNavegate(page, context);
  await initialNavegate.visit();
  await initialNavegate.ideLogin();
});

test.afterEach(async ({}, testInfo) => {
  await testInfo.attach('screenshot', {
    body: image,
    contentType: 'image/png',
  });
  await newPage.close();
  await initialNavegate.ideLogout();
});

test('Valida link Webinars', async ({ context }) => {
  test.setTimeout(65000);

  await initialNavegate.navegateToLink('Webinars');
  newPage = await context.waitForEvent('page');

  await expect(
    newPage.getByText('Nossos webinars abordam temas como inovação, mercado de tecnologia e desenvolvimento')
  ).toBeVisible();
  image = await newPage.screenshot();
});

test('Valida link Boas Práticas', async ({ context }) => {
  test.setTimeout(65000);

  await initialNavegate.navegateToLink('Boas Práticas');
  newPage = await context.waitForEvent('page');

  await expect(newPage.locator('#title-text')).toBeVisible();
  image = await newPage.screenshot();
});
