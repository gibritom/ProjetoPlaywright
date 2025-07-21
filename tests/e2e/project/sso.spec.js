import { InitialNavegate } from '../../pages/InitialNavegate';
import { WebMobile } from '../../pages/project/lowCode/WebMobile';
import { test, expect } from '@playwright/test';

let initialNavegate, image, webMobile;

test.beforeEach(async ({ page, context }) => {
  initialNavegate = new InitialNavegate(page, context);
  webMobile = new WebMobile(page, context);
});

test.afterEach(async ({ page, context }, testInfo) => {
  await testInfo.attach('screenshot', {
    body: image,
    contentType: 'image/png',
  });
});

test.skip('Valida login via SSO', async ({ page, context }, testInfo) => {
  test.setTimeout(120000);
  await initialNavegate.visit();
  await initialNavegate.ideLogin();
  await initialNavegate.openProject('cron-auth-sso');
  await webMobile.runProject('web');
  const newPage = await context.waitForEvent('page');
  await webMobile.loginWithSSO(newPage);
  await expect(newPage.getByText('Home')).toBeVisible();
  image = await newPage.screenshot();
});
