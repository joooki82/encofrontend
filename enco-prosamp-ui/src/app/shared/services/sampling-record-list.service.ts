import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SamplingRecord} from "../../model/sampling-record/sampling-record.model";

@Injectable({
  providedIn: 'root'
})
export class SamplingRecordListService {
  private apiUrl = 'http://localhost:8081/api/sampling-records';

  constructor(private http: HttpClient) {}

  getSamplingRecords(): Observable<SamplingRecord[]> {
    return this.http.get<SamplingRecord[]>(this.apiUrl);
  }
}
