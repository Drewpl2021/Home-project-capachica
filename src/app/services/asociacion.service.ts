import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../view/home/model/home';
export interface Asociacion {
  id: string;
  nombre: string;
}
@Injectable({
  providedIn: 'root'
})
export class AsociacionService {

  private apiUrl = 'http://34.201.243.186/asociaciones';

  constructor(private http: HttpClient) {}

  getAsociaciones(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

}
