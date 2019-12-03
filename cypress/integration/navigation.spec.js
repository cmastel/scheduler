describe("Navigation", () => {

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains('li', 'Tuesday')
      .click()
      // .should("have.css", "background-color", "rgb(242, 242, 242)");
      .should("have.class", "day-list__item--selected");

  })
});
