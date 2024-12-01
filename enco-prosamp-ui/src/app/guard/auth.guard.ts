import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {KeycloakOperationService} from "../services/keycloak/keycloak.service";


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
      private keycloakOperationService: KeycloakOperationService,
      private router: Router
  ) {}

  async canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const isLoggedIn = await this.keycloakOperationService.isLoggedIn();

    if (!isLoggedIn) {
      // Redirect to Keycloak login
      this.keycloakOperationService.logout();
      return false;
    }

    const requiredRoles = route.data['roles'] as string[]; // Roles defined in app.routes.ts
    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.some((role) =>
          this.keycloakOperationService.hasRole(role)
      );

      if (!hasRole) {
        // Redirect to an unauthorized page or show an error
        return this.router.createUrlTree(['/unauthorized']);
      }
    }

    return true;
  }
}
