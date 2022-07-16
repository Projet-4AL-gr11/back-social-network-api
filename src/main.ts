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
  // TODO: je comprends pas pourquoi ça veux pas allow-all-origin
  app.enableCors({
    origin: [
      'http://127.0.0.1:4200',
      'http://localhost',
      'http://localhost:4200',
      'http://ec2-18-117-90-11.us-east-2.compute.amazonaws.com/api/code',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for,Set-Cookie,Access-Control-Allow-Origin',
  });
  // app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(cookieParser());
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application started on port ` + (await app.getUrl()));
}
bootstrap().then();
