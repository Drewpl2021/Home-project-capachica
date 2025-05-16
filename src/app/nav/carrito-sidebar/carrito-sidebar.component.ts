import { Component, computed, inject } from '@angular/core';
import { CarritoService, ItemCarrito } from './carrito.service';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../view/sign-in/auth.service';

@Component({
  selector: 'app-carrito-sidebar',
  standalone: true,
  templateUrl: './carrito.sidebar.component.html',
  imports: [
    NgForOf,
    NgIf,
    DecimalPipe
  ],
  styleUrls: ['./carrito-sidebar.component.css'],  // corregido
})
export class CarritoSidebarComponent {

  constructor(
    private carritoService: CarritoService,
    private authService: AuthService,
    private router: Router,
  ) { }

  items = computed(() => this.carritoService.items());

  visible = false;

  abrir() {
    this.visible = true;
  }

  cerrar() {
    this.visible = false;
  }

  vaciar() {
    this.carritoService.vaciarCarrito();
  }


  pagar() {
    if (this.items().length === 0) {
      alert('El carrito está vacío. Agrega productos antes de generar reserva.');
      return;
    }

    if (!this.authService.isLoggedIn()) {
      // Serializar carrito, codificar para URL
      const carritoStr = encodeURIComponent(JSON.stringify(this.items()));

      // Redirigir a login en otro proyecto con carrito en query param
      window.location.href = `http://localhost:4200/sign-in?carrito=${carritoStr}`;
    } else {
      this.router.navigate(['/reserva']);
      this.cerrar();
    }
  }


  total = computed(() => this.carritoService.items().reduce(
    (sum, item) => sum + item.precio * item.cantidad, 0
  ));
  eliminar(titulo: string) {
    this.carritoService.eliminarItem(titulo);
  }



}
