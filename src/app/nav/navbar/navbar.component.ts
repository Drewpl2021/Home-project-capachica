import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
<<<<<<< HEAD
import {Router, NavigationEnd, RouterModule} from '@angular/router'; // Importa NavigationEnd
import { filter } from 'rxjs/operators';
import {CommonModule, NgClass} from '@angular/common';
//import {CarritoPopupComponent} from '../carrito-popup/carrito-popup.component';
import {CarritoService} from '../carrito-popup/carrito.service';
import {CarritoSidebarComponent} from '../carrito-popup/carrito-sidebar.component'; // Importa el operador filter
=======
import {Router, NavigationEnd, RouterModule, ActivatedRoute } from '@angular/router'; // Importa NavigationEnd
import { filter } from 'rxjs/operators';
import {CommonModule, NgClass} from '@angular/common';
import {CarritoService} from '../carrito-sidebar/carrito.service';
import {CarritoSidebarComponent} from '../carrito-sidebar/carrito-sidebar.component'; // Importa el operador filter
>>>>>>> 425a5746f7ada7a36269474e1ff59d7d8b074380


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, CarritoSidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  navItems: { label: string; path: string }[] = [];
  mostrarPopup = false;
<<<<<<< HEAD
=======
  currentUrl: string = '';
  currentFragment: string | null = null;
>>>>>>> 425a5746f7ada7a36269474e1ff59d7d8b074380

  @ViewChild(CarritoSidebarComponent) carritoSidebar!: CarritoSidebarComponent;


<<<<<<< HEAD
  constructor(private router: Router, public carritoService: CarritoService) {
=======
  constructor(private router: Router, private route: ActivatedRoute, public carritoService: CarritoService) {
>>>>>>> 425a5746f7ada7a36269474e1ff59d7d8b074380
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

  ngOnInit(): void {
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


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Ajusta este valor según necesites
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
