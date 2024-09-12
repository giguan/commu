import { Comment } from '@entities/Comment';
import { Post } from '@entities/Post';
import { Reaction } from '@entities/Reaction';
import { User } from '@entities/User';
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async getUserReactionStatus(userId: string, postId: number) {
    return await this.reactionRepository.findOne({
      where: {
        user: { id: userId }, // userId를 기준으로 검색
        post: { id: postId }, // postId를 기준으로 검색
      },
      relations: ['user', 'post'],
    });
  }

  async getUserReactionStatusComment(userId: string, postId: number) {
    // 특정 사용자(userId)가 특정 게시글(postId)에 달린 댓글들에 남긴 리액션들을 조회
    const reactions = await this.reactionRepository.find({
      where: {
        user: { id: userId }, // userId에 대한 필터
        post: { id: postId }, // postId에 대한 필터
      },
      relations: ['comment'], // comment 관계를 불러옵니다.
    });

    // 댓글 ID별로 사용자 리액션 상태를 매핑
    const reactionMap = reactions.reduce((map, reaction) => {
      if (reaction.comment) {
        map[reaction.comment.id] = reaction.reactionType; // comment.id를 키로 하고, reactionType을 값으로
      }
      return map;
    }, {});

    return reactionMap; // 리액션 상태를 매핑한 객체를 반환
  }

  async reactToContent(
    postId: number | null, // 게시글 ID
    commentId: number | null, // 댓글 또는 답글 ID
    userId: string, // 사용자 ID
    reactionType: 'like' | 'dislike', // 반응 유형
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 사용자 찾기
      const user = await queryRunner.manager.getRepository(User).findOne({
        where: { id: userId },
      });

      if (!user) throw new Error('사용자를 찾을 수 없습니다.');

      let targetPost = null;
      let targetComment = null;

      // 게시글 찾기
      if (postId) {
        targetPost = await queryRunner.manager.getRepository(Post).findOne({
          where: { id: postId },
        });

        if (!targetPost) throw new Error('게시글을 찾을 수 없습니다.');
      }

      // 댓글 찾기
      if (commentId) {
        targetComment = await queryRunner.manager
          .getRepository(Comment)
          .findOne({
            where: { id: commentId },
          });

        if (!targetComment) throw new Error('댓글을 찾을 수 없습니다.');
      }

      // 기존 반응 확인
      const existingReaction = await queryRunner.manager
        .getRepository(Reaction)
        .findOne({
          where: {
            user: { id: userId }, // 사용자 ID로 검색
            ...(postId && { post: { id: postId } }), // 게시글에 대한 반응 확인
            ...(commentId && { comment: { id: commentId } }), // 댓글에 대한 반응 확인
          },
        });

      if (existingReaction) {
        // 사용자가 이미 동일한 반응을 남긴 경우 에러 발생
        if (existingReaction.reactionType === reactionType) {
          throw new Error(
            `이미 ${reactionType === 'like' ? '좋아요' : '싫어요'}를 눌렀습니다.`,
          );
        }

        // 기존 반응을 업데이트 (좋아요 → 싫어요 또는 그 반대)
        const previousReaction = existingReaction.reactionType; // 이전 반응 저장
        existingReaction.reactionType = reactionType;
        await queryRunner.manager
          .getRepository(Reaction)
          .save(existingReaction);

        // 좋아요/싫어요 수 업데이트
        if (postId && targetPost) {
          if (previousReaction === 'like') {
            targetPost.likes -= 1; // 이전 좋아요를 취소
          } else if (previousReaction === 'dislike') {
            targetPost.dislikes -= 1; // 이전 싫어요를 취소
          }

          if (reactionType === 'like') {
            targetPost.likes += 1; // 좋아요 추가
          } else if (reactionType === 'dislike') {
            targetPost.dislikes += 1; // 싫어요 추가
          }

          await queryRunner.manager.getRepository(Post).save(targetPost);
        }

        if (commentId && targetComment) {
          if (previousReaction === 'like') {
            targetComment.likes -= 1; // 이전 좋아요를 취소
          } else if (previousReaction === 'dislike') {
            targetComment.dislikes -= 1; // 이전 싫어요를 취소
          }

          if (reactionType === 'like') {
            targetComment.likes += 1; // 좋아요 추가
          } else if (reactionType === 'dislike') {
            targetComment.dislikes += 1; // 싫어요 추가
          }

          await queryRunner.manager.getRepository(Comment).save(targetComment);
        }
      } else {
        // 새로운 반응 추가
        const newReaction = new Reaction();
        newReaction.reactionType = reactionType;
        newReaction.user = user;
        if (targetPost) newReaction.post = targetPost;
        if (targetComment) newReaction.comment = targetComment;

        await queryRunner.manager.getRepository(Reaction).save(newReaction);

        // 좋아요/싫어요 수 업데이트
        if (postId && targetPost) {
          if (reactionType === 'like') {
            targetPost.likes += 1;
          } else if (reactionType === 'dislike') {
            targetPost.dislikes += 1;
          }

          await queryRunner.manager.getRepository(Post).save(targetPost);
        }

        if (commentId && targetComment) {
          if (reactionType === 'like') {
            targetComment.likes += 1;
          } else if (reactionType === 'dislike') {
            targetComment.dislikes += 1;
          }

          await queryRunner.manager.getRepository(Comment).save(targetComment);
        }
      }

      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
    } catch (error) {
      // 에러 발생 시 트랜잭션 롤백
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    // 게시글/댓글/답글에 대한 반응 처리가 완료됨
    return {
      status: 200,
      commentId: commentId,
      reactionType: reactionType,
    };
  }
}
