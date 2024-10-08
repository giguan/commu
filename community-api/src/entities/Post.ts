import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Board } from './Board';
import { Comment } from './Comment';
import { Reaction } from './Reaction';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('longtext')
  content: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  dislikes: number;

  @Column({ default: 0 })
  views: number;

  @Column({ default: false })
  deleteYn: boolean;

  @ManyToOne(() => User, (user) => user.posts)
  author: User; // 작성자와 연결

  @ManyToOne(() => Board, (board) => board.posts)
  board: Board; // 게시판과 연결

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Reaction, (reaction) => reaction.post) // 새로운 관계 추가
  reactions: Reaction[];
}
