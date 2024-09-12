import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getPost() {
    console.log('api/post');
    const res = await this.postService.getAllPost();
    return res;
  }

  // 게시글 작성
  @Post(':boardId')
  async createPost(
    @Param('boardId') boardId: number,
    @Body('userId') userId: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): Promise<any> {
    const res = await this.postService.createPost(
      userId,
      boardId,
      title,
      content,
    );

    return res;
  }

  // 게시글 수정
  @Put(':boardId')
  async updatePost(
    @Param('boardId') boardId: number,
    @Body('authorId') authorId: string,
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('postId') postId: number,
  ): Promise<any> {
    console.log(boardId, authorId, title, content, postId);
    const res = await this.postService.updatePost(
      authorId,
      boardId,
      title,
      content,
      postId,
    );

    return res;
  }

  // 게시글 삭제
  @Put('delete/:postId')
  async deletePost(@Param('postId') postId: number) {
    return await this.postService.deletePost(postId);
  }

  // 게시글 탭 가져오기
  @Get('tabs')
  async getTabs() {
    return await this.postService.getAllBoard();
  }

  // 게시글 상세 최근 5개 가져오기
  @Get('recentList/:userId')
  async getUserDetailList(@Param('userId') userId: string) {
    const res = await this.postService.getUserDetailList(userId);

    return res;
  }

  // 여것도 이름 그냥 변경해버리자
  @Get('detail/:postId')
  async getPostDetail(@Param('postId') postId: number) {
    const res = this.postService.getPostDetail(postId);

    return res;
  }

  // @Put(':postId/like')
  // async postLikeIncrease(@Param('postId') postId: number) {
  //   const res = this.postService.increaseLike(postId);

  //   return res;
  // }

  @Put(':postId/view')
  async postVieweIncrease(@Param('postId') postId: any) {
    const res = this.postService.increaseView(postId);

    return res;
  }

  // @Put(':postId/dislike')
  // async postDislikeIncrease(@Param('postId') postId: number) {
  //   const res = this.postService.increaseDislike(postId);

  //   return res;
  // }
}
