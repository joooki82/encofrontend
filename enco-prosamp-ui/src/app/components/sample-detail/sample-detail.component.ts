import {Component, OnInit} from '@angular/core';
import {SampleDetail} from "../../model/sample-detail/sample-detail.model";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule} from "@angular/material/input";
import { MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {SampleDetailService} from '../../services/sample-detail.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';




@Component({
  selector: 'app-sample-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  templateUrl: './sample-detail.component.html',
  styleUrl: './sample-detail.component.css'
})
export class SampleDetailComponent implements OnInit {
  sampleDetailList: SampleDetail[] = [];
  sampleDetailForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private sampleDetailService: SampleDetailService
  ) {
    this.sampleDetailForm = this.fb.group({
      seriesNumber: ['', Validators.required],
      topicNumber: ['', Validators.required],
      uniqueSampleNumber: ['', Validators.required],
      insideSamplingLocation: ['', Validators.required],
      contaminantIds: this.fb.array([this.fb.control('', Validators.required)]), // Initialize with one control
      workerExamined: ['', Validators.required],
      temperature: ['', Validators.required],
      humidity: ['', Validators.required],
      pressure: ['', Validators.required],
      sampleVolumeFlowRate: ['', Validators.required],
      adjustmentMethodId: ['', Validators.required],
      startTime: ['', Validators.required],
      startTimeHour: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      startTimeMinute: ['', [Validators.required, Validators.min(0), Validators.max(59)]],
      endTime: ['', Validators.required],
      endTimeHour: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      endTimeMinute: ['', [Validators.required, Validators.min(0), Validators.max(59)]],
      samplingTypeId: ['', Validators.required]
    });
  }

  get contaminantIds() {
    return this.sampleDetailForm.get('contaminantIds') as FormArray;
  }

  addContaminant() {
    this.contaminantIds.push(this.fb.control('', Validators.required));
  }

  removeContaminant(index: number) {
    this.contaminantIds.removeAt(index);
  }

  ngOnInit(): void {
    this.loadSampleDetails()
  }

  loadSampleDetails() {
    this.sampleDetailService.getAllSampleDetails().subscribe(data => {
      this.sampleDetailList = data;
      console.log(this.sampleDetailList)
    });
  }

  onSubmit() {
    if (this.sampleDetailForm.valid) {
      const formValue = this.sampleDetailForm.value;

      // Combine date and time for startTime
      const startTime = new Date(
        formValue.startTime.getFullYear(),
        formValue.startTime.getMonth(),
        formValue.startTime.getDate(),
        formValue.startTimeHour,
        formValue.startTimeMinute
      );

      // Combine date and time for endTime
      const endTime = new Date(
        formValue.endTime.getFullYear(),
        formValue.endTime.getMonth(),
        formValue.endTime.getDate(),
        formValue.endTimeHour,
        formValue.endTimeMinute
      );

      const newSampleDetail: SampleDetail = {
        ...formValue,
        startTime,
        endTime
      };

      this.sampleDetailService.saveSampleDetail(newSampleDetail).subscribe(response => {
        this.sampleDetailList.push(response);
        this.sampleDetailForm.reset();
      });

      console.log(newSampleDetail);
    }
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this sample detail?')) {
      this.sampleDetailService.deleteSampleDetail(id).subscribe(() => {
        this.sampleDetailList = this.sampleDetailList.filter(sampleDetail => sampleDetail.detailId !== id);
      });
    }
  }

}
