import { Component } from '@angular/core';
import {CarritoService} from '../../nav/carrito-popup/carrito.service';

@Component({
  selector: 'app-isla-tikonata',
  imports: [],
  templateUrl: './isla-tikonata.component.html',
  styleUrl: './isla-tikonata.component.css'
})
export class IslaTikonataComponent {
  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(titulo: string, descripcion: string, imagen: string) {
    this.carritoService.agregarItem({ titulo, descripcion, imagen });
  }

}
