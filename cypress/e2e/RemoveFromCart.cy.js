describe('Remove item from cart',()=>{
    it('should remove item from cart',()=>{
        cy.visit('/')
        cy.login('standard')
        cy.addToCart('Sauce Labs Backpack','Sauce Labs Bike Light')
        cy.removeFromCart('Sauce Labs Bike Light')
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="inventory-item"]').each(($el)=>{
            cy.wrap($el).find('[data-test="inventory-item-name"]').invoke('text').then((text)=>{
                const title = text.trim()
                expect(title).not.to.equal('Sauce Labs Bike Light')
            })
            
        })

    })
})