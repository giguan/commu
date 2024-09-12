import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities/User';
import { Post } from '@entities/Post';
import { Comment } from '@entities/Comment';
import { ImageEntity } from '@entities/Image';
import { ImageDetailEntity } from '@entities/Image-detail';
import { Reaction } from '@entities/Reaction';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment,
      User,
      Post,
      ImageEntity,
      ImageDetailEntity,
      Reaction,
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
