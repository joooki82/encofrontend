export const environment = {
    production: true,
    disableAuth: false, // Add this flag for testing purposes
    apiUrl: 'http://localhost:8081/api',
    keycloak: {
        enable: true,                       // Enable or disable Keycloak for Frontend app
        authority: 'http://localhost:8080', // Keycloak URL
        realm: 'Encotech',                  // Realm name
        clientId: 'enco-prosamp-angular-ui',
        redirectUri: 'http://localhost:4200' // Frontend app URL for redirects
    }
    // keycloak: {
    //     enable: true, //Enable or disable Keycloak for Frontend app
    //     authority: 'http://localhost:8080', //Keycloak URL
    //     redirectUri: 'http://localhost:4200', //Frontend app URL
    //     postLogoutRedirectUri: 'http://localhost:4200/logout', //Optional value
    //     realm: 'encotech', //Realm name
    //     clientId: 'enco-prosamp-angular-ui',
    // },

};
