import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../components/menu/menu.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simulaciones',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './simulaciones.component.html',
  styleUrl: './simulaciones.component.css'
})
export class SimulacionesComponent implements OnInit {

  playerData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Recuperar el estado pasado desde el menú
    this.playerData = history.state.playerData;
    if (!this.playerData) {
      console.error('No se encontró información del jugador.');
      // Redirigir a login si no hay datos
      this.router.navigate(['/']);
    }
  }
}
