describe('signs up for the website', () => {
  beforeEach(() => {
    cy.request('DELETE', 'http://localhost:3000/api/user');
    cy.visit('http://localhost:3000/');
  });

  it('signs up for an account', () => {
    // make sure there is a sign up button that is can be clicked
    cy.get('#sign-up-button').should('have.text', 'Sign up').click();

    // no errors should appear for the form
    cy.get('#sign-up-name-error').should('not.exist');
    cy.get('#sign-up-email-error').should('not.exist');
    cy.get('#sign-up-password-error').should('not.exist');
    cy.get('#sign-up-confirm-password-error').should('not.exist');

    // input name, email, password, and INCORRECT confirmed password
    cy.get('#sign-up-name').type('Julius Caesar');
    cy.get('#sign-up-email').type('juliuscaesar@test.com');
    cy.get('#sign-up-password').type('thi!spas%sword%i(sst^rong)');
    cy.get('#sign-up-confirm-password').type('this-password-is-not-the-same');

    // click submit and an error should appear for the confirm password
    cy.get('#sign-up-submit').click();
    cy.get('#sign-up-confirm-password-error').should(
      'have.text',
      'The passwords do not match!'
    );

    // clear the confirm and retype the correct confirmed password
    cy.get('#sign-up-confirm-password')
      .clear()
      .type('thi!spas%sword%i(sst^rong)');
    cy.get('#sign-up-submit').click();

    // sign into that account
    cy.get('#sign-in-button');
  });
});
