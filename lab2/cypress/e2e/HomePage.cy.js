describe('Home Page', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('/')
  });

  it('displays the list of news', () => {
    // Check if there is at least one news block
    cy.get('.news-card').should('have.length.greaterThan', 0);
  });

  it('each news card contains title, summary, and read more button', () => {
    // Check if each news card has a title, summary, and "Read more" button
    cy.get('.news-card').each(($el) => {
      cy.wrap($el).find('.headline').should('exist');
      cy.wrap($el).find('.summary').should('exist');
      cy.wrap($el).find('a').contains('Read more').should('exist');
    });
  });

  it('read more button navigates to the news detail page', () => {
    // Click on the "Read more" button and check navigation to the news detail page
    cy.get('.news-card').first().find('a').contains('Read more').click();
    cy.url().should('include', '/news/');
  });
});
