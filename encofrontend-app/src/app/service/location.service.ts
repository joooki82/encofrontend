import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationOfSampling} from "../model/locationofsampling/locationofsampling.model";


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:8080/api/locations';

  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<LocationOfSampling[]> {
    return this.http.get<LocationOfSampling[]>(this.apiUrl);
  }

  saveLocation(location: LocationOfSampling): Observable<LocationOfSampling> {
    return this.http.post<LocationOfSampling>(this.apiUrl, location);
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

