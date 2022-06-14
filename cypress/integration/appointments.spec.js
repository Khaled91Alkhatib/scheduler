const { CYCLIC_KEY } = require("@storybook/addon-actions");

describe("appointments", () => {
  beforeEach(() => {
    // This is used to reset the database to its initial state
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("[data-testid=day]", "Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });
    cy.contains("Confirm").click();
    // The code below check if said component exists and then that it doesn't (after it dissappears as per out initial code)
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    // This will check that Archie Cohen no longer exist
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

});