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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'commu',
      entities: [User, Post, Board, Comment, ExpRewardSettings],
      synchronize: false, // 동기화
      keepConnectionAlive: true, // 갱신
      charset: 'utf8mb4_general_ci',
    }),
    AuthModule,
    UserModule,
    ChatModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
