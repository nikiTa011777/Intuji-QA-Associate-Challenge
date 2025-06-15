import users from '../fixtures/userList.json';

describe('Logout and Re-login', () => {
  const user = users[2]; 
  it('Logs out and re-logs in using the first user from the list', () => {
    cy.login(user.email, user.password);

    cy.contains('Logout').click();
    cy.url().should('include', '/login');

    cy.login(user.email, user.password);
    cy.contains(`Logged in as ${user.name.split(' ')[0]}`).should('exist');
  });
});
