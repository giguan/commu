import { Board } from '@entities/Board';
import { Reaction } from '@entities/Reaction';
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
    private postRepository: Repository<Post>,

    @InjectRepository(Board)
    private boardRepository: Repository<Board>,

    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  /**
   * 주어진 레벨에 도달하기 위해 필요한 총 경험치를 계산하는 함수
   * @param level - 레벨 (1부터 시작)
   * @param baseExp - 1레벨에서 2레벨로 가기 위한 기본 경험치
   * @param multiplier - 레벨이 올라갈 때마다 경험치가 증가하는 비율
   * @returns 다음 레벨로 가기 위해 필요한 경험치
   */
  private calculateExperienceForLevel(
    level: number,
    baseExp: number,
    multiplier: number,
  ): number {
    // 레벨이 1일 경우 기본 경험치만 필요
    if (level === 1) {
      return baseExp;
    }
    // 2레벨 이상에서는 증가 비율을 적용한 경험치 계산
    return baseExp * Math.pow(multiplier, level - 1);
  }

  async getAllPost() {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'user') // 작성자 정보와 조인
      .leftJoinAndSelect('post.board', 'board') // 게시판 정보와 조인
      .loadRelationCountAndMap('post.commentCount', 'post.comments') // 댓글 수를 post 엔티티에 매핑
      .where('post.deleteYn = false') // 삭제되지 않은 게시글만 가져옴
      .orderBy('post.id', 'DESC') // 최신 게시글부터 가져옴
      .getMany(); // 엔티티 객체 반환
  }

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

      const board = await queryRunner.manager.findOne(Board, {
        where: { id: boardId },
      });

      const post = new Post();
      post.title = title;
      post.content = content;
      post.author = user;
      post.board = board;

      await queryRunner.manager.save(post);

      const expSettings = await queryRunner.manager.findOne(ExpRewardSettings, {
        where: { id: 1 },
      });

      if (expSettings) {
        // 사용자의 포인트와 경험치 업데이트
        user.points += expSettings.postPoints;
        user.experience += expSettings.postExp;
        user.postCount += 1; // 게시글 작성 수 증가

        // 레벨업 검토
        let nextLevelExp = this.calculateExperienceForLevel(
          user.level + 1,
          expSettings.baseExpForLevelUp,
          expSettings.levelMultiplier,
        );

        while (user.experience >= nextLevelExp) {
          // 레벨업
          user.level += 1;
          user.experience -= nextLevelExp; // 레벨업 시, 다음 레벨로 넘어간 경험치 차감

          // 다음 레벨 경험치 재계산
          nextLevelExp = this.calculateExperienceForLevel(
            user.level + 1,
            expSettings.baseExpForLevelUp,
            expSettings.levelMultiplier,
          );
        }

        // 사용자 정보 업데이트
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

  async updatePost(
    authorId: string,
    boardId: number,
    title: string,
    content: string,
    postId: number,
  ) {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    const post = new Post();
    post.title = title;
    post.content = content;
    post.board = board;

    await this.postRepository.update({ id: postId }, post);

    // 업데이트된 게시글을 다시 조회하여 반환
    const updatedPost = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['board', 'author'], // 필요한 연관 관계를 가져옴
    });

    return updatedPost;
  }

  async deletePost(postId: number) {
    const post = new Post();
    post.deleteYn = true;

    return await this.postRepository.update({ id: postId }, post);
  }

  async getAllBoard() {
    const test = await this.boardRepository.find();

    return test;
  }

  async getUserDetailList(userId: string) {
    return await this.postRepository
      .createQueryBuilder('post')
      .where('post.authorId = :userId', { userId })
      .andWhere('post.deleteYn = false')
      .orderBy('post.createdAt', 'DESC')
      .take(5)
      .getMany();
  }

  async getPostDetail(postId: number) {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'user') // Post와 User(작성자) 조인
      .leftJoinAndSelect('post.board', 'board')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .where('post.id = :postId', { postId })
      .getOne();
  }

  // 싫어요 증가
  // async increaseDislike(postId: number) {
  //   // 기존 게시글 조회
  //   const post = await this.postRepository.findOne({ where: { id: postId } });

  //   if (!post) {
  //     throw new Error('게시글을 찾을 수 없습니다.');
  //   }

  //   // 싫어요 수 증가
  //   post.dislikes += 1;

  //   return await this.postRepository.save(post); // 업데이트된 게시글 저장
  // }

  // 조회수 증가
  async increaseView(postId: number) {
    // 기존 게시글 조회
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new Error('게시글을 찾을 수 없습니다.');
    }

    // 조회수 증가
    post.views += 1;

    return await this.postRepository.save(post); // 업데이트된 게시글 저장
  }

  // 좋아요 증가
  // async increaseLike(postId: number) {
  //   // 기존 게시글 조회
  //   const post = await this.postRepository.findOne({ where: { id: postId } });

  //   if (!post) {
  //     throw new Error('게시글을 찾을 수 없습니다.');
  //   }

  //   // 좋아요 수 증가
  //   post.likes += 1;

  //   return await this.postRepository.save(post); // 업데이트된 게시글 저장
  // }
}
