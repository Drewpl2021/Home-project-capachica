import { Component } from '@angular/core';
import {CarritoService} from '../../nav/carrito-popup/carrito.service';

@Component({
  selector: 'app-siale-paramis',
  imports: [],
  templateUrl: './siale-paramis.component.html',
  styleUrl: './siale-paramis.component.css'
})
export class SialeParamisComponent {
  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(titulo: string, descripcion: string, imagen: string) {
    this.carritoService.agregarItem({ titulo, descripcion, imagen });
  }

}
