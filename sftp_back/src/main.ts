import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log("started in ",process.env.PORT)
  await app.listen(process.env.PORT);
}
bootstrap();
