describe('Working with fixtures', () => {
  let data: { email: string; password: string };

  before(() => {
    cy.fixture('login').then((info) => {
      data = info;
    });
  });

  it('logs in user using fixture data', () => {
    cy.visit('/login');

    cy.get('.email').type(data.email);
    cy.get('.password').type(data.password);
    cy.get('.loginbtn')
      .click()
      .then((el) => {
        cy.location('pathname').should('not.eq', '/login');
        cy.location('pathname').should('equal', '/user');
        cy.get('[data-cy="logout-link"]');
      });
  });
});

describe('Working with fixtures with multiple data', () => {
  let data: { email: string; password: string };

  before(() => {
    cy.fixture('login').then((info) => {
      data = info;
    });
  });

  it('iterates through login2 data and tries to login', () => {
    cy.visit('/login');

    cy.fixture('login2.json').then((dataarray) => {
      dataarray.forEach((data: { email: string; password: string }) => {
        cy.get('.email').type(data.email);
        cy.get('.password').type(data.password);

        if (data.email == 'admin@yopmail.com' && data.password == 'admin') {
          cy.get('.loginbtn')
            .click()
            .then((el) => {
              cy.location('pathname').should('equal', '/admin/view-users');
              cy.get('[data-cy="logout-link"]').click();
              cy.visit('/login');
            });
        } else if (
          data.email == 'admin@yopmail.com' &&
          data.password !== 'admin'
        ) {
          cy.get('.loginbtn').click();
          cy.contains('Incorrect password');
        }
      });
    });
  });
});

describe('Requests without hitting the backend', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should handle login post request', () => {
    cy.intercept('POST', 'http://localhost:3001/users/login', {
      body: {
        message: 'Logged in successfully',
      },
    }).as('loginRequest');

    cy.get('.loginbtn').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.request.body).to.exist;

      cy.get('.success-msg').should('contain', 'Logged in successfully');
    });
  });
});
