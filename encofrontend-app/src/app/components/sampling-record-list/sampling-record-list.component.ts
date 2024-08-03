import {Component, OnInit} from '@angular/core';
import {SamplingRecord} from "../../model/sampling-record/sampling-record.model";
import {SamplingRecordListService} from "../../service/sampling-record-list.service";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sampling-record-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sampling-record-list.component.html',
  styleUrl: './sampling-record-list.component.css'
})
export class SamplingRecordListComponent implements OnInit {
  samplingRecords: any[] = [];  // Changed to any to accommodate extended properties

  constructor(private samplingRecordListService: SamplingRecordListService) {}

  ngOnInit(): void {
    this.samplingRecordListService.getSamplingRecords().subscribe(
      records => {
        this.samplingRecords = records.map(record => ({
          ...record,
          conductedByName: `${record.conductedBy.firstName} ${record.conductedBy.lastName}`,
          locationCity: record.location.city,
          contaminantNames: record.contaminants.map(c => c.name).join(', '), // Assuming contaminants is an array
          equipmentNames: record.equipmentList.map(e => e.name).join(', '),
          sampleDetailNumbers: record.sampleDetailList.map(sd => sd.uniqueSampleNumber).join(', ')
        }));
      },
      error => console.error('Error fetching sampling records:', error)
    );
  }

  isRecordUpdated(record: any): boolean {
    const updatedAt = new Date(record.updatedAt);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return updatedAt > oneWeekAgo;
  }

}
