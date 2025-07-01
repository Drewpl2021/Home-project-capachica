import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private apiUrl = 'http://34.201.243.186/reservas';

  constructor(private http: HttpClient) {}

  // Método para obtener datos desde la API
  getSections(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para agregar una nueva reserva
  crearReserva(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Método para actualizar una reserva
  updateReserva(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Método para eliminar una reserva
  deleteReserva(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
