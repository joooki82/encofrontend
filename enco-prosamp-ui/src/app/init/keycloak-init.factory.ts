import {KeycloakService} from "keycloak-angular";

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8080/',
                realm: 'Encotech',
                clientId: 'enco-prosamp-angular-ui',
            },
            enableBearerInterceptor: true,
            bearerPrefix: 'Bearer',
            bearerExcludedUrls: ['/assets'],
            // initOptions: {
            //     onLoad: 'check-sso',
            //     silentCheckSsoRedirectUri:
            //         window.location.origin + '/assets/silent-check-sso.html',
            // },
            initOptions: {
                onLoad: 'check-sso', // Use 'check-sso' to avoid forcing redirection
                silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
                pkceMethod: 'S256',      // Enable PKCE
                redirectUri: window.location.origin,
            },
        });
}
