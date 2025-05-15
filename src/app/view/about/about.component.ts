import { Component } from '@angular/core';
import {GoogleMap} from '@angular/google-maps';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  scrollLeft(): void {
    const carousel = document.getElementById('carousel');
    if (carousel) carousel.scrollLeft -= 300;
  }

  scrollRight(): void {
    const carousel = document.getElementById('carousel');
    if (carousel) carousel.scrollLeft += 300;
  }


}
