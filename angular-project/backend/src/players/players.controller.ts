import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PlayersService } from './players.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Controller('players')
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
    private readonly httpService: HttpService,
  ) {}

  // Endpoint GET para obtener datos del jugador
  @Get(':tag')
  async getPlayer(@Param('tag') tag: string) {
    try {
      const playerData = await this.playersService.getPlayerData(tag);
      return playerData;
    } catch (error) {
      throw new HttpException(
        'Error al obtener los datos del jugador',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Endpoint POST para verificar el token del jugador
  @Post(':tag/verifytoken')
  async verifyToken(@Param('tag') tag: string, @Body() body: { token: string }) {
    const apiUrl = `https://api.clashofclans.com/v1/players/${encodeURIComponent(tag)}/verifytoken`;
  
    try {
      console.log(`🔹 Enviando solicitud a Clash of Clans API: ${apiUrl}, con token: ${body.token}`);
  
      const response = await lastValueFrom(
        this.httpService.post(apiUrl, body, {
          headers: {
            Authorization: `Bearer ${environment.apiKey}`,
            'Content-Type': 'application/json',
          },
        }),
      );
  
      console.log('🔹 Respuesta de la API de Clash of Clans:', response.data);
  
      if (response.status === 200 && response.data.status === 'ok') {
        // Verificar si el jugador ya está registrado
        const existingPlayer = await this.playersService.findPlayerByTag(tag);
        if (existingPlayer) {
          console.log(`✅ Jugador ${tag} ya registrado en la base de datos.`);
          return {
            status: 'success',  // Asegurarnos de que el frontend recibe esto
            message: 'Jugador ya registrado.',
            data: existingPlayer,
          };
        }
  
        // Si no existe, lo guarda en la base de datos
        const playerData = await this.playersService.getPlayerData(tag);
        await this.playersService.savePlayerData(playerData);
  
        console.log(`✅ Token verificado y jugador ${tag} guardado en la base de datos.`);
        return {
          status: 'success',  // Asegurarnos de que el frontend recibe esto
          message: 'Token verificado y datos guardados correctamente',
          data: playerData,
        };
      } else {
        console.warn('⚠ Token inválido, respuesta:', response.data);
        throw new HttpException('Token no válido', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      console.error('❌ Error en verifyToken:', error.response?.data || error.message);
      throw new HttpException(
        error.response?.data || 'Error al verificar el token',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  


  
}
