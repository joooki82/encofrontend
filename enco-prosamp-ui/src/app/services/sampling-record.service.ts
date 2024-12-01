import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SamplingRecord} from "../model/sampling-record/sampling-record.model";

@Injectable({
  providedIn: 'root',
})
export class SamplingRecordService {
  private apiUrl = 'http://localhost:8080/api/sampling-records';

  constructor(private http: HttpClient) {}

  getSamplingRecordById(id: number): Observable<SamplingRecord> {
    return this.http.get<SamplingRecord>(`${this.apiUrl}/${id}`);
  }
}
