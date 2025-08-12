describe('Weather App E2E Test with MirageJS mock', () => {
    it('Show the app title', () => {
        cy.visit('http://localhost:5173');
        cy.contains('Weather Application');
    });
    it('Search for the city', () => {
        cy.visit('http://localhost:5173');
        cy.get('[data-testid="search-input"]').type('Melbourne');
        cy.contains('Search').click();
        cy.get('[data-testid="search-results"] .search-result').should('have.length', 5);
        cy.get('[data-testid="search-results"] .search-result').contains('Melbourne');
    });
    it('Select a city and display its weather', () => {
        cy.visit('http://localhost:5173');
        cy.get('[data-testid="search-input"]').type('Melbourne');
        cy.contains('Search').click();
        cy.get('[data-testid="search-results"] .search-result').first().click();
        cy.get('.cities-container .weather-container').should('exist');
        cy.get('.cities-container .weather-container').contains('Melbourne');
        cy.get('.cities-container .weather-container').contains('30.48');
        cy.get('.cities-container .weather-container').contains('Clouds');
    });
});