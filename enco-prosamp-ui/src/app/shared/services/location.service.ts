import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { catchError, Observable, tap } from 'rxjs';
import {LocationOfSampling} from "../../model/locationofsampling/locationofsampling.model";
import {environment} from "../../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = environment.apiUrl + '/locations';

  constructor(private http: HttpClient) {}

  getAllLocations(): Observable<LocationOfSampling[]> {
      console.log('Making API request to /api/locations');


      return this.http.get<LocationOfSampling[]>(this.apiUrl).pipe(
          tap((response) => console.log('API Response:', response)),
          catchError((error) => {
              console.error('API Error:', error);
              throw error;
          })
      );
  }


  saveLocation(location: LocationOfSampling): Observable<LocationOfSampling> {
    return this.http.post<LocationOfSampling>(this.apiUrl, location);
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

