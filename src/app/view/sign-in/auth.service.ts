import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import { Router } from '@angular/router';
import {CarritoService, ItemCarrito} from '../../nav/carrito-sidebar/carrito.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedIn = signal(false);
  private _userData = signal<{name: string, last_name: string} | null>(null);
  private authState = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:8000';

  authState$ = this.authState.asObservable();
  userData = this._userData.asReadonly();

  constructor(private http: HttpClient, private router: Router, private carritoService: CarritoService) {
    // Verificar token al iniciar el servicio
    this.checkAuthState();
  }

  login(username: string, password: string) {
    return this.http.post<{
      status: boolean;
      message: string;
      data?: {
        token: string;
        username: {
          name: string;
          last_name: string;
        };
      };
    }>(`${this.apiUrl}/login`, {
      username: username,  // Asegúrate de usar "username" en lugar de "email"
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).pipe(
      tap(response => {
        if (response.status && response.data?.token) {
          localStorage.setItem('auth_token', response.data.token);
          this._userData.set({
            name: response.data.username.name,
            last_name: response.data.username.last_name
          });
          this._loggedIn.set(true);
          this.authState.next(true);
        } else {
          throw new Error(response.message);
        }
      }),
      catchError(error => {
        throw new Error(error.error?.message || error.message || 'Error de conexión');
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('auth_token');
        this._loggedIn.set(false);
        this._userData.set(null);
        this.authState.next(false);
      }),
      catchError(error => {
        // Aún limpiamos el estado aunque falle el logout en el backend
        localStorage.removeItem('auth_token');
        this._loggedIn.set(false);
        this._userData.set(null);
        this.authState.next(false);
        return throwError(error);
      })
    );
  }

  fetchCurrentUser() {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    return this.http.get<{
      data: {
        username: {
          name: string;
          last_name: string;
        }
      }
    }>(`${this.apiUrl}/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap(response => {
        this._loggedIn.set(true);
        this._userData.set({
          name: response.data.username.name,
          last_name: response.data.username.last_name
        });
        this.authState.next(true);
      })
    ).subscribe();
  }

  private checkAuthState() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.fetchCurrentUser();
    }
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn() {
    return this._loggedIn();
  }
  // Agrega este m3todo al AuthService
  restoreCarritoAfterLogin(carrito: ItemCarrito[]): void {
    if (carrito && carrito.length > 0) {
      this.carritoService.cargarCarrito(carrito);
    }
  }
}
