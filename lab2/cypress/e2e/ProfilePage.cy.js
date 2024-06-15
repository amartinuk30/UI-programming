describe('Profile Page', () => {
  beforeEach(() => {
    // Visit the profile page before each test
    cy.visit('/profile')
  })

  it('displays the user profile information', () => {
    // Verify that the user profile information is displayed correctly
    cy.get('h2').should('contain', 'testuser')
    cy.get('.info-item').should('contain', 'test@example.com')
  })

  it('allows uploading a photo', () => {
    // Simulate the photo upload process
    const filePath = 'path/to/photo.jpg' // Provide the path to a sample photo
    cy.get('input[type="file"]').attachFile(filePath)
    cy.get('button').contains('Upload').click()

    // Verify that the photo is displayed after upload
    cy.get('img').should('have.attr', 'src').and('include', 'photo.jpg')
  })

  it('allows logging out', () => {
    // Click the logout button and verify the logout action
    cy.get('[data-testid="logout-btn"]').click()
    cy.url().should('include', '/login')
    cy.contains('Logout successful!').should('exist')
  })
})
