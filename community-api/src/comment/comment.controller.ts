import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':postId')
  async getCommentList(@Param('postId') postId: number) {
    const res = this.commentService.getListByPost(postId);

    return res;
  }

  @Get()
  async getCommentRecentList() {
    const res = this.commentService.getRecentCommentList();

    return res;
  }

  @Post()
  async postComment(
    @Body('postId') postId: number,
    @Body('authorId') authorId: string,
    @Body('comment') comment: string,
    @Body('parentId') parentId: number | null,
    @Body('imageId') imageId: number | null,
  ) {
    const res = await this.commentService.commentWrite(
      postId,
      authorId,
      comment,
      parentId,
      imageId,
    );

    return res;
  }

  @Put()
  async modifyComment(
    @Body('postId') postId: number,
    @Body('authorId') authorId: string,
    @Body('comment') comment: string,
    @Body('commentId') commentId: number,
    @Body('parentId') parentId: number | null,
  ) {
    const res = await this.commentService.commentModify(
      postId,
      authorId,
      comment,
      commentId,
      parentId,
    );

    return res;
  }

  @Delete()
  async DeleteComment(@Query('commentId') commentId: number) {
    const res = await this.commentService.deleteComment(commentId);

    return res;
  }
}
