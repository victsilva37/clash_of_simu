import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TropaDisp } from './tropas_disp.entity';
import { Jugador } from 'src/players/players.entity';
import { TropaDispService } from './tropas_disp.service';
import { TropaDispController } from './tropas_disp.controller';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    TypeOrmModule.forFeature([TropaDisp, Jugador]),
    HttpModule,
  ],
  controllers: [TropaDispController],
  providers: [TropaDispService],
  exports: [TropaDispService],
})
export class TropaDispModule {}
