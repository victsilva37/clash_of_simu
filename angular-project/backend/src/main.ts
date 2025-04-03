import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: '*', // O especificar el dominio de tu frontend: 'http://localhost:4200'
    methods: ['GET', 'POST'], // Métodos permitidos
  });

  await app.listen(3000); // Puerto de tu servidor NestJS
}
bootstrap();
