import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../components/menu/menu.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, MenuComponent, MatCardModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})

export class InicioComponent implements OnInit {

//TÍTULO CONTENEDOR PRINCIPAL DEL JUGADOR

  playerData: any; // Datos originales

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.mostrarInfoJugador();
    this.mostrarInfoTropas();
    this.mostrarInfoSpells();
    this.mostrarInfoHeroes()
  }


  //TÍTULO: NIVEL DE EXPERIENCIA

    /*sin contenido*/


  //TÍTULO: INFORMACIÓN DEL JUGADOR
    mostrarInfoJugador(){
      // Recuperar datos del estado de navegación
      const navigation = history.state;
      if (navigation && navigation.playerData) {
        this.playerData = navigation.playerData;
      }
    }

  
  //TÍTULO: NIVEL DE AYUNTAMIENTO

    /*sin contenido*/



//TÍTULO CONTENEDOR PRINCIPAL DE TROPAS

  //TÍTULO: INFORMACIÓN DE LAS TROPAS

    filteredTroops: any[] = []; // Tropas filtradas
    itemsPerPageTroops: number = 16; // Número de tropas por página
    totalPagesTroops: number = 0; // Total de páginas calculadas
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
        this.totalPagesTroops = Math.ceil(this.filteredTroops.length / this.itemsPerPageTroops);
      }
    }





//TÍTULO CONTENEDOR PRINCIPAL DE LOS HECHIZOS

    //TÍTULO: INFORMACIÓN DE LAS HECHIZOS

      filteredSpells: any[] = []; // Tropas filtradas
      itemsPerPageSpells: number = 8; // Número de tropas por página
      totalPagesSpells: number = 0; // Total de páginas calculadas
      mostrarInfoSpells(){
        // Recuperar datos del estado de navegación
        const navigation = history.state;
        if (navigation && navigation.playerData) {
          // Filtrar las tropas válidas
          this.filteredSpells = this.playerData.spells.filter(
            (spell: any) =>
              spell.village == 'home'
          );
          // Calcular el número total de páginas
          this.totalPagesSpells = Math.ceil(this.filteredSpells.length / this.itemsPerPageSpells);
        }
      }



//TÍTULO CONTENEDOR PRINCIPAL DE LOS HÉROES

    //TÍTULO: INFORMACIÓN DE LAS HÉROES

    filteredHeroes: any[] = []; // Tropas filtradas
    itemsPerPageHeroes: number = 8; // Número de tropas por página
    totalPagesHeroes: number = 0; // Total de páginas calculadas
    mostrarInfoHeroes(){
      // Recuperar datos del estado de navegación
      const navigation = history.state;
      if (navigation && navigation.playerData) {
        // Filtrar las tropas válidas
        this.filteredHeroes = this.playerData.heroes.filter(
          (heroe: any) =>
            heroe.village == 'home'
        );
        // Calcular el número total de páginas
        this.totalPagesHeroes = Math.ceil(this.filteredHeroes.length / this.itemsPerPageHeroes);
      }
    }




}

