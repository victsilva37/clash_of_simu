import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from './players/players.module'; // Asegúrate de importar el módulo de jugadores
import { Jugador } from './players/players.entity';
import { TropaDispModule } from './tropas_disp/tropas_disp.module';
import { TropaDisp } from './tropas_disp/tropas_disp.entity';
import { environment } from './environments/enviroment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: environment.database.type as any,
      host: environment.database.host,
      port: environment.database.port,
      username: environment.database.username,
      password: environment.database.password,
      serviceName: environment.database.serviceName,
      entities: [Jugador, TropaDisp],
      synchronize: environment.database.synchronize,
      migrationsRun: environment.database.migrationsRun,
      logging: environment.database.logging,
    }),
    PlayersModule,
    TropaDispModule
  ],
  providers: [],
})
export class AppModule {}

