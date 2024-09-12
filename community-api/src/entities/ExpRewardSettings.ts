import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExpRewardSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 10 }) // 기본 게시글 작성 포인트
  postPoints: number;

  @Column({ default: 5 }) // 기본 댓글 작성 포인트
  commentPoints: number;

  @Column({ default: 20 }) // 기본 게시글 작성 경험치
  postExp: number;

  @Column({ default: 10 }) // 기본 댓글 작성 경험치
  commentExp: number;

  @Column({ default: 100 }) // 기본 1레벨에서 2레벨로 가기 위한 경험치
  baseExpForLevelUp: number;

  @Column({ default: 1.5 }) // 레벨별 경험치 상승 비율
  levelMultiplier: number;
}
