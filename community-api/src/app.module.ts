import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { ChatModule } from './chat/chat.module';
import { Board } from './entities/Board';
import { Post } from './entities/Post';
import { PostModule } from './post/post.module';
import { Comment } from './entities/Comment';
import { ExpRewardSettings } from './entities/ExpRewardSettings';
import { ExpSettingsModule } from './exp-settings/exp-settings.module';
import { Reaction } from '@entities/Reaction';
import { ReactionModule } from './reaction/reaction.module';
import { CommentModule } from './comment/comment.module';
import { CommonModule } from './common/common.module';
import { ImageEntity } from '@entities/Image';
import { ImageDetailEntity } from '@entities/Image-detail';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // 정적 파일 경로
      serveRoot: '/uploads', // 클라이언트가 접근할 경로
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'commu',
      entities: [
        User,
        Post,
        Board,
        Comment,
        ExpRewardSettings,
        Reaction,
        ImageEntity,
        ImageDetailEntity,
      ],
      synchronize: true, // 동기화
      keepConnectionAlive: true, // 갱신
      charset: 'utf8mb4_general_ci',
    }),
    AuthModule,
    UserModule,
    ChatModule,
    PostModule,
    ExpSettingsModule,
    ReactionModule,
    CommentModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
