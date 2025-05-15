import { Component, AfterViewInit } from '@angular/core';
import {CarritoService} from '../../nav/carrito-sidebar/carrito.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-isla-tikonata',
  imports: [],
  templateUrl: './isla-tikonata.component.html',
  styleUrl: './isla-tikonata.component.css'
})
export class IslaTikonataComponent implements  AfterViewInit {
  constructor(private readonly carritoService: CarritoService, private readonly route: ActivatedRoute,) {}
  //carrito
  agregarAlCarrito(titulo: string, descripcion: string, imagen: string) {
    this.carritoService.agregarItem({ titulo, descripcion, imagen });
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
