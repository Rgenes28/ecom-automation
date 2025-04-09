import {test, expect} from '@playwright/test'
import { RegisterPage} from '../pages/register.page'
import { userData } from '../data/testdata';
import {LoginPage} from  '../pages/login.page';
import {getUserByEmail} from '../utils/apiEcomus';
import { deleteUserById } from '../utils/apiEcomus';

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
        const deleteUser = await request.delete(`https://automation-portal-bootcamp.vercel.app/api/user/${user.id}`);
        console.log(`Usuario eliminado correctamente: ${userData.email}`);
      } else {
        console.warn(`Usuario no encontrado para eliminar: ${userData.email}`);
      }
  });
  /*
  test.afterEach(async ({ request }) => {
    const user = await getUserByEmail(request, userData.email);
  
    if (user?.id) {
      const deleted = await deleteUserById(request, user.id);
  
      if (deleted) {
        console.log(`Usuario eliminado correctamente: ${userData.email}`);
      } else {
        console.warn(`Falló al eliminar el usuario: ${userData.email}`);
      }
    } else {
      console.warn(`Usuario no encontrado para eliminar: ${userData.email}`);
    }
  });*/
  

test('Register Passed',async({page})=>{
    const registerPage = new RegisterPage(page);
    await registerPage.goTo();
    await registerPage.fillName(userData.name);
    await registerPage.fillLastName(userData.lastname);
    await registerPage.fillEmail(userData.email);
    await registerPage.fillPassword(userData.password);
    await registerPage.clickRegisterButton();
   
    // assertions
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe("Registration successful! Redirecting to login...");
        await dialog.accept();
      });
      
    //const resultedDialogMessage = await registerPage.waitForAlertAfterSubmit();
    //const expectedDialogMessage = "Registration successful! Redirecting to login...";
    //expect(resultedDialogMessage).toBe(expectedDialogMessage);
    //expect(page.getByRole('heading',{name:"Log in"})).toBeVisible();
    

    await page.pause();
    
    
    //await page.waitForTimeout(10000);
});
    
 /*await registerPage.fillRegisterUser(userData.name,
        userData.lastname,
        userData.email,
        userData.password
    );*/
