import { Routes } from '@angular/router';
import {PlacesComponent} from './view/places/places.component';
import {AboutComponent} from './view/about/about.component';
import {HomeComponent} from './view/home/home.component';
import {HotelComponent} from './view/hotel/hotel.component';
import {BlogComponent} from './view/blog/blog.component';
import {ContactComponent} from './view/contact/contact.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  { path: 'about', component: AboutComponent },
  { path: 'about/:id', component: AboutComponent },

  { path: 'places', component: PlacesComponent },
  { path: 'places/:id', component: PlacesComponent },

  { path: 'hotel', component: HotelComponent },
  { path: 'hotel/:id', component: HotelComponent },

  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogComponent },

  { path: 'contact', component: ContactComponent },
  { path: 'contact/:id', component: ContactComponent },

  { path: '**', redirectTo: 'home' }
];
