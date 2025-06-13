import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../view/home/model/home';
import {EmprendedorServicio} from '../view/market/market/market';
export interface Asociacion {
  id: string;
  nombre: string;
}
@Injectable({
  providedIn: 'root'
})
export class EmprendedorService {

  private apiUrl = 'http://localhost:8000/emprendedor-service';

  constructor(private http: HttpClient) {}

  getServicio(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
  getServicioFilter(serviceId?: string): Observable<ApiResponse> {
    let params = new HttpParams();
    if (serviceId) {
      params = params.set('service_id', serviceId);
    }
    const url = 'http://localhost:8000/emprendedors-services/by-service';

    return this.http.get<ApiResponse>(url, { params });
  }
  getServicioById(serviceId: string): Observable<EmprendedorServicio> {
    const url = `${this.apiUrl}/${serviceId}`;
    return this.http.get<EmprendedorServicio>(url);
  }


}
