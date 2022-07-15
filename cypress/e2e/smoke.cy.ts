describe("smoke tests", () => {
  it("Should load all main pages without error...", () => {
    cy.visit("http://localhost:3000")

    cy.get(".text-h1").should("include.text", "Developer Portal")

    cy.get('a[href*="/getting-started"]:contains("Get started")').click()
    cy.location("pathname").should("eq", "/getting-started")
    cy.get(".text-h1").should("include.text", "Getting Started")

    cy.get('img[alt*="Flow Developers"]').parent().click()

    cy.get('a[href*="/tools"]:contains("View all tools")').click({
      multiple: true,
    })
    cy.location("pathname").should("eq", "/tools")
    cy.get(".text-h1").should("include.text", "Tools")

    cy.get(
      'div:contains("All the resources you need to learn and build.")'
    ).click()
    cy.location("pathname").should("eq", "/learn")
    cy.get(".text-h1").should("include.text", "Learn")

    cy.end()
  })
})
