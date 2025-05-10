import { test, expect } from '@playwright/test'
import { RegisterPage } from '../pages/register.page'
import { userData } from '../data/testdata';
import { UserApiClient } from '../api-clients/user.api-client';

const authToken = 'mi-token-super-secreto';

test.beforeAll(async ({ request }) => {
  const userApi = new UserApiClient(request);

  for (const email of [userData.email]) {
    const user = await userApi.findUserByEmail(email);

    if (user?.id) {
      const deletedUser = await userApi.deleteUserById(user.id, authToken);
      console.log(`Usuario ${email} eliminado:`, deletedUser);
    } else {
      console.log(`Usuario ${email} no encontrado.`);
    }
  }
});

test.describe('@functional', () => {
  test('debería mostrar un alert luego de registrar', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goTo();
    await registerPage.fillName(userData.name);
    await registerPage.fillLastName(userData.lastname);
    await registerPage.fillEmail(userData.email);
    await registerPage.fillPassword(userData.password);
    await registerPage.clickRegisterButton();

    const resultedDialogMessage = await registerPage.waitForAlertAfterSubmit();
    const expectedDialogMessage = "Registration successful! Redirecting to login...";
    expect(resultedDialogMessage).toBe(expectedDialogMessage);
  });
});

