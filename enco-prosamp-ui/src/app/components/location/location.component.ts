import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {CommonModule} from "@angular/common";
import {LocationOfSampling} from "../../model/locationofsampling/locationofsampling.model";
import {LocationService} from '../../services/location.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {
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


