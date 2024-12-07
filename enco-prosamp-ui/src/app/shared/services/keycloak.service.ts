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

    //
    // getClientRoles(): string[] {
    //     const token = this.keycloak.getKeycloakInstance().token;
    //     if (!token) {
    //         return [];
    //     }
    //     // console.log('Token1 (Raw):', token);
    //
    //     let roles;
    //     try {
    //         // Decode the token using a reliable library
    //         const decodedToken: any = jwtDecode(token);
    //         // console.log('Token2 (Decoded):', decodedToken);
    //
    //         // Check the resource_access property
    //         if (!decodedToken.resource_access) {
    //             // console.error('resource_access is not available in the token');
    //             return [];
    //         }
    //
    //         const clientId = environment.keycloak.clientId; // Ensure this is the client ID, not the realm name
    //         // console.log('Using clientId:', clientId);
    //
    //         roles = decodedToken.resource_access[clientId]?.roles || [];
    //         // console.log('Token3 (Roles for client):', roles);
    //
    //         return roles;
    //     } catch (error) {
    //         console.error('Error decoding token:', error);
    //         return [];
    //     }
    // }
    // Add other methods as needed for token access, user info retrieval, etc.}
}
