import { Component, OnInit } from '@angular/core';
import AOS from 'aos';  // Importar la librería AOS
import 'aos/dist/aos.css';
import {ActivatedRoute} from '@angular/router';
import {SectionsDetailService} from '../../services/sectionsDetail.service';  // Importar el archivo CSS de AOS

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  sectionId: string = '';  // Variable para almacenar el ID de la sección
  sectionDetails: any = {};
  constructor(private route: ActivatedRoute,
              private sectionsDetailService: SectionsDetailService ) {}

  ngOnInit(): void {
    // Obtener el id de la URL
    this.route.paramMap.subscribe(params => {
      this.sectionId = params.get('id') || '';  // Asignar el 'id' a la variable
      console.log(`Section ID from URL: ${this.sectionId}`);

      // Llamar al backend con el id de la sección
      if (this.sectionId) {
        // Llamar al método del servicio que obtiene los detalles
        this.sectionsDetailService.getsectionDetailsById(this.sectionId).subscribe(
          (data) => {
            this.sectionDetails = data; // Asignamos los datos a la variable sectionDetails
            console.log('Section details:', this.sectionDetails);  // Logueamos los detalles
          },
          (error) => {
            console.error('Error fetching section details:', error);  // Manejo de errores
          }
        );
      }
    });
  }
}
