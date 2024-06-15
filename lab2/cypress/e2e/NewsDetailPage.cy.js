describe('News Detail Page', () => {
  beforeEach(() => {
    cy.visit('/news/1'); // Replace "1" with the actual news ID
  });

  it('displays news details', () => {
    // Verify that the news title, summary, and description are visible
    cy.get('.news-title').should('be.visible');
    cy.get('.news-summary').should('be.visible');
    cy.get('.news-description').should('be.visible');
  });

  it('adds a new comment', () => {
    const newComment = 'This is a new comment';

    // Type the new comment and click the add comment button
    cy.get('.comment-input').type(newComment);
    cy.get('.add-comment-btn').click();

    cy.wait(1000); // Wait for the new comment to be added

    // Verify that the new comment is added to the list
    cy.get('.v-list-item').last().should('contain', newComment);
  });

  it('displays existing comments', () => {
    // Wait for comments to load and ensure they are visible
    cy.wait(1000);
    cy.get('.v-list-item').should('have.length.greaterThan', 0);
  });

  it('deletes a comment', () => {
    // Wait for comments to load
    cy.wait(1000);

    // Verify there is at least one comment, then delete it
    cy.get('.v-list-item').should('have.length.greaterThan', 0);
    cy.get('.v-list-item').first().find('.v-btn').click();

    cy.wait(1000); // Wait for the comment to be deleted

    // Verify that the comment is deleted
    cy.get('.v-list-item').should('have.length.lessThan', 2);
  });
});
