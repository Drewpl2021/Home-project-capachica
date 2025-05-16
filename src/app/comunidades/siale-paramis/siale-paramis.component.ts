import { Component, AfterViewInit } from '@angular/core';
import {CarritoService} from '../../nav/carrito-sidebar/carrito.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-siale-paramis',
  imports: [],
  templateUrl: './siale-paramis.component.html',
  styleUrl: './siale-paramis.component.css'
})

export class SialeParamisComponent implements AfterViewInit {
  constructor(private readonly carritoService: CarritoService, private readonly route: ActivatedRoute) {}
  //carrito
  agregarAlCarrito(titulo: string, descripcion: string, imagen: string, precio: number) {
    this.carritoService.agregarItem({ titulo, descripcion, imagen, precio });
  }
  //navegacion
  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
