import { Component } from '@angular/core';
import { CarritoService } from '../../nav/carrito-popup/carrito.service';  // ajusta según tu ruta

@Component({
  selector: 'app-llachon',
  standalone: true,
  templateUrl: './llachon.component.html',
  styleUrl: './llachon.component.css',
  imports: []
})
export class LlachonComponent {
  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(titulo: string, descripcion: string, imagen: string) {
    this.carritoService.agregarItem({ titulo, descripcion, imagen });
  }
}
