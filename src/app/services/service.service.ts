import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../view/home/model/home';
export interface Asociacion {
  id: string;
  nombre: string;
}
@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private apiUrl = 'http://54.84.249.35/service';

  constructor(private http: HttpClient) {}

  getServicio(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
  getServicioFilter(category?: string): Observable<ApiResponse> {
    let params = new HttpParams();
    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }
}
