import { before } from "mocha";

describe("Visits Login url", () => {
  it("passes", () => {
    cy.visit("http://192.168.0.100:3000/");
  });
});


beforeEach(() => {
    cy.visit("http://192.168.0.100:3000/");
    cy.get('[data-cy="Username"]').type("admin");
    cy.get('[data-cy = "Password"]').type("manage123");
    cy.get('[data-cy = "login-button"]').click();
});



it("Adds a task", () => {

  //Testing add functionality
  cy.get('[data-cy="Add Task button"]').click();
  cy.get('[data-cy="Add Task Place"]').type("Test Add Task");
  cy.get('[data-cy="Add Task Submit"]').click();
  cy.get('[data-cy="Task List"]').should("contain", "Test Add Task");

});

it("Deletes a task", () => {
    
    //Testing delete functionality
    cy.get(':nth-child(1) > .tasklistview > .right > .text-negative > .q-btn__wrapper > .q-btn__content > .block').click();
    
})

it("Edits a task", () => {
      //Testing edit functionality
      cy.get(':nth-child(4) > .tasklistview > .right > .text-primary > .q-btn__wrapper > .q-btn__content > .block').click();
  cy.get('[data-cy="Edit Task Place"]').type(" Edit Done");
  cy.get('[data-cy="Edit Task Submit"]').click();

})


it("Completes a task", () => {
      //Testing Toggle functionality
      cy.get(':nth-child(3) > .tasklistview > .left > [data-cy="Task Checkbox"]').click();
})