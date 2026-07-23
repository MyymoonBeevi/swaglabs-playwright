import { test, expect } from '../../fixtures/test-base';
import { USERS } from '../../data/users';
import { ERROR_MESSAGES } from '../../utils/constants';

test.describe('Login', () => {
  test('standard user logs in successfully', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('locked out user sees error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
    await expect(loginPage.errorMessage).toBeVisible();
    expect(await loginPage.getErrorText()).toContain(ERROR_MESSAGES.lockedOut);
  });

  test('invalid credentials show error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('bad_user', 'wrong_pass');
    expect(await loginPage.getErrorText()).toContain(ERROR_MESSAGES.invalidCredentials);
  });

  test('empty username shows required error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('', USERS.standard.password);
    expect(await loginPage.getErrorText()).toContain(ERROR_MESSAGES.missingUsername);
  });

  test('empty password shows required error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(USERS.standard.username, '');
    expect(await loginPage.getErrorText()).toContain(ERROR_MESSAGES.missingPassword);
  });

  // Data-driven: verify every non-locked user can log in
  const loginableUsers = Object.values(USERS).filter((u) => u.username !== USERS.lockedOut.username);

  for (const user of loginableUsers) {
    test(`${user.username} can log in (${user.description})`, async ({ loginPage, page }) => {
      await loginPage.open();
      await loginPage.login(user.username, user.password);
      await expect(page).toHaveURL(/inventory.html/);
    });
  }
});
