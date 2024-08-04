// import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
// import {Component, OnInit} from "@angular/core";
// import {HttpClient} from "@angular/common/http";
// import {CommonModule} from "@angular/common";
//
// interface User {
//   id: number;
//   username: string;
//   email: string;
//   firstName: string;
//   lastName: string;
// }
//
// interface Contaminant {
//   id: number;
//   name: string;
// }
//
// interface Equipment {
//   equipmentId: number;
//   name: string;
//   description: string;
//   identifier: string;
// }
//
// interface LocationOfSampling {
//   locationId: number;
//   name: string;
//   zipCode: string;
//   city: string;
//   streetName: string;
//   streetNumber: string;
//   hrsz: string;
// }
//
// interface AdjustmentMethod {
//   id: number;
//   code: string;
//   description: string;
// }
//
// interface SamplingType {
//   id: number;
//   code: string;
//   description: string;
// }
//
// interface SampleDetail {
//   detailId: number;
//   seriesNumber: string;
//   topicNumber: string;
//   uniqueSampleNumber: string;
//   insideSamplingLocation: string;
//   contaminants: Contaminant[];
//   workerExamined: string;
//   temperature: number;
//   humidity: number;
//   pressure: number;
//   sampleVolumeFlowRate: string;
//   adjustmentMethod: AdjustmentMethod;
//   startTime: Date;
//   endTime: Date;
//   samplingType: SamplingType;
// }
//
// interface SamplingRecord {
//   samplingRecordId: number;
//   sampleDate: string;
//   conductedBy: User;
//   location: LocationOfSampling;
//   contaminants: Contaminant[];
//   testedPlant: string;
//   technology: string;
//   numShiftsShiftDuration: string;
//   numWorkersPerShift: number;
//   exposureDuration: number;
//   temperature: number;
//   humidity: number;
//   wind: string;
//   pressure1: number;
//   pressure2: number;
//   otherEnvironmentalConditions: string;
//   airFlowConditions: string;
//   operationMode: string;
//   operationBreak: string;
//   localAirExtraction: string;
//   equipmentList: Equipment[];
//   sampleDetailList: SampleDetail[];
//   createdAt: string;
//   updatedAt: string | null;
//   createdBy: User;
//   updatedBy: User | null;
// }
//
//
// @Component({
//   selector: 'app-add-sampling-record',
//   standalone: true,
//   imports: [CommonModule,
//     ReactiveFormsModule
//   ],
//   templateUrl: './add-sampling-record.component.html',
//   styleUrl: './add-sampling-record.component.css'
// })
// export class AddSamplingRecordComponent implements OnInit {
//   samplingRecordForm: FormGroup;
//
//   users: User[] = [];
//   contaminants: Contaminant[] = [];
//   equipments: Equipment[] = [];
//   locations: LocationOfSampling[] = [];
//   adjustmentMethods: AdjustmentMethod[] = [];
//   samplingTypes: SamplingType[] = [];
//
//   constructor(private fb: FormBuilder, private http: HttpClient) {
//     this.samplingRecordForm = this.fb.group({
//       sampleDate: ['', Validators.required],
//       conductedBy: [null, Validators.required],
//       location: [null, Validators.required],
//       contaminants: this.fb.array([]),
//       testedPlant: [''],
//       technology: [''],
//       numShiftsShiftDuration: [''],
//       numWorkersPerShift: [0],
//       exposureDuration: [0],
//       temperature: [0],
//       humidity: [0],
//       wind: [''],
//       pressure1: [0],
//       pressure2: [0],
//       otherEnvironmentalConditions: [''],
//       airFlowConditions: [''],
//       operationMode: [''],
//       operationBreak: [''],
//       localAirExtraction: [''],
//       equipmentList: this.fb.array([]),
//       sampleDetailList: this.fb.array([]),
//       createdAt: [''],
//       updatedAt: [null],
//       createdBy: [null],
//       updatedBy: [null]
//     });
//   }
//
//   ngOnInit() {
//     this.loadData();
//   }
//
//   loadData() {
//     this.http.get<User[]>('http://localhost:8080/api/users').subscribe(data => this.users = data);
//     this.http.get<Contaminant[]>('http://localhost:8080/api/contaminants').subscribe(data => this.contaminants = data);
//     this.http.get<Equipment[]>('http://localhost:8080/api/equipments').subscribe(data => this.equipments = data);
//     this.http.get<LocationOfSampling[]>('http://localhost:8080/api/locations').subscribe(data => this.locations = data);
//     this.http.get<AdjustmentMethod[]>('http://localhost:8080/api/adjustment-methods').subscribe(data => this.adjustmentMethods = data);
//     this.http.get<SamplingType[]>('http://localhost:8080/api/sampling-types').subscribe(data => this.samplingTypes = data);
//   }
//
//   get contaminantsArray(): FormArray {
//     return this.samplingRecordForm.get('contaminants') as FormArray;
//   }
//
//   get equipmentArray(): FormArray {
//     return this.samplingRecordForm.get('equipmentList') as FormArray;
//   }
//
//   get sampleDetailArray(): FormArray {
//     return this.samplingRecordForm.get('sampleDetailList') as FormArray;
//   }
//
//   addContaminant() {
//     this.contaminantsArray.push(this.fb.control(null));
//   }
//
//   removeContaminant(index: number) {
//     this.contaminantsArray.removeAt(index);
//   }
//
//   addEquipment() {
//     this.equipmentArray.push(this.fb.group({
//       equipmentId: [null],
//       name: [''],
//       description: [''],
//       identifier: ['']
//     }));
//   }
//
//   removeEquipment(index: number) {
//     this.equipmentArray.removeAt(index);
//   }
//
//   addSampleDetail() {
//     this.sampleDetailArray.push(this.fb.group({
//       seriesNumber: [''],
//       topicNumber: [''],
//       uniqueSampleNumber: [''],
//       insideSamplingLocation: [''],
//       contaminants: this.fb.array([]),
//       workerExamined: [''],
//       temperature: [0],
//       humidity: [0],
//       pressure: [0],
//       sampleVolumeFlowRate: [''],
//       adjustmentMethod: [null],
//       startTime: [new Date()],
//       endTime: [new Date()],
//       samplingType: [null]
//     }));
//   }
//
//   removeSampleDetail(index: number) {
//     this.sampleDetailArray.removeAt(index);
//   }
//
//   addSampleContaminant(detailIndex: number) {
//     const detailFormGroup = this.sampleDetailArray.at(detailIndex) as FormGroup;
//     const sampleContaminantsArray = detailFormGroup.get('contaminants') as FormArray;
//     sampleContaminantsArray.push(this.fb.control(null));
//   }
//
//   removeSampleContaminant(detailIndex: number, contaminantIndex: number) {
//     const detailFormGroup = this.sampleDetailArray.at(detailIndex) as FormGroup;
//     const sampleContaminantsArray = detailFormGroup.get('contaminants') as FormArray;
//     sampleContaminantsArray.removeAt(contaminantIndex);
//   }
//
//   // In your component
//   getSampleDetailContaminants(detailIndex: number): FormArray {
//     const sampleDetail = this.sampleDetailArray.at(detailIndex) as FormGroup;
//     return sampleDetail.get('contaminants') as FormArray;
//   }
//
//
//   onSubmit() {
//     if (this.samplingRecordForm.valid) {
//       const samplingRecord: SamplingRecord = this.samplingRecordForm.value;
//       // Handle the form submission, e.g., send to the server
//       console.log(samplingRecord);
//     } else {
//       // Handle form errors
//       console.log("Form is invalid");
//     }
//   }
// }
//
//


