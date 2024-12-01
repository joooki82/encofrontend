import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SampleDetail} from "../model/sample-detail/sample-detail.model";

@Injectable({
  providedIn: 'root'
})
export class SampleDetailService {
  private apiUrl = 'http://localhost:8080/api/sample-details';

  constructor(private http: HttpClient) {}

  getAllSampleDetails(): Observable<SampleDetail[]> {
    return this.http.get<SampleDetail[]>(this.apiUrl);
  }

  saveSampleDetail(sampleDetail: SampleDetail): Observable<SampleDetail> {
    return this.http.post<SampleDetail>(this.apiUrl, sampleDetail);
  }

  deleteSampleDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
