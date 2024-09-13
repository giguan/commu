import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Post } from './Post';
import { User } from './User';
import { Reaction } from './Reaction';
import { ImageEntity } from './Image';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('longtext')
  content: string;

  // 댓글 작성자
  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  author: User; // 작성자와의 관계

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  parent: Comment | null; // 답글의 답글

  @OneToMany(() => Comment, (reply) => reply.parent)
  replies: Comment[]; // 답글 목록

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  dislikes: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // 반응과의 관계
  @OneToMany(() => Reaction, (reaction) => reaction.comment) // 양방향 관계 설정
  reactions: Reaction[];

  // 이미지 엔티티와의 관계에서 onDelete: 'SET NULL' 설정
  @ManyToOne(() => ImageEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'imageId' })
  image: ImageEntity;

  @Column({ nullable: true })
  imageId: number; // 이미지가 있을 때만 저장
}
