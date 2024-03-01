describe('Testing Userflow', () => {
  it('Navigates to the Login Page Successfully', () => {
    cy.visit('http://localhost:4200/');
    cy.get('h1');
    cy.get('[data-cy=loginLink]').click();
    cy.url().should('include', 'login');
  });

  it('Authenticates the User to the User dashboard', () => {
    cy.visit('http://localhost:4200/login');

    cy.url().should('include', 'login');
  });
});
