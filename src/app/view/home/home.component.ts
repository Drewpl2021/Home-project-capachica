import { Component, OnInit } from '@angular/core';
import AOS from 'aos';  // Importar la librería AOS
import 'aos/dist/aos.css';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {SectionsDetailService} from '../../services/sectionsDetail.service';
import {CommonModule} from '@angular/common';  // Importar el archivo CSS de AOS

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [
    CommonModule, // Asegúrate de incluir CommonModule aquí
    RouterModule
  ],
})
export class HomeComponent implements OnInit {
  sectionId: string = '';  // Variable para almacenar el ID de la sección
  sectionDetails: any = {};
  constructor(private route: ActivatedRoute,
              private sectionsDetailService: SectionsDetailService,
              ) {}

  ngOnInit(): void {
    AOS.init({
      once: false,
    });

    this.route.paramMap.subscribe(params => {
      this.sectionId = params.get('id') || '';  // Asignar el 'id' a la variable
      console.log(`Section ID from URL: ${this.sectionId}`);

      // Llamar al backend con el id de la sección
      if (this.sectionId) {
        // Llamar al método del servicio que obtiene los detalles
        this.sectionsDetailService.getsectionDetailsById(this.sectionId).subscribe(
          (data) => {
            // Ordenar los detalles por el campo 'code'
            const orderedData = Object.keys(data)
              .map(key => data[key])  // Convertir el objeto a un array de valores
              .sort((a, b) => {
                // Convertir los 'code' a números y ordenarlos
                return Number(a.code) - Number(b.code);
              });

            // Asignamos los datos ordenados a la variable sectionDetails
            this.sectionDetails = orderedData;
            console.log('Ordered Section details:', this.sectionDetails);  // Logueamos los detalles ordenados
          },
          (error) => {
            console.error('Error fetching section details:', error);  // Manejo de errores
          }
        );
      }
    });
  }



}
