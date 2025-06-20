import { inventoryPageLocators } from '../support/locator'
describe('verify sorting',()=>{
    beforeEach(()=>{
        cy.visit('/')
        cy.login()
    })
    it('should sort from A-Z',()=>{
        cy.get('[data-test="product-sort-container"]').select('Name (A to Z)')
        cy.checkSortedAZ(inventoryPageLocators.productNames)
 
        })
    it('should sort from Z-A',()=>{
        cy.get('[data-test="product-sort-container"]').select('Name (Z to A)')
        cy.checkSortedZA(inventoryPageLocators.productNames)
    })
    it('should sort from cheapest to most expensive',()=>{
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')
        cy.checkSortedByPrice(inventoryPageLocators.productPrice)
    })
    it('should sort from most expensice to cheapest',()=>{
        cy.get('[data-test="product-sort-container"]').select('Price (high to low)')
        cy.checkSortedByPriceAsc(inventoryPageLocators.productPrice)
    })
    })