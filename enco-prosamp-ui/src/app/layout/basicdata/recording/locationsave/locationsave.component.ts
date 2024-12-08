import {Component} from '@angular/core';
import {routerTransition} from "../../../../router.animations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationService} from "../../../../shared/services/location.service";
import {LocationOfSampling} from "../../../../model/locationofsampling/locationofsampling.model";

@Component({
    selector: 'app-locationsave',
    templateUrl: './locationsave.component.html',
    styleUrl: './locationsave.component.scss',
    animations: [routerTransition()]

})
export class LocationsaveComponent {
    locationList: LocationOfSampling[] = [];
    locationForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private locationService: LocationService
    ) {
        this.locationForm = this.fb.group({
            name: ['', Validators.required],
            zipCode: ['', Validators.required],
            city: ['', Validators.required],
            streetName: [''],
            streetNumber: [''],
            hrsz: ['']
        });
    }

    ngOnInit(): void {
        this.loadLocations();
    }

    loadLocations() {
        this.locationService.getAllLocations().subscribe(data => {
            this.locationList = data;
        });
    }

    onSubmit() {
        if (this.locationForm.valid) {
            const newLocation: LocationOfSampling = this.locationForm.value;
            this.locationService.saveLocation(newLocation).subscribe(response => {
                this.locationList.push(response);
                this.locationForm.reset();
            });
        }
    }

    onDelete(id: number) {
        if (confirm('Are you sure you want to delete this location?')) {
            this.locationService.deleteLocation(id).subscribe(() => {
                this.locationList = this.locationList.filter(location => location.locationId !== id);
            });
        }
    }
}
