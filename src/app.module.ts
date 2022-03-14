import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';

config();

@Module({
  imports: [ UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
