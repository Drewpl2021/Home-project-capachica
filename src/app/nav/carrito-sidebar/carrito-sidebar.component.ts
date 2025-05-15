import { Component, computed, inject } from '@angular/core';
import {CarritoService, ItemCarrito } from './carrito.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-carrito-sidebar',
  standalone: true,
  templateUrl: './carrito.sidebar.component.html',
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrl: './carrito-sidebar.component.css',
})
export class CarritoSidebarComponent {
  private carritoService = inject(CarritoService);
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

  aumentar(titulo: string) {
    this.carritoService.aumentarCantidad(titulo);
  }

  disminuir(titulo: string) {
    this.carritoService.disminuirCantidad(titulo);
  }

  pagar() {
    // Aquí puedes poner la lógica para generar reserva o redirigir
    alert('Funcionalidad de generar reserva aún no implementada.');
  }
}
