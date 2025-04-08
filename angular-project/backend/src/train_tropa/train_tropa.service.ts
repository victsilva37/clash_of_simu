// train_tropa.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainTropa } from './train_tropa.entity';
import { Ejercito } from 'src/ejercito/ejercito.entity';
import { TropaDisp } from 'src/tropas_disp/tropas_disp.entity';

@Injectable()
export class TrainTropaService {
  constructor(
    @InjectRepository(TrainTropa)
    private readonly trainTropaRepository: Repository<TrainTropa>,
    @InjectRepository(Ejercito)
    private readonly ejercitoRepository: Repository<Ejercito>,
    @InjectRepository(TropaDisp)
    private readonly tropaDispRepository: Repository<TropaDisp>,
  ) {}

  // Función para crear un nuevo TrainTropa
  async crearTrainTropa(data: { cant_tropa: number; id_ejercito: number; id_tropa_disp: number }[]) {
    const ejercito = await this.ejercitoRepository.findOne({ where: { id_ejercito: data[0].id_ejercito } });
  
    if (!ejercito) {
      throw new Error('El ejército no existe');
    }
  
    for (const item of data) {
      const tropaDisp = await this.tropaDispRepository.findOne({ where: { idTropa: item.id_tropa_disp } });
  
      if (!tropaDisp) {
        throw new Error(`La tropa con ID ${item.id_tropa_disp} no existe`);
      }
  
      const nuevaTrainTropa = this.trainTropaRepository.create({
        cant_tropa: item.cant_tropa,
        ejercito: ejercito,
        troop: tropaDisp,
      });
  
      await this.trainTropaRepository.save(nuevaTrainTropa);
    }
  
    return { message: 'Tropas registradas con éxito' };
  }
  
}
