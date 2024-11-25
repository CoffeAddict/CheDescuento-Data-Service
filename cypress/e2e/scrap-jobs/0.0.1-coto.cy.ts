/// <reference types="cypress" />

// TODO: add linter to project

describe('Web Scrapping with Cypress', () => {
  it('Scrapes titles and links from a page', () => {
    // Visit the page
    cy.visit('https://www.coto.com.ar/descuentos/index.asp');

    let scrappedData: any[] = [];

    cy.get('#discounts .grid-item').each((el) => {
      const $el = Cypress.$(el); // Wrap with jQuery
      const title = $el.find('p:nth-child(1)').text();
      //TODO: scrap all data from cards

      if (title) scrappedData.push({ title });
    }).then(() => {
        // TODO : send data to a formatter function
        // TODO: save the data to a file using saveDataToFile
    });

    cy.get('#discounts .grid-item').should('have.length', 1);
  });
});