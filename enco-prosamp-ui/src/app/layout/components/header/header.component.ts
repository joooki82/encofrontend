import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {KeycloakOperationService} from "../../../shared/services/keycloak.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


    public pushRightClass: string;
    currentUserName: string = ''; // Holds the current user's name

    constructor(
        private translate: TranslateService,
        public router: Router,
        private keycloakService: KeycloakOperationService
) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.loadUserProfile();

    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    // rltAndLtr() {
    //     const dom: any = document.querySelector('body');
    //     dom.classList.toggle('rtl');
    // }
    //
    // onLoggedout() {
    //     localStorage.removeItem('isLoggedin');
    // }

    logout() {
        this.keycloakService.logout(); // Use the Keycloak logout
    }

    // changeLang(language: string) {
    //     this.translate.use(language);
    // }

    async loadUserProfile(): Promise<void> {
        try {
            const userProfile = await this.keycloakService.getUserProfile();
            this.currentUserName = this.formatUserName(userProfile);
        } catch (error) {
            console.error('Error loading user profile:', error);
            this.currentUserName = 'Guest'; // Fallback for error scenarios
        }
    }

    private formatUserName(userProfile: any): string {
        const lastName = userProfile.lastName || '';
        const firstName = userProfile.firstName || '';
        if (lastName && firstName) {
            return `${lastName} ${firstName}`;
        }
        return userProfile.username || 'Guest'; // Fallback to username or Guest
    }


}
