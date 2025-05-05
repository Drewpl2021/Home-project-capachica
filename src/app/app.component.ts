import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './nav/navbar/navbar.component';
import {routes} from './app.routes';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'HomeTurismoWeb';
  constructor(private router: Router) {
    this.router.config = routes;  // Configura las rutas directamente
  }
  isLoading = true;

  ngOnInit() {
    // Simulamos un retraso para simular carga (puedes usar tu propio servicio)
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
    AOS.init({
      duration: 1000,
      once: true
    });// Cambia el tiempo según sea necesario
  }

  ngAfterViewInit(): void {
    // Espera a que se haya completado la carga de la vista
    setTimeout(() => {
      const loader = document.getElementById('ftco-loader');
      if (loader) {
        loader.classList.remove('show');
      }
    }, 500); // Ajusta el tiempo si es necesario
  }
}
