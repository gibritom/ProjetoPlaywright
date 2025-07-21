import { DataBase } from '../../pages/ide/DataBase';
import { test, expect } from '@playwright/test';
import { WebMobile } from '../../pages/project/lowCode/WebMobile';

let dataBase;
const projectName = 'auto-project-db';

test.beforeEach(async ({ page, context }) => {
  test.setTimeout(65000);
  dataBase = new DataBase(page, context);

  await dataBase.visit();
  await dataBase.ideLogin();
});

test.afterEach(async ({ page }, testInfo) => {
  const image = await page.screenshot();

  await testInfo.attach('screenshot', {
    body: image,
    contentType: 'image/png',
  });

  await dataBase.ideLogout();
});

test(`Valida criação do projeto ${projectName}`, async ({ page, context }) => {
  test.setTimeout(1320000);

  let webMobile = new WebMobile(page, context);

  await webMobile.createProjectMobileWeb(projectName);
  await webMobile.runProject();
  await webMobile.openProject('web');

  let newPage = await context.waitForEvent('page');
  await webMobile.loginRunningWebmobile(newPage);
  await expect(newPage.getByText('admin@cronapp.io')).toBeVisible();
});

test('Valida o acesso a tela principal', async ({ page }) => {
  test.setTimeout(250000);

  await dataBase.ideOpenProject(projectName);
  await dataBase.accessDataBase();

  await expect(page.frameLocator('#main').getByText('jdbc/main')).toBeVisible();
});

test('Valida o acesso a tela adicionar banco de dados', async ({ page }) => {
  test.setTimeout(250000);

  await dataBase.ideOpenProject(projectName);
  await dataBase.accessDataBase();
  await dataBase.accessAddDataBase();
  await dataBase.savedAllchanges();

  await expect(page.frameLocator('#main').getByText('Novo banco de dados na nuvem')).toBeVisible();
});
