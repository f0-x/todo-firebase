// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): typeof login
    addATodo(detail: string, short: string, date: string, status: string): typeof addATodo
  }
}

function login(email: string, password: string): void {
    cy.visit('/login')
    cy.url().should('include', 'login');
    cy.get('[formControlName = "email"]').type(email);
    // ASSERTS the email address gets updated in the DOM
    cy.get('[formControlName = "email"]').should("have.value", email);
    cy.get('[formControlName = "password"]').type(password);
    // ASSERTS the password updated in the DOM
    cy.get('[formControlName = "password"]').should("have.value", password);
    cy.get('[id= "login-button"]').should('not.be', 'disabled').click();
    cy.url().should('not.include', 'dashboard');
}

function addATodo(detail: string, short: string, date: string, status: string){
    cy.visit('/todoAdd');
    cy.url().should('include', 'todoAdd');
    cy.get('[formControlName= "detail"]').type("Sing a song");
    cy.url().should('include', '/todoAdd');
    cy.get('[formControlName= "short"]').type("Sing");
    cy.get('[formControlName= "date"]').type("March 27"); cy.get('[formControlName= "status"]').type("In Progress...");
    cy.get('[id="todo-add-button"]').click();
    cy.url().should('not.include', '/todolist');
}

// NOTE: You can use it like so:
Cypress.Commands.add('login', login);
Cypress.Commands.add('addATodo', addATodo);

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
