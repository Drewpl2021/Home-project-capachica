import { Component, OnInit } from '@angular/core';
import AOS from 'aos';  // Importar la librería AOS
import 'aos/dist/aos.css';  // Importar el archivo CSS de AOS

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  ngOnInit() {
    AOS.init(); // Inicia AOS en el componente
  }

}
