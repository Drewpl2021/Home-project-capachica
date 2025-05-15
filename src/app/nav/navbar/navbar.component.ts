import {Component, HostListener, OnInit} from '@angular/core';
import {MunicipalidadService} from '../../services/municipalidad.service';
import {SectionsService} from '../../services/sections.service';
import {CommonModule, NgClass} from '@angular/common'; // Importa el operador filter
import {Router, NavigationEnd, RouterModule} from '@angular/router'; // Importa NavigationEnd

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  navItems: { label: string; path: string }[] = [];
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
    //{ id: '07', route: 'https://home-project-capachica-eihz.vercel.app/sign-in', name: 'Iniciar Sesion' },
    { id: '07', route: 'http://localhost:4200/sign-in', name: ' Iniciar Sesion'}
  ];
  constructor(private router: Router,
              private municipalidadService: MunicipalidadService,
              private sectionsService: SectionsService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0); // Establece la posición del scroll a la parte superior
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Ajusta este valor según necesites
  }
  ngOnInit(): void {
    this.loadMunicipalidades();
    this.loadSections();
    this.setupScrollListener();
    this.setupNavItems();

    this.distrito = "Capachica";
    this.municipalidadService.getMunicipalidades().subscribe((data: any) => {
      if (data && data.content && data.content[0]) {
        this.distrito = data.content[0].distrito; // Aquí asignas el valor del distrito
      }
    });
  }

  setupNavItems(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.includes('/llachon') ||
          url.includes('/chifron') ||
          url.includes('/ccotos') ||
          url.includes('/isla-tikonata') ||
          url.includes('/siale-paramis') ||
          url.includes('/escallani')) {
          this.navItems = [
            { label: 'Inicio', path: '/' },
            { label: 'Llachon', path: '/llachon' },
            { label: 'Chifron', path: '/chifron' },
            { label: 'Ccotos', path: '/ccotos' },
            { label: 'Isla-Tikonata', path: '/isla-tikonata' },
            { label: 'Siale-Paramis', path: '/siale-paramis' },
            { label: 'Escallani', path: '/escallani' },
            { label: 'Iniciar Sesión', path: '/sign-in' }
          ];
        } else {
          this.navItems = [
            { label: 'Inicio', path: '/' },
            { label: 'Acerca de', path: '/about' },
            { label: 'Lugares', path: '/places' },
            { label: 'Hoteles', path: '/hotel' },
            { label: 'Blog', path: '/blog' },
            { label: 'Contacto', path: '/contact' },
            { label: 'Iniciar Sesión', path: '/sign-in' }
          ];
        }
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
  navigateTo(route: string, sectionId: string, path: string): void {
    this.router.navigate([path]);


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
  isActive(path: string): boolean {
    return this.router.url === path;
  }

  setupScrollListener(): void {
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > 50;
    });
  }
}
