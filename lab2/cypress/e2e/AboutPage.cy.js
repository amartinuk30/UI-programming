describe('About Page', () => {
  beforeEach(() => {
    // Visit the about page before each test
    cy.visit('/about')
  })

  it('displays the About Us title', () => {
    // Check if the title "About us" is displayed
    cy.get('.about-title').should('exist').and('have.text', 'About us')
  })

  it('displays the logo image', () => {
    // Check if the logo image is displayed and has the correct source
    cy.get('.about-image').should('exist')
      .and('have.attr', 'src').should('include', 'logo2.png')
  })

  it('displays the application description text', () => {
    // Check if the description text contains specific content
    cy.get('.about-text').should('exist')
      .and('contain', 'This web application is developed using the Vuetify framework')
  })
})
