import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isScrolled = false;

  constructor(private router: Router) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Ajusta este valor según necesites
  }

  navigateTo(route: string): void {
    if (route.startsWith('http')) {
      window.location.href = route;  // Redirige a una URL externa
    } else {
      this.router.navigate([route]);  // Redirige a una ruta interna
    }
  }
}
