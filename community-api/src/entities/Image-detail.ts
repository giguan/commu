// ImageDetailEntity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ImageEntity } from './Image';

@Entity('image_details')
export class ImageDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  filename: string;

  @Column({ length: 255 })
  url: string;

  @Column({ nullable: true })
  orderNumber: number;

  @ManyToOne(() => ImageEntity, (image) => image.imageDetails, {
    onDelete: 'CASCADE',
  }) // Cascade delete when image is deleted
  @JoinColumn({ name: 'imageId' }) // Foreign key to ImageEntity
  image: ImageEntity;
}
