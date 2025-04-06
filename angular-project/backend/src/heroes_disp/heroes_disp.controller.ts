import { Controller, Get, Param, Post } from '@nestjs/common';
import { HeroesDispService } from './heroes_disp.service';

@Controller('heroes')
export class HeroesDispController {
  constructor(private readonly heroesService: HeroesDispService) {}

  // ✅ Endpoint para obtener tropas de la API y guardarlas en la BD
  @Post(':tag')
  async registrarHeroes(@Param('tag') tag: string) {
    await this.heroesService.saveHeroesData(tag);
    return { message: `Heroes del jugador ${tag} registrados correctamente` };
  }

  // ✅ Endpoint para listar todas las tropas en la BD
  @Get()
  async obtenerHeroes() {
    return this.heroesService.obtenerHeroes();
  }
}