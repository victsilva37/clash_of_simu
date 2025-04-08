import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EjercitoService } from './ejercito.service';
import { EjercitoController } from './ejercito.controller';
import { Ejercito } from './ejercito.entity'; // Importa la entidad Ejercito

@Module({
  imports: [TypeOrmModule.forFeature([Ejercito])], // Asegúrate de importar la entidad aquí
  providers: [EjercitoService],
  controllers: [EjercitoController],
})
export class EjercitoModule {}
