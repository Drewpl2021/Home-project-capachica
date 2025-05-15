import { Component } from '@angular/core';
import { CarritoService } from '../../nav/carrito-popup/carrito.service';  // ajusta según tu ruta

@Component({
  selector: 'app-chifron',
  imports: [],
  templateUrl: './chifron.component.html',
  styleUrl: './chifron.component.css'
})
export class ChifronComponent {
  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(titulo: string, descripcion: string, imagen: string) {
    this.carritoService.agregarItem({ titulo, descripcion, imagen });
  }

}
