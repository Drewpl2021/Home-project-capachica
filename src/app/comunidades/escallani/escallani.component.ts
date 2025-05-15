import { Component } from '@angular/core';
import {CarritoService} from '../../nav/carrito-popup/carrito.service';

@Component({
  selector: 'app-escallani',
  imports: [],
  templateUrl: './escallani.component.html',
  styleUrl: './escallani.component.css'
})
export class EscallaniComponent {
  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(titulo: string, descripcion: string, imagen: string) {
    this.carritoService.agregarItem({ titulo, descripcion, imagen });
  }

}
