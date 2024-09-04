import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Board } from 'src/entities/Board';
import { Post } from 'src/entities/Post';
import { Comment } from 'src/entities/Comment';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Board, Comment])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
