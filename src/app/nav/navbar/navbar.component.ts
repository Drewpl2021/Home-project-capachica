import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router, NavigationEnd, RouterModule, ActivatedRoute} from '@angular/router'; // Importa NavigationEnd
import { filter } from 'rxjs/operators';
import {CommonModule, NgClass} from '@angular/common';
import {CarritoService} from '../carrito-popup/carrito.service';
import {CarritoSidebarComponent} from '../carrito-popup/carrito-sidebar.component';
import {MunicipalidadService} from '../../services/municipalidad.service';
import {SectionsService} from '../../services/sections.service'; // Importa el operador filter
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

  @ViewChild(CarritoSidebarComponent) carritoSidebar!: CarritoSidebarComponent;



  constructor(private router: Router,
              private route: ActivatedRoute,
              public carritoService: CarritoService,
              private municipalidadService: MunicipalidadService,
              private sectionsService: SectionsService
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
  }

  setupNavItems(): void {
    const lugares: NavItem[] = [
      { label: 'Llachon', path: '/llachon' },
      { label: 'Chifron', path: '/chifron' },
      { label: 'Ccotos', path: '/ccotos' },
      { label: 'Isla-Tikonata', path: '/isla-tikonata' },
      { label: 'Siale-Paramis', path: '/siale-paramis' },
      { label: 'Escallani', path: '/escallani' }
    ];

    this.navItems = [
      { label: 'Inicio', path: '/' },
      { label: 'Acerca de', path: '/about' },
      { label: 'Lugares', path: '/places', children: lugares },
      { label: 'Hoteles', path: '/hotel' },
      { label: 'Blog', path: '/blog' },
      { label: 'Contacto', path: '/contact' },
      { label: 'Iniciar Sesión', path: '/sign-in' }
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
        console.log("secciones encontradas", this.sections)
      },
      (error) => {
        console.error('Error fetching sections:', error);
        this.sections = [];
      }
    );
  }


  navigateTo(path: string): void {
    this.router.navigate([path]);
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
}
