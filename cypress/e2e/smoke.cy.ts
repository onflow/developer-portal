describe("smoke tests", () => {
  it("Should load all main pages without error", () => {
    cy.visit("http://localhost:3000")

    cy.get(".text-h1").should("include.text", "Developer Portal")

    cy.get('a[href*="/getting-started"]:contains("Get started")').click()
    cy.location("pathname").should("eq", "/getting-started")
    cy.get(".text-h1").should("include.text", "Getting Started")

    cy.get('img[alt*="Flow Developers"]').parent().click()

    cy.get('a[href*="/tools"]:contains("View all tools")').click()
    cy.location("pathname").should("eq", "/tools")
    cy.get(".text-h1").should("include.text", "Tools")

    cy.get('img[alt*="Flow Developers"]').parent().click()

    cy.get("footer").within(($footer) => {
      cy.get('a[href*="/learn"]:contains("Learning Resources")').click()
    })
    cy.location("pathname").should("eq", "/learn")
    cy.get(".text-h1").should("include.text", "Learn")

    cy.get('img[alt*="Flow Developers"]').parent().click()

    cy.get('a[href*="/community"]:contains("Go to Community")').click()
    cy.location("pathname").should("eq", "/community")
    cy.get(".text-h1").should("include.text", "Community")

    cy.end()
  })
})
