import {Component, OnInit} from '@angular/core';
import {SampleDetail} from "../../model/sample-detail/sample-detail.model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SampleDetailService} from "../../service/sample-detail.service";
import {CommonModule} from "@angular/common";
import moment, {now} from 'moment';
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";


@Component({
  selector: 'app-sample-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatMomentDateModule,
    NgxMatDatetimePickerModule,
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
      contaminantId: ['', Validators.required],
      workerExamined: ['', Validators.required],
      temperature: ['', Validators.required],
      humidity: ['', Validators.required],
      pressure: ['', Validators.required],
      sampleVolumeFlowRate: ['', Validators.required],
      adjustmentMethodId: ['', Validators.required],
      startTime: [now(), Validators.required],
      endTime: [now(), Validators.required],
      samplingTypeId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSampleDetails()
  }

  loadSampleDetails() {
    this.sampleDetailService.getAllSampleDetails().subscribe(data => {
      this.sampleDetailList = data;
    });
  }

  onSubmit() {
    if (this.sampleDetailForm.valid) {
      const newSampleDetail: SampleDetail = {
        ...this.sampleDetailForm.value,
        // startTime: moment(this.sampleDetailForm.value.startTime).toDate(),
        // endTime: moment(this.sampleDetailForm.value.endTime).toDate()
      };
      this.sampleDetailService.saveSampleDetail(newSampleDetail).subscribe(response => {
        this.sampleDetailList.push(response);
        this.sampleDetailForm.reset();
      });
      console.log(this.sampleDetailForm.value)
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
