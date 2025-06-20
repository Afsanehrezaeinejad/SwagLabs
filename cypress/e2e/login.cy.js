describe('login with different users',()=>{
    it('should login successfully as standar user',()=>{
        cy.visit('/')
        cy.url().should('include','saucedemo')
        cy.title().should('include','Swag Labs')
        cy.login('standard')
        cy.url().should('include', '/inventory.html')
        cy.logout()
    })
    it('should login with locked out user',()=>
{
    cy.visit('/')
    cy.login('locked_out_user')
    cy.get('[data-test="error"]').should('contain','Epic sadface: Sorry, this user has been locked out.')
})
})