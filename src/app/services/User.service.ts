import {Injectable, signal} from '@angular/core';
export interface UserData {
  name: string;
  last_name: string;
  // otros campos que quieras
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _token = signal<string | null>(null);
  token = this._token.asReadonly();

  private _user = signal<UserData | null>(null);
  user = this._user.asReadonly();

  setToken(token: string | null) {
    this._token.set(token);
  }

  setUser(user: UserData | null) {
    this._user.set(user);
  }
}
