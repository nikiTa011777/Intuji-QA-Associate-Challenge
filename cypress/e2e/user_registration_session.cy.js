import users from '../fixtures/userList.json';

describe('User Registration & Session Handling', () => {
  let userIndex = 0;

  before(() => {
    function tryRegister() {
      if (userIndex >= users.length) {
        throw new Error('No unique emails left in fixture.');
      }

      const user = users[userIndex];

      return cy.registerUser(user).then(success => {
        if (success) {
          cy.wrap(user).as('user');
          cy.contains(`Logged in as ${user.name.split(' ')[0]}`).should('exist');

          cy.getCookies().then((cookies) => {
            cy.wrap(cookies).as('savedCookies');
          });

          cy.window().then((win) => {
            cy.wrap({ ...win.localStorage }).as('savedLocalStorage');
          });
        } else {
          userIndex++;
          cy.log(`Email ${user.email} exists, trying next user...`);
          return tryRegister(); 
        }
      });
    }

    return tryRegister();
  });

  beforeEach(() => {
    cy.get('@savedCookies').then((cookies) => {
      cookies.forEach((cookie) => {
        cy.setCookie(cookie.name, cookie.value);
      });
    });

    cy.get('@savedLocalStorage').then((saved) => {
      cy.window().then((win) => {
        Object.entries(saved).forEach(([key, value]) => {
          win.localStorage.setItem(key, value);
        });
      });
    });
  });

  it('Should stay logged in on next test', () => {
    cy.visit('https://automationexercise.com');
    cy.get('@user').then((user) => {
      cy.contains(`Logged in as ${user.name.split(' ')[0]}`).should('exist');
    });
  });
});
