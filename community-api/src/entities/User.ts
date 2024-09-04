import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Post } from './Post';
import { Comment } from './Comment';

@Entity()
export class User {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  nickname: string;

  // 새로 추가할 필드들
  @Column({ default: 0 })
  points: number;

  @Column({ default: 0 })
  postCount: number;

  @Column({ default: 0 })
  commentCount: number;

  @Column({ default: 0 })
  experience: number;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author, { cascade: true })
  comments: Comment[];
}
