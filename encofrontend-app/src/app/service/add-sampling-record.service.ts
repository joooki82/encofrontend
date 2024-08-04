import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contaminant} from "../model/contaminant/contaminant.model";
import {Equipment} from "../model/equipment/equipment.model";
import {LocationOfSampling} from "../model/locationofsampling/locationofsampling.model";
import {AdjustmentMethod, SamplingType} from "../model/sample-detail/sample-detail.model";
import {User} from "../model/user/user.model";
import {SamplingRecord} from "../model/sampling-record/sampling-record.model";

@Injectable({
  providedIn: 'root'
})
export class AddSamplingRecordService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getContaminants(): Observable<Contaminant[]> {
    return this.http.get<Contaminant[]>(`${this.baseUrl}/contaminants`);
  }

  getEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.baseUrl}/equipments`);
  }

  getLocations(): Observable<LocationOfSampling[]> {
    return this.http.get<LocationOfSampling[]>(`${this.baseUrl}/locations`);
  }

  getAdjustmentMethods(): Observable<AdjustmentMethod[]> {
    return this.http.get<AdjustmentMethod[]>(`${this.baseUrl}/adjustment-methods`);
  }

  getSamplingTypes(): Observable<SamplingType[]> {
    return this.http.get<SamplingType[]>(`${this.baseUrl}/sampling-types`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  createSamplingRecord(samplingRecord: SamplingRecord): Observable<any> {
    console.log(samplingRecord)
    return this.http.post(`${this.baseUrl}/sampling-records`, samplingRecord);
  }

}
