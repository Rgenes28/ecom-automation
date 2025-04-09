test('Register Passed',async({page})=>{
    const registerPage = new RegisterPage(page);
    await registerPage.goTo();
    await registerPage.fillRegisterUser(userData.name,
        userData.lastname,
        userData.email,
        userData.password
    );
    // assertions
    expect(page.getByRole('heading',{name:"Log in"})).toBeVisible();
    await page.waitForTimeout(10000);

    //await page.pause();
    /*
    await registerPage.fillName(userData.name);
    await registerPage.fillLastName(userData.lastname);
    await registerPage.fillEmail(userData.email);
    await registerPage.fillPassword(userData.password);
    await registerPage.clickRegisterButton();
    */
    await page.waitForTimeout(10000);
});

test('Login Passed', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
  
    
    await loginPage.loginCredentials(userData.email,userData.password);

    //assertions
    expect( page.getByRole('link', {name:'Dashboard'})).toBeVisible();
    //await page.waitForSelector('ul > li:nth-child(1) > a');
    
    await page.pause();

    //await page.waitForTimeout(10000);

});test('Register Passed',async({page})=>{
    const registerPage = new RegisterPage(page);
    await registerPage.goTo();
    await registerPage.fillRegisterUser(userData.name,
        userData.lastname,
        userData.email,
        userData.password
    );
    // assertions
    expect(page.getByRole('heading',{name:"Log in"})).toBeVisible();
    await page.waitForTimeout(10000);

    //await page.pause();
    /*
    await registerPage.fillName(userData.name);
    await registerPage.fillLastName(userData.lastname);
    await registerPage.fillEmail(userData.email);
    await registerPage.fillPassword(userData.password);
    await registerPage.clickRegisterButton();
    */
    await page.waitForTimeout(10000);
});

test('Login Passed', async({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
  
    
    await loginPage.loginCredentials(userData.email,userData.password);

    //assertions
    expect( page.getByRole('link', {name:'Dashboard'})).toBeVisible();
    //await page.waitForSelector('ul > li:nth-child(1) > a');
    
    await page.pause();

    //await page.waitForTimeout(10000);

});

implementacion de test.step//

test('Register Passed and login',async({page})=>{
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);

    await test.step('Register User', async () => {
        await registerPage.goTo();
        await registerPage.fillRegisterUser(userData.name,
        userData.lastname,
        userData.email,
        userData.password
    )
    // assertions
    // Espera a que la redirección a Login ocurra
    await page.waitForURL('**/login', { timeout: 10000 });
    expect(page.getByRole('heading',{name:"Log in"})).toBeVisible();
    await page.waitForTimeout(10000);
    });
    

    await test.step('Login Passed', async () => {
        await loginPage.goTo();
        await loginPage.loginCredentials(userData.email,userData.password);

        //assertions
        expect( page.getByRole('link', {name:'Dashboard'})).toBeVisible();


        await page.pause();
        
    });

});



