import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../components/menu/menu.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClashOfClansService } from '../../services/clash-api.service';
import { TroopSpaceService } from '../../../../public/extras/troops-spaces.service';
import { TroopSpaceData } from '../../interfaces/troops-spaces';
import { forkJoin } from 'rxjs';
import { LoginTagComponent } from '../login-tag/login-tag.component';

@Component({
  selector: 'app-simulaciones',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './simulaciones.component.html',
  styleUrl: './simulaciones.component.css'
})
export class SimulacionesComponent implements OnInit {

  // playerData: any;
  // Tropas filtradas
  // filteredSpells: any[] = []; // Tropas filtradas
  // filteredHeroes: any[] = [];
   // Tropas a mostrar
  // spellsToShow: any[] = []; //Hechizos a mostrar
  // heroesToShow: any[] = [];

  
  // btnElaborarHechizos: boolean = false;
  // btnElegirHeroes: boolean = false;

  // constructor(private router: Router) {}

  // ngOnInit(): void {
  //   // Recuperar el estado pasado desde el menú
  //   this.playerData = history.state.playerData;
  //   if (!this.playerData) {
  //     console.error('No se encontró información del jugador.');
  //     // Redirigir a login si no hay datos
  //     this.router.navigate(['/']);
  //   }
  //   this.mostrarInfoTropas()
  //   this.mostrarInfoHechizos()
  //   this.mostrarInfoHeroes()
  // }



  //   //TÍTULO: ENTRENAR TROPAS

  //     // Función para elegir tropas al azar
  //     entrenarTropas(): void {
  //       const randomTroopsContent = document.getElementById("random-troops-content");
    
  //       if (randomTroopsContent) {
  //         // Mostrar el contenedor añadiendo la clase
  //         randomTroopsContent.classList.remove("hidden-tropas");
  //         randomTroopsContent.classList.add("mostrar-tropas");
  //       }

  //       // Número de tropas aleatorias a seleccionar
  //       const numRandomTroops = 5; // Cambia este número según lo que necesites
    
  //       // Crear un array vacío para las tropas aleatorias seleccionadas
  //       const randomTroops: any[] = [];
    
  //       // Copiar las tropas filtradas para no modificar el array original
  //       const shuffledTroops = [...this.filteredTroops];
    
  //       // Seleccionar aleatoriamente las tropas
  //       for (let i = 0; i < numRandomTroops; i++) {
  //         const randomIndex = Math.floor(Math.random() * shuffledTroops.length);
  //         randomTroops.push(shuffledTroops[randomIndex]);
  //         shuffledTroops.splice(randomIndex, 1); // Eliminar la tropa seleccionada para no repetirla
  //       }
    
  //       // Asignar las tropas aleatorias a `troopsToShow`
  //       this.troopsToShow = randomTroops;
  //       this.btnEntrenarTropas = true
  //     }

  //     mostrarInfoTropas(): void {
  //       // Filtrar las tropas válidas
  //       this.filteredTroops = this.playerData.troops.filter(
  //         (troop: any) =>
  //           troop.village == 'home' &&
  //           troop.name != 'Ice Hound' &&
  //           !troop.name.startsWith('Super') &&
  //           !troop.name.startsWith('Sneaky') &&
  //           !troop.name.startsWith('Rocket') &&
  //           !troop.name.startsWith('Inferno')
  //       );
    
  //       // Asignar las tropas filtradas a `troopsToShow`
  //       this.troopsToShow = this.filteredTroops;
  //     }


  //   //TÍTULO: ENTRENAR HECHIZOS

  //      // Función para elegir tropas al azar
  //     elaborarHechizos(): void {
  //       const randomSpellsContent = document.getElementById("random-spells-content");
    
  //       if (randomSpellsContent) {
  //         // Mostrar el contenedor añadiendo la clase
  //         randomSpellsContent.classList.remove("hidden-hechizos");
  //         randomSpellsContent.classList.add("mostrar-hechizos");
  //       }

  //       // Número de tropas aleatorias a seleccionar
  //       const numRandomSpells = 5; // Cambia este número según lo que necesites
    
  //       // Crear un array vacío para las tropas aleatorias seleccionadas
  //       const randomSpells: any[] = [];
    
  //       // Copiar las tropas filtradas para no modificar el array original
  //       const shuffledSpells = [...this.filteredSpells];
    
  //       // Seleccionar aleatoriamente las tropas
  //       for (let i = 0; i < numRandomSpells; i++) {
  //         const randomIndex = Math.floor(Math.random() * shuffledSpells.length);
  //         randomSpells.push(shuffledSpells[randomIndex]);
  //         shuffledSpells.splice(randomIndex, 1); // Eliminar la tropa seleccionada para no repetirla
  //       }
    
  //       // Asignar las tropas aleatorias a `troopsToShow`
  //       this.spellsToShow = randomSpells;
  //       this.btnElaborarHechizos = true
  //     }

  //     mostrarInfoHechizos(): void {
  //       // Filtrar las tropas válidas
  //       this.filteredSpells = this.playerData.spells.filter(
  //         (spell: any) =>
  //           spell.village == 'home'
  //       );
    
