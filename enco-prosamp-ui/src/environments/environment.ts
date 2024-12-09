// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    disableAuth: false, // Add this flag for testing purposes
    apiUrl: 'http://localhost:8081/api',
    keycloak: {
        enable: true,                       // Enable or disable Keycloak for Frontend app
        authority: 'http://localhost:8080', // Keycloak URL
        realm: 'Encotech',                  // Realm name
        clientId: 'enco-prosamp-angular-ui',
        redirectUri: 'http://localhost:4200' // Frontend app URL for redirects
    }
};


