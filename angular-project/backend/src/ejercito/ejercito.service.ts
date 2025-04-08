// ejercito.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ejercito } from './ejercito.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EjercitoService {
  constructor(
    @InjectRepository(Ejercito)
    private readonly ejercitoRepository: Repository<Ejercito>,
  ) {}

  async crearEjercito(data: any): Promise<Ejercito> {
    const nuevoEjercito = this.ejercitoRepository.create({
      fecha_ejercito: new Date(data.fecha_ejercito), // o new Date() si se guarda automáticamente
    });
    return this.ejercitoRepository.save(nuevoEjercito);
  }
}
