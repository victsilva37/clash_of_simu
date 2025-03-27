import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../../components/menu/menu.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClashOfClansService } from '../../services/clash-api.service';
import { TroopSpaceService } from '../../../assets/extras/troop-info/troops-spaces.service';
import { TroopSpaceData } from '../../interfaces/troops-spaces';
import { forkJoin } from 'rxjs';
import { SpellsSpacesService } from '../../../assets/extras/spell-info/spells-spaces.service';

@Component({
  selector: 'app-simulaciones',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './simulaciones.component.html',
  styleUrl: './simulaciones.component.css'
})
export class SimulacionesComponent implements OnInit {

  playerData: any; // Datos del jugador de la API

  constructor(
    private clashOfClansService: ClashOfClansService,
    private troopSpaceService: TroopSpaceService,
    private spellSpaceService: SpellsSpacesService,
  ) {}

  ngOnInit(): void {
    // Obtener el playerTag desde sessionStorage
    const playerTag = sessionStorage.getItem('playerTag');

    if (!playerTag) {
      console.error('No se encontró el playerTag en sessionStorage');
      return;
    }

    // Llamadas para obtener tropas y hechizos
    forkJoin([
      this.clashOfClansService.getPlayer(playerTag),
      this.troopSpaceService.getTroopsSpaceData(),
      this.spellSpaceService.getTroopsSpaceData(),
    ]).subscribe(
      ([apiData, spaceData, spaceSpellData]) => {
        this.playerData = apiData;
        this.spaceData = spaceData;
        this.spaceSpellData = spaceSpellData;

        this.mostrarInfoTropas();
        this.mostrarInfoHechizos();
        this.mostrarInfoHeroes();
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }



//TÍTULO: ENTRENAR TROPAS

  // Manejo de tropas
  spaceData: any = { tropas: [] }; // Datos de espacio de tropas
  btnEntrenarTropas: boolean = false; //Entrenamiento de tropas
  totalSpaceUsed: number = 0 //Inicializar contador de espacios usados}+
  tropasEntrenadas: boolean = false

  entrenarTropas(): void {
    //
    const randomTroopsContent = document.getElementById('random-troops-content');

    if (randomTroopsContent) {
      randomTroopsContent.classList.remove('hidden-tropas');
      randomTroopsContent.classList.add('mostrar-tropas');
    }

    const maxSpace = 260;
    let currentSpace = 0;
    const selectedTroops: any[] = [];

    const shuffledTroops = [...this.filteredTroops].sort(() => Math.random() - 0.5);

    shuffledTroops.forEach((troop) => {
      if (!troop.space || troop.space <= 0) {
        console.error(`Espacio no válido para la tropa ${troop.name}`);
        return;
      }

      const quantity = Math.floor(Math.random() * 5) + 1;
      const totalSpace = troop.space * quantity;

      if (currentSpace + totalSpace <= maxSpace) {
        selectedTroops.push({ ...troop, quantity, totalSpace });
        currentSpace += totalSpace;
      }
    });

    this.troopsToShow = selectedTroops;
    this.totalSpaceUsed = currentSpace;
    this.btnEntrenarTropas = true;
    this.tropasEntrenadas = true;
  }


  troopsToShow: any[] = []; //Mostrar tropas
  filteredTroops: any[] = []; //Filtrar tropas según tipo


//TÍTULO: MOSTRAR TROPAS ENTRENADAS

  mostrarInfoTropas(): void {
    this.filteredTroops = this.playerData.troops
      .filter(
        (troop: any) =>
          troop.village === 'home' &&
          troop.name !== 'Ice Hound' &&
          !troop.name.startsWith('Super') &&
          !troop.name.startsWith('Sneaky') &&
          !troop.name.startsWith('Rocket') &&
          !troop.name.startsWith('Inferno')
      )
      .map((troop: any) => {
        const spaceInfo = this.spaceData.tropas.find((item: any) => item.name === troop.name);
        return {
          ...troop,
          space: spaceInfo?.space || 0, // Asignar 0 si no se encuentra el espacio
        };
      });
  }

  

  // Manejo de hechizos
  spaceSpellData: any = { hechizos: [] };
  spellsToShow: any[] = [];
  filteredSpells: any[] = [];
  btnElaborarHechizos: boolean = false;
  hechizosElaborados: boolean = false;

  mostrarInfoHechizos(): void {
    this.filteredSpells = this.playerData.spells
      .filter((spell: any) => spell.village === 'home')
      .map((spell: any) => {
        const spaceSpellInfo = this.spaceSpellData.hechizos.find((item: any) => item.name === spell.name);
        return {
          ...spell,
          space: spaceSpellInfo?.space || 0,
        };
      });
  }

  totalSpaceSpellUsed: number = 0

  elaborarHechizos(): void {
    const randomSpellsContent = document.getElementById('random-spells-content');

    if (randomSpellsContent) {
      randomSpellsContent.classList.remove('hidden-hechizos');
      randomSpellsContent.classList.add('mostrar-hechizos');
    }

    const maxSpace = 11;
    let currentSpace = 0;
    const selectedSpells: any[] = [];

    const shuffledSpells = [...this.filteredSpells].sort(() => Math.random() - 0.5);

    shuffledSpells.forEach((spell) => {
      if (!spell.space || spell.space <= 0) {
        console.error(`Espacio no válido para el hechizo ${spell.name}`);
        return;
      }

      const quantity = Math.floor(Math.random() * 5) + 1;
      const totalSpace = spell.space * quantity;

      if (currentSpace + totalSpace <= maxSpace) {
        selectedSpells.push({ ...spell, quantity, totalSpace });
        currentSpace += totalSpace;
      }
    });

    this.spellsToShow = selectedSpells;
    this.totalSpaceSpellUsed = currentSpace;
    this.btnElaborarHechizos = true;
    this.hechizosElaborados = true
  }

  heroesData: any[] = []; // Datos de héroes procesados
  filteredHeroes: any[] = []; // Héroes filtrados
  btnElegirHeroes: boolean = false; // Estado del botón para héroes
  heroesElegidos: boolean = false

  mostrarInfoHeroes(): void {
    this.filteredHeroes = this.playerData.heroes
      .filter((hero: any) => hero.village === 'home')
      .map((hero: any) => ({
        ...hero,
        isMaxed: hero.level === hero.maxLevel, // Información adicional para héroes
      }));
  }

  elegirHeroes(): void {
    const randomHeroesContent = document.getElementById('random-heroes-content');
  
    if (randomHeroesContent) {
      randomHeroesContent.classList.remove('hidden-heroes');
      randomHeroesContent.classList.add('mostrar-heroes');
    }
  
    const selectedHeroes = [...this.filteredHeroes].sort(() => Math.random() - 0.5).slice(0, 3); // Selecciona hasta 3 héroes aleatorios
  
    this.heroesData = selectedHeroes;
    this.btnElegirHeroes = true;
    this.heroesElegidos = true
  }

  estrellas: number = 0;
  porcentajeDano: number = 0;

  simular(): void {
    if (this.tropasEntrenadas || this.hechizosElaborados || this.heroesElegidos){
      this.porcentajeDano = Math.floor(Math.random() * 101);

      // Ajustar la probabilidad de estrellas según el porcentaje de daño
      const probabilidad = Math.random(); // Valor entre 0 y 1

      if (this.porcentajeDano === 100) {
        this.estrellas = 3; // Siempre 3 estrellas con 100% de daño
      } else if (this.porcentajeDano >= 50) {
        // Probabilidad alta de obtener 2 estrellas
        this.estrellas = probabilidad > 0.2 ? 2 : 1;
      } else if (this.porcentajeDano > 0) {
        // Probabilidad más baja de obtener 1 estrella con daño menor
        this.estrellas = probabilidad > 0.7 ? 1 : 0;
      } else {
        this.estrellas = 0; // Sin daño
      }

      // Mostrar modal
      this.abrirModal();
    } else {
      alert("Entrena alguna weá")
    }
    
    
  }

  abrirModal(): void {
    const modal = document.getElementById('resultadoModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  cerrarModal(): void {
    const modal = document.getElementById('resultadoModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  
}


