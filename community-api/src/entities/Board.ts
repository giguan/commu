import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '0' })
  order: number;

  @OneToMany(() => Post, (post) => post.board)
  posts: Post[]; // 게시글 목록과 연결
}
