import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HechizosDisp } from './hechizos_disp.entity';
import { Jugador } from 'src/players/players.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/enviroment';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class HechizoDispService {
  constructor(
    @InjectRepository(HechizosDisp) private readonly hechizoRepository: Repository<HechizosDisp>,
    @InjectRepository(Jugador) private readonly jugadorRepository: Repository<Jugador>,
    private readonly httpService: HttpService,
  ) {}

 // ✅ Obtener datos de tropas desde la API
 async getSpellsData(playerTag: string): Promise<any> {
  const apiUrl = `https://api.clashofclans.com/v1/players/${encodeURIComponent(playerTag)}`;

  try {
    const response = await lastValueFrom(
      this.httpService.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${environment.apiKey}`,
        },
      }),
    );

    return response.data.spells; // 📌 La API devuelve un campo 'troops' con la lista de tropas
  } catch (error) {
    console.error('Error al obtener tropas del jugador:', error);
    throw error;
  }
}

  // ✅ Cargar el archivo JSON que contiene los espacios de las tropas
  private loadSpellsSpaces(): any {
    const filePath = path.join(process.cwd(), 'src', 'hechizos_disp', 'spells_spaces.json'); 
    const fileData = fs.readFileSync(filePath, 'utf-8');
    try {
      const jsonData = JSON.parse(fileData);
      
      if (!Array.isArray(jsonData.hechizos)) {
        throw new Error('El JSON no tiene un array "tropas". Revisa la estructura del archivo.');
      }
  
      return jsonData.hechizos;
    } catch (error) {
      console.error('Error al cargar troop_spaces.json:', error);
      return []; // 🔹 Retornar array vacío para evitar que el código falle
    }
  }

  // ✅ Guardar las tropas en la base de datos sin duplicados
async saveSpellsData(playerTag: string): Promise<void> {
  try {
    const player = await this.jugadorRepository.findOne({ where: { tag: playerTag } });

    if (!player) {
      throw new Error(`Jugador con tag ${playerTag} no encontrado`);
    }

    const spellsData = await this.getSpellsData(playerTag);
    const spellsSpaces = await this.loadSpellsSpaces();

    for (const spell of spellsData) {
      // 📌 Verificar si la tropa ya está guardada para este jugador
      const existingSpell = await this.hechizoRepository.findOne({
        where: { nombreHechizo: spell.name, jugador: player },
      });

      if (existingSpell) {
        console.log(`El hechizo ${spell.name} ya existe para el jugador ${playerTag}, no se insertará nuevamente.`);
        continue; // ⏭️ Saltar la inserción si ya existe
      }

      const espacio = spellsSpaces.find((s) => s.name === spell.name)?.space;
      if (espacio === undefined) {
        console.warn(`No se encontró el espacio para la tropa ${spell.name}`);
        continue;
      }

      const nuevoHechizo = new HechizosDisp();
      nuevoHechizo.nombreHechizo = spell.name;
      nuevoHechizo.nivelHechizo = spell.level;
      nuevoHechizo.espacioHechizo = espacio;
      nuevoHechizo.jugador = player;

      await this.hechizoRepository.save(nuevoHechizo);
      console.log(`Tropa ${spell.name} guardada para el jugador ${playerTag}`);
    }

  } catch (error) {
    console.error('Error al guardar las tropas en la base de datos:', error);
    throw error;
  }
}


  async obtenerHechizos(): Promise<HechizosDisp[]> {
    return this.hechizoRepository.find({ relations: ['player'] }); // Incluye la relación con el jugador
  }
  
}
