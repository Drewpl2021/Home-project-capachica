import { Component, OnInit } from '@angular/core';
import AOS from 'aos';  // Importar la librería AOS

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  ngOnInit() {
    AOS.init({
      once: false,
    });
  }

}
