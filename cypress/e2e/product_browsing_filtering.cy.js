describe('Product Browsing & Filtering', () => {
    it('Filters Women > Dress and verifies product detail', () => {
      cy.visit('https://automationexercise.com');
      cy.contains('Products').click();
      cy.url().should('include', '/products');
      cy.contains('Women').click();
      cy.contains('Dress').click();
      cy.get('.features_items').should('exist');
      cy.get('.productinfo.text-center').should('contain.text', 'Dress');
      cy.get('.product-image-wrapper').first().contains('View Product').click();
      cy.get('.product-information').within(() => {
        cy.get('h2').should('be.visible').and('not.be.empty');
        cy.get('span > span').invoke('text').then((text) => {
          const price = parseFloat(text.replace(/[^0-9.]/g, ''));
          expect(price).to.be.greaterThan(0);
        });
        cy.get('#quantity').invoke('val').then((val) => {
          const qty = parseInt(val);
          expect(qty).to.be.greaterThan(0);
        });
      });
    });
  });