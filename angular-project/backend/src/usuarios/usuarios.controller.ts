import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async createUsuario(@Body() data: { nombre: string; email: string }): Promise<Usuario> {
    return this.usuariosService.create(data); // Llamada al servicio para insertar datos
  }

  @Get()
  async getAllUsuarios(): Promise<Usuario[]> {
    return this.usuariosService.findAll(); // Llamada al servicio para obtener usuarios
  }
}
