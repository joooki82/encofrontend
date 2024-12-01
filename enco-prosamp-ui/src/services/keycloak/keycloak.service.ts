import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;

  constructor() {}

  async init(): Promise<void> {
    console.log('KeycloakService initializing...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('KeycloakService initialized.');
  }
}
