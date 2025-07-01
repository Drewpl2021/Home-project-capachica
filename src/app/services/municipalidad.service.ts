import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MunicipalidadService {
  private apiUrl = 'http://34.201.243.186/municipalidad';

  constructor(private http: HttpClient) {}

  // Método para obtener datos desde la API
  getMunicipalidades(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para agregar una nueva municipalidad
  addMunicipalidad(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Método para actualizar una municipalidad
  updateMunicipalidad(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Método para eliminar una municipalidad
  deleteMunicipalidad(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
