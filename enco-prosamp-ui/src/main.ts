import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { KeycloakService } from './services/keycloak/keycloak.service';
import {provideHttpClient} from "@angular/common/http";

async function initializeApp(): Promise<KeycloakService> {
    const keycloakService = new KeycloakService();
    console.log('Initializing KeycloakService...');
    await keycloakService.init();
    console.log('KeycloakService initialization completed.');
    return keycloakService;
}

initializeApp()
    .then((keycloakService) => {
        bootstrapApplication(AppComponent, {
            providers: [
                provideHttpClient(),
                { provide: KeycloakService, useValue: keycloakService },
            ],
        }).catch((err) => console.error('Error bootstrapping application:', err));
    })
    .catch((err) => console.error('Error during initialization:', err));


// async function main() {
//     const keycloakService = new KeycloakService();
//
//     try {
//         await keycloakService.init();
//         console.log('Keycloak initialized successfully.');
//     } catch (err) {
//         console.error('Error initializing Keycloak:', err);
//         // Optional: Retry mechanism or fallback logic here
//     }
//
//     console.log('Application bootstrapping...');
//
//     bootstrapApplication(AppComponent, {
//         providers: [provideHttpClient(), { provide: KeycloakService, useValue: keycloakService }],
//     }).catch((err) => console.error(err));
// }
//
// main();
