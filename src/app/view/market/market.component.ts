import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule aquí
import {CarritoService} from '../../nav/carrito-sidebar/carrito.service';
import {ActivatedRoute} from '@angular/router';
import {AsociacionService} from '../../services/asociacion.service';
import {EmprendedorService} from '../../services/EmprendedorService.service';
import {ApiResponse, EmprendedorServicio} from './market/market';

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
export class MarketComponent implements OnInit {
  emprendedorServicio: EmprendedorServicio | null = null;
  serviceId: string | null = null;
  imagenPrincipal: string = '';
  emprendedorServicios: EmprendedorServicio[] = []; // tipo any para evitar líos
  selectedCategory: any = null;


  constructor(private readonly carritoService: CarritoService,
              private readonly route: ActivatedRoute,
              private _emprendedorService: EmprendedorService,

  ) {}

  ngOnInit() {
    this.serviceId = this.route.snapshot.paramMap.get('serviceId');
    if (this.serviceId) {
      this.cargarDatosPorId(this.serviceId);
    }
    if (this.emprendedorServicio?.img_emprendedor_services?.length) {
      this.imagenPrincipal = this.emprendedorServicio.img_emprendedor_services[0].url_image;
    }
  }
  agregarAlCarrito(titulo: string, descripcion: string, imagen: string, precio: number) {
    this.carritoService.agregarItem({ titulo, descripcion, imagen, precio });
  }

  private cargarDatosPorId(id: string) {
    this._emprendedorService.getServicioById(id).subscribe({
      next: (servicio) => {
        this.emprendedorServicio = servicio;

        if (servicio.img_emprendedor_services.length) {
          this.imagenPrincipal = servicio.img_emprendedor_services[0].url_image;
        }

        // Obtener el ID del service y pasar a uploadData para filtrar
        const serviceId = servicio.service.id;
        this.uploadData(serviceId);
      },
      error: (err) => {
        console.error('Error al cargar servicio por ID:', err);
      }
    });
  }

  private uploadData(serviceId?: string) {
    this._emprendedorService.getServicioFilter(serviceId).subscribe({
      next: (response: ApiResponse) => {
        this.emprendedorServicios = response.content || [];
          console.log("Hoteles AAA", this.emprendedorServicio)
      },
    });

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
  cantidad = 1;

  cambiarLugar(lugarId: string) {
    const lugar = this.lugares.find(l => l.id === lugarId);
    if (lugar) {
      this.lugarSeleccionado = lugar;
      this.imagenPrincipal = lugar.imagenes[0];
      this.cantidad = 1; // reinicia la cantidad al cambiar de lugar
    }
  }

  cambiarImagenPrincipal(url: string) {
    this.imagenPrincipal = url;
  }
  disminuirCantidad() {
    if (this.cantidad > 1) this.cantidad--;
  }

  aumentarCantidad() {
    if (this.cantidad < 20) this.cantidad++;
  }

}
