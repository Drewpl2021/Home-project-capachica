import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}
  navigateTo(route: string): void {
    if (route.startsWith('http')) {
      window.location.href = route;  // Redirige a una URL externa
    } else {
      this.router.navigate([route]);  // Redirige a una ruta interna
    }
  }
}
