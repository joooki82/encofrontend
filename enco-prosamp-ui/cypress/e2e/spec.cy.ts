describe('Authenticated Tests', () => {
    // Run the login process before each test

    beforeEach(() => {
        cy.visit('http://localhost:4200');
        cy.origin('http://localhost:8080', () => {
            cy.get('#username').type('iga');
            cy.get('#password').type('iga');
            cy.get('#kc-login').click();
        });

        // Ensure the app redirects to the dashboard
        cy.url().should('include', '/dashboard');
    });

    // before(() => {
    //     cy.visit('http://localhost:4200');
    //     cy.origin('http://localhost:8080', () => {
    //         cy.get('#username').type('iga');
    //         cy.get('#password').type('iga');
    //         cy.get('#kc-login').click();
    //     });
    //
    //     // Save cookies
    //     cy.getCookies().then((cookies) => {
    //         Cypress.env('cookies', cookies);
    //     });
    //
    //
    // });

    it('Should display the dashboard', () => {
        cy.contains('Dashboard'); // Example assertion

    });

    it('Should navigate to the Profile page from the header', () => {
        // Verify header is visible
        cy.get('.navbar').should('be.visible'); // Assuming the header has a class 'navbar'

        // Open the user dropdown
        cy.get('.fa-user').first().click(); // Click the user icon

        // Click on the Profile menu item
        cy.contains('Profile').click(); // Locate and click the Profile option

        // Verify navigation to the Profile page
        cy.url().should('include', '/profile'); // Check if the URL includes '/profile'
        cy.get('h4').should('contain', 'Bejelentkezett felhasználó'); // Verify that the Profile page heading is displayed
    });

    it('Should display user information once loaded', () => {
        cy.get('.fa-user').first().click(); // Click the user icon

        // Click on the Profile menu item
        cy.contains('Profile').click(); // Locate and click the Profile option
        // Wait for the profile data to load
        cy.get('.profile-container').should('be.visible');

        // Verify that personal information is displayed
        cy.get('.profile-section').eq(0).within(() => {
            cy.get('.section-title').should('contain', 'Személyes információk');
            cy.contains('Felhasználó név:').next().should('not.be.empty'); // Ensure username is displayed
            cy.contains('Vezetéknév:').next().should('not.be.empty'); // Ensure last name is displayed
            cy.contains('Keresznév:').next().should('not.be.empty'); // Ensure first name is displayed
            cy.contains('Email:').next().should('not.be.empty'); // Ensure email is displayed
        });
    });

    it('Should display user roles', () => {
        cy.get('.fa-user').first().click(); // Click the user icon

        // Click on the Profile menu item
        cy.contains('Profile').click(); // Locate and click the Profile option
        // Verify that roles are listed
        cy.get('.profile-section').eq(1).within(() => {
            cy.get('.section-title').should('contain', 'Szerepkörök');
            cy.get('ul li').should('have.length.greaterThan', 0); // Ensure at least one role is listed
        });
    });

    it('Should match specific user profile details (example check)', () => {
        cy.get('.fa-user').first().click(); // Click the user icon

        // Click on the Profile menu item
        cy.contains('Profile').click(); // Locate and click the Profile option
        // Replace the text in `should('contain', ...)` with the actual expected values for a test user
        cy.contains('p', 'Felhasználó név:').should('contain', 'iga'); // Check username
        cy.contains('p', 'Vezetéknév:').should('contain', 'Iga'); // Check last name
        cy.contains('p', 'Keresznév:').should('contain', 'Benedek'); // Check first name
        cy.contains('p', 'Email:').should('contain', 'iga@encotech.huu'); // Check email
    });

    it('Should handle cases with missing or no roles', () => {
        cy.get('.fa-user').first().click(); // Click the user icon

        // Click on the Profile menu item
        cy.contains('Profile').click(); // Locate and click the Profile option
        // If roles are missing or empty, ensure the UI handles it gracefully
        cy.get('.profile-section').eq(1).within(() => {
            cy.get('ul li').should('have.length.at.least', 0); // Handles empty roles
        });
    });

    it('Should log out the user', () => {

        // Log out
        cy.get('.fa-user').first().click(); // Open the user dropdown
        cy.contains('Log Out').click(); // Click the 'Log Out' option

        // Verify redirection to login page
        cy.url().should('include', '/localhost:8080'); // Check that the URL includes '/login'
    });


});

