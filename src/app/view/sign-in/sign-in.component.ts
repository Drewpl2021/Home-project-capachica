import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { NgIf } from '@angular/common';
import {CarritoService} from '../../nav/carrito-sidebar/carrito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class SignInComponent {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private carritoService: CarritoService
  ) {}

  login(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    this.errorMessage = '';

    // Verificar si hay carrito en los query params
    const carritoParam = this.route.snapshot.queryParamMap.get('carrito');
    let carritoPrevio = [];

    if (carritoParam) {
      try {
        carritoPrevio = JSON.parse(decodeURIComponent(carritoParam));
      } catch (e) {
        console.error('Error al parsear carrito:', e);
      }
    }

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        // Restaurar carrito después de login exitoso
        if (carritoPrevio.length > 0) {
          this.authService.restoreCarritoAfterLogin(carritoPrevio);
        }
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message || 'Error al iniciar sesión';
      }
    });
  }
}
