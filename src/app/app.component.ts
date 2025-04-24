import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './nav/navbar/navbar.component';
import {routes} from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HomeTurismoWeb';
  constructor(private router: Router) {
    this.router.config = routes;  // Configura las rutas directamente
  }
  isLoading = true;

  ngOnInit() {
    // Simulamos un retraso para simular carga (puedes usar tu propio servicio)
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Cambia el tiempo según sea necesario
  }
}
