import { Component } from '@angular/core';
import {CarritoService} from '../../nav/carrito-popup/carrito.service';

@Component({
  selector: 'app-ccotos',
  imports: [],
  templateUrl: './ccotos.component.html',
  styleUrl: './ccotos.component.css'
})
export class CcotosComponent {
  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(titulo: string, descripcion: string, imagen: string) {
    this.carritoService.agregarItem({ titulo, descripcion, imagen });
  }

}
