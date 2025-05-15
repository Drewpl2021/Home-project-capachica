import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {CarritoService, ItemCarrito} from '../nav/carrito-sidebar/carrito.service';

@Component({
  selector: 'app-reserva',
  imports: [CommonModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
  private carritoService = inject(CarritoService);
  private router = inject(Router);
  items = computed(() => this.carritoService.items());

  confirmarReserva() {
    alert('Reserva confirmada! Gracias por su compra.');
    this.carritoService.vaciarCarrito();
    this.router.navigate(['/']); // Regresar al inicio después de confirmar
  }
}
