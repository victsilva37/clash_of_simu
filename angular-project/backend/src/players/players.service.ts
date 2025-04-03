import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jugador } from './players.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Jugador)
    private readonly jugadorRepository: Repository<Jugador>,
    private readonly httpService: HttpService,
  ) {}

  async getPlayerData(tag: string): Promise<any> {
    const apiUrl = `https://api.clashofclans.com/v1/players/${encodeURIComponent(tag)}`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${environment.apiKey}`,
          },
        }),
      );

      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del jugador:', error);
      throw error;
    }
  }

  async savePlayerData(playerData: any): Promise<void> {
    try {
      const jugador = new Jugador();
      jugador.tag = playerData.tag;
      jugador.name = playerData.name;
      jugador.townHallLevel = playerData.townHallLevel;
      jugador.expLevel = playerData.expLevel;
      jugador.trophies = playerData.trophies;
      jugador.warStars = playerData.warStars;

      await this.jugadorRepository.save(jugador);
      console.log('Jugador guardado correctamente en la base de datos');
    } catch (error) {
      console.error('Error al guardar el jugador en la base de datos:', error);
      throw error;
    }
  }
}
