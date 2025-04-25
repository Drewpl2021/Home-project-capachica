import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core'; // Asegúrate de importar esto

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule) // Agrega HttpClientModule aquí
  ]
};