import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {User} from "../../model/user/user.model";
import {Contaminant} from "../../model/contaminant/contaminant.model";
import {Equipment} from "../../model/equipment/equipment.model";
import {LocationOfSampling} from "../../model/locationofsampling/locationofsampling.model";
import {AdjustmentMethod, SamplingType} from "../../model/sample-detail/sample-detail.model";
import {SamplingRecord} from "../../model/sampling-record/sampling-record.model";
import {CommonModule} from "@angular/common";



@Component({
  selector: 'app-add-sampling-record',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-sampling-record.component.html',
  styleUrl: './add-sampling-record.component.css'
})
export class AddSamplingRecordComponent implements OnInit {
  samplingRecordForm: FormGroup;
  users: User[] = [];
  contaminants: Contaminant[] = [];
  equipments: Equipment[] = [];
  locations: LocationOfSampling[] = [];
  adjustmentMethods: AdjustmentMethod[] = [];
  samplingTypes: SamplingType[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.samplingRecordForm = this.fb.group({
      sampleDate: ['', Validators.required],
      conductedBy: [null, Validators.required],
      location: [null, Validators.required],
      contaminants: this.fb.array([]),
      testedPlant: [''],
      technology: [''],
      numShiftsShiftDuration: [''],
      numWorkersPerShift: [0],
      exposureDuration: [0],
      temperature: [0],
      humidity: [0],
      wind: [''],
      pressure1: [0],
      pressure2: [0],
      otherEnvironmentalConditions: [''],
      airFlowConditions: [''],
      operationMode: [''],
      operationBreak: [''],
      localAirExtraction: [''],
      equipmentList: this.fb.array([]),
      sampleDetailList: this.fb.array([]),
      createdAt: [''],
      updatedAt: [null],
      createdBy: [null],
      updatedBy: [null]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.http.get<User[]>('http://localhost:8080/api/users').subscribe(data => this.users = data);
    this.http.get<Contaminant[]>('http://localhost:8080/api/contaminants').subscribe(data => this.contaminants = data);
    this.http.get<Equipment[]>('http://localhost:8080/api/equipments').subscribe(data => this.equipments = data);
    this.http.get<LocationOfSampling[]>('http://localhost:8080/api/locations').subscribe(data => this.locations = data);
    this.http.get<AdjustmentMethod[]>('http://localhost:8080/api/adjustment-methods').subscribe(data => this.adjustmentMethods = data);
    this.http.get<SamplingType[]>('http://localhost:8080/api/sampling-types').subscribe(data => this.samplingTypes = data);
  }

  get equipmentList(): FormArray {
    return this.samplingRecordForm.get('equipmentList') as FormArray;
  }

  get sampleDetailList(): FormArray {
    return this.samplingRecordForm.get('sampleDetailList') as FormArray;
  }

  addEquipment() {
    this.equipmentList.push(this.fb.group({
      equipmentId: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      identifier: ['']
    }));
  }

  removeEquipment(index: number) {
    this.equipmentList.removeAt(index);
  }

  addSampleDetail() {
    this.sampleDetailList.push(this.fb.group({
      detailId: [null],
      seriesNumber: ['', Validators.required],
      topicNumber: ['', Validators.required],
      uniqueSampleNumber: ['', Validators.required],
      insideSamplingLocation: ['', Validators.required],
      contaminants: this.fb.array([]),
      workerExamined: ['', Validators.required],
      temperature: [0, Validators.required],
      humidity: [0, Validators.required],
      pressure: [0, Validators.required],
      sampleVolumeFlowRate: ['', Validators.required],
      adjustmentMethod: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      samplingType: ['', Validators.required],
    }));
  }

  removeSampleDetail(index: number) {
    this.sampleDetailList.removeAt(index);
  }

  getContaminantsArray(index: number): FormArray {
    return this.sampleDetailList.at(index).get('contaminants') as FormArray;
  }

  addContaminant(sampleDetailIndex: number) {
    this.getContaminantsArray(sampleDetailIndex).push(this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    }));
  }

  removeContaminant(sampleDetailIndex: number, contaminantIndex: number) {
    this.getContaminantsArray(sampleDetailIndex).removeAt(contaminantIndex);
  }

  onSubmit() {
    if (this.samplingRecordForm.valid) {
      const samplingRecord: SamplingRecord = this.samplingRecordForm.value;
      // Submit the form data to your backend
      this.http.post('http://localhost:8080/api/sampling-records', samplingRecord).subscribe(response => {
        console.log('Sampling record submitted', response);
        // Handle success response
      }, error => {
        console.error('Error submitting sampling record', error);
        // Handle error response
      });
    }
  }
}