  //       // Asignar las tropas filtradas a `spellsToShow`
  //       this.spellsToShow = this.filteredSpells;
  //     }


  //   //TÍTULO: ENTRENAR HECHIZOS

  //      // Función para elegir tropas al azar
  //      elegirHeroes(): void {
  //       const randomHeroesContent = document.getElementById("random-heroes-content");
    
  //       if (randomHeroesContent) {
  //         // Mostrar el contenedor añadiendo la clase
  //         randomHeroesContent.classList.remove("hidden-heroes");
  //         randomHeroesContent.classList.add("mostrar-heroes");
  //       }

  //       // Número de tropas aleatorias a seleccionar
  //       const numRandomHeroes = 3; // Cambia este número según lo que necesites
    
  //       // Crear un array vacío para las tropas aleatorias seleccionadas
  //       const randomHeroes: any[] = [];
    
  //       // Copiar las tropas filtradas para no modificar el array original
  //       const shuffledHeroes = [...this.filteredHeroes];
    
  //       // Seleccionar aleatoriamente las tropas
  //       for (let i = 0; i < numRandomHeroes; i++) {
  //         const randomIndex = Math.floor(Math.random() * shuffledHeroes.length);
  //         randomHeroes.push(shuffledHeroes[randomIndex]);
  //         shuffledHeroes.splice(randomIndex, 1); // Eliminar la tropa seleccionada para no repetirla
  //       }
    
  //       // Asignar las tropas aleatorias a `troopsToShow`
  //       this.heroesToShow = randomHeroes;
  //       this.btnElegirHeroes = true
  //     }

  //     mostrarInfoHeroes(): void {
  //       // Filtrar las tropas válidas
  //       this.filteredHeroes = this.playerData.heroes.filter(
  //         (heroe: any) =>
  //           heroe.village == 'home'
  //       );
    
  //       // Asignar las tropas filtradas a `spellsToShow`
  //       this.heroesToShow = this.filteredHeroes;

  //     }
  
  playerData: any; // Datos del jugador de la API
  troopsData: any[] = []; // Datos de las tropas combinadas
  spaceData: any = { tropas: [] }; // Datos de espacio de tropas
  troopsToShow: any[] = []; // Tropas seleccionadas aleatoriamente
  filteredTroops: any[] = []; // Tropas filtradas
  btnEntrenarTropas: boolean = false; // Estado del botón

  constructor(
    private clashOfClansService: ClashOfClansService,
    private troopSpaceService: TroopSpaceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el playerTag desde sessionStorage
    const playerTag = sessionStorage.getItem('playerTag');
    
    if (!playerTag) {
      console.error('No se encontró el playerTag en sessionStorage');
      return;
    }

    // Realizar las llamadas a la API y al JSON
    forkJoin([
      this.clashOfClansService.getPlayer(playerTag), // Llamada a la API de Clash of Clans
      this.troopSpaceService.getTroopsSpaceData() // Llamada al servicio de espacio de tropas
    ]).subscribe(
      ([apiData, spaceData]) => {
        this.playerData = apiData;
        this.spaceData = spaceData;

        // Filtrar y asignar tropas
        this.mostrarInfoTropas();
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  mostrarInfoTropas(): void {
    // Filtrar las tropas válidas
    this.filteredTroops = this.playerData.troops.filter(
      (troop: any) =>
        troop.village === 'home' &&
        troop.name !== 'Ice Hound' &&
        !troop.name.startsWith('Super') &&
        !troop.name.startsWith('Sneaky') &&
        !troop.name.startsWith('Rocket') &&
        !troop.name.startsWith('Inferno')
    );

    // Asignar el espacio correspondiente a cada tropa
    this.filteredTroops = this.filteredTroops.map((troop: any) => {
      const spaceInfo = this.spaceData.tropas.find((item: any) => item.name === troop.name);
      return {
        ...troop,
        space: spaceInfo?.space || 0  // Asignar 0 si no se encuentra el espacio
      };
    });
  }

  entrenarTropas(): void {
    const randomTroopsContent = document.getElementById("random-troops-content");

    if (randomTroopsContent) {
      // Mostrar el contenedor de tropas aleatorias
      randomTroopsContent.classList.remove("hidden-tropas");
      randomTroopsContent.classList.add("mostrar-tropas");
    }

    // Número de tropas aleatorias a seleccionar
    const numRandomTroops = 5; // Cambia este número según lo que necesites

    // Crear un array vacío para las tropas aleatorias seleccionadas
    const randomTroops: any[] = [];

    // Copiar las tropas filtradas para no modificar el array original
    const shuffledTroops = [...this.filteredTroops];

    // Seleccionar aleatoriamente las tropas
    for (let i = 0; i < numRandomTroops && shuffledTroops.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * shuffledTroops.length);
      const selectedTroop = shuffledTroops[randomIndex];

      // Asignamos la tropa seleccionada a la lista
      randomTroops.push(selectedTroop);
      shuffledTroops.splice(randomIndex, 1); // Eliminar la tropa seleccionada
    }

    // Asignar las tropas aleatorias seleccionadas a `troopsToShow`
    this.troopsToShow = randomTroops;
    this.btnEntrenarTropas = true;
  }
}


