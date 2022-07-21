import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendshipModule } from './api/friendship/friendship.module';
import { MessageModule } from './api/message/message.module';
import { ConversationModule } from './api/conversation/conversation.module';
import { MediaModule } from './api/media/media.module';
import { GroupModule } from './api/group/group.module';
import { ExerciseModule } from './api/exercices/exercise.module';
import { LanguageModule } from './api/language/language.module';
import { EventModule } from './api/event/event.module';
import { PostModule } from './api/post/post.module';
import { CommentModule } from './api/comment/comment.module';
import { ReportModule } from './api/report/report.module';
import { LeaderboardModule } from './api/leaderboard/leaderboard.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfiguration } from './database.configuration';
import { SearchModule } from './api/search/search.module';

config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration,
    }),
    UserModule,
    AuthModule,
    FriendshipModule,
    MessageModule,
    ConversationModule,
    MediaModule,
    GroupModule,
    ExerciseModule,
    LanguageModule,
    EventModule,
    PostModule,
    CommentModule,
    ReportModule,
    LeaderboardModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
