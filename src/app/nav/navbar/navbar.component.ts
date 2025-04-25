import {Component, HostListener, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {MunicipalidadService} from '../../services/municipalidad.service';
import {SectionsService} from '../../services/sections.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  municipalidades: any[] = [];
  distrito: string = ''; // Valor inicial vacío
  sections: any[] = [];
  currentSectionName: string = 'Inicio';
  navbarLinks: any[] = [
    { id: '01', route: '/home', name: 'Inicio' },
    { id: '02', route: '/about', name: 'Acerca de' },
    { id: '03', route: '/places', name: 'Lugares' },
    { id: '04', route: '/hotel', name: 'Hoteles' },
    { id: '05', route: '/blog', name: 'Blog' },
    { id: '06', route: '/contact', name: 'Contacto' },
    { id: '07', route: 'http://localhost:4200/sign-in', name: 'Iniciar Sesion' },
  ];



  constructor(private router: Router,
              private municipalidadService: MunicipalidadService,
              private sectionsService: SectionsService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Ajusta este valor según necesites
  }
  ngOnInit(): void {
    this.loadMunicipalidades();
    this.loadSections();

    this.distrito = "Capachica";
    this.municipalidadService.getMunicipalidades().subscribe((data: any) => {
      if (data && data.content && data.content[0]) {
        this.distrito = data.content[0].distrito; // Aquí asignas el valor del distrito
      }
    });
  }

  loadMunicipalidades(): void {
    this.municipalidadService.getMunicipalidades().subscribe(
      (data) => {
        this.municipalidades = data;
      },
    );
  }
  loadSections(): void {
    // Llamada al servicio para obtener las secciones desde el backend
    this.sectionsService.getSections().subscribe(
      (data) => {
        this.sections = data.content && Array.isArray(data.content) ? data.content : [];
        this.updateNavLinks(); // Llamamos para actualizar los nombres en los enlaces
      },
      (error) => {
        console.error('Error fetching sections:', error); // Manejo de errores
        this.sections = []; // Asegura que 'sections' esté vacío en caso de error
      }
    );
  }
  updateNavLinks(): void {
    this.navbarLinks.forEach((link) => {
      const section = this.sections.find((s) => s.code === link.id);
      if (section) {
        link.name = section.name; // Asigna el nombre de la sección al enlace
      }
    });
  }
  navigateTo(route: string, sectionId: string): void {
    const section = this.sections.find((s) => s.code === sectionId);


    if (route.startsWith('http')) {
      window.location.href = route; // Redirige a una URL externa
    } else {
      // Si la ruta es interna, agregamos el UUID a la URL en lugar del code
      if (section) {
        this.router.navigate([route, section.id]); // Redirige a una ruta interna con el UUID
      }
    }
  }

}
