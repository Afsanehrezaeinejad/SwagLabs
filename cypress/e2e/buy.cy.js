describe('Buy under 10$ items',()=>{
    beforeEach(()=>{
        cy.visit('/')
        cy.login('standard')
    })
it('should buy all the items under 10$',()=>{
cy.checkCartIsEmpty()
cy.addToCart('Sauce Labs Backpack','Sauce Labs Bike Light')
cy.verifyItemIsAddedToCart('Sauce Labs Backpack','Sauce Labs Bike Light')
cy.checkout()
cy.purchase()
})
})