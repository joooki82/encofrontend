import {environment} from "../environments/environment";
import {KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakEventType, KeycloakService} from "keycloak-angular";
import {APP_BASE_HREF, CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {LanguageTranslationModule} from "./shared/modules/language-translation/language-translation.module";
import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpClientModule,
    provideHttpClient,
    withInterceptorsFromDi
} from "@angular/common/http";
import {APP_INITIALIZER, NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {initializeKeycloak} from "./init/keycloak-init.factory";
import {AuthGuard} from "./shared";
import {HttpLoggerInterceptor} from "./shared/interceptor/http-logger.interceptor";

// export const initializeKeycloak = (keycloak: KeycloakService) => async () => {
//     if (environment.keycloak.enable) {
//         /**
//          *  https://www.npmjs.com/package/keycloak-angular#keycloak-js-events
//          *  The callback events from keycloak-js are available through a RxJS subject which is defined by keycloakEvents$.
//          *  For example you make keycloak-angular auto refreshing your access token when expired
//          *
//          **/
//         keycloak.keycloakEvents$.subscribe({
//             next(event) {
//                 if (event.type == KeycloakEventType.OnTokenExpired) {
//                     keycloak.updateToken(20);
//                 }
//             },
//         });
//         return keycloak.init({
//             config: {
//                 url: environment.keycloak.authority,
//                 realm: environment.keycloak.realm,
//                 clientId: environment.keycloak.clientId,
//             },
//             // If set a false you cannot get any information about the user example the username
//             // if you use keycloakService.getUserName() you get this error
//             // User not logged in or user profile was not loaded.
//             loadUserProfileAtStartUp: true,
//             initOptions: {
//                 //   This is an action we specified on keycloak load
//                 //   We have two options : 'login-required'|'check-sso'
//                 //   If is set to 'login-required' this means your browser will do a full redirect to the Keycloak server and back to your application.
//
//                 // onLoad: 'login-required',
//                 // checkLoginIframe: true,
//
//                 //   If is set to  'check-sso'  instead this action will be performed in a hidden iframe, so your application resources only need to be loaded and parsed once by the browser.
//                 //   Then you will need to add the silentCheckSsoRedirectUri and create a html file   silent-check-sso.html with this content
//                 // <html>
//                 //    <body>
//                 //         <script>
//                 //           parent.postMessage(location.href, location.origin);
//                 //         </script>
//                 //      </body>
//                 // </html>
//                 onLoad: 'check-sso',
//                 silentCheckSsoRedirectUri:
//                     window.location.origin + '/assets/silent-check-sso.html',
//                 checkLoginIframe: false,
//                 redirectUri: environment.keycloak.redirectUri,
//             },
//             // By default the keycloak-angular library add Authorization: Bearer TOKEN to all http requests
//             // Then to exclude a list of URLs that should not have the authorization header we need to provide  them here.
//             bearerExcludedUrls: ['/assets'],
//         });
//     }
// };

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        KeycloakAngularModule

    ],
    declarations: [AppComponent],
    providers: [
        HttpClient,
        KeycloakService,
        AuthGuard,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: KeycloakBearerInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoggerInterceptor,
            multi: true
        },
        provideHttpClient(
            withInterceptorsFromDi() // tell httpClient to use interceptors from DI
        ),
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
