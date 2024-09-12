import { Module } from '@nestjs/common';
import { ReactionController } from './reaction.controller';
import { ReactionService } from './reaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from '@entities/Reaction';
import { Post } from '@entities/Post';
import { User } from '@entities/User';
import { Comment } from '@entities/Comment';

@Module({
  imports: [TypeOrmModule.forFeature([Reaction, User, Post, Comment])],
  controllers: [ReactionController],
  providers: [ReactionService],
})
export class ReactionModule {}
