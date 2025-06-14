describe('add to cart and do the checkout', () => {
    it('should add items under $10 to the cart and checkout', () => {
      cy.visit('/');
  
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
  
      cy.get('.pricebar').each(($el) => {
        cy.wrap($el)
          .find('.inventory_item_price')
          .invoke('text')
          .then((text) => {
            const price = parseFloat(text.replace('$', ''));
            if (price < 10) {
              cy.wrap($el).find('button').click();
            }
          })
      })
      cy.then(() => {
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type('dummy');
        cy.get('[data-test="lastName"]').type('dummy');
        cy.get('[data-test="postalCode"]').type('dummy');
        cy.get('[data-test="continue"]').click();
  
        cy.get('[data-test="total-label"]')
          .invoke('text')
          .then((text) => {
            const price = parseFloat(text.replace(/[^0-9.]/g, ''));
            expect(price).to.be.lessThan(20);
          });
      });
    });
  });
  