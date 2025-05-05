import { Routes } from '@angular/router';
import {PlacesComponent} from './view/places/places.component';
import {AboutComponent} from './view/about/about.component';
import {HomeComponent} from './view/home/home.component';
import {HotelComponent} from './view/hotel/hotel.component';
import {BlogComponent} from './view/blog/blog.component';
import {ContactComponent} from './view/contact/contact.component';
import {LlachonComponent} from './comunidades/llachon/llachon.component';
import {ChifronComponent} from './comunidades/chifron/chifron.component';
import {CcotosComponent} from './comunidades/ccotos/ccotos.component';
import {IslaTikonataComponent} from './comunidades/isla-tikonata/isla-tikonata.component';
import {SialeParamisComponent} from './comunidades/siale-paramis/siale-paramis.component';
import {EscallaniComponent} from './comunidades/escallani/escallani.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'hotel', component: HotelComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'llachon', component: LlachonComponent },
  { path: 'chifron', component: ChifronComponent },
  { path: 'ccotos', component: CcotosComponent },
  { path: 'isla-tikonata', component: IslaTikonataComponent },
  { path: 'siale-paramis', component: SialeParamisComponent },
  { path: 'escallani', component: EscallaniComponent },




];
