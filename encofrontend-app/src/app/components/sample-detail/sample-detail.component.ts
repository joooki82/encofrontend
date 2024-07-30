import {Component, OnInit} from '@angular/core';
import {SampleDetail} from "../../model/sample-detail/sample-detail.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SampleDetailService} from "../../service/sample-detail.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-sample-detail',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule
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
      environmentalConditions: ['', Validators.required],
      sampleVolumeFlowRate: ['', Validators.required],
      adjustmentMethodId: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      samplingTypeId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSampleDetails();
  }

  loadSampleDetails() {
    this.sampleDetailService.getAllSampleDetails().subscribe(data => {
      this.sampleDetailList = data;
    });
  }

  onSubmit() {
    if (this.sampleDetailForm.valid) {
      const newSampleDetail: SampleDetail = this.sampleDetailForm.value;
      this.sampleDetailService.saveSampleDetail(newSampleDetail).subscribe(response => {
        this.sampleDetailList.push(response);
        this.sampleDetailForm.reset();
      });
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
