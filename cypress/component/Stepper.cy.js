const { default: Stepper } = require("../../src/Stepper");

describe("Stepper.cy.js", () => {
  const stepperSelector = "[data-testid=stepper]";
  const incrementSelector = "[aria-label=increment]";
  const decrementSelector = "[aria-label=decrement]";

  it("mounts", () => {
    cy.mount(<Stepper />);
  });

  it("should increase the initial number", () => {
    cy.mount(<Stepper initial={100} />);
    cy.get(incrementSelector).click();
    cy.get("[data-cy='counter']").should("contain.text", 101);
    cy.get(incrementSelector).click();
    cy.get("[data-cy='counter']").should("contain.text", 102);
    cy.get(decrementSelector).click();
    cy.get("[data-cy='counter']").should("contain.text", 101);
  });

  it("should fires a change event when button is clicked", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");
    cy.mount(<Stepper initial={50} onChange={onChangeSpy} />);
    cy.get(incrementSelector).click();
    cy.get("@onChangeSpy").should("have.been.calledOnceWith", 51); //one argument not value
    cy.get(stepperSelector).should("contain", 51);
  });
});
