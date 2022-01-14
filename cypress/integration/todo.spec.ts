describe('Todos', () => {
  it('should login, navigate to todos page & add a todo', () => {
    cy.login('ram@test.com', 'test123');
    cy.get('a[href*="todoList"]').click();
    cy.url().should('include', '/todoList');
    cy.get('.btn').click();
    cy.addATodo('Sing a song', 'Sing', 'March 12', 'In progress.');
    cy.url().should('include', '/todolist');
  })
})
