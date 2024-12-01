import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;

  get keycloak()  {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8080/',
        realm: 'Encotech',
        clientId: 'enco-prosamp-angular-ui',
      });
    }
    return this._keycloak;
  }

  constructor() {}

  async init(): Promise<void> {
    console.log('Authenticating user...');

    const authenticated: boolean = await this.keycloak?.init({
      onLoad: 'login-required',
    });

    if (authenticated) {
      console.log('User authenticated.');
    }

  }
}
