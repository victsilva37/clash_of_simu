import { Controller, Get, Param, Post } from '@nestjs/common';
import { HechizoDispService } from './hechizos_disp.service';

@Controller('hechizos')
export class HechizoDispController {
  constructor(private readonly hechizoService: HechizoDispService) {}

  // ✅ Endpoint para obtener tropas de la API y guardarlas en la BD
  @Post(':tag')
  async registrarHechizos(@Param('tag') tag: string) {
    await this.hechizoService.saveSpellsData(tag);
    return { message: `Hechizos del jugador ${tag} registrados correctamente` };
  }

  // ✅ Endpoint para listar todas las tropas en la BD
  @Get()
  async obtenerHechizos() {
    return this.hechizoService.obtenerHechizos();
  }
}
