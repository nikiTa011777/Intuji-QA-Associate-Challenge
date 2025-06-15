Cypress.Commands.add('registerUser', (user) => {
  cy.visit('https://automationexercise.com');
  cy.contains('Signup / Login').click();

  cy.get('input[data-qa="signup-name"]').clear().type(user.name);
  cy.get('input[data-qa="signup-email"]').clear().type(user.email);
  cy.get('button[data-qa="signup-button"]').click();

  return cy.get('body').then($body => {
    if ($body.text().includes('Email Address already exist!')) {
      return cy.wrap(false);
    } else {
      cy.get('#id_gender1').check();
      cy.get('#password').type(user.password);
      cy.get('#days').select('1');
      cy.get('#months').select('January');
      cy.get('#years').select('1990');
      cy.get('#first_name').type(user.name.split(' ')[0]);
      cy.get('#last_name').type(user.name.split(' ')[1] || 'Test');
      cy.get('#address1').type(user.address);
      cy.get('#state').type(user.state);
      cy.get('#city').type(user.city);
      cy.get('#zipcode').type(user.zip);
      cy.get('#mobile_number').type(user.mobile);
      cy.get('button[data-qa="create-account"]').click();
      cy.contains('Account Created!').should('exist');
      cy.get('a[data-qa="continue-button"]').click();

      return cy.wrap(true);
    }
  });
});


Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://automationexercise.com');
  cy.contains('Signup / Login').click();
  cy.get('input[data-qa="login-email"]').type(email);
  cy.get('input[data-qa="login-password"]').type(password);
  cy.get('button[data-qa="login-button"]').click();
});
