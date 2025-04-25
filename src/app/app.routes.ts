import { Routes } from '@angular/router';
import {PlacesComponent} from './view/places/places.component';
import {AboutComponent} from './view/about/about.component';
import {HomeComponent} from './view/home/home.component';
import {HotelComponent} from './view/hotel/hotel.component';
import {BlogComponent} from './view/blog/blog.component';
import {ContactComponent} from './view/contact/contact.component';

export const routes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  { path: 'about/:id', component: AboutComponent },  // Ahora 'about' acepta un parámetro 'id'
  { path: 'places/:id', component: PlacesComponent }, // Ahora 'places' acepta un parámetro 'id'
  { path: 'hotel/:id', component: HotelComponent },  // Ahora 'hotel' acepta un parámetro 'id'
  { path: 'blog/:id', component: BlogComponent },  // Ahora 'blog' acepta un parámetro 'id'
  { path: 'contact/:id', component: ContactComponent },
];
