import {Component, OnInit} from '@angular/core';
import {SamplingRecord} from "../../model/sampling-record/sampling-record.model";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {SamplingRecordService} from '../../services/sampling-record.service';


@Component({
  selector: 'app-sampling-record',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sampling-record.component.html',
  styleUrl: './sampling-record.component.css'
})

export class SamplingRecordComponent implements OnInit {
  samplingRecord: SamplingRecord | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private samplingRecordService: SamplingRecordService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.samplingRecordService.getSamplingRecordById(id).subscribe({
      next: (record) => {
        this.samplingRecord = record;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load sampling record';
        this.isLoading = false;
      },
    });
  }
}
