import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SamplingRecord} from "../model/sampling-record/sampling-record.model";
import {Observable} from "rxjs";
import {User} from "../model/user/user.model";
import {Contaminant} from "../model/contaminant/contaminant.model";
import {Equipment} from "../model/equipment/equipment.model";
import {LocationOfSampling} from "../model/locationofsampling/locationofsampling.model";
import {AdjustmentMethod, SamplingType} from "../model/sample-detail/sample-detail.model";


@Injectable({
  providedIn: 'root'
})
export class AddSamplingRecordService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Method to save the sampling record
  saveSamplingRecord(record: SamplingRecord): Observable<any> {
    console.log('record', record);
    return this.http.post(`${this.baseUrl}/sampling-records`, record);
  }

  // Method to load initial data
  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  loadContaminants(): Observable<Contaminant[]> {
    return this.http.get<Contaminant[]>(`${this.baseUrl}/contaminants`);
  }

  loadEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.baseUrl}/equipments`);
  }

  loadLocations(): Observable<LocationOfSampling[]> {
    return this.http.get<LocationOfSampling[]>(`${this.baseUrl}/locations`);
  }

  loadAdjustmentMethods(): Observable<AdjustmentMethod[]> {
    return this.http.get<AdjustmentMethod[]>(`${this.baseUrl}/adjustment-methods`);
  }

  loadSamplingTypes(): Observable<SamplingType[]> {
    return this.http.get<SamplingType[]>(`${this.baseUrl}/sampling-types`);
  }



}
