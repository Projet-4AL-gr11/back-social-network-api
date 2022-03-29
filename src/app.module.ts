import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './api/user/domain/entities/user.entity';
import { Friendship } from './api/friendship/domain/entities/friendship.entity';
import { FriendshipRequest } from './api/friendship/domain/entities/friendship-request.entity';
import { FriendshipModule } from './api/friendship/friendship.module';
import { MessageModule } from './api/message/message.module';
import Message from './api/message/domain/entities/message.entity';
import { ConversationModule } from './api/conversation/conversation.module';
import { Conversation } from './api/conversation/domain/entities/conversation.entity';
import { Media } from './api/media/domain/entities/media.entity';
import { MediaModule } from './api/media/media.module';
import { Group } from './api/group/domain/entities/group.entity';
import { GroupMembership } from './api/group/domain/entities/group_membership.entity';
import { GroupModule } from './api/group/group.module';
import { Exercise } from './api/exercices/domain/entities/exercise.entity';
import { ExerciseModule } from './api/exercices/exercise.module';
import { Language } from './api/language/domain/entities/language.entity';
import { LanguageModule } from './api/language/language.module';
import { Event } from './api/event/domain/entities/event.entity';
import { EventModule } from './api/event/event.module';
import { Post } from './api/post/domain/entities/post.entity';
import { PostModule } from './api/post/post.module';
import { CommentModule } from './api/comment/comment.module';
import { Comment } from './api/comment/domain/entities/comment.entity';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.17.0.2',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        User,
        Friendship,
        FriendshipRequest,
        Message,
        Conversation,
        Media,
        Group,
        GroupMembership,
        Exercise,
        Language,
        Event,
        Post,
        Comment,
      ],
      synchronize: true,
      logging: false,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
