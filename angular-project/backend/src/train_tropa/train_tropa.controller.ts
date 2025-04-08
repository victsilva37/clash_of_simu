import { Controller, Post, Body } from '@nestjs/common';
import { TrainTropaService } from './train_tropa.service';

@Controller('train_tropa')
export class TrainTropaController {
  constructor(private readonly trainTropaService: TrainTropaService) {}

  // Endpoint para registrar varias tropas
  @Post('registrar')
  async registrarTrainTropas(
    @Body() data: { cant_tropa: number; id_ejercito: number; id_tropa_disp: number }[],
  ) {
    try {
      const resultado = await this.trainTropaService.crearTrainTropa(data);
      return {
        status: 'success',
        message: 'Tropas registradas con éxito',
        data: resultado,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}

