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

//TÍTULO CONTENEDOR PRINCIPAL DEL JUGADOR

  playerData: any; // Datos originales

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.mostrarInfoJugador();
    this.mostrarInfoTropas();
    this.mostrarInfoSuperTropas();
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
    itemsPerPageTroops: number = 8; // Número de tropas por página
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


  //TÍTULO: BOTONES PAGINATION (TROPAS)

    currentPageTroops: number = 0; // Página actual
    // Obtener las tropas a mostrar en la página actual
    get troopsToShow() {
      const startIndex = this.currentPageTroops * this.itemsPerPageTroops;
      const endIndex = startIndex + this.itemsPerPageTroops;
      return this.filteredTroops.slice(startIndex, endIndex); // Slice para mostrar las tropas filtradas
    }

    // Función para mover el carrusel a la siguiente página
    moveCarouselTroops(direction: string): void {
      if (direction === 'next' && this.currentPageTroops < this.totalPagesTroops - 1) {
        this.currentPageTroops++; // Avanzar página
      } else if (direction === 'prev' && this.currentPageTroops > 0) {
        this.currentPageTroops--; // Retroceder página
      }
    }


//TÍTULO CONTENEDOR PRINCIPAL DE SUPERTROPAS

    //TÍTULO: INFORMACIÓN DE LAS TROPAS
      filteredSuperTroops: any[] = []; // Tropas filtradas
      itemsPerPageSuperTroops: number = 8; // Número de tropas por página
      totalPagesSuperTroops: number = 0; // Total de páginas calculadas
      mostrarInfoSuperTropas(){
        // Recuperar datos del estado de navegación
        const navigation = history.state;
        if (navigation && navigation.playerData) {
          // Filtrar las tropas válidas
          this.filteredSuperTroops = this.playerData.troops.filter(
            (supertroop: any) =>
              supertroop.village == 'home' &&
              supertroop.name.startsWith('Super')
          );

          // Calcular el número total de páginas
          this.totalPagesSuperTroops = Math.ceil(this.filteredSuperTroops.length / this.itemsPerPageSuperTroops);
        }
      }


  //TÍTULO: BOTONES PAGINATION (SUPERTROPAS)

    currentPageSuperTroops: number = 0; // Página actual

    // Obtener las tropas a mostrar en la página actual
    get supertroopsToShow() {
      const startIndex = this.currentPageSuperTroops * this.itemsPerPageSuperTroops;
      const endIndex = startIndex + this.itemsPerPageSuperTroops;
      return this.filteredSuperTroops.slice(startIndex, endIndex); // Slice para mostrar las tropas filtradas
    }

    // Función para mover el carrusel a la siguiente página
    moveCarouselSuperTroops(direction: string): void {
      if (direction === 'next' && this.currentPageSuperTroops < this.totalPagesSuperTroops - 1) {
        this.currentPageSuperTroops++; // Avanzar página
      } else if (direction === 'prev' && this.currentPageSuperTroops > 0) {
        this.currentPageSuperTroops--; // Retroceder página
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


  //TÍTULO: BOTONES PAGINATION (HECHIZOS)

    currentPageSpells: number = 0; // Página actual

    // Obtener las tropas a mostrar en la página actual
    get spellsToShow() {
      const startIndex = this.currentPageSpells * this.itemsPerPageSpells;
      const endIndex = startIndex + this.itemsPerPageSpells;
      return this.filteredSpells.slice(startIndex, endIndex); // Slice para mostrar las tropas filtradas
    }

    // Función para mover el carrusel a la siguiente página
    moveCarouselSpells(direction: string): void {
      if (direction === 'next' && this.currentPageSpells < this.totalPagesSpells - 1) {
        this.currentPageSpells++; // Avanzar página
      } else if (direction === 'prev' && this.currentPageSpells > 0) {
        this.currentPageSpells--; // Retroceder página
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


    //TÍTULO: BOTONES PAGINATION (HÉROES)

      currentPageHeroes: number = 0; // Página actual

      // Obtener las tropas a mostrar en la página actual
      get heroesToShow() {
        const startIndex = this.currentPageHeroes * this.itemsPerPageHeroes;
        const endIndex = startIndex + this.itemsPerPageHeroes;
        return this.filteredHeroes.slice(startIndex, endIndex); // Slice para mostrar las tropas filtradas
      }

      // Función para mover el carrusel a la siguiente página
      moveCarouselHeroes(direction: string): void {
        if (direction === 'next' && this.currentPageHeroes < this.totalPagesHeroes - 1) {
          this.currentPageHeroes++; // Avanzar página
        } else if (direction === 'prev' && this.currentPageHeroes > 0) {
          this.currentPageHeroes--; // Retroceder página
        }
      }


}

