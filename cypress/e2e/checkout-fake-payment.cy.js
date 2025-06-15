import users from '../fixtures/userList.json';
describe('Checkout Flow with Fake Payment', () => {
    const user = users[2]; // Declare user at the top for clarity
  it('Completes checkout with fake card', () => {
    cy.login(user.email, user.password);
    cy.contains('Cart').click();
    cy.contains('Proceed To Checkout').click();
    cy.get('#address_delivery').should('contain.text', user.address);
    cy.get('textarea[name="message"]').type('Please deliver ASAP.');
    cy.contains('Place Order').click();
    cy.get('input[name="name_on_card"]').type(user.name);
    cy.get('input[name="card_number"]').type('4111111111111111');
    cy.get('input[name="cvc"]').type('123');
    cy.get('input[name="expiry_month"]').type('12');
    cy.get('input[name="expiry_year"]').type('2027');
    cy.get('#submit').click();
    cy.contains('Order Placed!').should('exist');
  });
});

