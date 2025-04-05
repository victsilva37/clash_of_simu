import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TropaDisp } from './tropas_disp.entity';
import { Jugador } from 'src/players/players.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class TropaDispService {
  constructor(
    @InjectRepository(TropaDisp) private readonly tropaRepository: Repository<TropaDisp>,
    @InjectRepository(Jugador) private readonly jugadorRepository: Repository<Jugador>,
    private readonly httpService: HttpService,
  ) {}

 // ✅ Obtener datos de tropas desde la API
 async getTroopsData(playerTag: string): Promise<any> {
  const apiUrl = `https://api.clashofclans.com/v1/players/${encodeURIComponent(playerTag)}`;

  try {
    const response = await lastValueFrom(
      this.httpService.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }),
    );

    return response.data.troops; // 📌 La API devuelve un campo 'troops' con la lista de tropas
  } catch (error) {
    console.error('Error al obtener tropas del jugador:', error);
    throw error;
  }
}

  // ✅ Cargar el archivo JSON que contiene los espacios de las tropas
  private loadTroopSpaces(): any {
    const filePath = path.join(process.cwd(), 'src', 'tropas_disp', 'troops_spaces.json'); 
    const fileData = fs.readFileSync(filePath, 'utf-8');
    try {
      const jsonData = JSON.parse(fileData);
      
      if (!Array.isArray(jsonData.tropas)) {
        throw new Error('El JSON no tiene un array "tropas". Revisa la estructura del archivo.');
      }
  
      return jsonData.tropas;
    } catch (error) {
      console.error('Error al cargar troop_spaces.json:', error);
      return []; // 🔹 Retornar array vacío para evitar que el código falle
    }
  }

  // ✅ Guardar las tropas en la base de datos sin duplicados
async saveTroopsData(playerTag: string): Promise<void> {
  try {
    const player = await this.jugadorRepository.findOne({ where: { tag: playerTag } });

    if (!player) {
      throw new Error(`Jugador con tag ${playerTag} no encontrado`);
    }

    const troopsData = await this.getTroopsData(playerTag);
    const troopSpaces = await this.loadTroopSpaces();

    for (const troop of troopsData) {
      // 📌 Verificar si la tropa ya está guardada para este jugador
      const existingTroop = await this.tropaRepository.findOne({
        where: { nombreTropa: troop.name, jugador: player },
      });

      if (existingTroop) {
        console.log(`La tropa ${troop.name} ya existe para el jugador ${playerTag}, no se insertará nuevamente.`);
        continue; // ⏭️ Saltar la inserción si ya existe
      }

      const espacio = troopSpaces.find((t) => t.name === troop.name)?.space;
      if (espacio === undefined) {
        console.warn(`No se encontró el espacio para la tropa ${troop.name}`);
        continue;
      }

      const nuevaTropa = new TropaDisp();
      nuevaTropa.nombreTropa = troop.name;
      nuevaTropa.nivelTropa = troop.level;
      nuevaTropa.espacioTropa = espacio;
      nuevaTropa.jugador = player;

      await this.tropaRepository.save(nuevaTropa);
      console.log(`Tropa ${troop.name} guardada para el jugador ${playerTag}`);
    }

  } catch (error) {
    console.error('Error al guardar las tropas en la base de datos:', error);
    throw error;
  }
}


  async obtenerTropas(): Promise<TropaDisp[]> {
    return this.tropaRepository.find({ relations: ['player'] }); // Incluye la relación con el jugador
  }
  
}
