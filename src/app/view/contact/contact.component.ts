import { Component } from '@angular/core';
import * as Aos from 'aos';
import AOS from 'aos';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  ngOnInit() {
    AOS.init({
      once: false,
    });
  }
}
