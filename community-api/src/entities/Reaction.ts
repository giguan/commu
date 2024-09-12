import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  // 좋아요 또는 싫어요 구분
  @Column({ type: 'enum', enum: ['like', 'dislike'] })
  reactionType: 'like' | 'dislike';

  // 반응을 남긴 사용자
  @ManyToOne(() => User, (user) => user.reactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  // 게시글에 대한 반응
  @ManyToOne(() => Post, (post) => post.reactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;

  // 댓글에 대한 반응
  @ManyToOne(() => Comment, (comment) => comment.reactions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commentId' })
  comment: Comment;

  //   // 답글에 대한 반응 (댓글과 구조가 같으므로 추가 가능)
  //   @ManyToOne(() => Comment, (reply) => reply.reactions, { onDelete: 'CASCADE' })
  //   @JoinColumn({ name: 'replyId' })
  //   reply: Comment;
}
