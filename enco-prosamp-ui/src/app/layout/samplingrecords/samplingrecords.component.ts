import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {SamplingRecordListService} from "../../shared/services/sampling-record-list.service";


@Component({
    selector: 'app-samplingrecords',
    templateUrl: './samplingrecords.component.html',
    styleUrls: ['./samplingrecords.component.scss'],
    animations: [routerTransition()]
})
export class SamplingrecordsComponent implements OnInit {
    samplingRecords: any[] = [];  // Changed to any to accommodate extended properties

    constructor(private samplingRecordListService: SamplingRecordListService) {
    }

    ngOnInit(): void {
        this.samplingRecordListService.getSamplingRecords().subscribe(
            records => {
                this.samplingRecords = records.map(record => ({
                    ...record,
                    conductedByName: `${record.conductedBy?.firstName || 'N/A'} ${record.conductedBy?.lastName || 'N/A'}`,
                    locationCity: record.location?.city || 'N/A',
                    contaminantNames: record.contaminants?.map(c => c.name).join(', ') || 'N/A',
                    equipmentNames: record.equipmentList?.map(e => e.name).join(', ') || 'N/A',
                    sampleDetailNumbers: record.sampleDetailList?.map(sd => sd.uniqueSampleNumber).join(', ') || 'N/A',
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
