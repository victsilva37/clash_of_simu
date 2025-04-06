import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroesDisp } from './heroes_disp.entity';
import { Jugador } from 'src/players/players.entity';
import { HeroesDispService } from './heroes_disp.service';
import { HeroesDispController } from './heroes_disp.controller';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    TypeOrmModule.forFeature([HeroesDisp, Jugador]),
    HttpModule,
  ],
  controllers: [HeroesDispController],
  providers: [HeroesDispService],
  exports: [HeroesDispService],
})
export class HeroesDispModule {}
