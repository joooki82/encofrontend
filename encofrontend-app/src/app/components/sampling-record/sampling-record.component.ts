import {Component, OnInit} from '@angular/core';
import {SamplingRecord} from "../../model/sampling-record/sampling-record.model";
import {SamplingRecordService} from "../../service/sampling-record.service";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-sampling-record',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sampling-record.component.html',
  styleUrl: './sampling-record.component.css'
})

export class SamplingRecordComponent implements OnInit {
  samplingRecords: SamplingRecord[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private samplingRecordService: SamplingRecordService) {}

  ngOnInit(): void {
    this.samplingRecordService.getSamplingRecords().subscribe({
      next: (records) => {
        this.samplingRecords = records;
        this.isLoading = false;
        console.log(this.samplingRecords)
      },
      error: (error) => {
        this.errorMessage = 'Failed to load sampling records';
        this.isLoading = false;
      },

    });
  }
}
