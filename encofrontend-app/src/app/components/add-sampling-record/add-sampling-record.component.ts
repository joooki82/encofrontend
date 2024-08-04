import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';
import {User} from "../../model/user/user.model";
import {Contaminant} from "../../model/contaminant/contaminant.model";
import {Equipment} from "../../model/equipment/equipment.model";
import {LocationOfSampling} from "../../model/locationofsampling/locationofsampling.model";
import {AdjustmentMethod, SamplingType} from "../../model/sample-detail/sample-detail.model";
import {SamplingRecord} from "../../model/sampling-record/sampling-record.model";
import {CommonModule} from "@angular/common";
import {AddSamplingRecordService} from "../../service/add-sampling-record.service";
import {forkJoin, Subscription} from "rxjs";



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
  users: User[]  = [];
  contaminants: Contaminant[]  = [];
  equipments: Equipment[]  = [];
  locations: LocationOfSampling[] = [];
  adjustmentMethods: AdjustmentMethod[]  = [];
  samplingTypes: SamplingType[]  = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
              private samplingRecordService: AddSamplingRecordService,
              private cd: ChangeDetectorRef
  ) {
    this.samplingRecordForm = this.fb.group({
      sampleDate: ['', Validators.required],
      conductedBy: [null, Validators.required],
      location: [null, Validators.required],
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
      // equipmentList: this.fb.array([this.createEquipmentGroup()]),
      equipmentList: this.fb.array([this.createEquipmentControl()]),
      sampleDetailList: this.fb.array([this.createSampleDetailGroup()]),
      createdAt: [''],
      updatedAt: [null],
      createdBy: [null],
      updatedBy: [null],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    forkJoin({
      users: this.samplingRecordService.loadUsers(),
      contaminants: this.samplingRecordService.loadContaminants(),
      equipments: this.samplingRecordService.loadEquipments(),
      locations: this.samplingRecordService.loadLocations(),
      adjustmentMethods: this.samplingRecordService.loadAdjustmentMethods(),
      samplingTypes: this.samplingRecordService.loadSamplingTypes()
    }).subscribe({
      next: (data) => {
        this.users = data.users;
        this.contaminants = data.contaminants;
        this.equipments = data.equipments;
        this.locations = data.locations;
        this.adjustmentMethods = data.adjustmentMethods;
        this.samplingTypes = data.samplingTypes;

        console.log('Data Loaded', data);
        this.cd.detectChanges(); // Ensure the UI is updated after loading data
        this.subscribeToFormChanges(); // Subscribe to form changes after all data is loaded
      },
      error: (error) => console.error('Error loading data:', error)
    });

  }

  private subscribeToFormChanges(): void {

    const formChangesSubscription = this.sampleDetailList.valueChanges.subscribe(value => {
      console.log('Sample Detail List Changes:', JSON.stringify(value, null, 2));
    });
    this.subscriptions.add(formChangesSubscription);

    // Log changes to the sampleDetailList FormArray
    this.sampleDetailList.valueChanges.subscribe(value => {
      console.log('Sample Detail List Changes:', JSON.stringify(value, null, 2));
    });

    // Log changes to the equipmentList FormArray
    this.equipmentList.valueChanges.subscribe(value => {
      console.log('Equipment List Changes:', JSON.stringify(value, null, 2));
    });

    // If you want to monitor individual form controls, you can do so like this:
    this.samplingRecordForm.get('conductedBy')?.valueChanges.subscribe(value => {
      console.log('Conducted By Changed:', value);
    });

    this.samplingRecordForm.get('location')?.valueChanges.subscribe(value => {
      console.log('Location Changed:', value);
    });

    // Add similar subscriptions for other individual form controls or nested controls as needed
    this.samplingRecordForm.get('sampleDetailList')?.valueChanges.subscribe(value => {
      console.log('Sample Detail List Changed:', value);
    });

    // To track changes in nested form arrays within sampleDetailList
    this.sampleDetailList.controls.forEach((control, index) => {
      control.get('contaminants')?.valueChanges.subscribe(value => {
        console.log(`Contaminants for Sample Detail ${index} Changed:`, JSON.stringify(value, null, 2));
      });

      control.get('adjustmentMethod')?.valueChanges.subscribe(value => {
        console.log(`Adjustment Method for Sample Detail ${index} Changed:`, value);
      });

      control.get('samplingType')?.valueChanges.subscribe(value => {
        console.log(`Sampling Type for Sample Detail ${index} Changed:`, value);
      });
    });
  }


  get equipmentList(): FormArray {
    return this.samplingRecordForm.get('equipmentList') as FormArray;
  }

  get sampleDetailList(): FormArray {
    return this.samplingRecordForm.get('sampleDetailList') as FormArray;
  }

  // createEquipmentGroup(): FormGroup {
  //   return this.fb.group({
  //     equipmentId: ['', Validators.required]
  //   });
  // }

  // createEquipmentGroup(): FormGroup {
  //   return this.fb.group([0, Validators.required]);
  // }

  createEquipmentControl(): FormControl {
    return this.fb.control(0, Validators.required); // Integer with required validation
  }

  createSampleDetailGroup(): FormGroup {
    return this.fb.group({
      detailId: [null],
      seriesNumber: ['', Validators.required],
      topicNumber: ['', Validators.required],
      uniqueSampleNumber: ['', Validators.required],
      insideSamplingLocation: ['', Validators.required],
      contaminants: this.fb.array([this.createContaminantGroup()]),
      workerExamined: ['', Validators.required],
      temperature: [0, Validators.required],
      humidity: [0, Validators.required],
      pressure: [0, Validators.required],
      sampleVolumeFlowRate: ['', Validators.required],
      adjustmentMethod: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      samplingType: ['', Validators.required],
    });
  }

  createContaminantGroup(): FormGroup {
    return this.fb.group({
      contaminantId: ['', Validators.required]
    });
  }

  // addEquipment() {
  //   this.equipmentList.push(this.createEquipmentGroup());
  // }
  //
  // removeEquipment(index: number) {
  //   this.equipmentList.removeAt(index);
  // }

  // Method to add a new equipment ID to the equipmentList
  addEquipment(): void {
    (this.samplingRecordForm.get('equipmentList') as FormArray).push(this.createEquipmentControl());
  }

// Method to remove an equipment ID from the equipmentList
  removeEquipment(index: number): void {
    (this.samplingRecordForm.get('equipmentList') as FormArray).removeAt(index);
  }


  addSampleDetail() {
    this.sampleDetailList.push(this.createSampleDetailGroup());
  }

  removeSampleDetail(index: number) {
    this.sampleDetailList.removeAt(index);
  }

  getContaminantsArray(index: number): FormArray {
    return this.sampleDetailList.at(index).get('contaminants') as FormArray;
  }

  addContaminant(sampleDetailIndex: number) {
    this.getContaminantsArray(sampleDetailIndex).push(this.createContaminantGroup());
  }

  removeContaminant(sampleDetailIndex: number, contaminantIndex: number) {
    this.getContaminantsArray(sampleDetailIndex).removeAt(contaminantIndex);
  }

  private logValidationErrors(group: FormGroup = this.samplingRecordForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else if (abstractControl && !abstractControl.valid) {
        console.log(`Control: ${key}, Error: ${JSON.stringify(abstractControl.errors)}`);
      }
    });
  }

  onSubmit() {
    if (this.samplingRecordForm.valid) {
      const samplingRecord: SamplingRecord = this.samplingRecordForm.value;
      console.log('Submitting form:', samplingRecord);

      this.samplingRecordService.saveSamplingRecord(samplingRecord).subscribe(
        response => {
          console.log('Sampling record submitted', response);
          // Handle success response
        },
        error => {
          console.error('Error submitting sampling record', error);
          // Handle error response
        }
      );
    } else {
      this.logValidationErrors();
      console.log('Form is invalid');
    }
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribe all subscriptions
  }
}
