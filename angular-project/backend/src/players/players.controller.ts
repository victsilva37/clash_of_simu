import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PlayersService } from './players.service'; // Importa el servicio
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Controller('players') // Ruta base para este controlador
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService, // Inyecta el servicio
    private readonly httpService: HttpService,
  ) {}

  // Ruta GET para obtener los datos del jugador
  @Get(':tag')
  async getPlayer(@Param('tag') tag: string) {
    try {
      const playerData = await this.playersService.getPlayerData(tag); // Obtén los datos del jugador
      return playerData;
    } catch (error) {
      throw new HttpException(
        'Error al obtener los datos del jugador',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Ruta POST para verificar el token del jugador
  @Post(':tag/verifytoken')
  async verifyToken(
    @Param('tag') tag: string,
    @Body() body: { token: string },
  ): Promise<any> {
    const apiUrl = `https://api.clashofclans.com/v1/players/${encodeURIComponent(tag)}/verifytoken`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(apiUrl, body, {
          headers: {
            Authorization: `Bearer `+environment.apiKey, // Agrega tu token aquí
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error al verificar el token',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
