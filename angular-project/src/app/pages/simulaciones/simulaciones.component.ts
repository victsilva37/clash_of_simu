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
  filteredTroops: any[] = []; // Tropas filtradas
  filteredSpells: any[] = []; // Tropas filtradas
  filteredHeroes: any[] = [];
  troopsToShow: any[] = []; // Tropas a mostrar
  spellsToShow: any[] = []; //Hechizos a mostrar
  heroesToShow: any[] = [];

  btnEntrenarTropas: boolean = false;
  btnElaborarHechizos: boolean = false;
  btnElegirHeroes: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Recuperar el estado pasado desde el menú
    this.playerData = history.state.playerData;
    if (!this.playerData) {
      console.error('No se encontró información del jugador.');
      // Redirigir a login si no hay datos
      this.router.navigate(['/']);
    }
    this.mostrarInfoTropas()
    this.mostrarInfoHechizos()
    this.mostrarInfoHeroes()
  }



    //TÍTULO: ENTRENAR TROPAS

      // Función para elegir tropas al azar
      entrenarTropas(): void {
        const randomTroopsContent = document.getElementById("random-troops-content");
    
        if (randomTroopsContent) {
          // Mostrar el contenedor añadiendo la clase
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
        for (let i = 0; i < numRandomTroops; i++) {
          const randomIndex = Math.floor(Math.random() * shuffledTroops.length);
          randomTroops.push(shuffledTroops[randomIndex]);
          shuffledTroops.splice(randomIndex, 1); // Eliminar la tropa seleccionada para no repetirla
        }
    
        // Asignar las tropas aleatorias a `troopsToShow`
        this.troopsToShow = randomTroops;
        this.btnEntrenarTropas = true
      }

      mostrarInfoTropas(): void {
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
    
        // Asignar las tropas filtradas a `troopsToShow`
        this.troopsToShow = this.filteredTroops;
      }


    //TÍTULO: ENTRENAR HECHIZOS

       // Función para elegir tropas al azar
      elaborarHechizos(): void {
        const randomSpellsContent = document.getElementById("random-spells-content");
    
        if (randomSpellsContent) {
          // Mostrar el contenedor añadiendo la clase
          randomSpellsContent.classList.remove("hidden-hechizos");
          randomSpellsContent.classList.add("mostrar-hechizos");
        }

        // Número de tropas aleatorias a seleccionar
        const numRandomSpells = 5; // Cambia este número según lo que necesites
    
        // Crear un array vacío para las tropas aleatorias seleccionadas
        const randomSpells: any[] = [];
    
        // Copiar las tropas filtradas para no modificar el array original
        const shuffledSpells = [...this.filteredSpells];
    
        // Seleccionar aleatoriamente las tropas
        for (let i = 0; i < numRandomSpells; i++) {
          const randomIndex = Math.floor(Math.random() * shuffledSpells.length);
          randomSpells.push(shuffledSpells[randomIndex]);
          shuffledSpells.splice(randomIndex, 1); // Eliminar la tropa seleccionada para no repetirla
        }
    
        // Asignar las tropas aleatorias a `troopsToShow`
        this.spellsToShow = randomSpells;
        this.btnElaborarHechizos = true
      }

      mostrarInfoHechizos(): void {
        // Filtrar las tropas válidas
        this.filteredSpells = this.playerData.spells.filter(
          (spell: any) =>
            spell.village == 'home'
        );
    
        // Asignar las tropas filtradas a `spellsToShow`
        this.spellsToShow = this.filteredSpells;
      }


    //TÍTULO: ENTRENAR HECHIZOS

       // Función para elegir tropas al azar
       elegirHeroes(): void {
        const randomHeroesContent = document.getElementById("random-heroes-content");
    
        if (randomHeroesContent) {
          // Mostrar el contenedor añadiendo la clase
          randomHeroesContent.classList.remove("hidden-heroes");
          randomHeroesContent.classList.add("mostrar-heroes");
        }

        // Número de tropas aleatorias a seleccionar
        const numRandomHeroes = 3; // Cambia este número según lo que necesites
    
        // Crear un array vacío para las tropas aleatorias seleccionadas
        const randomHeroes: any[] = [];
    
        // Copiar las tropas filtradas para no modificar el array original
        const shuffledHeroes = [...this.filteredHeroes];
    
        // Seleccionar aleatoriamente las tropas
        for (let i = 0; i < numRandomHeroes; i++) {
          const randomIndex = Math.floor(Math.random() * shuffledHeroes.length);
          randomHeroes.push(shuffledHeroes[randomIndex]);
          shuffledHeroes.splice(randomIndex, 1); // Eliminar la tropa seleccionada para no repetirla
        }
    
        // Asignar las tropas aleatorias a `troopsToShow`
        this.heroesToShow = randomHeroes;
        this.btnElegirHeroes = true
      }

      mostrarInfoHeroes(): void {
        // Filtrar las tropas válidas
        this.filteredHeroes = this.playerData.heroes.filter(
          (heroe: any) =>
            heroe.village == 'home'
        );
    
        // Asignar las tropas filtradas a `spellsToShow`
        this.heroesToShow = this.filteredHeroes;

      }
  
    
}
