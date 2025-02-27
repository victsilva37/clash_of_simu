import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../components/menu/menu.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})

export class InicioComponent implements OnInit {
  playerData: any; // Datos originales
  filteredTroops: any[] = []; // Tropas filtradas
  currentPage: number = 0; // Página actual
  itemsPerPage: number = 8; // Número de tropas por página
  totalPages: number = 0; // Total de páginas calculadas

  constructor(private router: Router) {}

  
    ngOnInit(): void {
      this.mostrarInfoJugador();
      this.mostrarInfoTropas();
    }

  //TÍTULO: INFORMACIÓN DEL JUGADOR
    mostrarInfoJugador(){
      // Recuperar datos del estado de navegación
      const navigation = history.state;
      if (navigation && navigation.playerData) {
        this.playerData = navigation.playerData;
      }
    }

  //TÍTULO: INFORMACIÓN DE LAS TROPAS

    mostrarInfoTropas(){
      // Recuperar datos del estado de navegación
      const navigation = history.state;
      if (navigation && navigation.playerData) {
        // Filtrar las tropas válidas
        this.filteredTroops = this.playerData.troops.filter(
          (troop: any) =>
            troop.village == 'home' &&
            troop.name != 'Ice Hound' &&
            !troop.name.startsWith('Super') &&
            !troop.name.startsWith('Sneaky') &&
            !troop.name.startsWith('Rocket') &&
            !troop.name.startsWith('Inferno')
        );

        // Calcular el número total de páginas
        this.totalPages = Math.ceil(this.filteredTroops.length / this.itemsPerPage);
      }
    }


  //TÍTULO: BOTONES PAGINATION

    // Obtener las tropas a mostrar en la página actual
    get troopsToShow() {
      const startIndex = this.currentPage * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredTroops.slice(startIndex, endIndex); // Slice para mostrar las tropas filtradas
    }

    // Función para mover el carrusel a la siguiente página
    moveCarousel(direction: string): void {
      if (direction === 'next' && this.currentPage < this.totalPages - 1) {
        this.currentPage++; // Avanzar página
      } else if (direction === 'prev' && this.currentPage > 0) {
        this.currentPage--; // Retroceder página
      }
    }
}

