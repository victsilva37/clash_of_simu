import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from './players/players.module'; // Asegúrate de importar el módulo de jugadores
import { Jugador } from './players/players.entity';
import { TropasDispService } from './tropas_disp/tropas_disp.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost',
      port: 1521,
      username: 'HOLA123',
      password: 'HOLA_12345',
      serviceName: 'XEPDB1',
      entities: [Jugador],
      synchronize: false,
      migrationsRun: true,
      logging: true, // Habilita logs SQL
    }),
    PlayersModule,
  ],
  providers: [TropasDispService],
})
export class AppModule {}

