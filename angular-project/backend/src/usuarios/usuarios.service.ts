import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async create(data: { nombre: string; email: string }): Promise<Usuario> {
    try {
      const usuario = this.usuariosRepository.create(data); // Crear la entidad
      return await this.usuariosRepository.save(usuario);   // Guardar en la base de datos
    } catch (error) {
      console.error('Error al insertar datos:', error);
      throw error;
    }
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find(); // Devuelve todos los usuarios
  }
}

