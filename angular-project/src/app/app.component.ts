
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,  HttpClientModule],
  template: `
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}

bootstrapApplication(AppComponent).catch((err) =>
  console.error('Error al iniciar la aplicación:', err)
);
