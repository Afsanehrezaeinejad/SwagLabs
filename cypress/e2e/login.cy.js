describe('check title',()=>{
    it('should login as standar user',()=>{
        cy.visit('/')
        cy.url().should('include','saucedemo')
        cy.title().should('include','Swag Labs')
        cy.login('standard')
    })
})