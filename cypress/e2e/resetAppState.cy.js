describe('reset app state should empty the cart',()=>{
    it('should reset the app state',()=>{
    cy.visit('/')
    cy.login()
    cy.addToCart('Sauce Labs Fleece Jacket')
    cy.get('[data-test="shopping-cart-badge"]').should('contain','1')
    cy.contains('Open Menu').click()
    cy.contains('Reset App State').click()
    cy.get('[data-test="shopping-cart-link"]').then((el)=>{
        cy.wrap(el).should('not.contain.html','[data-test="shopping-cart-badge"]')
    })
    })
    })