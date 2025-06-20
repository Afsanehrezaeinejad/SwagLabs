Cypress.Commands.add('login', (user = 'standard') => {
    cy.fixture('users').then((users)=>{
        const userData = users[user]
        cy.get('[data-test="username"]').type(userData.username)
        cy.get('[data-test="password"]').type(userData.password)
    })
    cy.get('[data-test="login-button"]').click()
  })
Cypress.Commands.add('logout',()=>{
    cy.get('#react-burger-menu-btn').click()
    cy.get('[data-test="logout-sidebar-link"]').click()
})
Cypress.Commands.add('addToCart', (...products) => {
    const productList = products.flat();
  
    productList.forEach((product) => {
      cy.get('body').then(($body) => {
        if ($body.find('[data-test="shopping-cart-badge"]').length) {
          cy.get('[data-test="shopping-cart-badge"]')
            .invoke('text')
            .then((oldCount) => {
              const oldBadgeCount = parseInt(oldCount.trim());
  
              cy.contains('[data-test="inventory-item-description"]', product)
                .parents('.inventory_item')
                .find('button')
                .click();
  
              cy.get('[data-test="shopping-cart-badge"]')
                .invoke('text')
                .should((newCount) => {
                  const newBadgeCount = parseInt(newCount.trim());
                  expect(newBadgeCount).to.eq(oldBadgeCount + 1);
                });
            });
        } else {
          cy.contains('[data-test="inventory-item-description"]', product)
            .parents('.inventory_item')
            .find('button')
            .click();
  
          cy.get('[data-test="shopping-cart-badge"]')
            .invoke('text')
            .should('eq', '1');
        }
      });
    });
  });
  
Cypress.Commands.add('checkout', () => {
    cy.get('[data-test="shopping-cart-link"]').click()
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
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('dummy')
        cy.get('[data-test="lastName"]').type('dummy')
        cy.get('[data-test="postalCode"]').type('dummy')
        cy.get('[data-test="continue"]').click()
  
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
Cypress.Commands.add('purchase',()=>{
    cy.get('[data-test="finish"]').click()
    cy.contains('Thank you for your order!').should('be.visible')
    cy.get('[data-test="back-to-products"]').click()
    const baseUrl = Cypress.config('baseUrl')
    cy.url().should('contain',`${baseUrl}inventory.html`)
})
Cypress.Commands.add('removeFromCart', (...products) => {
    const productList = products.flat()
  
    productList.forEach((product) => {
      cy.contains('[data-test="inventory-item-description"]', product)
        .parents('.inventory_item') 
        .find('button')
        .then(($button) => {
          const label = $button.text().trim()
          if (label === 'Remove') {
            cy.wrap($button).click()
          }
        })
    })
  })
  Cypress.Commands.add('verifyItemIsRemovedFromCart',(...products)=>{
    const productList = products.flat()
    productList.forEach((product)=>{
        const productName = product.trim()
        cy.get('[data-test="inventory-item"]').each(($el)=>{
            cy.wrap($el).find('[data-test="inventory-item-name"]').invoke('text').then((text)=>{
                const productLable = text.trim()
                expect(productLable).not.to.equal(productName)
            })
        })
    })
  })
  Cypress.Commands.add('verifyItemIsAddedToCart', (product) => {
    cy.contains('[data-test="inventory-item-name"]', product)
      .should('be.visible')
      .then(($el) => {
        cy.wrap($el)
          .closest('[data-test="inventory-item"]') 
          .find('button')
          .invoke('text')
          .then((text) => {
            const buttonLabel = text.trim()
            expect(buttonLabel).to.equal('Remove')
          })
      })
  })
Cypress.Commands.add('checkSortedAZ',(locator)=>{
    cy.get(locator).then((items)=>{
        const names = [...items].map(el=>el.innerText.trim())
        const sorted = [... names].slice().sort((a,b)=> a.localeCompare(b))
        expect(names).to.deep.equal(sorted)
    })
})
Cypress.Commands.add('checkSortedZA',(locator)=>{
    cy.get(locator).then((item)=>{
        const name = [... item].map(el=>el.innerText.trim())
        const sorted = [... name].slice().sort((a,b)=>b.localeCompare(a))
        expect(name).to.be.deep.equal(sorted)
    })
})
Cypress.Commands.add('checkSortedByPrice', (locator) => {
    cy.get(locator).then(($items) => {
      const prices = [...$items].map(el => parseFloat(el.innerText.replace('$', '').trim()))
      const sorted = [...prices].slice().sort((a, b) => a - b)
      expect(prices).to.deep.equal(sorted)
    })
  })
  
Cypress.Commands.add('checkSortedByPriceAsc',(locator)=>{
    cy.get(locator).then((items)=>{
        const price = [...items].map(el => parseFloat(el.innerText.replace('$', '').trim()))
        const sorted = [...price].slice().sort((a,b)=> b - a)
        expect(sorted).to.deep.equal(price)
    })
})
Cypress.Commands.add('checkCartIsEmpty',()=>{
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
    cy.get('[data-test="inventory-item-description"]').each(($el)=>{
        cy.wrap($el).find('button').invoke('text').should('eq', 'Add to cart');
    })
})