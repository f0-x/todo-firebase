describe('Todos', () => {
  it('should login and navigate to todos page', () => {
    cy.login('ram@test.com', 'test123');
    cy.get('a[href*="todoList"]').click();
    cy.url().should('include', '/todoList');
  })
})
