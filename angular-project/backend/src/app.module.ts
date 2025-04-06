import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from './players/players.module'; // Asegúrate de importar el módulo de jugadores
import { Jugador } from './players/players.entity';
import { TropaDispModule } from './tropas_disp/tropas_disp.module';
import { TropaDisp } from './tropas_disp/tropas_disp.entity';
import { environment } from './environments/enviroment';
import { HechizosDispModule } from './hechizos_disp/hechizos_disp.module';
import { HechizosDisp } from './hechizos_disp/hechizos_disp.entity';
import { HeroesDisp } from './heroes_disp/heroes_disp.entity';
import { HeroesDispModule } from './heroes_disp/heroes_disp.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: environment.database.type as any,
      host: environment.database.host,
      port: environment.database.port,
      username: environment.database.username,
      password: environment.database.password,
      serviceName: environment.database.serviceName,
      entities: [Jugador, TropaDisp, HechizosDisp, HeroesDisp],
      synchronize: environment.database.synchronize,
      migrationsRun: environment.database.migrationsRun,
      logging: environment.database.logging,
    }),
    PlayersModule,
    TropaDispModule,
    HechizosDispModule,
    HeroesDispModule
  ],
  providers: [],
})
export class AppModule {}

