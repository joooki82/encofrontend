import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class KeycloakOperationService {
  constructor(private readonly keycloak: KeycloakService) {}

  async isLoggedIn(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }
  logout(): void {
    this.keycloak.logout();
  }
  async getUserProfile(): Promise<KeycloakProfile> {
    return await this.keycloak.loadUserProfile();
  }
  // Add other methods as needed for token access, user info retrieval, etc.}

  async getToken(): Promise<string> {
    return await this.keycloak.getToken();
  }

  async getTokenParsed(): Promise<any> {
    return this.keycloak.getKeycloakInstance().tokenParsed;
  }

  hasRole(role: string): boolean {
    const roles = this.keycloak.getUserRoles();
    return roles.includes(role);
  }


}
