import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../router.animations";
import {KeycloakOperationService} from "../../shared/services/keycloak.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {
  userProfile: any = null;
  roles: string[] = [];


  constructor(private keycloakService: KeycloakOperationService) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUserRoles();

  }

  async loadUserProfile(): Promise<void> {
    try {
      this.userProfile = await this.keycloakService.getUserProfile();
    } catch (error) {
      console.error('Failed to load user profile', error);
    }
  }

  loadUserRoles(): void {
    this.keycloakService.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this.roles = this.keycloakService.getClientRoles();
        console.log('User roles:', this.roles);
      } else {
        console.warn('User is not logged in');
      }
    }).catch((error) => {
      console.error('Error checking login status:', error);
    });
  }

}
