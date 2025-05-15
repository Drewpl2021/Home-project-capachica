import {Component, AfterViewInit, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {NavbarComponent} from './nav/navbar/navbar.component';
import {routes} from './app.routes';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'HomeTurismoWeb';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.router.config = routes;  // Configura rutas
  }
  token: string | null = null;
  isLoading = true;

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const tokenFromUrl = params.get('token');

      if (tokenFromUrl) {
        console.log('Token recibido desde URL:', tokenFromUrl);
        this.token = tokenFromUrl;
        localStorage.setItem('token', tokenFromUrl);

        this.getCurrentUser(tokenFromUrl);

        this.router.navigate([], {
          queryParams: { token: null },
          queryParamsHandling: 'merge',
          replaceUrl: true,
        });
      } else {
        // No token en URL, revisamos localStorage
        const tokenStored = localStorage.getItem('token');
        if (tokenStored) {
          console.log('Token recuperado de localStorage:', tokenStored);
          this.token = tokenStored;
          this.getCurrentUser(tokenStored);
        } else {
          console.log('No hay token en URL ni en localStorage');
          // Aquí podrías redirigir a login o mostrar mensaje
        }
      }
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 200);
    AOS.init({
      duration: 1000,
      once: false
    });// Cambia el tiempo según sea necesario
  }

  ngAfterViewInit(): void {
    // Espera a que se haya completado la carga de la vista
    setTimeout(() => {
      const loader = document.getElementById('ftco-loader');
      if (loader) {
        loader.classList.remove('show');
      }
    }, 500);
  }



    getCurrentUser(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get('http://localhost:8000/current-user', { headers })
      .subscribe({
        next: (response) => {
          console.log('Datos usuario actual:', response);
        },
        error: (error) => {
          console.error('Error al obtener usuario actual:', error);
        }
      });
  }
}
