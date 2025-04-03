import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable()
export class PlayersService {
  constructor(private readonly httpService: HttpService) {}

  async getPlayerData(tag: string) {
    const apiUrl = `https://api.clashofclans.com/v1/players/${encodeURIComponent(tag)}`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(apiUrl, {
          headers: {
            Authorization: `Bearer `+environment.apiKey, // Asegúrate de agregar tu token aquí
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}