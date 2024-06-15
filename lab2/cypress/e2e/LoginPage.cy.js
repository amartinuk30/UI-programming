describe('Login Page', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/login')
  });

  it('displays the login form', () => {
    // Check if the login form is displayed correctly
    cy.contains('.headline', 'Login');
    cy.get('input[label="Email"]').should('exist');
    cy.get('input[label="Password"]').should('exist');
    cy.get('button').contains('Login').should('exist');
  });

  it('shows validation error if email is empty', () => {
    // Leave email empty and try to submit the form
    cy.get('input[label="Password"]').type('password');
    cy.get('button').contains('Login').click();

    // Check if validation error is displayed
    cy.contains('Email is required').should('exist');
  });

  it('shows validation error if password is empty', () => {
    // Leave password empty and try to submit the form
    cy.get('input[label="Email"]').type('test@example.com');
    cy.get('button').contains('Login').click();

    // Check if validation error is displayed
    cy.contains('Password is required').should('exist');
  });

  it('displays error message for invalid login', () => {
    // Fill in incorrect email and password
    cy.get('input[label="Email"]').type('wrong@example.com');
    cy.get('input[label="Password"]').type('wrongpassword');
    cy.get('button').contains('Login').click();

    // Check if error message is displayed
    cy.contains('Invalid email or password!').should('exist');
  });

  it('navigates to profile page on successful login', () => {
    // Fill in correct email and password
    cy.get('input[label="Email"]').type('test@example.com');
    cy.get('input[label="Password"]').type('correctpassword');
    cy.get('button').contains('Login').click();

    // Check if redirected to profile page
    cy.url().should('include', '/profile');
  });
});
