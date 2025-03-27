import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { HttpModule } from '@nestjs/axios'; // Importa HttpModule

@Module({
  imports: [HttpModule], // Agrega HttpModule aquí
  controllers: [PlayersController],
  providers: [PlayersService], // Asegúrate de declarar el servicio
})
export class PlayersModule {}
