import { Component, OnInit } from '@angular/core';
import {CommonModule, NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import { AsociacionService} from '../../services/asociacion.service';
import {ApiResponse, Asociacion} from './model/home';
import {Observable} from 'rxjs';

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
  asociaciones: Asociacion[] = []; // tipo any para evitar líos
  imageIndexes: number[] = []; // índice actual para la imagen de cada asociación


  constructor(private asociacionService: AsociacionService) {}


  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos() {
    this.asociacionService.getAsociaciones().subscribe({
      next: (response: ApiResponse) => {
        this.asociaciones = response.content || [];
        this.iniciarCarruseles();
      },
      error: (err) => console.error('Error al cargar asociaciones:', err)
    });
  }

  private iniciarCarruseles() {
    // Inicializar todos los índices en 0
    this.imageIndexes = this.asociaciones.map(() => 0);

    // Cada 4 segundos cambia la imagen activa de cada asociación
    setInterval(() => {
      this.imageIndexes = this.imageIndexes.map((currentIndex, i) => {
        if (!this.asociaciones[i]?.imagenes || this.asociaciones[i].imagenes.length === 0) {
          return 0;
        }
        return (currentIndex + 1) % this.asociaciones[i].imagenes.length;
      });
    }, 4000);
  }
  scrollLeft(): void {
    const carousel = document.getElementById('carousel');
    if (carousel) carousel.scrollLeft -= 300;
  }

  scrollRight(): void {
    const carousel = document.getElementById('carousel');
    if (carousel) carousel.scrollLeft += 300;
  }
}
