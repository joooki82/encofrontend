describe('Authenticated Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200');
        cy.origin('http://localhost:8080', () => {
            cy.get('#username').type('iga');
            cy.get('#password').type('iga');
            cy.get('#kc-login').click();
        });

        cy.url().should('include', '/dashboard');
    });

    it('Should display the dashboard', () => {
        cy.contains('Dashboard'); // Example assertion

    });

    it('Should navigate to the Profile page from the header', () => {
        // Verify header is visible
        cy.get('.navbar').should('be.visible');

        // Open the user dropdown
        cy.get('.fa-user').first().click();

        // Click on the Profile menu item
        cy.contains('Profile').click();

        cy.url().should('include', '/profile');
        cy.get('h4').should('contain', 'Bejelentkezett felhasználó');
    });

    it('Should display user information once loaded', () => {
        cy.get('.fa-user').first().click();

        cy.contains('Profile').click();
        cy.get('.profile-container').should('be.visible');

        cy.get('.profile-section').eq(0).within(() => {
            cy.get('.section-title').should('contain', 'Személyes információk');
            cy.contains('Felhasználó név:').next().should('not.be.empty');
            cy.contains('Vezetéknév:').next().should('not.be.empty');
            cy.contains('Keresznév:').next().should('not.be.empty');
            cy.contains('Email:').next().should('not.be.empty');
        });
    });

    it('Should display user roles', () => {
        cy.get('.fa-user').first().click();

        cy.contains('Profile').click();
        cy.get('.profile-section').eq(1).within(() => {
            cy.get('.section-title').should('contain', 'Szerepkörök');
            cy.get('ul li').should('have.length.greaterThan', 0);
        });
    });

    it('Should match specific user profile details (example check)', () => {
        cy.get('.fa-user').first().click();

        cy.contains('Profile').click();
        cy.contains('p', 'Felhasználó név:').should('contain', 'iga');
        cy.contains('p', 'Vezetéknév:').should('contain', 'Iga');
        cy.contains('p', 'Keresznév:').should('contain', 'Benedek');
        cy.contains('p', 'Email:').should('contain', 'iga@encotech.huu');
    });

    it('Should handle cases with missing or no roles', () => {
        cy.get('.fa-user').first().click();

        cy.contains('Profile').click();
        cy.get('.profile-section').eq(1).within(() => {
            cy.get('ul li').should('have.length.at.least', 0);
        });
    });

    it('Should log in as iga and ensure "Alapadat rögzítés" menu is not present', () => {

        cy.get('nav.sidebar').should('be.visible');

        cy.contains('span', 'Alapadat rögzítés').should('not.exist');
    });

    it('Should log out the user', () => {

        cy.get('.fa-user').first().click();
        cy.contains('Log Out').click();

        cy.url().should('include', '/localhost:8080');
    });
});

describe('Locations Page Tests', () => {
    beforeEach(() => {
        // Visit the main page and log in
        cy.visit('http://localhost:4200');
        cy.origin('http://localhost:8080', () => {
            cy.get('#username').type('csokasi');
            cy.get('#password').type('csokasi');
            cy.get('#kc-login').click();
        });

        // Ensure the app redirects to the dashboard
        cy.url().should('include', '/dashboard');

        // Mocking the API response for GET /locations globally
        cy.intercept('GET', 'http://localhost:8081/api/locations', [
            {
                locationId: 1,
                name: "Széchenyi István Egyetem",
                zipCode: "9026",
                city: "Győr",
                streetName: "Egyetem tér",
                streetNumber: "1",
                hrsz: "HRSZ 1234"
            },
            {
                locationId: 2,
                name: "Debreceni Egyetem",
                zipCode: "4032",
                city: "Debrecen",
                streetName: "Egyetem tér",
                streetNumber: "2",
                hrsz: "HRSZ 5678"
            }
        ]).as('getLocations');
    });

    it('Should navigate to the Helyszínek page', () => {
        // Navigate to the "Helyszínek" page
        cy.contains('span', 'Alapadat rögzítés').click();
        cy.contains('span', 'Helyszínek').click();

        // Verify navigation and mock data appearance
        cy.url().should('include', '/locationsave');
        cy.get('h4.text-primary').should('contain', 'Location List');
        cy.wait('@getLocations');

        // Verify table data
        cy.get('table tbody tr').should('have.length', 2);
        cy.get('table tbody tr').eq(0).within(() => {
            cy.contains('Széchenyi István Egyetem');
            cy.contains('9026');
        });
        cy.get('table tbody tr').eq(1).within(() => {
            cy.contains('Debreceni Egyetem');
            cy.contains('4032');
        });
    });

    it('should display the initial locations fetched from the backend', () => {
        // Mock the navigation API call explicitly
        cy.visit('/locationsave');
        cy.wait('@getLocations');

        // Verify the data in the table
        cy.get('table tbody tr').should('have.length', 2);
        cy.get('table tbody tr').eq(0).within(() => {
            cy.contains('Széchenyi István Egyetem');
        });
        cy.get('table tbody tr').eq(1).within(() => {
            cy.contains('Debreceni Egyetem');
        });
    });

    it('should allow adding a new location and display it in the list', () => {
        // Navigate to the "Helyszínek" page
        cy.visit('/locationsave');
        cy.wait('@getLocations');

        // Fill in the form with new location data
        cy.get('#name').type('Pécsi Tudományegyetem');
        cy.get('#zipCode').type('7622');
        cy.get('#city').type('Pécs');
        cy.get('#streetName').type('Rákóczi út');
        cy.get('#streetNumber').type('3');
        cy.get('#hrsz').type('HRSZ 91011');

        // Mock the backend's response to saving the location
        cy.intercept('POST', 'http://localhost:8081/api/locations', {
            statusCode: 201,
            body: {
                locationId: 3,
                name: "Pécsi Tudományegyetem",
                zipCode: "7622",
                city: "Pécs",
                streetName: "Rákóczi út",
                streetNumber: "3",
                hrsz: "HRSZ 91011"
            }
        }).as('saveLocation');

        // Submit the form and verify the response
        cy.get('form').submit();
        cy.wait('@saveLocation');

        // Verify the new location appears in the table
        cy.get('table tbody tr').should('have.length', 3);
        cy.get('table tbody tr').eq(2).within(() => {
            cy.contains('Pécsi Tudományegyetem');
            cy.contains('7622');
            cy.contains('Pécs');
        });
    });
});

