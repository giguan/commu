import { Post } from '@entities/Post';
import { Comment } from '@entities/Comment';
import { User } from '@entities/User';
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ImageEntity } from '@entities/Image';
import { ImageDetailEntity } from '@entities/Image-detail';
import { Reaction } from '@entities/Reaction';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,

    @InjectRepository(ImageDetailEntity)
    private imageDetailRepository: Repository<ImageDetailEntity>,

    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,

    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async getListByPost(postId: number) {
    return await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author') // 작성자와 댓글을 함께 가져옴
      .leftJoinAndSelect('comment.replies', 'replies') // 대댓글(답글)까지 함께 가져옴
      .leftJoinAndSelect('replies.author', 'replyAuthor')
      .leftJoinAndSelect('comment.image', 'image') // 댓글에 연결된 이미지를 가져옴
      .leftJoinAndSelect('image.imageDetails', 'imageDetails') // 이미지 상세 정보를 가져옴
      .where('comment.postId = :postId', { postId })
      .andWhere('comment.parent IS NULL') // 최상위 댓글만 가져옴
      .orderBy('comment.createdAt', 'ASC') // 오래된 순으로 정렬
      .getMany();
  }

  async getRecentCommentList() {
    const res = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.post', 'post')
      .orderBy('comment.createdAt', 'DESC') // 최신 순으로 정렬
      .limit(5) // 5개의 데이터만 가져옴
      .getMany(); // 데이터를 가져오는 함수

    return res;
  }

  async commentWrite(
    postId: number,
    authorId: string,
    comment: string,
    parentId: number | null,
    imageId: number | null,
  ) {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const post = await queryRunner.manager.getRepository(Post).findOne({
        where: { id: postId },
      });

      if (!post) {
        throw new Error('게시글을 찾을 수 없습니다.');
      }

      // 작성자를 조회
      const author = await queryRunner.manager.getRepository(User).findOne({
        where: { id: authorId },
      });
      if (!author) {
        throw new Error('작성자를 찾을 수 없습니다.');
      }

      // 부모 댓글을 조회 (parentId가 있을 경우)
      let parentComment: Comment | null = null;
      if (parentId) {
        parentComment = await queryRunner.manager
          .getRepository(Comment)
          .findOne({
            where: { id: parentId },
          });
        if (!parentComment) {
          throw new Error('부모 댓글을 찾을 수 없습니다.');
        }
      }

      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Comment)
        .values({
          post: post, // 게시글과 연결
          author: author, // 작성자와 연결
          content: comment, // 댓글 내용
          parent: parentComment,
          imageId,
        })
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async commentModify(
    postId: number,
    authorId: string,
    comment: string,
    commentId: number,
    parentId?: number | null, // parentId는 있을 수도 없을 수도 있음
  ) {
    // QueryBuilder를 사용하여 업데이트 실행
    const queryBuilder = this.commentRepository
      .createQueryBuilder()
      .update(Comment)
      .set({ content: comment })
      .where('id = :commentId', { commentId });

    if (parentId) {
      queryBuilder.andWhere('parentId = :parentId', { parentId });
    }

    const result = await queryBuilder.execute();

    // 결과 확인: 업데이트된 행이 없으면 에러 처리 (선택 사항)
    if (result.affected === 0) {
      throw new Error('해당 조건에 맞는 댓글을 찾을 수 없습니다.');
    }

    return result;
  }

  async deleteComment(commentId: number) {
    const queryRunner = this.dataSource.createQueryRunner(); // QueryRunner 생성
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 댓글 조회
      const comment = await this.commentRepository.findOne({
        where: { id: commentId },
        relations: ['image', 'image.imageDetails', 'reactions'],
      });

      if (!comment) {
        throw new Error(`Comment with ID ${commentId} not found.`);
      }

      // 이미지 및 이미지 디테일 삭제
      if (comment.image) {
        await queryRunner.manager.delete(ImageDetailEntity, {
          image: comment.image,
        });
        await queryRunner.manager.delete(ImageEntity, { id: comment.image.id });
      }

      // 리액션 삭제
      await queryRunner.manager.delete(Reaction, {
        comment: { id: commentId },
      });

      // 댓글 삭제
      await queryRunner.manager.delete(Comment, { id: commentId });

      await queryRunner.commitTransaction(); // 트랜잭션 커밋
    } catch (error) {
      await queryRunner.rollbackTransaction(); // 에러 발생 시 롤백
      throw new Error(`Transaction failed: ${error.message}`);
    } finally {
      await queryRunner.release(); // QueryRunner 해제
    }

    return { message: 'Comment deleted successfully' };
  }

  async deleteCommentImage(commentId: number) {
    const queryRunner = this.dataSource.createQueryRunner(); // QueryRunner 생성
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const comment = await this.commentRepository.findOne({
        where: { id: commentId },
        relations: ['image', 'image.imageDetails'],
      });

      if (!comment) {
        throw new Error(`Comment with ID ${commentId} not found.`);
      }

      // 이미지 및 이미지 디테일 삭제
      if (comment.image) {
        // 1. 이미지 디테일 삭제
        await queryRunner.manager.delete(ImageDetailEntity, {
          image: comment.image,
        });
        // 2. 이미지 삭제
        await queryRunner.manager.delete(ImageEntity, { id: comment.image.id });
        // 3. 코멘트의 imageId 필드를 null로 업데이트하여 이미지 참조 삭제
        await queryRunner.manager.update(
          Comment,
          { id: commentId },
          { imageId: null },
        );
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return 'success';
  }
}
