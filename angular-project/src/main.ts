import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),        // Proveedor para HttpClient
    provideRouter(routes),      // Proveedor para rutas
  ],
}).catch((err) => console.error('Error al iniciar la aplicación:', err));

