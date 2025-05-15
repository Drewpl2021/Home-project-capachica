import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedIn = signal(false); // por defecto no logeado
  private _email = signal<string | null>(null);

  loggedIn = this._loggedIn.asReadonly();
  email = this._email.asReadonly();

  login(email: string, password: string): boolean {
    // Simulación simple: acepta cualquier email y contraseña no vacíos
    if(email.trim() && password.trim()) {
      this._loggedIn.set(true);
      this._email.set(email);
      return true;
    }
    return false;
  }

  logout() {
    this._loggedIn.set(false);
    this._email.set(null);
  }

  isLoggedIn() {
    return this._loggedIn();
  }
}
