/* eslint-disable */
/// <reference types="cypress" />

context("Main page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("render page", () => {
    cy.get("#container-main");
  });

  it("civilizations length", () => {
    cy.get("#civilizations-list div").should("have.length", 32);
  });
});
