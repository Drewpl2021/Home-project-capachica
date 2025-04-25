import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  private apiUrl = 'http://localhost:8000/sections';

  constructor(private http: HttpClient) {}

  // Método para obtener datos desde la API
  getSections(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para agregar una nueva municipalidad
  addsections(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Método para actualizar una municipalidad
  updatesections(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Método para eliminar una municipalidad
  deletesections(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
