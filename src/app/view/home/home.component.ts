import { Component, OnInit } from '@angular/core';
import {NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    NgStyle,
    RouterLink
  ],
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

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.imageList.length;
      this.currentImage = this.imageList[this.currentIndex];
    }, 4000); // cambia cada 4 segundos
  }

  scrollLeft(): void {
    const carousel = document.getElementById('carousel');
    if (carousel) carousel.scrollLeft -= 300;
  }

  scrollRight(): void {
    const carousel = document.getElementById('carousel');
    if (carousel) carousel.scrollLeft += 300;
  }
}
