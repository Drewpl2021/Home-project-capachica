import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule aquí
import {CarritoService} from '../../nav/carrito-sidebar/carrito.service';
import {ActivatedRoute} from '@angular/router';
import {AsociacionService} from '../../services/asociacion.service';
import {EmprendedorService} from '../../services/EmprendedorService.service';
import {ApiResponsable, ApiResponse, ApiResponsedes, EmprendedorServicio} from './market/market';
import {ServicioService} from '../../services/service.service';
import {Servicios} from '../home/model/home';

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
  emprendedorServicios: EmprendedorServicio[] = [];
  tours: EmprendedorServicio[] = [];
  gastronomia: EmprendedorServicio[] = [];
  artesanias: EmprendedorServicio[] = [];
  transporte: EmprendedorServicio[] = [];
  hotel: EmprendedorServicio[] = [];
  selectedhotel: any = null;
  selectedCategory: any = null;
  selectedgastro: any = null;
  selectedarte: any = null;
  selectedcard: any = null;

  cantidad = 1;
  servicios: Servicios[] = []; // tipo any para evitar líos


  constructor(private readonly carritoService: CarritoService,
              private readonly route: ActivatedRoute,
              private _emprendedorService: EmprendedorService,
              private _servicioService: ServicioService,

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
    });
    this._servicioService.getServicio().subscribe({
      next: (response: ApiResponsable) => {
        this.servicios = response.content || [];
        this.selectedhotel = this.servicios.find(item => item.code === "01") || null;
        this.selectedCategory = this.servicios.find(item => item.code === "02") || null;
        this.selectedgastro = this.servicios.find(item => item.code === "03") || null;
        this.selectedarte = this.servicios.find(item => item.code === "04") || null;
        this.selectedcard = this.servicios.find(item => item.code === "05") || null;

        if (this.selectedhotel, this.selectedCategory, this.selectedgastro, this.selectedarte,  this.selectedcard) {
          this.uploadhotel(this.selectedhotel.id);
          this.uploadtours(this.selectedCategory.id);
          this.uploadgastronomia(this.selectedgastro.id);
          this.uploadartesanias(this.selectedarte.id);
          this.uploadtransporte(this.selectedcard.id);

        }
      }
    });
  }
  private uploadData(serviceId?: string) {
    this._emprendedorService.getServicioFilter(serviceId).subscribe({
      // @ts-ignore
      next: (response: ApiResponsedes) => {
        this.emprendedorServicios = response.content || [];
      },
    });
  }
  private uploadhotel(serviceId?: string) {
    this._emprendedorService.getServicioFilter(serviceId).subscribe({
      // @ts-ignore
      next: (response: ApiResponsedes) => {
        this.hotel = response.content || [];
      },
    });
  }
  private uploadtours(serviceId?: string) {
    this._emprendedorService.getServicioFilter(serviceId).subscribe({
      // @ts-ignore
      next: (response: ApiResponsedes) => {
        this.tours = response.content || [];
      },
    });
  }
  private uploadgastronomia(serviceId?: string) {
    this._emprendedorService.getServicioFilter(serviceId).subscribe({
      // @ts-ignore
      next: (response: ApiResponsedes) => {
        this.gastronomia = response.content || [];
      },
    });
  }
  private uploadartesanias(serviceId?: string) {
    this._emprendedorService.getServicioFilter(serviceId).subscribe({
      // @ts-ignore
      next: (response: ApiResponsedes) => {
        this.artesanias = response.content || [];
      },
    });
  }
  private uploadtransporte(serviceId?: string) {
      this._emprendedorService.getServicioFilter(serviceId).subscribe({
        // @ts-ignore
        next: (response: ApiResponsedes) => {
          this.transporte = response.content || [];
        },
      });
  }



  seleccionarServicio(id: string) {
    this.serviceId = id;
    this.cargarDatosPorId(id);

    window.scrollTo({ top: 0, behavior: 'smooth' }); // 🔼 scroll hacia arriba

    const todasLasCategorias = [
      ...this.hotel,
      ...this.tours,
      ...this.gastronomia,
      ...this.artesanias,
      ...this.transporte,
    ];

    const servicioSeleccionado = todasLasCategorias.find(serv => serv.id === id);

    if (servicioSeleccionado) {
      this.emprendedorServicio = servicioSeleccionado;
      this.imagenPrincipal = servicioSeleccionado.imagenes?.length
        ? servicioSeleccionado.imagenes[0].url_image
        : 'assets/images/default.png';
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

  protected readonly parseFloat = parseFloat;
}
