import { Component, OnInit } from '@angular/core';
import {CommonModule, NgStyle} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { AsociacionService} from '../../services/asociacion.service';
import {ApiResponse, Asociacion, EmprendedorServicio, Servicios} from './model/home';
import {Observable} from 'rxjs';
import {ServicioService} from '../../services/service.service';
import {EmprendedorService} from '../../services/EmprendedorService.service';

@Component({
  selector: 'app-home',
  imports: [
    NgStyle,
    RouterLink,
    CommonModule
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  imageList = [
    'assets/images/inicio.png',
    'assets/images/inicio2.png',
    'assets/images/inicio3.png'
  ];
  currentImage = this.imageList[0];
  currentIndex = 0;
  selectedCategory: any = null;
  asociaciones: Asociacion[] = []; // tipo any para evitar líos
  servicios: Servicios[] = []; // tipo any para evitar líos
  emprendedorServicios: EmprendedorServicio[] = []; // tipo any para evitar líos
  comida: EmprendedorServicio[] = []; // tipo any para evitar líos
  imageIndexes: number[] = []; // índice actual para la imagen de cada asociación


  constructor(private _asociacionService: AsociacionService,
              private _servicioService: ServicioService,
              private _emprendedorService: EmprendedorService,
              private router: Router
  ) {}


  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos() {
    this._asociacionService.getAsociaciones().subscribe({
      next: (response: ApiResponse) => {
        this.asociaciones = response.content || [];
        this.iniciarCarruseles();
      },
    });

    this._servicioService.getServicio().subscribe({
      next: (response: ApiResponse) => {
        this.servicios = response.content || [];
        this.selectedCategory = this.servicios.find(item => item.code === "01") || null;

        if (this.selectedCategory) {
          this.uploadData(this.selectedCategory.id); // pasar categoría
        }
      }
    });
    this._servicioService.getServicio().subscribe({
      next: (response: ApiResponse) => {
        this.servicios = response.content || [];
        this.selectedCategory = this.servicios.find(item => item.code === "03") || null;

        if (this.selectedCategory) {
          this.uploadComida(this.selectedCategory.id); // pasar categoría
        }
      }
    });
  }

  private uploadData(id?: string) {
    this._emprendedorService.getServicioFilter(id).subscribe({
      next: (response: ApiResponse) => {
        this.emprendedorServicios = response.content || [];
        this.selectedCategory = this.emprendedorServicios.find(item => item.code === "01") || null;
        this.iniciarCarruseles();

      },
    });

  }
  private uploadComida(id?: string) {
    this._emprendedorService.getServicioFilter(id).subscribe({
      next: (response: ApiResponse) => {
        this.comida = response.content || [];
        this.selectedCategory = this.comida.find(item => item.code === "03") || null;
        this.iniciarCarruseles();

      },
    });

  }
  navigateTo(servicio: any) {
    const serviceId = servicio.id;
    this.router.navigate(['/market', serviceId]);
  }

  private iniciarCarruseles() {
    // Inicializar todos los índices en 0
    this.imageIndexes = this.asociaciones.map(() => 0);

    // Cada 4 segundos cambia la imagen activa de cada asociación
    setInterval(() => {
      this.imageIndexes = this.imageIndexes.map((currentIndex, i) => {
        // @ts-ignore
        if (!this.asociaciones[i]?.imagenes || this.asociaciones[i].imagenes.length === 0) {
          return 0;
        }
        // @ts-ignore
        return (currentIndex + 1) % this.asociaciones[i].imagenes.length;
      });
    }, 5000);
  }
  scrollLeft(): void {
    const carousel = document.getElementById('carousel');
    if (carousel) carousel.scrollLeft -= 3000;
  }

  scrollRight(): void {
    const carousel = document.getElementById('carousel');
    if (carousel) carousel.scrollLeft += 3000;
  }
}
