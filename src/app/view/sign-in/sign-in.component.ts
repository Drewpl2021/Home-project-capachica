import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [
    FormsModule,
    NgIf
  ]
})
export class SignInComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(event: Event) {
    event.preventDefault();
    const success = this.authService.login(this.email, this.password);
    if (success) {
      this.errorMessage = '';
      this.router.navigate(['/']); // redirige a home o a donde quieras
    } else {
      this.errorMessage = 'Email y contraseña son requeridos';
    }
  }
}
