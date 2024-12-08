import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationOfSampling} from "../../model/locationofsampling/locationofsampling.model";
import {environment} from "../../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = environment.apiUrl + '/locations';

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

