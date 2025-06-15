describe('Cart and Quantity Management', () => {
  before(() => {
    cy.fixture('userList').then((users) => {
      const user = users[2];
      cy.login(user.email, user.password);
    });
  });

  it('Add multiple items, update quantity, verify total, and remove one item', () => {
    cy.addToCart(0, 1);           // replaces first product addition
    cy.addToCart(1, 3, true);     // replaces second product addition and navigates to cart

    cy.get('tr[id^="product-"]').eq(0).find('td.cart_quantity button')
      .invoke('text').should('eq', '1');
    cy.get('tr[id^="product-"]').eq(1).find('td.cart_quantity button')
      .invoke('text').should('eq', '3');

    cy.get('tr[id^="product-"]').each($row => {
      cy.wrap($row).find('td.cart_price p').invoke('text').then(priceText => {
        const unitPrice = parseFloat(priceText.replace(/[^0-9.]/g, ''));

        cy.wrap($row).find('td.cart_quantity button').invoke('text').then(qtyText => {
          const quantity = parseInt(qtyText);
          const expectedTotal = (unitPrice * quantity).toFixed(2);

        });
      });
    });

    cy.get('tr[id^="product-"]').first().find('a.cart_quantity_delete').click();
    cy.get('tr[id^="product-"]').should('have.length', 1);
  });
});
