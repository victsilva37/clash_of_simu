import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainTropaService } from './train_tropa.service';
import { TrainTropaController } from './train_tropa.controller';
import { TrainTropa } from './train_tropa.entity';
import { Ejercito } from 'src/ejercito/ejercito.entity'; // Importa Ejercito
import { TropaDisp } from 'src/tropas_disp/tropas_disp.entity';// Importa TropaDisp

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainTropa, Ejercito, TropaDisp]), // Asegúrate de incluir todas las entidades necesarias
  ],
  providers: [TrainTropaService],
  controllers: [TrainTropaController],
})
export class TrainTropaModule {}
