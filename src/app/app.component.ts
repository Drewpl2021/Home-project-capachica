import {Component, AfterViewInit, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './nav/navbar/navbar.component';
import {routes} from './app.routes';
import AOS from 'aos';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './services/User.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'HomeTurismoWeb';
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient,
              private userService: UserService) {
    this.router.config = routes;  // Configura las rutas directamente
  }
  isLoading = true;
  token: string | null = null;
  userData: { name: string; last_name: string } | null = null;

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
      } else if (!this.token) {
        // Sólo si no tenemos token cargado, pedimos token del localStorage
        const tokenStored = localStorage.getItem('token');
        if (tokenStored) {
          console.log('Token recuperado de localStorage:', tokenStored);
          this.token = tokenStored;
          this.getCurrentUser(tokenStored);
        } else {
          console.log('No hay token en URL ni en localStorage');
          // Aquí podés redirigir a login o mostrar mensaje
        }
      }
      // Si this.token ya está seteado (por ejemplo, recibimos token en esta misma suscripción), no hacer nada más
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 200);

    AOS.init({
      duration: 1000,
      once: false
    });
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
  getCurrentUser(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    this.http.get<any>('http://18.204.208.147/current-user', { headers })
      .subscribe({
        next: (response) => {
          if (response.status && response.data && response.data.username) {
            this.userService.setUser({
              name: response.data.username.name,
              last_name: response.data.username.last_name
            })
          }
        },
        error: () => {
          this.userService.setUser(null);
        }
      });
  }
}
