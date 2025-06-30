import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router, NavigationEnd, RouterModule, ActivatedRoute} from '@angular/router'; // Importa NavigationEnd
import { filter } from 'rxjs/operators';
import {CommonModule, NgClass} from '@angular/common';
import {MunicipalidadService} from '../../services/municipalidad.service';
import {SectionsService} from '../../services/sections.service'; // Importa el operador filter
import {CarritoService} from '../carrito-sidebar/carrito.service';
import {CarritoSidebarComponent} from '../carrito-sidebar/carrito-sidebar.component';
import {AuthService} from '../../view/sign-in/auth.service';
interface NavItem {
  label: string;
  path: string;
  children?: NavItem[]; // Opcional, para submenús
}
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CarritoSidebarComponent],
  templateUrl: './navbar.component.html',

  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  navItems: NavItem[] = [];
  mostrarPopup = false;
  municipalidades: any[] = [];
  distrito: string = ''; // Valor inicial vacío
  sections: any[] = [];
  currentUrl: string = '';
  currentFragment: string | null = null;
  dropdownOpenIndex: number | null = null;
  userData: {name: string, last_name: string} | null = null;
  isUserMenuOpen = false;

  @ViewChild(CarritoSidebarComponent) carritoSidebar!: CarritoSidebarComponent;



  constructor(protected router: Router,
              private route: ActivatedRoute,
              public carritoService: CarritoService,
              private municipalidadService: MunicipalidadService,
              private sectionsService: SectionsService,
              protected authService: AuthService
  ) {
    // Escucha los eventos de NavigationEnd para resetear el scroll
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0); // Establece la posición del scroll a la parte superior
    });
  }
  /*togglePopup() {
    this.mostrarPopup = !this.mostrarPopup;
  }*/

  toggleSidebar() {
    if (this.carritoSidebar) {
      if (this.carritoSidebar.visible) {
        this.carritoSidebar.cerrar();
      } else {
        this.carritoSidebar.abrir();
      }
    }
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
    // Escuchar cambios de ruta y fragmento para activar el nav
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentUrl = this.router.url.split('#')[0];
      this.route.fragment.subscribe(fragment => {
        this.currentFragment = fragment;
      });
    });

    this.distrito = "Capachica";
    this.municipalidadService.getMunicipalidades().subscribe((data: any) => {
      if (data && data.content && data.content[0]) {
        this.distrito = data.content[0].distrito;
      }
    });

    // Suscribirse a cambios de autenticación
    this.authService.authState$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.setupNavItems(this.authService.userData());
      } else {
        this.setupNavItems();
      }
    });

  }

  setupNavItems(userData?: { name: string; last_name: string } | null) {
    console.log('Datos de usuario:', userData);

    // Busca la sección con code "01" a "06"
    const seccionInicio = this.sections.find(sec => sec.code === '01');
    const seccionAcercade = this.sections.find(sec => sec.code === '02');
    const seccionLugares = this.sections.find(sec => sec.code === '03');
    const seccionHoteles = this.sections.find(sec => sec.code === '04');
    const seccionBlog = this.sections.find(sec => sec.code === '05');
    const seccionContacto = this.sections.find(sec => sec.code === '06');

    const labelInicio = seccionInicio ? seccionInicio.name : 'Inicio';
    const labelAcercade = seccionAcercade ? seccionAcercade.name : 'Acerca de';
    const labelLugares = seccionLugares ? seccionLugares.name : 'Lugares';
    const labelHoteles = seccionHoteles ? seccionHoteles.name : 'Hoteles';
    const labelBlog = seccionBlog ? seccionBlog.name : 'Blog';
    const labelContacto = seccionContacto ? seccionContacto.name : 'Contacto';

    const lugares: NavItem[] = [
      { label: 'Llachon', path: '/llachon' },
      { label: 'Chifron', path: '/chifron' },
      { label: 'Ccotos', path: '/ccotos' },
      { label: 'Isla-Tikonata', path: '/isla-tikonata' },
      { label: 'Siale-Paramis', path: '/siale-paramis' },
      { label: 'Escallani', path: '/escallani' }
    ];

    this.navItems = [
      { label: labelInicio, path: '/' },
      { label: labelAcercade, path: '/about' },
      { label: labelLugares, path: '/places', children: lugares },
      { label: labelHoteles, path: '/hotel' },
      { label: labelBlog, path: '/blog' },
      { label: labelContacto, path: '/contact' },
    ];

  }


  toggleDropdown(index: number): void {
    if (this.dropdownOpenIndex === index) {
      this.dropdownOpenIndex = null;
    } else {
      this.dropdownOpenIndex = index;
    }
  }

  closeDropdown(): void {
    this.dropdownOpenIndex = null;
  }



  loadMunicipalidades(): void {
    this.municipalidadService.getMunicipalidades().subscribe(
      (data) => {
        this.municipalidades = data;
      },
    );
  }
  loadSections(): void {
    this.sectionsService.getSections().subscribe(
      (data) => {
        this.sections = data.content && Array.isArray(data.content) ? data.content : [];
        this.setupNavItems();
      },
      (error) => {
        console.error('Error fetching sections:', error);
        this.sections = [];
        this.setupNavItems();
      }
    );
  }


  navigateTo(path: string): void {
      if (path.startsWith('http://') || path.startsWith('https://')) {
        // URL externa, redirigir con recarga completa
        window.location.href = path;
      } else {
        // URL interna, navegar con Angular Router
        this.router.navigate([path]);
      }

  }

  isActive(path: string, fragment?: string): boolean {
    if (fragment) {
      return this.currentUrl === path && this.currentFragment === fragment;
    }
    return this.currentUrl === path;
  }

  setupScrollListener(): void {
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > 50;
    });
  }
  // Agrega este método a tu clase NavbarComponent
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.router.navigate(['/']);
      }
    });
  }

  openUserMenu(): void {
    this.isUserMenuOpen = true;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }
}
