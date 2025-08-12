import React from 'react';
import Search from '../../src/components/Search';

describe('<Search />', () => {
  it('Render input and button', () => {
    cy.mount(<Search onSelectCity={() => { }} />);
    cy.get('[data-testid="search-input"]').should('exist');
    cy.get('[data-testid="search-button"]').should('contain', 'Search');
  });

  it('Update input value on typing', () => {
    cy.mount(<Search onSelectCity={() => { }} />);
    cy.get('[data-testid="search-input"]').type('Melbourne').should('have.value', 'Melbourne');
  });

  it('Fetches and shows Melbourne search results', () => {
    const mockResponse = [
      { name: "Melbourne", country: "AU", lat: -37.814, lon: 144.963 },
      { name: "Melbourne", country: "US", lat: 28.0788, lon: -80.6077 },
      { name: "Melbourne", country: "US", lat: 41.9430, lon: -93.1030 },
      { name: "Melbourne", country: "AU", lat: -37.8142, lon: 144.9655 },
      { name: "Melbourne CP", country: "GB", lat: 52.8228, lon: -1.4283 },
    ];

    cy.intercept('GET', '**/geo/1.0/direct*', {
      statusCode: 200,
      body: mockResponse,
    }).as('getMelbourneCities');

    cy.mount(<Search onSelectCity={() => { }} />);
    cy.get('[data-testid="search-input"]').type('Melbourne');
    cy.get('[data-testid="search-button"]').click();

    cy.wait('@getMelbourneCities');
    cy.get('[data-testid="search-results"]')
      .find('.search-result')
      .should('have.length', 5)
      .and('contain', 'Melbourne');
  });

  it('calls onSelectCity with correct data and clears results', () => {
    const mockResponse = [
      { name: "Melbourne", country: "AU", lat: -37.814, lon: 144.963 }
    ];

    const onSelectCity = cy.stub();

    cy.intercept('GET', '**/geo/1.0/direct*', {
      statusCode: 200,
      body: mockResponse,
    }).as('getMelbourneAU');

    cy.mount(<Search onSelectCity={onSelectCity} />);
    cy.get('[data-testid="search-input"]').type('Melbourne');
    cy.get('[data-testid="search-button"]').click();
    cy.wait('@getMelbourneAU');

    cy.get('.search-result').first().click();

    cy.wrap(onSelectCity).should('be.calledWith', {
      name: 'Melbourne',
      country: 'AU',
      lat: -37.814,
      lon: 144.963,
    });

    cy.get('[data-testid="search-results"]').should('not.exist');
  });
});