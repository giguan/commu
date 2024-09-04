import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post(':boardId')
  async createPost(
    @Param('boardId') boardId: number,
    @Body('userId') userId: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<any> {
    return await this.postService.createPost(userId, boardId, title, content);
  }

  @Get('tabs')
  async getTabs() {
    return await this.postService.getAllBoard();
  }
}
