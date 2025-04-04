import { Controller, Get, Param, Post } from '@nestjs/common';
import { TropaDispService } from './tropas_disp.service';

@Controller('tropas')
export class TropaDispController {
  constructor(private readonly tropaService: TropaDispService) {}

  // ✅ Endpoint para obtener tropas de la API y guardarlas en la BD
  @Post(':tag')
  async registrarTropas(@Param('tag') tag: string) {
    await this.tropaService.saveTroopsData(tag);
    return { message: `Tropas del jugador ${tag} registradas correctamente` };
  }

  // ✅ Endpoint para listar todas las tropas en la BD
  @Get()
  async obtenerTropas() {
    return this.tropaService.obtenerTropas();
  }
}
