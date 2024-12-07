// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
