describe('nft-metadata/home', () => {
  beforeEach(() => cy.visit('/'));

  it('should load the home page', () => {
    // Should be on home page.
    cy.get('.text-h1').contains('NFT Portal');
    // Should have buttons.
    cy.get(':nth-child(1) > .group > .ml-1 > .text-lg').contains('NFT Catalog');
    cy.get(':nth-child(2) > .group > .ml-1 > .text-lg').contains(
      'NFT Metadata Verifier'
    );
  });
});
