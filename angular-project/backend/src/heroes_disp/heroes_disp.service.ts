import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeroesDisp } from './heroes_disp.entity';
import { Jugador } from 'src/players/players.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class HeroesDispService {
  constructor(
    @InjectRepository(HeroesDisp) private readonly heroesRepository: Repository<HeroesDisp>,
    @InjectRepository(Jugador) private readonly jugadorRepository: Repository<Jugador>,
    private readonly httpService: HttpService,
  ) {}

 // ✅ Obtener datos de tropas desde la API
 async getHeroesData(playerTag: string): Promise<any> {
  const apiUrl = `https://api.clashofclans.com/v1/players/${encodeURIComponent(playerTag)}`;

  try {
    const response = await lastValueFrom(
      this.httpService.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }),
    );

    return response.data.heroes; // 📌 La API devuelve un campo 'heroes' con la lista de heroes
  } catch (error) {
    console.error('Error al obtener tropas del jugador:', error);
    throw error;
  }
}

  

  // ✅ Guardar las tropas en la base de datos sin duplicados
async saveHeroesData(playerTag: string): Promise<void> {
  try {
    const player = await this.jugadorRepository.findOne({ where: { tag: playerTag } });

    if (!player) {
      throw new Error(`Jugador con tag ${playerTag} no encontrado`);
    }

    const heroesData = await this.getHeroesData(playerTag);


    for (const heroe of heroesData) {
      // 📌 Verificar si la tropa ya está guardada para este jugador
      const existingHeroe = await this.heroesRepository.findOne({
        where: { nombreHeroe: heroe.name, jugador: player },
      });

      if (existingHeroe) {
        console.log(`El heroe ${heroe.name} ya existe para el jugador ${playerTag}, no se insertará nuevamente.`);
        continue; // ⏭️ Saltar la inserción si ya existe
      } else {
            if (heroe.village === 'home'){
                const nuevoHeroe = new HeroesDisp();
                nuevoHeroe.nombreHeroe = heroe.name;
                nuevoHeroe.nivelHeroe = heroe.level;
                nuevoHeroe.jugador = player;
        
                await this.heroesRepository.save(nuevoHeroe);
                console.log(`Heroe ${heroe.name} guardado para el jugador ${playerTag}`);
            }
        
      }
    }

  } catch (error) {
    console.error('Error al guardar las tropas en la base de datos:', error);
    throw error;
  }
}


  async obtenerHeroes(): Promise<HeroesDisp[]> {
    return this.heroesRepository.find({ relations: ['player'] }); // Incluye la relación con el jugador
  }
  
}
