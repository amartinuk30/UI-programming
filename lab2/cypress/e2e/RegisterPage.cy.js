describe('Register Page', () => {
  beforeEach(() => {
    // Visit the registration page before each test
    cy.visit('/register')
  });

  it('displays the registration form with all fields', () => {
    // Check that all input fields are present
    cy.get('[data-test="username"]').should('exist');
    cy.get('[data-test="email"]').should('exist');
    cy.get('[data-test="gender"]').should('exist');
    cy.get('[data-test="birthdate"]').should('exist');
    cy.get('[data-test="about"]').should('exist');
    cy.get('[data-test="password"]').should('exist');
    cy.get('[data-test="registerButton"]').should('exist');
  });

  it('allows a user to register', () => {
    // Fill in the form
    cy.get('[data-test="username"]').type('testuser');
    cy.get('[data-test="email"]').type('test@example.com');
    cy.get('[data-test="gender"]').click().get('.v-list-item__title').contains('Male').click();
    cy.get('[data-test="birthdate"]').type('1990-01-01');
    cy.get('[data-test="about"]').type('Just a test user');
    cy.get('[data-test="password"]').type('password');

    // Submit the form
    cy.get('[data-test="registerButton"]').click();

    // Check for successful registration
    cy.url().should('include', '/login');
    cy.contains('Registration successful!');
  });

  it('shows validation errors for empty fields', () => {
    // Try to submit the form without filling it
    cy.get('[data-test="registerButton"]').click()

    // Check for validation errors
    cy.contains('Username is required').should('exist')
    cy.contains('Email is required').should('exist')
    cy.contains('Gender is required').should('exist')
    cy.contains('Birthdate is required').should('exist')
    cy.contains('Password is required').should('exist')
  })
})
