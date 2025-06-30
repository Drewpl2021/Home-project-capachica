import { Component } from '@angular/core';
import {GoogleMapsModule} from '@angular/google-maps';

@Component({
  selector: 'app-contact',
  imports: [
    GoogleMapsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  center: google.maps.LatLngLiteral = { lat: -15.643013750128683, lng: -69.8313672219344 };  // Coordenadas de Capachica -15.643013750128683, -69.8313672219344
  zoom = 15; // Puedes ajustar el nivel de zoom si es necesario
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    disableDefaultUI: false,
    fullscreenControl: true,
  };
}
