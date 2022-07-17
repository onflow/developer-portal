describe("Sitemap", () => {
  let urls: any[] = []

  before(() => {
    cy.request("sitemap.xml")
      .as("sitemap")
      .then((response) => {
        urls = Cypress.$(response.body)
          .find("loc")
          .toArray()
          .map((el) => el.innerText)
      })
  })

  it("should succesfully load each url in the sitemap", () => {
    urls.forEach((url) => cy.visit({ url, failOnStatusCode: false }))
  })
})
