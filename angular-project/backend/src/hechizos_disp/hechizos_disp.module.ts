import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HechizosDisp } from './hechizos_disp.entity';
import { Jugador } from 'src/players/players.entity';
import { HechizoDispService } from './hechizos_disp.service';
import { HechizoDispController } from './hechizos_disp.controller';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    TypeOrmModule.forFeature([HechizosDisp, Jugador]),
    HttpModule,
  ],
  controllers: [HechizoDispController],
  providers: [HechizoDispService],
  exports: [HechizoDispService],
})
export class HechizosDispModule {}
