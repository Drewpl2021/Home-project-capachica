import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule aquí
import {CarritoService} from '../../nav/carrito-sidebar/carrito.service';
import {ActivatedRoute} from '@angular/router';

interface Lugar {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  ubicacion: string;
  imagenes: string[];
}

@Component({
  selector: 'app-hotel',
  templateUrl: './market.component.html',
  standalone: true,
  imports: [
    CommonModule,  // <-- agrégalo aquí

  ],
  styleUrls: ['./market.component.css']
})
export class MarketComponent {
  constructor(private readonly carritoService: CarritoService, private readonly route: ActivatedRoute) {}
  //carrito
  agregarAlCarrito(titulo: string, descripcion: string, imagen: string, precio: number) {
    this.carritoService.agregarItem({ titulo, descripcion, imagen, precio });
  }
  lugares: Lugar[] = [
    {
      id: 'llachon',
      nombre: 'Llachón',
      precio: 15,
      descripcion: 'Los visitantes se hospedarán en habitaciones tradicionales de adobe, decoradas de manera autentica.',
      ubicacion: 'Capachica-Puno',
      imagenes: [
        'assets/images/hotel-11.png',
        'assets/images/hotel-12.png',
        'assets/images/hotel-9.png',
        'assets/images/hotel-8.png',
        'assets/images/hotel-10.png'
      ]
    },
    {
      id: 'ccotos',
      nombre: 'Ccotos',
      precio: 15,
      descripcion: 'Las cabañas se encuentran ubicadas al lado de las de las familias, a poca distancia del lago Titicaca',
      ubicacion: 'Ccotos - Capachica-Puno',
      imagenes: [
        'assets/images/hotel-8.png',
        'assets/images/hotel-9.png',
        'assets/images/hotel-10.png',
        'assets/images/hotel-11.png',
        'assets/images/hotel-12.png'
      ]
    },
    {
      id: 'chifron',
      nombre: 'Chifron',
      precio: 20,
      descripcion: 'Un alojamiento con habitaciones agradables, buena comida.',
      ubicacion: 'Chifron - Capachica-Puno',
      imagenes: [
        'assets/images/hotel-10.png',
        'assets/images/hotel-11.png',
        'assets/images/hotel-9.png',
        'assets/images/hotel-8.png',
        'assets/images/hotel-7.png'
      ]
    },
    {
      id: 'siale-paramis',
      nombre: 'Siale-Paramis',
      precio: 18,
      descripcion: 'Los visitantes se hospedarán en habitaciones tradicionales de adobe, decoradas de manera autentica.',
      ubicacion: 'Siale-P - Capachica-Puno',
      imagenes: [
        'assets/images/hotel-7.png',
        'assets/images/hotel-9.png',
        'assets/images/hotel-8.png',
        'assets/images/hotel-11.png',
        'assets/images/hotel-10.png'
      ]
    },
    {
      id: 'escallani',
      nombre: 'Escallani',
      precio: 20,
      descripcion: 'Los visitantes se hospedarán en hermosas habitaciones tradicionales de adobe, decoradas de manera autentica.',
      ubicacion: 'Escallani - Capachica-Puno',
      imagenes: [
        'assets/images/hotel-11.png',
        'assets/images/hotel-7.png',
        'assets/images/hotel-8.png',
        'assets/images/hotel-9.png',
        'assets/images/hotel-10.png'
      ]
    },
    {
      id: 'isla-tikonata',
      nombre: 'Isla Tikonata',
      precio: 25,
      descripcion: 'Los visitantes se hospedarán en hermosas habitaciones tradicionales circulares, de adobe y decoradas de manera autentica.',
      ubicacion: 'Isla Tikonata - Capachica-Puno',
      imagenes: [
        'assets/images/hotel-12.png',
        'assets/images/hotel-7.png',
        'assets/images/hotel-8.png',
        'assets/images/hotel-9.png',
        'assets/images/hotel-10.png'
      ]
    }
  ];

  lugarSeleccionado: Lugar = this.lugares[0];
  imagenPrincipal: string = this.lugarSeleccionado.imagenes[0];
  cantidad = 1;

  cambiarLugar(lugarId: string) {
    const lugar = this.lugares.find(l => l.id === lugarId);
    if (lugar) {
      this.lugarSeleccionado = lugar;
      this.imagenPrincipal = lugar.imagenes[0];
      this.cantidad = 1; // reinicia la cantidad al cambiar de lugar
    }
  }

  cambiarImagenPrincipal(img: string) {
    this.imagenPrincipal = img;
  }
  disminuirCantidad() {
    if (this.cantidad > 1) this.cantidad--;
  }

  aumentarCantidad() {
    if (this.cantidad < 20) this.cantidad++;
  }

}
