import { Component, AfterViewInit } from '@angular/core';
import {CarritoService} from '../../nav/carrito-sidebar/carrito.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-escallani',
  imports: [],
  standalone: true,
  templateUrl: './escallani.component.html',
  styleUrl: './escallani.component.css'
})

export class EscallaniComponent implements AfterViewInit {
  constructor(private readonly carritoService: CarritoService, private readonly route: ActivatedRoute,) {}
  //carrito
  agregarAlCarrito(id: string,titulo: string, descripcion: string, imagen: string, precio: number) {
    this.carritoService.agregarItem({ id,titulo, descripcion, imagen, precio });
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
