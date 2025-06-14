Cypress.Commands.add('login', (user) => {
    cy.fixture('users').then((users)=>{
        const userData = users[user]
        cy.get('[data-test="username"]').type(userData.username)
        cy.get('[data-test="password"]').type(userData.password)
    })
    cy.get('[data-test="login-button"]').click()
    cy.url().should('include', '/inventory.html')
  })
Cypress.Commands.add('addToCart',(product)=>{
    cy.contains('[data-test="inventory-item-description"]', product)
    .parents('.inventory_item')
    .find('button')
    .click()
})

Cypress.Commands.add('checkout', () => {
    cy.get('[data-test="shopping-cart-link"]').click()
  
    // Step 1: Calculate total item price
    cy.get('[data-test="inventory-item-price"]')
      .then(($prices) => {
        let totalPrice = 0
        $prices.each((i, el) => {
          const priceText = Cypress.$(el).text().replace('$', '')
          totalPrice += parseFloat(priceText)
        })
        return totalPrice
      })
      .then((totalPrice) => {
        // Step 2: Proceed to checkout
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('dummy')
        cy.get('[data-test="lastName"]').type('dummy')
        cy.get('[data-test="postalCode"]').type('dummy')
        cy.get('[data-test="continue"]').click()
  
        // Step 3: Get tax and total and compare
        cy.get('[data-test="tax-label"]')
          .invoke('text')
          .then((taxText) => {
            const tax = parseFloat(taxText.replace('Tax: $', ''))
  
            cy.get('[data-test="total-label"]')
              .invoke('text')
              .then((totalText) => {
                const actualTotal = parseFloat(totalText.replace('Total: $', ''))
                const expectedTotal = parseFloat((totalPrice + tax).toFixed(2))
                expect(actualTotal).to.eq(expectedTotal)
              })
          })
      })
  })
  