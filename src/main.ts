import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger("APP");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
    // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);
}
bootstrap()
.then(() => 
  logger.log(`///////// [ Service listening 👍 : port ${process.env.PORT} ] /////////`
))

