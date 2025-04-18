import {test, expect} from '@playwright/test'
import { RegisterPage} from '../pages/register.page'
import { userData } from '../data/testdata';

const authToken = 'mi-token-super-secreto';

test.afterEach(async ({ request }) => {
  const response = await request.get(`https://automation-portal-bootcamp.vercel.app/api/user?email=${userData.email}`);
  const user = await response.json();
  
  console.log(user.id); // **Este es el id del usuario encontrado por email**
   
    // **Tarea:**
    // Desarrollen la lógica restante:
    // - Usen request.delete para eliminar el usuario utilizando su id.
    // - Implementen la limpieza de datos después del test.
  if (user?.id) {
    const deleteUser = await request.delete(
      `https://automation-portal-bootcamp.vercel.app/api/user/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
    console.log(`Usuario eliminado correctamente: ${userData.email}`);
  } else {
    console.warn(`Usuario no encontrado para eliminar: ${userData.email}`);
  }
});
  

test('Register Passed',async({page})=>{
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
    
 
