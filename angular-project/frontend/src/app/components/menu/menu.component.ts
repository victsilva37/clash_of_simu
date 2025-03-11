import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router: Router) {}
  goToInicio(): void {
    const playerData = history.state.playerData; // Recuperar el estado actual del jugador
    this.router.navigate(['/inicio'], { state: { playerData } });
  }

  goToSimulaciones(): void {
    const playerData = history.state.playerData; // Recuperar el estado actual del jugador
    this.router.navigate(['/simulaciones'], { state: { playerData } });
  }
}
