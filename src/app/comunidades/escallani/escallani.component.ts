<<<<<<< HEAD
import { Component } from '@angular/core';
import {CarritoService} from '../../nav/carrito-popup/carrito.service';
=======
import { Component, AfterViewInit } from '@angular/core';
import {CarritoService} from '../../nav/carrito-sidebar/carrito.service';
import { ActivatedRoute } from '@angular/router';
>>>>>>> 425a5746f7ada7a36269474e1ff59d7d8b074380

@Component({
  selector: 'app-escallani',
  imports: [],
  templateUrl: './escallani.component.html',
  styleUrl: './escallani.component.css'
})
<<<<<<< HEAD
export class EscallaniComponent {
  constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(titulo: string, descripcion: string, imagen: string) {
    this.carritoService.agregarItem({ titulo, descripcion, imagen });
  }

=======
export class EscallaniComponent implements AfterViewInit {
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
>>>>>>> 425a5746f7ada7a36269474e1ff59d7d8b074380
}
