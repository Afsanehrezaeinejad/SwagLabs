describe('Buy under 10$ items',()=>{
    beforeEach(()=>{
        cy.visit('/')
        cy.login('standard')
    })
it('should buy all the items under 10$',()=>{
cy.addToCart('Sauce Labs Backpack')
cy.checkout()
})
})