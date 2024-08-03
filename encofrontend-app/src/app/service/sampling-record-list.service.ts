import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {SamplingRecord} from "../model/sampling-record/sampling-record.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SamplingRecordListService {
  private apiUrl = 'http://localhost:8080/api/sampling-records';

  constructor(private http: HttpClient) {}

  getSamplingRecords(): Observable<SamplingRecord[]> {
    return this.http.get<SamplingRecord[]>(this.apiUrl);
  }
}
