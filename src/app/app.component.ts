import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { routes } from './app.routes';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // corregido
})
export class AppComponent implements OnInit {
  title = 'HomeTurismoWeb';
  token: string | null = null;
  isLoading = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.router.config = routes;  // Configura rutas
  }

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
    }, 2000);
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
