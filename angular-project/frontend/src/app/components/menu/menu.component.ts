import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {}

  goToInicio(): void {
    const playerData = history.state?.playerData; // Verificamos si playerData está en el state
    if (playerData) {
      this.router.navigate(['/inicio'], { state: { playerData } });
    } else {
      console.error('Player data no disponible en el estado de navegación');
      // Aquí podrías redirigir a una página de error o mostrar un mensaje
    }
  }

  goToSimulaciones(): void {
    const playerData = history.state?.playerData; // Verificamos si playerData está en el state
    if (playerData) {
      this.router.navigate(['/simulaciones'], { state: { playerData } });
    } else {
      console.error('Player data no disponible en el estado de navegación');
      // Similarmente, podrías manejar el error o redirigir.
    }
  }
}

