import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReactionService } from './reaction.service';

@Controller('reaction')
export class ReactionController {
  constructor(private reactionService: ReactionService) {}

  @Get('status')
  async getStatus(
    @Query('userId') userId: string,
    @Query('postId') postId: number,
  ) {
    const res = await this.reactionService.getUserReactionStatus(
      userId,
      postId,
    );

    return res;
  }

  @Get('statusComment')
  async getStatusComments(
    @Query('userId') userId: string,
    @Query('postId') postId: number,
  ) {
    const res = await this.reactionService.getUserReactionStatusComment(
      userId,
      postId,
    );

    return res;
  }

  @Post()
  async reactToContent(
    @Body('postId') postId: number | null, // 단일 값으로 postId 받기
    @Body('commentId') commentId: number | null,
    @Body('userId') userId: string,
    @Body('reactionType') reactionType: 'like' | 'dislike',
  ) {
    const res = this.reactionService.reactToContent(
      postId,
      commentId,
      userId,
      reactionType,
    );

    return res;
  }
}
