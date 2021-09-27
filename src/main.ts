import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('User Api')
    .setDescription(
      'Api para revisar, organizar, testear las direcciones https y los valores que retornan',
    )
    .setVersion('1.0')
    .addTag('User')
    .build();

  const appDocument = SwaggerModule.createDocument(app, options, {
    include: [AppModule],
  });
  SwaggerModule.setup('api', app, appDocument);

  const optionsCors = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization, Current-page',
  };

  app.enableCors();

  await app.listen(4000);
}
bootstrap();
