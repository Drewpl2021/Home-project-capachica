import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Importa NavigationEnd
import { filter } from 'rxjs/operators'; // Importa el operador filter

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isScrolled = false;

  constructor(private router: Router) {
    // Escucha los eventos de NavigationEnd para resetear el scroll
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

  navigateTo(route: string): void {
    if (route.startsWith('http')) {
      window.location.href = route;  // Redirige a una URL externa
    } else {
      this.router.navigate([route]).then(r => route);  // Redirige a una ruta interna
    }
  }
}
