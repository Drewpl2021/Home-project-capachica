import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionsDetailService {
  private apiUrl = 'http://localhost:8000/sectionDetails';

  constructor(private http: HttpClient) {}

  // Método para obtener datos desde la API
  getsectionDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getsectionDetailsById(id: string): Observable<any> {
    const url = `http://localhost:8000/sectionDetails/byId/${id}`; // Construir la URL con el id
    return this.http.get<any>(url);  // Realiza la solicitud GET a la URL dinámica
  }
  // Método para agregar una nueva municipalidad
  addsectionDetails(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Método para actualizar una municipalidad
  updatesectionDetails(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Método para eliminar una municipalidad
  deletesectionDetails(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
