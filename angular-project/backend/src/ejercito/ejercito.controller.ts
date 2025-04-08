// ejercito.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EjercitoService } from './ejercito.service';

@Controller('ejercito')
export class EjercitoController {
  constructor(private readonly ejercitoService: EjercitoService) {}

  @Post()
  async crear(@Body() body: any) {
    return this.ejercitoService.crearEjercito(body);
  }
}
