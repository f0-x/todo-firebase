describe('Login', () => {
  it('should not login if the form is invalid', () => {
    cy.visit('/login')
    cy.url().should('include', 'login');
    cy.get('[formControlName = "email"]').type('ram@test.com');
    cy.get('[id= "login-button"]').click();
    cy.url().should('not.include', 'dashboard');
  })

  it('should login if the form is valid', () => {
/*     cy.visit('/login')
    cy.url().should('include', 'login');
    cy.get('[formControlName = "email"]').type('ram@test.com');
    cy.get('[formControlName = "password"]').type('test123');
    cy.pause();
    cy.get('[id= "login-button"]').click(); */
// Replacing all the boilerplate above with a single method defined in commands.ts
    cy.login('ram@test.com', 'test123');
    cy.url().should('include', 'dashboard');
  })
})
