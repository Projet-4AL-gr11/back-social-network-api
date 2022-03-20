import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';

config();
async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [process.env.ALLOW_ORIGIN, 'http://127.0.0.1:4200'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for,Set-Cookie',
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(cookieParser());
  await app.listen(process.env.PORT);
  logger.log(`Application started on port ` + (await app.getUrl()));
}
bootstrap().then();
