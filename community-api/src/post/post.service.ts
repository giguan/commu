import { Board } from '@entities/Board';
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ExpRewardSettings } from 'src/entities/ExpRewardSettings';
import { Post } from 'src/entities/Post';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRespository: Repository<Post>,

    @InjectRepository(Board)
    private boardRepository: Repository<Board>,

    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async createPost(
    userId: string,
    boardId: number,
    title: string,
    content: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const post = new Post();
      post.title = title;
      post.content = content;
      post.author = user;

      await queryRunner.manager.save(post);

      const expSettings = await queryRunner.manager.findOne(ExpRewardSettings, {
        where: { id: 1 },
      });

      if (expSettings) {
        // 사용자의 포인트와 경험치 업데이트
        user.points += expSettings.postPoints;
        user.experience += expSettings.postExp;
        user.postCount += 1; // 게시글 작성 수 증가

        await queryRunner.manager.save(User, user);
      }

      // 성공적으로 완료되었을 경우 트랜잭션을 커밋합니다.
      await queryRunner.commitTransaction();

      return post;
    } catch (err) {
      // 트랜잭션 중 에러가 발생하면 롤백합니다.
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // 트랜잭션 종료 후 QueryRunner를 해제합니다.
      await queryRunner.release();
    }
  }

  async getAllBoard() {
    const test = await this.boardRepository.find();

    console.log(test);

    return test;

    throw new Error('Method not implemented.');
  }
}
