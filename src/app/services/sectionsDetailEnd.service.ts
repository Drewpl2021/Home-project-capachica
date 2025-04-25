import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionsDetailEndService {
  private apiUrl = 'http://localhost:8000/sectionDetailEnds';

  constructor(private http: HttpClient) {}

  // Método para obtener datos desde la API
  getsectionDetailEnds(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para agregar una nueva municipalidad
  addsectionDetailEnds(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Método para actualizar una municipalidad
  updatesectionDetailEnds(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Método para eliminar una municipalidad
  deletesectionDetailEnds(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
