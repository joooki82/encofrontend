import {Injectable} from "@angular/core";
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../../environments/environment";
import {jwtDecode} from "jwt-decode";


@Injectable({providedIn: 'root'})
export class KeycloakOperationService {


    constructor(private readonly keycloak: KeycloakService) {
    }

    async isLoggedIn(): Promise<boolean> {
        return this.keycloak.isLoggedIn();
    }

    logout(): void {
        this.keycloak.logout();
    }

    async getUserProfile(): Promise<any> {
        return this.keycloak.loadUserProfile();
    }

    getUserRoles(): string[] {
        const roles = this.keycloak.getUserRoles();
        return roles || [];
    }

    /**
     * Check if the user has a specific role.
     */
    hasRole(role: string): boolean {
        return this.keycloak.isUserInRole(role);
    }

    // Add other methods as needed for token access, user info retrieval, etc.}
}
