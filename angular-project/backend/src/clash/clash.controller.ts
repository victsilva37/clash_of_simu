import { Controller, Post, Param, Body } from '@nestjs/common';

@Controller('api/v1/players')
export class PlayersController {
  @Post(':playerTag/verifytoken')
  verifyToken(@Param('playerTag') playerTag: string, @Body() body: { token: string }) {
    // Aquí procesas la verificación del token
    console.log('Player Tag:', playerTag);
    console.log('Token:', body.token);

    // Lógica para verificar el token con la API de Clash of Clans
    return { message: 'Token verificado con éxito' };
  }
}

