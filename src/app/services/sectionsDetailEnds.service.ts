import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionsDetailEndsService {
  private apiUrl = 'http://34.201.243.186/sectionDetailEnds';

  constructor(private http: HttpClient) {}

  // Método para obtener datos desde la API
  getsectionDetailsEnds(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getsectionDetailsEndsById(id: string): Observable<any> {
    const url = `http://34.201.243.186/sectionDetails/byId/${id}`; // Construir la URL con el id
    return this.http.get<any>(url);  // Realiza la solicitud GET a la URL dinámica
  }
  // Método para agregar una nueva municipalidad
  addsectionDetailsEnds(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Método para actualizar una municipalidad
  updatesectionDetailsEnds(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Método para eliminar una municipalidad
  deletesectionDetailsEnds(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
