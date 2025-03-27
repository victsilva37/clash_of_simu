import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios'; 
import { Usuario } from './usuarios/usuario.entity';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: 'localhost', // Dirección del servidor Oracle
      port: 1521, // Puerto de conexión
      username: 'HOLA123', // Usuario de la base de datos
      password: 'HOLA_12345', // Contraseña del usuario
      serviceName: 'XEPDB1', // Nombre del servicio (en lugar de SID)
      entities: [Usuario], // Entidades mapeadas a tablas
      synchronize: true, // Sincroniza las tablas (desactívalo en producción)
    }),
    UsuariosModule, // Otros módulos del proyecto
    HttpModule, 
    PlayersModule, // Importa el módulo de Players aquí
  ],
  controllers: [], // No es necesario declarar PlayersController aquí, ya está en PlayersModule
  providers: [], // No es necesario declarar PlayersService aquí
})
export class AppModule {}
