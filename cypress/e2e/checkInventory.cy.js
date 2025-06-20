describe('check there are 6 items in inventory',()=>{
    it('should have 6 items',()=>{
        cy.visit('/')
        cy.login()
        cy.get('[data-test="inventory-item"]').should('have.length',6)
        cy.checkCartIsEmpty()
    })
})