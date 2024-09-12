import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { ImageDetailEntity } from './Image-detail';

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => ImageDetailEntity, (imageDetail) => imageDetail.image, {
    onDelete: 'CASCADE',
  })
  imageDetails: ImageDetailEntity[];
}
