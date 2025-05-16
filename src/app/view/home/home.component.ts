import { Component, OnInit } from '@angular/core';
import {CommonModule, NgStyle} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { AsociacionService} from '../../services/asociacion.service';
import {ApiResponse, Asociacion, EmprendedorServicio, Servicios} from './model/home';
import {Observable} from 'rxjs';
import {ServicioService} from '../../services/service.service';
import {EmprendedorService} from '../../services/EmprendedorService.service';
import {SectionsDetailService} from '../../services/sectionsDetail.service';
import {SectionsDetailEndsService} from '../../services/sectionsDetailEnds.service';

@Component({
  selector: 'app-home',
  imports: [
    NgStyle,
    RouterLink,
    CommonModule
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  imageList = [
    'assets/images/inicio.png',
    'assets/images/inicio2.png',
    'assets/images/inicio3.png'
  ];
  currentImage = this.imageList[0];
  currentIndex = 0;
  selectedCategory: any = null;
  asociaciones: Asociacion[] = []; // tipo any para evitar líos
  servicios: Servicios[] = []; // tipo any para evitar líos
  emprendedorServicios: EmprendedorServicio[] = []; // tipo any para evitar líos
  comida: EmprendedorServicio[] = []; // tipo any para evitar líos
  imageIndexes: number[] = []; // índice actual para la imagen de cada asociación

  // Variables para títulos dinámicos
  tituloHospedajes: string = 'Hospedajes Populares';
  tituloComida: string = 'Mejores Lugares para Comer';
  tituloDestinos: string = 'Destinos más populares';
  tituloDescubrevive: string = 'Descubre - Vive - Conecta';
  tituloDescubrecapachica: string = 'Descrubre la Península de Capachica';
  descripcionDescubrecapachica: string = 'Sumérgete en la cultura y belleza natural de este rincón de Puno';
  titulovacaciones: string = 'Vea nuestras ultimas ideas de vacaciones';
  titulolomejor: string = 'Lo mejor de Capachica';
  descripcionlomejor: string = 'Descripcion de Capachica';

  //Variables para opciones dentro de las secciones
  //Descubre - Vive - Conecta
  subtituloDescubre: string = 'Descubre en Capachica';
  subdescripcionDescubre: string = 'Un rincón único a orillas del majestuoso Lago Titicaca, donde la naturaleza y la cultura ancestral se entrelazan. Déjate cautivar por sus impresionantes paisajes y su gente acogedora.';
  subtituloVive: string = 'Vive la Experiencia';
  subdescripcionVive: string = 'Sumérgete en la autenticidad de sus comunidades quechuas, disfruta de la gastronomía local y explora sus islas flotantes y naturales. Un destino lleno de historia y tradición.';
  subtituloConecta: string = 'Conecta con la Naturaleza';
  subdescripcionConecta: string = 'En Capachica, la tranquilidad del lago y el aire puro andino te invitan a desconectarte del estrés diario. Un lugar ideal para recargar energías y crear momentos inolvidables.';
  //Vea nuestras ideas de vacaciones
  subtituloPaisaje: string = 'Paisaje frente a la playa';
  subtituloVacaciones: string = 'Vacaciones en grupo';
  subtituloArtesania: string = 'Artesana';


  constructor(private _asociacionService: AsociacionService,
              private _servicioService: ServicioService,
              private _emprendedorService: EmprendedorService,
              private _sectionsDetailService: SectionsDetailService,
              private _sectionsDetailEndsService: SectionsDetailEndsService,
              private router: Router
  ) {}


  ngOnInit(): void {
    this.cargarDatos();
    this.cargarTitulosDinamicos();
    this.cargarSuntitulosDinamicos()
  }

  private cargarDatos() {
    this._asociacionService.getAsociaciones().subscribe({
      next: (response: ApiResponse) => {
        this.asociaciones = response.content || [];
        this.iniciarCarruseles();
      },
    });

    this._servicioService.getServicio().subscribe({
      next: (response: ApiResponse) => {
        this.servicios = response.content || [];
        this.selectedCategory = this.servicios.find(item => item.code === "01") || null;

        if (this.selectedCategory) {
          this.uploadData(this.selectedCategory.id); // pasar categoría
        }
      }
    });
    this._servicioService.getServicio().subscribe({
      next: (response: ApiResponse) => {
        this.servicios = response.content || [];
        this.selectedCategory = this.servicios.find(item => item.code === "03") || null;

        if (this.selectedCategory) {
          this.uploadComida(this.selectedCategory.id); // pasar categoría
        }
      }
    });
  }

  private cargarTitulosDinamicos() {
    this._sectionsDetailService.getsectionDetails().subscribe({
      next: (data: any[]) => {
        // Suponiendo que data es un array plano
        const descubrecapachica = data.find((item: any) => item.code === '01');
        const descubrevive = data.find((item: any) => item.code === '02');
        const vacaciones = data.find((item: any) => item.code === '03');
        const lomejor = data.find((item: any) => item.code === '04');
        const destinos = data.find((item: any) => item.code === '05');
        const hospedajes = data.find((item: any) => item.code === '06');
        const comida = data.find((item: any) => item.code === '07');

        this.tituloDescubrecapachica = descubrecapachica ? descubrecapachica.title : 'Descrubre la Península de Capachica';
        this.descripcionDescubrecapachica = descubrecapachica ? descubrecapachica.description : 'Sumérgete en la cultura y belleza natural de este rincón de Puno';
        this.tituloDescubrevive = descubrevive ? descubrevive.title: 'Descubre - Vive - Conecta'
        this.titulovacaciones = vacaciones ? vacaciones.title : 'Vea nuestras ultimas ideas de vacaciones';
        this.titulolomejor = lomejor ? lomejor.title : 'Lo mejor de Capachica';
        this.descripcionlomejor = lomejor ? lomejor.description : 'Descripcion de Capachica';
        this.tituloDestinos = destinos ? destinos.title : 'Destinos más populares';
        this.tituloHospedajes = hospedajes ? hospedajes.title : 'Hospedajes Populares';
        this.tituloComida = comida ? comida.title : 'Mejores Lugares para Comer';
      },
      error: (err: any) => {
        console.error('Error cargando títulos dinámicos', err);
        // Valores por defecto en caso de error
        this.tituloDescubrecapachica = 'Descrubre la Península de Capachica';
        this.tituloDescubrevive = 'Descubre - Vive - Conecta';
        this.titulovacaciones = 'Vea nuestras ultimas ideas de vacaciones';
        this.titulolomejor = 'Lo mejor de Capachica';
        this.tituloDestinos = 'Destinos más populares';
        this.tituloHospedajes = 'Hospedajes Populares';
        this.tituloComida = 'Mejores Lugares para Comer';
      }
    });
  }

  private cargarSuntitulosDinamicos() {
    this._sectionsDetailEndsService.getsectionDetailsEnds().subscribe({
      next: (data: any[]) => {
        // Suponiendo que data es un array plano
        //Descubre - Vive - Conecta
        const descubrecapachica = data.find((item: any) => item.code === '02');
        const vivecapachica = data.find((item: any) => item.code === '03');
        const conectacapachica = data.find((item: any) => item.code === '04');
        //Vea nuestras ideas de vacaciones
        const paisaje = data.find((item: any) => item.code === '05');
        const artesania = data.find((item: any) => item.code === '06');
        const vacaciones = data.find((item: any) => item.code === '07');


        //Descubre - Vive - Conecta
        this.subtituloDescubre =  descubrecapachica ? descubrecapachica.title: 'Descubre Capachica';
        this.subdescripcionDescubre = descubrecapachica ? descubrecapachica.description: 'Un rincón único a orillas del majestuoso Lago Titicaca, donde la naturaleza y la cultura ancestral se entrelazan. Déjate cautivar por sus impresionantes paisajes y su gente acogedora.';
        this.subtituloVive = vivecapachica ? vivecapachica.title: 'Vive la Experiencia';
        this.subdescripcionVive = vivecapachica ? vivecapachica.description: 'Sumérgete en la autenticidad de sus comunidades quechuas, disfruta de la gastronomía local y explora sus islas flotantes y naturales. Un destino lleno de historia y tradición.';
        this.subtituloConecta = conectacapachica ? conectacapachica.title: 'Conecta con la Naturaleza';
        this.subdescripcionConecta = conectacapachica ? conectacapachica.description: 'En Capachica, la tranquilidad del lago y el aire puro andino te invitan a desconectarte del estrés diario. Un lugar ideal para recargar energías y crear momentos inolvidables.';
        //Vea nuestras ideas de vacaciones
        this.subtituloPaisaje = paisaje ? paisaje.title : 'Paisaje frente a la playa';
        this.subtituloArtesania = artesania ? artesania.title : 'Artesana';
        this.subtituloVacaciones = vacaciones ? vacaciones.title : 'Vacaciones en grupo';

      },
      error: (err: any) => {
        console.error('Error cargando títulos dinámicos', err);
        // Valores por defecto en caso de error
        //Descubre - Vive - Conecta
        this.subtituloDescubre = 'Descubre Capachica';
        this.subdescripcionDescubre = 'Un rincón único a orillas del majestuoso Lago Titicaca, donde la naturaleza y la cultura ancestral se entrelazan. Déjate cautivar por sus impresionantes paisajes y su gente acogedora.';
        this.subtituloVive = 'Vive la Experiencia';
        this.subdescripcionVive = 'Sumérgete en la autenticidad de sus comunidades quechuas, disfruta de la gastronomía local y explora sus islas flotantes y naturales. Un destino lleno de historia y tradición.';
        this.subtituloConecta = 'Vive la Experiencia';
        this.subdescripcionConecta = 'En Capachica, la tranquilidad del lago y el aire puro andino te invitan a desconectarte del estrés diario. Un lugar ideal para recargar energías y crear momentos inolvidables.';
        //Vea nuestras ideas de vacaciones
        this.subtituloPaisaje = 'Paisaje frente a la playa';
        this.subtituloArtesania = 'Artesania';
        this.subtituloVacaciones = 'Vacaciones en grupo';
      }
    });
  }

  private uploadData(id?: string) {
    this._emprendedorService.getServicioFilter(id).subscribe({
      next: (response: ApiResponse) => {
        this.emprendedorServicios = response.content || [];
        this.selectedCategory = this.emprendedorServicios.find(item => item.code === "01") || null;
        this.iniciarCarruseles();

      },
    });

  }
  private uploadComida(id?: string) {
    this._emprendedorService.getServicioFilter(id).subscribe({
      next: (response: ApiResponse) => {
        this.comida = response.content || [];
        this.selectedCategory = this.comida.find(item => item.code === "03") || null;
        this.iniciarCarruseles();

      },
    });

  }
  navigateTo(servicio: any) {
    const serviceId = servicio.id;
    this.router.navigate(['/market', serviceId]);
  }

  private iniciarCarruseles() {
    // Inicializar todos los índices en 0
    this.imageIndexes = this.asociaciones.map(() => 0);

    // Cada 4 segundos cambia la imagen activa de cada asociación
    setInterval(() => {
      this.imageIndexes = this.imageIndexes.map((currentIndex, i) => {
        // @ts-ignore
        if (!this.asociaciones[i]?.imagenes || this.asociaciones[i].imagenes.length === 0) {
          return 0;
        }
        // @ts-ignore
        return (currentIndex + 1) % this.asociaciones[i].imagenes.length;
      });
    }, 5000);
  }
  scrollLeft(): void {
    const carousel = document.getElementById('carousel');
    if (carousel) carousel.scrollLeft -= 3000;
  }

  scrollRight(): void {
    const carousel = document.getElementById('carousel');
    if (carousel) carousel.scrollLeft += 3000;
  }
}
